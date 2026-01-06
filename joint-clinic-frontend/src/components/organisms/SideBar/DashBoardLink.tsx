"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { color } from "@/lib/constants/colors";
import { useState } from "react";
import Typography from "@/components/atoms/Typography";
import clsx from "clsx";

interface DashBoardLinkProps {
    linkHref: string;
    Icon?: React.ComponentType<{
        fill: string;
        className?: string;
        style?: React.CSSProperties;
    }>;
    title: string;
    expanded?: boolean;
    mobileIconOnly?: boolean;
}

const DashBoardLink = ({ linkHref, title, Icon, expanded = true, mobileIconOnly = false }: DashBoardLinkProps) => {
    const pathname = usePathname();
    // Exact match or child route match
    // Use exact match first, then check if current path is a child of this link
    // Special case: /patient/booking should also match /patient/bookings
    const isActive = pathname === linkHref ||
        (pathname?.startsWith(linkHref + "/") && linkHref !== "/audit") ||
        (linkHref === "/audit" && pathname === "/audit") ||
        (linkHref === "/patient/booking" && pathname?.startsWith("/patient/bookings"));
    const [isHovered, setHovered] = useState(false);

    const colorState = isActive
        ? color.secondary
        : isHovered
            ? color.secondary
            : color.primary;

    return (
        <Link
            href={linkHref}
            className="flex flex-1 flex-row justify-start items-center gap-2 sm:gap-3 md:gap-4 w-fit hover:scale-[1.03] transition-all duration-200 ease-in-out"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {Icon &&
                <Icon
                    fill={colorState}
                    className="cursor-pointer xl:h-[36px] xl:w-[36px] lg:h-[32px] lg:w-[32px] md:h-[30px] md:w-[30px] sm:h-[28px] sm:w-[28px] h-[26px] w-[26px]"
                    style={{
                        transition: "all 0.2s ease-in-out",
                    }}
                />
            }

            {/* Text */}
            <div
                className={clsx(
                    "overflow-hidden transition-all duration-500 ease-in-out flex items-center",
                    expanded ? "max-w-[200px] opacity-100 ml-3" : "max-w-0 opacity-0 ml-0",
                    mobileIconOnly && "hidden md:flex"
                )}
            >
                <Typography
                    text={title}
                    variant={Icon ? "bodyBold" : "bodyRegular"}
                    className="font-medium whitespace-nowrap"
                    style={{
                        color: colorState,
                        ...(Icon && { fontSize: "clamp(12px, 2vw, 22px)" }),
                    }}
                />
            </div>
        </Link>
    );
};

export default DashBoardLink;
