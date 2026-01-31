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
        <div className="w-full h-full py-[4%] px-4 sm:px-6 md:px-0 gap-y-6 sm:gap-y-8 md:gap-y-[40px] flex flex-col items-center md:bg-white md:rounded-[20px] md:shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)]  md:overflow-y-auto md:custom-scrollbar">
          <Typography
            text="Cancel Patient Booking"
            variant="heading1"
            style={{
              fontWeight: "bold",
              fontSize: "45px",
            }}
            className="bg-gradient-to-b pl-0 from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-[45px] text-center px-2"
          />
          <CustomSelect
            items={["Select Reason", "Reason 1", "Reason 2", "Reason 3"]}
            className="w-full sm:w-[90%] md:w-[400px] lg:w-[500px]"
            placeholder="Select Reason"
          />
          <div className="flex flex-col items-center px-2 sm:px-4 md:px-0">
            <h3 className="text-[22px] text-base sm:text-lg md:text-[22px] text-[#1E5598] font-bold my-3 sm:my-4 md:my-[15px] text-center">
              You are cancelling a booking for:
              <span style={{ color: colorConst.info, marginLeft: "5px" }} className="block sm:inline sm:ml-[5px] mt-1 sm:mt-0">
                Patient Name
              </span>
            </h3>
            <h3 className="text-[22px] text-base sm:text-lg md:text-[22px] text-[#1E5598] font-bold text-center">
              The booking was on:
              <span style={{ color: colorConst.info, marginLeft: "5px" }} className="block sm:inline sm:ml-[5px] mt-1 sm:mt-0">
                Monday, January 2nd 2026 at 8:00 Am
              </span>
            </h3>
          </div>
          <div className="btns flex flex-row gap-3 sm:gap-4 md:gap-5 flex-wrap justify-center px-2 sm:px-4 md:px-0">
            <Button text="Cancel" variant="primary" className="w-full sm:w-auto min-w-[100px] md:min-w-0" />
            <Button text="Proceed" variant="primary" className="w-full sm:w-auto min-w-[100px] md:min-w-0" />
          </div>
        </div>
      </DashBoardContent>
    </>
  );
};

export default BookingsPage;
