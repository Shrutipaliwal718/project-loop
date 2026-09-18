"use client";

import { useState } from "react";
import styles from "./feedback.module.css";
import ManualFeedbackForm from "./ManualFeedbackForm";
import CsvUpload from "./CsvUpload";
import SimulatedChannel from "./SimulatedChannel";

type IngestionTab = "manual" | "csv" | "simulated";

const FeedbackIngestion = () => {
  const [activeTab, setActiveTab] = useState<IngestionTab>("manual");

  const tabs = [
    {
      id: "manual" as const,
      label: "Manual feedback",
      description: "Add a single customer response",
    },
    {
      id: "csv" as const,
      label: "CSV upload",
      description: "Import feedback in bulk",
    },
    {
      id: "simulated" as const,
      label: "Simulated channel",
      description: "Test channel ingestion",
    },
  ];

  return (
    <section className={styles.fadeUp}>
      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="liveDot h-1.5 w-1.5 rounded-full bg-cyan-400" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
              Feedback workspace
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Capture customer feedback
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Bring customer feedback into LOOP and turn raw responses into
            actionable intelligence.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-[#091523]/70 px-3 py-2 text-[10px] text-slate-500 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Intake system ready
        </div>
      </div>

      {/* Main card */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#07111e]/90 shadow-2xl shadow-black/20">
        {/* Tabs */}
        <div className="border-b border-white/[0.07] p-2">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`${styles.ingestionTab} ${
                    isActive ? styles.ingestionTabActive : ""
                  } ${
                    isActive
                      ? "border border-cyan-400/15 bg-cyan-400/[0.06]"
                      : "border border-transparent hover:bg-white/[0.025]"
                  } rounded-xl px-4 py-3.5 text-left`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                        isActive
                          ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-[0_0_18px_rgba(25,230,209,0.08)]"
                          : "border-white/[0.07] bg-white/[0.025] text-slate-500"
                      }`}
                    >
                      {tab.id === "manual" && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20h9"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                          />
                        </svg>
                      )}

                      {tab.id === "csv" && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 2v6h6"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 13h8M8 17h5"
                          />
                        </svg>
                      )}

                      {tab.id === "simulated" && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          className="h-4 w-4"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 9l6 3-6 3V9z"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`text-xs font-semibold ${
                          isActive ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {tab.label}
                      </p>

                      <p className="mt-1 text-[10px] leading-4 text-slate-500">
                        {tab.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className={styles.contentEnter + " p-5 sm:p-6 lg:p-7"}>
          {activeTab === "manual" && <ManualFeedbackForm />}
          {activeTab === "csv" && <CsvUpload />}
          {activeTab === "simulated" && <SimulatedChannel />}
        </div>
      </div>
    </section>
  );
};

export default FeedbackIngestion;
