"use client";
import React, { useState } from "react";
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

  // TODO: Replace with actual logged-in doctor ID
  const doctorId = "HLC-PRAC-2022-00001";

  // Fetch bookings - fetching 'month' to verify 'all' tab or generic list
  // Optimization: Could filter by API params based on tab/filter, but for now client-side filtering on fetched list is fine
  const { data: bookings, isLoading } = useDoctorBookings(doctorId, { period: 'month' });

  const allBookings = bookings?.map(b => ({
    id: b._id,
    name: b.patientName || "Unknown Patient",
    status: b.status.charAt(0).toUpperCase() + b.status.slice(1),
    statusColor: b.status === 'confirmed' ? "text-[#1C9A55]" : "text-[#F5A623]",
    // Formatting date like "Nov 2nd 2025 at 8:00 Pm"
    date: new Date(b.appointmentDate).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }) + (b.status === 'pending' ? ' (Pending)' : '') // Optional indication
  })) || [];


  const filteredBookings = allBookings.filter(b =>
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
              filteredBookings.map((apt, index) => (
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
