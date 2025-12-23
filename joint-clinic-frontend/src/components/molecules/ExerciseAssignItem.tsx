"use client";
import React from "react";
import Button from "@/components/atoms/Button";
import ActionButton from "../atoms/ActionButton";

interface ExerciseAssignItemProps {
    name: string;
    injury: string;
    due: string;
    dueColor?: string;
    onAssign?: () => void;
    isRead?: boolean;
}

import Typography from "@/components/atoms/Typography";

const ExerciseAssignItem = ({ name, injury, due, dueColor = "text-[#EE3124]", onAssign, isRead = false }: ExerciseAssignItemProps) => {
    return (
        <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-4 items-center rounded-[39px] md:rounded-none bg-[#eff6ff] md:bg-transparent md:border-b md:border-gray-200 last:border-none">
            {/* Name + Status Dot */}
            <div className="py-3 pl-4 border-r border-b md:border-none border-[#9FD5E2] flex items-center justify-start gap-2">
                <div
                    className={`hidden md:block w-1.5 h-1.5 rounded-full ${isRead ? "border border-gray-400 bg-white" : "bg-[#0D294D]"}`}
                ></div>
                <Typography text={name} variant="bodyBold" className="text-[#1E5598] text-lg" />
            </div>

            {/* Injury */}
            <div className="py-3 pl-4 border-b md:border-none border-[#9FD5E2] flex items-center justify-start md:justify-center">
                <Typography text={injury} variant="bodyBold" className="text-[#1E5598] text-center" />
            </div>

            {/* Due Date */}
            <div className="py-3 pl-4 border-r md:border-none border-[#9FD5E2] flex items-center justify-start md:justify-center">
                <Typography text={due} variant="bodyBold" className={`${dueColor} text-center`} />
            </div>

            {/* Assign Action */}
            <div className="hidden py-3 pl-4 md:p-0 md:flex items-center justify-center md:justify-end">
                <ActionButton
                    text="Assign"
                    variant="solid"
                    onClick={onAssign}
                />
            </div>
            <div className="py-3 pl-4 md:p-0 flex items-center justify-start md:hidden">
                <Typography text="Assign Now" variant="bodyBold" className="text-[#167C4F] text-center underline" />
            </div>

        </div>
    );
};

export default ExerciseAssignItem;
