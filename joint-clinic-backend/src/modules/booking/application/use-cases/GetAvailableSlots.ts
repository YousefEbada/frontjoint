import { DoctorRepoPort } from "modules/doctor/application/ports/DoctorRepoPort";
import { NixpendPort } from "modules/integration/ports/NixpendPorts";

export class GetAvailableSlots {
  constructor(private repo: NixpendPort, private doctorRepo: DoctorRepoPort) {}
    async exec(doctorId: string) {
        try {
          const doctor = await this.doctorRepo.findById(doctorId)
          if(!doctor || !doctor.nixpendId) {
            return {ok: false, error: 'Doctor not found or missing Nixpend ID' };
          }
          const slots = await this.repo.getAvailableSlots(doctor.nixpendId, 'Joint Clinic');
          if(!slots.data || slots.data.length === 0) {
            return {ok: false, error: 'No slots available from Nixpend' };
          }
          return {ok: true, slots};
        } catch (error) {
          return {ok: false, error: 'Error fetching slots from Nixpend' };
        }
    }
}