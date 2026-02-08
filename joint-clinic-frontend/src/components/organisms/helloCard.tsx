"use client";
import React, { useState } from "react";
import Logo from "@/components/atoms/icons/Logo";

export default function HelloCard({ onGo, isLoading, error }: { onGo: (contact: string) => void; isLoading?: boolean; error?: string | null }) {
  const [inputValue, setInputValue] = useState("");
  const [localError, setLocalError] = useState("");

  const validate = (val: string) => {
    if (!val) {
      setLocalError("");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(val);

    // Validate phone: numeric, min 9 digits
    const cleanPhone = val.replace(/\D/g, '');
    const isPhone = cleanPhone.length >= 9;

    // Check if it looks like a phone (digits or +) but invalid length
    const isPhoneFormat = /^[\+]?[0-9]/.test(val);

    if (isEmail) {
      setLocalError("");
      return true;
    } else if (isPhoneFormat) {
      if (isPhone) {
        setLocalError("");
        return true;
      } else {
        setLocalError("Phone number must be at least 9 digits");
        return false;
      }
    } else if (val.trim().startsWith('HLC')) {
      setLocalError("");
      return true;
    }
    else {
      setLocalError("Please enter a valid email or phone number");
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    validate(val);
  }

  const isValid = !localError && inputValue.length > 0;

  return (
    <div className="w-full max-h-[80vh] flex md:justify-start md:ml-[4%] sm:justify-center sm:items-center px-4">
      <div className="relative w-full max-w-[800px]">

        {/* Logo */}
        <Logo
          fill="#112a4d"
          className="
            absolute 
            top-[10px] right-[10px] 
            w-[80px] h-[80px] 
            md:w-[150px] md:h-[150px] 
          "
        />

        {/* Card */}
        <div
          className="
            bg-[#fff] rounded-[35px] shadow-lg 
            w-full 
            max-h-[90vh]
            md:rounded-[55px] 
            md:w-[860px] md:h-[750px] 
            p-6 md:p-8 
            flex flex-col items-center justify-center 
            gap-5 md:gap-6
          "
        >

          {/* Title */}
          <h2
            className="
              text-[40px] 
              md:text-[120px] 
              font-bold 
              bg-gradient-to-b from-[#0D294D] to-[#1E5598] 
              bg-clip-text 
              text-transparent 
              tracking-wide 
              my-0 
              text-center
            "
          >
            HELLO!
          </h2>

          {/* Subtitle */}
          <p
            className="
              text-center 
              bg-gradient-to-b from-[#0D294D] to-[#1E5598] 
              bg-clip-text text-transparent 
              tracking-wide 
              font-medium 
              text-[16px] leading-relaxed 
              md:text-[20px]
              px-3
            "
          >
            Let’s get you started. Please enter your phone number or email.
          </p>

          {/* Error */}
          {(error || localError) && (
            <p className="text-red-500 text-center mt-2 font-medium">
              {localError || error}
            </p>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isValid) onGo(inputValue);
            }}
            className="w-full flex flex-col items-center"
          >
            {/* Input */}
            <input
              type="text"
              placeholder="Email Address Or Phone number"
              value={inputValue}
              onChange={handleChange}
              disabled={isLoading}
              required
              className={`
                w-[90%] 
                md:w-[67%] 
                mt-2 
                px-4 py-3 
                border rounded-[40px] 
                outline-none 
                text-gray-800 
                text-[15px] 
                md:text-[20px]
                ${localError ? 'border-red-500' : 'border-[#000]'} 
                text-center 
                bg-gradient-to-b from-[#0D294D] to-[#1E5598]
                bg-clip-text text-transparent 
                tracking-wide 
                focus:border-[#1E5598] 
                focus:ring-2 focus:ring-[#1E5598]/40 
                transition-all duration-300
                disabled:opacity-60 disabled:cursor-not-allowed
              `}
            />

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className={`
                w-[180px] h-[50px] 
                md:w-[220px] md:h-[60px] 
                cursor-pointer 
                py-3 
                bg-[#ea392f] 
                text-white 
                rounded-full 
                font-semibold 
                mt-4 
                hover:bg-[#d23229] 
                transition-all duration-300
                ${(isLoading || !isValid) ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isLoading ? "Loading..." : "Go"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
