import api from "./axios";
import {
    AvailableSlotsResponse,
    BookingResponse,
    Booking,
    CancelBookingPayload,
    CreateBookingPayload,
    RescheduleBookingPayload,
} from "@/types/booking";

// Pending booking storage key
const PENDING_BOOKING_KEY = "pendingBooking";

export interface PendingBookingData {
    branch: string;
    injury: string;
    doctorNixpendId: string;
    doctorName: string;
    // patientName: string;   
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
        let patientName = localStorage.getItem("patientName") || "Unknown Patient";
        let patientEmail = localStorage.getItem("patientEmail") || "";
        let doctorName = bookingData.doctorName || localStorage.getItem("doctorName") || "Unknown Doctor";
        let patientId = localStorage.getItem("patientId") || "";
        console.log("> createBooking patientName:", patientName
            , "> patientEmail:", patientEmail
            , "> doctorName:", doctorName
            , "> patientId:", patientId
        );
        const payload = {
            patientEmail,
            doctorName,
            patientName,
            patientId
        }

        bookingData = {
            ...bookingData,
            appointment_time: `${bookingData.appointment_time}:00`,
            payload
        }
        console.log("createBooking bookingData:", bookingData);
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

export const getPatientBookings = async (patientId: string): Promise<any> => {
    try {
        const response = await api.get(`/booking/patient/${patientId}`);
        console.log("getPatientBookings response:", response.data);
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching patient bookings:",
            (error as any).response?.data || (error as any).message
        );
        return { ok: false, error: "Failed to fetch patient bookings" };
    }
};

export const cancelBooking = async (bookingId: string, data: CancelBookingPayload): Promise<any> => {
    try {
        const response = await api.put(`/booking/${bookingId}/cancel`, { data });
        return response.data;
    } catch (error) {
        console.error("Error cancelling booking:", error);
        return { ok: false, error: "Failed to cancel booking" };
    }
};

export const rescheduleBooking = async (bookingId: string, data: RescheduleBookingPayload): Promise<any> => {
    try {
        const response = await api.put(`/booking/${bookingId}/reschedule`, data);
        return response.data;
    } catch (error) {
        console.error("Error rescheduling booking:", error);
        return { ok: false, error: "Failed to reschedule booking" };
    }
};

export const getBookingById = async (bookingId: string): Promise<any> => {
    try {
        const response = await api.get(`/booking/${bookingId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching booking:", error);
        return { ok: false, error: "Failed to fetch booking" };
    }
};

export const getDoctorBookings = async (
    doctorId: string,
    period: 'today' | 'week' | 'month'
): Promise<Booking[]> => {
    try {
        const response = await api.get(`/booking/doctor/${doctorId}/bookings/${period}`);
        console.log(`getDoctorBookings (${period}) response:`, response.data);
        // The API returns { ok: true, data: [...] }. 
        // Our hook expects just the array or potentially the response wrapper depending on usage.
        // Existing hooks seem to return response.data which is { ok: true, data: ... }.
        // Let's return response.data.data directly if standard, OR return response.data and let hook handle accessing .data.
        // Looking at other APIs:
        // `getAvailableSlots` returns response.data (AvailableSlotsResponse).
        // `getAllPatients` returns response.data.data.
        // `getPatientBookings` returns response.data.
        // Let's return response.data to be safe and consistent with hook usage `data: doctorBookings` then `doctorBookings.data`.
        // But `overview/page.tsx` does:
        // `const { data: bookings } = useDoctorBookings(...)`
        // `const appointments = bookings?.map(...)` -> implies `bookings` is the array.
        // So `useDoctorBookings` should return the array?
        // Let's see `useDoctorBookings` in `useDoctor.ts`:
        // `queryFn: () => getDoctorBookings(doctorId, params)`
        // If query returns object, `data` is that object.
        // If page accesses `bookings.length` or maps, `bookings` MUST be array.
        // So API should return array?
        // Or Hook selector?
        // Let's return `response.data.data` if available, or empty array.
        return response.data.data || [];
    } catch (error) {
        console.error(
            `Error fetching doctor bookings (${period}):`,
            (error as any).response?.data || (error as any).message
        );
        return [];
    }
};

export const getStaffBookings = async (
    period: 'today' | 'week' | 'month'
): Promise<Booking[]> => {
    try {
        const response = await api.get(`/booking/bookings/${period}`);
        console.log(`getStaffBookings (${period}) response:`, response.data);
        return response.data.data || [];
    } catch (error) {
        console.error(
            `Error fetching staff bookings (${period}):`,
            (error as any).response?.data || (error as any).message
        );
        return [];
    }
};

export const getAllBookings = async (): Promise<Booking[]> => {
    try {
        const response = await api.get(`/booking`);
        console.log("getAllBookings response:", response.data);
        // API /booking returns { ok: true, data: [...] } from getAllBookings controller
        return response.data.data || [];
    } catch (error) {
        console.error(
            "Error fetching all bookings:",
            (error as any).response?.data || (error as any).message
        );
        return [];
    }
};
