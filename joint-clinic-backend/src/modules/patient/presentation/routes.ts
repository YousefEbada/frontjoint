import { Router } from "express";
import {createPatient, getPatient, getPatientDashboard, updatePatient } from "./controllers/patient.controller.js";
import rateLimit from "express-rate-limit";

export const patientRoutes = Router();

const patientLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false
});

patientRoutes.post("/", patientLimiter, createPatient);
patientRoutes.get("/:patientId/dashboard", patientLimiter, getPatientDashboard);
patientRoutes.get("/", patientLimiter, getPatient);
patientRoutes.put("/", patientLimiter, updatePatient);