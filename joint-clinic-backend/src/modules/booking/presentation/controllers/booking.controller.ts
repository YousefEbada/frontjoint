import { Request, Response } from 'express';
import { CreateBookingSchema } from '../validators/booking.schemas.js';
import { resolve, token } from '../../../../app/container.js';
import { CreateBooking } from '../../application/use-cases/CreateBooking.js';
import { GetCalendar } from '../../application/use-cases/GetCalendar.js';
import { BookingRepoPort } from '../../application/ports/BookingRepoPort.js';

const BOOKING_REPO = token<BookingRepoPort>('BOOKING_REPO');

export async function book(req: Request, res: Response) {
  const input = CreateBookingSchema.parse(req.body);
  const uc = new CreateBooking(resolve(BOOKING_REPO));
  const result = await uc.exec(input);
  res.status(201).json(result);
}

export async function calendar(req: Request, res: Response) {
  const doctorId = String(req.query.doctorId);
  const day = new Date(String(req.query.day || new Date().toISOString()));
  const uc = new GetCalendar(resolve(BOOKING_REPO));
  const items = await uc.exec(doctorId, day);
  res.json(items);
}
