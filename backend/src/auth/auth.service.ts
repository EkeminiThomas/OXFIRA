import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes, randomUUID } from 'crypto';
import ms from 'ms';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenStore } from '../redis/refresh-token.store';
import { env } from '../config/env';
import { VerificationTokenType } from '../../generated/prisma/enums';
import { DecodedJwtPayload, JwtPayload } from './interfaces/jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  ValidationException,
} from '../common/errors/exceptions';
import { AccessTokenBlacklistStore } from '../redis/access-token-blacklist.store';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenStore: RefreshTokenStore,
    private readonly blacklistStore: AccessTokenBlacklistStore,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const verificationToken = randomBytes(32).toString('hex');

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
          token: verificationToken,
          userId: createdUser.id,
          type: VerificationTokenType.EMAIL_VERIFICATION,
          expiresAt: new Date(Date.now() + ms('24h')),
        },
      });

      return createdUser;
    });

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

    const decoded = this.jwtService.decode(accessToken) as DecodedJwtPayload | null;
    if (decoded?.jti && decoded?.exp) {
      const ttlSeconds = decoded.exp - Math.floor(Date.now() / 1000);
      await this.blacklistStore.blacklist(decoded.jti, ttlSeconds);
    }
  }

  async verifyEmail(token: string) {
    const stored = await this.prisma.verificationToken.findUnique({
      where: { token },
    });

    if (
      !stored ||
      stored.expiresAt < new Date() ||
      stored.type !== VerificationTokenType.EMAIL_VERIFICATION
    ) {
      throw new ValidationException('Invalid or expired verification token');
    }

    await this.prisma.user.update({
      where: { id: stored.userId },
      data: { isVerified: true },
    });

    await this.prisma.verificationToken.delete({ where: { id: stored.id } });
  }

  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) { return; }

    const resetToken = randomBytes(32).toString('hex');
    await this.prisma.verificationToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        type: VerificationTokenType.PASSWORD_RESET,
        expiresAt: new Date(Date.now() + ms('1h')),
      },
    });
  }

  async confirmPasswordReset(token: string, password: string) {
    const stored = await this.prisma.verificationToken.findUnique({
      where: { token },
    });

    if (
      !stored ||
      stored.expiresAt < new Date() ||
      stored.type !== VerificationTokenType.PASSWORD_RESET
    ) {
      throw new ValidationException('Invalid or expired reset token');
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