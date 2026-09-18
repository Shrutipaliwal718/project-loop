"use client";

import LoopLogo from "../Common/LoopLogo";

/* =========================================================
   ICON SYSTEM
   ========================================================= */

type IconName =
  | "home"
  | "feedback"
  | "trends"
  | "ask"
  | "reports"
  | "users"
  | "chevron"
  | "bell"
  | "help"
  | "search"
  | "settings"
  | "message"
  | "smile"
  | "tag"
  | "bolt"
  | "spark"
  | "truck"
  | "cube"
  | "interface"
  | "feature"
  | "support"
  | "alert"
  | "payment"
  | "moon"
  | "arrow";

function Icon({
  name,
  size = 20,
  strokeWidth = 1.7,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "home":
      return (
        <svg {...props}>
          <path d="m3.5 10.5 8.5-7 8.5 7" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M9.5 20v-6h5v6" />
        </svg>
      );

    case "feedback":
      return (
        <svg {...props}>
          <path d="M19.5 5.5h-15v11h4v3l4-3h7z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
      );

    case "trends":
      return (
        <svg {...props}>
          <path d="M4 18V6" />
          <path d="M4 18h17" />
          <path d="m7 14 4-4 3 2 6-7" />
          <path d="M16.5 5H20v3.5" />
        </svg>
      );

    case "ask":
      return (
        <svg {...props}>
          <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8-1.8 5.9-1.8-5.9L4.5 10.8 10.2 9z" />
          <path d="m18.5 15.5.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z" />
        </svg>
      );

    case "reports":
      return (
        <svg {...props}>
          <path d="M6 3.5h9l3.5 3.5V20.5H6z" />
          <path d="M15 3.5V7h3.5" />
          <path d="M9 11h6M9 14.5h6M9 18h3.5" />
        </svg>
      );

    case "users":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3.5 19c.5-3.3 2.4-5 5.5-5s5 1.7 5.5 5" />
          <path d="M14.5 14.5c2.9-.1 4.8 1.4 5.5 4.5" />
        </svg>
      );

    case "chevron":
      return (
        <svg {...props}>
          <path d="m6.5 9 5.5 5.5L17.5 9" />
        </svg>
      );

    case "bell":
      return (
        <svg {...props}>
          <path d="M18 9.5a6 6 0 0 0-12 0c0 6.5-2.5 6.5-2.5 8h17c0-1.5-2.5-1.5-2.5-8Z" />
          <path d="M10 21h4" />
        </svg>
      );

    case "help":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.7 9a2.5 2.5 0 1 1 4.5 1.5c-.9 1.1-2.2 1.5-2.2 3" />
          <path d="M12 17h.01" />
        </svg>
      );

    case "search":
      return (
        <svg {...props}>
          <circle cx="10.8" cy="10.8" r="6.3" />
          <path d="m16 16 4.2 4.2" />
        </svg>
      );

    case "settings":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="2.8" />
          <path d="m19 13.5 1.2 1-.1 1.7-1.6.9-1.1-.4-1.3.8-.3 1.1-1.5.7-1.5-.7-.3-1.1-1.3-.8-1.1.4-1.6-.9-.1-1.7 1.2-1-.1-1.5-1.1-.8.2-1.7 1.7-.5.8-.9-.1-1.2 1.5-.8 1.4.6.7-.1.8-1.3h1.7l.8 1.3.7.1 1.4-.6 1.5.8-.1 1.2.8.9 1.7.5.2 1.7-1.1.8z" />
        </svg>
      );

    case "message":
      return (
        <svg {...props}>
          <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 2v-5.2A7.5 7.5 0 1 1 20 11.5Z" />
          <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
        </svg>
      );

    case "smile":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="9" cy="10" r=".7" fill="currentColor" stroke="none" />
          <circle cx="15" cy="10" r=".7" fill="currentColor" stroke="none" />
          <path d="M8.5 14c1 1.5 2.2 2.2 3.5 2.2s2.5-.7 3.5-2.2" />
        </svg>
      );

    case "tag":
      return (
        <svg {...props}>
          <path d="m4 4 7.5-.5L20 12l-8 8-7.5-7.5z" />
          <circle cx="8.5" cy="8.5" r="1.2" />
        </svg>
      );

    case "bolt":
      return (
        <svg {...props}>
          <path d="m13 2-8 11h6l-1 9 8-12h-6z" />
        </svg>
      );

    case "spark":
      return (
        <svg {...props}>
          <path d="m12 3 1.7 6.3L20 11l-6.3 1.7L12 19l-1.7-6.3L4 11l6.3-1.7z" />
        </svg>
      );

    case "truck":
      return (
        <svg {...props}>
          <path d="M3 6h11v10H3z" />
          <path d="M14 9h4l3 3v4h-7z" />
          <circle cx="7" cy="18" r="1.8" />
          <circle cx="18" cy="18" r="1.8" />
        </svg>
      );

    case "cube":
      return (
        <svg {...props}>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" />
          <path d="M4 7.5 12 12l8-4.5M12 12v9" />
        </svg>
      );

    case "interface":
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 8h8M8 12h5M8 16h8" />
        </svg>
      );

    case "feature":
      return (
        <svg {...props}>
          <path d="M12 3.5 14 8l4.5 2-4.5 2-2 4.5-2-4.5-4.5-2L10 8z" />
          <path d="M18.5 15.5 19.2 18l2.3.7-2.3.8-.7 2.2-.8-2.2-2.2-.8 2.2-.7z" />
        </svg>
      );

    case "support":
      return (
        <svg {...props}>
          <path d="M5 13v-2a7 7 0 0 1 14 0v2" />
          <path d="M5 13H3.5v4H7v-4M19 13h1.5v4H17v-4" />
          <path d="M9 19h6" />
        </svg>
      );

    case "alert":
      return (
        <svg {...props}>
          <path d="m12 4 8 15H4z" />
          <path d="M12 9v4M12 16h.01" />
        </svg>
      );

    case "payment":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 9h18M7 14h4" />
        </svg>
      );

    case "moon":
      return (
        <svg {...props}>
          <path d="M19 15.5A8 8 0 0 1 8.5 5a8.3 8.3 0 1 0 10.5 10.5Z" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...props}>
          <path d="M5 19 19 5M9 5h10v10" />
        </svg>
      );

    default:
      return null;
  }
}

