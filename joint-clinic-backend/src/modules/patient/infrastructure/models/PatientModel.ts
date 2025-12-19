import mongoose, { Schema } from "mongoose";

// i will decouple exercises later
const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  assignedBy: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  link: String,
  duration: Number,
  numberOfSets: Number,
  repetitions: Number,
  completed: { type: Boolean, default: false },
  completedAt: Date
});

const InjuryDetailsSchema = new Schema({
  affectedArea: String,
  startDate: Date,
  receivedTreatment: Boolean,
  painSeverity: { type: Number, min: 0, max: 10 },
  howDidInjurHappened: String,
  affectDailyActivities: Boolean,
  additionalNotes: String,
  // check this from the report module and how to sync it
  medicalReports: [String]
});

const PatientSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  nixpendId: { type: String, required: true, unique: true },
  guardianInformation: { type: Schema.Types.ObjectId, ref: "Guardian", required: false },
  medicalRecordNumber: String,
  insuranceId: String,
  bloodGroup: String,
  allergies: [String],
  medicalHistory: [String],
  injuryDetails: InjuryDetailsSchema,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  notes: String
}, { timestamps: true });

export const PatientModel = mongoose.model("Patient", PatientSchema);