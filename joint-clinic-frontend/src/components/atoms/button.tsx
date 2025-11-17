import React from "react";
import { IBM_Plex_Sans } from "next/font/google";

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type ButtonProps = {
  text: string;
  variant: "primary" | "secondary" | "third";
};

const Button: React.FC<ButtonProps> = ({ text, variant }) => {
  const variants = {
    primary: `
      text-[#1e5598] bg-transparent border-[#1e5598]
      hover:text-[#9fd5e2] hover:bg-[#1e5598] hover:border-[#1e5598]
    `,
    secondary: `
      text-[#b3b3b3] bg-transparent border-[#e6e6e6]
      hover:text-[#696969] hover:bg-[#ababab] hover:border-[#ababab]
    `,
    third: `
      text-[#fdb515] bg-transparent border-[#fdb515]
      hover:text-[#1e5598] hover:bg-[#fdb515] hover:border-[#fdb515]
    `,
    // sevins: `
    //   text-[#9fd5e2] bg-[#167c4f] border-[#167c4f]
    //   hover:opacity-90
    // `,
  };

  return (
    <button
      className={`${ibm.className} m-[30px] font-bold w-[248px] h-[51px] rounded-[48px] 
      text-center text-[24px] border-2 py-[9px] px-[42px] cursor-pointer transition
      leading-[115%] ${variants[variant]}`}
    >
      {text}
    </button>
  );
};

export default Button;
