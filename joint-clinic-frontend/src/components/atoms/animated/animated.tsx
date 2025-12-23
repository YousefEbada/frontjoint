"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Stage } from "@react-three/drei";
import { Suspense, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
// import { PlaneModel } from "./PlaneModel";
import "./animated.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function SceneContent() {
  const planeRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useGSAP(() => {
    if (!planeRef.current) return;

    gsap.fromTo(
      planeRef.current.rotation,
      { x: 0, y: -Math.PI / 2, z: 0 },
      {
        x: Math.PI / 2,
        y: Math.PI,
        z: Math.PI / 4,
        scrollTrigger: {
          trigger: "#scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      }
    );

    gsap.fromTo(
      planeRef.current.position,
      { x: 3, y: -1, z: -3 },
      {
        x: -1,
        y: 1,
        z: 1,
        scrollTrigger: {
          trigger: "#scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      }
    );
  });

  return (
    <group ref={planeRef}>
      {/* <PlaneModel /> */}
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div id="scroll-container" className="h-[400vh] relative w-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="fixed inset-0"
      >
        <Suspense fallback={null}>
          <ScrollControls pages={4} damping={0.2}>
            <SceneContent />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
