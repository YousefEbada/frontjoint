import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  createBooking,
  getCalendar,
  cancelBooking,
  rescheduleBooking,
  getAvailableSlots,
  getBookingById,
  getDoctorBookings,
  updateBookingStatus
} from './controllers/booking.controller.js';
// import { auth } from '../../../shared/middleware/auth.js';
import { validate } from '../../../shared/middleware/validate.js';

export const bookingRoutes = Router();

// Rate limiting
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

bookingRoutes.use(bookingLimiter);
// bookingRoutes.use(auth); // Uncomment when auth middleware is ready

// Booking operations (I will refactor these later)
// This is important for creating and getAvailable slots
// ensure you handle double bookings 
bookingRoutes.post('/', createBooking);
bookingRoutes.get('/doctor/:doctorId/slots', getAvailableSlots);

// i will see this later
bookingRoutes.get('/:id', getBookingById);
bookingRoutes.put('/:id/cancel', cancelBooking);
bookingRoutes.put('/:id/reschedule', rescheduleBooking);
bookingRoutes.patch('/:id/status', updateBookingStatus);

// Calendar and availability (I will refactor these later)
bookingRoutes.get('/calendar/doctor/:doctorId', getCalendar);

// CHECK THIS FUNCTION
bookingRoutes.get('/doctor/:doctorId/bookings', getDoctorBookings);

// Legacy routes for backward compatibility
bookingRoutes.post('/book', createBooking);
bookingRoutes.get('/calendar', getCalendar);
