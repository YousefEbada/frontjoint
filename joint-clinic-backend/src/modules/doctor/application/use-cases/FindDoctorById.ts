import { Doctor } from "modules/doctor/domain/Doctor";
import { DoctorRepoPort } from "../ports/DoctorRepoPort";

type FindDoctorByIdResult =
    | { ok: true; doctor: Doctor }
    | { ok: false; error: string }

export class FindDoctorById {
    constructor(private doctorRepo: DoctorRepoPort) {}

    async exec(doctorId: string): Promise<FindDoctorByIdResult> {
        try {
            const doctor = await this.doctorRepo.getDoctorById(doctorId);
            if (!doctor) return { ok: false, error: "Doctor not found" };

            return { ok: true, doctor };
        } catch (error) {
            return { ok: false, error: (error as Error).message };
        }
    }
}