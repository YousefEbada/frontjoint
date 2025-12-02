import { bookType, cancelType, fetchType, registerType, updateType } from "../domain/Nixpend";

export interface NixpendPort {
  // Not found
  fetchSchedules(): Promise<any[]>;

  // Patient
  findPatient(type: fetchType, value: string): Promise<any | null>;
  registerPatient(data: registerType): Promise<any>;
  updatePatient(id: string, data: updateType): Promise<any>;

  // Practitioner
  getPractitioners(branch: string, department: string): Promise<any[]>;

  // Appointment
  bookAppointment(data: bookType): Promise<any>;

  // IVR
  ivrGetPatientData(mobile: string): Promise<any | null>;
  ivrConfirmAppointment(confirm: '0' | '1' | '2', name: string): Promise<boolean>;
  ivrPatientAppointment(after: string, branch: string): Promise<any[]>;

  // cancel appointment
  cancelAppointment(data: cancelType): Promise<boolean>;

  // Not found
  fetchReportById(id: string): Promise<{ bytes: Buffer, name: string } | null>;
}
