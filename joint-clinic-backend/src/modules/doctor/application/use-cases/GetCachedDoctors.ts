import { DoctorRepoPort } from "../ports/DoctorRepoPort";

export class GetCachedPractitioners {
  constructor(private doctorRepo: DoctorRepoPort) {}
    async execute(branch?: string, department?: string) {
        return this.doctorRepo.getAll(branch, department);
    }
}