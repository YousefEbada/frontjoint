import { Router, type Express } from 'express';
import { authRoutes } from '../modules/auth/presentation/routes.js';
import { bookingRoutes } from '../modules/booking/presentation/routes.js';
import { reportRoutes } from '../modules/reports/presentation/routes.js';

export function mountRoutes(app: Express) {
  const api = Router();
  api.use('/auth', authRoutes);
  api.use('/booking', bookingRoutes);
  api.use('/reports', reportRoutes);
  app.use('/api', api);
}
