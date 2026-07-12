import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenStore } from '../redis/refresh-token.store';
import { AccessTokenBlacklistStore } from '../redis/access-token-blacklist.store';
import { EMAIL_SERVICE } from '../email/interfaces/email-service.interface';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  ValidationException,
} from '../common/errors/exceptions';

// Replace bcrypt entirely: real hashing is deliberately slow (that's its
// job), and we control compare's verdict per test instead.
jest.mock('bcrypt');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('AuthService', () => {
  let service: AuthService;

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    verificationToken: {
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
    },
    oAuthAccount: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const jwtServiceMock = {
    sign: jest.fn().mockReturnValue('signed-jwt'),
    decode: jest.fn(),
  };

  const refreshTokenStoreMock = {
    set: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
    deleteAllForUser: jest.fn(),
  };

  const blacklistStoreMock = {
    blacklist: jest.fn(),
    isBlacklisted: jest.fn(),
  };

  const emailServiceMock = {
    sendOtpEmail: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    // sign's return value is wiped by clearAllMocks, so re-arm it
    jwtServiceMock.sign.mockReturnValue('signed-jwt');

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: RefreshTokenStore, useValue: refreshTokenStoreMock },
        { provide: AccessTokenBlacklistStore, useValue: blacklistStoreMock },
        { provide: EMAIL_SERVICE, useValue: emailServiceMock },
      ],
    }).compile();

    service = moduleRef.get(AuthService);
  });

  // Protects: duplicate accounts are impossible, and registration is atomic —
  // user + OTP row created together, email sent with a valid-format code.
  describe('register', () => {
    const dto = {
      email: 'test@oxfira.dev',
      password: 'Password123!',
      displayName: 'Test User',
    };

    it('throws ConflictException when email is already registered', async () => {
      prismaMock.user.findUnique.mockResolvedValue({ id: 'existing-user' });

      await expect(service.register(dto)).rejects.toThrow(ConflictException);

      // Guard clause must fire before any writes or emails happen
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
      expect(emailServiceMock.sendOtpEmail).not.toHaveBeenCalled();
    });

    it('creates user + verification token, sends OTP email, returns tokens', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      mockedBcrypt.hash.mockResolvedValue('hashed' as never);

      const createdUser = {
        id: 'user-1',
        email: dto.email,
        displayName: dto.displayName,
      };

      // Interactive $transaction form: our mock plays the transaction
      // runner — it invokes the service's real callback with a fake tx.
      const txMock = {
        user: { create: jest.fn().mockResolvedValue(createdUser) },
        verificationToken: { create: jest.fn().mockResolvedValue({}) },
      };
      prismaMock.$transaction.mockImplementation(
        async (cb: (tx: typeof txMock) => Promise<unknown>) => cb(txMock),
      );

      const result = await service.register(dto);

      expect(txMock.user.create).toHaveBeenCalledWith({
        data: {
          email: dto.email,
          passwordHash: 'hashed',
          displayName: dto.displayName,
        },
      });
      expect(txMock.verificationToken.create).toHaveBeenCalled();
      // OTP must match the ambiguity-free alphabet, exactly 6 chars
      expect(emailServiceMock.sendOtpEmail).toHaveBeenCalledWith(
        dto.email,
        expect.stringMatching(/^[A-HJ-NP-Z2-9]{6}$/),
        expect.anything(),
      );
      expect(refreshTokenStoreMock.set).toHaveBeenCalled();
      expect(result.user).toEqual(createdUser);
      expect(result.accessToken).toBe('signed-jwt');
    });
  });

  // Protects: credential checking order and the Google-only account guard —
  // bcrypt.compare must never run against a null hash.
  describe('login', () => {
    const dto = { email: 'test@oxfira.dev', password: 'Password123!' };

    it('throws UnauthorizedException for unknown email', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('tells Google-only accounts to use Google Sign-In', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: dto.email,
        passwordHash: null,
      });

      await expect(service.login(dto)).rejects.toThrow(
        'This account uses Google Sign-In. Please log in with Google.',
      );
      expect(mockedBcrypt.compare).not.toHaveBeenCalled();
    });

    it('throws UnauthorizedException for wrong password', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: dto.email,
        passwordHash: 'stored-hash',
      });
      mockedBcrypt.compare.mockResolvedValue(false as never);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('returns tokens on valid credentials', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: dto.email,
        displayName: 'Test User',
        passwordHash: 'stored-hash',
      });
      mockedBcrypt.compare.mockResolvedValue(true as never);

      const result = await service.login(dto);

      expect(mockedBcrypt.compare).toHaveBeenCalledWith(
        dto.password,
        'stored-hash',
      );
      expect(result.accessToken).toBe('signed-jwt');
      expect(result.user.id).toBe('user-1');
    });
  });

  // Protects: token rotation — old token dies, new one is born, and an
  // unknown/expired token gets rejected before anything is issued.
  describe('refreshToken', () => {
    it('throws UnauthorizedException when token is unknown or expired', async () => {
      refreshTokenStoreMock.get.mockResolvedValue(null);

      await expect(service.refreshToken('dead-token')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(refreshTokenStoreMock.delete).not.toHaveBeenCalled();
    });

    it('rotates: deletes old token, stores new one, returns fresh pair', async () => {
      refreshTokenStoreMock.get.mockResolvedValue({
        userId: 'user-1',
        email: 'test@oxfira.dev',
      });

      const result = await service.refreshToken('old-token');

      expect(refreshTokenStoreMock.delete).toHaveBeenCalledWith('old-token');
      expect(refreshTokenStoreMock.set).toHaveBeenCalledWith(
        expect.any(String),
        { userId: 'user-1', email: 'test@oxfira.dev' },
        expect.any(Number),
      );
      expect(result.accessToken).toBe('signed-jwt');
      // the new refresh token must not be the one we handed in
      expect(result.refreshToken).not.toBe('old-token');
    });
  });

  // Protects: ownership scoping (you can only kill your own session) and
  // immediate access-token revocation via the blacklist.
  describe('logout', () => {
    it('does NOT delete a refresh token owned by a different user', async () => {
      refreshTokenStoreMock.get.mockResolvedValue({
        userId: 'someone-else',
        email: 'other@oxfira.dev',
      });
      jwtServiceMock.decode.mockReturnValue(null);

      await service.logout('access-token', 'user-1', 'their-token');

      expect(refreshTokenStoreMock.delete).not.toHaveBeenCalled();
    });

    it('deletes own refresh token and blacklists the access token by jti', async () => {
      refreshTokenStoreMock.get.mockResolvedValue({
        userId: 'user-1',
        email: 'test@oxfira.dev',
      });
      jwtServiceMock.decode.mockReturnValue({
        sub: 'user-1',
        email: 'test@oxfira.dev',
        jti: 'jti-abc',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 900,
      });

      await service.logout('access-token', 'user-1', 'my-token');

      expect(refreshTokenStoreMock.delete).toHaveBeenCalledWith('my-token');
      expect(blacklistStoreMock.blacklist).toHaveBeenCalledWith(
        'jti-abc',
        expect.any(Number),
      );
    });

    it('skips blacklisting when the token has no decodable jti/exp', async () => {
      refreshTokenStoreMock.get.mockResolvedValue(null);
      jwtServiceMock.decode.mockReturnValue(null);

      await service.logout('garbage', 'user-1', 'whatever');

      expect(blacklistStoreMock.blacklist).not.toHaveBeenCalled();
    });
  });

  // Protects: the OTP verification gauntlet — generic errors that leak
  // nothing, the attempt counter that makes brute force impossible, and
  // the atomic verify+delete on success.
  describe('verifyEmail', () => {
    const email = 'test@oxfira.dev';
    const user = { id: 'user-1', email };

    it('throws generic error for unknown email', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(service.verifyEmail(email, 'ABC123')).rejects.toThrow(
        'Invalid or expired verification code',
      );
    });

    it('throws generic error when no code exists for this user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.verificationToken.findUnique.mockResolvedValue(null);

      await expect(service.verifyEmail(email, 'ABC123')).rejects.toThrow(
        'Invalid or expired verification code',
      );
    });

    it('throws generic error when the code is expired', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.verificationToken.findUnique.mockResolvedValue({
        id: 'vt-1',
        userId: user.id,
        tokenHash: 'hash',
        attempts: 0,
        expiresAt: new Date(Date.now() - 1000), // already past
      });

      await expect(service.verifyEmail(email, 'ABC123')).rejects.toThrow(
        'Invalid or expired verification code',
      );
      expect(mockedBcrypt.compare).not.toHaveBeenCalled();
    });

    it('locks out after max attempts, even before comparing', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.verificationToken.findUnique.mockResolvedValue({
        id: 'vt-1',
        userId: user.id,
        tokenHash: 'hash',
        attempts: 5,
        expiresAt: new Date(Date.now() + 60_000),
      });

      await expect(service.verifyEmail(email, 'ABC123')).rejects.toThrow(
        'Too many attempts. Please request a new code.',
      );
      expect(mockedBcrypt.compare).not.toHaveBeenCalled();
    });

    it('increments attempts on a wrong code', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.verificationToken.findUnique.mockResolvedValue({
        id: 'vt-1',
        userId: user.id,
        tokenHash: 'hash',
        attempts: 2,
        expiresAt: new Date(Date.now() + 60_000),
      });
      mockedBcrypt.compare.mockResolvedValue(false as never);

      await expect(service.verifyEmail(email, 'WRONG1')).rejects.toThrow(
        ValidationException,
      );
      expect(prismaMock.verificationToken.update).toHaveBeenCalledWith({
        where: { id: 'vt-1' },
        data: { attempts: { increment: 1 } },
      });
    });

    it('marks user verified and deletes the code atomically on success', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.verificationToken.findUnique.mockResolvedValue({
        id: 'vt-1',
        userId: user.id,
        tokenHash: 'hash',
        attempts: 0,
        expiresAt: new Date(Date.now() + 60_000),
      });
      mockedBcrypt.compare.mockResolvedValue(true as never);
      // Array form of $transaction: just resolves the batch
      prismaMock.$transaction.mockResolvedValue([]);

      await service.verifyEmail(email, 'RIGHT1');

      expect(prismaMock.$transaction).toHaveBeenCalled();
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: user.id },
        data: { isVerified: true },
      });
      expect(prismaMock.verificationToken.delete).toHaveBeenCalledWith({
        where: { id: 'vt-1' },
      });
    });
  });

  // Protects: the anti-enumeration silence — an unknown email must behave
  // identically to a known one from the outside (return, no throw), while
  // sending nothing.
  describe('requestPasswordReset', () => {
    it('silently returns for unknown email, sends no email', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        service.requestPasswordReset('ghost@oxfira.dev'),
      ).resolves.toBeUndefined();

      expect(prismaMock.verificationToken.upsert).not.toHaveBeenCalled();
      expect(emailServiceMock.sendOtpEmail).not.toHaveBeenCalled();
    });

    it('upserts a reset code (resetting attempts) and emails it', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'test@oxfira.dev',
      });
      mockedBcrypt.hash.mockResolvedValue('otp-hash' as never);

      await service.requestPasswordReset('test@oxfira.dev');

      expect(prismaMock.verificationToken.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          update: expect.objectContaining({ attempts: 0 }),
        }),
      );
      expect(emailServiceMock.sendOtpEmail).toHaveBeenCalledWith(
        'test@oxfira.dev',
        expect.stringMatching(/^[A-HJ-NP-Z2-9]{6}$/),
        expect.anything(),
      );
    });
  });

  // Protects: reset is atomic (password + code deletion together) and
  // nukes every active session afterward — a stolen-password attacker
  // gets logged out everywhere the moment the reset lands.
  describe('confirmPasswordReset', () => {
    const email = 'test@oxfira.dev';
    const user = { id: 'user-1', email };

    it('increments attempts on wrong code', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.verificationToken.findUnique.mockResolvedValue({
        id: 'vt-1',
        userId: user.id,
        tokenHash: 'hash',
        attempts: 0,
        expiresAt: new Date(Date.now() + 60_000),
      });
      mockedBcrypt.compare.mockResolvedValue(false as never);

      await expect(
        service.confirmPasswordReset(email, 'WRONG1', 'NewPassword123!'),
      ).rejects.toThrow(ValidationException);

      expect(prismaMock.verificationToken.update).toHaveBeenCalledWith({
        where: { id: 'vt-1' },
        data: { attempts: { increment: 1 } },
      });
      expect(refreshTokenStoreMock.deleteAllForUser).not.toHaveBeenCalled();
    });

    it('updates password, deletes code, and revokes all sessions on success', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);
      prismaMock.verificationToken.findUnique.mockResolvedValue({
        id: 'vt-1',
        userId: user.id,
        tokenHash: 'hash',
        attempts: 1,
        expiresAt: new Date(Date.now() + 60_000),
      });
      mockedBcrypt.compare.mockResolvedValue(true as never);
      mockedBcrypt.hash.mockResolvedValue('new-hash' as never);
      prismaMock.$transaction.mockResolvedValue([]);

      await service.confirmPasswordReset(email, 'RIGHT1', 'NewPassword123!');

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: user.id },
        data: { passwordHash: 'new-hash' },
      });
      expect(refreshTokenStoreMock.deleteAllForUser).toHaveBeenCalledWith(
        user.id,
      );
    });
  });

  // Protects: correct semantics — a missing user behind a valid JWT is a
  // 404 (resource gone), not a 401 (bad credentials).
  describe('getProfile', () => {
    it('throws NotFoundException when the user row is gone', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(service.getProfile('ghost-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns the selected profile fields', async () => {
      const profile = {
        id: 'user-1',
        email: 'test@oxfira.dev',
        displayName: 'Test User',
        isVerified: true,
        createdAt: new Date(),
      };
      prismaMock.user.findUnique.mockResolvedValue(profile);

      await expect(service.getProfile('user-1')).resolves.toEqual(profile);
    });
  });

  // Protects: the three-branch Option C linking logic — the single most
  // security-sensitive decision tree in the service.
  describe('loginWithGoogle', () => {
    const baseProfile = {
      providerUserId: 'google-sub-123',
      email: 'gmail@oxfira.dev',
      emailVerified: true,
      displayName: 'Google User',
    };

    it('rejects a profile with no email', async () => {
      await expect(
        service.loginWithGoogle({ ...baseProfile, email: '' }),
      ).rejects.toThrow('Google account has no email address');
    });

    it('branch 1: existing OAuth link logs straight in, creates nothing', async () => {
      prismaMock.oAuthAccount.findUnique.mockResolvedValue({
        id: 'oauth-1',
        user: {
          id: 'user-1',
          email: baseProfile.email,
          displayName: 'Google User',
        },
      });

      const result = await service.loginWithGoogle(baseProfile);

      expect(result.user.id).toBe('user-1');
      expect(prismaMock.oAuthAccount.create).not.toHaveBeenCalled();
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('branch 2: links to an existing user when Google verified the email', async () => {
      prismaMock.oAuthAccount.findUnique.mockResolvedValue(null);
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: baseProfile.email,
        displayName: 'Existing User',
      });

      const result = await service.loginWithGoogle(baseProfile);

      expect(prismaMock.oAuthAccount.create).toHaveBeenCalledWith({
        data: {
          provider: 'GOOGLE',
          providerUserId: baseProfile.providerUserId,
          userId: 'user-1',
        },
      });
      expect(result.user.id).toBe('user-1');
    });

    it('branch 2 guard: refuses to link when the Google email is unverified', async () => {
      prismaMock.oAuthAccount.findUnique.mockResolvedValue(null);
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: baseProfile.email,
      });

      await expect(
        service.loginWithGoogle({ ...baseProfile, emailVerified: false }),
      ).rejects.toThrow(UnauthorizedException);

      // This is the account-takeover prevention — no link may be created
      expect(prismaMock.oAuthAccount.create).not.toHaveBeenCalled();
    });

    it('branch 3: creates a new pre-verified passwordless user', async () => {
      prismaMock.oAuthAccount.findUnique.mockResolvedValue(null);
      prismaMock.user.findUnique.mockResolvedValue(null);

      const createdUser = {
        id: 'user-new',
        email: baseProfile.email,
        displayName: baseProfile.displayName,
      };
      const txMock = {
        user: { create: jest.fn().mockResolvedValue(createdUser) },
        oAuthAccount: { create: jest.fn().mockResolvedValue({}) },
      };
      prismaMock.$transaction.mockImplementation(
        async (cb: (tx: typeof txMock) => Promise<unknown>) => cb(txMock),
      );

      const result = await service.loginWithGoogle(baseProfile);

      expect(txMock.user.create).toHaveBeenCalledWith({
        data: {
          email: baseProfile.email,
          passwordHash: null,
          displayName: baseProfile.displayName,
          isVerified: true,
        },
      });
      expect(txMock.oAuthAccount.create).toHaveBeenCalled();
      expect(result.user.id).toBe('user-new');
    });

    it('branch 3 guard: refuses to create a user from an unverified email', async () => {
      prismaMock.oAuthAccount.findUnique.mockResolvedValue(null);
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        service.loginWithGoogle({ ...baseProfile, emailVerified: false }),
      ).rejects.toThrow(UnauthorizedException);

      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });
  });
});
