import { Doctor } from "modules/doctor/domain/Doctor";

export interface DoctorRepoPort {
    getDoctorById(doctorId: string): Promise<Doctor | null>;
    getDoctorsBySpecialization(specialization: string): Promise<Doctor[]>;
    // createDoctor(doctorData: Partial<Doctor>): Promise<Doctor>;
    updateDoctor(doctorId: string, updateData: Partial<Doctor>): Promise<Doctor | null>;
    // deleteDoctor(doctorId: string): Promise<boolean>;
}