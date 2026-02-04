// Booking types matching backend schemas

export interface AvailableSlot {
    appointment_type_appointment: string | null;
    patient_confirmed: number | null;
    no_reply: number | null;
    patient_name: string | null;
    status: string | null;
    event_name: string | null;
    present: number | null;
    block_start: string | null;
    block_end: string | null;
    block_event_id: string | null;
    block_event_type: string | null;
    block_event_color: string | null;
    end: string | null;
    start: string | null;
    is_locked: number | null;
    appointment_count: number | null;
    event_capacity: number | null;
    color: string | null;
    title: string | null;
    practitioner: string | null;
    practitioner_name: string | null;
    company: string | null;
    branch: "Alaqiq" | "King Salman" | null;
    slot_duration: number | null;
    department: string | null;
    service_unit: string | null;
    appointment_service_unit: string | null;
    appointment_name: string | null;
    appointment_desk_comment: string | null;
    price_list: string | null;
    appointment_type: string | null;
}

export interface CreateBookingPayload {
    practitioner: string;
    patient: string;
    branch?: "Alaqiq" | "King Salman";
    daily_practitioner_event: string;
    appointment_date: string;
    appointment_time: string;
    duration: number;
    appointment_type: string;
    department: string;
    company?: "Joint Clinic";
    patient_name: string;
    payload?: any; // Optional field to include additional data for rescheduling
}

export interface RescheduleBookingPayload {
    practitioner: string,
    department: string,
    company: string,
    appointment_type: string,
    appointment_date: string,
    appointment_time: string,
    daily_practitioner_event: string,
    service_unit?: string,
    duration: number,
    actual_duration: number
}

export interface CancelBookingPayload {
    appointment_id: string,
    cancellation_source: string,
    cancellation_date: string,
    cancellation_reason: string,
    cancelled_by: string
}

export interface Booking {
    _id: string;
    patientId: string;
    doctorId: string;
    branchId?: string;
    eventName: string;
    appointmentNixpendId: string;
    appointmentDate: string;
    appointmentTime: string;
    appointmentDuration: number;
    bookingType: string;
    status: string;
    department: string;
    company: string;
    patientName?: string; // Added as it is used in overview/page.tsx
}

export interface BookingResponse {
    ok: boolean;
    booking?: Booking;
    error?: string;
    violations?: { violation: string }[];
}

export interface AvailableSlotsResponse {
    ok: boolean;
    slots?: AvailableSlot[];
    error?: string;
}
