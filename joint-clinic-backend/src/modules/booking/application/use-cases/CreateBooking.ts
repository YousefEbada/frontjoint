import { BookingRepoPort } from '../ports/BookingRepoPort.js';

export class CreateBooking {
  constructor(private repo: BookingRepoPort) {}
  async exec(input: { patientId: string; doctorId: string; branchId: string; slotStart: Date; slotEnd: Date; }) {
    const overlap = await this.repo.existsOverlap(input.doctorId, input.slotStart, input.slotEnd);
    if (overlap) throw Object.assign(new Error('DOUBLE_BOOKING'), { status: 409, code: 'DOUBLE_BOOKING' });
    return this.repo.create(input);
  }
}
