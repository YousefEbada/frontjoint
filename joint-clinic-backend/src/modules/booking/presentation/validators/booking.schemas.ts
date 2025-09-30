import { z } from 'zod';
export const CreateBookingSchema = z.object({
  patientId: z.string().min(1),
  doctorId: z.string().min(1),
  branchId: z.string().min(1),
  slotStart: z.coerce.date(),
  slotEnd: z.coerce.date()
});

export const CalendarQuerySchema = z.object({
  doctorId: z.string().min(1),
  day: z.coerce.date().optional() // default: today 
});