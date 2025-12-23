"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

interface BackLinkProps {
    href: string;
    text?: string;
    className?: string;
}

const BackLink: React.FC<BackLinkProps> = ({ href, text = "Back", className = "" }) => {
    return (
        <Link href={href} className={`flex items-center gap-2 text-[#1E5598] font-bold text-[18px] hover:underline ${className}`}>
            <FontAwesomeIcon icon={faCaretLeft} />
            <span>{text}</span>
        </Link>
    );
};

export default BackLink;
