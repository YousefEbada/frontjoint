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
        w-full
        ${className}
        ${id ? "cursor-pointer hover:scale-[1.02] transition-transform duration-200" : ""}
      `}
        >
            {/* الصورة */}
            <div className="rounded-[20px] overflow-hidden w-full aspect-video md:aspect-[4/3] relative">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* النصوص تحت الصورة */}
            <div className="flex items-center justify-between mt-auto px-2 py-3 gap-2">
                <Typography
                    text={title}
                    variant="bodyBold"
                    className="text-[#1E5598] text-[16px] md:text-[22px] leading-tight"
                />
                <Typography
                    text={minutes ? `${minutes} min` : `${status}`}
                    variant="bodyBold"
                    className={`${statusColors[status]} text-[14px] md:text-[20px] whitespace-nowrap`}
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
