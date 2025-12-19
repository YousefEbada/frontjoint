import { SessionRepoPort } from "../ports/SessionRepoPort";

export class GetSessionByTreatmentPlan {
    constructor(private sessionRepo: SessionRepoPort) {}
    async exec(patientId: string, treatmentPlanId: string) {
        const sessions = await this.sessionRepo.getSessionsByTreatmentPlan(patientId, treatmentPlanId)
        if(!sessions) {
            return {ok: false, error: 'No sessions has found for this treatment and patient'}
        }
        return {ok: true, sessions}
    }
}