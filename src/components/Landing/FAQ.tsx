"use client";

import { useState } from "react";

/* =========================================================
   ICONS
   ========================================================= */

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 transition-transform duration-300 ${
        open ? "rotate-45" : "rotate-0"
      }`}
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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
      className="text-loop-cyan"
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

/* =========================================================
   FAQ DATA
   ========================================================= */

const faqs = [
  {
    question: "What is LOOP?",
    answer:
      "LOOP is an AI-powered customer feedback intelligence platform that helps teams collect, analyze, and understand customer feedback. It turns raw feedback into sentiment insights, themes, trends, action signals, and structured reports.",
    accent: "cyan",
  },
  {
    question: "How does LOOP analyze customer feedback?",
    answer:
      "LOOP uses AI-powered analysis to process incoming feedback and identify sentiment, categories, themes, and important signals. The analyzed information can then be explored through dashboards, trends, Ask LOOP, and Voice-of-Customer reports.",
    accent: "blue",
  },
  {
    question: "How can I add feedback to LOOP?",
    answer:
      "LOOP supports multiple feedback ingestion methods, including manual single-feedback entry, CSV bulk upload, and simulated feedback sources. This allows teams to bring different types of customer feedback into one workspace.",
    accent: "green",
  },
  {
    question: "What are Themes and Trends?",
    answer:
      "Themes represent recurring topics or patterns found across customer feedback. Trends help teams understand how those topics and customer sentiment change over time, making it easier to identify emerging issues and important changes in the customer voice.",
    accent: "purple",
  },
  {
    question: "What is Ask LOOP?",
    answer:
      "Ask LOOP is an AI-powered question-and-answer feature that allows users to ask questions about customer feedback in their workspace. It provides answers grounded in the available feedback data so teams can explore customer insights more naturally.",
    accent: "violet",
  },
  {
    question: "What is a Voice-of-Customer report?",
    answer:
      "Voice-of-Customer reports provide a structured summary of customer feedback. Reports can bring together sentiment, themes, complaints, opportunities, priorities, and other important customer insights into a format that teams can use for decision-making.",
    accent: "orange",
  },
  {
    question: "Does LOOP support different user roles?",
    answer:
      "Yes. LOOP is designed around workspace-based access with three roles: Admin, Analyst, and Viewer. Each role can have different permissions and responsibilities within the workspace.",
    accent: "red",
  },
  {
    question: "Can teams search and filter customer feedback?",
    answer:
      "Yes. The Feedback Inbox is designed with search, filtering, pagination, and status workflow capabilities so teams can quickly find relevant feedback and manage it efficiently.",
    accent: "cyan",
  },
];

/* =========================================================
   ACCENT HELPERS
   ========================================================= */

function getAccentClasses(accent: string, open: boolean) {
  const styles = {
    cyan: {
      border: open
        ? "border-loop-cyan/35"
        : "border-white/[0.07] hover:border-loop-cyan/25",
      icon: "text-loop-cyan",
      glow: open ? "shadow-[0_12px_40px_rgba(25,230,209,0.07)]" : "",
      dot: "bg-loop-cyan",
    },

    blue: {
      border: open
        ? "border-loop-blue/35"
        : "border-white/[0.07] hover:border-loop-blue/25",
      icon: "text-loop-blue",
      glow: open ? "shadow-[0_12px_40px_rgba(40,169,255,0.07)]" : "",
      dot: "bg-loop-blue",
    },

    green: {
      border: open
        ? "border-loop-green/35"
        : "border-white/[0.07] hover:border-loop-green/25",
      icon: "text-loop-green",
      glow: open ? "shadow-[0_12px_40px_rgba(53,232,121,0.07)]" : "",
      dot: "bg-loop-green",
    },

    purple: {
      border: open
        ? "border-loop-purple/35"
        : "border-white/[0.07] hover:border-loop-purple/25",
      icon: "text-loop-purple",
      glow: open ? "shadow-[0_12px_40px_rgba(139,92,246,0.07)]" : "",
      dot: "bg-loop-purple",
    },

    violet: {
      border: open
        ? "border-loop-violet/35"
        : "border-white/[0.07] hover:border-loop-violet/25",
      icon: "text-loop-violet",
      glow: open ? "shadow-[0_12px_40px_rgba(196,92,255,0.07)]" : "",
      dot: "bg-loop-violet",
    },

    orange: {
      border: open
        ? "border-loop-amber/35"
        : "border-white/[0.07] hover:border-loop-amber/25",
      icon: "text-loop-amber",
      glow: open ? "shadow-[0_12px_40px_rgba(246,167,35,0.07)]" : "",
      dot: "bg-loop-amber",
    },

    red: {
      border: open
        ? "border-loop-red/35"
        : "border-white/[0.07] hover:border-loop-red/25",
      icon: "text-loop-red",
      glow: open ? "shadow-[0_12px_40px_rgba(255,77,114,0.07)]" : "",
      dot: "bg-loop-red",
    },
  };

  return styles[accent as keyof typeof styles] ?? styles.cyan;
}

/* =========================================================
   FAQ ITEM
   ========================================================= */

function FAQItem({
  question,
  answer,
  accent,
  open,
  onClick,
}: {
  question: string;
  answer: string;
  accent: string;
  open: boolean;
  onClick: () => void;
}) {
  const styles = getAccentClasses(accent, open);

  return (
    <div
      className={`
        overflow-hidden rounded-xl border bg-[#050d19]
        transition-all duration-300
        ${styles.border}
        ${styles.glow}
      `}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        className="
          flex w-full items-center justify-between gap-5
          px-5 py-4 text-left
          transition-colors duration-200
          hover:bg-white/[0.025]
          sm:px-6 sm:py-[18px]
        "
      >
        <div className="flex min-w-0 items-center gap-3.5">
          <span
            className={`
              h-1.5 w-1.5 shrink-0 rounded-full
              ${styles.dot}
              ${open ? "shadow-[0_0_10px_currentColor]" : ""}
            `}
          />

          <span className="text-[13px] font-medium leading-5 text-slate-100 sm:text-sm">
            {question}
          </span>
        </div>

        <span className={`${styles.icon}`}>
          <PlusIcon open={open} />
        </span>
      </button>

      <div
        className={`
          grid transition-all duration-300 ease-out
          ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`
              border-t border-white/[0.06]
              px-5 pb-5 pt-4
              sm:px-6 sm:pb-5
            `}
          >
            <p className="max-w-3xl text-[12px] leading-6 text-slate-400 sm:text-[13px]">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FAQ SECTION
   ========================================================= */

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faqs"
      className="
        relative overflow-hidden
        bg-[#030912]
        px-5 py-20
        sm:px-6
        lg:px-8 lg:py-24
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
          ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute left-1/2 top-20
            h-72 w-72
            -translate-x-1/2
            rounded-full
            bg-loop-cyan/[0.025]
            blur-3xl
          "
        />

        <div
          className="
            absolute bottom-10 right-0
            h-64 w-64
            rounded-full
            bg-loop-purple/[0.025]
            blur-3xl
          "
        />
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}

        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div
            className="
              mb-3 inline-flex items-center gap-2
              rounded-full border border-loop-cyan/15
              bg-loop-cyan/[0.04]
              px-3 py-1.5
              text-[10px] font-semibold uppercase
              tracking-[0.18em] text-loop-cyan
            "
          >
            <SparkIcon />
            <span>Frequently Asked Questions</span>
          </div>

          <h2
            className="
              text-[25px] font-semibold
              tracking-[-0.025em]
              text-white
              sm:text-[29px]
              lg:text-[32px]
            "
          >
            Everything you need to know about LOOP.
          </h2>

          <p
            className="
              mx-auto mt-3 max-w-xl
              text-[12px] leading-6
              text-slate-400
              sm:text-[13px]
            "
          >
            Learn how LOOP collects feedback, uses AI to uncover insights, and
            helps teams turn the customer voice into action.
          </p>
        </div>

        {/* ===================================================
            VERTICAL FAQ LIST
            =================================================== */}

        <div className="flex flex-col gap-2.5">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              accent={faq.accent}
              open={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* ===================================================
            BOTTOM STRIP
            =================================================== */}

        <div
          className="
            mt-7 flex flex-col items-center justify-between
            gap-4 rounded-xl
            border border-white/[0.07]
            bg-[#050d19]
            px-5 py-4
            sm:flex-row
            sm:px-6
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg
                border border-loop-cyan/20
                bg-loop-cyan/[0.05]
              "
            >
              <SparkIcon />
            </div>

            <div>
              <p className="text-[12px] font-medium text-slate-200">
                Still have questions?
              </p>

              <p className="mt-0.5 text-[10px] text-slate-500">
                Explore how LOOP closes the feedback loop.
              </p>
            </div>
          </div>

          <a
            href="#how-it-works"
            className="
              inline-flex items-center gap-2
              rounded-lg
              border border-loop-cyan/20
              bg-loop-cyan/[0.06]
              px-4 py-2
              text-[11px] font-medium
              text-loop-cyan
              transition-all duration-200
              hover:-translate-y-0.5
              hover:border-loop-cyan/40
              hover:bg-loop-cyan/[0.1]
              hover:shadow-[0_8px_25px_rgba(25,230,209,0.08)]
            "
          >
            See how LOOP works
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M13 6L19 12L13 18"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
