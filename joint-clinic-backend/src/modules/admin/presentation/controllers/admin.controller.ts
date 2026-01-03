import { USER_AUTH_REPO } from "app/container.bindings.js";
import { resolve } from "app/container.js";
import { Request, Response } from "express";
import { UpdateUserRole } from "modules/auth/application/use-cases/UpdateUserRole.js";

export async function updateUserRole(req: Request, res: Response) {
    const { userId, newRole } = req.body;
    try {
        const uc = new UpdateUserRole(resolve(USER_AUTH_REPO));
        const result = await uc.exec(userId, newRole);
        if (!result.ok) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error in updateUserRole controller:", (error as Error).message);
        return res.status(500).json({ ok: false, message: "Update User Role controller Internal server error" });
    }
}

// export async function getAdminDashboard(req: Request, res: Response) {
//     // Implementation for admin dashboard
// }