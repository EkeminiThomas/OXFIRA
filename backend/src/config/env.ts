import 'dotenv/config';
import { StringValue } from 'ms';
import z from 'zod';

const envSchema = z
  .object({
    // App config
    NODE_ENV: z
      .enum(['development', 'staging', 'production'])
      .default('development'),
    PORT: z.coerce.number().int().positive().default(3000),

    // Database config
    DATABASE_URL: z.url(),

    // JWT config
    JWT_SECRET: z
      .string()
      .min(32, 'JWT_SECRET must be at least 32 characters long'),
    JWT_ACCESS_EXPIRY: z
      .string()
      .default('15m')
      .transform((val) => val as StringValue),
    JWT_REFRESH_EXPIRY: z
      .string()
      .default('7d')
      .transform((val) => val as StringValue),

    // Cors config
    CORS_ORIGINS: z
      .string()
      .default('http://localhost:3000,http://localhost:3001')
      .transform((val) => val.split(',').map((origin) => origin.trim())),

    // Redis config
    REDIS_URL: z.url().default('redis://localhost:6379'),

    // ZeptoMail config
    EMAIL_PROVIDER: z.enum(['console', 'zeptomail']).default('console'),
    ZEPTOMAIL_TOKEN: z.string().optional(),
    EMAIL_FROM_ADDRESS: z.email().default('noreply@localhost.dev'),
    EMAIL_FROM_NAME: z.string().default('OXFIRA'),

    // Google OAuth config
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CALLBACK_URL: z
      .url()
      .default('http://localhost:3000/api/auth/google/callback'),
  })
  .refine(
    (cfg) => cfg.EMAIL_PROVIDER !== 'zeptomail' || !!cfg.ZEPTOMAIL_TOKEN,
    { message: 'ZEPTOMAIL_TOKEN is required when EMAIL_PROVIDER is zeptomail' },
  );

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const formatted = parsed.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid environment variables:\n${formatted}`);
  }

  return parsed.data;
}

export const env = loadEnv();
