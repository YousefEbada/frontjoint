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
        const scrollAmount = totalWidth - window.innerWidth + 560 ;

        gsap.to(track, {
            x: -scrollAmount,
            ease: "none",

            scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: `+=${totalWidth + 560}`, // scroll length equals total width of horizontal items
                scrub: true,
                pin: true, // freeze section → convert scroll to horizontal
            }
        });

        return () => ScrollTrigger.getAll().forEach(st => st.kill());
    }, []);

  const testimonials = [
  {
    text: "The exercise videos are clear and easy to follow. Having them available at home really helped me recover faster after my knee injury.",
    author: "Ahmed K.",
    role: "Patient"
  },
  {
    text: "I felt supported throughout my recovery. The guided routines made it easier to stick to my schedule and improve steadily.",
    author: "Mona R.",
    role: "Patient"
  },
  {
    text: "Being able to repeat exercises at home boosted my confidence. The instructions were simple and effective.",
    author: "Hassan T.",
    role: "Patient"
  },
  {
    text: "The platform helped me stay consistent with my rehabilitation plan. I noticed improvements much faster than expected.",
    author: "Sara L.",
    role: "Patient"
  },
  {
    text: "I loved how every exercise was broken down step by step. It made my recovery journey smooth and stress-free.",
    author: "Omar A.",
    role: "Patient"
  },
  {
    text: "The videos made complex movements feel easy. I could finally follow my physio plan without worrying about doing things wrong.",
    author: "Nour M.",
    role: "Patient"
  },
  {
    text: "Having everything accessible at home saved me a lot of time and helped me stay disciplined with my routine.",
    author: "Ali F.",
    role: "Patient"
  },
  {
    text: "The clarity of the videos and instructions made such a difference. I felt progress from the very first week.",
    author: "Yasmin H.",
    role: "Patient"
  },
  {
    text: "I appreciated how the program kept things simple. It made recovering from my shoulder injury much less overwhelming.",
    author: "Khaled S.",
    role: "Patient"
  },
  {
    text: "The exercises were exactly what I needed. Easy to follow and effective—my mobility improved way faster.",
    author: "Reem A.",
    role: "Patient"
  },
  {
    text: "This helped me stay committed to my therapy. The guided videos made it feel like my physio was right there with me.",
    author: "Youssef M.",
    role: "Patient"
  },
  {
    text: "The platform made recovery so much easier. The step-by-step exercises helped reduce my pain and strengthen my knee again.",
    author: "Laila G.",
    role: "Patient"
  }
];


  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-[#cae8ef]"
      ref={wrapperRef}
    >
        <div className="absolute inset-0  h-[48vh] aspect-square object-cover z-0 top-[40vh] ml-2 flex items-center">
                <OutlinedCircle
                />
                <h1 className="absolute left-10  right-[-40px] text-6xl font-bold" style={{color:color.success}}>What Our Patients Say</h1>
        </div>
    <div
  ref={trackRef}
  className="
    grid 
    grid-rows-3 
    grid-flow-col 
    auto-cols-[36vw] 
    gap-6 
    h-full 
    w-max 
    relative 
    z-10 
    mt-30 
    pl-120 
    pr-140 
    overflow-hidden
  "
>
  {testimonials.map((testimonial, index) => {
    // Determine which row the item belongs to (0,1,2)
    const row = index % 3;

    // Apply staggered effect based on row number
    const stagger =
      row === 1
        ? "" // middle row shifted left
        : row === 2
        ? "translate-x-[6%]" // bottom row shifted right
        : "translate-x-[12%]"; // top row normal

    return (
      <CorneredBoxes
        type="section"
        key={index}
        className={`w-full h-full ${stagger}`}
      >
        <h1 style={{ color: color.success }}>{testimonial.text}</h1>
        <p className="text-black">{testimonial.text}</p>
      </CorneredBoxes>
    );
  })}
</div>

    </section>
  );
}
