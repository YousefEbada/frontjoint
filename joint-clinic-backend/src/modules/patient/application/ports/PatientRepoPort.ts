import { Patient } from "modules/patient/domain/Patient";

export interface PatientRepoPort {
    getPatient(id: string): Promise<Patient | null>;
    updatePatient(id: string, data: Partial<Patient>): Promise<Patient | null>;
    createPatient(data: Partial<Patient>): Promise<Patient>;
}