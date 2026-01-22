"use client";
import React from 'react';
import { usePatientBookings } from "@/hooks/useBooking";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from 'next/link';
import BookingList from "@/components/organisms/Bookings/BookingList";
import BookingStats from "@/components/molecules/BookingStats";
import DashBoardContent from '@/components/atoms/DashBoardContent';

// Force dynamic rendering - this page requires authentication
export const dynamic = 'force-dynamic';

const BookingsPage = () => {
    const [patientId, setPatientId] = React.useState<string | null>(null);

    React.useEffect(() => {
        const storedPatientId = localStorage.getItem("patientId");
        if (storedPatientId) {
            setPatientId(storedPatientId);
        }
    }, []);

    const { data: bookingData, isLoading } = usePatientBookings(patientId || "");
    const bookings = React.useMemo(() => {
        if (!bookingData) return [];
        // Handle case where API returns { bookings: [...] } or { data: [...] }
        const bookingsList = Array.isArray(bookingData) ? bookingData :
            (Array.isArray(bookingData?.bookings) ? bookingData.bookings :
                (Array.isArray(bookingData?.data) ? bookingData.data : []));

        return bookingsList.map((booking: any, index: number) => ({
            id: booking._id,
            patientName: booking.patientName,
            sessionNumber: index + 1,
            type: booking.bookingType === "session" ? "session" : "patient",
            status: booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : "Pending",
            date: dayjs(booking.appointmentDate).format("MMM Do YYYY"),
            time: dayjs(`2000-01-01 ${booking.appointmentTime}`).format("h:mm A")
        }));
    }, [bookingData]);

    return (
        <>
            <DashBoardHeader therapyName="Shoulder Therapy">
                <Link href="/patient/booking">
                    <Typography text="Book a Session" variant="bodyRegular" className="text-gray-400 font-medium hover:text-[#1e5598] transition-colors" />
                </Link>
                <Typography text="My Bookings" variant="bodyRegular" className="text-[#1e5598] font-medium" />
            </DashBoardHeader>

            <DashBoardContent>
                <Typography text="Dates" variant="heading2" className="text-[#0D294D] font-bold text-3xl mb-2" />

                <BookingList bookings={bookings} />

                <div className="mt-4 md:block hidden">
                    <Typography
                        text="Please note that the bookings can be rescheduled or cancelled at least 24 hours before the appointment"
                        variant="bodyRegular"
                        className="text-gray-400 text-sm mb-4"
                    />
                    <BookingStats />
                </div>
            </DashBoardContent>
        </>
    )
}

export default BookingsPage
