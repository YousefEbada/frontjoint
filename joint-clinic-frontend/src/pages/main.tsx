
import NavBar from "@/components/organisms/NavBar/NavBar";
import React from "react";

import { IBM_Plex_Sans } from "next/font/google";
import Button2 from "@/components/atoms/Button2";
// shdsjsdhhds
const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Main = () => {
  return (
    <div
      className={
        "h-[screen] w-full bg-[#9fd5e2] flex flex-col justify-center items-center"
      }
    >
      <main
        className={
          "bg-red-950 py-4 px-[8px] rounded-[22px] w-[98%] h-[96%] flex flex-col content-center items-center"
        }
        style={{
          backgroundImage: "url('./banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <NavBar />
        <div
          className={`content ${ibmPlex.className} absolute bottom-[-70px] my-[170px] text-white flex flex-col justify-center items-center`}
        >
          <h1 className="text-[64px] leading-[100%] font-bold font-['IBM_Plex_Sans']">
            Your Recovery, Made Simple.
          </h1>

          <p className="mt-4 leading-[150%] text-[20px] font-medium max-w-[700px] text-center">
            Book physiotherapy sessions, access your medical reports, and follow
            your personalized exercise plan – all in one secure platform.
          </p>
          <Button2 text="Get Started" />
        </div>
      </main>
    </div>
  );
};

export default Main;
