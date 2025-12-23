import React from "react";
import Typography from "@/components/atoms/Typography";

interface PatientRowProps {
  name: string;
  status: string;
  statusColor?: string;  // default green
  date: string;
  onDetailsClick?: () => void;
}

const PatientRow: React.FC<PatientRowProps> = ({
  name,
  status,
  statusColor = "text-green-600",
  date,
  onDetailsClick,
}) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-[1.5fr_1fr_2fr_auto] items-center rounded-[39px] md:rounded-none md:border-none bg-[#eff6ff] md:bg-transparent md:border-gray-200 last:border-none">
      {/* Patient Name */}
      <div className="py-3 pl-4 border-r border-b md:border-none border-[#9FD5E2]">
        <Typography
          text={name}
          variant="bodyBold"
          className="text-[#1E5598]"
        />
      </div>

      {/* Status */}
      <div className="py-3 pl-4 border-b md:border-none border-[#9FD5E2]">
        <Typography
          text={status}
          variant="bodyBold"
          className={`${statusColor}`}
        />
      </div>

      {/* Appointment Date */}
      <div className="py-3 pl-4 border-r md:border-none border-[#9FD5E2]">
        <Typography
          text={date}
          variant="bodyBold"
          className="text-[#1E5598]"
        />
      </div>

      {/* Patient Details Link */}
      <div className="py-3 pl-4 md:p-0 flex md:block md:text-end">
        <button
          onClick={onDetailsClick}
          className=""
        >
          <Typography
            text="Patient Details"
            variant="bodyBold"
            className="text-[#167c4f] underline cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default PatientRow;
