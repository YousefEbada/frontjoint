import { Doctor } from "modules/doctor/domain/Doctor";
import { DoctorModel } from "../models/DoctorModel"; // your Mongoose schema
import { DoctorRepoPort } from "modules/doctor/application/ports/DoctorRepoPort";

export const DoctorRepoMongo: DoctorRepoPort = {
  // Save many practitioners (replace existing ones)
  async saveMany(practitioners: Doctor[]): Promise<void> {
    console.log("[DoctorRepoMongo] Saving practitioners:", practitioners);
    const res = await DoctorModel.insertMany(practitioners, { ordered: false });
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
