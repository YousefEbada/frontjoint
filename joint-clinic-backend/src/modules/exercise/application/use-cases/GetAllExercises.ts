import { ExerciseRepoPort } from "../ports/ExerciseRepoPort.js";

export class GetAllExercises {
  constructor(private exerciseRepo: ExerciseRepoPort) {}
    async exec() {
        return this.exerciseRepo.getAll();
    }
}