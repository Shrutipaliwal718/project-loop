"use client";

import Link from "next/link";

/* =========================================================
   ICONS
   ========================================================= */

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2L13.8 9.2L21 11L13.8 12.8L12 20L10.2 12.8L3 11L10.2 9.2L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5L9.5 17L19 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   CTA
   ========================================================= */

export default function CTA() {
  return (
    <section
      className="
        relative overflow-hidden
        bg-[#030912]
        px-5 py-20
        sm:px-6
        lg:px-8 lg:py-24
      "
    >
      {/* =====================================================
          BACKGROUND EFFECTS
          ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Cyan glow */}
        <div
          className="
            absolute left-[15%] top-1/2
            h-72 w-72
            -translate-y-1/2
            rounded-full
            bg-loop-cyan/[0.035]
            blur-3xl
          "
        />

        {/* Violet glow */}
        <div
          className="
            absolute right-[10%] top-1/2
            h-80 w-80
            -translate-y-1/2
            rounded-full
            bg-loop-purple/[0.035]
            blur-3xl
          "
        />
      </div>

      {/* =====================================================
          MAIN CTA CARD
          ===================================================== */}

      <div
        className="
          relative mx-auto max-w-5xl
          overflow-hidden
          rounded-2xl
          border border-white/[0.08]
          bg-[#050d19]
          shadow-[0_25px_80px_rgba(0,0,0,0.28)]
        "
      >
        {/* Top gradient line */}

        <div
          className="
            absolute left-0 right-0 top-0 h-px
            bg-gradient-to-r
            from-transparent
            via-loop-cyan/60
            to-transparent
          "
        />

        {/* Subtle inner glow */}

        <div
          className="
            pointer-events-none absolute
            left-1/2 top-0
            h-64 w-[70%]
            -translate-x-1/2
            rounded-full
            bg-loop-cyan/[0.025]
            blur-3xl
          "
        />

        <div
          className="
            relative
            px-6 py-12
            text-center
            sm:px-10 sm:py-14
            lg:px-16 lg:py-16
          "
        >
          {/* =================================================
              BADGE
              ================================================= */}

          <div
            className="
              mx-auto mb-5
              inline-flex items-center gap-2
              rounded-full
              border border-loop-cyan/20
              bg-loop-cyan/[0.05]
              px-3 py-1.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-loop-cyan
            "
          >
            <SparkIcon />
            Close the feedback loop
          </div>

          {/* =================================================
              HEADING
              ================================================= */}

          <h2
            className="
              mx-auto max-w-3xl
              text-[28px]
              font-semibold
              leading-tight
              tracking-[-0.03em]
              text-white
              sm:text-[34px]
              lg:text-[40px]
            "
          >
            Turn customer feedback into
            <span
              className="
                block
                bg-gradient-to-r
                from-loop-cyan
                via-loop-blue
                to-loop-purple
                bg-clip-text
                text-transparent
              "
            >
              decisions your team can act on.
            </span>
          </h2>

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <p
            className="
              mx-auto mt-4
              max-w-2xl
              text-[12px]
              leading-6
              text-slate-400
              sm:text-[13px]
            "
          >
            Bring customer feedback into one intelligent workspace. Let LOOP
            uncover sentiment, themes, trends, and action signals so your team
            can understand the customer voice and move faster.
          </p>

          {/* =================================================
              BUTTONS
              ================================================= */}

          <div
            className="
              mt-7
              flex flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row
            "
          >
            <Link
              href="/dashboard"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border border-loop-cyan/40
                bg-loop-cyan
                px-5 py-2.5
                text-[12px]
                font-semibold
                text-[#03100f]
                shadow-[0_8px_30px_rgba(25,230,209,0.12)]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-loop-cyan
                hover:shadow-[0_12px_35px_rgba(25,230,209,0.2)]
              "
            >
              Explore LOOP
              <span
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              >
                <ArrowIcon />
              </span>
            </Link>

            <a
              href="#how-it-works"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border border-white/[0.09]
                bg-white/[0.025]
                px-5 py-2.5
                text-[12px]
                font-medium
                text-slate-300
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-loop-blue/30
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              See how it works
            </a>
          </div>

          {/* =================================================
              TRUST / CAPABILITY ROW
              ================================================= */}

          <div
            className="
              mx-auto mt-9
              flex max-w-2xl
              flex-wrap
              items-center
              justify-center
              gap-x-5
              gap-y-3
              border-t border-white/[0.06]
              pt-6
            "
          >
            <div className="flex items-center gap-2">
              <span className="text-loop-cyan">
                <CheckIcon />
              </span>
              <span className="text-[10px] text-slate-500">
                AI-powered analysis
              </span>
            </div>

            <div className="hidden h-3 w-px bg-white/[0.08] sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-loop-green">
                <CheckIcon />
              </span>
              <span className="text-[10px] text-slate-500">
                Real-time insights
              </span>
            </div>

            <div className="hidden h-3 w-px bg-white/[0.08] sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-loop-purple">
                <CheckIcon />
              </span>
              <span className="text-[10px] text-slate-500">
                Actionable intelligence
              </span>
            </div>

            <div className="hidden h-3 w-px bg-white/[0.08] sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-loop-amber">
                <CheckIcon />
              </span>
              <span className="text-[10px] text-slate-500">
                Built for teams
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM MESSAGE
          ===================================================== */}

      <div className="relative mx-auto mt-6 max-w-5xl text-center">
        <p className="text-[10px] tracking-wide text-slate-600">
          Collect. Understand. Discover. Act.
        </p>
      </div>
    </section>
  );
}
