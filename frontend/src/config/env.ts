// src/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_PROTOCOL: z.string().default('http'), 
  NEXT_PUBLIC_API_HOST: z.string().default('localhost'), 
  NEXT_PUBLIC_API_PORT: z.string().default('9999'), 
  NEXT_PUBLIC_API_BASE_PATH: z.string().default(''), 
  NEXT_PUBLIC_API_TIMEOUT: z.string().default('10000'), 
  NEXT_PUBLIC_API_RETRY_ATTEMPTS: z.string().default('3'), 
  NEXT_PUBLIC_API_RETRY_DELAY: z.string().default('1000'), 
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'), 
});

type Env = z.infer<typeof envSchema>;

const env = envSchema.parse({
  NEXT_PUBLIC_API_PROTOCOL: process.env.NEXT_PUBLIC_API_PROTOCOL,
  NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  NEXT_PUBLIC_API_PORT: process.env.NEXT_PUBLIC_API_PORT,
  NEXT_PUBLIC_API_BASE_PATH: process.env.NEXT_PUBLIC_API_BASE_PATH,
  NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
  NEXT_PUBLIC_API_RETRY_ATTEMPTS: process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS,
  NEXT_PUBLIC_API_RETRY_DELAY: process.env.NEXT_PUBLIC_API_RETRY_DELAY,
  NODE_ENV: process.env.NODE_ENV,
});

export default env;