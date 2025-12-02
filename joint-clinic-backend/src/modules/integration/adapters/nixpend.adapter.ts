import { NixpendPort } from '../ports/NixpendPorts.js';
import { bookType, cancelType, fetchType, registerType, updateType } from "../domain/Nixpend.js";

export const nixpendAdapter: NixpendPort = {
  async fetchSchedules() { return []; },
  async findPatient(type: string, value: string) { return null; },
  async fetchReportById(_id: string) { return null; },
  async registerPatient(data: registerType) { return null; },
  async updatePatient(id: string, data: updateType) { return null; },
  async getPractitioners(branch: string, department: string) { return []; },
  async bookAppointment(data: bookType) { return null; },
  async cancelAppointment(data: cancelType) { return false; },
  async ivrGetPatientData(mobile: string) { return null; },
  async ivrConfirmAppointment(confirm: '0' | '1' | '2', name: string) { return false; },
  async ivrPatientAppointment(after: string, branch: string) { return []; },
};
