"use client";
import React from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import Link from "next/link";
import MessageRow from "@/components/molecules/MessageRow";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { useDoctorPatients } from "@/hooks/useDoctor";

const SupportPage = () => {
    // TODO: Replace with actual logged-in doctor ID
    const doctorId = "HLC-PRAC-2022-00001";

    const { data: patients, isLoading } = useDoctorPatients(doctorId, 'active');

    const messages = patients?.map((p, i) => ({
        id: i + 1, // MessageRow might expect number id, check prop type. If strict, use index + 1 or hash
        patientId: p._id, // Keep track of real ID for navigation if needed
        name: p.fullName,
        // Mocking message status for variety
        status: i % 4 === 0 ? "Unread" : "Read",
        statusColor: i % 4 === 0 ? "text-[#EE3124]" : "text-[#FDB515]",
        dotColor: i % 4 === 0 ? "bg-[#EE3124]" : "bg-[#FDB515]",
        title: "General Inquiry",
        context: p.condition || "No specific injury",
        time: "Recently"
    })) || [];

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false} />

            <DashBoardContent>
                <Typography text="Patient Communication" variant="heading2" gradient={true} className="font-bold text-3xl" />

                <CorneredBoxes type="shadowBox" className="w-full h-full bg-white p-4 md:p-8 rounded-[30px] flex flex-col relative">
                    <Typography text="All Messages" variant="subheader" className="text-[#167C4F] font-bold mb-8 self-start" />

                    <div className="w-full h-full overflow-y-auto custom-scrollbar flex flex-col gap-y-2 md:gap-y-0">
                        {isLoading ? (
                            <div className="text-center py-10 text-gray-400">Loading messages...</div>
                        ) : messages.length > 0 ? (
                            messages.map((msg) => (
                                <MessageRow
                                    key={msg.id}
                                    id={msg.id}
                                    name={msg.name}
                                    status={msg.status}
                                    statusColor={msg.statusColor}
                                    dotColor={msg.dotColor}
                                    title={msg.title}
                                    context={msg.context}
                                    time={msg.time}
                                />
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-400">No messages found.</div>
                        )}
                    </div>

                    <div className="hidden mt-auto md:flex justify-end self-end pt-4">
                        <Link href="/doctor/support/all-messages" className="underline text-[#1E5598] font-bold text-base">View All Messages</Link>
                    </div>
                </CorneredBoxes>
            </DashBoardContent>
        </div>
    );
};

export default SupportPage;
