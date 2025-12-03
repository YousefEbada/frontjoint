"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import clsx from "clsx";

const days = Array.from({ length: 7 }).map((_, i) =>
  dayjs().day(i).format("ddd")
);

interface CalendarProps {
  onSelect?: (date: string) => void;
}

const Calendar = ({ onSelect }: CalendarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const dateParam = searchParams?.get("date");
    if (dateParam) {
      const parsed = dayjs(dateParam);
      if (parsed.isValid()) {
        setSelectedDate(dateParam);
        setCurrentMonth(parsed);
      } else {
        // Fallback if date is invalid (e.g. "?date=2")
        const today = dayjs().format("YYYY-MM-DD");
        setSelectedDate(today);
      }
    } else {
      const today = dayjs().format("YYYY-MM-DD");
      setSelectedDate(today);
    }
  }, [searchParams]);

  const handleSelect = (date: string) => {
    setSelectedDate(date);
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("date", date);
    router.push(`?${params.toString()}`, { scroll: false });
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
        "bg-white",
        "p-3 sm:p-4 md:p-6",
        "rounded-[16px] sm:rounded-[20px] md:rounded-[24px]",
        "shadow-[0px_15px_50px_rgba(30,85,152,0.15)]",
        "w-full",
        "max-w-[260px] sm:max-w-[200px] md:max-w-[380px]"
      )}
    >
      {/* Month Header */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h3 className="text-[14px] sm:text-[16px] md:text-[20px] font-semibold text-[#0D294D]">
          {currentMonth.format("MMMM YYYY")}
        </h3>

        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="text-[#1e5598] text-[16px] sm:text-[18px] md:text-[20px] font-bold hover:opacity-70"
          >
            {"<"}
          </button>
          <button
            onClick={handleNextMonth}
            className="text-[#1e5598] text-[16px] sm:text-[18px] md:text-[20px] font-bold hover:opacity-70"
          >
            {">"}
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div
        className={clsx(
          "grid grid-cols-7",
          "text-center text-[#0D294D]/70",
          "font-medium",
          "mb-2",
          "text-[10px] sm:text-[11px] md:text-[14px]"
        )}
      >
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div
        className={clsx(
          "grid grid-cols-7",
          "gap-1 sm:gap-1.5 md:gap-2",
          "text-center text-[#0D294D]",
          "font-semibold"
        )}
      >
        {calendarDays.map((d, i) => {
          const isSelected = selectedDate === d.format("YYYY-MM-DD");
          const isCurrentMonth = d.month() === currentMonth.month();

          return (
            <button
              key={i}
              onClick={() => handleSelect(d.format("YYYY-MM-DD"))}
              className={clsx(
                "aspect-square",
                "flex items-center justify-center",
                "rounded-full",
                "text-[10px] sm:text-[12px] md:text-[16px]",
                "transition-all duration-200",
                isSelected ? "bg-[#1e5598] text-white shadow-md scale-105" : "hover:bg-[#e2ecf6]",
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
