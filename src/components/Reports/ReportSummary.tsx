import dashboardData from "@/data/dashboard.json";

const ReportSummary = () => {
  const { analytics } = dashboardData;

  const positive = analytics.sentimentBreakdown.POS;
  const neutral = analytics.sentimentBreakdown.NEU;
  const negative = analytics.sentimentBreakdown.NEG;

  const topTheme = analytics.topThemes[0];

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
            Customer feedback is currently showing a predominantly positive
            sentiment profile. Product Quality is the strongest identified
            theme, while negative feedback represents a smaller portion of the
            overall workspace feedback.
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
            {positive}%
          </p>

          <p className="mt-1 text-[10px] text-slate-500">Overall sentiment</p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
            Neutral
          </p>

          <p className="mt-2 text-xl font-semibold text-slate-300">
            {neutral}%
          </p>

          <p className="mt-1 text-[10px] text-slate-500">Overall sentiment</p>
        </div>

        <div className="rounded-xl border border-rose-400/[0.08] bg-rose-400/[0.025] p-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
            Negative
          </p>

          <p className="mt-2 text-xl font-semibold text-rose-300">
            {negative}%
          </p>

          <p className="mt-1 text-[10px] text-slate-500">Requires attention</p>
        </div>
      </div>
    </section>
  );
};

export default ReportSummary;