/* =========================================================
   MINI TREND GRAPH
   ========================================================= */

function MiniTrend({ color, points }: { color: string; points: string }) {
  return (
    <svg
      viewBox="0 0 220 50"
      preserveAspectRatio="none"
      className="mt-2 h-10 w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`mini-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={`${points} L220 50 L0 50 Z`} fill={`url(#mini-${color})`} />

      <path
        d={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="1"
          to="0"
          dur="1.8s"
          fill="freeze"
        />
      </path>
    </svg>
  );
}

/* =========================================================
   KPI CARD
   ========================================================= */

function KpiCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconClass,
  borderClass,
  graphColor,
  points,
  urgent,
}: {
  title: string;
  value: string;
  change: string;
  changeLabel: string;
  icon: IconName;
  iconClass: string;
  borderClass: string;
  graphColor: string;
  points: string;
  urgent?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border ${borderClass} bg-[#06111f]/95 p-4 shadow-[0_15px_45px_rgba(0,0,0,.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(0,0,0,.35)]`}
    >
      {/* Corner glow */}

      <div
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: graphColor }}
      />

      <div className="relative flex items-start gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border ${iconClass}`}
        >
          <Icon name={icon} size={28} strokeWidth={1.8} />
        </div>

        <div className="min-w-0 pt-0.5">
          <div className="text-[12px] font-medium text-slate-300">{title}</div>

          <div className="mt-1 text-[30px] font-semibold tracking-[-0.045em] text-slate-100">
            {value}
          </div>

          <div className="mt-1 flex items-center gap-1.5 text-[10px]">
            <span
              className={
                urgent
                  ? "font-semibold text-rose-400"
                  : "font-semibold text-emerald-400"
              }
            >
              {urgent ? "↓" : "↑"} {change}
            </span>

            <span className="text-slate-500">{changeLabel}</span>
          </div>
        </div>
      </div>

      <MiniTrend color={graphColor} points={points} />
    </div>
  );
}

