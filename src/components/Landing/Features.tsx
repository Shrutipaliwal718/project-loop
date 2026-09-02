"use client";

import Link from "next/link";

/* =========================================================
   ICON SYSTEM
   ========================================================= */

type IconName =
  | "brain"
  | "message"
  | "upload"
  | "filter"
  | "chart"
  | "layers"
  | "search"
  | "spark"
  | "report"
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

    case "message":
      return (
        <svg {...common}>
          <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 2v-5.2A7.5 7.5 0 1 1 20 11.5Z" />
          <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
        </svg>
      );

    case "upload":
      return (
        <svg {...common}>
          <path d="M12 16V4" />
          <path d="m7 9 5-5 5 5" />
          <path d="M5 15v4h14v-4" />
        </svg>
      );

    case "filter":
      return (
        <svg {...common}>
          <path d="M4 6h16M7 12h10M10 18h4" />
        </svg>
      );

    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="m7 15 4-4 3 2 5-7" />
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

    case "search":
      return (
        <svg {...common}>
          <circle cx="10.8" cy="10.8" r="6.5" />
          <path d="m16 16 4 4" />
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
   FEATURE CARD
   ========================================================= */

function FeatureCard({
  number,
  icon,
  title,
  description,
  tag,
  color,
  border,
}: {
  number: string;
  icon: IconName;
  title: string;
  description: string;
  tag: string;
  color: string;
  border: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${border} bg-[#050d19] p-5 shadow-[0_10px_30px_rgba(0,0,0,.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,.48)]`}
    >
      {/* =================================================
          CORNER GLOW
         ================================================= */}

      <div
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-[0.08] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.18]"
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
          <Icon name={icon} size={21} />
        </div>

        <span
          className="text-[9px] font-semibold tracking-[0.16em]"
          style={{ color }}
        >
          {number}
        </span>
      </div>

      {/* =================================================
          CONTENT
         ================================================= */}

      <div className="relative mt-5">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-white">
            {title}
          </h3>
        </div>

        <p className="mt-2 text-[11px] leading-[1.65] text-slate-400">
          {description}
        </p>
      </div>

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

      {/* =================================================
          HOVER LINE
         ================================================= */}

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
   SMALL FEATURE ROW
   ========================================================= */

function FeatureRow({
  icon,
  title,
  text,
  color,
}: {
  icon: IconName;
  title: string;
  text: string;
  color: string;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#050d19] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] hover:shadow-[0_10px_28px_rgba(0,0,0,.35)]">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{
          color,
          backgroundColor: `${color}12`,
        }}
      >
        <Icon name={icon} size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-slate-100">{title}</p>

        <p className="mt-0.5 text-[9px] leading-4 text-slate-500">{text}</p>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN FEATURES SECTION
   ========================================================= */

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#010711] py-16 text-white sm:py-20"
    >
      {/* ===================================================
          BACKGROUND
         =================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* cyan */}

        <div className="absolute left-[-12%] top-[15%] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.025] blur-[135px]" />

        {/* violet */}

        <div className="absolute right-[-12%] top-[25%] h-[450px] w-[450px] rounded-full bg-violet-600/[0.035] blur-[145px]" />

        {/* orange */}

        <div className="absolute right-[10%] bottom-[-20%] h-[300px] w-[300px] rounded-full bg-orange-500/[0.02] blur-[120px]" />
      </div>

      {/* ===================================================
          CONTENT
         =================================================== */}

      <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* =================================================
            SECTION HEADING
           ================================================= */}

        <div className="mx-auto max-w-[760px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/[0.05] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_9px_rgba(168,85,247,.9)]" />

            <span className="text-[10px] font-semibold tracking-[0.12em] text-violet-300">
              POWERFUL FEATURES
            </span>
          </div>

          <h2 className="mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-slate-100 sm:text-[38px]">
            Everything your team needs to
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              understand the customer voice.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[690px] text-[13px] leading-6 text-slate-400 sm:text-[14px]">
            From raw feedback to AI-powered insights, LOOP gives every team the
            tools to discover what customers are saying and decide what to do
            next.
          </p>
        </div>

        {/* =================================================
            MAIN FEATURE GRID
           ================================================= */}

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            number="01"
            icon="message"
            title="Feedback Inbox"
            description="Bring customer feedback into one organized workspace with search, filtering, pagination, and status tracking."
            tag="CENTRALIZED FEEDBACK"
            color="#19e6d1"
            border="border-cyan-400/35"
          />

          <FeatureCard
            number="02"
            icon="brain"
            title="AI Classification"
            description="Automatically understand customer feedback through AI-powered sentiment and feedback classification."
            tag="AI POWERED"
            color="#39ed63"
            border="border-emerald-400/35"
          />

          <FeatureCard
            number="03"
            icon="layers"
            title="Theme Detection"
            description="Discover recurring topics and patterns across thousands of customer comments without manual sorting."
            tag="PATTERN DISCOVERY"
            color="#a855f7"
            border="border-purple-500/40"
          />

          <FeatureCard
            number="04"
            icon="chart"
            title="Trends & Analytics"
            description="Track feedback volume, sentiment movement, and important customer trends through clear visual analytics."
            tag="LIVE ANALYTICS"
            color="#28a9ff"
            border="border-blue-400/35"
          />

          <FeatureCard
            number="05"
            icon="spark"
            title="Ask LOOP"
            description="Ask questions about your customer feedback and receive AI-powered answers based on the intelligence in your workspace."
            tag="AI Q&A"
            color="#c45cff"
            border="border-fuchsia-500/40"
          />

          <FeatureCard
            number="06"
            icon="report"
            title="Voice of Customer"
            description="Generate structured customer intelligence reports that summarize sentiment, themes, problems, and opportunities."
            tag="AI REPORTS"
            color="#ff9800"
            border="border-orange-400/35"
          />
        </div>

        {/* =================================================
            SUPPORTING CAPABILITIES
           ================================================= */}

        <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-3">
          <FeatureRow
            icon="upload"
            title="Flexible feedback ingestion"
            text="Manual entries, CSV uploads, and simulated feedback sources."
            color="#19e6d1"
          />

          <FeatureRow
            icon="filter"
            title="Search & filtering"
            text="Quickly find the feedback that matters to your team."
            color="#a855f7"
          />

          <FeatureRow
            icon="search"
            title="Actionable intelligence"
            text="Move from customer signals to clear priorities and actions."
            color="#ff4d72"
          />
        </div>

        {/* =================================================
            BOTTOM CTA
           ================================================= */}

        <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.09] bg-[#050d19] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,.22)] sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/[0.09] text-cyan-300">
              <Icon name="brain" size={18} />
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-100">
                One platform. One customer voice.
              </p>

              <p className="mt-0.5 text-[9px] text-slate-500">
                Turn feedback into intelligence your team can act on.
              </p>
            </div>
          </div>

          <Link
            href="#how-it-works"
            className="group flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/[0.05] px-4 py-2 text-[10px] font-semibold text-cyan-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-cyan-300/[0.08] hover:shadow-[0_8px_25px_rgba(25,230,209,.12)]"
          >
            See how it works
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <Icon name="arrow" size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
