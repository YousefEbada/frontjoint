"use client";
import React, { Activity, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Circle from "@/components/icons/Circle";
import Circle2Circles from "@/components/icons/Circle2Circles";
import RedLine from "@/components/icons/RedLine";
import Profile from "@/components/icons/Profile";
import FeatureCard from "../molecules/featureCard";

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const circle1Ref = useRef<HTMLDivElement | null>(null);
  const whoRef = useRef<HTMLDivElement | null>(null);
  const circle2Ref = useRef<HTMLDivElement | null>(null);
  const redRef = useRef<HTMLDivElement | null>(null);
  const teamRef = useRef<HTMLDivElement | null>(null);

  const [step, setStep] = useState(0);

  const memberinfo = [
    { name: "Bryan", major: "BranchChiropractor Aqiq Branch", fill: "#d5ece3" },
    {
      name: "Saad Al Omar",
      major: "Chiropractor Aqiq Branch",
      fill: "#167c4f",
    },
    {
      name: "Abdallah El Mahya",
      major: "Physiotherapy Specialist Aqiq Branch",
      fill: "#112a4d",
    },
    {
      name: "Mohammed Alzahrani",
      major: "Physiotherapy Specialist Aqiq Branch",
      fill: "#ee3124",
    },
    {
      name: "Aly El Sennedy",
      major: "Physiotherapy Specialist Aqiq Branch",
      fill: "#fdb515",
    },
  ];
  const cards = [
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
  // map progress -> step
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=350%", // adjust to taste; spacer should be end - 100vh
      scrub: true,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const p = self.progress;
        if (p < 0.2) setStep(0);
        else if (p < 0.4) setStep(1);
        else if (p < 0.6) setStep(2);
        else if (p < 0.8) setStep(3);
        else setStep(4);
      },
    });

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  // animate on step change — each step has its own short timeline
  useEffect(() => {
    // quick guard
    const c1 = circle1Ref.current;
    const c2 = circle2Ref.current;
    const w = whoRef.current;
    const r = redRef.current;
    const t = teamRef.current;

    if (!c1 || !c2 || !w || !r || !t) {
      return; // ✔ TS accepts this (void return)
    }

    // reset baseline for all (keeps layout stable)
    gsap.set([c1, c2, w, r, t], { clearProps: "all" });
    gsap.set([c1, c2, w, r, t], { opacity: 0, y: 0, scale: 1 });

    const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "none" } });

    if (step === 0) {
      tl.to(c1, { opacity: 1, scale: 1, y: 0 });
    }

    if (step === 1) {
      tl.to(c1, { opacity: 1, scale: 1, y: -50 }, 0);
      tl.to(w, { opacity: 1, y: 0 }, "<0.15");
    }

    if (step === 2) {
      tl.to(w, { opacity: 0, y: 20 }, 0);
      tl.to(c1, { opacity: 0, scale: 1, y: -50 }, 0.05);
      tl.fromTo(
        c2,
        { opacity: 0, scale: 1, y: -200 },
        { opacity: 1, scale: 1, y: -200 },
        "<0.05"
      );
    }

    if (step === 3) {
      tl.set(c2, { opacity: 1, scale: 1, y: -200 }, 0);
      tl.fromTo(r, { opacity: 0, y: 200 }, { opacity: 1, y: -180 }, "<0.05");
    }

    if (step === 4) {
      tl.set(c2, { opacity: 1, y: -200 }, 0);
      tl.set(r, { opacity: 1, y: -180 }, 0);
      tl.fromTo(t, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, "<0.15");
    }

    // ✔ CLEANUP FUNCTION (returns void)
    return () => {
      tl.kill();
    };
  }, [step]);

  return (
    <>
      <section ref={sectionRef} className="relative w-full min-h-screen">
        {/* stage: absolutely centered container — keeps DOM stable */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-3xl flex flex-col items-center">
            {/* Circle1: initial */}
            <div
              ref={circle1Ref}
              style={{ width: 230, height: 120 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Circle className="w-full h-full" />
            </div>

            {/* Who we are (centered) */}
            <div
              ref={whoRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center max-w-[680px]"
              style={{ transform: "translateY(-10px)" }}
            >
              <h2 className="text-[40px] md:text-[56px] font-bold">
                Who We Are
              </h2>
              <p className="mt-4 text-[16px] md:text-[18px]">
                At Joint Clinic, we believe recovery should be simple, secure,
                and effective.
              </p>
            </div>

            {/* Circle2 (morph target / crossfade) */}
            <div
              ref={circle2Ref}
              style={{ width: 230, height: 120 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Circle2Circles className="w-full h-full" />
            </div>

            {/* Red line (will animate from off-screen into bottom of circle2) */}
            <div
              ref={redRef}
              style={{ width: 200, height: 40 }}
              className="absolute left-1/2 -translate-x-1/2"
            >
              {/* position Y is animated via GSAP; initial placement below */}
              <RedLine className="w-full h-full" />
            </div>

            {/* Team (positioned visually below; will fade in on final step) */}
            <div
              ref={teamRef}
              className="absolute left-1/2 -translate-x-1/2 text-center"
              style={{ top: "62%" }}
            >
              <h1 className="text-[36px] md:text-[56px] font-bold mb-6">
                Meet Our Team
              </h1>
              <div className="grid w-max grid-cols-5 md:grid-cols-5 gap-6">
                {memberinfo.map((m, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <Profile fill={m.fill} className="w-[56px] mb-2" />
                    <h4 className="font-bold text-base">{m.name}</h4>
                    <p className="text-sm w-[140px] text-center">{m.major}</p>
                  </div>
                ))}
              </div>
            </div>
            <Activity mode="hidden">
              <div>
                <h2
                  className={`text-[40px] md:text-[64px] font-bold font-['IBM_Plex_Sans'] text-[#fff]`}
                >
                  Why Choose Us?
                </h2>
                <div className="cards mx-auto grid grid-cols-2 md:grid-cols-4">
                  {cards.map((card, index) => {
                    return (
                      <FeatureCard
                        key={index}
                        title={card.title}
                        description={card.desc}
                      />
                    );
                  })}
                </div>
              </div>
            </Activity>
          </div>
        </div>
      </section>

      {/* spacer to prevent overflow (end: 350% -> spacer = 250vh) */}
      {/* <div style={{ height: "250vh" }} /> */}
    </>
  );
}
