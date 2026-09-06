import dashboardData from "@/data/dashboard.json";
import styles from "./dashboard.module.css";

const ThemesSection = () => {
  const themes = dashboardData.analytics.topThemes;

  return (
    <section className={`${styles.fadeUp} ${styles.delay3}`}>
      <div className="h-full rounded-xl border border-cyan-400/[0.12] bg-[#061322]/90 p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Top theme</h3>

            <p className="mt-1 text-[11px] text-slate-500">
              Themes mentioned by customers
            </p>
          </div>

          <button
            type="button"
            className="text-[11px] font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            View all
          </button>
        </div>

        {/* Themes */}
        <div className="mt-5 space-y-3.5">
          {themes.map((theme, index) => (
            <div key={theme.name} className="group flex items-center gap-3">
              {/* Icon */}
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-300">
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
                      d="M5 8.5 12 4l7 4.5-7 4-7-4Z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 8.5V16l7 4 7-4V8.5"
                    />
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"
                    />

                    <path
                      strokeLinecap="round"
                      d="m4 7.5 8 4.5 8-4.5M12 12v9"
                    />
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
                    <rect x="4" y="4" width="16" height="16" rx="2" />

                    <path strokeLinecap="round" d="M8 15V9M12 15v-4M16 15v-7" />
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4a7 7 0 0 1 7 7c0 4.5-3.5 7-7 9-3.5-2-7-4.5-7-9a7 7 0 0 1 7-7Z"
                    />

                    <path strokeLinecap="round" d="M9 11h6M10 14h4" />
                  </svg>
                )}

                {index === 4 && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="8" />

                    <path strokeLinecap="round" d="M12 8v4l3 2" />
                  </svg>
                )}
              </div>

              {/* Theme information */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-[11px] font-medium text-slate-300">
                    {theme.name}
                  </span>

                  <span className="shrink-0 text-[11px] font-semibold text-slate-300">
                    {theme.count.toLocaleString()}
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#14263b]">
                  <div
                    className="h-full rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(25,230,209,.2)] transition-all duration-700 group-hover:bg-cyan-300"
                    style={{
                      width: `${Math.min(theme.percentage, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemesSection;
