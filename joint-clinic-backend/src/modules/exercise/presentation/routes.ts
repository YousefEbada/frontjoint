import { Router } from "express";
import { uploadVideo } from "shared/middleware/multer.js";
import { createExercise, getExerciseVideo, getAllExercises, deleteExercise, assignExercise, getAssignedExercises } from "./controllers/exercise.controller.js";

const exerciseRoutes = Router();

exerciseRoutes.post("/", uploadVideo.single("video"), createExercise);
exerciseRoutes.get("/:id/video", getExerciseVideo);
exerciseRoutes.get('/', getAllExercises);
exerciseRoutes.delete("/:id", deleteExercise);
exerciseRoutes.post("/assign", assignExercise);
exerciseRoutes.get("/assigned/:patientId", getAssignedExercises);

export default exerciseRoutes;
