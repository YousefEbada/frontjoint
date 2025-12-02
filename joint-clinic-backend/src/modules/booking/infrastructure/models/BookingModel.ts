import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  patientId: { type: String, required: true, index: true },
  doctorId:  { type: String, required: true, index: true },
  branchId:  { type: String, required: true },
  slotStart: { type: Date, required: true },
  slotEnd:   { type: Date, required: true },
  bookingType: { type: String, enum: ['Consultation', 'FollowUp', 'Emergency'], default: 'Consultation' },
  reminder24hSent: { type: Boolean, default: false },
  reminder1hSent:  { type: Boolean, default: false },
  status:    { type: String, enum: ['Booked','Rescheduled','Cancelled','NoShow'], default: 'Booked' }
}, { timestamps: true });

schema.index({ doctorId: 1, slotStart: 1, slotEnd: 1 }, { unique: true });

export const BookingModel = mongoose.model('Booking', schema);
