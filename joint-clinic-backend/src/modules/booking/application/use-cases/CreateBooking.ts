import { Booking, BookingStatus } from 'modules/booking/domain/Booking.js';
import { BookingRepoPort } from '../ports/BookingRepoPort.js';
import { BookType } from 'modules/integration/domain/Nixpend.js';
import { NixpendPort } from 'modules/integration/ports/NixpendPorts.js';

type CreateBookingResult =
  | { ok: true; booking: Booking }
  | { ok: false; error: string }

type ValidateResult = {
  violation: string
}

export class CreateBooking {
constructor(private repo: BookingRepoPort, private nixpendRepo: NixpendPort) { }
  async exec(data: BookType) {
    const validation = this.validate(data);

    if (!validation) {
      return { ok: false, error: 'Invalid booking data' , violations: validation  };
    }

    try {
      const res = await this.nixpendRepo.bookAppointment({
        ...data
      })

      if(!res || !res.appointment_id) {
        return { ok: false, error: 'Failed to book appointment in Nixpend' } as CreateBookingResult
      }
  
      const booking = await this.repo.book({
        patientId: data.patient,
        doctorId: data.practitioner,
        branchId: data.branch || undefined,
        eventName: data.daily_practitioner_event,
        appointmentNixpendId: res.appointment_id,
        appointmentDuration: data.duration,
        appointmentDate: new Date(data.appointment_date),
        appointmentTime: data.appointment_time,
        bookingType: data.appointment_type as any,
        department: data.department,
        company: 'Joint Clinic'
      });

      console.log("Booking created:", booking);

      return { ok: true, booking }
    } catch (error) {
      console.error("Exception during booking:", (error as any).message);
      return { ok: false, error: 'Exception occurred during booking' } as CreateBookingResult
    }
  }


  private validate(data: BookType): ValidateResult[] | null {
    const violations: ValidateResult[] = [];
    if(data.daily_practitioner_event === undefined) {
      violations.push({violation: 'Event Should be defined'});
    }

    if(data.appointment_date === undefined || data.appointment_time === undefined) {
      violations.push({violation: 'Appointment date and time should be defined'});
    }

    if(data.duration === undefined) {
      violations.push({violation: 'Duration should be defined'});
    }

    if(data.practitioner === undefined) {
      violations.push({violation: 'Practitioner ID should be defined'});
    }

    if(data.department === undefined) {
      violations.push({violation: 'Department should be defined'});
    }

    if(data.patient === undefined) {
      violations.push({violation: 'Patient ID should be defined'});
    }

    return violations.length > 0 ? violations : null;
  }
}
