import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { env } from '../../config/env';
import { GoogleProfile } from '../interfaces/google-profile.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: env.GOOGLE_CLIENT_SECRET ?? '',
      callbackURL: env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): GoogleProfile {
    const primaryEmail = profile.emails?.[0];

    return {
      providerUserId: profile.id,
      email: primaryEmail?.value ?? '',
      emailVerified: primaryEmail?.verified === true,
      displayName: profile.displayName ?? null,
    };
  }
}
