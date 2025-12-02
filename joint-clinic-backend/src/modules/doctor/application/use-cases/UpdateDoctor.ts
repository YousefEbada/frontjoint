import { Doctor } from "modules/doctor/domain/Doctor";
import { DoctorRepoPort } from "../ports/DoctorRepoPort";

type UpdateDoctorResult =
    | { ok: true; doctor: Doctor }
    | { ok: false; error: string }

export class UpdateDoctor {
    constructor(private doctorRepo: DoctorRepoPort) {}

    async exec(doctorId: string, updateData: Partial<Doctor>): Promise<UpdateDoctorResult> {
        try {
            const doctor = await this.doctorRepo.getDoctorById(doctorId);
            if (!doctor) return { ok: false, error: "Doctor not found" };

            const allowedFields: (keyof Doctor)[] = [
                "_id",
                "userId",
                "specialization",
                "licenseNumber",
                "yearsOfExperience",
                "department",
                "clinicSchedule"
            ];
            const invalidKeys = Object.keys(updateData).filter(
                key => !allowedFields.includes(key as keyof Doctor)
            );
            if (invalidKeys.length > 0) {
                return { ok: false, error: `Invalid fields in updateData: ${invalidKeys.join(", ")}` };
            }

            const mergedData = { ...doctor, ...updateData };

            const updatedDoctor = await this.doctorRepo.updateDoctor(doctorId, mergedData);
            if (!updatedDoctor) return { ok: false, error: "Failed to update doctor" };

            return { ok: true, doctor: updatedDoctor };
        } catch (error) {
            return { ok: false, error: (error as Error).message };
        }
    }
}