"use client";

import dashboardData from "@/data/dashboard.json";

const ThemeTrends = () => {
  const themes = dashboardData.analytics.topThemes;

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-300 hover:border-violet-400/[0.14]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Themes
          </p>

          <h2 className="mt-1 text-base font-semibold text-white">
            Top customer themes
          </h2>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/10 bg-violet-400/[0.06]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-4 w-4 text-violet-300"
          >
            <circle cx="12" cy="12" r="8" />
            <path strokeLinecap="round" d="M8.5 12h7M12 8.5v7" />
          </svg>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {themes.map((theme, index) => (
          <div
            key={theme.name}
            className="group rounded-xl border border-white/[0.06] bg-white/[0.015] p-3 transition-all duration-300 hover:border-violet-400/15 hover:bg-violet-400/[0.025]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-400/[0.07] text-[11px] font-semibold text-violet-300">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-xs font-medium text-slate-200">
                    {theme.name}
                  </p>

                  <span className="shrink-0 text-[11px] font-medium text-slate-500">
                    {theme.count}
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500/80 to-cyan-400/80 transition-all duration-700 group-hover:from-violet-400 group-hover:to-cyan-300"
                    style={{ width: `${theme.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThemeTrends;
