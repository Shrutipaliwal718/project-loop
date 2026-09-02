"use client";

import { useState } from "react";

const faqs = [
  ["What is LOOP?", "LOOP is an AI-powered customer feedback intelligence platform that centralizes feedback and turns it into sentiment, themes, trends and actionable intelligence."],
  ["How does LOOP analyze feedback?", "LOOP uses AI to classify customer feedback, identify sentiment and categories, and surface recurring themes and emerging customer signals."],
  ["Who can use LOOP?", "LOOP is designed for teams that need a clearer view of customer feedback, including product, customer-experience and analytics-focused teams."],
  ["What roles are supported?", "The application is designed around three workspace roles: ADMIN, ANALYST and VIEWER, with permissions appropriate to each role."],
  ["How does LOOP protect workspace data?", "The intended architecture uses authentication, workspace ownership, workspaceId filtering and backend-enforced role permissions. The landing page itself does not implement that security layer."],
  ["Can LOOP identify recurring customer themes?", "Yes. Theme detection and clustering are core intelligence capabilities designed to surface repeated topics and changing customer concerns."],
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="loop-section" id="faq">
      <div className="loop-container">
        <div className="loop-section-heading">
          <div className="mb-3 text-[10px] font-bold tracking-[0.22em] text-cyan-300">FAQ</div>
          <h2>Frequently asked <span className="loop-gradient-text">questions.</span></h2>
          <p>Quick answers about the LOOP platform and its customer-intelligence workflow.</p>
        </div>

        <div className="mx-auto max-w-3xl space-y-2.5">
          {faqs.map(([question, answer], index) => {
            const open = openIndex === index;
            return (
              <div key={question} className={`loop-faq overflow-hidden rounded-xl border transition-colors duration-300 ${open ? "border-cyan-300/25 bg-cyan-300/[0.025]" : "border-white/[0.09] bg-white/[0.012]"}`}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
                  aria-expanded={open}
                >
                  <span className={`w-7 text-[10px] font-bold ${open ? "text-cyan-300" : "text-slate-600"}`}>{String(index + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-sm font-semibold text-white">{question}</span>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-slate-400 transition duration-300 ${open ? "rotate-45 border-cyan-300/30 text-cyan-300" : "border-white/10"}`}>+</span>
                </button>
                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="min-h-0 overflow-hidden">
                    <p className="border-t border-white/[0.07] px-11 py-4 text-xs leading-6 text-slate-400 sm:px-16">{answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
