import type { DashboardAnalytics } from "@/types/dashboard";
import styles from "./dashboard.module.css";

type FeedbackVolumeProps = {
  analytics: DashboardAnalytics;
};

const FeedbackVolume = ({ analytics }: FeedbackVolumeProps) => {
  const data = analytics.volumeOverTime;

  const maxCount = Math.max(...data.map((item) => item.count), 1);

  const yAxisValues = [
    maxCount,
    Math.round(maxCount * 0.75),
    Math.round(maxCount * 0.5),
    Math.round(maxCount * 0.25),
    0,
  ];

  // Keep bars visually controlled while allowing them to adapt
  // to the number of data points.
  const barWidth = Math.min(56, Math.max(18, 100 / Math.max(data.length, 1)));

  return (
    <section className={`${styles.fadeUp} ${styles.delay2}`}>
      <div className="h-full rounded-xl border border-cyan-400/[0.14] bg-[#061322]/90 p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white">
              Feedback volume
            </h3>

            <p className="mt-1 text-[11px] text-slate-500">
              Customer feedback received over time
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-cyan-400/10 bg-cyan-400/[0.08] px-3 py-1.5 text-[10px] font-semibold text-cyan-400">
            Live data
          </span>
        </div>

        {/* Chart */}
        <div className="mt-5 flex h-[230px] gap-3">
          {/* Y axis */}
          <div className="flex flex-col justify-between pb-5 text-[10px] text-slate-600">
            {yAxisValues.map((value, index) => (
  <span key={`${value}-${index}`}>{value.toLocaleString()}</span>
))}
          </div>

          <div className="relative flex flex-1 flex-col">
            {/* Grid */}
            <div className="absolute inset-0 flex flex-col justify-between pb-6">
              {[0, 1, 2, 3, 4].map((line) => (
                <div key={line} className="border-t border-white/[0.06]" />
              ))}
            </div>

            {/* Bars */}
            <div
              className={`relative flex flex-1 items-end justify-center gap-1.5 px-1 sm:gap-2`}
            >
              {data.map((item) => {
                const height = Math.max(12, (item.count / maxCount) * 100);

                return (
                  <div
                    key={item.date}
                    className="group relative flex h-full items-end"
                    style={{
                      width: `${barWidth}%`,
                      maxWidth: "56px",
                      minWidth: "18px",
                    }}
                  >
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-cyan-500/70 to-cyan-300 shadow-[0_0_14px_rgba(25,230,209,.12)] transition-all duration-300 group-hover:from-cyan-300 group-hover:to-cyan-200 group-hover:shadow-[0_0_22px_rgba(25,230,209,.3)]"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                    {/* Tooltip */}
                    <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-md border border-white/10 bg-[#091523] px-2 py-1 text-[9px] text-slate-300 shadow-xl group-hover:block">
                      {item.count.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X axis */}
            <div className="flex justify-between pt-2 text-[10px] text-slate-600">
              <span>{data[0]?.date}</span>

              <span>{data[data.length - 1]?.date}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackVolume;


