import { BookingRepoPort } from "../ports/BookingRepoPort.js";
import { startOfDay, startOfWeek, startOfMonth } from "../../../../shared/utils/date.js";

export class GetDoctorBookings {
    constructor(private bookingRepo: BookingRepoPort) { }

    async exec(doctorId: string, period: 'today' | 'week' | 'month') {
        try {
            const now = new Date();
            let bookings;

            switch (period) {
                case 'today':
                    bookings = await this.bookingRepo.findBookingsByDoctorAndDay(doctorId, now);
                    break;
                case 'week':
                    // Assuming week starts on Sunday or Monday, using utility or default date behavior
                    // If shared/utils/date.js has startOfWeek, use it, otherwise generic JS
                    // The instruction mentioned "this week".
                    // Let's assume start of current week.
                    bookings = await this.bookingRepo.findBookingsByDoctorAndWeek(doctorId, startOfWeek(now));
                    break;
                case 'month':
                    bookings = await this.bookingRepo.findBookingsByDoctorAndMonth(doctorId, startOfMonth(now));
                    break;
                default:
                    return { ok: false, error: 'Invalid period' };
            }

            return { ok: true, data: bookings };
        } catch (error) {
            console.error(`[GetDoctorBookings] Error fetching ${period} bookings:`, error);
            return { ok: false, error: 'Internal server error' };
        }
    }
}
