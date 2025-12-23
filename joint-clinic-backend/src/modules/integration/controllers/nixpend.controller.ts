import { resolve } from "app/container";
import { NIXPEND_ADAPTER, PATIENT_REPO } from "app/container.bindings";
import { Request, Response } from "express";
import { FetchType, UpdateType } from "../domain/Nixpend";
import { GetPatient } from "../use-cases/GetPatient";
import { GetPractitioners } from "../use-cases/GetPractitioners";
import { RegisterPatient } from "../use-cases/RegisterPatient";
import { UpdatePatient } from "../use-cases/UpdatePatient";

export async function getPatient(req: Request, res: Response) {
    const { type, value } = req.query;
    const uc = new GetPatient(resolve(PATIENT_REPO), resolve(NIXPEND_ADAPTER));
    const result = await uc.exec(type as FetchType, value as string);
    if (result.ok) {
        res.status(200).json(result);
    } else {
        console.error("[getPatient] Error:", result.error);
        res.status(404).json({ error: result.error });
    }
}

export async function updatePatient (req: Request, res: Response) {
    const patientId = req.query.nixpendName as string;
    const updateData = req.body as UpdateType;
    const uc = new UpdatePatient(resolve(PATIENT_REPO), resolve(NIXPEND_ADAPTER));
    const result = await uc.exec(patientId, updateData);
    if (result.ok) {
        res.status(200).json(result);
    } else {
        console.error("[updatePatient] Error:", result.error);
        res.status(400).json({ error: result.error });
    }
}

export async function createPatient(req: Request, res: Response) {
    // const id = req.params.userId;
    const data = req.body;
    const uc = new RegisterPatient(resolve(PATIENT_REPO), resolve(NIXPEND_ADAPTER));
    const result = await uc.exec(data);
    if (result.ok) {
        res.status(201).json(result);
    } else {
        console.error("[createPatient] Error:", result.error);
        res.status(400).json({ error: result.error });
    }
}

// move it to doctor later
export async function getPractitioners(req: Request, res: Response) {
    const { branch, department } = req.query;
    const uc = new GetPractitioners(resolve(NIXPEND_ADAPTER));
    const result = await uc.exec(branch as any, department as any);
    if (result.ok) {
        res.status(200).json(result);
    } else {
        console.error("[getPractitioners] Error:", result.error);
        res.status(500).json({ error: result.error });
    }
}
