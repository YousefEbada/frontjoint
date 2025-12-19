import { BookingRepoPort } from '../../application/ports/BookingRepoPort.js';
import { BookingModel } from '../models/BookingModel.js';
import { startOfDay, endOfDay } from '../../../../shared/utils/date.js';
import { Booking } from '../../domain/Booking.js';

export const BookingRepoMongo: BookingRepoPort = {
  async book(b): Promise<Booking> {
    const doc = await BookingModel.create({ ...b }, { new: true });
    return (doc as any).toObject() as Booking;
  },
  async findBookingsByDoctorAndDay(doctorId, day) {
    const docs = await BookingModel.find({ doctorId, slotStart: { $gte: startOfDay(day) }, slotEnd: { $lte: endOfDay(day) } }).lean();
    return docs as any;
  },
  async existsOverlap(doctorId, start, end) {
    const exists = await BookingModel.exists({ doctorId, slotStart: { $lt: end }, slotEnd: { $gt: start } });
    return !!exists;
  },
  async setStatus(id, status) {
    await BookingModel.updateOne({ _id: id }, { $set: { status, updatedAt: new Date() } });
  },
  async cancel(b) {
    await BookingModel.updateOne({ _id: b._id }, { $set: { status: 'cancelled', updatedAt: new Date() } });
    return true;
  },
  async reschedule(b): Promise<Booking> {
    const doc = await BookingModel.findByIdAndUpdate(
      b._id,
      { ...b, status: 'rescheduled', updatedAt: new Date() },
      { new: true }
    ).lean();
    return doc as unknown as Booking;
  },
  async findById(id: string): Promise<Booking | null> {
    const doc = await BookingModel.findById(id).lean();
    if (!doc) {
      return null;
    }
    return doc as unknown as Booking;
  },

  async findBookingsByPatient(patientId: string): Promise<Booking[]> {
    const docs = await BookingModel.find({ patientId }).lean();
    return docs as unknown as Booking[];
  },

  async findBookingsByDoctor(doctorId: string): Promise<Booking[]> {
    const docs = await BookingModel.find({ doctorId }).lean();
    return docs as unknown as Booking[];
  },

  async findBookingsByDoctorAndWeek(doctorId: string, weekStart: Date): Promise<Booking[]> {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const docs = await BookingModel.find({
      doctorId,
      appointmentDate: { $gte: weekStart, $lt: weekEnd }
    }).lean();
    return docs as unknown as Booking[];
  },
  async findBookingsByDoctorAndMonth(doctorId: string, monthStart: Date): Promise<Booking[]> {
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    const docs = await BookingModel.find({
      doctorId,
      appointmentDate: { $gte: monthStart, $lte: monthEnd }
    }).lean();
    return docs as unknown as Booking[];
  }
};
