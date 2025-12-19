"use client";

import Button from "./Button";


import Typography from "@/components/atoms/Typography";

interface PatientCallRowProps {
    name: string;
    type: string;
    phone: string;
    due: string;
    dueColor?: string;
    completed?: boolean;
    onComplete?: () => void;
}

const PatientCallRow = ({
    name,
    type,
    phone,
    due,
    dueColor = "text-warning", // default orange/red
    completed = false,
    onComplete,
}: PatientCallRowProps) => {
    return (
        <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-[1.5fr_1fr_2fr_auto] items-center rounded-[39px] md:rounded-none md:border-none bg-[#eff6ff] md:bg-transparent md:border-gray-200 last:border-none">
            {/* Cell 1: Name + Type */}
            <div className="py-3 pl-4 border-r border-b md:border-none border-[#9FD5E2]">
                <div className="flex items-center gap-2 font-semibold text-secondary">
                    <span className={`w-3 h-3 rounded-full border text-start mr-[4px] shrink-0
                        ${completed ? "bg-transparent border-secondary" : "bg-secondary"}
                    `}></span>
                    <Typography
                        text={name}
                        variant="subheader"
                        className="text-[#1E5598] font-bold"
                    />
                </div>
                <Typography
                    text={type}
                    variant="bodyRegular"
                    className="text-gray-500 text-sm mt-1"
                />
            </div>

            {/* Cell 2: Due (Status slot) */}
            <div className="py-3 pl-4 border-b md:border-none border-[#9FD5E2]">
                <Typography
                    text={due}
                    variant="bodyBold"
                    className={`${dueColor} font-medium`}
                />
            </div>

            {/* Cell 3: Phone (Date slot) */}
            <div className="py-3 pl-4 border-r md:border-none border-[#9FD5E2]">
                <Typography
                    text={phone}
                    variant="bodyBold"
                    className="text-[#167C4F] font-medium"
                />
            </div>

            {/* Cell 4: Action */}
            <div className="py-3 pl-4 md:p-0 flex md:block md:text-end">
                {completed ? (
                    <Button onClick={onComplete} text="Mark Complete" variant="primary" className="!w-fit !px-4 !py-2 !h-auto !text-sm" />
                ) : (
                    <Button onClick={onComplete} text="Complete" variant="secondary" className="!w-fit !px-4 !py-2 !h-auto !text-sm" />
                )}
            </div>
        </div>
    );
};

export default PatientCallRow;
