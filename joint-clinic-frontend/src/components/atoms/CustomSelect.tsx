"use client";
import { useState, useRef, useEffect } from "react";

type CustomSelectProps = {
  items: string[];
  onChange?: (value: string) => void;
  width?: string;
  height?: string;
  className?: string;   // ← تمت إضافتها
};

export default function CustomSelect({
  items,
  onChange,
  width,
  height,
  className,   // ← استخدمناها
}: CustomSelectProps) {
  const [selected, setSelected] = useState(items[0]);
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

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
    setOpen(false);
  };

  // Default sizes (desktop)
  const finalWidth = width ?? "600px";
  const finalHeight = height ?? "85px";

  return (
    <div
      ref={menuRef}
      className={`relative w-full max-w-[600px] md:w-auto ${className ?? ""}`}
      style={{ width: finalWidth }}
    >
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          bg-white 
          rounded-[30px] sm:rounded-[40px] md:rounded-[50px]
          text-[#1e5598]
          w-full
          shadow-[0px_15px_45px_rgba(30,85,152,0.15)]
          outline-none border-none
          transition-all duration-300

          flex items-center justify-center

          px-4 sm:px-6 md:px-10
          text-[14px] sm:text-[16px] md:text-[28px] lg:text-[32px]
          font-medium
          relative

          h-[48px] sm:h-[55px] md:h-[85px]
        "
        style={{ height: finalHeight }}
      >
        <span className="block text-center w-full pointer-events-none">
          {selected}
        </span>

        {/* ARROW */}
        <span
          className={`
            absolute right-4 sm:right-6 md:right-10
            border-solid 
            border-t-[6px] sm:border-t-[7px] md:border-t-[12px]
            border-l-[5px] sm:border-l-[6px] md:border-l-[8px]
            border-r-[5px] sm:border-r-[6px] md:border-r-[8px]
            border-t-[#1e5598] border-l-transparent border-r-transparent
            transition-transform duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute left-0 top-[105%]
            w-full
            bg-white
            rounded-[20px] sm:rounded-[24px] md:rounded-[32px]
            shadow-[0px_12px_45px_rgba(30,85,152,0.18)]
            overflow-hidden
            z-50
          "
          style={{ width: finalWidth }}
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSelect(item)}
              className="
                block w-full
                text-[14px] sm:text-[16px] md:text-[26px] lg:text-[28px]
                py-3 sm:py-4 md:py-6
                text-[#1e5598]
                font-medium
                text-center
                hover:bg-[#eaf2ff]
                transition-all duration-200
              "
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
