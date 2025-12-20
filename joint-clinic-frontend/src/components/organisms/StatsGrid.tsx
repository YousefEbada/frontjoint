import React from "react";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";

interface StatItem {
    label: string;
    value: string;
    labelColor?: string;
    valueColor?: string;
}

interface StatsGridProps {
    title?: string;
    items: StatItem[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ title, items }) => {
    const isThreeItems = items.length === 3;

    return (
        <div className="flex flex-col gap-4 w-full">
            {title && (
                <Typography
                    text={title}
                    variant="heading2"
                    style={{ color: color.secondary }}
                />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-6 w-full">
                {items.map((item, index) => {
                    // Logic for 3 items: First item spans 2 columns (full width of grid)
                    const isFirstOfThree = isThreeItems && index === 0;
                    const spanClass = isFirstOfThree ? "col-span-2" : "col-span-1";
                    // Alignment for first of three: maybe row? or just centered?
                    // The current design had split logic (label left, value right for each item).
                    // Let's keep the inner layout: Flex row space-between.

                    return (
                        <div
                            key={index}
                            className={`${spanClass} flex flex-row items-center justify-between md:justify-start gap-2 md:gap-4`}
                        >
                            <Typography
                                text={item.label}
                                variant="bodyBold"
                                style={{ color: item.labelColor || color.secondary }}
                            />
                            <Typography
                                text={item.value}
                                variant="bodyBold"
                                style={{ color: item.valueColor || color.success }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StatsGrid;
