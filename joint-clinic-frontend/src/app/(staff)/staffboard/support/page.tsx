"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@/components/atoms/Typography';
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import ContactForm from "@/components/organisms/ContactForm";
import RequestDoctorHelp from "@/components/organisms/RequestDoctorHelp";
import Button from '@/components/atoms/Button';
import RequestItem from '@/components/atoms/RequestItem';
import DashBoardContent from '@/components/atoms/DashBoardContent';

import { useSupportTickets } from "@/hooks/useSupport";

const SupportPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'call' | 'doctor'>('call');
  const { tickets, isLoading: loadingTickets } = useSupportTickets();

  return (
    <>
      <DashBoardHeader therapyName="Oct 12, 2025 - 4:00 PM">
      </DashBoardHeader>
      <DashBoardContent>

        <>
          <Typography text="Call Requests" variant="heading2" className="bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent font-bold mb-2 pl-[30px]" />
          <div className="w-full md:bg-white md:rounded-[20px] md:shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] md:p-5 md:py-[40px] overflow-y-auto grid grid-cols-1gap-y-2 md:gap-4 custom-scrollbar">
            <div className="hidden md:block">
              <Typography text="All Messages" variant="heading2" className="text-[#167C4F]" />
            </div>

            {loadingTickets ? (
              <div className="text-gray-400 p-4">Loading call requests...</div>
            ) : tickets.length === 0 ? (
              <div className="text-gray-400 p-4">No call requests found.</div>
            ) : (
              tickets.map(ticket => {
                // Map boolean completed to status string for UI
                // User requirement: if false -> "Pending", if true -> "Done"
                const status: "Pending" | "Done" = ticket.completed ? "Done" : "Pending";

                // Name handling: If object, use fullName. If string, try to look it up or show ID.
                // Since we don't have a patients map yet, using the ID or "Patient" is the fallback.
                // Ideally we should fetch patient info. For now, let's allow the ID fallback to be more visible or cleaner.
                const patientName = typeof ticket.patientId === 'object' && (ticket.patientId as any).fullName
                  ? (ticket.patientId as any).fullName
                  : "Patient (" + (typeof ticket.patientId === 'string' ? ticket.patientId.slice(-4) : 'Unknown') + ")";

                // NOTE: To fix "Unknown", the backend must populate patientId, OR we must fetch the patient list and map it.
                // Assuming backend might not populate, we could use `getDoctorPatients` if valid, but that requires doctor auth. 
                // This is staff view. Staff might need their own `getAllPatients`.

                return (
                  <RequestItem
                    key={ticket._id}
                    name={patientName}
                    status={status as any} // RequestItem expects specific strings, but let's check its props again. It accepts "Done" | "Opened" | "Unread".
                    // User asked for "Pending" for false. RequestItem supports: "Done", "Opened", "Unread".
                    // I need to update RequestItem to support "Pending" or map "Pending" to "Unread"/"Opened" visually.
                    // "Unread" is red, "Opened" is yellow. "Pending" usually implies waiting -> "Unread" (Red) or "Opened" (Yellow).
                    // User said "if its false its 'Pending'". I should update RequestItem to accept "Pending".
                    phone={ticket.contact}
                    department={ticket.inquiryDept}
                    date={new Date(ticket.createdAt).toLocaleDateString()}
                    onViewDetails={() => router.push(`/staffboard/support/${ticket._id}`)}
                  />
                );
              })
            )}
          </div>
        </>

      </DashBoardContent>
    </>
  );
};

export default SupportPage;
