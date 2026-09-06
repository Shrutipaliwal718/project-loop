import dashboardData from "@/data/dashboard.json";

const ActionableInsights = () => {
  const { analytics } = dashboardData;

  const topTheme = analytics.topThemes[0];
  const secondTheme = analytics.topThemes[1];

  const firstVolume = analytics.volumeOverTime[0]?.count ?? 0;
  const lastVolume =
    analytics.volumeOverTime[analytics.volumeOverTime.length - 1]?.count ?? 0;

  const volumeChange =
    firstVolume > 0
      ? Math.round(((lastVolume - firstVolume) / firstVolume) * 100)
      : 0;

  const insights = [
    {
      label: "Priority",
      title: topTheme
        ? `Investigate ${topTheme.name}`
        : "Review leading customer theme",
      description: topTheme
        ? `${topTheme.name} is currently the strongest identified feedback theme.`
        : "Review the strongest available feedback theme.",
      icon: "↑",
      iconClass: "border-amber-400/10 bg-amber-400/[0.05] text-amber-300",
    },
    {
      label: "Sentiment",
      title: `${analytics.negativePercentage}% negative feedback`,
      description:
        "Review negative feedback alongside its associated themes to identify potential customer pain points.",
      icon: "!",
      iconClass: "border-rose-400/10 bg-rose-400/[0.05] text-rose-300",
    },
    {
      label: "Theme",
      title: secondTheme
        ? `${secondTheme.name} is a key signal`
        : "Review secondary themes",
      description: secondTheme
        ? `${secondTheme.count.toLocaleString()} feedback signals are associated with this theme.`
        : "Review secondary themes for additional opportunities.",
      icon: "◆",
      iconClass: "border-violet-400/10 bg-violet-400/[0.05] text-violet-300",
    },
    {
      label: "Volume",
      title:
        volumeChange >= 0
          ? `Feedback volume increased ${volumeChange}%`
          : `Feedback volume decreased ${Math.abs(volumeChange)}%`,
      description:
        "Compare recent volume changes with sentiment and themes to understand what is driving the movement.",
      icon: volumeChange >= 0 ? "↗" : "↘",
      iconClass: "border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-300",
    },
  ];

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/[0.14]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-400">
            Decision support
          </p>

          <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-white">
            Actionable insights
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Signals worth investigating from the available feedback data.
          </p>
        </div>

        <span className="hidden rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[9px] text-slate-600 sm:block">
          AI assisted
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className="group rounded-xl border border-white/[0.06] bg-white/[0.018] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.11] hover:bg-white/[0.03]"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold ${insight.iconClass}`}
              >
                {insight.icon}
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                  {insight.label}
                </p>

                <h3 className="mt-1 text-xs font-semibold text-slate-200">
                  {insight.title}
                </h3>

                <p className="mt-1.5 text-[10px] leading-5 text-slate-500">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActionableInsights;
