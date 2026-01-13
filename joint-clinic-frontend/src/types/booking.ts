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
// hgsdhgsdhsd
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
}

export interface BookingResponse {
    ok: boolean;
    booking?: {
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
    };
    error?: string;
    violations?: { violation: string }[];
}

export interface AvailableSlotsResponse {
    ok: boolean;
    slots?: AvailableSlot[];
    error?: string;
}
