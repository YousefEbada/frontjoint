"use client";
import React from "react";
import { usePathname } from "next/navigation";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";

interface DashboardContentWrapperProps {
    children: React.ReactNode;
}

const DashboardContentWrapper: React.FC<DashboardContentWrapperProps> = ({ children }) => {
    const pathname = usePathname();
    const isFaqPage = pathname === "/patient/faqs";

    if (isFaqPage) {
        return (
            <div className="relative w-full h-full p-6 sm:p-8 md:p-12 md:pl-28 bg-white rounded-[55px] shadow-[10px_10px_11.2px_3px_rgba(0,0,0,0.25)] overflow-hidden">
                {children}
            </div>
        );
    }

    return (
        <CorneredBoxes type="shadowBox" className="relative w-full h-[calc(100vh-140px)] md:h-[88.2vh] p-6 sm:p-8 md:p-12 md:pl-28">
            {children}
        </CorneredBoxes>
    );
};

export default DashboardContentWrapper;
