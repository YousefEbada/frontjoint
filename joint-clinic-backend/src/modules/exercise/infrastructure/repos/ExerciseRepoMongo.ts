import { ExerciseRepoPort } from "modules/exercise/application/ports/ExerciseRepoPort.js";
import { ExerciseModel } from "../models/ExerciseModel.js";

export const ExerciseRepoMongo: ExerciseRepoPort = {
    async create(data) {
        console.log("============ REPOSITORY: Received data to create:", data);
        console.log("============ REPOSITORY: musclesTargeted:", data.musclesTargeted);
        console.log("============ REPOSITORY: equipmentNeeded:", data.equipmentNeeded);
        console.log("============ REPOSITORY: difficultyLevel:", data.difficultyLevel);
        const res = await ExerciseModel.create({...data})
        console.log("============ REPOSITORY: Created document:", res);
        console.log("============ REPOSITORY: Created document musclesTargeted:", res.musclesTargeted);
        console.log("============ REPOSITORY: Created document equipmentNeeded:", res.equipmentNeeded);
        return res;
    },

    async find(id) {
        const res = await ExerciseModel.findById(id);
        return res;
    },

    async getAll() {
        const res = await ExerciseModel.find();
        return res;
    },

    async delete(id) {
        const res = await ExerciseModel.findByIdAndDelete(id);
        return res;
    }
}
