import React from 'react'
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from 'next/link';
import BookingList from "@/components/organisms/Bookings/BookingList";
import BookingStats from "@/components/molecules/BookingStats";

const BookingsPage = () => {
    const bookings = [
        {
            id: "1",
            sessionNumber: 5,
            type: "session" as const,
            status: "Confirmed" as const,
            date: "Oct 13th 2025",
            time: "2:00 Pm"
        },
        {
            id: "2",
            sessionNumber: 6,
            type: "session" as const,
            status: "Pending" as const,
            date: "Nov 2nd 2025",
            time: "8:00 Pm"
        },
        {
            id: "3",
            sessionNumber: 7,
            type: "session" as const,
            status: "Pending" as const,
            date: "Jan 2nd 2025",
            time: "8:00 Pm"
        }
    ];

    return (
        <>
            <DashBoardHeader therapyName="Shoulder Therapy">
                <Link href="/patient/booking">
                    <Typography text="Book a Session" variant="bodyRegular" className="text-gray-400 font-medium hover:text-[#1e5598] transition-colors" />
                </Link>
                <Typography text="My Bookings" variant="bodyRegular" className="text-[#1e5598] font-medium" />
            </DashBoardHeader>

            <main className="w-full h-full flex flex-col gap-4 p-4 md:p-8 overflow-y-auto custom-scrollbar">
                <Typography text="Dates" variant="heading2" className="text-[#0D294D] font-bold text-3xl mb-2" />

                <BookingList bookings={bookings} />

                <div className="mt-4">
                    <Typography
                        text="Please note that the bookings can be rescheduled or cancelled at least 24 hours before the appointment"
                        variant="bodyRegular"
                        className="text-gray-400 text-sm mb-4"
                    />

                    <BookingStats />
                </div>
            </main>
        </>
    )
}

export default BookingsPage
