"use client";
import React from "react";
import BookingItem from "@/components/molecules/BookingItem";

interface Booking {
    id: string;
    sessionNumber: number;
    status: "Confirmed" | "Pending" | "Cancelled";
    date: string;
    time: string;
}

interface BookingListProps {
    bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
    return (
        <div className="w-full bg-white rounded-[24px] shadow-sm p-6 md:p-8 h-[400px] overflow-y-auto custom-scrollbar">
            {bookings.map((booking) => (
                <BookingItem
                    key={booking.id}
                    sessionNumber={booking.sessionNumber}
                    status={booking.status}
                    date={booking.date}
                    time={booking.time}
                    onCancel={() => console.log("Cancel", booking.id)}
                    onReschedule={() => console.log("Reschedule", booking.id)}
                />
            ))}
        </div>
    );
};

export default BookingList;
