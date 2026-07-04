import { Inject, Injectable, Logger } from '@nestjs/common';
import z from 'zod';
import { Redis } from 'ioredis';
import { RefreshTokenPayload } from './interfaces/refresh-token-payload.interface';
import { buildRedisKey, REDIS_CLIENT, RedisKeyPrefix } from './redis.constants';

const refreshTokenPayloadSchema = z.object({
  userId: z.string(),
  email: z.email(),
});

@Injectable()
export class RefreshTokenStore {
  private readonly logger = new Logger(RefreshTokenStore.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async set(
    token: string,
    payload: RefreshTokenPayload,
    ttlSeconds: number,
  ): Promise<void> {
    const tokenKey = buildRedisKey(RedisKeyPrefix.REFRESH_TOKEN, token);
    const userIndexKey = buildRedisKey(
      RedisKeyPrefix.USER_REFRESH_TOKENS,
      payload.userId,
    );

    const pipeline = this.redis.pipeline();
    pipeline.set(tokenKey, JSON.stringify(payload), 'EX', ttlSeconds);
    pipeline.sadd(userIndexKey, token);
    await pipeline.exec();
  }

  async get(token: string): Promise<RefreshTokenPayload | null> {
    const key = buildRedisKey(RedisKeyPrefix.REFRESH_TOKEN, token);
    const raw = await this.redis.get(key);
    if (!raw) {
      return null;
    }

    const result = refreshTokenPayloadSchema.safeParse(JSON.parse(raw));
    if (!result.success) {
      this.logger.warn(`Currupted refresh token payload at key "${key} (discarding)`);
      await this.redis.del(key);
      return null;
    }

    return result.data;
  }

  async delete(token: string): Promise<void> {
    const stored = await this.get(token);
    if (!stored) {
      return;
    }

    const tokenKey = buildRedisKey(RedisKeyPrefix.REFRESH_TOKEN, token);
    const userIndexKey = buildRedisKey(
      RedisKeyPrefix.USER_REFRESH_TOKENS,
      stored.userId,
    );

    const pipeline = this.redis.pipeline();
    pipeline.del(tokenKey);
    pipeline.srem(userIndexKey, token);
    await pipeline.exec();
  }

  async deleteAllForUser(userId: string): Promise<void> {
    const userIndexKey = buildRedisKey(
      RedisKeyPrefix.USER_REFRESH_TOKENS,
      userId,
    );

    const tokens = await this.redis.smembers(userIndexKey);
    if (tokens.length === 0) {
      return;
    }

    const pipeline = this.redis.pipeline()
    for (const token of tokens) {
      const tokenKey = buildRedisKey(RedisKeyPrefix.REFRESH_TOKEN, token);
      pipeline.del(tokenKey);
    }

    pipeline.del(userIndexKey);
    await pipeline.exec();
  }
}