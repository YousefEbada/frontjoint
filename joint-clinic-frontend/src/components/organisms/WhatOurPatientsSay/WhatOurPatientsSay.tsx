"use client";

import OutlinedCircle from "@/components/atoms/icons/OutlinedCircle";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import { color } from "@/lib/constants/colors";
import Typography from "@/components/atoms/Typography";

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
    { name: "Sarah Johnson", role: "Patient", comment: "The exercise videos are clear and easy to follow..." },
    { name: "Michael Brown", role: "Patient", comment: "I felt supported throughout my recovery..." },
    { name: "Emma Williams", role: "Patient", comment: "Being able to repeat exercises at home..." },
    { name: "James Miller", role: "Patient", comment: "The platform helped me stay consistent..." },
    { name: "Olivia Davis", role: "Patient", comment: "I loved how every exercise was broken down..." },
    { name: "Daniel Harris", role: "Patient", comment: "The videos made complex movements feel easy..." },
    { name: "Noah Wilson", role: "Patient", comment: "Having everything accessible at home saved me..." },
    { name: "Ava Thompson", role: "Patient", comment: "The clarity of the videos and instructions..." },
    { name: "Liam Anderson", role: "Patient", comment: "I appreciated how the program kept things simple..." },
    { name: "Sophia Martinez", role: "Patient", comment: "The exercises were exactly what I needed..." },
    { name: "Benjamin Clark", role: "Patient", comment: "This helped me stay committed to my therapy..." },
    { name: "Mia Robinson", role: "Patient", comment: "The platform made recovery so much easier..." },
  ];

  return (
    <section id="reviews"
      ref={wrapperRef}
      className="relative w-full h-screen overflow-hidden bg-[#cae8ef] flex items-center justify-start"
    >
      {/* Circle + Title */}
      <div
        className="
          absolute 
          top-1/6 sm:top-1/2 sm:-translate-y-1/2 
          left-6 md:left-12 lg:left-20 
          flex flex-col items-start justify-center
          z-0
        "
      >
        <OutlinedCircle className="w-[300px] md:w-[400px]" />

        <Typography
          variant="heading1"
          className="absolute w-[200px] md:w-[400px] font-bold mt-2 text-center"
          style={{ color: color.success }}
          text="What Our Patients Say"
        />
      </div>

      {/* Cards Track */}
      <div
        ref={trackRef}
        className="
          grid 
          grid-flow-col 
          grid-rows-3        /* <-- الآن 3 صفوف لكل الشاشات */
          auto-cols-[85vw] 
          sm:auto-cols-[60vw]
          md:auto-cols-[33vw]
          lg:auto-cols-[28vw]
          gap-x-6
          gap-y-[-1000px] sm:gap-y-[-10px]
          w-max 
          sm:h-full 
          px-10 md:px-20           
          justify-items-center
          items-center
          py-24
          pb-4
          h-[80%]
          self-end
        "
      >
        {testimonials.map((t, i) => {
          const row = i % 3;

          /* حل كامل للـ offset */
          let Offset = "translate-x-[800px]"; // default value

          if (row === 1) {
            Offset = "translate-x-[500px]"; // middle row shift
          }

          return (
            <CorneredBoxes
              key={i}
              type="section"
              className={`
                ${Offset}
                ${Offset}
                mx-auto 
                p-4 sm:p-6 md:p-7 lg:p-8
                rounded-[14px] sm:rounded-[18px] md:rounded-[20px]
                 shadow-[0px_8px_24px_rgba(0,0,0,0.08)]                
                flex flex-col justify-between items-center
                w-full 
                h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px]                
              `}
            >
              <Typography
                variant="bodyBold"
                className="font-bold leading-snug mb-2 text-center"
                style={{ color: color.success }}
                text={t.comment}
              />

              <Typography
                variant="subheader"
                className="text-black leading-relaxed"
                text={
                  <>
                    <span className="font-bold">{t.name}, </span>{t.role}
                  </>
                }
              />
            </CorneredBoxes>
          );
        })}
      </div>
    </section>
  );
}
