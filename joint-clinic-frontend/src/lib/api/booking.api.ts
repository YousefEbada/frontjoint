import api from "./axios";
import {
    AvailableSlotsResponse,
    BookingResponse,
    CreateBookingPayload,
} from "@/types/booking";

// Pending booking storage key
const PENDING_BOOKING_KEY = "pendingBooking";

export interface PendingBookingData {
    branch: string;
    injury: string;
    doctorNixpendId: string;
    doctorName: string;
    selectedDate: string;
    selectedTime: string;
    eventName: string;
    duration: number;
    createdAt: string;
}

// Save pending booking to localStorage
export const savePendingBooking = (data: PendingBookingData): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem(PENDING_BOOKING_KEY, JSON.stringify(data));
    }
};

// Get pending booking from localStorage
export const getPendingBooking = (): PendingBookingData | null => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(PENDING_BOOKING_KEY);
        if (data) {
            try {
                return JSON.parse(data) as PendingBookingData;
            } catch {
                return null;
            }
        }
    }
    return null;
};

// Clear pending booking from localStorage
export const clearPendingBooking = (): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(PENDING_BOOKING_KEY);
    }
};

// Check if user is authenticated as patient
export const isPatientAuthenticated = (): boolean => {
    if (typeof window !== "undefined") {
        const patientId = localStorage.getItem("patientId");
        return !!patientId;
    }
    return false;
};

export const getAvailableSlots = async (
    doctorId: string,
    fromDate?: string,
    toDate?: string
): Promise<AvailableSlotsResponse> => {
    try {
        const params: Record<string, string> = {};
        if (fromDate) params.fromDate = fromDate;
        if (toDate) params.toDate = toDate;

        const response = await api.get(`/booking/doctor/${doctorId}/slots`, { params });
        console.log("getAvailableSlots response:", response.data);
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching available slots:",
            (error as any).response?.data || (error as any).message
        );
        return { ok: false, error: "Failed to fetch available slots" };
    }
};

export const createBooking = async (
    bookingData: CreateBookingPayload
): Promise<BookingResponse> => {
    try {
        const response = await api.post("/booking", bookingData);
        console.log("createBooking response:", response.data);
        return response.data;
    } catch (error) {
        console.error(
            "Error creating booking:",
            (error as any).response?.data || (error as any).message
        );
        return { ok: false, error: "Failed to create booking" };
    }
};
