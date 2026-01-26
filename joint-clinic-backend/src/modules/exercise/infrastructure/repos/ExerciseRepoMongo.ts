import { ExerciseRepoPort } from "modules/exercise/application/ports/ExerciseRepoPort.js";
import { ExerciseModel } from "../models/ExerciseModel.js";
import { AssignedExerciseModel } from "../models/AssignedExerciseModel.js";

export const ExerciseRepoMongo: ExerciseRepoPort = {
    async create(data) {
        const res = await ExerciseModel.create({ ...data })
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
    },

    async assignExercise(data) {
        const res = await AssignedExerciseModel.create(data);
        return res;
    },

    async getAssignedExercises(patientId) {
        const res = await AssignedExerciseModel.find({ patientId }).populate('exerciseId');
        return res;
    }
}
