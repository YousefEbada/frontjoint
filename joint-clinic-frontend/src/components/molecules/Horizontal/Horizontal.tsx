"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { color } from "@/lib/constants/colors";

const scrollCalculator = (totalWidth: number) => {
    return totalWidth > 768 ? totalWidth - window.innerWidth + 500 : totalWidth - window.innerWidth - 300;
}
export default function HorizontalScroll() {
    const wrapperRef = useRef(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const wrapper = wrapperRef.current;
        const track = trackRef.current;

        const totalWidth = track?.scrollWidth ?? 0;
        const scrollAmount = scrollCalculator(totalWidth);
        console.log("Total Width:", totalWidth);
        console.log("Scroll Amount:", scrollAmount);

        gsap.to(track, {
            x: -scrollAmount,
            ease: "none",

            scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: `+=${totalWidth}`, // scroll length equals total width of horizontal items
                scrub: true,
                pin: true, // freeze section → convert scroll to horizontal
                pinSpacing: true,
            }
        });

        return () => ScrollTrigger.getAll().forEach(st => st.kill());
    }, []);

    const cards = [
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
            style={{
                backgroundColor: color.secondary
            }}
        >
            {/* Background image */}
            <div className="absolute transform uppercase translate-y-full inset-0 h-20 sm:h-30 object-cover z-0 w-[500px] md:w-[700px] top-50 mr-[300px] md:ml-[150px] flex items-center">
                <div
                    style={{
                        // height: "400px",
                        // width: "400px",
                        backgroundImage: "url('./planet.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    className="w-[360px] md:w-[400px] h-[360px] md:h-[400px] "
                >
                    <h1 className="text-[#FDB515] font-bold absolute text-[42px] md:text-[64px] font-bold left-10 right-[-40px]">What’s New
                        <br />at Joint Clinic</h1>
                </div>
            </div>

            {/* Horizontal scrollable content */}
            <div
                ref={trackRef}
                className="flex h-full top-[26%] md:top-[8%] md:left-[20%] w-max relative z-10 mt-30 items-start pl-100"
            >
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="w-[326px] h-[360px] md:w-[977px] md:h-[580px] rounded-[35px] border [border-image:radial-gradient(circle_at_center,_rgba(255,255,255,1),_rgba(255,255,255,0))_1] backdrop-blur-[17px] border-2 m4-[36px] md:mr-[70px] text-center flex flex-col items-start justify-between py-[2%] px-[1%] gap-10  md:gap-50 pt-10 ml-4  bg-[rgba(255,255,255,0.4)]">
                        <h1 className="text-[36px] md:text-[64px] uppercase font-bold text-white">{card.title}</h1>
                        <p className="text-[white] text-[16px] md:text-[20px] font-bold">{card.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
