"use client";
import { useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";

const days = Array.from({ length: 7 }).map((_, i) =>
  dayjs().day(i).format("ddd")
);

interface CalendarProps {
  onSelect?: (date: string) => void;
  width?: string;
}

const Calendar = ({ onSelect, width }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const handleSelect = (date: string) => {
    setSelectedDate(date);
    onSelect?.(date);
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const calendarDays = [];
  let day = startDate;

  while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
    calendarDays.push(day);
    day = day.add(1, "day");
  }

  return (
    <div
      className={clsx(
        "bg-white text-[#1e5598]",
        "p-3 sm:p-4 md:p-6",
        "rounded-[16px] sm:rounded-[20px] md:rounded-[24px]",
        "shadow-[0px_15px_50px_rgba(30,85,152,0.15)]",
        "w-full",
        width ?? "max-w-[260px] sm:max-w-[200px] md:max-w-[380px]"
      )}
    >
      {/* Month Header */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h3 className="text-[14px] sm:text-[16px] md:text-[20px] font-semibold">
          {currentMonth.format("MMMM YYYY")}
        </h3>

        <div className="flex gap-2">
          <button onClick={handlePrevMonth}>{"<"}</button>
          <button onClick={handleNextMonth}>{">"}</button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 text-center text-[10px] sm:text-[11px] md:text-[14px] mb-2">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2">
        {calendarDays.map((d, i) => {
          const isSelected = selectedDate === d.format("YYYY-MM-DD");
          const isCurrentMonth = d.month() === currentMonth.month();

          return (
            <button
              key={i}
              onClick={() => handleSelect(d.format("YYYY-MM-DD"))}
              className={clsx(
                "aspect-square flex items-center justify-center rounded-[10px]",
                isSelected ? "bg-[#9fd5e2]" : "hover:bg-[#e2ecf6]",
                !isCurrentMonth && "opacity-30"
              )}
            >
              {d.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
