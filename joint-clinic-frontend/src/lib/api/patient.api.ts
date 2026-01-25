import api from "./axios";

// Types
export interface PatientDashboardData {
  ok: boolean;
  data: {
    hasActiveTreatment: boolean;
    message?: string;
    // Dashboard data when hasActiveTreatment is true
    patientName?: string;
    therapyName?: string;
    totalSessions?: number;
    treatmentLength?: string;
    sessionsCompleted?: number;
    exercisesCompleted?: number;
    weekSummary?: string;
    summaryItems?: Array<{
      title: string;
      subtitle?: string;
      status: "Done" | "Pending";
      date: string;
      time?: string;
    }>;
  };
}

export interface Patient {
  _id: string;
  userId: string;
  nixpendId: string;
  injuryDetails?: {
    affectedArea?: string;
    startDate?: Date;
    receivedTreatment?: boolean;
    painSeverity?: number;
    howDidInjurHappened?: string;
    painOccasionalOrConstant?: "occasional" | "constant";
    affectDailyActivities?: boolean;
    additionalNotes?: string;
    medicalReports?: string[];
  };
  status?: "active" | "inactive";
  notes?: string;
  // Extended properties for details pages (optional as they may not be in all responses)
  personalDetails?: {
    email?: string;
    nationality?: string;
    maritalStatus?: string;
    identifierType?: string;
    address?: string;
    city?: string;
    speakingLanguage?: string;
    gender?: string;
    dob?: string;
    nationalId?: string;
  };
  statistics?: {
    sessions?: number;
    sessionsCompleted?: number;
    treatmentLength?: string;
    exercisesCompleted?: number;
    numExercises?: number;
    exercisesAssigned?: number;
    nextAppointment?: string;
    nextExercise?: string;
  };
  fullName?: string; // Often returned as calculated field
  condition?: string; // Alias for injuryDetails.affectedArea or similar
  createdAt?: Date;
  updatedAt?: Date;
}

// API Functions

/**
 * Get patient dashboard data by patient ID
 */
export const getPatientDashboard = async (
  patientId: string
): Promise<PatientDashboardData> => {
  try {
    const response = await api.get(`/patient/${patientId}/dashboard`);
    console.log("getPatientDashboard response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching patient dashboard:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

/**
 * Get patient by patient ID
 */
export const getPatientById = async (patientId: string): Promise<Patient> => {
  try {
    const response = await api.get(`/patient/${patientId}`);
    console.log("getPatientById response:", response.data);
    return response.data.patient;
  } catch (error) {
    console.error(
      "Error fetching patient:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

/**
 * Get patient by user ID
 */
export const getPatientByUserId = async (userId: string): Promise<Patient> => {
  try {
    const response = await api.get(`/patient/user/${userId}`);
    console.log("getPatientByUserId response:", response.data);
    return response.data.patient;
  } catch (error) {
    console.error(
      "Error fetching patient by userId:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

/**
 * Update patient data
 */
export const updatePatient = async (
  patientId: string,
  data: Partial<Patient>
): Promise<Patient> => {
  try {
    const response = await api.put(`/patient/${patientId}`, data);
    console.log("updatePatient response:", response.data);
    return response.data.patient;
  } catch (error) {
    console.error(
      "Error updating patient:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

/**
 * Get all patients with optional status filter
 */
export const getAllPatients = async (
  status?: "active" | "inactive"
): Promise<Patient[]> => {
  try {
    const response = await api.get("/patient", {
      params: status ? { status } : undefined,
    });
    console.log("\n\n???????????????????  getAllPatients response:\n\n", response.data, "\n\n");
    return response.data.data || [];
  } catch (error) {
    console.error(
      "Error fetching all patients:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};
/**
 * Get active patients
 */
export const getActivePatients = async (): Promise<Patient[]> => {
  try {
    const response = await api.get("/patient/active");
    console.log("getActivePatients response:", response.data);
    return response.data.data || [];
  } catch (error) {
    console.error(
      "Error fetching active patients:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};
