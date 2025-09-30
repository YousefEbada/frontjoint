export type Role = 'Patient'|'Doctor'|'Admin'|'Staff';
export interface User {
  _id: string;
  role: Role;
  name: string;
  email?: string;
  phone?: string;
  status: 'active'|'inactive';
  createdAt: Date;
}
