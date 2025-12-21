import { Request, Response } from "express";
import { TreatmentPlanSchema } from "../validators/treat.schemas";
import { CreateTreatmentPlan } from "modules/treatment-plan/application/use-cases/CreateTreatmentPlan";
import { resolve } from "app/container";
import { SESSION_REPO, TREATMENT_PLAN_REPO } from "app/container.bindings";

export async function createTreatmentPlan(req: Request, res: Response) {
    try {
        const treatmentPlanData = TreatmentPlanSchema.parse(req.body);
        const uc = new CreateTreatmentPlan(resolve(TREATMENT_PLAN_REPO), resolve(SESSION_REPO));
        const result = await uc.exec(treatmentPlanData as any);
        if(!result.ok) {
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Internal server error' });
    }
}