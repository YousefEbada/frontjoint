import React from 'react'
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from 'next/link';
import BookingList from "@/components/organisms/Bookings/BookingList";
import BookingStats from "@/components/molecules/BookingStats";
import SearchInput from '@/components/atoms/searchInput';
import PatientRow from '@/components/atoms/PatientRow';
import PatientCard from '@/components/molecules/PatientCard';
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
                <Typography text="Active Patients" variant="bodyRegular" className="text-[#1e5598] font-medium" />
                <Link href="/staffboard/allclients">
                    <Typography text="All Patients" variant="bodyRegular" className="text-gray-400 font-medium hover:text-[#1e5598] transition-colors" />
                </Link>
            </DashBoardHeader>

            <DashBoardContent>
                <div className="flex flex-col md:flex-row items-center justify-between mb-[15px] gap-4 md:gap-0">
                    <Typography text="Active Patients" variant="heading1" style={{
                        fontWeight: "bold",
                        fontSize: "45px"
                    }} className="bg-gradient-to-b pl-0 md:pl-[50px] from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent" />
                    <SearchInput
                        // value={query}
                        // onChange={setQuery}
                        // تقدر تزود كلاس لو حابب تتحكم في العرض
                        placeholder="Search By patient"
                        className="w-full md:w-[380px]"
                    />
                </div>
                    <div className="w-full md:bg-white md:rounded-[20px] md:shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] md:p-5 md:py-[40px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 md:gap-4 custom-scrollbar">
                        <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                        <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                        <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                        <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                        <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                        <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                        <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                        <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                    </div>
            </DashBoardContent>
        </>
    )
}

export default BookingsPage
