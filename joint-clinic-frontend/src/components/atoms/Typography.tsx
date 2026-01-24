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

export interface TypographyProps {
    text: React.ReactNode;
    variant: TypographyVariant;
    className?: string;
    style?: React.CSSProperties;
    gradient?: boolean;
}

const typographyConfig: Record<
    TypographyVariant,
    { tag: "h1" | "h2" | "p"; className: string }
> = {
    display1: {
        tag: "h1",
        className: "text-[36px] sm:text-[48px] md:text-[64px] lg:text-[96px] font-bold",
    },
    display2: {
        tag: "h2",
        className: "text-[28px] sm:text-[36px] md:text-[48px] lg:text-[72px] font-semibold",
    },
    heading1: {
        tag: "h2",
        className: "text-[24px] sm:text-[30px] md:text-[40px] lg:text-[56px] font-semibold",
    },
    heading2: {
        tag: "h2",
        className: "text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] font-medium",
    },
    subheader: {
        tag: "p",
        className: "text-[16px] sm:text-[18px] md:text-[22px] lg:text-[28px] font-medium",
    },
    bodyBold: {
        tag: "p",
        className: "text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] font-semibold",
    },
    bodyRegular: {
        tag: "p",
        className: "text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-normal",
    },
    bodySmall: {
        tag: "p",
        className: "text-[11px] sm:text-[13px] font-normal",
    },
};

const Typography: React.FC<TypographyProps> = ({
    text,
    variant,
    className = "",
    style,
    gradient = false,
}) => {
    const { tag: Tag, className: variantClass } = typographyConfig[variant];

    const gradientClass = gradient
        ? "bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent"
        : "";

    return (
        <Tag
            className={`${ibm.className} ${variantClass} ${gradientClass} leading-tight ${className}`}
            style={style}
        >
            {text}
        </Tag>
    );
};

export default Typography;
