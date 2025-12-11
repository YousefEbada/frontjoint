import mongoose from "mongoose";
import { PatientModel } from "../models/PatientModel";
import { Patient } from "modules/patient/domain/Patient";
import { PatientRepoPort } from "modules/patient/application/ports/PatientRepoPort";

export const PatientRepoMongo: PatientRepoPort = {
    async getPatient(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null; // let use-case decide
            }
            const patient = await PatientModel.findById(id)
            .populate({
                path: 'userId',
                select: 'fullName firstName lastName email phone gender'
            })
            .lean();
            return patient as any as Patient ?? null;
        } catch (error) {
            console.error("[PatientRepoMongo.getPatient] DB error:", (error as any).message);
            throw new Error("DATABASE_ERROR");
        }
    },

    async updatePatient(id, data) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null; // let use-case decide
            }
            const patient = await PatientModel.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true, lean: true }
            );
            return patient as any as Patient ?? null;
        } catch (error) {
            console.error("[PatientRepoMongo.updatePatient] DB error:", (error as any).message);
            throw new Error("DATABASE_ERROR");
        }
    },

    async createPatient(data) {
        try {
            const newPatient = new PatientModel(data);
            const savedPatient = await newPatient.save();
            return savedPatient.toObject() as any as Patient;
        } catch (error) {
            console.error("[PatientRepoMongo.createPatient] DB error:", (error as any).message);
            throw new Error("DATABASE_ERROR");
        }
    }
};
