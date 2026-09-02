"use client";

import Link from "next/link";

/* =========================================================
   ICON SYSTEM
   ========================================================= */

type IconName =
  | "brain"
  | "smile"
  | "layers"
  | "trend"
  | "message"
  | "spark"
  | "report"
  | "target"
  | "arrow";

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "brain":
      return (
        <svg {...common}>
          <path d="M9.5 4.5A3.5 3.5 0 0 0 6 8v.5a3 3 0 0 0-2 2.8 3.2 3.2 0 0 0 3 3.2v.5a3 3 0 0 0 3 3V5.5" />
          <path d="M14.5 4.5A3.5 3.5 0 0 1 18 8v.5a3 3 0 0 1 2 2.8 3.2 3.2 0 0 1-3 3.2v.5a3 3 0 0 1-3 3V5.5" />
          <path d="M9.5 9h2M12.5 13h2M9.5 16h2M14.5 8h-2" />
        </svg>
      );

    case "smile":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="9" cy="10" r=".7" fill="currentColor" stroke="none" />
          <circle cx="15" cy="10" r=".7" fill="currentColor" stroke="none" />
          <path d="M8.5 14c1 1.6 2.2 2.3 3.5 2.3s2.5-.7 3.5-2.3" />
        </svg>
      );

    case "layers":
      return (
        <svg {...common}>
          <path d="m12 4 8 4-8 4-8-4 8-4Z" />
          <path d="m4 12 8 4 8-4" />
          <path d="m4 16 8 4 8-4" />
        </svg>
      );

    case "trend":
      return (
        <svg {...common}>
          <path d="M4 18V6" />
          <path d="M4 18h16" />
          <path d="m7 14 3-3 3 2 5-6" />
          <path d="M15 7h3v3" />
        </svg>
      );

    case "message":
      return (
        <svg {...common}>
          <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 2v-5.2A7.5 7.5 0 1 1 20 11.5Z" />
          <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
        </svg>
      );

    case "spark":
      return (
        <svg {...common}>
          <path d="M12 2.5l1.9 6.1L20 10.5l-6.1 1.9L12 18.5l-1.9-6.1L4 10.5l6.1-1.9L12 2.5Z" />
          <path d="M19 15v4M17 17h4" />
        </svg>
      );

    case "report":
      return (
        <svg {...common}>
          <path d="M6 3h9l3 3v15H6z" />
          <path d="M14 3v4h4M9 12h6M9 16h6M9 8h2" />
        </svg>
      );

    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h13" />
          <path d="m14 7 5 5-5 5" />
        </svg>
      );

    default:
      return null;
  }
}

/* =========================================================
   AI FEATURE CARD
   ========================================================= */

function AIInsightCard({
  number,
  icon,
  title,
  description,
  tag,
  color,
  border,
  children,
}: {
  number: string;
  icon: IconName;
  title: string;
  description: string;
  tag: string;
  color: string;
  border: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${border} bg-[#050d19] p-5 shadow-[0_10px_30px_rgba(0,0,0,.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,.5)]`}
    >
      {/* subtle corner glow */}

      <div
        className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full opacity-[0.07] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.16]"
        style={{
          backgroundColor: color,
        }}
      />

      {/* =================================================
          HEADER
         ================================================= */}

      <div className="relative flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            color,
            backgroundColor: `${color}14`,
          }}
        >
          <Icon name={icon} size={22} />
        </div>

        <span
          className="text-[9px] font-semibold tracking-[0.16em]"
          style={{
            color,
          }}
        >
          {number}
        </span>
      </div>

      {/* =================================================
          TITLE
         ================================================= */}

      <h3 className="relative mt-5 text-[16px] font-semibold tracking-[-0.025em] text-white">
        {title}
      </h3>

      {/* =================================================
          DESCRIPTION
         ================================================= */}

      <p className="relative mt-2 text-[11px] leading-[1.65] text-slate-400">
        {description}
      </p>

      {/* =================================================
          MINI VISUAL
         ================================================= */}

      <div className="relative mt-4">{children}</div>

      {/* =================================================
          TAG
         ================================================= */}

      <div className="relative mt-4">
        <span
          className="inline-flex rounded-md border px-2 py-1 text-[8px] font-semibold"
          style={{
            color,
            borderColor: `${color}35`,
            backgroundColor: `${color}08`,
          }}
        >
          {tag}
        </span>
      </div>

      {/* hover line */}

      <div
        className="absolute bottom-0 left-5 h-px w-0 opacity-70 transition-all duration-500 group-hover:w-[calc(100%-40px)]"
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
}

