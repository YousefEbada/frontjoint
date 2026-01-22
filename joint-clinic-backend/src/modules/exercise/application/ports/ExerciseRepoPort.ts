import { DifficultyLevel } from "modules/exercise/domain/Exercise.js";

export interface ExerciseRepoPort {
  create(data: {
    title: string;
    description?: string;
    musclesTargeted?: string[];
    equipmentNeeded?: string[];
    difficultyLevel?: DifficultyLevel;
    videoBlobName: string;
  }): any;
  find(id: string): any;
  getAll(): any;
  delete(id: string): any;
}