import React from "react";
import { IBM_Plex_Sans } from "next/font/google";
import Hero from "@/components/organisms/Hero/Hero";
import WhoWeAre from "@/components/organisms/WhoWeAre/WhoWeAre";
import MeetOurTeam from "@/components/organisms/WhoWeAre/MeetOurTeam";
import HorizontalScroll from "@/components/molecules/Horizontal/Horizontal";
import HowWorks from "@/components/organisms/HowWorks/HowWorks";
import YourSafety from "@/components/organisms/YourSafety/YourSafety";
import Book from "@/components/organisms/Booking/Book";
import WhatOurPatientsSay from "@/components/organisms/WhatOurPatientsSay/WhatOurPatientsSay";
import Footer from "@/components/organisms/Footer/Footer";
import { color } from "@/lib/constants/colors";

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  return (
    <div className="con bg-[#9fd5e2]">
      <div className={"h-screen w-full flex flex-col justify-center items-center"}>
        <Hero font={ibmPlex} />
      </div>
      <WhoWeAre />
      <HorizontalScroll />
      <HowWorks />
      <Book />
      <WhatOurPatientsSay />
      <YourSafety />
      <Footer />
    </div>
  );
}