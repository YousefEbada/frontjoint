import { DOCTOR_REPO } from "app/container.bindings";
import { Request, Response } from "express";
import { FindDoctorById } from "modules/doctor/application/use-cases/FindDoctorById";
import { resolve } from "app/container";
import { GetCachedPractitioners } from "modules/doctor/application/use-cases/GetCachedDoctors";

export async function findDoctorById(req: Request, res: Response) {
    const doctorId = req.params.nixpendId;
    try {
        const uc = new FindDoctorById(resolve(DOCTOR_REPO))
        const doctor = await uc.execute(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        return res.status(200).json(doctor);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function findDoctors(req: Request, res: Response) {
    try {
        const uc = new GetCachedPractitioners(resolve(DOCTOR_REPO));
        const doctors = await uc.execute();
        if (!doctors || doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found" });
        }
        return res.status(200).json(doctors);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}