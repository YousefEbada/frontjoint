"use client";

import OutlinedCircle from "../icons/OutlinedCircle";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CorneredBoxes from "../atoms/CorneredBoxes";
import { color } from "@/lib/constants/colors";

export default function WhatOurPatientsSay() {
  const wrapperRef = useRef(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    const totalWidth = track?.scrollWidth ?? 0;
    const scrollAmount = totalWidth - window.innerWidth + 560;

    gsap.to(track, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: `+=${totalWidth + 560}`,
        scrub: true,
        pin: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((s) => s.kill());
  }, []);

  const testimonials = [
    { text: "The exercise videos are clear and easy to follow..." },
    { text: "I felt supported throughout my recovery..." },
    { text: "Being able to repeat exercises at home..." },
    { text: "The platform helped me stay consistent..." },
    { text: "I loved how every exercise was broken down..." },
    { text: "The videos made complex movements feel easy..." },
    { text: "Having everything accessible at home saved me..." },
    { text: "The clarity of the videos and instructions..." },
    { text: "I appreciated how the program kept things simple..." },
    { text: "The exercises were exactly what I needed..." },
    { text: "This helped me stay committed to my therapy..." },
    { text: "The platform made recovery so much easier..." },
  ];

  return (
    <section
      ref={wrapperRef}
      className="relative w-full h-screen overflow-hidden bg-[#cae8ef] flex items-center justify-start"
    >
      {/* Circle + Title */}
      <div
        className="
          absolute 
          top-1/2 -translate-y-1/2 
          left-6 md:left-12 lg:left-20 
          flex flex-col items-start 
          z-0
        "
      >
        <OutlinedCircle className="w-[160px] md:w-[260px] lg:w-[300px]" />

        <h1
          className="
            absolute 
            text-[7vw] sm:text-[32px] md:text-[48px] lg:text-[60px]
            font-bold
            mt-2
          "
          style={{ color: color.success }}
        >
          What Our Patients Say
        </h1>
      </div>

      {/* Cards Track */}
      {/* center cards in page in small screens */}
      <div
        ref={trackRef}
        className="
          grid 
          grid-flow-col 
          md:grid-rows-3 
          auto-cols-[85vw] 
          sm:auto-cols-[60vw]
          md:auto-cols-[33vw]
          lg:auto-cols-[28vw]
          gap-6 
          w-max 
          h-full 
          px-10 md:px-20           
          justify-items-center
          items-center
          py-24          
        "
      >
        {testimonials.map((t, i) => {
          // تحديد الصف 0 أو 1 أو 2
          const row = i % 3;

          // *** التعديل المطلوب فقط ***
          let desktopOffset = "";
          if (row === 1) desktopOffset = "md:-translate-x-[-300px]"; // middle row shifted LEFT ONLY

          return (
            // fixed width and height for each tistememonial card
            <CorneredBoxes
              key={i}
              type="section"
              className={`
                ${desktopOffset}
                mx-auto 
                p-4 sm:p-6 md:p-7 lg:p-8
                rounded-[14px] sm:rounded-[18px] md:rounded-[20px]
                bg-white shadow-[0px_8px_24px_rgba(0,0,0,0.08)]                
                flex flex-col justify-between items-center
                w-full transform translate-x-[500px]
                h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px]                
              `}
            >
              <h1
                className="
                  text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]
                  font-bold leading-snug mb-2
                "
                style={{ color: color.success }}
              >
                {t.text}
              </h1>

              <p
                className="
                  text-black
                  text-[12px] sm:text-[14px] md:text-[16px]
                  leading-relaxed
                "
              >
                {t.text}
              </p>
            </CorneredBoxes>
          );
        })}
      </div>
    </section>
  );
}
