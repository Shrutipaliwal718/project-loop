import dashboardData from "@/data/dashboard.json";
import styles from "./dashboard.module.css";

const SentimentAnalytics = () => {
  const sentiment = dashboardData.analytics.sentimentBreakdown;

  const items = [
    {
      label: "Positive",
      value: sentiment.POS,
      className: "bg-cyan-400",
      glow: "shadow-[0_0_12px_rgba(25,230,209,.25)]",
    },
    {
      label: "Neutral",
      value: sentiment.NEU,
      className: "bg-violet-400",
      glow: "shadow-[0_0_12px_rgba(139,92,246,.2)]",
    },
    {
      label: "Negative",
      value: sentiment.NEG,
      className: "bg-rose-400",
      glow: "shadow-[0_0_12px_rgba(251,113,133,.2)]",
    },
  ];

  return (
    <section className={`${styles.fadeUp} ${styles.delay2}`}>
      <div className="h-full rounded-xl border border-cyan-400/[0.14] bg-[#061322]/90 p-4 sm:p-5">
        <h3 className="text-base font-semibold text-white">
          What customers feel
        </h3>

        <p className="mt-1 text-[11px] text-slate-500">
          Overall sentiment distribution
        </p>

        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.label}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{item.label}</span>

                <span className="text-[11px] font-semibold text-slate-200">
                  {item.value}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#14263b]">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${item.className} ${item.glow}`}
                  style={{
                    width: `${item.value}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* AI signal */}
        <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] p-3.5">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
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
                  d="M12 3.5 14 9l5.5 2-5.5 2-2 5.5-2-5.5-5.5-2L10 9l2-5.5Z"
                />
              </svg>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-cyan-300">
                AI signal
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-400">
                Positive sentiment is currently the strongest customer signal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SentimentAnalytics;
