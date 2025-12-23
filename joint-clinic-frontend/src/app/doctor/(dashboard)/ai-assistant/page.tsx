"use client";
import React, { useState, useRef, useEffect } from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import Paperclip from "@/components/atoms/icons/Paperclip";
import Send from "@/components/atoms/icons/Send";
import AiAssistant from "@/components/atoms/icons/AiAssistant";
import ScrollableArea from "@/components/atoms/ScrollableArea";
import Profile from "@/components/atoms/icons/Profile";

interface Message {
    id: number;
    type: "user" | "ai";
    text: string;
}

const AiAssistantPage = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, type: "user", text: "Summarize Patient History" },
        {
            id: 2,
            type: "ai",
            text: "Sure, I can help you with that!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.\n\nconsectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales."
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = () => {
        if (!input.trim()) return;

        const newUserMsg: Message = { id: Date.now(), type: "user", text: input };
        setMessages(prev => [...prev, newUserMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const newAiMsg: Message = {
                id: Date.now() + 1,
                type: "ai",
                text: "This is a simulated AI response. In a real application, this would be connected to an LLM endpoint to answer your query about '" + input + "'."
            };
            setMessages(prev => [...prev, newAiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false} />

            <main className="w-full flex-1 h-[95%] flex flex-col gap-6 p-1 overflow-hidden">
                <Typography text="Doctor Assistant" variant="heading2" className="text-[#0D294D] font-bold text-3xl" />

                <CorneredBoxes type="shadowBox" className="w-full h-full bg-white rounded-[30px] flex flex-col p-6 md:p-10 relative overflow-hidden">

                    {/* Chat Area using ScrollableArea */}
                    <ScrollableArea className="flex-1 flex flex-col gap-8 pr-2 pb-4">
                        {messages.map((msg) => (
                            msg.type === "user" ? (
                                // User Query Style
                                <div key={msg.id} className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="w-10 h-10 rounded-full bg-[#9FD5E2] flex items-center justify-center shrink-0">
                                        <Profile fill="#ffffff" className="w-6 h-6 text-white" />
                                    </div>
                                    <Typography text={msg.text} variant="bodyRegular" className="text-[#9CA3AF] text-lg font-medium" />
                                </div>
                            ) : (
                                // AI Response Style
                                <div key={msg.id} className="flex gap-4 items-start w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div className="shrink-0 pt-1">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1E5598]">
                                            <AiAssistant className="w-6 h-6 text-white text-[#9FD5E2]" fill="#ffffff" />
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-[20px] shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-8 w-full border border-gray-100">
                                        <div className="text-[#1E5598] leading-relaxed space-y-4 text-base md:text-lg whitespace-pre-line">
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}

                        {isTyping && (
                            <div className="flex gap-4 items-start w-full animate-pulse">
                                <div className="shrink-0 pt-1">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1E5598]">
                                        <AiAssistant className="w-6 h-6 text-white text-[#9FD5E2]" fill="#ffffff" />
                                    </div>
                                </div>
                                <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-100 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#9FD5E2] rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-[#9FD5E2] rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-[#9FD5E2] rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        )}
                        <div ref={scrollEndRef} />
                    </ScrollableArea>

                    {/* Input Area */}
                    <div className="h-20 border-t border-[#9FD5E2] flex items-center gap-4 w-full shrink-0 mt-4">
                        <input
                            type="text"
                            placeholder="Write a message"
                            className="flex-1 h-full text-[#9CA3AF] placeholder-[#9CA3AF] outline-none text-lg bg-transparent"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button className="text-[#1E5598] hover:text-[#15467e] p-2 transition-colors">
                            <Paperclip className="w-6 h-6 rotate-45" />
                        </button>
                        <button
                            onClick={handleSendMessage}
                            className="text-[#1E5598] hover:text-[#15467e] p-2 transition-colors disabled:opacity-50"
                            disabled={!input.trim()}
                        >
                            <Send className="w-6 h-6" />
                        </button>
                    </div>

                </CorneredBoxes>
            </main>
        </div>
    );
};

export default AiAssistantPage;
