import React from "react";
import { color } from "@/lib/constants/colors";
import SideBar from "@/components/SideBar/SideBar";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import Profile from "@/components/icons/Profile";
import Calendar from "@/components/icons/Calendar";
import Clients from "@/components/icons/clients";
import Exercise from "@/components/icons/Exercise";
import WebContent from "@/components/icons/webContent";

export default function StaffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const navItems = [
        { href: "/audit/main", icon: Profile, title: "Dashboard" },
        { href: "/audit/exercises", icon: Exercise, title: "Exercises" },
        { href: "/audit/roles", icon: Clients, title: "Roles"},
        { href: "/audit/webContent", icon: WebContent, title: "Web Content" },        
    ];
    return (
        <section
            className="min-h-screen min-w-screen p-4 sm:p-8 md:p-12 md:pl-16 pb-24 md:pb-12"
            style={{
                background: color.primary
            }}
        >
            <SideBar navItems={navItems}/>
            <CorneredBoxes type="shadowBox" className="relative w-full h-[calc(100vh-140px)] md:h-[88.2vh] p-6 sm:p-8 md:p-12 md:pl-28">
                {children}
            </CorneredBoxes>

        </section>
    );
}
