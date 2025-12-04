"use client"
import React, { useState } from "react";
import CustomSelect from "@/components/atoms/CustomSelect";
import Calendar from "@/components/molecules/Calendar";
import Button from "@/components/atoms/Button";

const Book = () => {
  const [step, setStep] = useState(1);

  const next = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div id="book" className="h-screen w-full flex flex-col items-center justify-start bg-[#edf7f9] pb-10">

      {/* MAIN CONTAINER */}
      {/* MAIN CONTAINER */}
      <div
        className="
        w-[95%] max-w-[1700px]
        h-full md:h-[95%]
        bg-[#fff] 
        shadow-[0px_25px_60px_rgba(30,85,152,0.15)]
        rounded-[20px] sm:rounded-[32px] md:rounded-[48px]
        flex flex-col items-center my-auto
        py-2 md:py-10
      "
      >

        {/* TITLE */}
        <h2
          className="
          text-[9vw] text-[27px] sm:text-[25px] xsm:text-[20px] md:text-[120px]
          font-bold 
          bg-gradient-to-b from-[#0D294D] to-[#1E5598]
          bg-clip-text text-transparent 
          text-center leading-tight
        "
        >
          Book Your Session Now
        </h2>

        {/* SUBTEXT */}
        {(step === 1 || step === 2) && (
          <p
            className="
            text-[#afafaf]
            text-[12px] sm:text-[14px] md:text-[22px]
            font-medium
            text-center
          "
          >
            If you are already a member, please{" "}
            <a href="#" className="text-[#1e5598] underline">
              sign in
            </a>{" "}
            first
          </p>
        )}

        {/* MAIN BOX */}
        <div
          className={`
            relative 
            w-[92%] md:w-[80%]
            bg-white
            mt-2 sm:mt-4 md:mt-10
            rounded-[18px] sm:rounded-[22px] md:rounded-[32px]
            p-[30px] sm:p-5 md:p-10
            flex flex-col justify-between
            min-h-[300px] sm:min-h-[350px] md:min-h-[400px]
            ${step === 3 ? "" : "shadow-[0px_20px_60px_rgba(30,85,152,0.15)]"}
          `}
        >

          {/* STEP 1 */}
          {step === 1 && (
            <div className="flex flex-col items-center justify-between h-full gap-5 w-full">
              <h3 className="text-[22px] sm:text-[28px] md:text-[48px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent">
                Choose The Branch
              </h3>

              {/* Large screens: fixed width — Small screens: full width */}
              <div className="w-full flex justify-center">
                <CustomSelect
                  items={["Branch", "Branch 1", "Branch 2"]}
                  width="100%"
                  height="70px"
                  className="md:!w-[600px]"
                />
              </div>

              <Button text="Next" variant="primary" onClick={next} />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="flex flex-col items-center gap-6 w-full">

              <h3 className="text-[22px] sm:text-[28px] md:text-[48px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center">
                Choose The Injury
              </h3>

              <CustomSelect
                items={["Injury", "Injury 1", "Injury 2"]}
                width="100%"
                height="70px"
                className="md:!w-[600px]"
              />

              <h3 className="text-[22px] sm:text-[28px] md:text-[48px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center">
                Choose The Doctor
              </h3>

              <CustomSelect
                items={["Doctor", "Doctor 1", "Doctor 2"]}
                width="100%"
                height="70px"
                className="md:!w-[600px]"
              />

              <Button text="Next" variant="primary" onClick={next} />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 md:gap-16">

              {/* LEFT SIDE */}
              <div className="flex flex-col items-center lg:items-start w-full">
                <h3 className="text-[22px] sm:text-[26px] md:text-[40px] font-bold text-[#0D294D] text-center lg:text-left">
                  Select the date
                </h3>

                <p className="text-[#afafaf] text-[12px] sm:text-[14px] md:text-[20px] font-medium mb-2 text-center lg:text-left">
                  If you are already a member, please{" "}
                  <a href="#" className="text-[#1e5598] underline">sign in</a>{" "}
                  first
                </p>

                <div className="flex justify-center lg:justify-start w-full">
                  <Calendar />
                </div>
              </div>

              {/* DIVIDER */}
              <div className="hidden lg:block w-[2px] h-[300px] bg-[#e2e8f0] rounded-full"></div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col gap-6 w-full lg:w-[450px] items-center lg:items-start">

                <div className="w-full">
                  <h3 className="text-[22px] sm:text-[26px] md:text-[40px] font-bold text-[#0D294D] text-center lg:text-left">
                    Choose your time slot
                  </h3>

                  <CustomSelect
                    items={["8:00 AM", "9:00 AM", "10:00 AM"]}
                    width="100%"
                    height="70px"
                    className="md:!w-[500px]"
                  />
                </div>

                <div className="text-center lg:text-left">
                  <h3 className="text-[22px] sm:text-[26px] md:text-[40px] font-bold text-[#0D294D]">
                    Confirm your booking
                  </h3>

                  <p className="text-[#0D294D] text-[14px] sm:text-[16px] md:text-[22px] font-medium leading-5 md:leading-6">
                    Your session will be on:{" "}
                    <span className="text-[#167c4f]">Monday, January 2nd 2026 at 8:00 AM</span>
                  </p>

                  <p className="text-[#9ca3af] text-[12px] sm:text-[14px] md:text-[18px] leading-5 mt-1 max-w-[260px] mx-auto lg:mx-0">
                    Bookings can be rescheduled or cancelled at least 24 hours before the appointment.
                  </p>

                  <div className="mt-3 flex justify-center lg:justify-start">
                    <Button text="Confirm" variant="primary" />
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Book;
