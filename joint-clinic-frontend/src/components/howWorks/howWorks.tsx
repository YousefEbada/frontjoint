"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Pagination from "@/pages/pagination";

gsap.registerPlugin(ScrollTrigger);

const pages = [
  {
    title: "HOLIDAY HOURS UPDATE",
    desc: "Our clinic will be closed on Friday, Sept 25, for maintenance. Online services remain available.",
  },
  {
    title: "NEW SPECIALIST JOINS OUR TEAM",
    desc: "Welcome Dr. Hany, our new physiotherapy expert specializing in sports injury recovery.",
  },
  {
    title: "YOUR RECOVERY UPDATES",
    desc: "Learn about new features added to improve your recovery tracking.",
  },
  {
    title: "Effortless Recovery",
    desc: "Book physiotherapy sessions, access your medical reports, and follow your personalized exercise plan – all in one secure platform.",
  },
];

export default function HowWorks() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const steps = pages.length - 1;

    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });

      // rotate 90deg per step
      for (let i = 0; i < steps; i++) {
        tl.current!.to(circleRef.current, {
          rotate: "+=90",
          duration: 0.6,
          ease: "power2.inOut",
        });
      }

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${steps * 80}vh`, // much safer, prevents overflowing
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        animation: tl.current,
        snap:
          steps > 0
            ? {
                snapTo: 1 / steps,
                duration: { min: 0.2, max: 0.6 },
                ease: "power2.inOut",
              }
            : undefined,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * steps);
          setCurrent(idx);
        },
        invalidateOnRefresh: true,
      });

      tl.current.pause(0);
    }, wrapperRef);

    return () => {
      ctx.revert();
      ScrollTrigger.killAll();
      tl.current?.kill();
    };
  }, []);

  const goTo = (index: number) => {
    const steps = pages.length - 1;
    const targetProgress = index / steps;

    gsap.to(tl.current!, {
      progress: targetProgress,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => setCurrent(index),
    });
  };

  return (
    <section
      ref={wrapperRef}
      className="
        relative flex flex-col items-center justify-start 
        w-full 
        bg-[#f8fcfd] 
        overflow-hidden
        pt-16 md:pt-24
        pb-24 md:pb-32
      "
      style={{ minHeight: "100vh" }}
    >
      {/* Circle */}
      <div
        ref={circleRef}
        className="
          flex items-center justify-center 
          w-[180px] h-[180px]
          sm:w-[220px] sm:h-[220px]
          md:w-[260px] md:h-[260px]
          lg:w-[300px] lg:h-[300px]
          will-change-transform
        "
      >
        <Image
          src="/circle.png"
          width={260}
          height={260}
          alt="Circle"
          className="w-full h-full object-contain"
        />
      </div>

      {/* TEXT CONTENT */}
      <div className="mt-8 max-w-3xl text-center px-6 md:px-10" aria-live="polite">
        <h2
          className="
            text-[#0a1c32]
            font-bold
            leading-tight
            text-[32px]
            sm:text-[42px]
            md:text-[60px]
            lg:text-[72px]
          "
        >
          {pages[current].title}
        </h2>

        <p
          className="
            mt-4 text-[#167c4f]
            font-medium
            text-[16px]
            sm:text-[18px]
            md:text-[20px]
            leading-relaxed
          "
        >
          {pages[current].desc}
        </p>
      </div>

      {/* PAGINATION */}
      <div className="mt-10 md:mt-12">
        <Pagination total={pages.length} current={current} onChange={goTo} />
      </div>
    </section>
  );
}
