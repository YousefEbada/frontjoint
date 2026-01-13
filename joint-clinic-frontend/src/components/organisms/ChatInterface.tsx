"use client";
import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import Typography from "@/components/atoms/Typography";
import ActionButton from "@/components/atoms/ActionButton";
import { color } from "@/lib/constants/colors";

interface ChatInterfaceProps {
    roomId: string;
    userId: string; // To determine 'my' messages
    userType?: 'patient' | 'doctor';
    title?: string;
}

const ChatInterface = ({ roomId, userId, title = "Chat" }: ChatInterfaceProps) => {
    const { messages, sendMessage, isLoadingMessages } = useChat(roomId);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!inputText.trim()) return;
        await sendMessage(inputText);
        setInputText("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <Typography text={title} variant="bodyBold" className="text-[#0D294D] text-lg" />
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white custom-scrollbar">
                {isLoadingMessages && messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-400">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-300">No messages yet. Say hello!</div>
                ) : (
                    messages.map((msg) => {
                        const isMe = msg.senderId === userId;
                        return (
                            <div key={msg._id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] md:max-w-[60%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                                    <div
                                        className={`px-4 py-3 rounded-2xl text-sm md:text-base ${isMe
                                                ? "bg-[#1E5598] text-white rounded-br-none"
                                                : "bg-gray-100 text-gray-800 rounded-bl-none"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2 items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-[#1E5598] transition-colors">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputText.trim()}
                        className={`p-2 rounded-full transition-colors ${inputText.trim() ? "bg-[#1E5598] text-white hover:bg-[#15467e]" : "bg-gray-200 text-gray-400"}`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
