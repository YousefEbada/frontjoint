import React from 'react'
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from 'next/link';
import BookingList from "@/components/organisms/Bookings/BookingList";
import BookingStats from "@/components/molecules/BookingStats";
import SearchInput from '@/components/atoms/searchInput';
import PatientRow from '@/components/atoms/PatientRow';
import PatientCard from '@/components/atoms/PatientCard';

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
                <Link href="/staffboard/clients">
                    <Typography text="Active Patients" variant="bodyRegular" className="text-gray-400 font-medium hover:text-[#1e5598] transition-colors" />
                </Link>
                <Typography text="All Patients" variant="bodyRegular" className="text-[#1e5598] font-medium" />
            </DashBoardHeader>

            <main className="w-full h-full flex flex-col gap-4 p-4 md:p-8 overflow-y-auto custom-scrollbar">
                <div className="flex flex-row items-center justify-between mb-[15px]">
                    <Typography text="Active Patients" variant="heading1" style={{
                        fontWeight: "bold",
                        fontSize: "45px"
                    }} className="bg-gradient-to-b pl-[50px] from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent" />
                    <SearchInput
                        // value={query}
                        // onChange={setQuery}
                        // تقدر تزود كلاس لو حابب تتحكم في العرض
                        placeholder="Search By patient"
                        className="w-[260px] sm:w-[320px] md:w-[380px]"
                    />
                </div>

                <div className="w-full bg-white rounded-[20px] shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] p-5 py-[40px] overflow-y-auto grid grid-cols-3 gap-[30px] md:grid-cols-2 lg:grid-cols-3 gap-4 custom-scrollbar">
                    <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                    <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                    <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                    <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                    <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                    <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                    <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                    <PatientCard name="John Doe" injury="Shoulder Injury" status="Active" />
                </div>                
            </main>
        </>
    )
}

export default BookingsPage
