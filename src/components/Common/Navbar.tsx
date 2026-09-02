"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoopIcon from "./LoopIcon";
import LoopLogo from "./LoopLogo";

const links = [
  { label: "Preview", href: "#preview" },
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
  const [lightMode, setLightMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", lightMode);
  }, [lightMode]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 999999,
        }}
        className="border-b border-white/[0.08] bg-[#020812]/95 backdrop-blur-2xl"
      >
        <div className="relative mx-auto flex h-[72px] w-full max-w-[1440px] items-center px-6 sm:px-8 lg:px-10 xl:px-12">
          {/* LOGO */}

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <LoopLogo size={40} />

            <div className="leading-none">
              <div className="text-[21px] font-extrabold tracking-[-0.035em] text-white transition-colors duration-200 group-hover:text-cyan-300">
                LOOP
              </div>

              <div className="mt-1 text-[7px] font-semibold tracking-[0.18em] text-slate-500">
                FEEDBACK INTELLIGENCE
              </div>
            </div>
          </Link>

          {/* CENTER NAVIGATION */}

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative whitespace-nowrap px-1 py-2 text-[14px] font-semibold tracking-[-0.01em] text-slate-300 transition-colors duration-200 hover:text-white xl:text-[15px]"
              >
                {link.label}

                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 opacity-90 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* RIGHT SIDE */}

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            {/* THEME TOGGLE */}

            <button
              type="button"
              onClick={() => setLightMode((value) => !value)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-cyan-300/[0.06] hover:text-cyan-300"
              aria-label={
                lightMode ? "Switch to dark mode" : "Switch to light mode"
              }
            >
              <LoopIcon name={lightMode ? "sun" : "moon"} size={17} />
            </button>

            {/* SIGN IN */}

            <button
              type="button"
              className="whitespace-nowrap rounded-lg px-3 py-2.5 text-[14px] font-semibold text-slate-300 transition-colors duration-200 hover:text-white"
            >
              Sign in
            </button>

            {/* GET STARTED */}

            <Link
              href="/dashboard"
              className="whitespace-nowrap rounded-lg bg-gradient-to-r from-cyan-300 to-teal-400 px-4 py-2.5 text-[14px] font-bold text-[#031017] shadow-[0_0_25px_rgba(0,229,212,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(0,229,212,0.28)]"
            >
              Get started
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] text-slate-300 transition-all duration-200 hover:border-cyan-300/30 hover:text-cyan-300 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <LoopIcon name={menuOpen ? "close" : "menu"} size={19} />
          </button>
        </div>

        {/* MOBILE MENU */}

        <div
          className={`border-t border-white/[0.07] bg-[#030912]/98 px-5 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
            menuOpen
              ? "max-h-[600px] py-5 opacity-100"
              : "pointer-events-none max-h-0 overflow-hidden py-0 opacity-0"
          }`}
        >
          <nav className="mx-auto flex max-w-xl flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-[14px] font-semibold text-slate-300 transition-all duration-200 hover:bg-white/[0.04] hover:text-cyan-300"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-3 border-t border-white/[0.07] pt-4">
              {/* MOBILE THEME */}

              <button
                type="button"
                onClick={() => setLightMode((value) => !value)}
                className="mb-3 flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-[14px] font-medium text-slate-300 transition hover:border-cyan-300/25 hover:text-cyan-300"
              >
                <span>{lightMode ? "Light mode" : "Dark mode"}</span>

                <LoopIcon name={lightMode ? "sun" : "moon"} size={17} />
              </button>

              <div className="grid grid-cols-2 gap-3">
                {/* MOBILE SIGN IN */}

                <button
                  type="button"
                  className="rounded-lg border border-white/10 px-4 py-3 text-[14px] font-semibold text-slate-300 transition hover:border-cyan-300/25 hover:text-white"
                >
                  Sign in
                </button>

                {/* MOBILE GET STARTED */}

                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-gradient-to-r from-cyan-300 to-teal-400 px-4 py-2.5 text-center text-[14px] font-bold text-[#031017]"
                >
                  Get started
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* SPACE BELOW FIXED NAVBAR */}

      <div className="h-[72px] w-full" aria-hidden="true" />
    </>
  );
}
