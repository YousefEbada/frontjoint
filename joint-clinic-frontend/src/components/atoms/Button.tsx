import React from "react";
import { IBM_Plex_Sans } from "next/font/google";

const ibm = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

type ButtonProps = {
  text: string;
  variant: "primary" | "secondary" | "third" | "fourth";
  onClick?: () => void;
  className?: string;        // جديد
  active?: boolean;          // جديد
};

const Button: React.FC<ButtonProps> = ({ text, variant, onClick, className = "", active = false }) => {
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
    fourth: `
      text-[#9fd5e2] bg-[#167c4f] border-[#167c4f]
      hover:text-[#1e5598] hover:bg-[#fdb515] hover:border-[#fdb515]
    `,
  };

  const hasCustomWidth = className?.includes("w-") || className?.includes("w[");

  const defaultWidth = !hasCustomWidth
    ? "w-[200px] sm:w-[220px] md:w-[248px]"
    : "";

  /* ⚡ لو active true نطبّق hover classes يدويًا */
  const activeStyle = {
    primary: "text-[#9fd5e2] bg-[#1e5598] border-[#1e5598]",
    secondary: "text-[#696969] bg-[#ababab] border-[#ababab]",
    third: "text-[#1e5598] bg-[#fdb515] border-[#fdb515]",
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${ibm.className}
        font-bold
        ${defaultWidth}
        h-[45px] sm:h-[48px] md:h-[51px]
        rounded-[48px]
        text-center 
        text-[18px] sm:text-[20px] md:text-[22px]
        border-2
        py-[8px] px-[32px]
        cursor-pointer
        transition
        leading-[115%]
        m-0

        ${variants[variant]}
        ${className}
        `}
        >
      {text}
    </button>
  );
};
/*active ? activeStyle[variant] : ""*/

export default Button;
