"use client";
import React, { useEffect, useState } from "react";
import Typography from "@/components/atoms/Typography";
import ChatInterface from "@/components/organisms/ChatInterface";
import { useChat } from "@/hooks/useChat";
import { createChatRoom } from "@/lib/api/chat.api";
import DoctorDetails from "@/components/molecules/DoctorDetails";
import ActionButton from "@/components/atoms/ActionButton";

const RequestDoctorHelp = () => {
    const { rooms, isLoadingRooms, refreshRooms } = useChat();
    const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string>("");
    const [patientId, setPatientId] = useState<string>("");

    // Hardcoded default doctor for now (simulating assigned doctor)
    const DEFAULT_DOCTOR_ID = "HLC-PRAC-2022-00001";

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedPatientId = localStorage.getItem('patientId');
        if (storedUserId) setUserId(storedUserId);
        if (storedPatientId) setPatientId(storedPatientId);
    }, []);

    useEffect(() => {
        if (rooms.length > 0) {
            // Pick the first active room
            const room = rooms[0];
            setActiveRoomId(room.roomId);
        }
    }, [rooms]);

    const handleStartChat = async () => {
        if (!patientId || !DEFAULT_DOCTOR_ID) return;
        try {
            await createChatRoom({
                patientId,
                doctorId: DEFAULT_DOCTOR_ID,
                metadata: {
                    patientName: localStorage.getItem('patientName') || "Patient",
                    doctorName: "Dr. Smith" // Placeholder
                }
            });
            refreshRooms();
        } catch (error) {
            console.error("Failed to create room:", error);
        }
    };

    return (
        <div className="w-full h-[600px] flex flex-col gap-4">
            <Typography
                text="Contact Your Doctor"
                variant="heading2"
                className="text-[#0D294D] font-bold text-2xl md:text-3xl mb-4"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Chat Area (Takes 2 cols) */}
                <div className="lg:col-span-2 h-full min-h-[400px]">
                    {isLoadingRooms ? (
                        <div className="flex h-full items-center justify-center bg-gray-50 rounded-[30px] border border-gray-200">
                            Loading chat...
                        </div>
                    ) : activeRoomId ? (
                        <ChatInterface roomId={activeRoomId} userId={userId} userType="patient" title="Dr. Smith" />
                    ) : (
                        <div className="flex flex-col h-full items-center justify-center bg-white rounded-[30px] border border-gray-200 p-8 text-center shadow-sm">
                            <Typography text="No active chat found." variant="bodyBold" className="mb-4 text-gray-600" />
                            <ActionButton
                                text="Start Conversation with Doctor"
                                onClick={handleStartChat}
                                variant="solid"
                            />
                        </div>
                    )}
                </div>

                {/* Doctor Details (Takes 1 col) */}
                <div className="lg:col-span-1">
                    <DoctorDetails />
                </div>
            </div>
        </div>
    );
};

export default RequestDoctorHelp;
