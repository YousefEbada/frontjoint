import React from "react";
import Link from "next/link";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import BookingContent from "@/components/booking/BookingContent";
import Typography from "@/components/atoms/Typography";

const BookingPage = () => {
    return (
        <>
            <DashBoardHeader therapyName="Shoulder Therapy">
                <Typography variant="bodyRegular" className="text-[#1e5598] font-medium">Book a Session</Typography>
                <Link href="/dashboard/bookings">
                    <Typography variant="bodyRegular" className="text-gray-400 font-medium hover:text-[#1e5598] transition-colors">My Bookings</Typography>
                </Link>
            </DashBoardHeader>
            <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar">
                <BookingContent />
            </main>
        </>
    );
};

export default BookingPage;
