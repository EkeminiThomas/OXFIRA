import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { env } from '../../config/env';
import { UnauthorizedException } from '../../common/errors/exceptions';
import { DecodedJwtPayload } from '../interfaces/jwt-payload.interface';
import { AccessTokenBlacklistStore } from '../../redis/access-token-blacklist.store';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blacklistStore: AccessTokenBlacklistStore,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: DecodedJwtPayload) {
    const isBlacklisted = await this.blacklistStore.isBlacklisted(payload.jti);
    if (isBlacklisted) {
      throw new UnauthorizedException('Token has been revoked');
    }
    
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, displayName: true, isVerified: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}