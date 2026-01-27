import { BLOB_PORT, EXERCISE_REPO } from "app/container.bindings.js";
import { resolve } from "app/container.js";
import { Request, Response } from "express";

import { azureBlobAdapter } from "infra/storage/blob.azure.adapter.js";
import { CreateExercise } from "modules/exercise/application/use-cases/CreateExercise.js";
import { DeleteExercise } from "modules/exercise/application/use-cases/DeleteExercise.js";
import { GetAllExercises } from "modules/exercise/application/use-cases/GetAllExercises.js";
import { GetExerciseVideo } from "modules/exercise/application/use-cases/GetExercise.js";
import { AssignExercise } from "modules/exercise/application/use-cases/AssignExercise.js";
import { GetAssignedExercises } from "modules/exercise/application/use-cases/GetAssignedExercises.js";

export const createExercise = async (req: Request, res: Response) => {
  try {
    console.log("============ createExercise Controller - Body:", JSON.stringify(req.body, null, 2));
    console.log("============ createExercise Controller - File:", req.file ? "File exists" : "No file");

    const uc = new CreateExercise(resolve(BLOB_PORT), resolve(EXERCISE_REPO));

    const result = await uc.exec({
      title: req.body.title,
      description: req.body.description,
      musclesTargeted: req.body.musclesTargeted ? JSON.parse(req.body.musclesTargeted) : [],
      equipmentNeeded: req.body.equipmentNeeded ? JSON.parse(req.body.equipmentNeeded) : [],
      difficultyLevel: req.body.difficultyLevel,
      file: req.file!
    });

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (error) {
    console.error("============ createExercise Controller Error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExerciseVideo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const uc = new GetExerciseVideo(resolve(BLOB_PORT), resolve(EXERCISE_REPO));
    const result = await uc.exec(id);
    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error("============ getExerciseVideo Controller Error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const uc = new GetAllExercises(resolve(EXERCISE_REPO));
    const result = await uc.exec();
    if (!result.ok) {
      return res.status(404).json(result);
    }
    console.log("============ All Exercises: ", result);
    return res.status(200).json(result);
  } catch (error) {
    console.error("============ getAllExercises Controller Error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const uc = new DeleteExercise(resolve(BLOB_PORT), resolve(EXERCISE_REPO));
    const result = await uc.exec(id);
    if (!result.ok) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error("============ deleteExercise Controller Error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const assignExercise = async (req: Request, res: Response) => {
  try {
    const uc = new AssignExercise(resolve(EXERCISE_REPO));
    const result = await uc.exec(req.body);

    if (!result.ok) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error("============ assignExercise Controller Error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAssignedExercises = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  try {
    const uc = new GetAssignedExercises(resolve(EXERCISE_REPO));
    const result = await uc.exec(patientId);

    if (!result.ok) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error("============ getAssignedExercises Controller Error: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};