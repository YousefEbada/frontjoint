import { BookingRepoPort } from '../../application/ports/BookingRepoPort.js';
import { BookingModel } from '../models/BookingModel.js';
import { startOfDay, endOfDay } from '../../../../shared/utils/date.js';
import { Booking } from '../../domain/Booking.js';

export const BookingRepoMongo: BookingRepoPort = {
  async create(b) {
    const doc = await BookingModel.create(b);
    return doc.toObject() as Booking;
  },
  async byDoctorAndDay(doctorId, day) {
    const docs = await BookingModel.find({ doctorId, slotStart: { $gte: startOfDay(day) }, slotEnd: { $lte: endOfDay(day) } }).lean();
    return docs as Booking[];
  },
  async existsOverlap(doctorId, start, end) {
    const exists = await BookingModel.exists({ doctorId, $or: [{ slotStart: { $lt: end }, slotEnd: { $gt: start } }] });
    return !!exists;
  },
  async setStatus(id, status) {
    await BookingModel.updateOne({ _id: id }, { $set: { status, updatedAt: new Date() } });
  }
};
