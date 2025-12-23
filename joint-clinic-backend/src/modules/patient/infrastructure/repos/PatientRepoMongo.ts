import mongoose from "mongoose";
import { PatientModel } from "../models/PatientModel";
import { Patient } from "modules/patient/domain/Patient";
import { PatientRepoPort } from "modules/patient/application/ports/PatientRepoPort";

export const PatientRepoMongo: PatientRepoPort = {
    async getPatient(id) {
        try {
            console.log("PatientRepoMongo.getPatient] Fetching patient with id:", id);
            // if (!mongoose.Types.ObjectId.isValid(id)) {
            //     return null; // let use-case decide
            // }
            const patient = await PatientModel.findOne({ userId: id })
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

    // Decide if you want to use patient id or userId here
    async updatePatient(id, data) {
        try {
            // if (!mongoose.Types.ObjectId.isValid(id)) {
            //     return null; // let use-case decide
            // }
            const patient = await PatientModel.findOneAndUpdate(
                { userId: id },
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
    },

    async updatePatientStatus(id, status, options) {
        try {
            // if (!mongoose.Types.ObjectId.isValid(id)) {
            //     throw new Error("INVALID_ID");
            // }
            await PatientModel.findByIdAndUpdate(
                id,
                { status },
                { session: options?.tx }
            );
        } catch (error) {
            console.error("[PatientRepoMongo.updatePatientStatus] DB error:", (error as any).message);
            throw new Error("DATABASE_ERROR");
        }
    }
};
