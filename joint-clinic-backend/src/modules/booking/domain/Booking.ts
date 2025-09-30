export type BookingStatus = 'Booked'|'Rescheduled'|'Cancelled'|'NoShow';
export interface Booking {
  _id: string;
  patientId: string;
  doctorId: string;
  branchId: string;
  slotStart: Date;
  slotEnd: Date;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}
