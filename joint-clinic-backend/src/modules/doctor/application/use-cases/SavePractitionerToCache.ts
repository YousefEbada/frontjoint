import { DoctorRepoPort } from "../ports/DoctorRepoPort";

export class SavePractitionerToCache {
  constructor(private doctorRepo: DoctorRepoPort) {}
    async execute(practitioners: any[]) {
        await this.doctorRepo.clear();
        await this.doctorRepo.saveMany(practitioners);
    }
}