import { resolve } from "app/container";
import { NIXPEND_ADAPTER, PATIENT_REPO, SESSION_REPO, TREATMENT_PLAN_REPO, USER_AUTH_REPO } from "app/container.bindings";
import { Request, Response } from "express";
import { FetchType, UpdateType } from "modules/integration/domain/Nixpend";
import { CreatePatient } from "modules/patient/application/use-cases/CreatePatient";
import { GetPatient } from "modules/patient/application/use-cases/GetPatient";
import { GetPatientDashboard } from "modules/patient/application/use-cases/GetPatientDashboard";
import { UpdatePatient } from "modules/patient/application/use-cases/UpdatePatient";


export async function getPatientById(req: Request, res: Response) {
    const { userId } = req.params;
    try {
        const uc = new GetPatient(resolve(PATIENT_REPO));
        const result = await uc.exec(userId as string);
        if (result.ok) {
            res.status(200).json(result);
        } else {
            console.error("[getPatient] Error:", result.error);
            res.status(404).json({ok: false, error: result.error });
        }
    } catch (error) {
        console.error("[getPatient] There is an error in the patient controller", error);
        res.status(500).json({ ok: false, error: "Something Went Wrong" });
    }
}

export async function getPatientDashboard(req: Request, res: Response) {
    const patientId = req.params.patientId;
    try {
        const uc = new GetPatientDashboard(resolve(SESSION_REPO), resolve(TREATMENT_PLAN_REPO));
        const result = await uc.exec(patientId);
        if (result.ok) {
            res.status(200).json(result);
        } else {
            console.error("[getPatientDashboard] Error:", result.error);
            res.status(404).json({ok: false, error: result.error });
        }
    } catch (error) {
        console.error("[getPatientDashboard] There is an error in the patient controller", error);
        res.status(500).json({ ok: false, error: "Something Went Wrong" });
    }
}

export async function updatePatient (req: Request, res: Response) {
    const userId = req.query.nixpendName as string;
    const updateData = req.body as UpdateType;
    const uc = new UpdatePatient(resolve(PATIENT_REPO), resolve(USER_AUTH_REPO), resolve(NIXPEND_ADAPTER));
    const result = await uc.exec(userId, updateData);
    if (result.ok) {
        res.status(200).json(result);
    } else {
        console.error("[updatePatient] Error:", result.error);
        res.status(400).json({ error: result.error });
    }
}

export async function createPatient(req: Request, res: Response) {
    const {userId, data} = req.body;
    const uc = new CreatePatient(resolve(PATIENT_REPO), resolve(NIXPEND_ADAPTER), resolve(USER_AUTH_REPO));
    const result = await uc.exec(userId, data);
    if (result.ok) {
        res.status(201).json(result);
    } else {
        console.error("[createPatient] Error:", result.error);
        res.status(400).json({ error: result.error });
    }
}


// import { PatientModel } from "./models/Patient";

// // 1. Create/Update Weekly Plan for a Patient
// export const createWeeklyPlan = async (req: Request, res: Response) => {
//   try {
//     const { patientId } = req.params;
//     const { weekNumber, exercises, sessions, startDate, endDate } = req.body;

//     const patient = await PatientModel.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     // Check if weekly plan already exists
//     const existingPlanIndex = patient.weeklyPlans.findIndex(
//       (plan) => plan.weekNumber === weekNumber
//     );

//     if (existingPlanIndex !== -1) {
//       // Update existing plan
//       patient.weeklyPlans[existingPlanIndex] = {
//         ...patient.weeklyPlans[existingPlanIndex],
//         exercises,
//         sessions,
//         startDate,
//         endDate
//       };
//     } else {
//       // Add new weekly plan
//       patient.weeklyPlans.push({
//         weekNumber,
//         exercises,
//         sessions,
//         startDate,
//         endDate
//       });
//     }

//     // Update total counts
//     patient.progress.totalExercises = patient.weeklyPlans.reduce(
//       (sum, plan) => sum + plan.exercises.length,
//       0
//     );
//     patient.progress.totalSessions = patient.weeklyPlans.reduce(
//       (sum, plan) => sum + plan.sessions.length,
//       0
//     );

//     await patient.save();

//     res.status(200).json({
//       message: "Weekly plan created/updated successfully",
//       weeklyPlan: patient.weeklyPlans.find(p => p.weekNumber === weekNumber)
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating weekly plan", error });
//   }
// };

// // 2. Get Weekly Plan for a Specific Week
// export const getWeeklyPlan = async (req: Request, res: Response) => {
//   try {
//     const { patientId, weekNumber } = req.params;

//     const patient = await PatientModel.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     const weeklyPlan = patient.weeklyPlans.find(
//       (plan) => plan.weekNumber === parseInt(weekNumber)
//     );

//     if (!weeklyPlan) {
//       return res.status(404).json({ message: "Weekly plan not found" });
//     }

//     res.status(200).json({ weeklyPlan });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching weekly plan", error });
//   }
// };

// // 3. Get All Weekly Plans for a Patient
// export const getAllWeeklyPlans = async (req: Request, res: Response) => {
//   try {
//     const { patientId } = req.params;

//     const patient = await PatientModel.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     res.status(200).json({
//       weeklyPlans: patient.weeklyPlans,
//       progress: patient.progress
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching weekly plans", error });
//   }
// };

