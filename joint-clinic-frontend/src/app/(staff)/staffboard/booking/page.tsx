"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";
import SearchInput from "@/components/atoms/searchInput";
import Button from "@/components/atoms/Button";
import BookingList from "@/components/organisms/Bookings/BookingList";
import Link from "next/link";
import DashBoardContent from "@/components/atoms/DashBoardContent";

const Page = () => {

  const bookings = [
    {
      id: "1",
      sessionNumber: 1,
      type: "patient" as const,
      status: "Confirmed" as const,
      date: "Oct 13",
      time: "2:00 Pm"
    },
    {
      id: "2",
      sessionNumber: 2,
      type: "patient" as const,
      status: "Pending" as const,
      date: "Nov 2",
      time: "8:00 Pm"
    },
    {
      id: "3",
      sessionNumber: 3,
      type: "patient" as const,
      status: "Pending" as const,
      date: "Jan 2",
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
      <DashBoardContent>
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0">
          <div className="flex flex-col gap-2 ">
            <Typography text="Upcoming Bookings" variant="heading1" className="bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent" />
            <p className={`text-[18px] md:text-[22px] font-medium`} style={{ color: color.disabled }}>Please note that these bookings are for the upcoming week only</p>
            <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center w-full mt-[20px] gap-4">
              <div className="grid grid-cols-3 md:flex md:flex-nowrap md:flex-row md:justify-start gap-x-0.5  md:gap-6 md:items-center w-full">
                <Button text="Today" variant="primary" active={true} className="w-full sm:w-[220px] md:w-[185px] m-0  text-[#1e5598]" />
                <Button text="This Week" variant="primary" active={true} className="w-full sm:w-[220px] md:w-[185px] m-0  text-[#1e5598]" />
                <Button text="This Month" variant="primary" active={true} className="w-full sm:w-[220px] md:w-[185px] m-0 text-[#1e5598]" />
              </div>
            </div>

          </div>
          <div className="flex flex-col justify-start md:justify-center gap-6 items-start md:items-end mt-[20px]">
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
        <div className="w-full h-full md:bg-white md:rounded-[20px] md:shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] md:p-5 md:overflow-y-auto md:custom-scrollbar">
          <BookingList bookings={bookings} />
        </div>
      </DashBoardContent>
    </>
  );
};

export default Page;
