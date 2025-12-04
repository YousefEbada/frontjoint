import React, { Suspense } from "react";
import Link from "next/link";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import BookingContent from "@/components/organisms/Booking/BookingContent";
import Typography from "@/components/atoms/Typography";

const BookingPage = () => {
    return (
        <>
            <DashBoardHeader therapyName="Shoulder Therapy">
                <Typography text="Book a Session" variant="bodyRegular" className="text-[#1e5598] font-medium" />
                <Link href="/dashboard/bookings">
                    <Typography text="My Bookings" variant="bodyRegular" className="text-gray-400 font-medium hover:text-[#1e5598] transition-colors" />
                </Link>
            </DashBoardHeader>
            <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading...</div>}>
                    <BookingContent />
                </Suspense>
            </main>
        </>
    );
};

export default BookingPage;
