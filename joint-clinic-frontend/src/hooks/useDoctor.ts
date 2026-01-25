import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDoctors,
  getDoctorById,
  getDoctorSessions,
  getDoctorPatients,
} from "@/lib/api/doctor.api";
import { getDoctorBookings } from "@/lib/api/booking.api";

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
  params?: { period?: "today" | "week" | "month" | "day"; date?: Date | string }
) => {
  const periodMap: Record<string, 'today' | 'week' | 'month'> = {
    'day': 'today',
    'today': 'today',
    'week': 'week',
    'month': 'month'
  };
  const apiPeriod = params?.period ? periodMap[params.period] || 'today' : 'today';

  return useQuery({
    queryKey: ["doctor-bookings", doctorId, apiPeriod],
    queryFn: () => getDoctorBookings(doctorId, apiPeriod),
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
