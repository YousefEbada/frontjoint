import { BlobPort } from "infra/storage/blob.port.js";
import { ExerciseRepoPort } from "../ports/ExerciseRepoPort.js";
import { DifficultyLevel } from "modules/exercise/domain/Exercise.js";

export class CreateExercise {
  constructor(private blob: BlobPort, private exercise: ExerciseRepoPort) { }

  async exec(input: {
    title: string;
    description?: string;
    musclesTargeted?: string[];
    equipmentNeeded?: string[];
    difficultyLevel?: DifficultyLevel;
    file: {
      originalname: string;
      buffer: Buffer;
      mimetype: string;
    };
  }) {
    try {
      console.log("============ CreateExercise Input: ", input);
      const blobName = await this.blob.upload(
        input.file.originalname,
        input.file.buffer,
        input.file.mimetype
      );

      console.log("============ Uploaded Blob Name: ", blobName);

      const exerciseData = {
        title: input.title,
        description: input.description,
        musclesTargeted: input.musclesTargeted || [],
        equipmentNeeded: input.equipmentNeeded || [],
        difficultyLevel: input.difficultyLevel || 'beginner',
        videoBlobName: blobName
      };

      console.log("============ USE CASE: Calling exercise.create with:", exerciseData);

      const res = await this.exercise.create(exerciseData);

      console.log("============ USE CASE: Created Exercise result:", res);
      console.log("============ USE CASE: Created Exercise musclesTargeted:", res?.musclesTargeted);
      console.log("============ USE CASE: Created Exercise equipmentNeeded:", res?.equipmentNeeded);

      if (!res) {
        return { ok: false, error: "Exercise creation failed" };
      }

      return { ok: true, data: res };

    } catch (error) {
      console.error("============ CreateExercise Error: ", error);
      return { ok: false, error: "Something went wrong" };
    }
  }
}
