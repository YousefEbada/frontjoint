"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HorizontalScroll() {
    const wrapperRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const wrapper = wrapperRef.current;
        const track = trackRef.current;

        const totalWidth = track?.scrollWidth;
        const scrollAmount = totalWidth - window.innerWidth;

        gsap.to(track, {
            x: -scrollAmount,
            ease: "none",

            scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: `+=${totalWidth}`, // scroll length equals total width of horizontal items
                scrub: true,
                pin: true, // freeze section → convert scroll to horizontal
            }
        });

        return () => ScrollTrigger.getAll().forEach(st => st.kill());
    }, []);

    let cards = [
        {
            title: "Holiday Hours Update",
            desc: "Our clinic will be closed on Friday, Sept 25, for maintenance. Online services remain available"
        },
        {
            title: "New Specialist Joined",
            desc: "We are excited to welcome Dr. Smith, a renowned orthopedic specialist, to our team."
        },
        {
            title: "Flu Vaccination Drive",
            desc: "Get your flu shot at our clinic starting October 1st. Walk-ins welcome!"
        },
        {
            title: "Wellness Workshop",
            desc: "Join us on Oct 15 for a free workshop on injury prevention and wellness tips."
        }
    ]

    return (
        <section
            ref={wrapperRef}
            className="relative h-screen w-full overflow-hidden"
        >
            {/* Background image */}
            <div className="absolute inset-0 h-50 object-cover z-0 w-50 top-50 ml-2 flex items-center">
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        backgroundImage: "url('./planet.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h1 className="text-3xl text-[#FDB515] font-bold absolute left-10 right-[-40px]">What’s New
                        at Joint Clinic</h1>
                </div>
            </div>

            {/* Horizontal scrollable content */}
            <div
                ref={trackRef}
                className="flex h-full w-max relative z-10 mt-30 items-start pl-60"
            >
                {cards.map((card, index) => (
                    <div 
                    key={index}
                    className="w-[650px] h-[380px] rounded-xl border border-gray-300 border-2 text-center flex flex-col items-center gap-50 pt-10 ml-4 bg-[#7099C0]">
                        <h1 className="text-4xl font-bold text-white">{card.title}</h1>
                        <p className="text-white">{card.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
