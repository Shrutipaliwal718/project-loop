"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

const AppNavbar = () => {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  const pageInfo = {
    "/dashboard": {
      label: "Overview",
      path: "overview",
    },
    "/inbox": {
      label: "Feedback",
      path: "feedback",
    },
    "/trends": {
      label: "Trends",
      path: "trends",
    },
    "/ask": {
      label: "Ask LOOP",
      path: "ask",
    },
    "/reports": {
      label: "Reports",
      path: "reports",
    },
  };

  const currentPage =
    pageInfo[pathname as keyof typeof pageInfo] ?? pageInfo["/dashboard"];

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#030912]/90 backdrop-blur-xl">
      <div className="flex h-[58px] items-center px-4 sm:px-6 lg:px-7">
        {/* Current workspace */}
        <div className="flex items-center">
          <div className="hidden text-xs sm:block">
            <p className="font-medium text-slate-500">Workspace</p>

            <p className="mt-0.5 text-[11px] text-slate-300">
              {currentPage.label}
            </p>
          </div>
        </div>

        {/* Current location */}
        <div className="absolute left-1/2 hidden w-[280px] -translate-x-1/2 md:block lg:w-[360px]">
          <div className="flex h-9 items-center justify-center rounded-xl border border-white/[0.08] bg-[#091523]/80">
            <span className="text-[11px] font-medium text-slate-500">
              app.loop.ai
            </span>

            <span className="mx-1.5 text-slate-700">/</span>

            <span className="text-[11px] font-medium text-cyan-400/80">
              {currentPage.path}
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Live intelligence */}
          <div className="hidden items-center gap-2 text-[11px] font-medium text-slate-400 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(25,230,209,0.8)]" />
            Live intelligence
          </div>

          <div className="hidden h-6 w-px bg-white/[0.08] sm:block" />

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-300 hover:bg-white/[0.04] hover:text-cyan-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-[19px] w-[19px]"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
              />

              <path strokeLinecap="round" d="M10 21h4" />
            </svg>

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(25,230,209,0.8)]" />
          </button>

          {/* Help */}
          <button
            type="button"
            aria-label="Help"
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-300 hover:bg-white/[0.04] hover:text-cyan-300 sm:flex"
          >
            <span className="flex h-[19px] w-[19px] items-center justify-center rounded-full border border-current text-[10px] font-medium">
              ?
            </span>
          </button>

          {/* Profile */}
          <div className="relative ml-1">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-gradient-to-br from-cyan-300 to-cyan-500 text-sm font-bold text-[#031018] shadow-[0_0_18px_rgba(25,230,209,0.18)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(25,230,209,0.3)]"
            >
              P
            </button>

            {profileOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-xl border border-white/[0.09] bg-[#091523] p-2 shadow-2xl shadow-black/40"
              >
                <div className="border-b border-white/[0.07] px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-semibold text-cyan-300">
                      P
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Pravind Kumar
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        Administrator
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-1 w-full rounded-lg px-3 py-2.5 text-left text-xs text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                >
                  Profile
                </button>

                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2.5 text-left text-xs text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                >
                  Settings
                </button>

                <div className="my-1 border-t border-white/[0.07]" />

                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2.5 text-left text-xs text-red-400 transition hover:bg-red-400/[0.05]"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
