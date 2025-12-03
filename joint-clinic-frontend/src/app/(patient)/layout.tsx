import React from "react";
import { color } from "@/lib/constants/colors";
import SideBar from "@/components/SideBar/SideBar";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section
            className="min-h-screen min-w-screen p-4 sm:p-8 md:p-12 md:pl-16 pb-24 md:pb-12"
            style={{
                background: color.primary
            }}
        >
            <SideBar />
            <CorneredBoxes type="shadowBox" className="relative w-full h-[calc(100vh-140px)] md:h-[88.2vh] p-6 sm:p-8 md:p-12 md:pl-28">
                {children}
            </CorneredBoxes>

        </section>
    );
}
