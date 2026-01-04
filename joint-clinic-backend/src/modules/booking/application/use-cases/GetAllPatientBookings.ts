import { PatientRepoPort } from "modules/patient/application/ports/PatientRepoPort.js";
import { BookingRepoPort } from "../ports/BookingRepoPort.js";

export class GetAllPatientBookings {
  constructor(
    private bookingRepo: BookingRepoPort,
    private patientRepo: PatientRepoPort
  ) {}
    async exec(patientId: string) {
        try {
            const patient = await this.patientRepo.getPatient(patientId);
            if (!patient) {
                return { ok: false, error: 'Patient not found' };
            }
            const bookings = await this.bookingRepo.findBookingsByPatient(patientId);
            if (!bookings) {
                return { ok: false, error: 'No bookings found for this patient' };
            }
            return { ok: true, data: bookings };
        } catch (error) {
            return { ok: false, error: 'Internal server error' };
        }
    }
}