import React from "react";
import { IBM_Plex_Sans } from "next/font/google";

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type ButtonProps = {
  text: string;
};

const Button2: React.FC<ButtonProps> = ({ text }) => {

  return (
    <button
      className={`${ibm.className} m-[30px] font-bold w-[228] h-[60px] rounded-[40px] 
      text-center text-[24px] border-2 py-[9px] px-[42px] cursor-pointer transition
      border-none bg-[#fff] text-[#ee3124]`}
    >
      {text}
    </button>
  );
};

export default Button2;
