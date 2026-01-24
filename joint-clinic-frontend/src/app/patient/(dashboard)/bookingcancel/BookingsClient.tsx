'use client';

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from "next/link";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { color as colorConst } from "@/lib/constants/colors";
import CustomSelect from "@/components/atoms/CustomSelect";
import Button from "@/components/atoms/Button";
import { useBookingDetails, useCancelBooking } from "@/hooks/useBooking";
import dayjs from "dayjs";

const BookingsClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams?.get("id") ?? "";
  const [reason, setReason] = useState("");

  const { data: bookingDetails, isLoading } = useBookingDetails(bookingId);
  const { mutate: cancelBooking, isPending } = useCancelBooking();

  const handleCancel = () => {
    if (!bookingId || !bookingDetails) return;

    cancelBooking(
      {
        id: bookingId,
        data: {
          appointment_id: bookingDetails.booking.appointmentNixpendId,
          cancellation_source: "Patient",
          cancellation_date: dayjs().format("DD-MM-YYYY"),
          cancellation_reason: reason,
          cancelled_by: "Phone",
        },
      },
      {
        onSuccess: () => router.push("/patient/bookings"),
      }
    );
  };

  if (isLoading) {
    return (
      <DashBoardContent>
        <Typography text="Loading booking details..." variant="bodyRegular" />
      </DashBoardContent>
    );
  }

  if (!bookingDetails) {
    return (
      <DashBoardContent>
        <Typography text="Booking not found" variant="heading2" />
        <Link href="/patient/bookings">
          <Button text="Go Back" variant="primary" />
        </Link>
      </DashBoardContent>
    );
  }

  const formattedDate = dayjs(bookingDetails.appointmentDate).format("dddd, MMMM Do YYYY");
  const formattedTime = dayjs(`2000-01-01 ${bookingDetails.appointmentTime}`).format("h:mm A");

  return (
    <>
      <DashBoardHeader therapyName="Shoulder Therapy">
        <Typography text="Upcoming Bookings" variant="bodyRegular" />
      </DashBoardHeader>

      <DashBoardContent>
        <Typography text="Cancel Patient Booking" variant="heading1" />
        <CustomSelect
          items={["Scheduling conflict", "Health issue", "Other"]}
          value={reason}
          onChange={setReason}
          placeholder="Select Reason"
        />

        <Typography
          text={`You are cancelling a booking for ${bookingDetails.patientName}`}
          variant="bodyRegular"
        />

        <Typography
          text={`${formattedDate} at ${formattedTime}`}
          variant="bodyRegular"
        />

        <div className="flex gap-3">
          <Button text="Back" onClick={() => router.back()} variant="primary" />
          <Button
            text={isPending ? "Cancelling..." : "Proceed"}
            onClick={handleCancel}
            disabled={!reason}
            variant="primary"
          />
        </div>
      </DashBoardContent>
    </>
  );
};

export default BookingsClient;