/* =========================================================
   SENTIMENT BARS
   ========================================================= */

function SentimentBar({
  label,
  value,
  width,
  barClass,
}: {
  label: string;
  value: string;
  width: string;
  barClass: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">{label}</span>

        <span className="text-[11px] font-semibold text-slate-200">
          {value}
        </span>
      </div>

      <div className="h-[7px] overflow-hidden rounded-full bg-[#101d31]">
        <div
          className={`h-full rounded-full ${barClass} transition-all duration-1000`}
          style={{ width }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD NAV
   ========================================================= */

const navItems: {
  label: string;
  icon: IconName;
  active?: boolean;
}[] = [
  { label: "Overview", icon: "home", active: true },
  { label: "Feedback", icon: "feedback" },
  { label: "Trends", icon: "trends" },
  { label: "Ask LOOP", icon: "ask" },
  { label: "Reports", icon: "reports" },
];

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function AnalyticsPreview() {
  return (
    <section
      id="preview"
      className="relative overflow-hidden bg-[#01071a] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24"
    >
      {/* =====================================================
          BACKGROUND
         ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[18%] h-[420px] w-[420px] rounded-full bg-blue-600/[0.045] blur-[140px]" />

        <div className="absolute right-[5%] top-[28%] h-[420px] w-[420px] rounded-full bg-violet-600/[0.045] blur-[140px]" />

        <div className="absolute bottom-[5%] left-1/2 h-[300px] w-[650px] -translate-x-1/2 rounded-full bg-cyan-500/[0.035] blur-[130px]" />
      </div>

      {/* =====================================================
          SECTION HEADING
         ===================================================== */}

      <div className="relative z-10 mx-auto mb-12 max-w-[850px] text-center">
        <div className="text-[14px] font-bold uppercase tracking-[0.08em] text-cyan-300 sm:text-[15px]">
          Customer intelligence dashboard
        </div>

        <h2 className="mt-1 text-[32px] font-semibold tracking-[-0.045em] text-slate-100 sm:text-[38px] lg:text-[40px]">
          Feedback overview
        </h2>

        <p className="mt-1 text-[15px] text-slate-300 sm:text-[17px]">
          What changed in your customer voice this month
        </p>
      </div>

      {/* =====================================================
          DASHBOARD OUTER SHELL
         ===================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-[1480px]">
        <div className="relative overflow-hidden rounded-[14px] border border-violet-500/60 bg-[#020a1a] shadow-[0_0_70px_rgba(38,169,255,.06),0_30px_100px_rgba(0,0,0,.55)]">
          {/* cyan edge */}

          <div className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-cyan-400/40" />

          {/* =================================================
              DASHBOARD CONTENT
             ================================================= */}

          <div className="flex min-h-[720px]">
            {/* =================================================
                SIDEBAR
               ================================================= */}

            <aside className="hidden w-[272px] shrink-0 border-r border-[#172640] bg-[#020b1c] md:flex md:flex-col">
              {/* Logo */}

              <div className="flex h-[104px] items-center border-b border-[#172640] px-7">
                <div className="flex items-center gap-3">
                  <LoopLogo />
                  <div>
                    <div className="text-[27px] font-semibold tracking-[-0.04em] text-slate-100">
                      LOOP
                    </div>

                    <div className="mt-[-2px] text-[11px] tracking-[-0.01em] text-blue-200/80">
                      FEEDBACK INTELLIGENCE
                    </div>
                  </div>
                </div>
              </div>

              {/* Main navigation */}

              <nav className="px-[18px] pt-7">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <div
                      key={item.label}
                      className={`flex h-[44px] items-center gap-4 rounded-xl px-4 transition-all duration-300 ${
                        item.active
                          ? "bg-gradient-to-r from-cyan-400 to-cyan-500 text-[#02101c] shadow-[0_0_25px_rgba(25,230,209,.12)]"
                          : "text-slate-300 hover:bg-white/[0.035] hover:text-white"
                      }`}
                    >
                      <Icon name={item.icon} size={22} strokeWidth={1.6} />

                      <span className="text-[14px] font-medium">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </nav>

              {/* Workspace */}

              <div className="mt-9 border-t border-[#172640] px-6 pt-6">
                <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.06em] text-blue-200/80">
                  Workspace
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="users" size={25} />

                    <span className="text-[14px] font-medium text-slate-200">
                      Acme Product Team
                    </span>
                  </div>

                  <Icon name="chevron" size={17} />
                </div>
              </div>

              {/* Upgrade card */}

              <div className="mt-auto px-[18px] pb-7">
                <div className="relative overflow-hidden rounded-xl border border-violet-500/50 bg-gradient-to-br from-cyan-400/[0.12] via-blue-500/[0.05] to-violet-500/[0.12] p-5">
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />

                  <div className="relative">
                    <Icon name="spark" size={29} strokeWidth={1.5} />

                    <div className="mt-4 text-[13px] font-semibold text-slate-100">
                      Unlock deeper insights
                    </div>

                    <p className="mt-3 text-[11px] leading-5 text-blue-100/70">
                      Connect more channels and uncover what matters most.
                    </p>

                    <button className="mt-4 h-9 w-full rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-300 text-[11px] font-bold text-[#02101b] transition hover:brightness-110">
                      Upgrade now
                    </button>
                  </div>
                </div>
              </div>

              {/* User */}

              <div className="border-t border-[#172640] px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/20 text-[18px] font-medium text-white">
                    P
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-slate-200">
                      Priya Sharma
                    </div>

                    <div className="mt-1 text-[11px] text-slate-500">Admin</div>
                  </div>

                  <Icon name="chevron" size={16} />
                </div>
              </div>
            </aside>

            {/* =================================================
                MAIN AREA
               ================================================= */}

            <main className="min-w-0 flex-1 bg-[#020a19]">
              {/* Top bar */}

              <div className="flex h-[70px] items-center border-b border-[#172640] px-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex h-[34px] w-[310px] items-center justify-center rounded-lg border border-[#172640] bg-[#071226] text-[12px] text-blue-100/70 shadow-inner sm:w-[340px]">
                  <span className="mr-1 text-slate-500">⌕</span>
                  app.loop.ai / overview
                </div>

                <div className="ml-auto flex items-center gap-4">
                  <div className="hidden items-center gap-2 text-[11px] text-slate-300 sm:flex">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" />
                    Live intelligence
                  </div>

                  <Icon name="bell" size={23} strokeWidth={1.5} />

                  <Icon name="help" size={22} strokeWidth={1.5} />

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-[14px] font-semibold text-[#00121b] shadow-[0_0_20px_rgba(25,230,209,.2)]">
                    P
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 lg:p-[22px]">
                {/* =================================================
                    KPI GRID
                   ================================================= */}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <KpiCard
                    title="Total Feedback"
                    value="12,480"
                    change="18.4%"
                    changeLabel="vs last 30 days"
                    icon="message"
                    iconClass="border-cyan-400/20 bg-cyan-400/[0.12] text-cyan-300 shadow-[0_0_25px_rgba(25,230,209,.08)]"
                    borderClass="border-cyan-400/35"
                    graphColor="#19e6d1"
                    points="M0 43 L8 41 L16 39 L24 40 L32 34 L40 35 L48 29 L56 33 L64 25 L72 34 L80 26 L88 32 L96 27 L104 31 L112 20 L120 25 L128 17 L136 23 L144 12 L152 19 L160 8 L168 17 L176 12 L184 16 L192 8 L200 12 L208 6 L220 3"
                  />

                  <KpiCard
                    title="Positive Sentiment"
                    value="72.6%"
                    change="6.2%"
                    changeLabel="vs last 30 days"
                    icon="smile"
                    iconClass="border-emerald-400/20 bg-emerald-400/[0.12] text-emerald-300 shadow-[0_0_25px_rgba(52,211,153,.08)]"
                    borderClass="border-emerald-400/35"
                    graphColor="#39e75f"
                    points="M0 45 L8 43 L16 41 L24 42 L32 37 L40 36 L48 27 L56 34 L64 25 L72 29 L80 25 L88 31 L96 23 L104 28 L112 23 L120 27 L128 18 L136 29 L144 20 L152 24 L160 15 L168 22 L176 18 L184 20 L192 12 L200 14 L208 9 L220 2"
                  />

                  <KpiCard
                    title="Themes Detected"
                    value="24"
                    change="4"
                    changeLabel="vs last 30 days"
                    icon="tag"
                    iconClass="border-violet-400/25 bg-violet-500/[0.15] text-violet-300 shadow-[0_0_25px_rgba(139,92,246,.1)]"
                    borderClass="border-violet-400/35"
                    graphColor="#9b5cff"
                    points="M0 44 L8 42 L16 38 L24 40 L32 31 L40 33 L48 28 L56 31 L64 24 L72 30 L80 25 L88 31 L96 20 L104 26 L112 17 L120 25 L128 13 L136 23 L144 8 L152 18 L160 12 L168 20 L176 15 L184 17 L192 10 L200 14 L208 7 L220 4"
                  />

                  <KpiCard
                    title="Action Signals"
                    value="17"
                    change="8 urgent"
                    changeLabel=""
                    icon="bolt"
                    iconClass="border-orange-400/20 bg-orange-400/[0.13] text-orange-300 shadow-[0_0_25px_rgba(249,115,22,.08)]"
                    borderClass="border-orange-400/30"
                    graphColor="#ff8a00"
                    points="M0 45 L8 43 L16 42 L24 39 L32 42 L40 32 L48 37 L56 29 L64 35 L72 25 L80 32 L88 23 L96 29 L104 21 L112 30 L120 18 L128 28 L136 13 L144 24 L152 8 L160 17 L168 13 L176 19 L184 9 L192 16 L200 7 L208 10 L220 2"
                    urgent
                  />
                </div>

                {/* =================================================
                    SENTIMENT + DISTRIBUTION
                   ================================================= */}

                <div className="mt-3 grid gap-3 xl:grid-cols-[1.55fr_1fr]">
                  {/* Sentiment movement */}

                  <div className="rounded-xl border border-[#18304e] bg-[#031020] p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[15px] font-semibold text-slate-100">
                          Sentiment movement
                        </h3>

                        <p className="mt-1 text-[11px] text-blue-100/60">
                          Customer mood over the last 30 days
                        </p>
                      </div>

                      <div className="rounded-full bg-emerald-400/[0.09] px-3 py-2 text-[11px] font-semibold text-emerald-300">
                        Improving ↗
                      </div>
                    </div>

                    {/* Bar chart */}

                    <div className="relative mt-6 h-[215px]">
                      {/* Grid */}

                      <div className="absolute inset-0 flex flex-col justify-between">
                        {[100, 75, 50, 25, 0].map((value) => (
                          <div key={value} className="flex items-center gap-3">
                            <span className="w-7 text-[10px] text-slate-500">
                              {value}%
                            </span>

                            <div className="h-px flex-1 bg-[#11233b]" />
                          </div>
                        ))}
                      </div>

                      {/* Bars */}

                      <div className="absolute bottom-0 left-[48px] right-2 top-1 flex items-end justify-between gap-1">
                        {[
                          22, 28, 24, 34, 30, 39, 35, 37, 42, 45, 43, 53, 58,
                          56, 67, 73, 84, 87, 95,
                        ].map((height, index) => (
                          <div
                            key={index}
                            className="group relative flex h-full flex-1 items-end"
                          >
                            <div
                              className="w-full rounded-t-[3px] bg-gradient-to-t from-cyan-500/80 to-cyan-300 transition-all duration-700 group-hover:from-cyan-400 group-hover:to-cyan-200"
                              style={{
                                height: `${height}%`,
                                animationDelay: `${index * 35}ms`,
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="absolute bottom-[-25px] left-[48px] right-2 flex justify-between">
                        <span className="text-[10px] text-slate-400">
                          30 days ago
                        </span>

                        <span className="text-[10px] text-slate-400">
                          Today
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* What customers feel */}

                  <div className="rounded-xl border border-[#18304e] bg-[#031020] p-5">
                    <h3 className="text-[15px] font-semibold text-slate-100">
                      What customers feel
                    </h3>

                    <p className="mt-1 text-[11px] text-blue-100/60">
                      Overall sentiment distribution
                    </p>

                    <div className="mt-6 space-y-5">
                      <SentimentBar
                        label="Positive"
                        value="72.6%"
                        width="72.6%"
                        barClass="bg-gradient-to-r from-cyan-400 to-emerald-400"
                      />

                      <SentimentBar
                        label="Neutral"
                        value="18.1%"
                        width="18.1%"
                        barClass="bg-gradient-to-r from-violet-500 to-purple-400"
                      />

                      <SentimentBar
                        label="Negative"
                        value="9.3%"
                        width="9.3%"
                        barClass="bg-gradient-to-r from-rose-500 to-red-400"
                      />
                    </div>

                    {/* AI insight */}

                    <div className="mt-6 rounded-xl border border-cyan-400/25 bg-cyan-400/[0.045] p-4">
                      <div className="flex gap-3">
                        <div className="shrink-0 text-cyan-300">
                          <Icon name="spark" size={24} strokeWidth={1.5} />
                        </div>

                        <div>
                          <div className="text-[12px] font-semibold text-cyan-300">
                            AI insight
                          </div>

                          <p className="mt-1.5 text-[11px] leading-5 text-blue-100/75">
                            Positive sentiment increased after the latest
                            onboarding improvements.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    LOWER CARDS
                   ================================================= */}

                <div className="mt-3 grid gap-3 lg:grid-cols-3">
                  {/* TOP THEMES */}

                  <div className="rounded-xl border border-[#18304e] bg-[#031020] p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[15px] font-semibold text-slate-100">
                          Top themes
                        </h3>

                        <p className="mt-1 text-[11px] text-blue-100/60">
                          Themes mentioned by customers
                        </p>
                      </div>

                      <button className="text-[11px] font-semibold text-cyan-300 transition hover:text-cyan-200">
                        View all
                      </button>
                    </div>

                    <div className="mt-5 space-y-4">
                      <ThemeRow
                        icon="truck"
                        label="Delivery experience"
                        value="2,843"
                        width="82%"
                        iconClass="text-cyan-300"
                      />

                      <ThemeRow
                        icon="cube"
                        label="Product quality"
                        value="1,827"
                        width="61%"
                        iconClass="text-cyan-300"
                      />

                      <ThemeRow
                        icon="interface"
                        label="User interface"
                        value="1,492"
                        width="49%"
                        iconClass="text-cyan-300"
                      />

                      <ThemeRow
                        icon="feature"
                        label="Feature requests"
                        value="1,201"
                        width="41%"
                        iconClass="text-cyan-300"
                      />

                      <ThemeRow
                        icon="support"
                        label="Customer support"
                        value="1,018"
                        width="34%"
                        iconClass="text-cyan-300"
                      />
                    </div>
                  </div>

                  {/* EMERGING ISSUE */}

                  <div className="rounded-xl border border-[#18304e] bg-[#031020] p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[15px] font-semibold text-slate-100">
                          Emerging issue
                        </h3>

                        <p className="mt-1 text-[11px] text-blue-100/60">
                          New issues gaining attention
                        </p>
                      </div>

                      <button className="text-[11px] font-semibold text-cyan-300 transition hover:text-cyan-200">
                        View all
                      </button>
                    </div>

                    <div className="mt-5 flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-rose-400/20 bg-rose-400/[0.12] text-rose-300">
                        <Icon name="alert" size={23} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-semibold leading-5 text-slate-200">
                          App performance on
                          <br />
                          low-end devices
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[14px] font-bold text-emerald-400">
                          ↑ 32%
                        </div>

                        <div className="mt-1 text-[9px] text-slate-500">
                          vs last 7 days
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-lg border border-[#17304d] bg-[#071426] p-3">
                      <p className="text-[11px] leading-5 text-blue-100/70">
                        Customers are reporting crashes and slow loading on
                        budget devices.
                      </p>

                      <button className="mt-3 rounded-lg border border-cyan-400 bg-cyan-400/[0.04] px-3 py-2 text-[10px] font-semibold text-cyan-300 transition hover:bg-cyan-400/[0.1]">
                        View feedback
                      </button>
                    </div>
                  </div>

                  {/* RECENT ACTION SIGNALS */}

                  <div className="rounded-xl border border-[#18304e] bg-[#031020] p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[15px] font-semibold text-slate-100">
                          Recent action signals
                        </h3>

                        <p className="mt-1 text-[11px] text-blue-100/60">
                          High priority feedback
                        </p>
                      </div>

                      <button className="text-[11px] font-semibold text-cyan-300 transition hover:text-cyan-200">
                        View all
                      </button>
                    </div>

                    <div className="mt-5 space-y-3">
                      <ActionRow
                        icon="truck"
                        iconClass="bg-rose-500/[0.12] text-rose-300"
                        title="Late deliveries in Zone 7"
                        mentions="23 mentions"
                        priority="Urgent"
                        priorityClass="bg-rose-500/[0.14] text-rose-300"
                      />

                      <ActionRow
                        icon="payment"
                        iconClass="bg-cyan-500/[0.1] text-cyan-300"
                        title="Payment failed but amount debited"
                        mentions="18 mentions"
                        priority="Urgent"
                        priorityClass="bg-rose-500/[0.14] text-rose-300"
                      />

                      <ActionRow
                        icon="alert"
                        iconClass="bg-orange-500/[0.12] text-orange-300"
                        title="App crashes on startup"
                        mentions="15 mentions"
                        priority="Urgent"
                        priorityClass="bg-rose-500/[0.14] text-rose-300"
                      />

                      <ActionRow
                        icon="moon"
                        iconClass="bg-orange-500/[0.12] text-orange-300"
                        title="Feature: Dark mode"
                        mentions="12 mentions"
                        priority="High"
                        priorityClass="bg-orange-500/[0.12] text-orange-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* =====================================================
            BOTTOM STATUS
           ===================================================== */}

        <div className="mt-7 flex items-center justify-center gap-2 text-[12px] text-blue-100/50">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(25,230,209,.8)]" />
          Real-time insights powered by AI
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   THEME ROW
   ========================================================= */

function ThemeRow({
  icon,
  label,
  value,
  width,
  iconClass,
}: {
  icon: IconName;
  label: string;
  value: string;
  width: string;
  iconClass: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`shrink-0 ${iconClass}`}>
        <Icon name={icon} size={21} strokeWidth={1.6} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-[11px] font-medium text-slate-300">
          {label}
        </div>
      </div>

      <div className="hidden w-[92px] sm:block">
        <div className="h-[7px] overflow-hidden rounded-full bg-[#112039]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300"
            style={{ width }}
          />
        </div>
      </div>

      <div className="w-[42px] text-right text-[10px] font-medium text-slate-300">
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   ACTION ROW
   ========================================================= */

function ActionRow({
  icon,
  iconClass,
  title,
  mentions,
  priority,
  priorityClass,
}: {
  icon: IconName;
  iconClass: string;
  title: string;
  mentions: string;
  priority: string;
  priorityClass: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
      >
        <Icon name={icon} size={19} strokeWidth={1.6} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-[11px] font-medium text-slate-200">
          {title}
        </div>

        <div className="mt-0.5 text-[9px] text-slate-500">{mentions}</div>
      </div>

      <div
        className={`shrink-0 rounded-md px-2.5 py-1.5 text-[9px] font-semibold ${priorityClass}`}
      >
        {priority}
      </div>
    </div>
  );
}
