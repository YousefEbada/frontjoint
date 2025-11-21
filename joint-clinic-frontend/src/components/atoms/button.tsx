import React from "react";
import { IBM_Plex_Sans } from "next/font/google";

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type ButtonProps = {
  text: string;
  variant: "primary" | "secondary" | "third";
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, variant, onClick }) => {
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
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${ibm.className}
        font-bold
        w-[200px] sm:w-[220px] md:w-[248px]
        h-[45px] sm:h-[48px] md:h-[51px]
        rounded-[48px]
        text-center 
        text-[18px] sm:text-[20px] md:text-[24px]
        border-2
        py-[8px] px-[32px]
        cursor-pointer
        transition
        leading-[115%]

        /* RESPONSIVE MARGINS */
        m-0 sm:m-[20px] md:m-[30px]

        ${variants[variant]}
      `}
    >
      {text}
    </button>
  );
};

export default Button;
