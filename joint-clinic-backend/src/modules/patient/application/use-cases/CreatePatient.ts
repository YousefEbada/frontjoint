import { Patient } from "modules/patient/domain/Patient";
import { PatientRepoPort } from "../ports/PatientRepoPort";
import { NixpendPort } from "modules/integration/ports/NixpendPorts";
import { UserRepoPort } from "modules/auth/application/ports/UserRepoPort";

export class CreatePatient {
    constructor(private patientRepo: PatientRepoPort, private nixpendAdapter: NixpendPort, private userRepo: UserRepoPort) { }
    async exec(userId: string, createData: Partial<Patient>): Promise<any> {
        try {
            // First, check if patient already exists for this user
            const existingPatient = await this.patientRepo.getPatient(userId);
            if (existingPatient) {
                return { ok: false, error: "Patient already exists for this user" };
            }

            // Then, fetch user details
            const user = await this.userRepo.findById(userId);
            if (!user) {
                return { ok: false, error: "User not found" };
            }

            const { fullName, gender, nationality, phone, email } = user;
            let [firstName, ...lastName] = fullName.split(" ");
            let sex = gender
            let mobile = phone;

            // Then, create patient in Nixpend
            const nixpendPatient = await this.nixpendAdapter.registerPatient({
                first_name: firstName,
                last_name: lastName.join(" "),
                nationality,
                mobile,
                sex,
                email
            });
            if (!nixpendPatient.ok) {
                return { ok: false, error: "Failed to register patient in Nixpend" };
            }

            // Then, create patient in local DB
            const newPatient = await this.patientRepo.createPatient({
                userId: userId,
                nixpendId: nixpendPatient.patient.name,
                guardianInformation: createData.guardianInformation,
                medicalRecordNumber: createData.medicalRecordNumber,
                insuranceId: createData.insuranceId,
                bloodGroup: createData.bloodGroup,
                allergies: createData.allergies,
                medicalHistory: createData.medicalHistory,
                notes: createData.notes
            });
            return { ok: true, patient: newPatient };
        } catch (error) {
            console.error("[CreatePatient.exec] Error:", (error as any).message);
            return { ok: false, error: "Internal error" };
        }
    }
}