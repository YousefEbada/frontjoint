import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDoctors,
  getDoctorById,
  getDoctorBookings,
  getDoctorSessions,
  getDoctorPatients,
} from "@/lib/api/doctor.api";

export const useDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
};

export const useDoctor = (doctorId: string) => {
  return useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: () => getDoctorById(doctorId),
    enabled: !!doctorId,
  });
};

export const useDoctorBookings = (
  doctorId: string,
  params?: { period?: "day" | "week" | "month"; date?: Date | string }
) => {
  return useQuery({
    queryKey: ["doctor-bookings", doctorId, params],
    queryFn: () => getDoctorBookings(doctorId, params),
    enabled: !!doctorId,
  });
};

export const useDoctorSessions = (
  doctorId: string,
  params?: { period?: "day" | "week" | "month"; date?: Date | string }
) => {
  return useQuery({
    queryKey: ["doctor-sessions", doctorId, params],
    queryFn: () => getDoctorSessions(doctorId, params),
    enabled: !!doctorId,
  });
};

export const useDoctorPatients = (
  doctorId: string,
  status?: "active" | "inactive"
) => {
  return useQuery({
    queryKey: ["doctor-patients", doctorId, status],
    queryFn: () => getDoctorPatients(doctorId, status),
    enabled: !!doctorId,
  });
};
