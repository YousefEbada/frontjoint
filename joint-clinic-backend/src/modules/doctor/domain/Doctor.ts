import { ObjectId } from "mongoose"

export interface Doctor {
    _id: ObjectId | string,
    userId: ObjectId | string,
    // Determine the specialization of the doctor to prevent SQL injection
    specialization: String,
    licenseNumber: String,
    yearsOfExperience: Number,
    department: String,
    clinicSchedule: [{
        day: String,
        startTime: String,
        endTime: String
    }]
}
