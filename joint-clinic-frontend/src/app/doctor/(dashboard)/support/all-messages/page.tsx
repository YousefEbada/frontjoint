"use client";
import React, { useState } from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import ChatSidebar from "@/components/organisms/ChatSidebar";
import ChatWindow from "@/components/organisms/ChatWindow";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { useDoctorPatients } from "@/hooks/useDoctor";



const AllMessagesPage = ({ initialSelectedId }: { initialSelectedId?: number }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(initialSelectedId || null);

    // TODO: Replace with actual logged-in doctor ID
    const doctorId = "HLC-PRAC-2022-00001";

    const { data: realPatients, isLoading } = useDoctorPatients(doctorId);

    // Transform backend patient data to ChatSidebar expected format
    const patients = realPatients?.map((p, i) => ({
        id: i + 1, // Using index-based ID to match local state types if number is expected. Ideally refactor to string ID.
        realId: p._id, // Store real ID
        name: p.fullName,
        time: "1d Ago",
        snippet: `Latest update on ${p.condition || 'condition'}`,
        active: selectedPatientId === (i + 1),
        // Mock status
        status: i % 2 === 0 ? "Unread" : "Read",
        dotColor: i % 2 === 0 ? "bg-[#EE3124]" : "bg-[#1C9A55]"
    })) || [];


    // Filter patients based on search
    const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSelectPatient = (id: number) => {
        setSelectedPatientId(id);
    };

    const handleBackToList = () => {
        setSelectedPatientId(null);
    }

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={true}>
                <Typography text="All Messages" variant="subheader" className="text-[#1c9a55]" />
            </DashBoardHeader>

            <DashBoardContent>
                <div className="w-full grid grid-rows-1 grid-cols-1 md:grid-cols-10 overflow-y-auto custom-scrollbar   gap-y-2 md:bg-white md:rounded-[24px] md:shadow-sm md:p-8">

                    <div className="hidden md:block md:col-span-3 h-full border-r border-gray-200 relative">
                        {isLoading ? (
                            <div className="p-4 text-center text-gray-400">Loading chats...</div>
                        ) : (
                            <ChatSidebar
                                patients={filteredPatients}
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                                onSelectPatient={handleSelectPatient}
                                activePatientId={selectedPatientId}
                                className="w-full h-full"
                            />
                        )}
                    </div>

                    <div className="w-full h-full md:col-span-7 col-span-1 row-span-1 border-l border-gray-200">
                        {selectedPatientId ? (
                            <ChatWindow
                                messages={[]} // Real chat messages would be fetched here
                                patientName={patients.find(p => p.id === selectedPatientId)?.name || "Patient"}
                                messageInput={messageInput}
                                onInputChange={setMessageInput}
                                onBack={handleBackToList}
                                className="w-full"
                            />
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
