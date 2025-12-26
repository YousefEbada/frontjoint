import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import pinoHttp from 'pino-http';
import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';
import { mountRoutes } from './routes.js';
import { connectMongo, mongoState } from '../infra/db/mongoose.js';
import { errorHandler } from '../shared/middleware/errorHandler.js';
import { traceId } from '../shared/middleware/traceId.js';
import { bindAll } from './container.bindings.js';
import { requestLogger } from 'shared/middleware/requestLogger.js';
import { StartJobs } from 'jobs/startJobs.js';

export async function startServer() {
  try {
    await connectMongo();
  } catch (err) {
    console.error('Mongo connection failed:', err);
  }

  bindAll();
  const app = express();

  app.use(helmet());

  const allowedOrigins = (env.CORS_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  app.use(cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin))
        return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    }
  }));

  app.use(compression());
  app.use(express.json({ limit: '10mb' }));

  app.use(traceId);
  app.use(requestLogger as any);
  app.use(pinoHttp());

  app.use(rateLimit({
    windowMs: Number(env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number(env.RATE_LIMIT_MAX) || 100,
    standardHeaders: true,
    legacyHeaders: false
  }));

  app.get('/health', (req, res) => {
    res.json({
      ok: true,
      service: 'api',
      env: env.NODE_ENV,
      now: new Date().toISOString(),
      uptimeSec: Math.round(process.uptime()),
      mongo: mongoState(),
      traceId: (req as any).traceId
    });
  });

  mountRoutes(app);
  app.use(errorHandler);

  try {
    StartJobs();
  } catch (err) {
    console.error('StartJobs failed:', err);
  }

  const PORT = Number(process.env.PORT) || Number(env.PORT) || 4000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API running on port ${PORT}`);
  });
}
