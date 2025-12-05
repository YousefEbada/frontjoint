"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./whoWeAre.css";
import Profile from "@/components/atoms/icons/Profile";
import FeatureCard from "@/components/molecules/FeatureCard";


gsap.registerPlugin(ScrollTrigger);

function WhoWeAre() {
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

  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const membersRef = useRef<HTMLElement>(null);
  const chooseUsRef = useRef<HTMLElement>(null);
  const centerCircleRef = useRef<HTMLDivElement>(null);
  const leftDotRef = useRef<HTMLDivElement>(null);
  const rightDotRef = useRef<HTMLDivElement>(null);
  const redLineRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const redLineMovingRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);

  const getRedLineWidth = (index: number) => {
    const cardWidth = 300;
    const gap = 60;
    const totalCardsWidth = (cardWidth * 4) + (gap * 3);
    const leftPadding = (window.innerWidth - totalCardsWidth) / 2;

    if (index === 0) {
      return leftPadding + (cardWidth / 2);
    }
    if (index === 3) {
      return window.innerWidth;
    }

    return leftPadding + index * (cardWidth + gap) + (cardWidth / 2);
  };

  React.useEffect(() => {
    const section = sectionRef.current;
    const circle = circleRef.current;
    const title = titleRef.current;
    const paragraph = paragraphRef.current;
    const indicator = indicatorRef.current;
    const members = membersRef.current;
    const chooseUs = chooseUsRef.current;
    const centerCircle = centerCircleRef.current;
    const leftDot = leftDotRef.current;
    const rightDot = rightDotRef.current;
    const redLine = redLineRef.current;
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;
    const redLineMoving = redLineMovingRef.current;

    if (
      !section ||
      !circle ||
      !title ||
      !paragraph ||
      !indicator ||
      !members ||
      !chooseUs ||
      !centerCircle ||
      !leftDot ||
      !rightDot ||
      !redLine ||
      !leftLine ||
      !rightLine ||
      !redLineMoving
    )
      return;

    const master = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
      },
    });

    master.to(circle, { y: -150, rotate: 180 });
    master.from(title, { opacity: 0, y: 40 });
    master.from(paragraph, { opacity: 0, y: 50 });

    master.to([title, paragraph], { opacity: 0, y: -40 });

    const circleRect = circle.getBoundingClientRect();
    const indicatorRect = indicator.getBoundingClientRect();

    const deltaX =
      indicatorRect.left +
      indicatorRect.width / 2 -
      (circleRect.left + circleRect.width / 2);

    const deltaY =
      indicatorRect.top +
      indicatorRect.height / 2 -
      (circleRect.top + circleRect.height / 2);

    master.to(circle, {
      x: deltaX,
      y: deltaY,
      background: "transparent",
      border: "3px solid #0d294d",
      borderRadius: "50%",
      duration: 1,
      ease: "power3.inOut",
    });

    master.from([leftDot, rightDot], {
      opacity: 0,
      x: (i) => (i === 0 ? "+=100" : "-=100"),
      duration: 0.6,
      ease: "power2.out",
    });

    master.from(
      redLine,
      {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "power2.out",
      },
      "<"
    );

    master.from(leftLine, { opacity: 0, duration: 0.5 });
    master.from(rightLine, { opacity: 0, duration: 0.5 }, "<");

    master.from(members, { opacity: 0, y: 50, duration: 0.5 });

    master.to([members, indicator], { opacity: 0, y: -50, duration: 0.5 });
    master.to(circle, { opacity: 0, duration: 0.5 }, "<");

    master.from(chooseUs, { opacity: 0, y: 50, duration: 0.5 });

    const cardsCount = cards.length;

    master.to({}, {
      duration: 2,
      onUpdate: function () {
        const progress = this.progress();
        const index = Math.min(Math.floor(progress * cardsCount), cardsCount - 1);

        // 1️⃣ حرّك الخط أولاً
        const redWidth = getRedLineWidth(index);
        gsap.to(redLineMovingRef.current, {
          width: redWidth,
          duration: 0.4,
          ease: "power2.out"
        });

        // 2️⃣ وبعدها بفريم React يغير active
        setTimeout(() => {
          setActiveCardIndex(index);
        }, 0); // ممكن تزود delay لو عايز فرق
      },
    });

  }, []);



  return (
    <section id="who-we-are"
      ref={sectionRef}
      className="flex overflow-hidden flex-col relative justify-center h-screen items-center"
    >
      <section
        id="circle"
        ref={circleRef}
        className="circleMorph bg-gradient-to-b from-[#0D294D] to-[#1E5598] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
      </section>
      <div ref={indicatorRef} className="indicator">
        <div className="dot left" ref={leftDotRef}></div>
        <div className="line" ref={leftLineRef}></div>
        <div className="circle" ref={centerCircleRef}></div>
        <div className="line" ref={rightLineRef}></div>
        <div className="dot right" ref={rightDotRef}></div>
        <div className="red-line" ref={redLineRef}></div>
      </div>

      <h2
        ref={titleRef}
        className="text-[64px] mb-[20px] md:mb-[35px] font-bold text-center text-[#fff]"
      >
        Who We Are
      </h2>

      <p
        ref={paragraphRef}
        className="text-[20px] text-center w-[90%] md:w-[70%] font-medium text-[#fff]"
      >
        At Joint Clinic, we believe recovery should be simple, secure, and
        effective. Our team of physiotherapists and specialists combine medical
        expertise with digital innovation to bring you a seamless care
        experience. From online booking and secure reports to guided exercises,
        we make every step of your recovery journey easier.
      </p>
      <section
        className="team_section absolute bottom-[120px] w-[90%] mx-auto flex flex-col items-center justify-center"
        ref={membersRef}
      >
        <h1 className="text-[40px] md:text-[100px] font-bold font-['IBM_Plex_Sans'] text-[#fff] text-center">
          Meet Our Team
        </h1>

        <div
          className={
            "members translate-y-6 max-w-[800px] mx-auto grid grid-cols-3 md:grid-cols-5 " +
            // center the whole grid content (useful when last row has fewer items)
            "justify-center justify-items-center gap-[10px] overflow-hidden transition-all"
          }
        >
          {memberinfo.map((member, index) => (
            <div key={index} className="flex flex-col justify-center items-center w-auto mb-4">
              <Profile
                fill={member.fill}
                className="w-[40px] md:w-[60px] mb-[4px]"
              />

              <h4 className="text-[13px] md:text-[20px] max-w-[250px] my-0 text-[#fff] font-bold text-center">
                {member.name}
              </h4>

              <p className="text-[10px] md:text-[16px] max-w-[100px] text-center text-[#fff]">
                {member.major}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        className="chooseUs text-center absolute w-full flex flex-col justify-center items-center bottom-[70px]"
        ref={chooseUsRef}
      >
        <h2
          className={`text-[40px] md:text-[64px] mb-[5px] md:mb-[30px] translate-y-[-100%] md:translate-y-[-200%] font-bold font-['IBM_Plex_Sans'] text-[#fff]`}
        >
          Why Choose Us?
        </h2>

        {/* الخط الأحمر المتحرك */}
        <div ref={redLineMovingRef} className="moving-red-line"></div>
        <div className="flex flex-row justify-center relative">


          {/* الكروت */}
          <div className="cards mx-auto grid md:translate-y-[-20%] justify-center items-center gap-4 md:gap-[60px] w-full grid-cols-2 md:grid-cols-4 sm:grid-cols-2">
            {cards.map((card, index) => (
              <FeatureCard
                key={index}
                title={card.title}
                description={card.desc}
                isActive={activeCardIndex >= index}
              />
            ))}
          </div>
        </div>
      </section>

    </section >
  );
}

export default WhoWeAre;
