import Image from "next/image";
import React from "react";
import "./YourSafety.css";
import { color } from "@/lib/constants/colors";

const YourSafety = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-12"
      style={{
          background: `linear-gradient(to bottom, #cfeaf1, ${color.primary})`
        }}
    >

      {/* FLEX CONTAINER */}
      <div className="mx-auto w-full flex flex-col md:flex-row items-center md:items-start max-w-[1400px] gap-10 md:gap-16">

        {/* LEFT TEXT SECTION */}
        <div className="flex-1 text-center md:text-left translate-y-[20px] md:translate-y-[40px]">

          {/* MAIN TITLE */}
          <h1
            className="
              text-[#0A1C32] 
              font-bold 
              leading-tight
              text-[8vw] 
              sm:text-[48px] 
              md:text-[56px] 
              lg:text-[64px]
              w-full
              mx-auto md:mx-0
            "
          >
            Your Safety,
            {/* BR only on large screens */}
            <span className="hidden lg:inline"><br /></span>
            <span className="lg:hidden"> </span>
            Our Priority
          </h1>

          {/* FEATURES LIST */}
          <div className="mt-6 space-y-6 w-full max-w-[600px] mx-auto md:mx-0">

            {/* FEATURE ITEM */}
            <div className="flex items-start gap-4 feature-item">
              <div className="text">

                <h2
                  className="
                    text-white
                    font-bold
                    text-[6vw]
                    sm:text-[28px]
                    md:text-[32px]
                    leading-tight
                  "
                >
                  HIPAA-Compliant Platform
                </h2>

                <p
                  className="
                    text-white 
                    font-medium 
                    mt-1
                    text-[4vw]
                    sm:text-[18px]
                    md:text-[20px]
                  "
                >
                  Full compliance with healthcare data standards.
                </p>

              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex-1 flex justify-center md:justify-center w-full">
          <img
            src="/swimmer.png"
            alt="Safety Image"
            className="
              w-full
              max-w-[750px]
              object-contain
            "
          />
        </div>

      </div>
    </div>
  );
};

export default YourSafety;
