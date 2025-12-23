import React from "react";

interface ChatBubbleProps {
    text: string;
    type: "sent" | "received";
}

const ChatBubble = ({ text, type }: ChatBubbleProps) => {
    return (
        <div
            className={`max-w-[70%] px-6 py-4 rounded-3xl ${type === "sent"
                ? "bg-[#1E5598] text-white self-end rounded-br-none"
                : "bg-[#F2F2F2] text-[#0D294D] self-start rounded-bl-none"
                }`}
        >
            <p className="text-sm md:text-base leading-relaxed">{text}</p>
        </div>
    );
};

export default ChatBubble;
