"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Pagination from "@/components/molecules/Pagination";
import Image from "next/image";

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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const steps = pages.length - 1;
    // Duration for the expansion animation relative to one step of rotation
    const expansionDuration = 1;
    // Duration for one rotation step
    const stepDuration = 1;

    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });

      // 1. Expansion Animation
      tl.current
        .to(sectionRef.current, {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          duration: expansionDuration,
          ease: "power2.inOut",
        })
        .to(
          [contentRef.current, paginationRef.current],
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3" // Overlap slightly with expansion end
        );

      // 2. Rotation Animation (Slider)
      for (let i = 0; i < steps; i++) {
        tl.current.to(circleRef.current, {
          rotate: "+=90",
          duration: stepDuration,
          ease: "power2.inOut",
        });
      }

      // Calculate total duration for progress mapping
      // Expansion + Fade (overlapped) + Steps
      // We treat the timeline as a sequence. 
      // The expansion part takes 'expansionDuration' time in the timeline.
      // The steps take 'steps * stepDuration' time.

      const totalTimelineDuration = tl.current.duration();

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=500%`, // Increased scroll distance
        scrub: true,
        pin: true,
        pinSpacing: true,
        animation: tl.current,
        snap: (value) => {
          // We only want to snap to the rotation steps, not the expansion part
          // Calculate where the rotation starts in terms of progress (0 to 1)
          const expansionProgress = expansionDuration / totalTimelineDuration;

          if (value < expansionProgress) {
            // If in expansion phase, maybe snap to start or end of expansion?
            // For now, let's just snap to 0 or expansion end
            return value < expansionProgress / 2 ? 0 : expansionProgress;
          }

          // Map the remaining progress to steps
          const progressInSteps = (value - expansionProgress) / (1 - expansionProgress);
          const stepProgress = 1 / steps;
          const currentStep = Math.round(progressInSteps / stepProgress);

          // Map back to total progress
          return expansionProgress + (currentStep * stepProgress * (1 - expansionProgress));
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const expansionProgress = expansionDuration / totalTimelineDuration;

          if (progress < expansionProgress) {
            setCurrent(0);
          } else {
            // Map remaining progress to steps
            const progressInSteps = (progress - expansionProgress) / (1 - expansionProgress);
            // Clamp index between 0 and steps
            const idx = Math.min(Math.max(Math.round(progressInSteps * steps), 0), steps);
            setCurrent(idx);
          }
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
    if (!tl.current) return;

    const steps = pages.length - 1;
    const expansionDuration = 1;
    const stepDuration = 1;
    const totalTimelineDuration = tl.current.duration();
    const expansionProgress = expansionDuration / totalTimelineDuration;

    // Calculate target progress
    // Start after expansion
    const progressInSteps = index / steps;
    const targetProgress = expansionProgress + (progressInSteps * (1 - expansionProgress));

    gsap.to(tl.current, {
      progress: targetProgress,
      duration: 1.2,
      ease: "power1.out",
      onComplete: () => setCurrent(index),
    });
  };

  return (
    <section className="min-h-screen flex items-end bg-gradient-to-b from-[#1E5598] via-[#1E5598] via-[#1E5598] to-[#1E5598] justify-center" id="how-it-works" ref={wrapperRef}>
      <section
        ref={sectionRef}
        id="animated-section"
        className="
        relative flex flex-col items-center justify-start 
        bg-[#f8fcfd] 
        overflow-hidden
        pt-16 md:pt-24
        pb-24 md:pb-32
        shadow-xl
        w-[33vw] h-[80vh] rounded-[40px]
      "
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
          style={{
            transition: "transform 0.1s ease-out",
          }}
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
        <div
          ref={contentRef}
          className="mt-8 max-w-3xl text-center px-6 md:px-10 opacity-0"
          aria-live="polite"
        >
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
        <div ref={paginationRef} className="mt-10 md:mt-12 opacity-0">
          <Pagination total={pages.length} current={current} onChange={goTo} />
        </div>
      </section>
    </section>
  );
}
