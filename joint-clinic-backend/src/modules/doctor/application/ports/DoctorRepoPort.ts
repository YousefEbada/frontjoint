export interface DoctorRepoPort {
  saveMany(practitioners: any[]): Promise<void>;
  getAll(branch?: string, department?: string): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  clear(): Promise<void>;
}