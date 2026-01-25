"use client";
import React from 'react'
import dayjs from 'dayjs';
import { useAllBookings } from '@/hooks/useBooking';
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from 'next/link';
import BookingList from "@/components/organisms/Bookings/BookingList";
import BookingStats from "@/components/molecules/BookingStats";
import SearchInput from '@/components/atoms/searchInput';
import PatientRow from '@/components/atoms/PatientRow';
import DashBoardContent from '@/components/atoms/DashBoardContent';

const BookingsPage = () => {
    const { data: bookings } = useAllBookings();

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'text-[#1C9A55]';
            case 'pending': return 'text-[#fdb515]';
            case 'cancelled': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

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
                    {bookings && bookings.length > 0 ? (
                        bookings.map((booking: any) => (
                            <div key={booking._id}>
                                <PatientRow
                                    name={booking.patientName || "Unknown Patient"}
                                    status={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    statusColor={getStatusColor(booking.status)}
                                    date={`${dayjs(booking.appointmentDate).format('MMM D')} - ${booking.appointmentTime}`}
                                />
                                <hr className='hidden md:block w-full h-[1px] bg-gray-200 my-2' />
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center p-4">No bookings found.</div>
                    )}
                </div>
            </DashBoardContent>
        </>
    )
}

export default BookingsPage
