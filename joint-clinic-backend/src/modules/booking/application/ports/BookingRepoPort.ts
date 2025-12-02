import { Booking } from '../../domain/Booking.js';
export interface BookingRepoPort {
  create(b: Omit<Booking, '_id'|'createdAt'|'updatedAt'|'status'>): Promise<Booking>;
  reschedule(b: Omit<Booking, 'createdAt'|'updatedAt'|'status'>): Promise<Booking>;
  cancel(b: Booking): Promise<Boolean>
  // reminders shouls i put it here
  findBookingsByDoctorAndDay(doctorId: string, day: Date): Promise<Booking[]>;
  existsOverlap(doctorId: string, start: Date, end: Date): Promise<boolean>;
  setStatus(id: string, status: Booking['status']): Promise<void>;
}
