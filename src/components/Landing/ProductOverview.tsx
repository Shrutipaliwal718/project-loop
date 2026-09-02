"use client";

import Link from "next/link";

/* =========================================================
   ICONS
   ========================================================= */

type IconName =
  | "inbox"
  | "brain"
  | "layers"
  | "alert"
  | "lightbulb"
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
    case "inbox":
      return (
        <svg {...common}>
          <path d="M4 4h16v13H4z" />
          <path d="M4 13h4l1.5 3h5L16 13h4" />
          <path d="M8 8h8M8 11h5" />
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

    case "alert":
      return (
        <svg {...common}>
          <path d="M12 4 21 20H3L12 4Z" />
          <path d="M12 9v5M12 17h.01" />
        </svg>
      );

    case "lightbulb":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 21h4" />
          <path d="M8.2 14.5A6 6 0 1 1 16 14c-.8.7-1 1.5-1 2.5H9c0-1-.2-1.3-.8-2Z" />
          <path d="M12 3V2M4.5 5.5l-.7-.7M19.5 5.5l.7-.7" />
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
   PRODUCT CARD
   ========================================================= */

function ProductCard({
  number,
  icon,
  title,
  description,
  color,
  border,
}: {
  number: string;
  icon: IconName;
  title: string;
  description: string;
  color: string;
  border: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${border} bg-[#050d19] p-5 shadow-[0_10px_30px_rgba(0,0,0,.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_42px_rgba(0,0,0,.48)]`}
    >
      {/* subtle corner glow */}

      <div
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-[0.10] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.18]"
        style={{ backgroundColor: color }}
      />

      {/* top */}

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
          className="text-[10px] font-semibold tracking-[0.14em]"
          style={{ color }}
        >
          {number}
        </span>
      </div>

      {/* content */}

      <div className="relative mt-5">
        <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-white">
          {title}
        </h3>

        <p className="mt-2 text-[11px] leading-5 text-slate-400">
          {description}
        </p>
      </div>

      {/* bottom line */}

      <div
        className="relative mt-5 h-px w-0 opacity-60 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

/* =========================================================
   MAIN PRODUCT SECTION
   ========================================================= */

export default function ProductOverview() {
  return (
    <section
      id="product"
      className="relative overflow-hidden bg-[#010711] py-16 text-white sm:py-20"
    >
      {/* ===================================================
          BACKGROUND
         =================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* cyan */}

        <div className="absolute left-[-12%] top-[20%] h-[380px] w-[380px] rounded-full bg-cyan-500/[0.025] blur-[130px]" />

        {/* purple */}

        <div className="absolute right-[-12%] top-[35%] h-[420px] w-[420px] rounded-full bg-purple-600/[0.03] blur-[140px]" />

        {/* orange */}

        <div className="absolute right-[20%] bottom-[-15%] h-[280px] w-[280px] rounded-full bg-orange-500/[0.018] blur-[120px]" />
      </div>

      {/* ===================================================
          CONTENT
         =================================================== */}

      <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADING
           ================================================= */}

        <div className="mx-auto max-w-[760px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-[#04131d] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_9px_rgba(25,230,209,.9)]" />

            <span className="text-[10px] font-semibold tracking-[0.12em] text-cyan-300">
              THE LOOP INTELLIGENCE ENGINE
            </span>
          </div>

          <h2 className="mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] text-slate-100 sm:text-[38px]">
            Turn customer feedback into
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              intelligence your team can act on.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[680px] text-[13px] leading-6 text-slate-400 sm:text-[14px]">
            LOOP brings customer feedback into one place, analyzes what
            customers are saying, and turns thousands of comments into clear
            insights, themes, problems, and actions.
          </p>
        </div>

        {/* =================================================
            PRODUCT FLOW
           ================================================= */}

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            number="01"
            icon="inbox"
            title="Collect feedback"
            description="Bring customer feedback into LOOP through manual entries, CSV uploads, and connected feedback sources."
            color="#19e6d1"
            border="border-cyan-400/35"
          />

          <ProductCard
            number="02"
            icon="brain"
            title="Understand sentiment"
            description="AI analyzes customer comments to identify positive, neutral, and negative sentiment at scale."
            color="#39ed63"
            border="border-emerald-400/35"
          />

          <ProductCard
            number="03"
            icon="layers"
            title="Discover themes"
            description="Identify recurring themes and patterns across customer conversations to understand what matters most."
            color="#a855f7"
            border="border-purple-500/40"
          />

          <ProductCard
            number="04"
            icon="alert"
            title="Spot emerging issues"
            description="Surface new problems and changes in customer sentiment before they become larger product or support issues."
            color="#ff4d72"
            border="border-rose-500/35"
          />

          <ProductCard
            number="05"
            icon="lightbulb"
            title="Find opportunities"
            description="Turn feature requests and customer suggestions into clear opportunities for your product team."
            color="#f59e0b"
            border="border-amber-400/35"
          />

          <ProductCard
            number="06"
            icon="target"
            title="Take action"
            description="LOOP highlights the actions your team should prioritize so feedback leads to measurable improvements."
            color="#28a9ff"
            border="border-blue-400/35"
          />
        </div>

        {/* =================================================
            BOTTOM PRODUCT MESSAGE
           ================================================= */}

        <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.09] bg-[#050d19] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,.22)] sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/[0.10] text-cyan-300">
              <Icon name="brain" size={18} />
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-100">
                From raw feedback to actionable intelligence
              </p>

              <p className="mt-0.5 text-[9px] text-slate-500">
                One continuous feedback intelligence loop.
              </p>
            </div>
          </div>

          <Link
            href="#features"
            className="group flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/[0.05] px-4 py-2 text-[10px] font-semibold text-cyan-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-cyan-300/[0.08] hover:shadow-[0_8px_25px_rgba(25,230,209,.12)]"
          >
            Explore capabilities
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <Icon name="arrow" size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
