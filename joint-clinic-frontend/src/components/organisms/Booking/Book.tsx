"use client";
import React, { useState, useEffect } from "react";
// import Button from "../atoms/Button";

// import Pagination from "../molecules/Pagination2";
// import Calendar from "../molecules/Calender";
import Button from "@/components/atoms/Button";
import Calendar from "@/components/molecules/Calendar";
import Pagination from "@/components/molecules/Pagination2";
import CustomSelect from "@/components/atoms/CustomSelect";
import "./book.css";
import { authApi } from "@/features/auth/api";

const Book = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const next = () => step < totalSteps && setStep(step + 1);
  const back = () => step > 1 && setStep(step - 1);
  
  useEffect(() => {
    const run = async () => {
      try {
        const user = await authApi.findUser("+201096766428");
        console.log("User:", user);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    run();
    console.log("Test222");
  }, []);

  return (
    <div id="book" className="min-h-screen w-full flex flex-col items-center justify-start bg-[#edf7f9] pb-10">

      {/* MAIN CONTAINER */}
      <div
        className="
        w-[95%] max-w-[1700px]
        h-full md:h-[95%]
        bg-[#fff] 
        shadow-[0px_25px_60px_rgba(30,85,152,0.15)]
        rounded-[20px] sm:rounded-[32px] md:rounded-[48px]
        flex flex-col items-center my-auto
        py-2 md:py-4
      "
      >

        {/* TITLE */}
        <h2
          className="
          text-[9vw] text-[27px] sm:text-[25px] xsm:text-[20px] md:text-[80px]
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
            w-[92%] md:w-[85%] bg-[#fff]            
            mt-2 sm:mt-4 md:mt-2
            rounded-[18px] sm:rounded-[22px] md:rounded-[32px]
            p-[30px] sm:p-5 md:p-8
            flex flex-col justify-between
            min-h-[300px] sm:min-h-[350px] md:min-h-[400px]
            ${step === 3 ? "" : "shadow-[0px_20px_60px_rgba(30,85,152,0.15)]"}
          `}
        >

          {/* STEP 1 */}
          {step === 1 && (
            <div className="flex flex-col items-center justify-between  min-h-[300px] sm:min-h-[350px] md:min-h-[400px] gap-5 w-full">
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
              <div className="left flex flex-col items-center lg:items-start w-[65%]">
                <h3 className="text-[22px] sm:text-[26px] md:text-[40px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center lg:text-left">
                  Select the date
                </h3>

                <p className="ll text-[#afafaf] text-[12px] sm:text-[14px] md:text-[20px] font-medium mb-2 text-center lg:text-left">
                  If you are already a member, please{" "}
                  <a href="#" className="text-[#1e5598] underline">sign in</a>{" "}
                  first
                </p>

                <div className="flex justify-center lg:justify-start w-full">
                  <Calendar />
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col gap-[30px] w-full items-center lg:items-start">

                <div className="w-full">
                  <h3 className="text-[22px] sm:text-[26px] md:text-[40px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center lg:text-left">
                    Choose your time slot
                  </h3>

                  <CustomSelect
                    items={["8:00 AM", "9:00 AM", "10:00 AM"]}
                    width="100%"
                    height="70px"
                    className="md:!w-[500px]"
                  />
                </div>

                <div className="text-center lg:text-left flex flex-col gap-[20px]">
                  <h3 className="text-[22px] sm:text-[26px] md:text-[40px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center lg:text-left">
                    Confirm your booking
                  </h3>

                  <pre className="text-[#1e5598] text-[14px] sm:text-[16px] md:text-[22px] font-bold leading-5 md:leading-6 max-w-[85vw] whitespace-pre-wrap break-words overflow-hidden">
                    Your session will be on:<span className="text-[#167c4f]">  Monday, January 2nd 2026 at 8:00 AM</span>
                  </pre>

                  <p className="text-[#9ca3af] leading-7 translate-x-4 text-[12px] sm:text-[14px] md:text-[20px] leading-5 mt-1 max-w-[100%] mx-auto lg:mx-0">
                    Please note that the bookings can be rescheduled or cancelled at
                    least 24 hours before the appointment
                  </p>

                  <div className="mt-3 flex justify-center lg:justify-center">
                    <Button text="Confirm" variant="primary" />
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* PAGINATION */}
        <div className="mt-4 mb-4">
          <Pagination total={totalSteps} current={step} onChange={setStep} />
        </div>

      </div>
    </div>
  );
};

export default Book;