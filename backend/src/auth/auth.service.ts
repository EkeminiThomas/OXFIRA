import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes, randomUUID } from 'crypto';
import ms from 'ms';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenStore } from '../redis/refresh-token.store';
import { env } from '../config/env';
import { VerificationTokenType } from '../../generated/prisma/enums';
import {
  DecodedJwtPayload,
  JwtPayload,
} from './interfaces/jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  ValidationException,
} from '../common/errors/exceptions';
import { AccessTokenBlacklistStore } from '../redis/access-token-blacklist.store';
import { generateOtp } from '../common/utils/otp.util';
import { OTP_EXPIRY, OTP_MAX_ATTEMPTS } from './auth.constants';
import {
  EMAIL_SERVICE,
  type EmailService,
  OtpPurpose,
} from '../email/interfaces/email-service.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenStore: RefreshTokenStore,
    private readonly blacklistStore: AccessTokenBlacklistStore,
    @Inject(EMAIL_SERVICE) private readonly emailService: EmailService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 12);

    const user = await this.prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          email: dto.email,
          passwordHash,
          displayName: dto.displayName,
        },
      });

      await tx.verificationToken.create({
        data: {
          tokenHash: otpHash,
          userId: createdUser.id,
          type: VerificationTokenType.EMAIL_VERIFICATION,
          expiresAt: new Date(Date.now() + ms(OTP_EXPIRY)),
        },
      });

      return createdUser;
    });

    await this.emailService.sendOtpEmail(
      dto.email,
      otp,
      OtpPurpose.EMAIL_VERIFICATION,
    );

    const tokens = await this.generateTokens(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException(
        'This account uses Google Sign-In. Please log in with Google.',
      );
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshTokenValue: string) {
    const stored = await this.refreshTokenStore.get(refreshTokenValue);

    if (!stored) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    await this.refreshTokenStore.delete(refreshTokenValue);

    const { accessToken, refreshToken: newRefreshTokenValue } =
      await this.generateTokens(stored.userId, stored.email);

    return { accessToken, refreshToken: newRefreshTokenValue };
  }

  async logout(accessToken: string, userId: string, refreshTokenValue: string) {
    const stored = await this.refreshTokenStore.get(refreshTokenValue);

    if (stored && stored.userId === userId) {
      await this.refreshTokenStore.delete(refreshTokenValue);
    }

    const decoded: DecodedJwtPayload | null =
      this.jwtService.decode(accessToken);
    if (decoded?.jti && decoded?.exp) {
      const ttlSeconds = decoded.exp - Math.floor(Date.now() / 1000);
      const jti: string = decoded.jti;
      await this.blacklistStore.blacklist(jti, ttlSeconds);
    }
  }

  async verifyEmail(email: string, otp: string) {
    const genericError = 'Invalid or expired verification code';
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ValidationException(genericError);
    }

    const stored = await this.prisma.verificationToken.findUnique({
      where: {
        userId_type: {
          userId: user.id,
          type: VerificationTokenType.EMAIL_VERIFICATION,
        },
      },
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new ValidationException(genericError);
    }

    if (stored.attempts >= OTP_MAX_ATTEMPTS) {
      throw new ValidationException(
        'Too many attempts. Please request a new code.',
      );
    }

    const valid = await bcrypt.compare(otp, stored.tokenHash);
    if (!valid) {
      await this.prisma.verificationToken.update({
        where: { id: stored.id },
        data: { attempts: { increment: 1 } },
      });

      throw new ValidationException(genericError);
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: stored.userId },
        data: { isVerified: true },
      }),
      this.prisma.verificationToken.delete({ where: { id: stored.id } }),
    ]);
  }

  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return;
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 12);

    await this.prisma.verificationToken.upsert({
      where: {
        userId_type: {
          userId: user.id,
          type: VerificationTokenType.PASSWORD_RESET,
        },
      },
      create: {
        tokenHash: otpHash,
        userId: user.id,
        type: VerificationTokenType.PASSWORD_RESET,
        expiresAt: new Date(Date.now() + ms(OTP_EXPIRY)),
      },
      update: {
        tokenHash: otpHash,
        expiresAt: new Date(Date.now() + ms(OTP_EXPIRY)),
        attempts: 0,
      },
    });

    await this.emailService.sendOtpEmail(email, otp, OtpPurpose.PASSWORD_RESET);
  }

  async confirmPasswordReset(email: string, otp: string, password: string) {
    const genericError = 'Invalid or expired reset code';
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ValidationException(genericError);
    }

    const stored = await this.prisma.verificationToken.findUnique({
      where: {
        userId_type: {
          userId: user.id,
          type: VerificationTokenType.PASSWORD_RESET,
        },
      },
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new ValidationException(genericError);
    }

    if (stored.attempts >= OTP_MAX_ATTEMPTS) {
      throw new ValidationException(
        'Too many attempts. Please request a new code.',
      );
    }

    const valid = await bcrypt.compare(otp, stored.tokenHash);
    if (!valid) {
      await this.prisma.verificationToken.update({
        where: { id: stored.id },
        data: { attempts: { increment: 1 } },
      });
      throw new ValidationException(genericError);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: stored.userId },
        data: { passwordHash },
      }),
      this.prisma.verificationToken.delete({ where: { id: stored.id } }),
    ]);

    await this.refreshTokenStore.deleteAllForUser(stored.userId);
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        isVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async generateTokens(userId: string, email: string) {
    const payload: JwtPayload = { sub: userId, email, jti: randomUUID() };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: env.JWT_ACCESS_EXPIRY,
    });

    const refreshTokenValue = randomBytes(40).toString('hex');
    await this.refreshTokenStore.set(
      refreshTokenValue,
      { userId, email },
      Math.floor(ms(env.JWT_REFRESH_EXPIRY) / 1000),
    );

    return { accessToken, refreshToken: refreshTokenValue };
  }
}
