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
  base: "fixed top-6 left-1/2 transform -translate-x-1/2 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 w-[95%] sm:w-[90%] md:w-11/12 lg:w-[90%] max-w-7xl rounded-2xl sm:rounded-[53px] transition-all duration-300 z-50",
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const onResize = () => {
      // close mobile menu when switching to desktop
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <nav
      className={NavBarClasses({
        type: isScrolled ? "primary" : "transparent",
        colors: isScrolled ? "dark" : "light",
      })}
    >
      {/* Desktop links */}
      <div className="hidden md:flex flex-row gap-2 md:gap-10 text-sm md:text-lg text-[currentColor] items-center">
        <Link href={"/"}>Who We Are</Link>
        <Link href={"/"}>How it Works</Link>
        <Link href={"/"}>Reviews</Link>
        <Link href={"/"}>Contact Us</Link>
        <span className="opacity-50">|</span>
        <Link href={"/"}>Login</Link>
      </div>

      {/* Mobile: left side logo */}
      <div className="flex items-center gap-4">
        <Link href={"/"} className="inline-block md:hidden">
          <Logo
            fill={isScrolled ? color.accent : "#ffffff"}
            style={{ width: 48 }}
          />
        </Link>

        {/* Desktop: logo on right side is handled in right section */}
      </div>

      {/* Right side: Book button + logo on desktop, hamburger on mobile */}
      <div className="flex items-center gap-10">
        <div className="hidden md:block">
          <BookNowButton />
        </div>

        <div className="hidden md:block">
          <Link
            href={'/'}
            style={{ display: 'inline-block' }}
          >
            <Logo
              fill={isScrolled ? color.accent : "#ffffff"}
              style={{ width: 110 }}
            />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 rounded-md bg-white/10 hover:bg-white/20"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[92%] sm:w-80 rounded-lg p-4 flex flex-col gap-3 shadow-lg bg-white text-[#0A1C32] z-40">
          <Link href={'/'} onClick={() => setMobileOpen(false)}>Who We Are</Link>
          <Link href={'/'} onClick={() => setMobileOpen(false)}>How it Works</Link>
          <Link href={'/'} onClick={() => setMobileOpen(false)}>Reviews</Link>
          <Link href={'/'} onClick={() => setMobileOpen(false)}>Contact Us</Link>
          <Link href={'/'} onClick={() => setMobileOpen(false)}>Login</Link>
          <div>
            <BookNowButton />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
