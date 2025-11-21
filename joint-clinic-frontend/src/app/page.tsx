
import { IBM_Plex_Sans } from "next/font/google";
import Hero from "@/components/Hero/Hero";
import ChooseUs from "@/components/ChooseUs/ChooseUs";
import HorizontalScroll from "@/components/Horizontal/Horizontal";
import YourSafety from "@/components/YourSafety/YourSafety";
import HowWorks from "@/components/howWorks/howWorks";
import WhatOurPatientsSay from "@/components/WhatOurPatientsSay/WhatOurPatientsSay";
import Footer from "@/components/footer/footer";
import Book from "@/components/booking/book";
import WhoWeAre from "@/components/WhoWeAre/WhoWeAre";
import Typography from "@/components/atoms/Typography";

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
    
      <section className=" flex justify-center items-center bg-[9fd5e2] flex-col">
        <WhoWeAre />
      </section>
      
      <section className="chooseUs h-screen flex flex-col justify-center items-center md:mt-0 gap-8">
        <ChooseUs />
      </section>
      
      <section className="features_section bg-[#0d7b93] overflow-hidden py-10">
        <HorizontalScroll />
      </section> 
     
      <section className="h-screen flex items-center justify-center">
      </section>
     <section className="h-screen flex items-center justify-center">
        <YourSafety />
      </section> 
      <section className=" pb-10 flex items-center bg-[#ebf6f8] justify-center">
        <HowWorks />
      </section>
      <section className="h-screen flex items-center bg-[#edf7f9] justify-center">
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