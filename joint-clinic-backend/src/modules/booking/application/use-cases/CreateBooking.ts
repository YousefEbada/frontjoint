import { Booking, BookingType } from 'modules/booking/domain/Booking.js';
import { BookingRepoPort } from '../ports/BookingRepoPort.js';
import { BookType } from 'modules/integration/domain/Nixpend.js';
import { NixpendPort } from 'modules/integration/ports/NixpendPorts.js';
import { SessionRepoPort } from 'modules/session/application/ports/SessionRepoPort.js';

type ValidateResult = {
  violation: string;
};

type CreateBookingResult =
  | { ok: true; booking: Booking }
  | { ok: false; error: string; violations?: ValidateResult[] };

export class CreateBooking {
  constructor(
    private bookingRepo: BookingRepoPort,
    private nixpendRepo: NixpendPort,
    private sessionRepo: SessionRepoPort
  ) {}

  async exec(
    data: BookType,
    sessionId?: string
  ): Promise<CreateBookingResult> {

    const violations = this.validate(data);
    if (violations) {
      return { ok: false, error: 'Invalid booking data', violations };
    }

    const tx = await this.sessionRepo.startTransaction();

    try {
      let session = null;

      if (data.appointment_type === 'session') {
        if (!sessionId) {
          return { ok: false, error: 'Session ID is required for session booking' };
        }

        session = await this.sessionRepo.findSessionById(
          sessionId,
          { tx: tx.session }
        );

        if (!session || session.status !== 'pending') {
          return { ok: false, error: 'Session is not available for booking' };
        }
      }

      const res = await this.nixpendRepo.bookAppointment({ ...data });

      if (!res?.appointment_id) {
        throw new Error('Failed to book appointment in Nixpend');
      }

      const booking = await this.bookingRepo.book(
        {
          patientId: data.patient,
          doctorId: data.practitioner,
          branchId: data.branch || undefined,
          eventName: data.daily_practitioner_event,
          appointmentNixpendId: res.appointment_id,
          appointmentDuration: data.duration,
          appointmentDate: new Date(data.appointment_date),
          appointmentTime: data.appointment_time,
          bookingType: data.appointment_type as BookingType,
          department: data.department,
          company: 'Joint Clinic',
          sessionId: session?._id
        },
        { tx: tx.session }
      );

      if (session) {
        await this.sessionRepo.updateSession(
          session._id,
          {
            bookingId: booking._id,
            status: 'confirmed'
          },
          { tx: tx.session }
        );
      }

      await tx.commit();

      return { ok: true, booking };

    } catch (error) {
      await tx.abort();
      console.error('Booking failed:', error);
      return { ok: false, error: 'Exception occurred during booking' };
    }
  }

  private validate(data: BookType): ValidateResult[] | null {
    const violations: ValidateResult[] = [];

    if (!data.daily_practitioner_event) {
      violations.push({ violation: 'Event should be defined' });
    }

    if (!data.appointment_date || !data.appointment_time) {
      violations.push({ violation: 'Appointment date and time should be defined' });
    }

    if (!data.duration) {
      violations.push({ violation: 'Duration should be defined' });
    }

    if (!data.practitioner) {
      violations.push({ violation: 'Practitioner ID should be defined' });
    }

    if (!data.department) {
      violations.push({ violation: 'Department should be defined' });
    }

    if (!data.patient) {
      violations.push({ violation: 'Patient ID should be defined' });
    }

    return violations.length ? violations : null;
  }
}
