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
  await connectMongo();
  bindAll();
  const app = express();

  app.use(helmet());
  // app.use(cors({ origin: env.CORS_ORIGINS.split(',').map(s => s.trim()) }));

  const allowedOrigins = env.CORS_ORIGINS.split(',').map(s => s.trim()).filter(Boolean);
  console.log(allowedOrigins)
  app.use(cors({
    origin: function (origin, callback) {
      console.log("THE ORIGIN IS: ", origin)
      if (!origin) return callback(null, true); // tools/health/local
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: false
  }));

  app.use(compression());

  app.use(express.json({ limit: '10mb' }));

  app.use(traceId);
  app.use(requestLogger as any);

  app.use(pinoHttp());

  app.use(rateLimit(
    {
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      max: env.RATE_LIMIT_MAX,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

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

  // start the sync jobs
  StartJobs();

  app.listen(env.PORT, () => {
    console.log(`API running at http://localhost:${env.PORT}`);
  });
}
