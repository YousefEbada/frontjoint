"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import ChatBubble from "@/components/molecules/ChatBubble";
import Paperclip from "@/components/atoms/icons/Paperclip";
import Send from "@/components/atoms/icons/Send";
import ScrollableArea from "@/components/atoms/ScrollableArea";

const PatientChatPage = ({ params }: { params: { id: string } }) => {
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, type: "received" as const, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi." },
        { id: 2, type: "sent" as const, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris." },
    ]);

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;
        setMessages([...messages, { id: Date.now(), type: "sent", text: messageInput }]);
        setMessageInput("");
    };

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="Shoulder Therapy">
                <div className="flex gap-8 cursor-pointer">
                    <Link href="/patient/support">
                        <Typography
                            text="Request call"
                            variant="bodyRegular"
                            className="font-medium text-[#9CA3AF] hover:text-[#1E5598] transition-colors"
                        />
                    </Link>
                    <Link href="/patient/support">
                        <Typography
                            text="Request doctor help"
                            variant="bodyRegular"
                            className="font-medium text-[#1E5598]"
                        />
                    </Link>
                </div>
            </DashBoardHeader>

            <main className="w-full h-full flex-1 p-4 md:p-8 overflow-hidden">
                <div className="w-full h-full bg-white rounded-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-200 flex flex-col overflow-hidden">
                    {/* Chat Header */}
                    <div className="h-fit py-5 px-6 md:px-8 border-b border-gray-100 flex justify-between items-center shrink-0">
                        <Typography text="Doctor Name" variant="heading2" className="text-[#1E5598] font-bold text-xl md:text-2xl" />
                        <Link href="/patient/support" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </Link>
                    </div>

                    {/* Chat Area */}
                    <ScrollableArea className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 ">
                        {/* Doctor Avatar - Optional/Mock for received messages? 
                             The design just shows bubbles. I'll stick to bubbles. 
                         */}
                        {messages.map((msg) => (
                            <ChatBubble key={msg.id} text={msg.text} type={msg.type} />
                        ))}
                    </ScrollableArea>

                    {/* Input Area */}
                    <div className="h-24 border-t border-[#E5E7EB] px-6 md:px-8 flex items-center gap-4 shrink-0 bg-white">
                        <input
                            type="text"
                            placeholder="Write a message"
                            className="flex-1 h-full text-[#0D294D] placeholder-gray-400 outline-none text-lg bg-transparent font-medium"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <button className="text-[#1E5598] hover:text-[#15467e] p-2 transition-colors">
                            <Paperclip className="w-6 h-6 rotate-45" />
                        </button>
                        <button
                            onClick={handleSendMessage}
                            className="text-[#1E5598] hover:text-[#15467e] p-2 transition-colors"
                        >
                            <Send className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PatientChatPage;
