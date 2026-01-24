"use client";
import React from "react";
import { color } from "@/lib/constants/colors";
import SideBar from "@/components/organisms/SideBar/SideBar";
import DashboardContentWrapper from "@/components/templates/DashboardContentWrapper";
import Profile from "@/components/atoms/icons/Profile";
import Calendar from "@/components/atoms/icons/Calendar";
import Exercise from "@/components/atoms/icons/Exercise";
import AiAssistant from "@/components/atoms/icons/AiAssistant";
import Patients from "@/components/atoms/icons/Patients";
import Support from "@/components/atoms/icons/Support";
import Report from "@/components/atoms/icons/Report";

export default function DoctorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const navItems = [
        { href: "/doctor/overview", icon: Profile, title: "Overview" },
        { href: "/doctor/calendar", icon: Calendar, title: "Calendar" },
        { href: "/doctor/patients?status=active", icon: Patients, title: "Patients" },
        { href: "/doctor/exercises", icon: Exercise, title: "Exercises" },
        { href: "/doctor/reports", icon: Report, title: "Medical Reports" },
        { href: "/doctor/ai-assistant", icon: AiAssistant, title: "AI Assistant" },
        { href: "/doctor/support", icon: Support, title: "Support" },
    ];

    return (
        <section
            className="min-h-screen w-full p-4 sm:p-8 md:p-12 md:pl-16 pb-24 md:pb-12"
            style={{
                background: color.primary
            }}
        >
            <SideBar navItems={navItems} /> {/* Need to verify if SideBar accepts base path or handles routing relative to navItems */}
            <DashboardContentWrapper>
                {children}
            </DashboardContentWrapper>
        </section>
    );
}