/* =========================================================
   SENTIMENT VISUAL
   ========================================================= */

function SentimentVisual() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full w-[73%] rounded-full bg-emerald-400" />
      </div>

      <span className="text-[9px] font-semibold text-emerald-300">72.6%</span>
    </div>
  );
}

/* =========================================================
   THEME VISUAL
   ========================================================= */

function ThemeVisual() {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="rounded-md border border-purple-400/25 bg-purple-500/[0.07] px-2 py-1 text-[8px] text-purple-300">
        Delivery
      </span>

      <span className="rounded-md border border-violet-400/25 bg-violet-500/[0.07] px-2 py-1 text-[8px] text-violet-300">
        Product quality
      </span>

      <span className="rounded-md border border-fuchsia-400/25 bg-fuchsia-500/[0.07] px-2 py-1 text-[8px] text-fuchsia-300">
        UX
      </span>

      <span className="rounded-md border border-purple-400/25 bg-purple-500/[0.07] px-2 py-1 text-[8px] text-purple-300">
        Support
      </span>
    </div>
  );
}

/* =========================================================
   TREND VISUAL
   ========================================================= */

function TrendVisual() {
  return (
    <svg
      viewBox="0 0 280 48"
      preserveAspectRatio="none"
      className="h-12 w-full"
      aria-hidden="true"
    >
      <path
        d="M0 39 L25 36 L50 38 L75 29 L100 32 L125 22 L150 25 L175 17 L200 20 L225 12 L250 15 L280 4"
        fill="none"
        stroke="#c45cff"
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
          dur="1.5s"
          fill="freeze"
        />
      </path>
    </svg>
  );
}

/* =========================================================
   ASK LOOP VISUAL
   ========================================================= */

function AskLoopVisual() {
  return (
    <div className="rounded-xl border border-fuchsia-400/15 bg-fuchsia-500/[0.035] px-3 py-2.5">
      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500/[0.12] text-fuchsia-300">
          <Icon name="message" size={11} />
        </span>

        <span className="text-[8px] text-slate-500">Ask LOOP</span>
      </div>

      <p className="mt-2 text-[9px] leading-4 text-slate-300">
        “What is driving the recent increase in negative feedback?”
      </p>
    </div>
  );
}

/* =========================================================
   REPORT VISUAL
   ========================================================= */

function ReportVisual() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      <div className="rounded-md border border-orange-400/20 bg-orange-500/[0.05] p-2">
        <p className="text-[7px] text-slate-500">Sentiment</p>
        <p className="mt-1 text-[10px] font-semibold text-orange-300">72.6%</p>
      </div>

      <div className="rounded-md border border-red-400/20 bg-red-500/[0.05] p-2">
        <p className="text-[7px] text-slate-500">Issues</p>
        <p className="mt-1 text-[10px] font-semibold text-red-300">08</p>
      </div>

      <div className="rounded-md border border-cyan-400/20 bg-cyan-500/[0.05] p-2">
        <p className="text-[7px] text-slate-500">Themes</p>
        <p className="mt-1 text-[10px] font-semibold text-cyan-300">24</p>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN SECTION
   ========================================================= */

