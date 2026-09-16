"use client";

import { useEffect, useState } from "react";

type Theme = {
  name: string;
  count: number;
  percentage: number;
};

type DashboardData = {
  totalFeedback: number;
  negativePercentage: number;
  sentimentBreakdown: {
    POS: number;
    NEU: number;
    NEG: number;
  };
  topThemes: Theme[];
};

const ReportPreview = () => {
  const [analytics, setAnalytics] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/dashboard", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok || !data.success || !data.analytics) {
          throw new Error(data.message ?? "Failed to load report preview.");
        }

        setAnalytics(data.analytics);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load report preview.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <section className="rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Report preview
          </p>

          <h2 className="mt-1.5 text-lg font-semibold text-white">
            Voice-of-Customer report
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Preview of the generated customer intelligence report.
          </p>
        </div>

        <div className="mt-5 flex min-h-[300px] items-center justify-center">
          <p className="text-xs text-slate-500">Loading report preview...</p>
        </div>
      </section>
    );
  }

  if (error || !analytics) {
    return (
      <section className="rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Report preview
          </p>

          <h2 className="mt-1.5 text-lg font-semibold text-white">
            Voice-of-Customer report
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Preview of the generated customer intelligence report.
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-rose-400/10 bg-rose-400/[0.03] p-4">
          <p className="text-xs font-medium text-rose-300">
            Unable to load report preview
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            {error ?? "No analytics data available."}
          </p>
        </div>
      </section>
    );
  }

  const topTheme = analytics.topThemes[0];

  const positiveCount = analytics.sentimentBreakdown.POS;
  const neutralCount = analytics.sentimentBreakdown.NEU;
  const negativeCount = analytics.sentimentBreakdown.NEG;

  const totalSentiment = positiveCount + neutralCount + negativeCount;

  const positivePercentage =
    totalSentiment > 0 ? Math.round((positiveCount / totalSentiment) * 100) : 0;

  const neutralPercentage =
    totalSentiment > 0 ? Math.round((neutralCount / totalSentiment) * 100) : 0;

  const negativePercentage =
    totalSentiment > 0 ? Math.round((negativeCount / totalSentiment) * 100) : 0;

  let sentimentSummary =
    "Customer feedback currently shows a balanced sentiment profile.";

  if (
    positivePercentage > neutralPercentage &&
    positivePercentage > negativePercentage
  ) {
    sentimentSummary =
      "Customer feedback currently shows a predominantly positive sentiment profile.";
  } else if (
    negativePercentage > positivePercentage &&
    negativePercentage > neutralPercentage
  ) {
    sentimentSummary =
      "Customer feedback currently shows a predominantly negative sentiment profile.";
  } else if (
    neutralPercentage > positivePercentage &&
    neutralPercentage > negativePercentage
  ) {
    sentimentSummary =
      "Customer feedback currently shows a predominantly neutral sentiment profile.";
  }

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Report preview
          </p>

          <h2 className="mt-1.5 text-lg font-semibold text-white">
            Voice-of-Customer report
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Preview of the generated customer intelligence report.
          </p>
        </div>

        <button
          type="button"
          className="w-fit rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] font-medium text-slate-400 transition-all duration-200 hover:border-cyan-400/15 hover:bg-cyan-400/[0.04] hover:text-cyan-300"
        >
          Export report
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.07] bg-[#060e18]">
        {/* Document header */}
        <div className="border-b border-white/[0.07] px-5 py-5 sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                LOOP Intelligence
              </p>

              <h3 className="mt-2 text-lg font-semibold text-white">
                Customer Feedback Report
              </h3>

              <p className="mt-1 text-[10px] text-slate-600">
                Workspace overview · Generated from analyzed feedback
              </p>
            </div>

            <div className="hidden rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-right sm:block">
              <p className="text-[9px] text-slate-600">Total feedback</p>

              <p className="mt-0.5 text-sm font-semibold text-slate-300">
                {analytics.totalFeedback.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Document body */}
        <div className="grid gap-0 lg:grid-cols-[1.5fr_1fr]">
          <div className="p-5 sm:p-7">
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              Executive summary
            </p>

            <p className="mt-3 text-xs leading-6 text-slate-400">
              {sentimentSummary} The strongest identified theme is{" "}
              <span className="font-medium text-violet-300">
                {topTheme?.name ?? "No theme available"}
              </span>
              . Negative sentiment accounts for{" "}
              <span className="font-medium text-rose-300">
                {negativePercentage}%
              </span>{" "}
              of analyzed feedback and should be examined alongside the leading
              themes.
            </p>

            <div className="mt-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                Key observation
              </p>

              <div className="mt-3 rounded-xl border border-cyan-400/[0.08] bg-cyan-400/[0.025] p-4">
                <p className="text-xs font-medium text-cyan-300">
                  {topTheme?.name ?? "Customer feedback"} is the leading
                  feedback signal.
                </p>

                <p className="mt-1.5 text-[10px] leading-5 text-slate-500">
                  This theme should be considered when prioritizing the next
                  round of customer-focused improvements.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.07] p-5 sm:p-7 lg:border-l lg:border-t-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              Sentiment snapshot
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Positive</span>

                  <span className="text-xs font-semibold text-cyan-300">
                    {positivePercentage}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-cyan-400"
                    style={{
                      width: `${positivePercentage}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Neutral</span>

                  <span className="text-xs font-semibold text-slate-300">
                    {neutralPercentage}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-slate-400"
                    style={{
                      width: `${neutralPercentage}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Negative</span>

                  <span className="text-xs font-semibold text-rose-300">
                    {negativePercentage}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-rose-400"
                    style={{
                      width: `${negativePercentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-white/[0.06] pt-5">
              <p className="text-[9px] text-slate-600">Report status</p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="text-[10px] font-medium text-slate-400">
                  Ready for review
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportPreview;
