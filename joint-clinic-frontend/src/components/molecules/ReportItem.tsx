import React from "react";
import Typography from "@/components/atoms/Typography";
import StatusBadge from "@/components/atoms/StatusBadge";
import ActionButton from "@/components/atoms/ActionButton";

interface ReportItemProps {
    reportName: string;
    status: "Ready" | "In progress" | "Pending" | "Uploaded" | "Waiting";
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
        <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-[1.5fr_1fr_2fr_auto] items-center rounded-[39px] md:rounded-none bg-[#eff6ff] md:bg-transparent md:border-b md:border-gray-200 last:border-none">
            {/* Report Name */}
            <div className="py-3 pl-4 border-r border-b md:border-none border-[#9FD5E2]">
                <Typography
                    text={reportName}
                    variant="bodyBold"
                    className="text-[#1E5598]"
                />
            </div>

            {/* Status */}
            <div className="py-3 pl-4 border-b md:border-none border-[#9FD5E2]">
                <StatusBadge status={status} />
            </div>

            {/* Date Info */}
            <div className="hidden md:block border-none border-[#9FD5E2]">
                <Typography
                    text={dateInfo}
                    variant="bodyRegular"
                    className="text-gray-400 font-medium"
                />
            </div>

            {/* Actions */}
            <div className="hidden p-0 md:flex gap-3 justify-start">
                <ActionButton
                    text="View"
                    variant="outline"
                    onClick={onView}
                    className="w-[100px] rounded-full!"
                />
                <ActionButton
                    text="Download"
                    variant={status === "Ready" ? "solid" : "solid"} // Can be customized for disabled state
                    onClick={onDownload}
                    className={`w-[120px] rounded-full! ${status !== "Ready" && status !== "Uploaded" ? "bg-gray-400! cursor-not-allowed!" : ""}`}
                />
            </div>
            <div className="flex items-center justify-start md:hidden h-full pl-4 border-r md:border-none border-[#9FD5E2]">
                <Typography
                    text="View"
                    variant="bodyRegular"
                    className="text-[#1E5598] underline"
                />
            </div>
            <div className="flex items-center justify-start md:hidden h-full pl-4">
                <Typography
                    text="Download"
                    variant="bodyRegular"
                    className="text-[#167C4F] underline"
                />
            </div>

        </div>
    );
};

export default ReportItem;
