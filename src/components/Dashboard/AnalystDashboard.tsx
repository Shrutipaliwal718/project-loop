import DashboardStats from "./DashboardStats";
import FeedbackVolume from "./FeedbackVolume";
import SentimentAnalytics from "./SentimentAnalytics";
import ThemesSection from "./ThemesSection";
import EmergingIssues from "./EmergingIssues";
import ActionSignals from "./ActionSignals";

const AnalystDashboard = () => {
  return (
    <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-[#030912] px-4 py-5 sm:px-6 lg:px-7 lg:py-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/[0.025] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/[0.025] blur-[120px]" />

      <div className="relative mx-auto max-w-[1500px]">
        {/* Analyst Header */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400">
            Customer intelligence
          </p>

          <h1 className="mt-1.5 text-[25px] font-semibold tracking-tight text-white sm:text-[28px]">
            Feedback overview
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Analyze customer feedback, sentiment, themes, and emerging issues
          </p>
        </section>

        {/* KPI Statistics */}
        <div className="mt-5">
          <DashboardStats />
        </div>

        {/* Feedback Volume + Sentiment */}
        <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-[1.65fr_0.85fr]">
          <FeedbackVolume />
          <SentimentAnalytics />
        </div>

        {/* Themes + Emerging Issues + Action Signals */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ThemesSection />
          <EmergingIssues />
          <ActionSignals />
        </div>
      </div>
    </div>
  );
};

export default AnalystDashboard;
