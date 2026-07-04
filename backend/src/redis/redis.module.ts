import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { env } from '../config/env';
import { RefreshTokenStore } from './refresh-token.store';
import { REDIS_CLIENT } from './redis.constants';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => new Redis(env.REDIS_URL),
    },
    RefreshTokenStore,
  ],
  exports: [REDIS_CLIENT, RefreshTokenStore],
})
export class RedisModule {}
