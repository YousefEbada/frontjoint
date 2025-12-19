"use client";
import React from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import Link from "next/link";
import MessageRow from "@/components/molecules/MessageRow";

// Mock Data
const messages = [
    { id: 1, name: "Patient Name", status: "Unread", statusColor: "text-[#EE3124]", dotColor: "bg-[#EE3124]", title: "Message Title", context: "Back Injury", time: "1d Ago" },
    { id: 2, name: "Patient Name", status: "Read", statusColor: "text-[#FDB515]", dotColor: "bg-[#FDB515]", title: "Message Title", context: "Back Injury", time: "2d Ago" },
    { id: 3, name: "Patient Name", status: "Read", statusColor: "text-[#FDB515]", dotColor: "bg-[#FDB515]", title: "Message Title", context: "Back Injury", time: "2d Ago" },
    { id: 4, name: "Patient Name", status: "Replied", statusColor: "text-[#1C9A55]", dotColor: "bg-[#1C9A55]", title: "Message Title", context: "Back Injury", time: "3d Ago" },
];

const SupportPage = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false} />

            <main className="w-full flex-1 flex flex-col gap-6 overflow-hidden p-1">
                <Typography text="Patient Communication" variant="heading2" gradient={true} className="font-bold text-3xl" />

                <CorneredBoxes type="shadowBox" className="w-full h-full bg-white p-4 md:p-8 rounded-[30px] flex flex-col relative">
                    <Typography text="All Messages" variant="subheader" className="text-[#167C4F] font-bold mb-8 self-start" />

                    <div className="flex flex-col gap-6 w-full">
                        {messages.map((msg) => (
                            <MessageRow
                                key={msg.id}
                                name={msg.name}
                                status={msg.status}
                                statusColor={msg.statusColor}
                                dotColor={msg.dotColor}
                                title={msg.title}
                                context={msg.context}
                                time={msg.time}
                            />
                        ))}
                    </div>

                    <div className="mt-auto flex justify-end self-end">
                        <Link href="/doctor/support/all-messages" className="underline text-[#1E5598] font-bold text-base">View All Messages</Link>
                    </div>
                </CorneredBoxes>
            </main>
        </div>
    );
};

export default SupportPage;
