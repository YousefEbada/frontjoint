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
  const [patients, setPatients] = useState<Record<string, string>>({});
  const { tickets, isLoading: loadingTickets } = useSupportTickets();

  // Fetch patients map
  React.useEffect(() => {
    import("@/lib/api/patient.api").then(({ getAllPatients }) => {
      getAllPatients().then(pList => {
        const map: Record<string, string> = {};
        pList.forEach(p => {
          if (p._id) map[p._id] = p.fullName || p.userId; // fallback to userId if fullName missing
          if (p.userId) map[p.userId] = p.fullName || "Patient"; // double map just in case ID refers to userId
        });
        setPatients(map);
      }).catch(err => console.error("Failed to load patients for mapping", err));
    });
  }, []);

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
                const status: "Pending" | "Done" = ticket.completed ? "Done" : "Pending";

                // Use mapped name or fallback
                let patientName = "Unknown";
                if (typeof ticket.patientId === 'string') {
                  patientName = patients[ticket.patientId] || `Patient (${ticket.patientId.slice(-4)})`;
                } else if (typeof ticket.patientId === 'object' && (ticket.patientId as any).fullName) {
                  patientName = (ticket.patientId as any).fullName;
                }

                return (
                  <RequestItem
                    key={ticket._id}
                    name={patientName}
                    status={status as any}
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
