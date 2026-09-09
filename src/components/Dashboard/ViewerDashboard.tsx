import ViewerStats from "./ViewerStats";
import FeedbackVolume from "./FeedbackVolume";
import SentimentAnalytics from "./SentimentAnalytics";
import ThemesSection from "./ThemesSection";

const ViewerDashboard = () => {
  return (
    <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-[#030912] px-4 py-5 sm:px-6 lg:px-7 lg:py-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/[0.025] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/[0.025] blur-[120px]" />

      <div className="relative mx-auto max-w-[1500px]">
        {/* Viewer Header */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Read-only overview
          </p>

          <h1 className="mt-1.5 text-[25px] font-semibold tracking-tight text-white sm:text-[28px]">
            Customer intelligence
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            View customer feedback, sentiment, trends, and key themes
          </p>
        </section>

        {/* KPI Statistics */}
        <div className="mt-5">
          <ViewerStats />
        </div>

        {/* Feedback Volume + Sentiment */}
        <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-[1.65fr_0.85fr]">
          <FeedbackVolume />
          <SentimentAnalytics />
        </div>

        {/* Top Themes */}
        <div className="mt-4">
          <ThemesSection />
        </div>

        {/* Read-only notice */}
        <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-400/15 bg-slate-400/[0.06] text-xs text-slate-400">
              i
            </span>

            <p className="text-[11px] text-slate-500">
              This dashboard is read-only. Feedback ingestion and workspace
              management are unavailable for viewers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerDashboard;
