import styles from "./dashboard.module.css";

const actionSignals = [
  {
    title: "Checkout complaints",
    mentions: 23,
    priority: "Urgent",
    iconClass: "border-red-400/20 bg-red-400/10 text-red-300",
  },
  {
    title: "Support response delays",
    mentions: 18,
    priority: "Urgent",
    iconClass: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  },
  {
    title: "Performance issues",
    mentions: 15,
    priority: "Urgent",
    iconClass: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  },
  {
    title: "Dark mode requests",
    mentions: 12,
    priority: "High",
    iconClass: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  },
];

const ActionSignals = () => {
  return (
    <section className={`${styles.fadeUp} ${styles.delay4}`}>
      <div className="h-full rounded-xl border border-cyan-400/[0.12] bg-[#061322]/90 p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">
              Recent action signals
            </h3>

            <p className="mt-1 text-[11px] text-slate-500">
              High priority feedback
            </p>
          </div>

          <button
            type="button"
            className="text-[11px] font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            View all
          </button>
        </div>

        {/* Signals */}
        <div className="mt-4 space-y-2.5">
          {actionSignals.map((signal, index) => (
            <div
              key={signal.title}
              className="group flex items-center gap-3 rounded-lg transition hover:bg-white/[0.025]"
            >
              {/* Icon */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs ${signal.iconClass}`}
              >
                {index === 0 && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16v9H4z"
                    />

                    <path strokeLinecap="round" d="M8 17v2M16 17v2" />
                  </svg>
                )}

                {index === 1 && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-4 w-4"
                  >
                    <rect x="4" y="5" width="16" height="14" rx="2" />

                    <path strokeLinecap="round" d="M7 9h10M7 13h6" />
                  </svg>
                )}

                {index === 2 && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m12 4 9 16H3L12 4Z"
                    />

                    <path strokeLinecap="round" d="M12 9v5M12 17h.01" />
                  </svg>
                )}

                {index === 3 && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="4" />

                    <path
                      strokeLinecap="round"
                      d="M12 4v2M12 18v2M4 12h2M18 12h2"
                    />
                  </svg>
                )}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-slate-300">
                  {signal.title}
                </p>

                <p className="mt-0.5 text-[10px] text-slate-600">
                  {signal.mentions} mentions
                </p>
              </div>

              {/* Priority */}
              <span
                className={`rounded-md px-2 py-1 text-[9px] font-semibold ${
                  signal.priority === "Urgent"
                    ? "bg-red-400/10 text-red-400"
                    : "bg-amber-400/10 text-amber-400"
                }`}
              >
                {signal.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionSignals;
