import { Doctor } from "modules/doctor/domain/Doctor.js";
import { DoctorModel } from "../models/DoctorModel.js";
import { DoctorRepoPort } from "modules/doctor/application/ports/DoctorRepoPort.js";
import mongoose, { isValidObjectId } from "mongoose";

export const DoctorRepoMongo: DoctorRepoPort = {
  // Save many practitioners (replace existing ones)
  async saveMany(practitioners: Doctor[]): Promise<void> {
    console.log("[DoctorRepoMongo] Saving practitioners:", practitioners.length);
    const res = await DoctorModel.insertMany(practitioners, { ordered: false });
    console.log("[DoctorRepoMongo] Saved practitioners:", res.length);
    return;
  },

  // Get all practitioners, optionally filtered by branch or department
  async getAll(branch?: string, department?: string): Promise<Doctor[]> {
    const filter: any = {};

    if (branch) {
      filter["practitionerCompany.branch"] = branch;
    }
    if (department) {
      filter.department = department;
    }

    const docs = await DoctorModel.find(filter).lean();
    return docs as unknown as Doctor[];
  },

  async findById(id: string): Promise<Doctor | null> {
    console.log("===== findById called with id ======= ", id);
    console.log("===== id type ======= ", typeof id);
    console.log("===== id length ======= ", id?.length);
    // console.log("===== is valid ObjectId? ======= ", mongoose.Types.ObjectId.isValid(id));

    // // Check if ID is a valid ObjectId format (24 hex characters)
    // if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    //   console.log("===== Invalid ObjectId, returning null =======");
    //   return null;
    // }

    try {
      const doc = await DoctorModel.findOne({ nixpendId: id }).lean();
      // console.log("===== isValidObjectId(id) ======= ", isValidObjectId(id));
      console.log("===== doc found ======= ", doc);
      return doc ? (doc as unknown as Doctor) : null;
    } catch (error) {
      console.error("===== Error in findById ======= ", error);
      return null;
    }
  },

  // Clear the collection
  async clear(): Promise<void> {
    await DoctorModel.deleteMany({});
  }
}