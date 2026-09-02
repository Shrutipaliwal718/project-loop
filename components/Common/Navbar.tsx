"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoopIcon from "./LoopIcon";
import LoopLogo from "./LoopLogo";

const links = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Insights", href: "#insights" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Resources", href: "#resources" },
  { label: "Pricing", href: "#cta" },
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
    <header className="loop-navbar sticky top-0 z-50 border-b border-white/[0.08] bg-[#020812]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 lg:px-9">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <LoopLogo size={43} />
          <div className="leading-none">
            <div className="text-[21px] font-extrabold tracking-[-0.03em] text-white">LOOP</div>
            <div className="mt-1 text-[8px] font-semibold tracking-[0.17em] text-slate-400">
              FEEDBACK INTELLIGENCE
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative py-3 text-[14px] font-medium text-slate-300 transition-colors duration-200 hover:text-white"
            >
              {link.label}
              <span className="absolute inset-x-0 bottom-1 mx-auto h-px w-0 bg-gradient-to-r from-cyan-300 to-violet-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={() => setLightMode((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:text-cyan-300"
            aria-label="Toggle LOOP theme"
          >
            <LoopIcon name={lightMode ? "sun" : "moon"} size={17} />
          </button>

          <button className="px-4 py-2 text-sm font-semibold text-slate-300 transition hover:text-white">
            Sign in
          </button>

          <Link
            href="/dashboard"
            className="rounded-lg bg-gradient-to-r from-cyan-300 to-teal-400 px-5 py-2.5 text-sm font-bold text-[#031017] shadow-[0_0_24px_rgba(0,229,212,.14)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(0,229,212,.28)]"
          >
            Get started
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-slate-300 lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <LoopIcon name={menuOpen ? "close" : "menu"} size={20} />
        </button>
      </div>

      <div
        className={`border-t border-white/[0.07] bg-[#040b15]/96 px-5 py-5 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-[520px] translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 overflow-hidden border-transparent py-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-2xl flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.04] hover:text-cyan-300"
            >
              {link.label}
            </a>
          ))}

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-4">
            <button className="rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200">
              Sign in
            </button>
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-gradient-to-r from-cyan-300 to-teal-400 px-4 py-3 text-center text-sm font-bold text-[#031017]"
            >
              Get started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
