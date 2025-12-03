import React from "react";
import { color } from "@/lib/constants/colors";

interface ProgressBarProps {
    percentage: number;
    className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className = "" }) => {
    // Ensure percentage is between 0 and 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    return (
        <div
            className={`w-full h-4 rounded-full overflow-hidden ${className}`}
            style={{ backgroundColor: color.tertiary }}
        >
            <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                    width: `${clampedPercentage}%`,
                    backgroundColor: color.primary,
                }}
            />
        </div>
    );
};

export default ProgressBar;
