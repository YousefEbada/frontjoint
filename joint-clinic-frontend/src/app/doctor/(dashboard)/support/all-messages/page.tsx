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

            <main className="w-full h-full flex-1 flex flex-col gap-6 p-1 overflow-hidden">
                <CorneredBoxes type="shadowBox" className="w-full h-full bg-white rounded-[30px] relative overflow-hidden text-left">

                    {/* Sidebar: Drawer behavior in all screens */}
                    <ChatSidebar
                        patients={filteredPatients}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onSelectPatient={handleSelectPatient}
                        activePatientId={selectedPatientId}
                        className={`absolute inset-0 w-full h-full bg-white z-10 transition-transform duration-300
                            ${selectedPatientId !== null ? '-translate-x-full' : 'translate-x-0'}
                        `}
                    />

                    {/* Chat Window: Slides in when patient selected */}
                    <ChatWindow
                        messages={chatMessages}
                        patientName={patients.find(p => p.id === selectedPatientId)?.name || "Select a Patient"}
                        messageInput={messageInput}
                        onInputChange={setMessageInput}
                        onBack={handleBackToList}
                        className={`absolute inset-0 w-full h-full bg-white z-20 transition-transform duration-300
                             ${selectedPatientId !== null ? 'translate-x-0' : 'translate-x-full'}
                        `}
                    />

                </CorneredBoxes>
            </main>
        </div>
    );
};

export default AllMessagesPage;
