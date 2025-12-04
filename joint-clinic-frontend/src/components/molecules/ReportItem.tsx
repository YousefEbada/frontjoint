import React from "react";
import Typography from "@/components/atoms/Typography";
import StatusBadge from "@/components/atoms/StatusBadge";
import ActionButton from "@/components/atoms/actionButton";

interface ReportItemProps {
    reportName: string;
    status: "Ready" | "In progress" | "Pending";
    dateInfo: string;
    onView?: () => void;
    onDownload?: () => void;
}

const ReportItem: React.FC<ReportItemProps> = ({
    reportName,
    status,
    dateInfo,
    onView,
    onDownload,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_2fr_auto] items-center gap-4 py-6 border-b border-gray-200 last:border-none">
            {/* Report Name */}
            <Typography
                text={reportName}
                variant="bodyBold"
                className="text-[#1E5598]"
            />

            {/* Status */}
            <StatusBadge status={status} />

            {/* Date Info */}
            <Typography
                text={dateInfo}
                variant="bodyRegular"
                className="text-gray-400 font-medium"
            />

            {/* Actions */}
            <div className="flex gap-3">
                <ActionButton
                    text="View"
                    variant="outline"
                    onClick={onView}
                    className="w-[100px] !rounded-full"
                />
                <ActionButton
                    text="Download"
                    variant={status === "Ready" ? "solid" : "solid"} // Can be customized for disabled state
                    onClick={onDownload}
                    className={`w-[120px] !rounded-full ${status !== "Ready" ? "!bg-gray-400 !cursor-not-allowed" : ""}`}
                />
            </div>
        </div>
    );
};

export default ReportItem;
