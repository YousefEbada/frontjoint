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

// const SessionSchema = new Schema({
//   name: { type: String, required: true },
//   scheduledFor: { type: Date, required: true },
//   status: {
//     type: String,
//     enum: ['pending', 'completed', 'cancelled'],
//     default: 'pending'
//   },
//   completedAt: Date
// });

// this will be coming from booking

// const WeeklyPlanSchema = new Schema({
//   weekNumber: { type: Number, required: true },
//   exercises: [ExerciseSchema],
//   plannedBookings: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Booking'
//   }],
//   startDate: Date,
//   endDate: Date
// });

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
  // progress: {
  //   totalSessions: { type: Number, default: 0 },
  //   sessionsCompleted: { type: Number, default: 0 },
  //   totalExercises: { type: Number, default: 0 },
  //   exercisesCompleted: { type: Number, default: 0 },
  //   treatmentLengthWeeks: { type: Number, default: 0 },
  //   treatmentStartDate: Date,
  //   currentWeek: { type: Number, default: 1 }
  // },
  // weeklyPlans: [WeeklyPlanSchema],
  notes: String
}, { timestamps: true });

export const PatientModel = mongoose.model("Patient", PatientSchema);