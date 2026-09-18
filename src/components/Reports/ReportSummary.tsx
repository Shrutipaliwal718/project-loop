"use client";

import { useEffect, useState } from "react";

type Theme = {
  name: string;
  count: number;
  percentage: number;
};

type DashboardData = {
  totalFeedback: number;
  sentimentBreakdown: {
    POS: number;
    NEU: number;
    NEG: number;
  };
  topThemes: Theme[];
};

const ReportSummary = () => {
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
          throw new Error(data.message ?? "Failed to load report summary.");
        }

        setAnalytics(data.analytics);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load report summary.",
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
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
          Executive summary
        </p>

        <h2 className="mt-2 text-lg font-semibold tracking-tight text-white">
          Customer feedback overview
        </h2>

        <div className="mt-6 flex min-h-[180px] items-center justify-center">
          <p className="text-xs text-slate-500">Loading report summary...</p>
        </div>
      </section>
    );
  }

  if (error || !analytics) {
    return (
      <section className="rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
          Executive summary
        </p>

        <h2 className="mt-2 text-lg font-semibold tracking-tight text-white">
          Customer feedback overview
        </h2>

        <div className="mt-5 rounded-xl border border-rose-400/10 bg-rose-400/[0.03] p-4">
          <p className="text-xs font-medium text-rose-300">
            Unable to load report summary
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            {error ?? "No analytics data available."}
          </p>
        </div>
      </section>
    );
  }

  const positive = analytics.sentimentBreakdown.POS;
  const neutral = analytics.sentimentBreakdown.NEU;
  const negative = analytics.sentimentBreakdown.NEG;

  const totalSentiment = positive + neutral + negative;

  const positivePercentage =
    totalSentiment > 0 ? Math.round((positive / totalSentiment) * 100) : 0;

  const neutralPercentage =
    totalSentiment > 0 ? Math.round((neutral / totalSentiment) * 100) : 0;

  const negativePercentage =
    totalSentiment > 0 ? Math.round((negative / totalSentiment) * 100) : 0;

  const topTheme = analytics.topThemes[0];

  let sentimentDescription = "Feedback sentiment is currently balanced.";

  if (
    positivePercentage > neutralPercentage &&
    positivePercentage > negativePercentage
  ) {
    sentimentDescription =
      "Customer feedback is currently showing a predominantly positive sentiment profile.";
  } else if (
    negativePercentage > positivePercentage &&
    negativePercentage > neutralPercentage
  ) {
    sentimentDescription =
      "Customer feedback is currently showing a predominantly negative sentiment profile.";
  } else if (
    neutralPercentage > positivePercentage &&
    neutralPercentage > negativePercentage
  ) {
    sentimentDescription =
      "Customer feedback is currently showing a predominantly neutral sentiment profile.";
  }

  const themeDescription = topTheme
    ? `${topTheme.name} is the strongest identified theme`
    : "No dominant theme has been identified yet.";

  const summaryDescription = `${sentimentDescription} ${themeDescription}. ${
    negativePercentage > 0
      ? "Negative feedback represents a smaller portion of the overall workspace feedback."
      : "No negative feedback has been recorded in the current data."
  }`;

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/[0.14]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Executive summary
          </p>

          <h2 className="mt-2 text-lg font-semibold tracking-tight text-white">
            Customer feedback overview
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {summaryDescription}
          </p>
        </div>

        <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 lg:max-w-[220px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
            Leading theme
          </p>

          <p className="mt-2 text-sm font-semibold text-white">
            {topTheme?.name ?? "No theme available"}
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            {topTheme?.count?.toLocaleString() ?? 0} feedback signals
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-cyan-400/[0.08] bg-cyan-400/[0.025] p-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
            Positive
          </p>

          <p className="mt-2 text-xl font-semibold text-cyan-300">
            {positivePercentage}%
          </p>

          <p className="mt-1 text-[10px] text-slate-500">Overall sentiment</p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
            Neutral
          </p>

          <p className="mt-2 text-xl font-semibold text-slate-300">
            {neutralPercentage}%
          </p>

          <p className="mt-1 text-[10px] text-slate-500">Overall sentiment</p>
        </div>

        <div className="rounded-xl border border-rose-400/[0.08] bg-rose-400/[0.025] p-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
            Negative
          </p>

          <p className="mt-2 text-xl font-semibold text-rose-300">
            {negativePercentage}%
          </p>

          <p className="mt-1 text-[10px] text-slate-500">Requires attention</p>
        </div>
      </div>
    </section>
  );
};

export default ReportSummary;
