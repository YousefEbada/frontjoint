export type BookingStatus = 'Booked' | 'Rescheduled' | 'Cancelled' | 'NoShow';
export interface Booking {
  _id: string;
  patientId: string;
  doctorId: string;
  // what is branch id?
  branchId: string;
  slotStart: Date;
  slotEnd: Date;
  status: BookingStatus;
  reminder24hSent: boolean;
  reminder1hSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}
