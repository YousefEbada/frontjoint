"use client";
import React from "react";
import BookingItem from "@/components/molecules/BookingItem";

interface Booking {
    id: string;
    patientName?: string;
    sessionNumber: number;
    type: "patient" | "session";
    status: "Confirmed" | "Pending" | "Cancelled";
    date: string;
    time: string;
}

interface BookingListProps {
    bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
    const [storedName, setStoredName] = React.useState("");

    React.useEffect(() => {
        const name = localStorage.getItem("patientName");
        if (name) setStoredName(name);
    }, []);

    return (
        <section className="flex flex-col gap-y-2 md:gap-y-8 w-full px-[30px] overflow-y-auto custom-scrollbar">
            {bookings.map((booking) => (
                <>
                    <BookingItem
                        key={booking.id}
                        id={booking.id}
                        sessionNumber={booking.sessionNumber}
                        patientName={booking.patientName || storedName}
                        type={booking.type}
                        status={booking.status}
                        date={booking.date}
                        time={booking.time}
                        onCancel={() => console.log("Cancel", booking.id)}
                        onReschedule={() => console.log("Reschedule", booking.id)}
                    />
                    <div className="md:h-[1px] md:w-full md:bg-black"></div>
                </>
            ))}
        </section>
    );
};

export default BookingList;
