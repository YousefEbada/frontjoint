import { Router } from 'express';
import { book, calendar } from './controllers/booking.controller.js';
export const bookingRoutes = Router();
bookingRoutes.post('/book', book);
bookingRoutes.get('/calendar', calendar);
