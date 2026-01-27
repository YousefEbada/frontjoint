import { BookingRepoPort } from "../ports/BookingRepoPort.js";
import { startOfDay, startOfWeek, startOfMonth } from "../../../../shared/utils/date.js";

export class GetStaffBookings {
    constructor(private bookingRepo: BookingRepoPort) { }

    async exec(period: 'today' | 'week' | 'month' | 'all' = 'all') {
        try {
            const now = new Date();
            let bookings;

            switch (period) {
                case 'today':
                    bookings = await this.bookingRepo.findBookingsByDay(now);
                    break;
                case 'week':
                    bookings = await this.bookingRepo.findBookingsByWeek(startOfWeek(now));
                    break;
                case 'month':
                    bookings = await this.bookingRepo.findBookingsByMonth(startOfMonth(now));
                    break;
                case 'all':
                    bookings = await this.bookingRepo.getAllBookings();
                    break;
                default:
                    return { ok: false, error: 'Invalid period' };
            }

            return { ok: true, data: bookings };
        } catch (error) {
            console.error(`[GetStaffBookings] Error fetching ${period} bookings:`, error);
            return { ok: false, error: 'Internal server error' };
        }
    }
}
