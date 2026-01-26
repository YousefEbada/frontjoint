import { ExerciseRepoPort } from "modules/exercise/application/ports/ExerciseRepoPort.js";

interface AssignExerciseRequest {
    patientId: string;
    exerciseId: string;
    doctorNixpendId: string;
}

export class AssignExercise {
    constructor(private exerciseRepo: ExerciseRepoPort) { }

    async exec(req: AssignExerciseRequest) {
        try {
            if (!req.patientId || !req.exerciseId || !req.doctorNixpendId) {
                return { ok: false, error: "Missing required fields" };
            }

            await this.exerciseRepo.assignExercise(req);
            return { ok: true };
        } catch (error) {
            console.error("[AssignExercise] Error:", error);
            return { ok: false, error: "Failed to assign exercise" };
        }
    }
}
