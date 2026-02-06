"use client";
import React from "react";
import BookingItem from "@/components/molecules/BookingItem";
import { Booking } from "@/types/booking";

interface BookingListProps {
    bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
    return (
        <section className="flex flex-col gap-y-2 md:gap-y-8 w-full px-[30px] overflow-y-auto custom-scrollbar">
            {bookings.map((booking) => (
                <React.Fragment key={booking._id}>
                    <BookingItem
                        id={booking._id}
                        sessionNumber={0} // Not available in shared Booking type
                        doctorName={booking.doctorName}
                        patientName={booking.patientName}
                        type="session"
                        status={booking.status as "Confirmed" | "Pending" | "Cancelled"}
                        date={typeof booking.appointmentDate === 'string' ? booking.appointmentDate : new Date(booking.appointmentDate).toISOString().split('T')[0]}
                        time={booking.appointmentTime}
                        rawDateTime={booking.appointmentDate.toString()}
                        onCancel={() => console.log("Cancel", booking._id)}
                        onReschedule={() => console.log("Reschedule", booking._id)}
                    />
                    <div className="md:h-[1px] md:w-full md:bg-black"></div>
                </React.Fragment>
            ))}
        </section>
    );
};

export default BookingList;
