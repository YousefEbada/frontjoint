"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import ProgressBar from "@/components/atoms/ProgressBar";
import SummaryItem from "@/components/molecules/SummaryItem";
import { color } from "@/lib/constants/colors";
import { useState } from "react";
import { mockDashboardData as data } from "@/lib/data/dashboardData";
import TaskList from "../../../../components/atoms/tasklist/tasklist";
import SearchInput from "@/components/atoms/searchInput";
import SessionCard from "@/components/molecules/sessionCard";
import Button from "@/components/atoms/Button";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import BookingList from "@/components/organisms/Bookings/BookingList";
import Link from "next/link";

const Page = () => {

  const bookings = [
    {
      id: "1",
      sessionNumber: 1,
      type: "patient" as const,
      status: "Confirmed" as const,
      date: "Oct 13th 2025",
      time: "2:00 Pm"
    },
    {
      id: "2",
      sessionNumber: 2,
      type: "patient" as const,
      status: "Pending" as const,
      date: "Nov 2nd 2025",
      time: "8:00 Pm"
    },
    {
      id: "3",
      sessionNumber: 3,
      type: "patient" as const,
      status: "Pending" as const,
      date: "Jan 2nd 2025",
      time: "8:00 Pm"
    }
  ];
  return (
    <>
      <DashBoardHeader therapyName="Shoulder Therapy">
        <Typography text="Upcoming Bookings" variant="bodyRegular" className="text-[#1e5598] font-medium" />
        <Link href="/staffboard/bookings">
          <Typography text="All Bookings" variant="bodyRegular" className="text-gray-400 font-medium hover:text-[#1e5598] transition-colors" />
        </Link>
      </DashBoardHeader>
      <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar">
        {/* Welcome Section */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2 ">
            <Typography text="Upcoming Bookings" variant="heading1" style={{
              fontWeight: "bold",
              fontSize: "45px"
            }} className="bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent" />
            <p className={`text-[22px] font-medium`} style={{ color: color.disabled }}>Please note that these bookings are for the upcoming week only</p>
            <div className="flex flex-row justify-between items-center w-full">
              <div className="btns flex flex-row justify-center gap-6 items-center mt-[20px]">
                <Button text="Today" variant="primary" active={true} className="w-[150px] sm:w-[220px] md:w-[185px] m-0 h-[50px] text-[#1e5598]" />
                <Button text="This Week" variant="primary" active={true} className="w-[150px] sm:w-[220px] md:w-[185px] m-0 h-[50px] text-[#1e5598]" />
                <Button text="This Month" variant="primary" active={true} className="w-[150px] sm:w-[220px] md:w-[185px] m-0 h-[50px] text-[#1e5598]" />
              </div>
            </div>

          </div>
          <div className="flex flex-col justify-center gap-6 items-end mt-[20px]">
            {/* search component */}
            <SearchInput
              // value={query}
              // onChange={setQuery}
              // تقدر تزود كلاس لو حابب تتحكم في العرض
              placeholder="Search By patient"
              className="w-[260px] sm:w-[320px] md:w-[380px]"
            />
          </div>
        </div>
        <div className="w-full bg-white rounded-[20px] shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] p-5 overflow-y-auto custom-scrollbar">
          <BookingList bookings={bookings} />
        </div>
      </main>
    </>
  );
};

export default Page;
