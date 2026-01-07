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
                let status: "Unread" | "Opened" | "Done" = "Unread";
                if (ticket.status === 'in_progress') status = "Opened";
                if (ticket.status === 'resolved' || ticket.status === 'closed') status = "Done";

                return (
                  <RequestItem
                    key={ticket._id}
                    name={ticket.patientName || "Unknown"}
                    status={status}
                    phone={ticket.requesterPhone || "N/A"}
                    department={ticket.department}
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
