import { Router } from "express";
import { createTreatmentPlan } from "./controllers/treatmentPlan.controller";

export const treatmentPlanRoutes = Router()

// rate limiter and middlewares

treatmentPlanRoutes.post('/', createTreatmentPlan)
