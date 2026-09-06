import dashboardData from "@/data/dashboard.json";

const ReportPreview = () => {
  const { analytics } = dashboardData;

  const topTheme = analytics.topThemes[0];

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
              Customer feedback currently shows a predominantly positive
              sentiment profile. The strongest identified theme is{" "}
              <span className="font-medium text-violet-300">
                {topTheme?.name ?? "Product Quality"}
              </span>
              . Negative sentiment accounts for{" "}
              <span className="font-medium text-rose-300">
                {analytics.negativePercentage}%
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
                    {analytics.sentimentBreakdown.POS}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-cyan-400"
                    style={{
                      width: `${analytics.sentimentBreakdown.POS}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Neutral</span>

                  <span className="text-xs font-semibold text-slate-300">
                    {analytics.sentimentBreakdown.NEU}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-slate-400"
                    style={{
                      width: `${analytics.sentimentBreakdown.NEU}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Negative</span>

                  <span className="text-xs font-semibold text-rose-300">
                    {analytics.sentimentBreakdown.NEG}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-rose-400"
                    style={{
                      width: `${analytics.sentimentBreakdown.NEG}%`,
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
