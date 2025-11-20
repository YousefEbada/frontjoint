"use client";
import React, { useState } from "react";
import Button from "../atoms/button";
import CustomSelect from "../atoms/CustomSelect";
import Pagination from "../molecules/pagination";
import Calendar from "../molecules/calender";

const Book = () => {
  const [step, setStep] = useState(1);

  const totalSteps = 3;

  const next = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="h-[110vh] w-full flex flex-col items-center justify-start bg-[#edf7f9] pb-20">
      {/* Container */}
      <div className="contain w-[95%] max-w-[1700px] h-[90%] bg-white shadow-[0px_25px_60px_rgba(30,85,152,0.15)] rounded-[48px] flex flex-col items-center mt-10 pb-10">
        {/* Title */}
        <h2 className="text-[9vw] md:text-[120px] font-bold mt-[40px] bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent drop-shadow-md text-center">
          Book Your Session now
        </h2>

        {step === 1 || step === 2 ? (
          <p className="text-[#afafaf] text-[18px] md:text-[24px] font-medium">
            If you are already a member, please{" "}
            <a href="#" className="text-[#1e5598]">
              sign in
            </a>{" "}
            first
          </p>
        ) : null}

        {/* BOX — FIXED PAGINATION */}
        <div className="box relative w-[90%] md:w-[80%] bg-white shadow-[0px_20px_60px_rgba(30,85,152,0.15)] rounded-[32px] flex flex-col items-between justify-between pt-10 pb-32 min-h-[500px]">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="flex flex-col items-center gap-6 w-full">
              <h3 className="text-[32px] md:text-[48px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent">
                Choose The Branch
              </h3>

              <CustomSelect
                items={["Branch", "Branch 1", "Branch 2"]}
                width="600px"
                height="90px"
              />

              <Button text="Next" variant="primary" onClick={next} />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="flex flex-col items-center gap-10 w-full">              
              <div className="w-full flex flex-col items-center gap-8">
                {/* Injury */}
                <h3 className="text-[32px] md:text-[48px] text-center font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent">
                  Choose The Injury
                </h3>
                <CustomSelect
                  items={["Injury", "Injury 1", "Injury 2"]}
                  width="600px"
                  height="90px"
                />

                {/* Doctor */}
                <h3 className="text-[32px] md:text-[48px] text-center font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent">
                  Choose The Doctor
                </h3>
                <CustomSelect
                  items={["Doctor", "Doctor 1", "Doctor 2"]}
                  width="600px"
                  height="90px"
                />
              </div>

              <Button text="Next" variant="primary" onClick={next} />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-20">
              {/* LEFT — CALENDAR */}
              <div className="flex flex-col items-start text-left">
                <h3 className="text-[32px] md:text-[40px] font-bold text-[#0D294D] mb-2">
                  Select the date
                </h3>
                <p className="text-[#afafaf] text-[16px] md:text-[20px] font-medium mb-4">
                  If you are already a member, please{" "}
                  <a href="#" className="text-[#1e5598]">
                    sign in
                  </a>{" "}
                  first
                </p>

                <Calendar />
              </div>

              {/* DIVIDER */}
              <div className="hidden lg:block w-[2px] h-[350px] bg-[#e2e8f0] rounded-full"></div>

              {/* RIGHT — TIME SLOT */}
              <div className="flex flex-col gap-8 w-full lg:w-[450px]">
                <div>
                  <h3 className="text-[32px] md:text-[40px] font-bold text-[#0D294D] mb-4">
                    Choose your time slot
                  </h3>
                  <CustomSelect
                    items={["8:00 Am", "9:00 Am", "10:00 Am"]}
                    width="500px"
                    height="80px"
                  />
                </div>

                {/* Confirm */}
                <div>
                  <h3 className="text-[32px] md:text-[40px] font-bold text-[#0D294D]">
                    Confirm your booking
                  </h3>

                  <p className="font-medium text-[#0D294D] text-[18px] md:text-[22px]">
                    Your Session will be on:{" "}
                    <span className="text-[#167c4f]">
                      Monday, January 2nd 2026 at 8:00 AM
                    </span>
                  </p>

                  <p className="text-[#9ca3af] text-[14px] md:text-[16px] leading-6 mt-2">
                    Please note that the bookings can be rescheduled or
                    cancelled at least 24 hours before the appointment.
                  </p>

                  <Button text="Confirm" variant="primary" />
                </div>
              </div>
            </div>
          )}

          {/* ABSOLUTE PAGINATION */}
          {/* Back Button (only step 3) */}        
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          </div>
        </div>
            <Pagination
              total={totalSteps}
              current={step}
              onChange={(page) => setStep(page)}
            />
      </div>
    </div>
  );
};

export default Book;
