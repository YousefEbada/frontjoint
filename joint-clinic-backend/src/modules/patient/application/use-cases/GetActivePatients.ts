import { PatientRepoPort } from "../ports/PatientRepoPort.js";

export class GetActivePatients {
    constructor(private patientRepo: PatientRepoPort) { }

    async exec() {
        try {
            const patients = await this.patientRepo.getActivePatients();
            return { ok: true, data: patients };
        } catch (error) {
            return { ok: false, error: "Failed to fetch active patients" };
        }
    }
}
