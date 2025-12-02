import { resolve } from "app/container";
import { DOCTOR_REPO } from "app/container.bindings";
import { Request, Response } from "express";
import { FindDoctorById } from "modules/doctor/application/use-cases/FindDoctorById";
import { UpdateDoctor } from "modules/doctor/application/use-cases/UpdateDoctor";


export async function findDoctorById(req: Request, res: Response) {
    const doctorId = req.params.id;
    const uc = new FindDoctorById(resolve(DOCTOR_REPO))
    const result = await uc.exec(doctorId);
    if(result.ok) {
        res.status(200).json(result)
    } else {
        console.error("[findDoctorById] Error:", result.error);
        res.status(404).json({ error: result.error });
    }
}

export async function updateDoctor(req: Request, res: Response) {
    const doctorId = req.params.id;
    const updateData = req.body;
    const uc = new UpdateDoctor(resolve(DOCTOR_REPO));
    const result = await uc.exec(doctorId, updateData);
    if (result.ok) {
        res.status(200).json(result);
    } else {
        console.error("[updateDoctor] Error:", result.error);
        res.status(400).json({ error: result.error });
    }
}

export async function getDoctorsBySpecialization(req: Request, res: Response) {
    // const specialization = String(req.query.specialization);
    const specialization = req.body.specialization;
    const uc = new FindDoctorById(resolve(DOCTOR_REPO));
    const result = await uc.exec(specialization);
    if (result.ok) {
        res.status(200).json(result);
    } else {
        console.error("[getDoctorsBySpecialization] Error:", result.error);
        res.status(404).json({ error: result.error });
    }
}