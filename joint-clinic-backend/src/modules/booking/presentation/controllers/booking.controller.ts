import { Request, Response } from 'express';
import { CreateBookingSchema, CalendarQuerySchema } from '../validators/booking.schemas.js';
import { resolve, token } from '../../../../app/container.js';
import { CreateBooking } from '../../application/use-cases/CreateBooking.js';
import { GetCalendar } from '../../application/use-cases/GetCalendar.js';
import { CancelBooking } from '../../application/use-cases/CancelBooking.js';
import { RescheduleBooking } from '../../application/use-cases/RescheduleBooking.js';
import { BookingRepoPort } from '../../application/ports/BookingRepoPort.js';
import { NixpendPort } from '../../../integration/ports/NixpendPorts.js';
import { GetAvailableSlots } from 'modules/booking/application/use-cases/getAvailableSlots.js';
import { BookType } from 'modules/integration/domain/Nixpend.js';

const BOOKING_REPO = token<BookingRepoPort>('BOOKING_REPO');
const NIXPEND_PORT = token<NixpendPort>('NIXPEND_PORT');

export async function createBooking(req: Request, res: Response) {
  try {
    const input = CreateBookingSchema.parse(req.body);
    const uc = new CreateBooking(resolve(BOOKING_REPO), resolve(NIXPEND_PORT));
    const result = await uc.exec(input as BookType);
    
    if (result.ok) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(400).json({ ok: false, error: 'Invalid request data' });
  }
}

export async function getCalendar(req: Request, res: Response) {
  try {
    const { doctorId, day } = CalendarQuerySchema.parse(req.query);
    const targetDay = day || new Date();
    const uc = new GetCalendar(resolve(BOOKING_REPO));
    const items = await uc.exec(doctorId, targetDay);
    res.json({ ok: true, data: items });
  } catch (error) {
    res.status(400).json({ ok: false, error: 'Invalid query parameters' });
  }
}

export async function cancelBooking(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const cancelData = req.body;
    const uc = new CancelBooking(resolve(BOOKING_REPO), resolve(NIXPEND_PORT));
    const result = await uc.exec(id, cancelData);
    
    if (result.ok) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
}

export async function rescheduleBooking(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const rescheduleData = req.body;
    const uc = new RescheduleBooking(resolve(BOOKING_REPO), resolve(NIXPEND_PORT));
    const result = await uc.exec(id, rescheduleData);
    
    if (result.ok) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
}

export async function getAvailableSlots(req: Request, res: Response) {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;
    const uc = new GetAvailableSlots(resolve(NIXPEND_PORT));
    const slots = await uc.exec(doctorId, String(date));
    res.json({ ok: true, data: slots });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
}

export async function getBookingById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const repo = resolve(BOOKING_REPO);
    const booking = await repo.findById(id);
    
    if (booking) {
      res.json({ ok: true, data: booking });
    } else {
      res.status(404).json({ ok: false, error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
}

export async function getDoctorBookings(req: Request, res: Response) {
  try {
    const { doctorId } = req.params;
    const { period, date } = req.query;
    const repo = resolve(BOOKING_REPO);
    const targetDate = date ? new Date(String(date)) : new Date();
    
    let bookings;
    switch (period) {
      case 'day':
        bookings = await repo.findBookingsByDoctorAndDay(doctorId, targetDate);
        break;
      case 'week':
        bookings = await repo.findBookingsByDoctorAndWeek(doctorId, targetDate);
        break;
      case 'month':
        bookings = await repo.findBookingsByDoctorAndMonth(doctorId, targetDate);
        break;
      default:
        bookings = await repo.findBookingsByDoctorAndDay(doctorId, targetDate);
    }
    
    res.json({ ok: true, data: bookings });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
}

export async function updateBookingStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const repo = resolve(BOOKING_REPO);
    
    await repo.setStatus(id, status);
    res.json({ ok: true, message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
}
