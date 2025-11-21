"use client";
import React from "react";
import Logo from "../icons/Logo";
import "./footer.css";

const Footer = () => {
  return (
    <footer
      className="
        w-[95%] 
        mx-auto 
        bg-[#0D294D] 
        text-white 
        pt-10 md:pt-16 
        pb-8 md:pb-12
        rounded-t-[30px] md:rounded-t-[40px] 
        mt-12 md:mt-20
        overflow-hidden
      "
    >
      <div className="px-4 sm:px-8 md:px-12 lg:px-20">

        {/* TOP SECTION */}
        <div className="
          flex flex-col md:flex-row md:items-start 
          gap-8 md:gap-14
        ">

          {/* LOGO */}
          <div className="flex justify-center md:block">
            <Logo
              fill="white"
              className="
                w-[150px] h-[60px]
                sm:w-[200px] sm:h-[80px]
                md:w-[240px] md:h-[100px]
                lg:w-[280px] lg:h-[110px]
                landscape:w-[150px] landscape:h-[60px]
              "
            />
          </div>

          {/* LINKS GRID */}
          <div
            className="
              grid
              w-full
              grid-cols-2 
              sm:grid-cols-3 
              lg:grid-cols-4
              gap-x-8 
              gap-y-10 sm:gap-y-14 
              text-[13px] sm:text-[15px] md:text-[17px]
              mt-4
              landscape:grid-cols-2
              landscape:gap-y-6
            "
          >
            <ul className="space-y-3 sm:space-y-5 md:space-y-7 landscape:space-y-3">
              <li className="lnk">Who We Are</li>
              <li className="lnk">Why Choose Us</li>
              <li className="lnk">How It Works</li>
              <li className="lnk">Testimonials</li>
            </ul>

            <ul className="space-y-3 sm:space-y-5 md:space-y-7 landscape:space-y-3">
              <li className="lnk">Sign Up</li>
              <li className="lnk">Login</li>
              <li className="lnk">Book an appointment</li>
            </ul>

            <ul className="space-y-3 sm:space-y-5 md:space-y-7 landscape:space-y-3">
              <li className="lnk">For Partners</li>
              <li className="lnk">For Business</li>
              <li className="lnk">Join Our Team</li>
            </ul>

            <ul className="space-y-3 sm:space-y-5 md:space-y-7 landscape:space-y-3">
              <li className="lnk">Terms & Conditions</li>
              <li className="lnk">Privacy Policy</li>
              <li className="lnk">FAQs</li>
              <li className="lnk">Contact Us</li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="
          w-full text-center 
          text-[#97A3B6] 
          mt-10 text-[13px] sm:text-[15px]
          landscape:mt-6
        ">
          © 2025 Joint. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
