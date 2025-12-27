export interface Doctor {
  _id: string;
  userId: string;
  specialization: string;
  licenseNumber: string;
  bio?: string;
  experienceYears?: number;
  consultationFee?: number;
  availability?: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
  status: "active" | "inactive" | "suspended";
  rating?: number;
}

export interface DoctorBooking {
  _id: string;
  patientId: string;
  doctorId: string;
  slotId: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  appointmentDate: string; // ISO Date
  notes?: string;
  patientName?: string; // If populated
}

export interface DoctorSession {
  _id: string;
  doctorId: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "cancelled" | "completed";
  maxPatients?: number;
}

export interface DoctorPatient {
  _id: string;
  fullName: string;
  gender: string;
  birthDate: string;
  contact: string;
  lastVisit?: string;
  condition?: string;
  status: "active" | "inactive";
}