// // 4. Mark Exercise as Completed
// export const markExerciseComplete = async (req: Request, res: Response) => {
//   try {
//     const { patientId, weekNumber, exerciseId } = req.params;

//     const patient = await PatientModel.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     const weeklyPlan = patient.weeklyPlans.find(
//       (plan) => plan.weekNumber === parseInt(weekNumber)
//     );

//     if (!weeklyPlan) {
//       return res.status(404).json({ message: "Weekly plan not found" });
//     }

//     const exercise = weeklyPlan.exercises.id(exerciseId);
//     if (!exercise) {
//       return res.status(404).json({ message: "Exercise not found" });
//     }

//     exercise.completed = true;
//     exercise.completedAt = new Date();

//     // Update completed exercises count
//     patient.progress.exercisesCompleted = patient.weeklyPlans.reduce(
//       (sum, plan) => sum + plan.exercises.filter(ex => ex.completed).length,
//       0
//     );

//     await patient.save();

//     res.status(200).json({
//       message: "Exercise marked as completed",
//       exercise
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating exercise", error });
//   }
// };

// // 5. Mark Session as Completed
// export const markSessionComplete = async (req: Request, res: Response) => {
//   try {
//     const { patientId, weekNumber, sessionId } = req.params;

//     const patient = await PatientModel.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     const weeklyPlan = patient.weeklyPlans.find(
//       (plan) => plan.weekNumber === parseInt(weekNumber)
//     );

//     if (!weeklyPlan) {
//       return res.status(404).json({ message: "Weekly plan not found" });
//     }

//     const session = weeklyPlan.sessions.id(sessionId);
//     if (!session) {
//       return res.status(404).json({ message: "Session not found" });
//     }

//     session.status = 'completed';
//     session.completedAt = new Date();

//     // Update completed sessions count
//     patient.progress.sessionsCompleted = patient.weeklyPlans.reduce(
//       (sum, plan) => sum + plan.sessions.filter(s => s.status === 'completed').length,
//       0
//     );

//     await patient.save();

//     res.status(200).json({
//       message: "Session marked as completed",
//       session
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating session", error });
//   }
// };

// // 6. Get Current Week Summary
// export const getCurrentWeekSummary = async (req: Request, res: Response) => {
//   try {
//     const { patientId } = req.params;

//     const patient = await PatientModel.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     const currentWeek = patient.progress.currentWeek;
//     const weeklyPlan = patient.weeklyPlans.find(
//       (plan) => plan.weekNumber === currentWeek
//     );

//     if (!weeklyPlan) {
//       return res.status(404).json({ message: "Current week plan not found" });
//     }

//     const summary = {
//       weekNumber: currentWeek,
//       exercises: weeklyPlan.exercises.map(ex => ({
//         name: ex.name,
//         completed: ex.completed,
//         status: ex.completed ? 'Done' : 'Today'
//       })),
//       sessions: weeklyPlan.sessions.map(s => ({
//         name: s.name,
//         scheduledFor: s.scheduledFor,
//         status: s.status === 'completed' ? 'Done' : 
//                 s.status === 'pending' ? 'Pending' : 'Cancelled'
//       })),
//       progress: {
//         sessionsCompleted: patient.progress.sessionsCompleted,
//         totalSessions: patient.progress.totalSessions,
//         exercisesCompleted: patient.progress.exercisesCompleted,
//         treatmentLengthWeeks: patient.progress.treatmentLengthWeeks
//       }
//     };

//     res.status(200).json({ summary });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching week summary", error });
//   }
// };

// // 7. Add Exercise to Weekly Plan
// export const addExerciseToWeek = async (req: Request, res: Response) => {
//   try {
//     const { patientId, weekNumber } = req.params;
//     const exerciseData = req.body;

//     const patient = await PatientModel.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     const weeklyPlan = patient.weeklyPlans.find(
//       (plan) => plan.weekNumber === parseInt(weekNumber)
//     );

//     if (!weeklyPlan) {
//       return res.status(404).json({ message: "Weekly plan not found" });
//     }

//     weeklyPlan.exercises.push(exerciseData);
    
//     patient.progress.totalExercises = patient.weeklyPlans.reduce(
//       (sum, plan) => sum + plan.exercises.length,
//       0
//     );

//     await patient.save();

//     res.status(200).json({
//       message: "Exercise added successfully",
//       exercise: weeklyPlan.exercises[weeklyPlan.exercises.length - 1]
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding exercise", error });
//   }
// };

// // 8. Add Session to Weekly Plan
// export const addSessionToWeek = async (req: Request, res: Response) => {
//   try {
//     const { patientId, weekNumber } = req.params;
//     const sessionData = req.body;

//     const patient = await PatientModel.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     const weeklyPlan = patient.weeklyPlans.find(
//       (plan) => plan.weekNumber === parseInt(weekNumber)
//     );

//     if (!weeklyPlan) {
//       return res.status(404).json({ message: "Weekly plan not found" });
//     }

//     weeklyPlan.sessions.push(sessionData);
    
//     patient.progress.totalSessions = patient.weeklyPlans.reduce(
//       (sum, plan) => sum + plan.sessions.length,
//       0
//     );

//     await patient.save();

//     res.status(200).json({
//       message: "Session added successfully",
//       session: weeklyPlan.sessions[weeklyPlan.sessions.length - 1]
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding session", error });
//   }
// };