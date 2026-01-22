import { BLOB_PORT, EXERCISE_REPO } from "app/container.bindings.js";
import { resolve } from "app/container.js";
import { Request, Response } from "express";

import { azureBlobAdapter } from "infra/storage/blob.azure.adapter.js";
import { CreateExercise } from "modules/exercise/application/use-cases/CreateExercise.js";
import { DeleteExercise } from "modules/exercise/application/use-cases/DeleteExercise.js";
import { GetAllExercises } from "modules/exercise/application/use-cases/GetAllExercises.js";
import { GetExerciseVideo } from "modules/exercise/application/use-cases/GetExercise.js";

export const createExercise = async (req: Request, res: Response) => {
  try {
    console.log("============ BACKEND CONTROLLER: Raw req.body:", req.body);
    console.log("============ BACKEND CONTROLLER: req.body keys:", Object.keys(req.body));
    console.log("============ BACKEND CONTROLLER: req.file:", req.file ? { name: req.file.originalname, size: req.file.size } : "null");

    const uc = new CreateExercise(resolve(BLOB_PORT), resolve(EXERCISE_REPO));

    // Parse JSON strings from FormData for arrays
    let musclesTargeted: string[] = [];
    if (req.body.musclesTargeted) {
      console.log("============ BACKEND CONTROLLER: Found musclesTargeted in body:", req.body.musclesTargeted, "Type:", typeof req.body.musclesTargeted);
      try {
        musclesTargeted = typeof req.body.musclesTargeted === 'string' 
          ? JSON.parse(req.body.musclesTargeted) 
          : req.body.musclesTargeted;
        console.log("============ BACKEND CONTROLLER: Parsed musclesTargeted:", musclesTargeted);
      } catch (e) {
        console.error("============ BACKEND CONTROLLER: Error parsing musclesTargeted:", e);
      }
    } else {
      console.log("============ BACKEND CONTROLLER: musclesTargeted NOT found in req.body");
    }

    let equipmentNeeded: string[] = [];
    if (req.body.equipmentNeeded) {
      console.log("============ BACKEND CONTROLLER: Found equipmentNeeded in body:", req.body.equipmentNeeded, "Type:", typeof req.body.equipmentNeeded);
      try {
        equipmentNeeded = typeof req.body.equipmentNeeded === 'string'
          ? JSON.parse(req.body.equipmentNeeded)
          : req.body.equipmentNeeded;
        console.log("============ BACKEND CONTROLLER: Parsed equipmentNeeded:", equipmentNeeded);
      } catch (e) {
        console.error("============ BACKEND CONTROLLER: Error parsing equipmentNeeded:", e);
      }
    } else {
      console.log("============ BACKEND CONTROLLER: equipmentNeeded NOT found in req.body");
    }

    console.log("============ BACKEND CONTROLLER: difficultyLevel:", req.body.difficultyLevel);

    const result = await uc.exec({
      title: req.body.title,
      description: req.body.description,
      musclesTargeted: musclesTargeted,
      equipmentNeeded: equipmentNeeded,
      difficultyLevel: req.body.difficultyLevel,
      file: req.file!
    });

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (error) {
    console.error("============ createExercise Controller Error: ", error);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
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
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
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
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
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
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
};