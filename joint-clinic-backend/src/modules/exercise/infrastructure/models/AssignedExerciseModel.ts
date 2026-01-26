import mongoose, { Schema } from "mongoose";

const assignedExerciseSchema = new Schema(
    {
        // patientId: { type: String, required: true }, // Using NixpendId or ObjectId? User said "real doctor nixpenId stored in local storage", and patients have nixpendIds. Let's assume user ID for now or check PatientModel. PatientModel has nixpendId and userId. Usually relations use ObjectId. 
        // PatientModel uses `nixpendId: { type: String, required: true, unique: true }`.
        // The request mentions `doctorNixpendId`.
        // Let's use ObjectId for internal references if possible, but if not available, use Strings. 
        // Ideally referencing Patient schema.
        patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
        exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
        doctorNixpendId: { type: String, required: true }, // As requested "use real doctor nixpenId"
        assignedAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
        notes: String
    },
    { timestamps: true }
);

export const AssignedExerciseModel = mongoose.model("AssignedExercise", assignedExerciseSchema);
