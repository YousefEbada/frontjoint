"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
export function usePinSection(sectionRef: React.RefObject<HTMLElement>) {
  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "clamp(top top)",
      end: "+=350%",
      pin: true,
      scrub: false,
      pinSpacing: true,
    });
    // return () => {
    //   try {
    //     st.kill();
    //     ScrollTrigger.getAll().forEach((s) => s.kill());
    //   } catch {}
    // };
  }, [{scope: sectionRef}]);
}
