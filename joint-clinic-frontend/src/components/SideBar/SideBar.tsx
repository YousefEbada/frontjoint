"use client";
import { useState } from "react";
import Profile from "@components/icons/Profile";
import Logo from "@components/icons/Logo";
import Calendar from "@components/icons/Calendar";
import Exercise from "@components/icons/Exercise";
import Report from "@components/icons/Report";
import Support from "@components/icons/Support";
import Faqs from "@components/icons/Faqs";
import { color } from "@/lib/constants/colors";
import clsx from "clsx";
import DashBoardLink from "@/components/SideBar/DashBoardLink";

const SideBar = () => {
    const [isHovered, setHovered] = useState(false);

    const navItems = [
        { href: "/dashboard/main", icon: Profile, title: "Dashboard" },
        { href: "/dashboard/booking", icon: Calendar, title: "Booking" },
        { href: "/dashboard/exercises", icon: Exercise, title: "Exercises" },
        { href: "/dashboard/reports", icon: Report, title: "Medical Reports" },
        { href: "/dashboard/faqs", icon: Faqs, title: "FAQs" },
        { href: "/dashboard/support", icon: Support, title: "Support" },
    ];

    return (
        <aside
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={clsx(
                // Base layout (Fixed for both, z-index high)
                "fixed transition-all duration-500 ease-in-out z-[1000000] bg-white shadow-[10px_10px_11.2px_3px_rgba(0,0,0,0.25)]",

                // Mobile: Bottom Navigation
                "bottom-0 left-0 w-full h-[80px] flex flex-row items-center justify-around rounded-t-[30px] px-2",

                // Desktop: Sidebar
                "md:absolute md:flex md:flex-col md:items-start md:justify-between",
                "md:top-[110px] md:left-[48px] md:h-[75vh]",
                "md:rounded-[48px] md:py-[31px] md:px-[32px] md:gap-[10px]",
                "md:overflow-hidden", // Ensure content doesn't overflow during transition

                // Desktop Width Animation (Fit Text)
                "md:min-w-[100px]",
                isHovered ? "md:max-w-[300px]" : "md:max-w-[100px]"
            )}
        >
            {/* Logo - Hidden on Mobile */}
            <div
                className={clsx(
                    "hidden md:block transition-all duration-500 ease-in-out w-full",
                    isHovered
                        ? "self-end pr-[4px] sm:pr-[6px] md:pr-[8px] pt-[4px]"
                        : "self-center"
                )}
            >
                <div className={clsx("flex", isHovered ? "justify-end" : "justify-center")}>
                    <Logo
                        fill={color.accent}
                        style={{
                            transition: "width 0.4s ease-in-out",
                        }}
                        className="w-[40px] sm:w-[60px] md:w-[70px]"
                    />
                </div>
            </div>

            {/* Links Container */}
            <div
                className={clsx(
                    "flex w-full transition-all duration-500 ease-in-out",
                    // Mobile: Row, centered
                    "flex-row justify-around items-center h-full gap-0",
                    // Desktop: Col
                    "md:flex-col md:justify-center md:h-[75%] md:gap-[16px] xl:gap-[20px] 2xl:gap-[24px]",
                    "md:items-start" // Always align start for stability
                )}
            >
                {navItems.map((item, i) => (
                    <DashBoardLink
                        key={i}
                        linkHref={item.href}
                        Icon={item.icon}
                        title={item.title}
                        expanded={isHovered}
                        mobileIconOnly={true}
                    />
                ))}
            </div>
        </aside>
    );
};

export default SideBar;
