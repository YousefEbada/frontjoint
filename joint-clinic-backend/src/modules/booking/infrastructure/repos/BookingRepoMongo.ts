import { BookingRepoPort } from '../../application/ports/BookingRepoPort.js';
import { BookingModel } from '../models/BookingModel.js';
import { startOfDay, endOfDay } from '../../../../shared/utils/date.js';
import { Booking } from '../../domain/Booking.js';

export const BookingRepoMongo: BookingRepoPort = {
  async book(b): Promise<Booking> {
    const doc = await BookingModel.create({ ...b }, { new: true });
    return (doc as any).toObject() as Booking;
  },

  async getAllBookings(): Promise<Booking[]> {
    const docs = await BookingModel.find().lean();
    return docs as unknown as Booking[];
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
  
  // // I did that to get the active patients related to a specific doctor
  // but how can i get inactive patients?
  // this one will returns the patient related to doctors 
  // but also will return the active patients only
  // i should see how to return the inactive patients and may relate it with sessions
  async findPatientsByDoctorAndStatus(doctorId: string, status: 'active' | 'inactive'): Promise<{ _id: string; name: string, injury: string, status: string }[]> {
    const docs = await BookingModel.aggregate([
        { $match: {doctorId, status} },
      { $group: { _id: '$patientId' } },
      { $lookup: {
          from: "patients",
          localField: "_id",
          foreignField: "_id",
        as: "patient"
      }},
      { $unwind: "$patient" },
      { $lookup: {
          from: "users",
        localField: "patient.userId",
        foreignField: "_id",
        as: "user"
      }},
      { $unwind: "$user" },
      {
          $project: {
              _id: "$_id",
              name: "$user.fullName",
              injury: "$patient.injuryDetails.affectedArea",
              status: "$patient.status"
        }
      }
    ]);
    return docs as unknown as { _id: string; name: string, injury: string, status: string }[];
  },

  async findBookingsByDoctor(doctorId: string): Promise<Booking[]> {
    const docs = await BookingModel.find({ doctorId }).lean();
    return docs as unknown as Booking[];
  },
  
  async findBookingsByDoctorAndDay(doctorId, day) {
    const docs = await BookingModel.find({ doctorId, slotStart: { $gte: startOfDay(day) }, slotEnd: { $lte: endOfDay(day) } }).lean();
    return docs as any;
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
