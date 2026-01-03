import { Router } from "express";
import { uploadVideo } from "shared/middleware/multer.js";
import { createExercise, getExerciseVideo, getAllExercises } from "./controllers/exercise.controller.js";

const exerciseRoutes = Router();

// ADMIN upload
exerciseRoutes.post(
  "/",
  uploadVideo.single("video"),
  createExercise
);

// STREAM video
exerciseRoutes.get(
  "/:id/video",
  getExerciseVideo
);

exerciseRoutes.get('/', getAllExercises);

export default exerciseRoutes;
