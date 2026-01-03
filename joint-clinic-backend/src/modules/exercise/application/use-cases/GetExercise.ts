import { BlobPort } from "infra/storage/blob.port.js";
import { ExerciseModel } from "modules/exercise/infrastructure/models/ExerciseModel.js";
import { ExerciseRepoPort } from "../ports/ExerciseRepoPort.js";

export class GetExerciseVideo {
  constructor(private blob: BlobPort, private exercise: ExerciseRepoPort) {}

  async exec(exerciseId: string) {
    const exercise = await this.exercise.find(exerciseId);
    console.log("============ Exercise: ",exercise);
    if (!exercise) throw new Error("Not found");

    return this.blob.signedUrl((exercise as any).videoBlobName, 30);
  }
}
