export interface NixpendPort {
  fetchSchedules(): Promise<any[]>;
  fetchPatientById(id: string): Promise<any | null>;
  fetchReportById(id: string): Promise<{ bytes: Buffer, name: string } | null>;
}
