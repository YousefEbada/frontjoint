import { Doctor } from "modules/doctor/domain/Doctor";
import { DoctorModel } from "../models/DoctorModel"; // your Mongoose schema
import { DoctorRepoPort } from "modules/doctor/application/ports/DoctorRepoPort";

export const DoctorRepoMongo: DoctorRepoPort = {
  // Save many practitioners (replace existing ones)
  async saveMany(practitioners: Doctor[]): Promise<void> {
    if (!practitioners.length) return;

    // Upsert each practitioner by nixpendId
    const bulkOps = practitioners.map(prac => ({
      updateOne: {
        filter: { nixpendId: prac.nixpendId },
        update: { $set: prac },
        upsert: true
      }
    }));

    // Sends multiple insertOne, updateOne, updateMany, 
    // replaceOne, deleteOne, and/or deleteMany operations to the MongoDB server in one command. 
    // This is faster than sending multiple independent operations 
    // (e.g. if you use create()) because with bulkWrite() 
    // there is only one network round trip to the MongoDB server.
    await DoctorModel.bulkWrite(bulkOps);
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
    return docs as Doctor[];
  },

  async findById(id: string): Promise<Doctor | null> {
    const doc = await DoctorModel.findOne({ nixpendId: id }).lean();
    return doc ? (doc as Doctor) : null;
  },

  // Clear the collection
  async clear(): Promise<void> {
    await DoctorModel.deleteMany({});
  }
}
