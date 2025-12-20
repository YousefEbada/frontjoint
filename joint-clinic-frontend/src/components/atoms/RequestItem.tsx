"use client";
import Typography from "@/components/atoms/Typography";
type StatusType = "Done" | "Opened" | "Unread";

interface RequestItemProps {
  name: string;
  status: StatusType;
  phone: string;
  department: string;
  date: string;
  onViewDetails?: () => void;
}

const statusColor: Record<StatusType, string> = {
  Done: "text-green-600",
  Opened: "text-yellow-500",
  Unread: "text-red-500",
};

const dotColor: Record<StatusType, string> = {
  Done: "bg-green-600",
  Opened: "bg-yellow-500",
  Unread: "bg-red-500",
};

export default function RequestItem({
  name,
  status,
  phone,
  department,
  onViewDetails,
}: RequestItemProps) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-[1.5fr_1fr_2fr_auto] items-center rounded-[39px] md:rounded-none md:border-none bg-[#eff6ff] md:bg-transparent md:border-gray-200 last:border-none">
      <div className="py-3 pl-4 border-r border-b md:border-none border-[#9FD5E2]">
        <div className="flex items-center gap-3 font-semibold text-[#1E5598]">
          <span className={`md:block hidden w-3 h-3 rounded-full shrink-0 ${dotColor[status]}`}></span>
          <Typography
            text={name}
            variant="subheader"
            className="text-[#1E5598] font-bold"
          />
        </div>
        <Typography
          text={department}
          variant="bodyRegular"
          className="md:block hidden text-gray-500 text-sm mt-1"
        />
      </div>
      <div className="py-3 pl-4 border-b md:border-none border-[#9FD5E2]">
        <Typography
          text={status}
          variant="bodyBold"
          className={`${statusColor[status]} font-medium`}
        />
      </div>
      <div className="py-3 pl-4 border-r md:border-none border-[#9FD5E2]">
        <Typography
          text={phone}
          variant="bodyBold"
          className="text-gray-700 font-medium"
        />
      </div>
      <div className="py-3 pl-4 md:p-0 flex md:block md:text-end">
        <button
          onClick={onViewDetails}
          className=""
        >
          <Typography
            text="View Details"
            variant="bodyBold"
            className="text-green-700 underline font-medium hover:opacity-80 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}
