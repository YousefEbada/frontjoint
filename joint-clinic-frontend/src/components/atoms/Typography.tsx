import React from "react";
import { IBM_Plex_Sans } from "next/font/google";

const ibm = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export type TypographyVariant =
    | "display1"
    | "display2"
    | "heading1"
    | "heading2"
    | "subheader"
    | "bodyBold"
    | "bodyRegular"
    | "bodySmall";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    variant: TypographyVariant;
    className?: string;
    gradient?: boolean;
}

const typographyConfig: Record<
    TypographyVariant,
    { tag: React.ElementType; className: string }
> = {
    display1: {
        tag: "h1",
        className: "text-[60px] md:text-[90px] lg:text-[120px] font-bold",
    },
    display2: {
        tag: "h2",
        className: "text-[48px] md:text-[64px] lg:text-[90px] font-semibold",
    },
    heading1: {
        tag: "h2",
        className: "text-[36px] md:text-[48px] lg:text-[60px] font-semibold",
    },
    heading2: {
        tag: "h2",
        className: "text-[28px] md:text-[32px] lg:text-[40px] font-medium",
    },
    subheader: {
        tag: "p",
        className: "text-[20px] md:text-[24px] lg:text-[30px] font-medium",
    },
    bodyBold: {
        tag: "p",
        className: "text-[16px] md:text-[18px] lg:text-[20px] font-semibold",
    },
    bodyRegular: {
        tag: "p",
        className: "text-[14px] md:text-[16px] lg:text-[18px] font-normal",
    },
    bodySmall: {
        tag: "p",
        className: "text-[12px] md:text-[14px] font-normal",
    },
};

const Typography: React.FC<TypographyProps> = ({
    children,
    variant,
    className = "",
    gradient = false,
    ...props
}) => {
    const { tag: Tag, className: variantClass } = typographyConfig[variant];

    const gradientClass = gradient
        ? "bg-clip-text text-transparent bg-gradient-to-b from-[#0D294D] to-[#1E5598]"
        : "";

    return (
        <Tag
            className={`${ibm.className} ${variantClass} leading-tight ${gradientClass} ${className}`}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default Typography;
