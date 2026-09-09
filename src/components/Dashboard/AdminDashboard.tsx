import DashboardStats from "./DashboardStats";
import FeedbackVolume from "./FeedbackVolume";
import SentimentAnalytics from "./SentimentAnalytics";
import ThemesSection from "./ThemesSection";
import EmergingIssues from "./EmergingIssues";
import ActionSignals from "./ActionSignals";
import AdminWorkspace from "./AdminWorkspace";

const AdminDashboard = () => {
  return (
    <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-[#030912] px-4 py-5 sm:px-6 lg:px-7 lg:py-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/[0.025] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/[0.025] blur-[120px]" />

      <div className="relative mx-auto max-w-[1500px]">
        {/* Admin Header */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
            Workspace administration
          </p>

          <h1 className="mt-1.5 text-[25px] font-semibold tracking-tight text-white sm:text-[28px]">
            Workspace overview
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Manage your workspace, members, roles, and customer intelligence
          </p>
        </section>

        {/* Manage Members */}
        <div className="mt-5">
          <AdminWorkspace />
        </div>

        {/* Customer Intelligence */}
        <section className="mt-7">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400">
              Customer intelligence
            </p>

            <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">
              Feedback analytics
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Monitor customer sentiment, feedback volume, themes, and action
              signals
            </p>
          </div>

          {/* KPI Statistics */}
          <DashboardStats />

          {/* Feedback Volume + Sentiment */}
          <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-[1.65fr_0.85fr]">
            <FeedbackVolume />
            <SentimentAnalytics />
          </div>

          {/* Themes + Issues + Actions */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <ThemesSection />
            <EmergingIssues />
            <ActionSignals />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
