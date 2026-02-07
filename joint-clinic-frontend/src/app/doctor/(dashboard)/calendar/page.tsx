"use client";
import React, { useState, useEffect } from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import SearchInput from "@/components/atoms/searchInput";
import AppointmentItem from "@/components/molecules/AppointmentItem";
import ScrollableArea from "@/components/atoms/ScrollableArea";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import Button from "@/components/atoms/Button";
import { useDoctorBookings } from "@/hooks/useDoctor";

const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "all">("upcoming");
  const [filter, setFilter] = useState<"Today" | "This Week" | "This Month">("Today");
  const [searchTerm, setSearchTerm] = useState("");

  const [doctorId, setDoctorId] = useState<string>("");

  useEffect(() => {
    const storedNixpendId = localStorage.getItem("doctorNixpendId");
    if (storedNixpendId) {
      setDoctorId(storedNixpendId);
    }
  }, []);

  const periodMap: Record<string, "today" | "week" | "month"> = {
    "Today": "today",
    "This Week": "week",
    "This Month": "month"
  };

  const period = activeTab === 'all' ? 'month' : (periodMap[filter] || 'today');
  // If 'all' tab, maybe fetch 'month' or create new 'all' API? 
  // User didn't ask for 'all' API, just 3 APIs. 
  // Re-using 'month' for 'all' or default to 'month' is reasonable fallback or I can fetch multiple.
  // Converting 'all' to 'month' for now as placeholder or keep 'all' if backend supports it (it doesn't yet).
  // Actually, for "All Bookings" tab, maybe we should fetch 'month' or just show empty if no API?
  // Let's map 'all' -> 'month' for now to show something, or user might want `getAllBookings`?
  // `useDoctorBookings` expects today/week/month.

  const { data: bookings, isLoading } = useDoctorBookings(doctorId, { period: period as any });

  const allBookings = bookings?.map((b:any) => {
    // Combine appointmentDate and appointmentTime into a single datetime
    const dateOnly = b.appointmentDate.split('T')[0]; // Extract date part (YYYY-MM-DD)
    const dateTimeString = `${dateOnly}T${b.appointmentTime}`; // Combine with time
    
    return {
      id: b._id,
      name: b.patientName || "Unknown Patient",
      status: b.status.charAt(0).toUpperCase() + b.status.slice(1),
      statusColor: b.status === 'confirmed' ? "text-[#1C9A55]" : "text-[#F5A623]",
      // Formatting date like "Feb 14th 2026 at 6:00 PM"
      date: new Date(dateTimeString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }) + (b.status === 'pending' ? ' (Pending)' : '')
    };
  }) || [];


  const filteredBookings = allBookings.filter((b:any) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col">
      <DashBoardHeader therapyName="" nav={false} >
        <div className="flex items-center gap-4 w-full justify-between">
          <div className="flex gap-8">
            <div onClick={() => setActiveTab("upcoming")} className="cursor-pointer">
              <Typography
                text="Upcoming Bookings"
                variant="bodyRegular"
                className={`${activeTab === "upcoming" ? "text-[#1E5598]" : "text-[#9CA3AF]"} font-bold text-lg transition-colors`}
              />
            </div>
            <div onClick={() => setActiveTab("all")} className="cursor-pointer">
              <Typography
                text="All Bookings"
                variant="bodyRegular"
                className={`${activeTab === "all" ? "text-[#1E5598]" : "text-[#9CA3AF]"} font-bold text-lg transition-colors`}
              />
            </div>
          </div>
        </div>
      </DashBoardHeader>

      <DashBoardContent>
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 w-full gap-4 lg:gap-0">
          <div className=" flex flex-col w-full gap-6">
            <div className="flex flex-col gap-2 self-start">
              <Typography
                text={activeTab === "upcoming" ? "Upcoming Bookings" : "All bookings"}
                variant="heading2"
                className=" font-bold text-3xl"
                gradient={true}
              />
              {activeTab === "upcoming" && (
                <Typography text="Please note that these bookings are for the upcoming week only" variant="bodyRegular" className="text-[#8A8A8A] text-sm" />
              )}
            </div>
            <div className="flex flex-row justify-start items-start sm:items-center gap-4 min-w-full">
              {/* Filters */}
              {activeTab === "upcoming" && ["Today", "This Week", "This Month"].map((f) => (
                <div key={f} className="flex gap-4 items-start w-fit">

                  <Button
                    onClick={() => setFilter(f as any)}
                    text={f}
                    variant="primary"
                    active={filter === f}
                    className="rounded-full! text-sm! border!"
                  />
                </div>))}
            </div>
          </div>

          {/* Search */}
          <div className="w-full flex justify-end items-start lg:items-center">
            <SearchInput
              placeholder="Search By patient"
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
              className="w-full lg:w-auto"
            />
          </div>
        </div>

        <div className="w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-y-2 md:block md:bg-white md:rounded-[24px] md:shadow-sm md:p-8">
          <ScrollableArea className="w-full px-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-40 text-gray-400">Loading bookings...</div>
            ) : filteredBookings.length > 0 ? (
              filteredBookings.map((apt:any, index:number) => (
                <div key={index} className="md:border-b md:border-gray-300 last:border-0 py-2 md:py-6">
                  <AppointmentItem
                    name={apt.name}
                    status={apt.status}
                    date={apt.date}
                    statusColor={apt.statusColor}
                  />
                </div>
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                No bookings found.
              </div>
            )}
          </ScrollableArea>
        </div>
      </DashBoardContent>
    </div>
  );
};

export default CalendarPage;
