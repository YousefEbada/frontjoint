"use client";
import { IBM_Plex_Sans } from "next/font/google";
import FeatureCard from "@/components/molecules/featureCard";
import WhoWeAre from "@/components/WhoWeAre/WhoWeAre";
import MeetOurTeam from "@/components/MeetOurTeam/MeetOurTeam";
import Hero from "@/components/Hero/Hero";
import ChooseUs from "@/components/ChooseUs/ChooseUs";
import HorizontalScroll from "@/components/Horizontal/Horizontal";
import YourSafety from "@/components/YourSafety/YourSafety";
import HowWorks from "@/components/howWorks/howWorks";
import Pagination from "@/pages/pagination";
// import Pagination from "@/pages/pagination";

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

      <section className="who_we_are flex justify-center items-center h-screen text-[#fff] flex-col">
        <WhoWeAre />
      </section>

      <section className="team_section bg-[#9fd5e2] h-screen flex flex-col justify-center items-center gap-8">
        <MeetOurTeam />
      </section>

      <section className="chooseUs h-screen flex flex-col justify-center items-center md:mt-0 gap-8">
        <ChooseUs />
      </section>

      <section className="features_section bg-[#0d7b93] overflow-hidden py-10">
        <HorizontalScroll />
      </section>

      <section className="h-screen flex items-center justify-center">
        <YourSafety />
      </section>
      {/* {<Pagination total={5} />} */}
      <section className="h-screen flex items-center bg-[#fff] justify-center">
        <HowWorks />
      </section>
    </div>
  );
}
