import React from "react";
import clsx from "clsx";

interface ScrollableAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const ScrollableArea: React.FC<ScrollableAreaProps> = ({ children, className, ...props }) => {
    return (
        <div
            className={clsx("overflow-y-auto custom-scrollbar", className)}
            {...props}
        >
            {children}
        </div>
    );
};

export default ScrollableArea;
