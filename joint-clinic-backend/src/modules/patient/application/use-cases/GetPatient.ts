import { PatientRepoPort } from "../ports/PatientRepoPort";

export class GetPatient {
    constructor(private patientRepo: PatientRepoPort) {}
    async exec(userId: string): Promise<any> {
        try {
            const patient = await this.patientRepo.getPatient(userId);
            if (!patient) {
                return { ok: false, error: "Patient not found" };
            }
            return { ok: true, patient };
        } catch (error) {
            console.error("[GetPatient.exec] Error:", (error as any).message);
            return { ok: false, error: "Internal error" };
        }
    }
}