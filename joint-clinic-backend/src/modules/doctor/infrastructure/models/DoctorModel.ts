import mongoose, { Schema } from "mongoose";

const DoctorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

  specialization: String,
  licenseNumber: String,
  yearsOfExperience: Number,
  department: String,
  
  clinicSchedule: [{
    day: String,
    startTime: String,
    endTime: String
  }]
});

export const DoctorModel = mongoose.model("Doctor", DoctorSchema);