import { Booking } from '../../domain/Booking.js';
export interface BookingRepoPort {
  findById(id: string): Promise<Booking | null>;
  book(b: Omit<Booking, '_id'|'createdAt'|'updatedAt'|'status'|'reminder24hSent'|'reminder1hSent'>): Promise<Booking>;
  reschedule(b: Omit<Partial<Booking>, 'createdAt'|'updatedAt'>): Promise<Booking>;
  cancel(b: Booking): Promise<Boolean>
  // I should put reminders here
  findBookingsByDoctorAndDay(doctorId: string, day: Date): Promise<Booking[]>;
  findBookingsByDoctorAndWeek(doctorId: string, weekStart: Date): Promise<Booking[]>;
  findBookingsByDoctorAndMonth(doctorId: string, monthStart: Date): Promise<Booking[]>;
  existsOverlap(doctorId: string, start: Date, end: Date): Promise<boolean>;
  setStatus(id: string, status: Booking['status']): Promise<void>;
}
