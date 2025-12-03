import React from "react";
import clsx from "clsx";

interface DividerProps {
    orientation?: "horizontal" | "vertical";
    className?: string;
    color?: string;
    thickness?: string;
}

const Divider: React.FC<DividerProps> = ({
    orientation = "horizontal",
    className,
    color = "bg-gray-300",
    thickness = "1px",
}) => {
    const isHorizontal = orientation === "horizontal";

    return (
        <div
            className={clsx(
                color,
                className
            )}
            style={{
                width: isHorizontal ? "100%" : thickness,
                height: isHorizontal ? thickness : "100%",
                minHeight: !isHorizontal ? "100%" : undefined,
            }}
        />
    );
};

export default Divider;
