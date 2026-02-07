"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import clsx from "clsx";

const days = Array.from({ length: 7 }).map((_, i) =>
  dayjs().day(i).format("ddd")
);

interface CalendarProps {
  onSelect?: (date: string) => void;
  width?: string;
  availableDates?: string[]; // Array of dates in YYYY-MM-DD format that are available
  selectedDate?: string;
}

const Calendar = ({ onSelect, width, availableDates, selectedDate: controlledDate }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(
    controlledDate ? dayjs(controlledDate) : dayjs()
  );

  const [selectedDate, setSelectedDate] = useState(
    controlledDate || dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (controlledDate) {
      setSelectedDate(controlledDate);
      setCurrentMonth(dayjs(controlledDate));
    }
  }, [controlledDate]);

  const handleSelect = (date: string) => {
    if (!controlledDate) {
      setSelectedDate(date);
    }
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
          <button className="cursor-pointer hover:scale-140 transition-all duration-100 w-6" onClick={handlePrevMonth}>{"<"}</button>
          <button className="cursor-pointer hover:scale-140 transition-all duration-100 w-6" onClick={handleNextMonth}>{">"}</button>
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
          const dateStr = d.format("YYYY-MM-DD");
          const isSelected = selectedDate === dateStr;
          const isCurrentMonth = d.month() === currentMonth.month();
          // If availableDates is provided, only those dates are enabled
          const isDisabled = availableDates ? !availableDates.includes(dateStr) : false;

          return (
            <button
              key={i}
              onClick={() => !isDisabled && handleSelect(dateStr)}
              disabled={isDisabled}
              className={clsx(
                "aspect-square flex items-center justify-center rounded-[10px] text-[10px] sm:text-[11px] md:text-[14px]",
                isSelected ? "bg-[#9fd5e2] font-semibold" : "",
                !isSelected && !isDisabled && "hover:bg-[#e2ecf6]",
                !isCurrentMonth && "opacity-30",
                isDisabled && isCurrentMonth && "opacity-40 cursor-not-allowed text-gray-400",
                !isDisabled && "cursor-pointer"
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
