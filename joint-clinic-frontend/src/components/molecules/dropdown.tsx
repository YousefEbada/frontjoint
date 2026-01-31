"use client";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import "./dropdown.css";

interface DropdownProps {
  items: string[];
  text: string;
  width?: string;
  onSelect?: (value: string) => void;
  value?: string;
  variant?: 'default' | 'form';
  required?: boolean;
  maxHeight?: string;
}

export default function CustomDropdown({ items, text, width, onSelect, value, variant = 'default', required = false, maxHeight }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState<string>(text);

  // Determine current value: controlled (value prop) or uncontrolled (internal state)
  const currentSelection = value !== undefined ? value : internalSelected;

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

  const isDefault = currentSelection === text || !items.includes(currentSelection);

  const handleSelect = (item: string) => {
    if (value === undefined) {
      setInternalSelected(item);
    }
    if (onSelect) {
      onSelect(item);
    }
    setOpen(false);
  };

  // Styles based on variant
  const buttonStyles = variant === 'form'
    ? `
        w-full h-[70px] md:h-[80px] px-8 
        rounded-full border border-[#0D294D]/30 
        bg-white/50 backdrop-blur-sm 
        text-lg md:text-xl 
        flex items-center justify-center gap-3
        cursor-pointer select-none
        hover:bg-white/80 focus:bg-white
        outline-none focus:ring-2 focus:ring-[#1E5598]/30 
        transition truncate pr-12
      `
    : `
        w-full h-[80px]
        rounded-full border border-[#0D294D]
        bg-transparent
        text-[24px]
        flex items-center justify-center gap-3
        cursor-pointer
        select-none
      `;

  const dropdownStyles = variant === 'form'
    ? `
        absolute top-[80px] md:top-[90px] left-0
        w-full
        bg-white rounded-[20px]
        shadow-lg z-50
        custom-scrollbar overflow-y-auto overflow-x-hidden
        py-4
      `
    : `
        absolute top-[90px]
        ${width} 
        bg-white rounded-[40px]
        shadow-lg py-6 z-50
        overflow-y-auto overflow-x-hidden
      `;

  const itemStyles = variant === 'form'
    ? 'text-lg md:text-xl'
    : 'text-[24px]';

  return (
    <div
      ref={dropdownRef}
      onMouseDown={(e) => e.stopPropagation()}
      className={`relative ${width ?? 'w-full'}`}
    >
      {/* Hidden input for form validation */}
      {required && (
        <input
          type="text"
          required
          value={isDefault ? '' : currentSelection}
          onChange={() => { }}
          className="absolute opacity-0 h-0 w-0 pointer-events-none"
          tabIndex={-1}
        />
      )}

      {/* Button */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className={buttonStyles}
        style={{ color: isDefault ? (variant === 'form' ? "#6d7a80" : "#7b8a99") : "#0D294D" }}
      >
        {currentSelection}
        {variant === 'form' && (
          <FontAwesomeIcon
            icon={faCaretDown}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-[#0D294D] pointer-events-none"
          />
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className={`${dropdownStyles} custom-scrollbar flex flex-col`}
          style={{ maxHeight: maxHeight || (variant === 'form' ? '300px' : '600px') }}
        >
          <ul className="flex flex-col gap-2 w-full">
            {items.map((item, i) => (
              <li
                key={i}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(item);
                }}
                className={`
                  ${itemStyles} cursor-pointer transition select-none px-4 py-2 w-full text-center flex justify-center items-center

                  ${currentSelection === item
                    ? "sel text-[#848d98] relative font-medium"
                    : "text-[#6d7a80] hover:text-[#0D294D] hover:bg-gray-50"
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
