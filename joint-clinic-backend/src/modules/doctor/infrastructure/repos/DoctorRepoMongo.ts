import { DoctorRepoPort } from "modules/doctor/application/ports/DoctorRepoPort";
import { DoctorModel } from "../models/DoctorModel";
import { Doctor } from "modules/doctor/domain/Doctor";
import mongoose from "mongoose";

export const DoctorRepoMongo: DoctorRepoPort = {
    async getDoctorById(doctorId): Promise<Doctor | null> {
        try {
            if (!mongoose.Types.ObjectId.isValid(doctorId)) {
                return null;
            }
            const doc = await DoctorModel.findById(doctorId).lean();
            return doc as Doctor | null;
        } catch (error) {
            console.error("[DoctorRepoMongo.getDoctorById] DB error:", (error as any).message);
            throw new Error("DATABASE_ERROR");
        }
    },

    async getDoctorsBySpecialization(specialization): Promise<Doctor[]> {
        try {
            const docs = await DoctorModel.find({ specialization }).lean();
            return docs as any as Doctor[];
        } catch (error) {
            console.error("[DoctorRepoMongo.getDoctorsBySpecialization] DB error:", (error as any).message);
            throw new Error("DATABASE_ERROR");
        }
    },

    async updateDoctor(doctorId, updateData): Promise<Doctor | null> {
        try {
            if (!mongoose.Types.ObjectId.isValid(doctorId)) {
                return null;
            }
            const doc = await DoctorModel.findByIdAndUpdate(
                doctorId,
                { $set: updateData },
                { new: true, lean: true }
            );
            return doc as Doctor | null;
        } catch (error) {
            console.error("[DoctorRepoMongo.updateDoctor] DB error:", (error as any).message);
            throw new Error("DATABASE_ERROR");
        }
    }
};