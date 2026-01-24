"use client";

import React from "react";
import SearchInput from "@/components/atoms/searchInput";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import { color } from "@/lib/constants/colors";

interface FilterOption {
    label: string;
    active?: boolean;
    onClick?: () => void;
}

interface PageHeaderProps {
    title?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    actionButton?: {
        label: string;
        onClick?: () => void;
    };
    filters?: FilterOption[];
    className?: string; // For additional flexibility
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search By Name",
    actionButton,
    filters,
    className = "",
}) => {
    return (
        <div className={`grid grid-cols-17 md:grid-cols-[70%_30%] gap-y-4 grid-rows-2 w-full mb-6 ${className}`}>
            {/* Search: Mobile Order 1, Desktop Order 2 */}
            <div className="order-1 col-span-17 md:order-2 md:col-span-1 md:flex md:justify-end">
                {(onSearchChange || searchValue !== undefined) && (
                    <SearchInput
                        value={searchValue}
                        onChange={onSearchChange}
                        className="w-full md:w-[320px]"
                        placeholder={searchPlaceholder}
                    />
                )}
            </div>
            
            {/* Title: Mobile Order 2, Desktop Order 1 */}
            <div className="order-2 col-span-8 md:order-1 md:col-span-1 flex items-center">
                {title && (
                    <Typography
                        text={title}
                        variant={`${typeof window !== 'undefined' && window.innerWidth < 768 ? "bodyBold" : "heading1"}`}
                        style={{ color: color.secondary }}
                    />
                )}
            </div>

            {/* Action Button: Mobile Order 3, Desktop Order 4 */}
            <div className="order-3 col-span-9 flex justify-end md:order-4 md:col-span-1">
                {actionButton && (
                    <Button
                        text={actionButton.label}
                        variant="fifth"
                        active={true}
                        onClick={actionButton.onClick}
                        className="w-[120px] sm:w-[140px] md:w-[200px] m-0 px-0 h-[36px] sm:h-[40px] md:h-[50px] text-[10px] sm:text-[12px] md:text-[18px]"
                    />
                )}
            </div>

            {/* Filters: Mobile Order 4, Desktop Order 3 */}
            <div className="order-4 col-span-17 md:order-3 md:col-span-1 w-full flex flex-row flex-wrap md:flex-nowrap items-center gap-2">
                {filters &&
                    filters.map((filter) => (
                        <Button
                            key={filter.label}
                            text={filter.label}
                            variant="primary"
                            active={filter.active ?? true}
                            onClick={filter.onClick}
                            className="flex-1 sm:flex-none cursor-pointer sm:min-w-[140px] md:min-w-[180px] m-0 text-[#1e5598]"
                        />
                    ))}
            </div>
        </div>
    );
};

export default PageHeader;
