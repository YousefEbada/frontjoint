import { BlobPort } from "infra/storage/blob.port.js";
import { ExerciseRepoPort } from "../ports/ExerciseRepoPort.js";

export class CreateExercise {
  constructor(private blob: BlobPort, private exercise: ExerciseRepoPort) {}

  async exec(input: {
    title: string;
    description?: string;
    file: Express.Multer.File;
  }) {
    console.log("============ CreateExercise Input: ",input);
    const blobName = await this.blob.upload(
      input.file.originalname,
      input.file.buffer,
      input.file.mimetype
    );

    console.log("============ Uploaded Blob Name: ",blobName);

    return this.exercise.create({
      title: input.title,
      description: input.description,
      videoBlobName: blobName
    });
  }
}
