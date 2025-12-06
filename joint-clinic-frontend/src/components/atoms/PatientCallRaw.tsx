"use client";

import Button from "./button";


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
        <div
            className="
        w-full py-3 px-3
        grid grid-cols-5 items-center text-[18px]
      "
        >
            {/* Left dot + name */}
            <div className="flex items-center gap-2 font-semibold text-secondary">
                <span className={`w-3 h-3 rounded-full border text-start mr-[4px]
            ${completed ? "bg-transparent border-secondary" : "bg-secondary"}
        `}></span>
                <span className="text-[#1E5598] text-[24px] font-medium">{name}</span>
            </div>

            {/* Inquiry Type */}
            <span className="text-[#1E5598] text-[22px] font-medium">{type}</span>

            {/* Phone */}
            <span className="text-[#167C4F] text-[22px] font-medium">{phone}</span>

            {/* Due status */}
            <span className={`text-[${dueColor}] text-center font-medium`}>{due}</span>

            {/* Action button */}

            <div className="text-end">
                {completed ? <Button onClick={onComplete} text="Mark Complete" variant="primary" /> : <Button onClick={onComplete} text="Mark Complete" variant="secondary" />}
            </div>

        </div>
    );
};

export default PatientCallRow;
