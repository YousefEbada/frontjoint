import React, { Suspense } from "react";
import Link from "next/link";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import BookingContent from "@/components/organisms/Booking/BookingContent";
import Typography from "@/components/atoms/Typography";
import DashBoardContent from "@/components/atoms/DashBoardContent";

const BookingPage = () => {
    return (
        <>
            <DashBoardHeader therapyName="Shoulder Therapy">
                <Typography text="Book a Session" variant="bodyRegular" gradient={true} />
                <Link href="/patient/bookings">
                    <Typography text="My Bookings" variant="bodyRegular" className="text-gray-400 font-medium hover:text-[#1e5598] transition-colors" />
                </Link>
            </DashBoardHeader>
            <DashBoardContent>
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading...</div>}>
                    <BookingContent />
                </Suspense>
            </DashBoardContent>
        </>
    );
};

export default BookingPage;
