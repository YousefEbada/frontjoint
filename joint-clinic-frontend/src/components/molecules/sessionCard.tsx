"use client";

import React from "react";
import Typography from "@/components/atoms/Typography";
import Link from "next/link";

type SessionCardProps = {
    id?: number | string;
    imageSrc: string;
    title: string;
    status?: "Completed" | "Pending" | "In Progress" | "Cancelled" | string;
    minutes?: number;
    noLink?: boolean;
    className?: string;
};

const statusColors: Record<string, string> = {
    Completed: "text-[#1C9A55]",
    Pending: "text-[#F6A500]",
    "In Progress": "text-[#1E5598]",
    Cancelled: "text-[#D84040]",
};

const SessionCard: React.FC<SessionCardProps> = ({
    id,
    imageSrc,
    title,
    status = "Completed",
    minutes,
    className = "",
    noLink = false,
}) => {
    // لو الـ className فيه w- أو h- ما نحطّش المقاس الافتراضي
    const hasCustomWidth = /\bw-/.test(className);
    const hasCustomHeight = /\bh-/.test(className);

    const defaultSize =
        `${hasCustomWidth ? "" : "w-[220px]"} ` +
        `${hasCustomHeight ? "" : "h-[220px]"}`;

    const CardContent = (
        <div
            className={`
        ${defaultSize}
        h-fit
        rounded-[24px]
        shadow-[0_10px_25px_rgba(0,0,0,0.12)]
        p-2
        flex flex-col
        ${className}
        ${id ? "cursor-pointer hover:scale-[1.02] transition-transform duration-200" : ""}
      `}
        >
            {/* الصورة */}
            <div className="rounded-[20px] h-[80%] overflow-hidden w-full">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full  object-cover"
                />
            </div>

            {/* النصوص تحت الصورة */}
            <div className="flex items-center justify-between my-auto px-3 py-2 ">
                <Typography
                    text={title}
                    variant="bodyBold"
                    className="text-[#1E5598] my-auto text-[24px]"
                />
                <Typography
                    text={minutes ? `${minutes} min` : `${status}`}
                    variant="bodyBold"
                    className={`${statusColors[status]} text-[22px]`}
                />
            </div>
        </div>
    );

    if (id && !noLink) {
        return <Link href={`/patient/exercises/${id}`}>{CardContent}</Link>;
    }

    return CardContent;
};

export default SessionCard;
