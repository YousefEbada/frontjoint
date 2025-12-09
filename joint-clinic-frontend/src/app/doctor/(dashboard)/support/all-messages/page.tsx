"use client";
import React, { useState } from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import ChatSidebar from "@/components/organisms/ChatSidebar";
import ChatWindow from "@/components/organisms/ChatWindow";

// Mock Data
const patients = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Patient ${i + 1}`,
    time: "1d Ago",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    active: i === 0,
    status: i % 2 === 0 ? "Unread" : "Read",
    dotColor: i % 2 === 0 ? "bg-[#EE3124]" : "bg-[#1C9A55]"
}));

const chatMessages = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    type: i % 2 === 0 ? "received" : "sent" as "received" | "sent",
    text: i % 2 === 0
        ? "Hello Doctor, I have a question about my exercises."
        : "Sure, please verify what is your issue?"
}));

const AllMessagesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

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

            <main className="w-full flex-1 h-[95%] flex flex-col gap-6 p-1 overflow-hidden">
                <CorneredBoxes type="shadowBox" className="w-full h-full bg-white rounded-[30px] grid grid-cols-3 overflow-hidden relative items-stretch justify-items-stretch text-left">

                    {/* Sidebar: 
                        - Mobile: Hidden if patient selected
                        - Desktop: Always visible (w-1/3)
                    */}
                    <ChatSidebar
                        patients={filteredPatients}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onSelectPatient={handleSelectPatient}
                        activePatientId={selectedPatientId}
                        className={`w-full min-w-[300px] border-r border-gray-200 transition-all duration-300 md:relative bg-white z-10
                            ${selectedPatientId !== null ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
                        `}
                    />

                    {/* Chat Window:
                        - Mobile: Visible if patient selected (slide in or just replace)
                        - Desktop: Always visible (flex-1)
                    */}
                    <ChatWindow
                        messages={chatMessages}
                        patientName={patients.find(p => p.id === selectedPatientId)?.name || "Select a Patient"}
                        messageInput={messageInput}
                        onInputChange={setMessageInput}
                        onBack={handleBackToList}
                        className={`w-full md:flex-1 md:relative bg-white z-20 col-span-2 transition-all duration-300
                             ${selectedPatientId !== null ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
                        `}
                    />

                    {/* Desktop Empty State (Optional, but here we just show ChatWindow by default for design match or empty) 
                        For now, the logic above keeps ChatWindow visible on Desktop even if null, but maybe we want an empty state?
                        Design image shows a pre-selected chat. We can default to first patient or just show empty.
                        The logic above: 
                        - Desktop: Sidebar is static. ChatWindow is static. 
                        - Mobile: Sidebar slides out, ChatWindow slides in.
                    */}

                </CorneredBoxes>
            </main>
        </div>
    );
};

export default AllMessagesPage;
