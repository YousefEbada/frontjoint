"use client";
import { useState, useRef, useEffect } from "react";
import "./dropdown.css";

interface DropdownProps {
  items: string[];
  text: string; // new prop
  width?: string;
}

export default function CustomDropdown({ items, text, width }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(text);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const isDefault = selected === text;

  return (
    <div
      ref={dropdownRef}
      onMouseDown={(e) => e.stopPropagation()}
      className={`relative ${width}`}
    >
      {/* Button */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="
          w-full h-[80px]
          rounded-full border border-[#0D294D]
          bg-transparent
          text-[24px]
          flex items-center justify-center gap-3
          cursor-pointer
          select-none
        "
        style={{ color: isDefault ? "#7b8a99" : "#0D294D" }}
      >
        {selected}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className={`
            absolute top-[90px] left-1/2 -translate-x-1/2 
            ${width} 
            bg-white rounded-[40px]
            shadow-lg py-6 z-50
          `}
        >
          <ul className="flex flex-col gap-4 text-center">
            {items.map((item, i) => (
              <li
                key={i}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelected(item);
                  setOpen(false);
                }}
                className={`
                  text-[24px] cursor-pointer transition select-none

                  ${
                    selected === item
                      ? "sel text-[#7b8a99] scale-105 rounded-full py-2"
                      : "text-[#7b8a99] hover:text-[#0D294D]"
                  }
                `}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
