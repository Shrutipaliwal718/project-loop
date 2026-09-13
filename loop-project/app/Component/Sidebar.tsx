"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#07111d] border-r border-white/10 flex-col p-6 z-40">
      
      {/* Logo */}
      <Link href="/" className="mb-10">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          LOOP
        </h1>
        <p className="text-[#19e6d1] text-[10px] tracking-wide mt-1">
          FEEDBACK INTELLIGENCE
        </p>
      </Link>

      {/* Menu */}
      <nav className="space-y-2">
        <Link
          href="/"
          className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-[#19e6d1]/10 hover:text-[#19e6d1] transition"
        >
          🏠 Home
        </Link>

        <Link
          href="/feedback"
          className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-[#19e6d1]/10 hover:text-[#19e6d1] transition"
        >
          💬 Feedback
        </Link>

        <Link
          href="/csv"
          className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-[#19e6d1]/10 hover:text-[#19e6d1] transition"
        >
          📄 CSV Upload
        </Link>

        <Link
          href="/feedback-list"
          className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-[#19e6d1]/10 hover:text-[#19e6d1] transition"
        >
          📊 Dashboard
        </Link>
      </nav>

      {/* Bottom */}
      <div className="mt-auto space-y-2">
        <Link
          href="/login"
          className="block px-4 py-3 rounded-lg text-[#19e6d1] hover:bg-[#19e6d1]/10 transition"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="block px-4 py-3 rounded-lg bg-gradient-to-r from-[#19e6d1] to-[#28a9ff] text-[#030912] text-center font-semibold hover:opacity-90 transition"
        >
          Sign Up
        </Link>
      </div>
    </aside>
  );
}