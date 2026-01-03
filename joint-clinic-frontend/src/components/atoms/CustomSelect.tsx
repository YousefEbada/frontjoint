"use client";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

type CustomSelectProps = {
  items: string[];
  onChange?: (value: string) => void;
  value?: string;
  width?: string;
  height?: string;
  className?: string;
  size?: "small" | "large";
  placeholder?: string;
};

export default function CustomSelect({
  items,
  onChange,
  value,
  width,
  height,
  className,
  size = "large",
  placeholder,
}: CustomSelectProps) {
  const [internalSelected, setInternalSelected] = useState(placeholder || items[0]);

  // Use external value if provided (controlled), otherwise use internal state
  const selected = value !== undefined ? value : internalSelected;
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    setInternalSelected(val);
    onChange?.(val);
    setOpen(false);
  };

  // Default sizes (desktop)
  const finalWidth = width ?? (size === "large" ? "600px" : "100%");
  const finalHeight = height ?? (size === "large" ? "85px" : "auto");

  const isSmall = size === "small";

  return (
    <div
      ref={menuRef}
      className={clsx("relative w-full", isSmall ? "" : "md:w-auto", className)}
      style={{ width: finalWidth }}
    >
      {/* BUTTON */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={clsx(
          "bg-[#fff] !text-[#1e5598]",
          isSmall ? "rounded-[30px] border border-gray-200" : "rounded-[30px] sm:rounded-[40px] md:rounded-[50px]",
          "text-[#1e5598]",
          "w-full",
          isSmall ? "shadow-[0_4px_20px_rgba(0,0,0,0.02)]" : "shadow-[0px_15px_45px_rgba(30,85,152,0.15)]",
          "outline-none",
          isSmall ? "" : "border-none",
          "transition-all duration-300",
          "flex items-center justify-center",
          isSmall ? "px-4 py-3" : "px-4 sm:px-6 md:px-10",
          isSmall ? "text-[16px]" : "text-[14px] sm:text-[16px] md:text-[28px] lg:text-[32px]",
          "font-medium",
          "relative",
          isSmall ? "h-auto" : "h-[45px] sm:h-[45px] md:h-[85px]"
        )}
      >
        <span className={clsx("block w-full pointer-events-none", isSmall ? "text-left text-gray-500" : "text-center")}>
          {selected === placeholder ? <span className="text-gray-400">{selected}</span> : <span className="text-[#1e5598]">{selected}</span>}
        </span>

        {/* ARROW */}
        <span
          className={clsx(
            "absolute",
            isSmall ? "right-4" : "right-4 sm:right-6 md:right-10",
            "border-solid",
            isSmall ? "border-t-[6px] border-l-[4px] border-r-[4px]" : "border-t-[6px] sm:border-t-[7px] md:border-t-[12px] border-l-[5px] sm:border-l-[6px] md:border-l-[8px] border-r-[5px] sm:border-r-[6px] md:border-r-[8px]",
            "border-t-[#1e5598] border-l-transparent border-r-transparent",
            "transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className={clsx(
            "absolute left-0 top-[105%]",
            "w-full",
            "bg-[#fff]",
            isSmall ? "rounded-[20px] border border-gray-200" : "rounded-[20px] sm:rounded-[24px] md:rounded-[32px]",
            isSmall ? "shadow-lg" : "shadow-[0px_12px_45px_rgba(30,85,152,0.18)]",
            "overflow-hidden",
            "z-50"
          )}
          style={{ width: finalWidth }}
        >
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(item)}
              className={clsx(
                "block w-full",
                isSmall ? "text-[16px] py-2" : "text-[14px] sm:text-[16px] md:text-[26px] lg:text-[28px] py-3 sm:py-4 md:py-6",
                "text-[#1e5598]",
                "font-medium",
                isSmall ? "text-left px-4" : "text-center",
                "hover:bg-[#eaf2ff]",
                "transition-all duration-200"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
