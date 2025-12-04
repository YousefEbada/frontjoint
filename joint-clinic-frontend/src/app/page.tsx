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

      <section className="h-screen flex flex-col justify-center items-center">
        <MeetOurTeam />
      </section>

      <section className="features_section bg-[#0d7b93] overflow-hidden py-10">
        <HorizontalScroll />
      </section>
      <HowWorks />
      <section className="h-screen flex items-center justify-center">
        <YourSafety />
      </section>
      <section className="h-screen flex items-center bg-[#edf7f9] justify-center" id="contact-us">
        <Book />
      </section>
      <WhatOurPatientsSay />
      <section className="min-h-screen bg-[#edf7f9] flex items-end justify-center overflow-x-hidden">
        <Footer />
      </section>

      {/* <Typography variant="subheader" className="text-center mt-4" text="Book Now" /> */}
    </div>
  );
}