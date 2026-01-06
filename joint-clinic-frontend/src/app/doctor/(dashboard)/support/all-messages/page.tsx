"use client";
import React, { useState, useEffect, useMemo } from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import ChatSidebar from "@/components/organisms/ChatSidebar";
import ChatInterface from "@/components/organisms/ChatInterface";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { useChat } from "@/hooks/useChat";

import { useSearchParams } from "next/navigation";

const AllMessagesPage = () => {
    const searchParams = useSearchParams();
    const initialSelectedId = searchParams?.get('id');

    // Fetch rooms from chat hook
    const { rooms, isLoadingRooms } = useChat();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(initialSelectedId);
    const [userId, setUserId] = useState("");

    // Get doctor/user ID for visual "Me" messages
    useEffect(() => {
        const stored = localStorage.getItem('userId') || localStorage.getItem('doctorId');
        if (stored) setUserId(stored);
    }, []);

    // Transform ChatRooms to Sidebar Snippets
    const patientsSnippet = useMemo(() => {
        return rooms.map(room => ({
            id: room.roomId,
            name: room.metadata?.patientName || "Unknown Patient",
            time: new Date(room.updatedAt).toLocaleDateString(), // Simplistic date
            snippet: room.status === 'active' ? 'Active Conversation' : 'Archived',
            active: selectedRoomId === room.roomId,
            dotColor: room.status === 'active' ? "bg-[#1C9A55]" : "bg-gray-400"
        }));
    }, [rooms, selectedRoomId]);

    // Filter
    const filteredPatients = patientsSnippet.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSelectPatient = (id: string | number) => {
        setSelectedRoomId(String(id));
    };

    const handleBackToList = () => {
        setSelectedRoomId(null);
    }

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={true}>
                <Typography text="All Messages" variant="subheader" className="text-[#1c9a55]" />
            </DashBoardHeader>

            <DashBoardContent>
                <div className="w-full h-full grid grid-rows-1 grid-cols-1 md:grid-cols-10 overflow-hidden md:bg-white md:rounded-[24px] md:shadow-sm md:p-8">

                    {/* Sidebar: Visible on desktop, or if no room selected on mobile */}
                    <div className={`${selectedRoomId ? 'hidden md:block' : 'block'} md:col-span-3 h-full border-r border-gray-200 relative overflow-hidden`}>
                        {isLoadingRooms ? (
                            <div className="p-4 text-center text-gray-400">Loading chats...</div>
                        ) : (
                            <ChatSidebar
                                patients={filteredPatients}
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                                onSelectPatient={handleSelectPatient}
                                activePatientId={selectedRoomId}
                                className="w-full h-full"
                            />
                        )}
                    </div>

                    {/* Chat Window: Visible on desktop, or if room IS selected on mobile */}
                    <div className={`${!selectedRoomId ? 'hidden md:block' : 'block'} w-full h-full md:col-span-7 border-l border-gray-200 overflow-hidden flex flex-col`}>
                        {selectedRoomId ? (
                            <div className="flex flex-col h-full">
                                {/* Back button for mobile */}
                                <div className="md:hidden p-4 border-b border-gray-100 flex items-center">
                                    <button onClick={handleBackToList} className="text-[#1E5598] font-bold flex items-center gap-1">
                                        ← Back
                                    </button>
                                </div>

                                <ChatInterface
                                    roomId={selectedRoomId}
                                    userId={userId}
                                    userType="doctor"
                                    title={filteredPatients.find(p => p.id === selectedRoomId)?.name || "Chat"}
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                                <Typography text="Select a conversation to start chatting" variant="bodyBold" className="text-lg" />
                            </div>
                        )}
                    </div>

                </div>
            </DashBoardContent>
        </div>
    );
};

export default AllMessagesPage;
