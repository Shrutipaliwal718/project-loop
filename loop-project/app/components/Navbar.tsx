"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 border-b border-white/10 bg-[#030912]/95 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">

          {/* Logo - Mobile */}
          <Link href="/" className="inline-block lg:hidden">
            <h1 className="text-2xl font-bold tracking-wide text-white">
              LOOP
            </h1>

            <p className="text-[#19e6d1] text-[10px] tracking-wide">
              FEEDBACK INTELLIGENCE
            </p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex lg:ml-auto items-center gap-6">

            <Link
              href="/"
              className="text-sm text-gray-300 hover:text-[#19e6d1] transition"
            >
              Home
            </Link>

            <Link
              href="/feedback"
              className="text-sm text-gray-300 hover:text-[#19e6d1] transition"
            >
              Feedback
            </Link>

            <Link
              href="/csv"
              className="text-sm text-gray-300 hover:text-[#19e6d1] transition"
            >
              CSV
            </Link>

            <Link
              href="/feedback-list"
              className="text-sm text-gray-300 hover:text-[#19e6d1] transition"
            >
              Dashboard
            </Link>

            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border border-[#19e6d1]/40 text-[#19e6d1] text-sm hover:bg-[#19e6d1]/10 transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#19e6d1] to-[#28a9ff] text-[#030912] text-sm font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 hover:text-[#19e6d1] text-2xl"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-white/10 pt-4 space-y-3">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-300 hover:text-[#19e6d1]"
            >
              Home
            </Link>

            <Link
              href="/feedback"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-300 hover:text-[#19e6d1]"
            >
              Feedback
            </Link>

            <Link
              href="/csv"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-300 hover:text-[#19e6d1]"
            >
              CSV
            </Link>

            <Link
              href="/feedback-list"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-300 hover:text-[#19e6d1]"
            >
              Dashboard
            </Link>

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-[#19e6d1]"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-[#28a9ff]"
            >
              Sign Up
            </Link>

          </div>
        )}

      </div>
    </nav>
  );
}