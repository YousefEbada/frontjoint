import React from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from "next/link";
import BookingList from "@/components/organisms/Bookings/BookingList";
import BookingStats from "@/components/molecules/BookingStats";
import SearchInput from "@/components/atoms/searchInput";
import PatientRow from "@/components/atoms/PatientRow";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { color } from "framer-motion";
import { color as colorConst } from "@/lib/constants/colors";
import Calendar from "@/components/molecules/Calendar";
import CustomSelect from "@/components/atoms/CustomSelect";
import Button from "@/components/atoms/Button";
import Button2 from "@/components/atoms/Button2Com";

const BookingsPage = () => {
  return (
    <>
      <DashBoardHeader therapyName="Shoulder Therapy">
        <Typography
          text="Upcoming Bookings"
          variant="bodyRegular"
          className="text-[#1e5598] font-medium"
        />
        <Link href="/staffboard/bookings">
          <Typography
            text="All Bookings"
            variant="bodyRegular"
            className="text-gray-400 font-medium hover:text-[#1e5598] transition-colors"
          />
        </Link>
      </DashBoardHeader>

      <DashBoardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 px-4 sm:px-6 md:px-0 mb-4 sm:mb-6 md:mb-0">
          <Typography
            text="Change Patient Booking"
            variant="heading1"
            style={{
              fontWeight: "bold",
              fontSize: "45px",
            }}
            className="bg-gradient-to-b pl-0 md:pl-[50px] from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-[45px] text-center md:text-left"
          />
          <p
            style={{ color: colorConst.success }}
            className="font-medium text-[20px] text-base sm:text-lg md:text-[20px]"
          >
            Patient Name
          </p>
        </div>

        <div className="booking-change-container w-full h-full flex flex-col gap-y-6 sm:gap-y-8 md:bg-white md:rounded-[20px] md:shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] p-4 sm:p-6 md:p-5 md:overflow-y-auto md:custom-scrollbar">
          <div className="booking-change-left leftside flex flex-col w-full pl-0 sm:pl-4 md:pl-[50px]">
            <Typography
              text="Select the date"
              variant="heading1"
              style={{
                fontWeight: "bold",
                fontSize: "45px",
              }}
              className="bg-gradient-to-b pl-0 from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-[45px] text-center md:text-left"
            />
            <div className="flex justify-center md:justify-start">
              <Calendar width="md:w-[340px]" />
            </div>
          </div>
          <div className="booking-change-right rightside flex flex-col w-full px-2 sm:px-4 md:px-0">
            <Typography
              text="Choose your time slot"
              variant="heading1"
              style={{
                fontWeight: "bold",
                fontSize: "45px",
              }}
              className="bg-gradient-to-b pl-0 from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-[45px] text-center md:text-left"
            />
            <CustomSelect
              items={["8:00 AM", "9:00 AM", "10:00 AM"]}
              width="90%"
              height="100px"
            />
            <Typography
              text="Confirm your booking"
              variant="heading1"
              style={{
                fontWeight: "bold",
                fontSize: "45px",
                marginTop: "40px",
              }}
              className="bg-gradient-to-b pl-0 from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-[45px] mt-6 sm:mt-8 md:mt-[40px] text-center md:text-left"
            />
            <pre></pre>
            <h3 className="text-[22px] text-base sm:text-lg md:text-[22px] text-[#1E5598] font-bold my-3 sm:my-4 md:my-[15px] text-center md:text-left">
              Patient Booking was on:{" "}
              <span style={{ color: colorConst.info, marginLeft: "35px" }} className="block sm:inline sm:ml-[35px] mt-1 sm:mt-0">
                Monday, January 2nd 2026 at 8:00 Am
              </span>
            </h3>
            <h3 className="text-[22px] text-base sm:text-lg md:text-[22px] text-[#1E5598] font-bold text-center md:text-left">
              Patient Booking will be on:{" "}
              <span style={{ color: colorConst.success, marginLeft: "6.5px" }} className="block sm:inline sm:ml-[6.5px] mt-1 sm:mt-0">
                Monday, January 2nd 2026 at 8:00 Am
              </span>
            </h3>
            <Button
              text="Confirm"
              variant="primary"
              className="self-center w-full sm:w-[230px] md:w-[230px] mt-5"
            />
          </div>
        </div>
      </DashBoardContent>
    </>
  );
};

export default BookingsPage;
