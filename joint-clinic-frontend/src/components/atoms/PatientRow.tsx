import React from "react";

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
    <div
      className="
        w-full py-3 grid grid-cols-4 justify-items-between text-[18px] px-3"
    >
      {/* Patient Name */}
      <span className="font-semibold text-[24px] font-bold text-[#1E5598]">{name}</span>

      {/* Status */}
      <span className={`${statusColor} text-center text-[22px] font-medium`}>{status}</span>

      {/* Appointment Date */}
      <span className="text-[#1E5598] text-center text-[22px] font-medium">{date}</span>

      {/* Patient Details Link */}
      <button
        onClick={onDetailsClick}
        className="text-[#167c4f] underline font-medium text-[22px] cursor-pointer text-end"
      >
        Patient Details
      </button>
    </div>
  );
};

export default PatientRow;
