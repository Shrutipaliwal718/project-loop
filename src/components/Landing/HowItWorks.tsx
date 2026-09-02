"use client";

import Link from "next/link";

/* =========================================================
   ICON SYSTEM
   ========================================================= */

type IconName =
  | "upload"
  | "brain"
  | "layers"
  | "target"
  | "arrow"
  | "message"
  | "chart"
  | "spark";

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
    case "upload":
      return (
        <svg {...common}>
          <path d="M12 16V4" />
          <path d="m7 9 5-5 5 5" />
          <path d="M5 15v5h14v-5" />
        </svg>
      );

    case "brain":
      return (
        <svg {...common}>
          <path d="M9.5 4.5A3.5 3.5 0 0 0 6 8v.5a3 3 0 0 0-2 2.8 3.2 3.2 0 0 0 3 3.2v.5a3 3 0 0 0 3 3V5.5" />
          <path d="M14.5 4.5A3.5 3.5 0 0 1 18 8v.5a3 3 0 0 1 2 2.8 3.2 3.2 0 0 1-3 3.2v.5a3 3 0 0 1-3 3V5.5" />
          <path d="M9.5 9h2M12.5 13h2M9.5 16h2M14.5 8h-2" />
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

    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );

    case "message":
      return (
        <svg {...common}>
          <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 2v-5.2A7.5 7.5 0 1 1 20 11.5Z" />
          <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
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

    case "spark":
      return (
        <svg {...common}>
          <path d="M12 2.5l1.9 6.1L20 10.5l-6.1 1.9L12 18.5l-1.9-6.1L4 10.5l6.1-1.9L12 2.5Z" />
          <path d="M19 15v4M17 17h4" />
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
   STEP CARD
   ========================================================= */

function StepCard({
  number,
  icon,
  title,
  description,
  details,
  color,
  border,
}: {
  number: string;
  icon: IconName;
  title: string;
  description: string;
  details: string[];
  color: string;
  border: string;
}) {
  return (
    <div
      className={`group relative rounded-2xl border ${border} bg-[#050d19] p-5 shadow-[0_10px_30px_rgba(0,0,0,.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,.48)]`}
    >
      {/* subtle glow */}

      <div
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-[0.07] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.16]"
        style={{
          backgroundColor: color,
        }}
      />

      {/* =================================================
          CARD HEADER
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
          style={{ color }}
        >
          STEP {number}
        </span>
      </div>

      {/* =================================================
          TITLE
         ================================================= */}

      <h3 className="relative mt-5 text-[16px] font-semibold tracking-[-0.02em] text-white">
        {title}
      </h3>

      {/* =================================================
          DESCRIPTION
         ================================================= */}

      <p className="relative mt-2 text-[11px] leading-[1.65] text-slate-400">
        {description}
      </p>

      {/* =================================================
          DETAILS
         ================================================= */}

      <div className="relative mt-4 space-y-2">
        {details.map((detail) => (
          <div key={detail} className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 7px ${color}70`,
              }}
            />

            <span className="text-[9px] text-slate-500">{detail}</span>
          </div>
        ))}
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
   CONNECTOR
   ========================================================= */

function Connector() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <div className="relative h-px w-8 bg-gradient-to-r from-cyan-400/20 via-cyan-400/50 to-purple-400/20">
        <span className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full border border-cyan-300/50 bg-[#010711]" />
      </div>
    </div>
  );
}

/* =========================================================
   MAIN SECTION
   ========================================================= */

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#010711] py-16 text-white sm:py-20"
    >
      {/* ===================================================
          BACKGROUND
         =================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* cyan */}

        <div className="absolute left-[-12%] top-[20%] h-[380px] w-[380px] rounded-full bg-cyan-500/[0.025] blur-[130px]" />

        {/* purple */}

        <div className="absolute right-[-12%] top-[30%] h-[420px] w-[420px] rounded-full bg-purple-600/[0.03] blur-[140px]" />

        {/* green */}

        <div className="absolute left-[35%] bottom-[-20%] h-[280px] w-[280px] rounded-full bg-emerald-500/[0.018] blur-[120px]" />
      </div>

      {/* ===================================================
          CONTENT
         =================================================== */}

      <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADING
           ================================================= */}

        <div className="mx-auto max-w-[760px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/[0.05] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_9px_rgba(59,130,246,.9)]" />

            <span className="text-[10px] font-semibold tracking-[0.12em] text-blue-300">
              HOW LOOP WORKS
            </span>
          </div>

          <h2 className="mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-slate-100 sm:text-[38px]">
            From customer feedback to
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              action in four simple steps.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[680px] text-[13px] leading-6 text-slate-400 sm:text-[14px]">
            LOOP continuously turns raw customer conversations into structured
            intelligence, helping your team understand what is happening and
            what should happen next.
          </p>
        </div>

        {/* =================================================
            WORKFLOW
           ================================================= */}

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {/* STEP 01 */}

          <StepCard
            number="01"
            icon="upload"
            title="Collect"
            description="Bring customer feedback into one centralized workspace."
            details={[
              "Manual feedback entry",
              "CSV bulk upload",
              "Feedback sources",
            ]}
            color="#19e6d1"
            border="border-cyan-400/35"
          />

          <Connector />

          {/* STEP 02 */}

          <StepCard
            number="02"
            icon="brain"
            title="Analyze"
            description="AI processes every piece of feedback to understand its meaning."
            details={[
              "Sentiment classification",
              "Feedback categorization",
              "AI-powered processing",
            ]}
            color="#39ed63"
            border="border-emerald-400/35"
          />

          <Connector />

          {/* STEP 03 */}

          <StepCard
            number="03"
            icon="layers"
            title="Discover"
            description="Reveal recurring themes, trends, problems, and opportunities."
            details={["Theme clustering", "Trend detection", "Emerging issues"]}
            color="#a855f7"
            border="border-purple-500/40"
          />

          <Connector />

          {/* STEP 04 */}

          <StepCard
            number="04"
            icon="target"
            title="Act"
            description="Turn customer intelligence into clear priorities for your team."
            details={[
              "Action signals",
              "AI recommendations",
              "Voice-of-Customer reports",
            ]}
            color="#ff9800"
            border="border-orange-400/35"
          />
        </div>

        {/* =================================================
            INTELLIGENCE FLOW
           ================================================= */}

        <div className="mt-7 rounded-2xl border border-white/[0.09] bg-[#050d19] p-4 shadow-[0_10px_30px_rgba(0,0,0,.22)] sm:p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* feedback */}

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/[0.09] text-cyan-300">
                <Icon name="message" size={18} />
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-100">
                  Customer voice
                </p>

                <p className="mt-0.5 text-[9px] text-slate-500">
                  Thousands of raw comments
                </p>
              </div>
            </div>

            {/* intelligence */}

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/[0.09] text-purple-300">
                <Icon name="spark" size={18} />
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-100">
                  LOOP intelligence
                </p>

                <p className="mt-0.5 text-[9px] text-slate-500">
                  AI-powered analysis and insights
                </p>
              </div>
            </div>

            {/* action */}

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/[0.09] text-orange-300">
                <Icon name="target" size={18} />
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-100">
                  Team action
                </p>

                <p className="mt-0.5 text-[9px] text-slate-500">
                  Priorities your team can act on
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM CTA
           ================================================= */}

        <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.09] bg-[#050d19] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,.22)] sm:flex-row sm:px-6">
          <div>
            <p className="text-[11px] font-semibold text-slate-100">
              Close the feedback loop.
            </p>

            <p className="mt-0.5 text-[9px] text-slate-500">
              Give every team a clearer view of what customers really need.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-300 to-cyan-400 px-4 py-2 text-[10px] font-bold text-[#021018] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(25,230,209,.2)]"
          >
            Explore LOOP
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <Icon name="arrow" size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
