"use client";
import React from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import Link from "next/link";
import MessageRow from "@/components/molecules/MessageRow";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { useChat } from "@/hooks/useChat";

const SupportPage = () => {
    // Fetch rooms (only rooms, no active chat yet)
    const { rooms, isLoadingRooms } = useChat();

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false} />

            <DashBoardContent>
                <div className="flex flex-col gap-2 mb-6">
                    <Typography text="Patient Communication" variant="heading2" gradient={true} className="font-bold text-3xl" />
                    <Typography text="Select a conversation to start chatting" variant="bodyRegular" className="text-gray-400" />
                </div>

                <CorneredBoxes type="shadowBox" className="w-full h-full bg-white p-4 md:p-8 rounded-[30px] flex flex-col relative">
                    <Typography text="All Messages" variant="subheader" className="text-[#167C4F] font-bold mb-8 self-start" />

                    <div className="w-full h-full overflow-y-auto custom-scrollbar flex flex-col gap-y-2 md:gap-y-0">
                        {isLoadingRooms ? (
                            <div className="text-center py-10 text-gray-400">Loading conversations...</div>
                        ) : rooms.length > 0 ? (
                            rooms.map((room) => (
                                <MessageRow
                                    key={room._id}
                                    id={room.roomId} // Pass roomId as ID for the link
                                    name={room.metadata?.patientName || "Unknown Patient"}
                                    status={room.status === "active" ? "Active" : "Archived"}
                                    statusColor={room.status === "active" ? "text-[#1C9A55]" : "text-gray-400"}
                                    dotColor={room.status === "active" ? "bg-[#1C9A55]" : "bg-gray-400"}
                                    title={`Booking ID: ${room.metadata?.bookingId || "N/A"}`}
                                    context={room.status}
                                    time={new Date(room.updatedAt).toLocaleDateString()}
                                />
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-400">No conversations found.</div>
                        )}
                    </div>
                </CorneredBoxes>
            </DashBoardContent>
        </div>
    );
};

export default SupportPage;
