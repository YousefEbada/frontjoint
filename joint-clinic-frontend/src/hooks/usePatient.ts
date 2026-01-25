import { useQuery } from "@tanstack/react-query";
import {
  getPatientDashboard,
  getPatientById,
  getPatientByUserId,
  getAllPatients,
  getActivePatients,
} from "@/lib/api/patient.api";



export const usePatients = (status?: "active" | "inactive") => {
  return useQuery({
    queryKey: ["patients", status],
    queryFn: () => {
      if (status === 'active') {
        return getActivePatients();
      }
      return getAllPatients(status);
    },
  });
};

export const usePatientDashboard = (patientId: string) => {
  return useQuery({
    queryKey: ["patient-dashboard", patientId],
    queryFn: () => getPatientDashboard(patientId),
    enabled: !!patientId,
  });
};

export const usePatient = (patientId: string) => {
  return useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getPatientById(patientId),
    enabled: !!patientId,
  });
};

export const usePatientByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["patient-by-user", userId],
    queryFn: () => getPatientByUserId(userId),
    enabled: !!userId,
  });
};


