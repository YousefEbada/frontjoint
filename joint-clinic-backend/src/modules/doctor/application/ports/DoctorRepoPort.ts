import { Doctor } from "modules/doctor/domain/Doctor.js";

export interface DoctorRepoPort {
  saveMany(practitioners: any[]): Promise<void>;
  getAll(branch?: string, department?: string): Promise<any[]>;
  findById(id: string): Promise<Partial<Doctor> | null>;
  clear(): Promise<void>;
}