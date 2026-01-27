import { DoctorRepoPort } from "modules/doctor/application/ports/DoctorRepoPort.js";
import { NixpendPort } from "modules/integration/ports/NixpendPorts.js";

export class GetAvailableSlots {
  constructor(private repo: NixpendPort, private doctorRepo: DoctorRepoPort) { }
  async exec(doctorId: string, fromDate?: string, toDate?: string) {
    try {
      let doctor;
      if (doctorId.startsWith('HLC')) {
        doctor = await this.doctorRepo.findByNixpendId(doctorId);
      } else {
        doctor = await this.doctorRepo.findById(doctorId);
      }
      console.log("===== doctor ======= ", doctor)
      if (!doctor || !doctor.nixpendId) {
        return { ok: false, error: 'Doctor not found or missing Nixpend ID' };
      }

      // Default dates if not provided: Today and Today + 30 days
      const today = new Date();
      const future = new Date();
      future.setDate(today.getDate() + 30);

      const start = fromDate || today.toISOString().split('T')[0];
      const end = toDate || future.toISOString().split('T')[0];

      console.log(`[GetAvailableSlots] Fetching slots from ${start} to ${end}`);

      const slots = await this.repo.getAvailableSlots(doctor.nixpendId, 'Joint Clinic', start, end);
      console.log("===== slots ======= ", slots.data.length)
      if (!slots.data || slots.data.length === 0) {
        return { ok: false, error: 'No slots available from Nixpend' };
      }
      return { ok: true, slots: slots.data };
    } catch (error: any) {
      console.error("===== GetAvailableSlots Exception:", error);
      return { ok: false, error: error.message || 'Error fetching slots from Nixpend' };
    }
  }
}