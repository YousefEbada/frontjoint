import { BOOKING_REPO, DOCTOR_REPO, SESSION_REPO } from "app/container.bindings";
import { Request, Response } from "express";
import { FindDoctorById } from "modules/doctor/application/use-cases/FindDoctorById";
import { resolve } from "app/container";
import { GetCachedPractitioners } from "modules/doctor/application/use-cases/GetCachedDoctors";
import { GetDoctorBookings } from "modules/doctor/application/use-cases/GetDoctorBookings";
import { GetDoctorSessions } from "modules/doctor/application/use-cases/GetDoctorSessions";
import { GetPatientsByDoctorAndStatus } from "modules/doctor/application/use-cases/GetPatientsByDoctorAndStatus";

export async function findDoctorById(req: Request, res: Response) {
    const doctorId = req.query.id as string;
    try {
        const uc = new FindDoctorById(resolve(DOCTOR_REPO))
        const result = await uc.execute(doctorId);
        if (!result.ok) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ ok: false, message: "Internal server error" });
    }
}

export async function findDoctors(req: Request, res: Response) {
    try {
        const uc = new GetCachedPractitioners(resolve(DOCTOR_REPO));
        const result = await uc.exec();
        if (!result.ok) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error in findDoctors controller:", (error as Error).message);
        return res.status(500).json({ ok: false, message: "Internal server error" });
    }
}

export async function getDoctorBookings(req: Request, res: Response) {
    try {
        const { doctorId } = req.params;
        const { period, date } = req.query;
        const uc = new GetDoctorBookings(resolve(BOOKING_REPO), resolve(SESSION_REPO));
        const result = await uc.exec(doctorId, period ? period as 'day' | 'week' | 'month' : undefined, date ? new Date(date as string) : new Date());

        if (!result.ok) {
            return res.status(400).json(result);
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Internal server error' });
    }
}

export async function getDoctorSessions(req: Request, res: Response) {
    try {
        const { doctorId } = req.params;
        const { period, date } = req.query;
        const uc = new GetDoctorSessions(resolve(BOOKING_REPO), resolve(SESSION_REPO));
        const result = await uc.exec(doctorId, period ? period as 'day' | 'week' | 'month' : undefined, date ? new Date(date as string) : new Date());

        if (!result.ok) {
            return res.status(400).json(result);
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Internal server error' });
    }
}

export async function getPatients(req: Request, res: Response) {
    try {
        const { doctorId } = req.params;
        const { status } = req.query;
        const uc = new GetPatientsByDoctorAndStatus(resolve(BOOKING_REPO));
        const result = await uc.exec(doctorId, status as 'active' | 'inactive');
        if (!result.ok) {
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Internal server error' });
    }
}