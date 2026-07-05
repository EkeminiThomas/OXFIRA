import { Inject, Injectable } from '@nestjs/common';
import { buildRedisKey, REDIS_CLIENT, RedisKeyPrefix } from './redis.constants';
import { Redis } from 'ioredis';

@Injectable()
export class AccessTokenBlacklistStore {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async blacklist(jti: string, ttlSeconds: number): Promise<void> {
    if (ttlSeconds <= 0) {
      return;
    }

    const key = buildRedisKey(RedisKeyPrefix.ACCESS_TOKEN_BLACKLIST, jti);
    await this.redis.set(key, '1', 'EX', ttlSeconds);
  }

  async isBlacklisted(jti: string): Promise<boolean> {
    const key = buildRedisKey(RedisKeyPrefix.ACCESS_TOKEN_BLACKLIST, jti);
    const result = await this.redis.exists(key);
    return result === 1;
  }
}
