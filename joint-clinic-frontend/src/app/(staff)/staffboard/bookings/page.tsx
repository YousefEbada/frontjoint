import React from 'react'
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from 'next/link';
import BookingList from "@/components/organisms/Bookings/BookingList";
import BookingStats from "@/components/molecules/BookingStats";
import SearchInput from '@/components/atoms/searchInput';
import PatientRow from '@/components/atoms/PatientRow';
import DashBoardContent from '@/components/atoms/DashBoardContent';

const BookingsPage = () => {
    const bookings = [
        {
            id: "1",
            sessionNumber: 5,
            type: "patient" as const,
            status: "Confirmed" as const,
            date: "Oct 13th 2025",
            time: "2:00 Pm"
        },
        {
            id: "2",
            sessionNumber: 6,
            type: "patient" as const,
            status: "Pending" as const,
            date: "Nov 2nd 2025",
            time: "8:00 Pm"
        },
        {
            id: "3",
            sessionNumber: 7,
            type: "patient" as const,
            status: "Pending" as const,
            date: "Jan 2nd 2025",
            time: "8:00 Pm"
        }
    ];

    return (
        <>
            <DashBoardHeader therapyName="Shoulder Therapy">
                <Link href="/staffboard/booking">
                    <Typography text="Upcoming Bookings" variant="bodyRegular" className="text-gray-400 font-medium hover:text-[#1e5598] transition-colors" />
                </Link>
                <Typography text="All Bookings" variant="bodyRegular" className="text-[#1e5598] font-medium" />
            </DashBoardHeader>

            <DashBoardContent>
                <div className="flex flex-col md:flex-row items-center justify-between mb-[20px] gap-4 md:gap-0">
                    <Typography text="All Bookings" variant="heading1" style={{
                        fontWeight: "bold",
                        fontSize: "45px"
                    }} className="bg-gradient-to-b pl-0 md:pl-[50px] from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent" />
                    <SearchInput
                        placeholder="Search By patient"
                        className="w-full md:w-[380px]"
                    />
                </div>

                <div className="w-full h-full flex flex-col gap-y-3 md:bg-white md:rounded-[20px] md:shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] md:p-5 md:overflow-y-auto md:custom-scrollbar">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index}>
                            <PatientRow name="John Doe" status="Pending" statusColor="text-[#fdb515]" date="Oct 12 - 3:00 Pm" />
                            <hr className='hidden md:block w-full h-[1px] bg-gray-200 my-2' />
                        </div>
                    ))}
                </div>
            </DashBoardContent>
        </>
    )
}

export default BookingsPage
