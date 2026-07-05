import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { env } from '../config/env';
import { RefreshTokenStore } from './refresh-token.store';
import { REDIS_CLIENT } from './redis.constants';
import { AccessTokenBlacklistStore } from './access-token-blacklist.store';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => new Redis(env.REDIS_URL),
    },
    RefreshTokenStore,
    AccessTokenBlacklistStore,
  ],
  exports: [REDIS_CLIENT, RefreshTokenStore, AccessTokenBlacklistStore],
})
export class RedisModule {}
