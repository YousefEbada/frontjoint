"use client";
import React from "react";
import { tv } from "tailwind-variants";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "glass" | "section" | "shadowBox" | "input" | "nav";
}

const corneredBox = tv({
  base: "flex flex-1 items-center justify-center transition-all duration-300",
  variants: {
    type: {
      glass:
        "flex-col px-[88px] py-[33px] w-fit h-fit bg-[rgba(255,255,255,0.4)] rounded-[35px] border-[3px] [border-image:radial-gradient(circle_at_center,_rgba(255,255,255,1),_rgba(255,255,255,0))_1] backdrop-blur-[17px] overflow-hidden",
      section:
        "flex-col px-[88px] py-[33px] gap-[10px] w-fit h-fit items-center justify-center rounded-[55px] bg-gradient-to-b from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.36)] backdrop-blur-[30px]",
      shadowBox:
        "flex-col px-[44px] py-[13px] gap-[10px] w-fit h-fit items-center justify-center rounded-[55px] bg-white shadow-[10px_10px_11.2px_3px_rgba(0,0,0,0.25)]",

      input:
        "flex-row px-[88px] py-[33px] gap-[10px] w-fit h-fit items-center justify-center bg-transparent border border-gray-200 rounded-[48px]",
      nav:
        "flex-col px-[88px] py-[33px] w-fit h-fit items-center justify-center bg-transparent rounded-[35px] border-[3px] [border-image:radial-gradient(circle_at_center,_rgba(255,255,255,1),_rgba(255,255,255,0))_1] backdrop-blur-[17px] overflow-hidden",
    },
  },
  defaultVariants: {
    type: "glass",
  },
});

const CorneredBoxes = ({ type, children, style, id, className, ...rest }: IProps) => {
  const mergedClass = corneredBox({ type, className });

  const content = (
    <div id={id} className={mergedClass} style={style} {...rest}>
      {children}
    </div>
  );

  if (type === "glass") {
    return <div className="overflow-hidden rounded-[35px] max-w-fit max-h-fit">{content}</div>;
  }

  if (type === "nav") {
    return <nav className="overflow-hidden rounded-[35px] w-[88%] max-h-fit">{content}</nav>;
  }

  return content;
};

export default CorneredBoxes;
