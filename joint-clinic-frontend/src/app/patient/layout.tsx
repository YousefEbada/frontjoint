import React from "react";
import { color } from "@/lib/constants/colors";
import SideBar from "@/components/organisms/SideBar/SideBar";
import DashboardContentWrapper from "@/components/templates/DashboardContentWrapper";
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
        { href: "/patient/main", icon: Profile, title: "Dashboard" },
        { href: "/patient/booking", icon: Calendar, title: "Booking" },
        { href: "/patient/exercises", icon: Exercise, title: "Exercises" },
        { href: "/patient/reports", icon: Report, title: "Medical Reports" },
        { href: "/patient/faqs", icon: Faqs, title: "FAQs" },
        { href: "/patient/support", icon: Support, title: "Support" },
    ];
    return (
        <section
            className="min-h-screen w-full p-4 sm:p-8 md:p-12 md:pl-16 pb-24 md:pb-12"
            style={{
                background: color.primary
            }}
        >
            <SideBar navItems={navItems} />
            <DashboardContentWrapper>
                {children}
            </DashboardContentWrapper>

        </section>
    );
}
