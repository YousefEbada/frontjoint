import React from "react";
import Typography from "@/components/atoms/Typography";
import Link from "next/link";
import Paperclip from "@/components/atoms/icons/Paperclip";
import Send from "@/components/atoms/icons/Send";
import ChatBubble from "@/components/molecules/ChatBubble";
import ScrollableArea from "../atoms/ScrollableArea";

interface Message {
    id: number;
    type: "sent" | "received";
    text: string;
}

interface ChatWindowProps {
    messages: Message[];
    patientName: string;
    messageInput: string;
    onInputChange: (value: string) => void;
    onBack: () => void;
    className?: string;
}

const ChatWindow = ({ messages, patientName, messageInput, onInputChange, onBack, className = "" }: ChatWindowProps) => {
    return (
        <div className={`flex flex-col h-full bg-white relative ${className}`}>
            {/* Chat Header */}
            <div className="h-fit border-b py-4 border-gray-200 flex justify-between items-center px-4 md:px-8 shrink-0">
                <div className="flex items-center gap-4">
                    {/* Back Button for Mobile */}
                    <button onClick={onBack} className="md:hidden text-[#1E5598] font-bold">
                        &larr; Back
                    </button>
                    <Typography text={patientName} variant="heading2" className="text-[#1E5598] font-bold text-xl md:text-2xl" />
                </div>
                <Link href="#" className="underline text-[#1C9A55] font-bold text-sm md:text-base hover:text-[#156a43]">
                    Patient Details
                </Link>
            </div>

            {/* Messages Area */}
            <ScrollableArea className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 bg-white">
                {messages.map((msg) => (
                    <ChatBubble key={msg.id} text={msg.text} type={msg.type} />
                ))}
            </ScrollableArea>

            {/* Input Area */}
            <div className="h-24 border-t border-[#9FD5E2] px-4 md:px-8 flex items-center gap-4 shrink-0">
                <input
                    type="text"
                    placeholder="Write a message"
                    className="flex-1 h-full text-[#9CA3AF] placeholder-[#9CA3AF] outline-none text-lg bg-transparent"
                    value={messageInput}
                    onChange={(e) => onInputChange(e.target.value)}
                />
                <button className="text-[#1E5598] hover:text-[#15467e] p-2 transition-colors">
                    <Paperclip className="w-6 h-6 rotate-45" />
                </button>
                <button className="text-[#1E5598] hover:text-[#15467e] p-2 transition-colors">
                    <Send className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
