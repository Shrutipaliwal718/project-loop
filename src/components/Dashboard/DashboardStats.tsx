import dashboardData from "@/data/dashboard.json";
import styles from "./dashboard.module.css";

const DashboardStats = () => {
  const { analytics } = dashboardData;

  const stats = [
    {
      label: "Total feedback",
      value: analytics.totalFeedback.toLocaleString(),
      change: "+18.4%",
      type: "positive",

      className:
        "from-cyan-500/[0.16] via-cyan-500/[0.05] to-transparent border-cyan-400/25",

      iconClass: "bg-cyan-400/15 text-cyan-300 border-cyan-400/20",

      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5h-4.2l-3.8 3v-3H7.5A2.5 2.5 0 0 1 5 12.5v-6Z"
          />

          <path strokeLinecap="round" d="M9 8h6M9 11h4" />
        </svg>
      ),
    },

    {
      label: "Negative feedback",
      value: `${analytics.negativePercentage}%`,
      change: "Of total feedback",
      type: "neutral",

      className:
        "from-red-500/[0.14] via-red-500/[0.04] to-transparent border-red-400/20",

      iconClass: "bg-red-400/15 text-red-300 border-red-400/20",

      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8" />

          <path strokeLinecap="round" d="M8.8 9.5h.01M15.2 9.5h.01" />

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.8 15c.9-.9 2-1.35 3.2-1.35s2.3.45 3.2 1.35"
          />
        </svg>
      ),
    },

    {
      label: "New this week",
      value: analytics.newThisWeek.toLocaleString(),
      change: "New feedback",
      type: "positive",

      className:
        "from-violet-500/[0.15] via-violet-500/[0.04] to-transparent border-violet-400/20",

      iconClass: "bg-violet-400/15 text-violet-300 border-violet-400/20",

      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <rect x="4" y="5" width="16" height="15" rx="2" />

          <path strokeLinecap="round" d="M8 3.5v3M16 3.5v3M4 9h16" />

          <path strokeLinecap="round" d="M9 14h6M12 11v6" />
        </svg>
      ),
    },

    {
      label: "Action signals",
      value: "3",
      change: "Recommended actions",
      type: "urgent",

      className:
        "from-red-500/[0.16] via-rose-500/[0.05] to-transparent border-red-400/25",

      iconClass: "bg-red-400/15 text-red-300 border-red-400/20",

      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m13.2 3-7 10h5.3L10.8 21l7-10h-5.3L13.2 3Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className={`${styles.fadeUp} ${styles.delay1}`}>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(0,0,0,.25)] ${stat.className}`}
          >
            {/* Glow */}
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/[0.03] blur-2xl" />

            <div className="relative flex items-start gap-3.5">
              {/* Icon */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${stat.iconClass}`}
              >
                {stat.icon}
              </div>

              {/* Content */}
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-400">
                  {stat.label}
                </p>

                <p className="mt-1.5 text-[25px] font-semibold leading-none tracking-tight text-white">
                  {stat.value}
                </p>

                <p
                  className={`mt-2 text-[11px] font-semibold ${
                    stat.type === "urgent"
                      ? "text-red-400"
                      : stat.type === "positive"
                        ? "text-emerald-400"
                        : "text-slate-500"
                  }`}
                >
                  {stat.type === "positive" && "↑ "}
                  {stat.type === "urgent" && "⚡ "}
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;
