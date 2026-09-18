"use client";

import { useEffect, useState } from "react";

type Theme = {
  name: string;
  count: number;
  percentage: number;
};

type VolumePoint = {
  date: string;
  count: number;
};

type DashboardData = {
  volumeOverTime: VolumePoint[];
  topThemes: Theme[];
};

const TrendInsights = () => {
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
          throw new Error(data.message ?? "Failed to load trend insights.");
        }

        setAnalytics({
          volumeOverTime: data.analytics.volumeOverTime ?? [],
          topThemes: data.analytics.topThemes ?? [],
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load trend insights.",
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
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Intelligence
            </p>

            <h2 className="mt-1 text-base font-semibold text-white">
              Trend signals
            </h2>
          </div>
        </div>

        <div className="mt-5 flex min-h-[220px] items-center justify-center">
          <p className="text-xs text-slate-500">Loading trend insights...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Intelligence
            </p>

            <h2 className="mt-1 text-base font-semibold text-white">
              Trend signals
            </h2>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-rose-400/10 bg-rose-400/[0.03] p-4">
          <p className="text-xs font-medium text-rose-300">
            Unable to load trend insights
          </p>

          <p className="mt-1 text-[11px] text-slate-500">{error}</p>
        </div>
      </section>
    );
  }

  const volume = analytics?.volumeOverTime ?? [];
  const themes = analytics?.topThemes ?? [];

  const firstCount = volume[0]?.count ?? 0;
  const lastCount = volume[volume.length - 1]?.count ?? 0;

  const volumeChange =
    firstCount > 0
      ? Math.round(((lastCount - firstCount) / firstCount) * 100)
      : 0;

  const leadingTheme = themes[0];

  const volumeChangeLabel =
    volumeChange > 0 ? `+${volumeChange}%` : `${volumeChange}%`;

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/[0.14]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Intelligence
          </p>

          <h2 className="mt-1 text-base font-semibold text-white">
            Trend signals
          </h2>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/10 bg-cyan-400/[0.06]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-4 w-4 text-cyan-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 17l5-5 3 3 6-7"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h3v3" />
          </svg>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
              <span className="text-xs text-cyan-300">↗</span>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-200">
                Feedback volume is changing
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                Feedback moved from {firstCount.toLocaleString()} to{" "}
                {lastCount.toLocaleString()} across the available period.
              </p>

              <p className="mt-2 text-[11px] font-semibold text-cyan-300">
                {volumeChangeLabel} from first to latest point
              </p>
            </div>
          </div>
        </div>

        {leadingTheme && (
          <div className="rounded-xl border border-violet-400/10 bg-violet-400/[0.03] p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-400/10">
                <span className="text-xs text-violet-300">✦</span>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-200">
                  Leading theme
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  {leadingTheme.name} currently leads the available theme data
                  with {leadingTheme.count.toLocaleString()} feedback items.
                </p>

                <p className="mt-2 text-[11px] font-semibold text-violet-300">
                  Theme score {leadingTheme.percentage}%
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Analysis coverage
            </span>

            <span className="text-[11px] font-medium text-slate-300">
              {volume.length} data points
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendInsights;
