import dashboardData from "@/data/dashboard.json";

const ViewerStats = () => {
  const { analytics } = dashboardData;

  const stats = [
    {
      label: "Total Feedback",
      value: analytics.totalFeedback.toLocaleString(),
      icon: (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
          />
        </svg>
      ),
      iconClass: "text-cyan-300",
      iconBg: "border-cyan-400/20 bg-cyan-400/10",
    },
    {
      label: "Negative Feedback",
      value: `${analytics.negativePercentage}%`,
      icon: (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 15l5-5m0 0 5 5m-5-5v9"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"
          />
        </svg>
      ),
      iconClass: "text-red-300",
      iconBg: "border-red-400/20 bg-red-400/10",
    },
    {
      label: "New This Week",
      value: analytics.newThisWeek.toLocaleString(),
      icon: (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 19V5m0 14h16"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 15l4-4 3 2 6-7"
          />
        </svg>
      ),
      iconClass: "text-amber-300",
      iconBg: "border-amber-400/20 bg-amber-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 shadow-[0_0_30px_rgba(0,0,0,0.12)] transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.035]"
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-slate-500">
              {stat.label}
            </p>

            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg border ${stat.iconBg} ${stat.iconClass}`}
            >
              {stat.icon}
            </div>
          </div>

          <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ViewerStats;
