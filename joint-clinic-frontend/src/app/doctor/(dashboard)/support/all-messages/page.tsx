"use client";
import React, { useState } from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import ChatSidebar from "@/components/organisms/ChatSidebar";
import ChatWindow from "@/components/organisms/ChatWindow";
import DashBoardContent from "@/components/atoms/DashBoardContent";

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

const AllMessagesPage = ({ initialSelectedId }: { initialSelectedId?: number }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(initialSelectedId || null);

    // Filter patients based on search
    const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSelectPatient = (id: number) => {
        setSelectedPatientId(id);
    };

    const handleBackToList = () => {
        setSelectedPatientId(null);
        // If we are on mobile deep-linked chat, we might want to go back to support or just clear selection.
        // For simplicity, clearing selection shows the sidebar on mobile (if we implement that logic).
        // But the requirement says "chat side bar to be not visible in mobile at all".
        // "user will navigate between chat window and support page".
        // So clicking back on mobile chat window should typically go back to history (Support Page).
    }

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={true}>
                <Typography text="All Messages" variant="subheader" className="text-[#1c9a55]" />
            </DashBoardHeader>

            <DashBoardContent>
                {/* 
                  Container: 
                  - Mobile: block relative (shows only one view)
                  - Desktop: Grid layout (3 cols sidebar, 7 cols window)
                */}
                <div className="w-full grid grid-rows-1 grid-cols-1 md:grid-cols-10 overflow-y-auto custom-scrollbar   gap-y-2 md:bg-white md:rounded-[24px] md:shadow-sm md:p-8">

                    {/* Sidebar: 
                        - Mobile: ALWAYS HIDDEN (as per request: "not visible in mobile at all")
                        - Desktop: Visible (3 cols)
                    */}
                    <div className="hidden md:block md:col-span-3 h-full border-r border-gray-200 relative">
                        <ChatSidebar
                            patients={filteredPatients}
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            onSelectPatient={handleSelectPatient}
                            activePatientId={selectedPatientId}
                            className="w-full h-full"
                        />
                    </div>

                    {/* Chat Window: 
                        - Mobile: Visible (Takes full space)
                        - Desktop: Visible (7 cols)
                        - Logic: On mobile, if no patient selected, what shows? User said "sidebar not visible in mobile at all".
                          So mobile ONLY shows chat window. "user will navigate ... then goes to another chat window using message row in support".
                          This implies this page (on mobile) ALWAYS renders a chat window. If ID is null, maybe placeholder?
                          But strictly following request: Mobile shows chat window.
                    */}
                    <div className="w-full h-full md:col-span-7 col-span-1 row-span-1">
                        <ChatWindow
                            messages={chatMessages}
                            patientName={patients.find(p => p.id === selectedPatientId)?.name || "Patient"}
                            messageInput={messageInput}
                            onInputChange={setMessageInput}
                            onBack={handleBackToList} // On mobile this connects to "Back" button in header
                            className="w-full"
                        />
                    </div>

                </div>
            </DashBoardContent>
        </div>
    );
};

export default AllMessagesPage;
