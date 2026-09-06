import styles from "./dashboard.module.css";

const emergingIssue = {
  title: "Checkout experience",
  growth: "32%",
  description:
    "Customers are reporting slow and confusing checkout interactions.",
};

const EmergingIssues = () => {
  return (
    <section className={`${styles.fadeUp} ${styles.delay4}`}>
      <div className="h-full rounded-xl border border-cyan-400/[0.12] bg-[#061322]/90 p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">
              Emerging issue
            </h3>

            <p className="mt-1 text-[11px] text-slate-500">
              New issues gaining attention
            </p>
          </div>

          <button
            type="button"
            className="text-[11px] font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            View all
          </button>
        </div>

        {/* Issue */}
        <div className="mt-5">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5"
              >
                <rect x="5" y="3.5" width="14" height="17" rx="2" />

                <path strokeLinecap="round" d="M9 7h6M9 11h6M9 15h3" />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-slate-200">
                {emergingIssue.title}
              </p>

              <p className="mt-1 text-[10px] text-slate-500">
                New customer issue
              </p>
            </div>

            {/* Growth */}
            <div className="text-right">
              <p className="text-sm font-semibold text-emerald-400">
                ↑ {emergingIssue.growth}
              </p>

              <p className="text-[9px] text-slate-600">vs last 7 days</p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
            <p className="text-[11px] leading-5 text-slate-400">
              {emergingIssue.description}
            </p>

            <button
              type="button"
              className="mt-3 rounded-lg border border-cyan-400/30 bg-cyan-400/[0.04] px-3 py-2 text-[10px] font-semibold text-cyan-300 transition hover:bg-cyan-400/[0.09]"
            >
              View feedback
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergingIssues;
