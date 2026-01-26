import { Router } from "express";
import { createPatient, getAllPatients, getPatientById, getPatientByUserId, getPatientDashboard, updatePatient, getActivePatients, getPatientsByDoctor } from "./controllers/patient.controller.js";
import rateLimit from "express-rate-limit";

export const patientRoutes = Router();

const patientLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false
});

patientRoutes.post("/create", createPatient);
patientRoutes.get("/", getAllPatients);
patientRoutes.get("/active", getActivePatients);
patientRoutes.get("/:patientId/dashboard", patientLimiter, getPatientDashboard);
patientRoutes.get("/:patientId", patientLimiter, getPatientById);
patientRoutes.get("/user/:userId", getPatientByUserId);
patientRoutes.get("/doctor/:doctorNixpendId", getPatientsByDoctor);
patientRoutes.put("/:patientId", patientLimiter, updatePatient);