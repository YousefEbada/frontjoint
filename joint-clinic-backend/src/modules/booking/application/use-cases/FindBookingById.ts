import { BookingRepoPort } from "../ports/BookingRepoPort.js";

export class FindBookingById {
  constructor(private repo: BookingRepoPort) {}
    async exec(bookingId: string) {
        try {
            console.log("===== FindBookingById Use Case =====, bookingId: ", bookingId);
            const booking =  await this.repo.findById(bookingId);
            console.log("===== FindBookingById Use Case =====, booking: ", booking);
            if(!booking) {
              return { ok: false, error: 'Booking not found' };
            }
            return { ok: true, booking };
        } catch (error) {
            return { ok: false, error: 'Error retrieving booking' };
        }
    }
}