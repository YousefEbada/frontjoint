import { Request, Response } from "express";

// export async function getSessionsByPatient(req: Request, res: Response) {
//     try {
//         const patientId = req.params.patientId;
//         const uc = new 
//     } catch (error) {
        
//     }
// }

export async function createTreatmentPlan(req: Request, res: Response) {
    try {
        const treatmentPlanData = req.body;
        // const uc = new CreateTreatmentPlan(resolve(TREATMENT_PLAN_REPO));
        // const treatmentPlan = await uc.exec(treatmentPlanData);
        // res.json({ ok: true, data: treatmentPlan });
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Internal server error' });
    }
}