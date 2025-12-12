import { DoctorRepoPort } from "../ports/DoctorRepoPort";

export class FindDoctorById {
    constructor(private doctorRepo: DoctorRepoPort) {}
    async execute(nixpendId: string) {
        const doctor =  await this.doctorRepo.findById(nixpendId);
        return doctor;
    }
}