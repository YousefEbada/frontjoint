"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";

interface MessagePreview {
    id: string;
    sender: "Doctor" | "System";
    text: string;
    time: string;
    isUnread: boolean;
    readTime?: string;
}

const PreviousMessages = () => {
    // Mock data - in a real app this would come from props or an API
    const messages: MessagePreview[] = [
        {
            id: "1",
            sender: "Doctor",
            text: "Unread Message by Doctor",
            time: "1d Ago",
            isUnread: true
        },
        {
            id: "2",
            sender: "Doctor",
            text: "Read 5 weeks ago",
            time: "5w Ago",
            isUnread: false,
            readTime: "Read 5 weeks ago"
        }
    ];

    return (
        <div className="w-full bg-white rounded-[30px] border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-5 md:p-6 flex flex-col justify-between h-full min-h-[240px]">
            <div>
                <Typography
                    text="Previous Messages"
                    variant="bodyBold"
                    className="text-[#1E8F67] text-xl mb-6 font-bold"
                />
                <div className="flex flex-col gap-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${msg.isUnread ? "bg-red-500" : "bg-gray-400"}`}></div>
                                <Typography
                                    text={msg.readTime || msg.text}
                                    variant="bodyRegular"
                                    className="text-[#1E5598] font-medium"
                                />
                            </div>
                            <Typography text={msg.time} variant="bodyRegular" className="text-[#1E5598] font-medium" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center mt-4">
                {/* Assuming the first message ID leads to the thread or a general inbox */}
                <a href={`/patient/support/message/1`} className="text-[#1E5598] underline cursor-pointer font-medium hover:text-[#15467e]">
                    View all Messages
                </a>
            </div>
        </div>
    );
};

export default PreviousMessages;
