import { NixpendPort } from "modules/integration/ports/NixpendPorts";

export class GetAvailableSlots {
  constructor(private repo: NixpendPort) {}
    async exec(doctorId: string, date: string) {
        return this.repo.getAvailableSlots(doctorId, 'Joint Clinic');
    }
}