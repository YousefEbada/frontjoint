"use client";
import { useState } from "react";
import Logo from "@/components/atoms/icons/Logo";
import clsx from "clsx";
import DashBoardLink from "@/components/organisms/SideBar/DashBoardLink";
import { color } from "@/lib/constants/colors";

interface NavItem {
    href: string;
    icon: React.ComponentType<{
        fill: string;
        className?: string;
        style?: React.CSSProperties;
    }>;
    title: string;
}

interface SideBarProps {
    navItems: NavItem[];
}

const SideBar = ({ navItems }: SideBarProps) => {

    const [isHovered, setHovered] = useState(false);

    return (
        <aside
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={clsx(
                // Base layout (Fixed for both, z-index high)
                "fixed transition-all duration-500 ease-in-out z-50 bg-white shadow-[10px_10px_11.2px_3px_rgba(0,0,0,0.25)]",

                // Mobile: Bottom Navigation
                "bottom-0 left-0 w-full h-[80px] flex flex-row items-center justify-around rounded-t-[30px] px-2",

                // Desktop: Sidebar
                "md:absolute md:flex md:flex-col md:items-start md:justify-between",
                "md:top-[110px] md:left-[48px] md:h-[75vh]",
                "md:rounded-[48px] md:py-[31px] md:px-[32px] md:gap-[10px]",
                "md:overflow-hidden",

                // Width Animation
                "md:min-w-[100px]",
                isHovered ? "md:max-w-[300px]" : "md:max-w-[100px]"
            )}
        >
            {/* Logo (Desktop only) */}
            <div
                className={clsx(
                    "hidden md:block transition-all duration-500 ease-in-out w-full",
                    isHovered
                        ? "self-end pr-[8px] pt-[4px]"
                        : "self-center"
                )}
            >
                <div
                    className={clsx("flex", isHovered ? "justify-end" : "justify-center")}
                >
                    <Logo
                        fill={color.accent}
                        style={{ transition: "width 0.4s ease-in-out" }}
                        className="w-[40px] sm:w-[60px] md:w-[70px]"
                    />
                </div>
            </div>

            {/* Navigation Links */}
            <div
                className={clsx(
                    "flex w-full transition-all duration-500 ease-in-out",
                    "flex-row justify-around items-center h-full",
                    "md:flex-col md:justify-center md:h-[75%] md:gap-[16px] xl:gap-[20px] 2xl:gap-[24px]",
                    "md:items-start"
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
