export const REDIS_CLIENT = 'REDIS_CLIENT';

export enum RedisKeyPrefix {
  REFRESH_TOKEN = 'refresh',
  USER_REFRESH_TOKENS = 'user-refresh-tokens',
}

export function buildRedisKey(prefix: RedisKeyPrefix, identifier: string): string {
  return `${prefix}:${identifier}`;
}