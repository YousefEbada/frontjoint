import api from "./axios";
import {
  Doctor,
  DoctorBooking,
  DoctorPatient,
  DoctorSession,
} from "@/types/doctor";

export const getDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await api.get("api/doctor");
    console.log("getDoctors response:", response.data.doctors?.slice(0, 5));
    return response.data.doctors || [];
  } catch (error) {
    console.error(
      "Error fetching doctors:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

export const getDoctorById = async (doctorId: string): Promise<Doctor> => {
  try {
    const response = await api.get(`api/doctor/${doctorId}`);
    console.log("getDoctorById response:", response.data);
    return response.data.doctor;
  } catch (error) {
    console.error(
      "Error fetching doctor by ID:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

export const getDoctorBookings = async (
  doctorId: string,
  params?: { period?: "day" | "week" | "month"; date?: Date | string }
): Promise<DoctorBooking[]> => {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/${doctorId}/bookings`, { params });
    console.log("getDoctorBookings response:", response.data);
    return response.data.bookings || [];
  } catch (error) {
    console.error(
      "Error fetching doctor bookings:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

export const getDoctorSessions = async (
  doctorId: string,
  params?: { period?: "day" | "week" | "month"; date?: Date | string }
): Promise<DoctorSession[]> => {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/${doctorId}/sessions`, { params });
    console.log("getDoctorSessions response:", response.data);
    return response.data.sessions || [];
  } catch (error) {
    console.error(
      "Error fetching doctor sessions:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

export const getDoctorPatients = async (
  doctorId: string,
  status?: "active" | "inactive"
): Promise<DoctorPatient[]> => {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/${doctorId}/patients`, {
      params: { status },
    });
    console.log("getDoctorPatients response:", response.data);
    return response.data.patients || [];
  } catch (error) {
    console.error(
      "Error fetching doctor patients:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};
