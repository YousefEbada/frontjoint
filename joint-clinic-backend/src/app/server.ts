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
  bindAll();
  const app = express();

  // Basic middleware
  app.use(helmet());
  const allowedOrigins = (env.CORS_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  app.use(cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true); // allow tools/health/local
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: false
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

  // Health check
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

  // Mount routes and error handler
  mountRoutes(app);
  app.use(errorHandler);

  // Start server immediately
  const PORT = Number(process.env.PORT) || Number(env.PORT) || 4000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API running on port ${PORT}`);
  });

  // 🔥 Non-blocking startup tasks
  connectMongo()
    .then(() => console.log('Mongo connected'))
    .catch(err => console.error('Mongo connection failed:', err));

  try {
    StartJobs();
  } catch (err) {
    console.error('StartJobs failed:', err);
  }
}
