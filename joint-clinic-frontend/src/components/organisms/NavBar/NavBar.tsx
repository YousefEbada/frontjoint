"use client";

import Link from "next/link";
import Logo from "@/components/atoms/icons/Logo";
import BookNowButton from "./BookNowButton";
import { tv } from "tailwind-variants";
import { color } from "@/lib/constants/colors";
import { useState, useTransition, startTransition, useEffect } from "react";

const NavBarClasses = tv({
  base: "fixed top-6 left-1/2 -translate-x-1/2 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 w-[calc(100vw-48px)] rounded-2xl sm:rounded-[53px] transition-all duration-300 z-50",
  variants: {
    type: {
      primary:
        "bg-[rgb(255,255,255,0.4)] backdrop-blur-[17px] shadow-[4px_4px_18px_0px_#9FD5E2]",
      transparent: "bg-transparent shadow-none",
    },
    colors: {
      dark: "text-[#0A1C32]",
      light: "text-white",
    },
  },
  defaultVariants: {
    type: "transparent",
    colors: "light",
  },
});

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [isPending, startTrans] = useTransition();
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check if user is authenticated as patient by checking localStorage
    const patientId = localStorage.getItem('patientId');
    const userId = localStorage.getItem('userId');
    setIsPatientLoggedIn(!!(patientId && userId));
  }, []);

  useEffect(() => {
    // Handle scroll to toggle navbar transparency
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    startTrans(() => {
      startTransition(() => {
        setOpen(prev => !prev);
      });
    });
  };

  return (
    <>
      <nav
        className={NavBarClasses({
          type: isScrolled ? "primary" : "transparent",
          colors: isScrolled ? "dark" : "light",
        })}
        style={{ width: "93vw" }}
      >
        <div className="hidden lg:flex flex-row gap-10 text-lg items-center">
          <Link href="/#who-we-are">Who We Are</Link>
          <Link href="/#how-it-works">How it Works</Link>
          <Link href="/#reviews">Reviews</Link>
          <Link href="/#contact">Contact Us</Link>
          <span className="opacity-50">|</span>
          {isPatientLoggedIn ? ([
            <Link href="/patient/main">Dashboard</Link>,
            <Link href="/patient/booking">Appointments</Link>,
            <Link href="/patient/exercises/assigned">Exercises</Link>,
            <Link href="/patient/support">Support</Link>
          ])
            : (
              <Link href="/sign-in">Login</Link>
            )}
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <Link href="/">
            <Logo fill={isScrolled ? color.accent : "#fff"} style={{ width: 48 }} />
          </Link>
        </div>

        <div className="flex items-center gap-10">
          <div className="hidden lg:block">
            <BookNowButton />
          </div>

          <div className="hidden lg:block">
            <Link href="/">
              <Logo fill={isScrolled ? color.accent : "#fff"} style={{ width: 110 }} />
            </Link>
          </div>

          <button
            aria-label="menu"
            className="lg:hidden p-2 rounded-md bg-white/10 hover:bg-white/20"
            onClick={toggleMenu}
          >
            {open ? (
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 z-60 transition-all duration-300 ${open ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
            }`}
          onClick={toggleMenu}
        />

        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white text-[#0A1C32] shadow-xl p-6 flex flex-col gap-6 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <Link href="/#who-we-are" onClick={toggleMenu}>
            Who We Are
          </Link>
          <Link href="/#how-it-works" onClick={toggleMenu}>
            How it Works
          </Link>
          <Link href="/#reviews" onClick={toggleMenu}>
            Reviews
          </Link>
          <Link href="/#contact" onClick={toggleMenu}>
            Contact Us
          </Link>
          {isPatientLoggedIn ? (
            <Link href="/patient/main" onClick={toggleMenu} className="text-[#1E5598] font-medium">
              Dashboard
            </Link>
          ) : (
            <Link href="/sign-in" onClick={toggleMenu}>
              Login
            </Link>
          )}

          <div className="pt-4">
            <BookNowButton onAfterNavigate={toggleMenu} />
          </div>
        </div>
      </div>
    </>
  );
}
