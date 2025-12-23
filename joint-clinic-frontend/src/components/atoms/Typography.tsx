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
        className: "text-[60px] md:text-[80px] lg:text-[120px] font-bold",
    },
    display2: {
        tag: "h2",
        className: "text-[45px] md:text-[60px] lg:text-[90px] font-semibold",
    },
    heading1: {
        tag: "h2",
        className: "text-[32px] md:text-[48px] lg:text-[60px] font-semibold",
    },
    heading2: {
        tag: "h2",
        className: "text-[24px] md:text-[32px] lg:text-[40px] font-medium",
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
