import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development','test','production']).default('development'),
  MONGO_URI: z.string().min(1),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
  JWT_SECRET: z.string().min(10),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().default(120),
  AZURE_BLOB_CONN: z.string().default('UseDevelopmentStorage=true'),
  AZURE_BLOB_CONTAINER: z.string().default('medical')
});

export const env = EnvSchema.parse(process.env);
