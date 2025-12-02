import { Router } from "express";
import rateLimit from "express-rate-limit";
import { findDoctorById, getDoctorsBySpecialization, updateDoctor } from "./controllers/doctor.controller.js";

export const doctorRoutes = Router();

const requestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false
});

doctorRoutes.use(requestLimiter);

doctorRoutes.get("/:id", findDoctorById);
doctorRoutes.put("/:id", updateDoctor);
doctorRoutes.get("/", getDoctorsBySpecialization);