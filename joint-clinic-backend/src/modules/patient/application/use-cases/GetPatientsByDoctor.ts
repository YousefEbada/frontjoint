import { PatientRepoPort } from "../ports/PatientRepoPort.js";
import { Patient } from "modules/patient/domain/Patient.js";

export class GetPatientsByDoctor {
    constructor(private patientRepo: PatientRepoPort) { }

    async exec(doctorNixpendId: string): Promise<{ ok: boolean, data?: Patient[], error?: string }> {
        try {
            const patients = await this.patientRepo.getPatientsByDoctor(doctorNixpendId);
            return { ok: true, data: patients };
        } catch (error) {
            console.error("[GetPatientsByDoctor] Error:", error);
            return { ok: false, error: "Failed to fetch patients" };
        }
    }
}
