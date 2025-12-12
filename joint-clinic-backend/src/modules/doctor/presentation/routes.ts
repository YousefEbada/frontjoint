import { Router } from "express";
import rateLimit from "express-rate-limit";
import express from "express";
import { findDoctorById, findDoctors } from "./controllers/doctor.controller.js";
  // getDoctorBookingsForDay,
  // getDoctorBookingsForWeek,
  // getDoctorBookingsForMonth,
  // getNextAppointment,
  // getCurrentPatient,
  // getDoctorDashboard from "./controllers/doctor.controller.js";

const router = express.Router();
export const doctorRoutes = Router();

const requestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false
});

doctorRoutes.use(requestLimiter);

doctorRoutes.get("/:nixpendId", findDoctorById);
doctorRoutes.get("/", findDoctors);




// // Doctor booking views
// router.get("/doctors/:doctorId/bookings/day", getDoctorBookingsForDay);
// router.get("/doctors/:doctorId/bookings/week", getDoctorBookingsForWeek);
// router.get("/doctors/:doctorId/bookings/month", getDoctorBookingsForMonth);

// // Doctor quick views
// router.get("/doctors/:doctorId/next-appointment", getNextAppointment);
// router.get("/doctors/:doctorId/current-patient", getCurrentPatient);
// router.get("/doctors/:doctorId/dashboard", getDoctorDashboard);

export default router;