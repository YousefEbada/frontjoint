import { Router } from "express";
// import { getAdminDashboard } from "./controllers/admin.controller.js";
import { updateUserRole, updateUser } from "./controllers/admin.controller.js";

export const adminRoutes = Router();

// adminRoutes.get("/dashboard", getAdminDashboard);
// Don't forget middleware for admin authentication/authorization

adminRoutes.post("/update-user-role", updateUserRole);
adminRoutes.post("/update-user", updateUser)