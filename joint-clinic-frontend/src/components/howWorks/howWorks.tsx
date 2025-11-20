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
  const circleRef = useRef<HTMLDivElement | null>(null); // wrapper div for transforms
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const steps = Math.max(0, pages.length - 1); // number of increments

    const ctx = gsap.context(() => {
      // timeline: each step increases rotation by 90deg
      tl.current = gsap.timeline({ paused: true });
      for (let i = 0; i < steps; i++) {
        // increment rotation by +90 for each step
        tl.current.to(circleRef.current, {
          rotate: "+=90",
          duration: 0.6,
          ease: "power2.inOut",
        });
      }

      // ScrollTrigger: pin for exactly `steps` viewports
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: () => `+=${pages.length * window.innerHeight}`,
        scrub: 0.6,
        pin: true,
        pinSpacing: true,
        animation: tl.current,
        // snap to discrete steps (0..1 mapped across steps)
        snap: steps > 0 ? {
          snapTo: 1 / steps,
          duration: { min: 0.15, max: 0.6 },
          ease: "power2.inOut",
        } : false,
        onUpdate: (self) => {
          // map progress to index 0..steps
          const idx = steps === 0 ? 0 : Math.round(self.progress * steps);
          setCurrent(idx);
        },
        invalidateOnRefresh: true,
        // markers: true, // enable for debugging
      });

      // make sure timeline starts at 0
      tl.current.pause(0);
    }, wrapperRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((s) => s.kill());
      tl.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // goTo specific page index (0-based). animate timeline progress to exact step.
  const goTo = (index: number) => {
    const steps = Math.max(1, pages.length - 1); // avoid div by zero
    const targetProgress = index / steps;
    // animate the timeline progress (this will rotate by 90deg per step)
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
      className="relative flex flex-col items-center justify-center w-full bg-[f8fcfd] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Circle wrapper (we transform this div) */}
      <div
        ref={circleRef}
        className="w-60 h-60 md:w-64 md:h-64 flex items-center justify-center will-change-transform"
        style={{ transform: "rotate(0deg)" }}
      >
        <Image src="/circle.png" width={240} height={240} alt="Circle" />
      </div>

      {/* Content area — text updates according to `current` */}
      <div className="content mt-8 max-w-4xl text-center px-6" aria-live="polite">
        <h2 className="text-[48px] md:text-[72px] font-bold text-[#0a1c32] leading-tight">
          {pages[current].title}
        </h2>
        <p className="mt-4 text-[18px] md:text-[20px] font-medium text-[#167c4f]">
          {pages[current].desc}
        </p>
      </div>

      {/* Pagination */}
      <div className="mt-12">
        <Pagination total={pages.length} current={current} onChange={goTo} />
      </div>
    </section>
  );
}
