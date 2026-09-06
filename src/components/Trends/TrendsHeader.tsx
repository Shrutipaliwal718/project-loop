"use client";

import { useState } from "react";

const TrendsHeader = () => {
  const [range, setRange] = useState("12 days");

  return (
    <section className="mb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(25,230,209,0.8)]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Intelligence
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Trends & Themes
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Understand how customer sentiment, themes, and feedback volume are
            evolving across your workspace.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <div className="flex items-center rounded-xl border border-white/[0.08] bg-[#091523] p-1">
            {["7 days", "12 days", "30 days"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRange(item)}
                className={`rounded-lg px-3 py-2 text-[11px] font-medium transition-all duration-200 ${
                  range === item
                    ? "bg-cyan-400/10 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(25,230,209,0.12)]"
                    : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendsHeader;
