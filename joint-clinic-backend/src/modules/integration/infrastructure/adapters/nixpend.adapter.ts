import { NixpendPort } from '../../domain/NixpendPorts.js';
export const nixpendAdapter: NixpendPort = {
  async fetchSchedules() { return []; },
  async fetchPatientById(_id: string) { return null; },
  async fetchReportById(_id: string) { return null; }
};
