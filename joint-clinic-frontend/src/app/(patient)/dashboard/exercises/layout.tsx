"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Typography from "@/components/atoms/Typography";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { mockDashboardData as data } from "@/lib/data/dashboardData";

export default function ExercisesLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const tabs = [
        { name: "Assigned Exercises", href: "/dashboard/exercises/assigned" },
        { name: "Find Exercises", href: "/dashboard/exercises/find" },
        { name: "My Progress", href: "/dashboard/exercises/progress" },
    ];

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName={data.therapyName} nav={false}>
                <div className="flex gap-4 md:gap-8 overflow-x-auto w-full md:w-auto pb-0 hide-scrollbar items-center">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href;
                        return (
                            <Link key={tab.name} href={tab.href} className="whitespace-nowrap">
                                <Typography
                                    text={tab.name}
                                    variant="bodyBold"
                                    className={`text-[16px] md:text-[18px] transition-colors duration-200 ${isActive ? "text-[#1E5598]" : "text-[#B3B3B3] hover:text-[#1E5598]"
                                        }`}
                                />
                            </Link>
                        );
                    })}
                </div>
            </DashBoardHeader>

            <div className="flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    );
}
