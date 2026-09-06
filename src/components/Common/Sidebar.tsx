"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LoopLogo from "./LoopLogo";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: "⌂",
  },
  {
    name: "Feedback",
    href: "/inbox",
    icon: "◈",
  },
  {
    name: "Trends",
    href: "/trends",
    icon: "◒",
  },
  {
    name: "Ask LOOP",
    href: "/ask",
    icon: "✦",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "▤",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[250px] border-r border-white/[0.08] bg-[#030912]/95 backdrop-blur-xl lg:block">
      <div className="flex h-full flex-col">
        {/* Home / Brand */}
        <div className="border-b border-white/[0.06] px-5 py-5">
          <div className="flex items-center gap-3">
            {/* LOOP logo — separate home button */}
            <Link
              href="/"
              aria-label="Go to LOOP home"
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:shadow-[0_0_24px_rgba(25,230,209,0.08)]"
            >
              <div className="transition-transform duration-300 group-hover:scale-105">
                <LoopLogo />
              </div>
            </Link>

            {/* LOOP name — separate home button */}
            <Link
              href="/"
              className="group min-w-0 rounded-lg px-1 py-1 transition-opacity duration-300 hover:opacity-90"
            >
              <p className="text-[17px] font-bold tracking-tight text-white">
                LOOP
              </p>

              {/* Descriptive text — not clickable separately */}
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Feedback Intelligence
              </p>
            </Link>
          </div>
        </div>

        {/* Workspace Navigation */}
        <nav className="flex-1 px-3 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            Workspace
          </p>

          <div className="space-y-1.5">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300 shadow-[0_0_20px_rgba(25,230,209,0.06)]"
                      : "border border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-white/[0.035] hover:text-slate-200"
                  }`}
                >
                  {/* Active page indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(25,230,209,0.8)]" />
                  )}

                  {/* Navigation icon */}
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-base transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-400/10 text-cyan-300"
                        : "bg-white/[0.025] text-slate-500 group-hover:bg-white/[0.05] group-hover:text-slate-300"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span>{item.name}</span>

                  {/* Active navigation arrow */}
                  {isActive && (
                    <span className="ml-auto text-xs text-cyan-400">→</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Workspace Status */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:border-violet-400/15 hover:bg-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-400/10 text-sm font-bold text-violet-400">
                L
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-slate-200">
                  LOOP Workspace
                </p>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  Intelligence Hub
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              Workspace active
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
