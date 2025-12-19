import { Schema } from "mongoose";
import { ObjectId } from "mongoose";

export type Role = 'Patient' | 'Doctor' | 'Admin' | 'Staff';
export type Gender = 'Male' | 'Female' | 'male' | 'female';
export type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Widowed';
export type AccountStatus = 'active' | 'inactive';
export type UserStatus = { partialProfileCompleted: Boolean, registerOtpVerified: Boolean, fullProfileCompleted: Boolean}
export type IdentifierType = 'email' | 'phone' | 'nid' | 'iqama' | undefined;

export interface User {
  _id: string;
  role: Role;
  fullName: string;
  email?: string;
  phone?: string;
  birthdate: Date;
  gender: Gender;
  identifier?: string;
  identifierType?: IdentifierType;
  nationality?: string;
  address?: string;
  city?: string;
  maritalStatus?: MaritalStatus;
  speakingLanguages?: string[];
  guardianInformation: string | Schema.Types.ObjectId;
  patientCategory?: string;
  userStatus?: UserStatus;
  accountStatus?: AccountStatus;
  createdAt: Date;
}