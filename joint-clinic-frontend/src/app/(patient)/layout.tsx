import React from "react";
import { color } from "@/lib/constants/colors";
import SideBar from "@/components/organisms/SideBar/SideBar";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import Profile from "@/components/atoms/icons/Profile";
import Calendar from "@/components/atoms/icons/Calendar";
import Report from "@/components/atoms/icons/Report";
import Support from "@/components/atoms/icons/Support";
import Exercise from "@/components/atoms/icons/Exercise";
import Faqs from "@/components/atoms/icons/Faqs";

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const navItems = [
        { href: "/dashboard/main", icon: Profile, title: "Dashboard" },
        { href: "/dashboard/booking", icon: Calendar, title: "Booking" },
        { href: "/dashboard/exercises", icon: Exercise, title: "Exercises" },
        { href: "/dashboard/reports", icon: Report, title: "Medical Reports" },
        { href: "/dashboard/faqs", icon: Faqs, title: "FAQs" },
        { href: "/dashboard/support", icon: Support, title: "Support" },
    ];
    return (
        <section
            className="min-h-screen min-w-screen p-4 sm:p-8 md:p-12 md:pl-16 pb-24 md:pb-12"
            style={{
                background: color.primary
            }}
        >
            <SideBar navItems={navItems} />
            <CorneredBoxes type="shadowBox" className="relative w-full h-[calc(100vh-140px)] md:h-[88.2vh] p-6 sm:p-8 md:p-12 md:pl-28">
                {children}
            </CorneredBoxes>

        </section>
    );
}
