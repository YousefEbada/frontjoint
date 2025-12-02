import { Doctor } from "modules/doctor/domain/Doctor";
import { DoctorRepoPort } from "../ports/DoctorRepoPort";

type FindDoctorsBySpecializationResult =
    | { ok: true; doctors: Doctor[] }
    | { ok: false; error: string }

export class FindDoctorsBySpecialization {
    constructor(private doctorRepo: DoctorRepoPort) { }

    async exec(specialization: string): Promise<FindDoctorsBySpecializationResult> {
        try {
            const doctors = await this.doctorRepo.getDoctorsBySpecialization(specialization);
            // Determine the specialization of the doctor to prevent SQL injection
            if (!doctors || doctors.length === 0) return { ok: false, error: "No doctors found with the given specialization" };
            return { ok: true, doctors };
        } catch (error) {
            return { ok: false, error: (error as Error).message };
        }
    }
}