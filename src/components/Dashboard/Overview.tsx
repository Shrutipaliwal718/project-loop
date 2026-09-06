import DashboardStats from "./DashboardStats";
import FeedbackVolume from "./FeedbackVolume";
import SentimentAnalytics from "./SentimentAnalytics";
import ThemesSection from "./ThemesSection";
import EmergingIssues from "./EmergingIssues";
import ActionSignals from "./ActionSignals";
import styles from "./dashboard.module.css";

const Overview = () => {
  return (
    <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-[#030912] px-4 py-5 sm:px-6 lg:px-7 lg:py-6">
      {/* Ambient cyan glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/[0.025] blur-[100px]" />

      {/* Ambient violet glow */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/[0.025] blur-[120px]" />

      <div className="relative mx-auto max-w-[1500px]">
        {/* Heading */}
        <section className={styles.fadeIn}>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400">
            Customer intelligence
          </p>

          <h1 className="mt-1.5 text-[25px] font-semibold tracking-tight text-white sm:text-[28px]">
            Feedback overview
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            What changed in your customer voice this month
          </p>
        </section>

        {/* 4 KPI cards */}
        <div className="mt-5">
          <DashboardStats />
        </div>

        {/* Main analytics row */}
        <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-[1.65fr_0.85fr]">
          <FeedbackVolume />

          <SentimentAnalytics />
        </div>

        {/* Bottom insight row */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ThemesSection />

          <EmergingIssues />

          <ActionSignals />
        </div>
      </div>
    </div>
  );
};

export default Overview;
