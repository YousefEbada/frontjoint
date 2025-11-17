"use client";

import Link from "next/link";
import Logo from "@components/icons/Logo";
import React, { useEffect, useState } from "react";
import BookNowButton from "@components/NavBar/BookNowButton";
import { color } from "@/lib/constants/colors";
import { tv } from "tailwind-variants";

interface Props {
  type?: "primary" | "transparent" | "glass";
  colors?: "dark" | "light";
}

const NavBarClasses = tv({
  base: "fixed top-[30px] flex flex-row px-[46px] py-[16px] w-[90%] h-[105px] items-center justify-between rounded-[53px] transition-all duration-300",
  variants: {
    type: {
      primary:
        "bg-[rgb(255,255,255,0.4)] backdrop-blur-[17px] shadow-[4px_4px_18px_0px_#9FD5E2]",
      transparent: "bg-transparent shadow-none",
      glass:
        "shadow-[0_4px_30px_rgba(0,0,0,0.1)] bg-[rgb(255,255,255,0.4)] backdrop-blur-[17px] border border-white/30",
    },
    colors: {
      dark: "text-[#0A1C32]",
      light: "text-white",
    },
  },
  defaultVariants: {
    type: "primary",
    colors: "dark",
  },
});

const NavBar = ({ type = "transparent", colors = "light" }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={NavBarClasses({
        type: isScrolled ? "primary" : "transparent",
        colors: isScrolled ? "dark" : "light",
      })}
    >
      <div className="flex flex-row gap-[49px] text-2xl text-[currentColor] w-fit">
        <Link href={"/"}>Who We Are</Link>
        <Link href={"/"}>How it Works</Link>
        <Link href={"/"}>Reviews</Link>
        <Link href={"/"}>Contact Us</Link>
        |
        <Link href={"/"}>Login</Link>
      </div>

      <div className="flex flex-row gap-[90px] w-fit">
        <BookNowButton />
        <Link
          href={"/"}
          style={{
            width: "fit-content",
            height: "fit-content",
            display: "inline-block",
          }}
        >
          <Logo
            fill={isScrolled ? color.accent : "#ffffff"}
            style={{
              width: "123px",
            }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
