"use client";

import { useState } from "react";
import ReportsHeader from "./ReportsHeader";
import ReportSummary from "./ReportSummary";
import KeyThemes from "./KeyThemes";
import ActionableInsights from "./ActionableInsights";
import ReportPreview from "./ReportPreview";

const ReportsShell = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");

  const handleGenerateReport = async () => {
    if (isGenerating) {
      return;
    }

    setGenerateError("");
    setIsGenerating(true);

    try {
      const periodEnd = new Date();
      const periodStart = new Date(
        periodEnd.getTime() - 30 * 24 * 60 * 60 * 1000,
      );

      const response = await fetch("/api/reports/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          periodStart: periodStart.toISOString(),
          periodEnd: periodEnd.toISOString(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Failed to generate report.",
        );
      }

      window.location.reload();
    } catch (error) {
      console.error("Generate report error:", error);

      setGenerateError(
        error instanceof Error
          ? error.message
          : "Failed to generate report.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <ReportsHeader
        onGenerate={handleGenerateReport}
        isGenerating={isGenerating}
      />

      {generateError && (
        <div className="mt-5 rounded-xl border border-red-400/15 bg-red-400/[0.04] px-4 py-3">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]" />

            <div>
              <p className="text-xs font-medium text-red-300">
                Report generation failed
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                {generateError}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setGenerateError("")}
              className="ml-auto shrink-0 text-[10px] text-slate-500 transition-colors hover:text-slate-300"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="mt-7">
        <ReportSummary />
      </div>

      <div className="mt-5 grid items-stretch gap-5 lg:grid-cols-2">
        <div className="h-full">
          <KeyThemes />
        </div>

        <div className="h-full">
          <ActionableInsights />
        </div>
      </div>

      <div className="mt-5">
        <ReportPreview />
      </div>
    </div>
  );
};

export default ReportsShell;
