"use client";

import dashboardData from "@/data/dashboard.json";

const TrendInsights = () => {
  const volume = dashboardData.analytics.volumeOverTime;
  const themes = dashboardData.analytics.topThemes;

  const firstCount = volume[0]?.count ?? 0;
  const lastCount = volume[volume.length - 1]?.count ?? 0;

  const volumeChange =
    firstCount > 0
      ? Math.round(((lastCount - firstCount) / firstCount) * 100)
      : 0;

  const leadingTheme = themes[0];

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
                Feedback volume is increasing
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                Feedback moved from {firstCount.toLocaleString()} to{" "}
                {lastCount.toLocaleString()} across the available period.
              </p>

              <p className="mt-2 text-[11px] font-semibold text-cyan-300">
                +{volumeChange}% from first to latest point
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
