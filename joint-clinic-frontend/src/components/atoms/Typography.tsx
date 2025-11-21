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
}

const typographyConfig: Record<
  TypographyVariant,
  { tag: React.ElementType; className: string }
> = {
  display1: {
    tag: "h1",
    className: "text-[120px] font-bold",
  },
  display2: {
    tag: "h2",
    className: "text-[90px] font-semibold",
  },
  heading1: {
    tag: "h2",
    className: "text-[60px] font-semibold",
  },
  heading2: {
    tag: "h2",
    className: "text-[40px] font-medium",
  },
  subheader: {
    tag: "p",
    className: "text-[30px] font-medium",
  },
  bodyBold: {
    tag: "p",
    className: "text-[20px] font-semibold",
  },
  bodyRegular: {
    tag: "p",
    className: "text-[18px] font-normal",
  },
  bodySmall: {
    tag: "p",
    className: "text-[14px] font-normal",
  },
};

const Typography: React.FC<TypographyProps> = ({
  text,
  variant,
  className = "",
}) => {
  const { tag: Tag, className: variantClass } = typographyConfig[variant];

  return (
    <Tag className={`${ibm.className} ${variantClass} leading-tight ${className}`}>
      {text}
    </Tag>
  );
};

export default Typography;
