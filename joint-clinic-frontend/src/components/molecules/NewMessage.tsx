"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";
import TextArea from "@/components/atoms/TextArea";
import ActionButton from "@/components/atoms/ActionButton";

const NewMessage = () => {
    return (
        <div className="w-full bg-white rounded-[30px] border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-5 md:p-6 h-full min-h-[240px]">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <Typography
                        text="Write a New Message"
                        variant="bodyBold"
                        className="text-[#1E8F67] text-lg md:text-xl font-bold"
                    />
                    <Typography
                        text="Doctors usually reply within 48 hours"
                        variant="bodySmall"
                        className="text-gray-400 mt-1 text-xs"
                    />
                </div>
                <ActionButton
                    text="Send"
                    variant="solid"
                    className="w-auto! px-8! h-auto! py-2! text-sm! rounded-full!"
                />
            </div>
            <TextArea
                placeholder=""
                className="w-full h-[140px] rounded-[20px]! resize-none bg-gray-50 border-gray-200 p-4!"
            />
        </div>
    );
};

export default NewMessage;
