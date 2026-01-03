import { BLOB_PORT, EXERCISE_REPO } from "app/container.bindings.js";
import { resolve } from "app/container.js";
import { Request, Response } from "express";
import { azureBlobAdapter } from "infra/storage/blob.azure.adapter.js";
import { CreateExercise } from "modules/exercise/application/use-cases/CreateExercise.js";
import { GetAllExercises } from "modules/exercise/application/use-cases/GetAllExercises.js";
import { GetExerciseVideo } from "modules/exercise/application/use-cases/GetExercise.js";

export const createExercise = async (req: Request, res: Response) => {
  const uc = new CreateExercise(resolve(BLOB_PORT), resolve(EXERCISE_REPO));

  const exercise = await uc.exec({
    title: req.body.title,
    description: req.body.description,
    file: req.file!
  });

  res.status(201).json(exercise);
};

export const getExerciseVideo = async (req: Request, res: Response) => {
  const uc = new GetExerciseVideo(resolve(BLOB_PORT), resolve(EXERCISE_REPO));
  const videoUrl = await uc.exec(req.params.id);

  res.json({ videoUrl });
};

export const getAllExercises = async (req: Request, res: Response) => {
  const uc = new GetAllExercises(resolve(EXERCISE_REPO));
  const exercises = await uc.exec();
  console.log("============ All Exercises: ",exercises);
  res.json({ok: true, exercises});
};