export default function AIInsights() {
  return (
    <section
      id="ai-insights"
      className="relative overflow-hidden bg-[#010711] py-16 text-white sm:py-20"
    >
      {/* ===================================================
          BACKGROUND
         =================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* cyan */}

        <div className="absolute left-[-12%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.025] blur-[135px]" />

        {/* violet */}

        <div className="absolute right-[-12%] top-[25%] h-[450px] w-[450px] rounded-full bg-violet-600/[0.035] blur-[145px]" />

        {/* orange */}

        <div className="absolute right-[20%] bottom-[-20%] h-[300px] w-[300px] rounded-full bg-orange-500/[0.02] blur-[120px]" />
      </div>

      {/* ===================================================
          CONTENT
         =================================================== */}

      <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADING
           ================================================= */}

        <div className="mx-auto max-w-[760px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-500/[0.04] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_9px_rgba(25,230,209,.9)]" />

            <span className="text-[10px] font-semibold tracking-[0.12em] text-cyan-300">
              AI-POWERED INTELLIGENCE
            </span>
          </div>

          <h2 className="mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-slate-100 sm:text-[38px]">
            Let AI uncover what your
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              customers are really saying.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[690px] text-[13px] leading-6 text-slate-400 sm:text-[14px]">
            LOOP turns unstructured customer feedback into meaningful
            intelligence — from sentiment and themes to questions, trends, and
            executive-ready reports.
          </p>
        </div>

        {/* =================================================
            AI FEATURE GRID
           ================================================= */}

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* =================================================
              01 — CLASSIFICATION
             ================================================= */}

          <AIInsightCard
            number="01"
            icon="brain"
            title="Auto Classification"
            description="AI reads incoming feedback and automatically identifies sentiment, category, and relevant feedback signals."
            tag="SMART ANALYSIS"
            color="#19e6d1"
            border="border-cyan-400/35"
          >
            <SentimentVisual />
          </AIInsightCard>

          {/* =================================================
              02 — THEMES
             ================================================= */}

          <AIInsightCard
            number="02"
            icon="layers"
            title="Themes & Trends"
            description="Discover recurring themes and monitor how customer topics and sentiment change over time."
            tag="PATTERN DISCOVERY"
            color="#a855f7"
            border="border-purple-500/40"
          >
            <ThemeVisual />
          </AIInsightCard>

          {/* =================================================
              03 — ASK LOOP
             ================================================= */}

          <AIInsightCard
            number="03"
            icon="message"
            title="Ask LOOP"
            description="Ask questions about your customer feedback and get grounded AI answers from your workspace data."
            tag="GROUNDED Q&A"
            color="#c45cff"
            border="border-fuchsia-500/40"
          >
            <AskLoopVisual />
          </AIInsightCard>

          {/* =================================================
              04 — VOC
             ================================================= */}

          <AIInsightCard
            number="04"
            icon="report"
            title="Voice of Customer"
            description="Generate structured reports that summarize sentiment, themes, complaints, opportunities, and priorities."
            tag="AI REPORTING"
            color="#ff9800"
            border="border-orange-400/35"
          >
            <ReportVisual />
          </AIInsightCard>
        </div>

        {/* =================================================
            INSIGHT STRIP
           ================================================= */}

        <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* sentiment */}

          <div className="group rounded-xl border border-emerald-400/20 bg-[#050d19] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/35 hover:shadow-[0_12px_30px_rgba(0,0,0,.35)]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/[0.08] text-emerald-300">
                <Icon name="smile" size={18} />
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-100">
                  Sentiment intelligence
                </p>

                <p className="mt-0.5 text-[9px] text-slate-500">
                  Understand how customers feel.
                </p>
              </div>
            </div>
          </div>

          {/* trends */}

          <div className="group rounded-xl border border-violet-400/20 bg-[#050d19] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/35 hover:shadow-[0_12px_30px_rgba(0,0,0,.35)]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/[0.08] text-violet-300">
                <Icon name="trend" size={18} />
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-100">
                  Emerging trends
                </p>

                <p className="mt-0.5 text-[9px] text-slate-500">
                  See what is changing over time.
                </p>
              </div>
            </div>
          </div>

          {/* action */}

          <div className="group rounded-xl border border-red-400/20 bg-[#050d19] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400/35 hover:shadow-[0_12px_30px_rgba(0,0,0,.35)]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/[0.08] text-red-300">
                <Icon name="target" size={18} />
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-100">
                  Action signals
                </p>

                <p className="mt-0.5 text-[9px] text-slate-500">
                  Know which issues need attention.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            AI FLOW
           ================================================= */}

        <div className="mt-7 rounded-2xl border border-white/[0.09] bg-[#050d19] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,.22)] sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/[0.09] text-cyan-300">
                <Icon name="brain" size={19} />
              </div>

              <div>
                <p className="text-[11px] font-semibold text-slate-100">
                  One AI intelligence layer
                </p>

                <p className="mt-0.5 text-[9px] text-slate-500">
                  Classification → themes → answers → reports → action.
                </p>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-300 to-cyan-400 px-4 py-2 text-[10px] font-bold text-[#021018] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(25,230,209,.2)]"
            >
              Explore AI insights
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Icon name="arrow" size={14} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
