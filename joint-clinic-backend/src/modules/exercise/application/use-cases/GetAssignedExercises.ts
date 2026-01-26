import { ExerciseRepoPort } from "modules/exercise/application/ports/ExerciseRepoPort.js";

export class GetAssignedExercises {
    constructor(private exerciseRepo: ExerciseRepoPort) { }

    async exec(patientId: string) {
        try {
            const assignedExercises = await this.exerciseRepo.getAssignedExercises(patientId);
            return { ok: true, data: assignedExercises };
        } catch (error) {
            console.error("[GetAssignedExercises] Error:", error);
            return { ok: false, error: "Failed to fetch assigned exercises" };
        }
    }
}
