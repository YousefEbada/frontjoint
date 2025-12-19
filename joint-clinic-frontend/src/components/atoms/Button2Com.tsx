import React from "react";
import { IBM_Plex_Sans } from "next/font/google";

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type ButtonProps = {
  text: string;
};

// this is my new button component

export default function Button2({ text }: ButtonProps) {

  return (
    <button
      className={`${ibm.className} m-[30px] font-bold w-[200] h-[60px] rounded-[40px] 
      text-center text-[24px] border-2 py-[9px] px-[25px] cursor-pointer transition
      border-none bg-[#fff] text-[#ee3124]`}
    >
      {text}
    </button>
  );
};
