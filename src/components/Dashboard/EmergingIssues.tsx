"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./dashboard.module.css";

type Theme = {
  name: string;
  count: number;
  percentage: number;
};

type DashboardData = {
  totalFeedback: number;
  topThemes: Theme[];
};

const EmergingIssues = () => {
  const [analytics, setAnalytics] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/dashboard", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok || !data.success || !data.analytics) {
          throw new Error(data.message ?? "Failed to load emerging issues.");
        }

        setAnalytics(data.analytics);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load emerging issues.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const topTheme = analytics?.topThemes?.[0];

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

          <Link
            href="/trends"
            className="text-[11px] font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            View all
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <p className="text-[11px] text-slate-500">
              Loading issue signals...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-5 rounded-xl border border-rose-400/10 bg-rose-400/[0.03] p-4">
            <p className="text-[11px] text-rose-300">
              Unable to load issue signals.
            </p>

            <p className="mt-1 text-[10px] text-slate-600">{error}</p>
          </div>
        )}

        {/* No data */}
        {!loading && !error && !topTheme && (
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <p className="text-[11px] text-slate-400">
              No emerging issue data available yet.
            </p>

            <p className="mt-1 text-[10px] leading-5 text-slate-600">
              Emerging issue signals will appear after feedback is analyzed.
            </p>
          </div>
        )}

        {/* Issue */}
        {!loading && !error && topTheme && (
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
                  {topTheme.name}
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  Leading feedback theme
                </p>
              </div>

              {/* Theme share */}
              <div className="text-right">
                <p className="text-sm font-semibold text-emerald-400">
                  {topTheme.percentage}%
                </p>

                <p className="text-[9px] text-slate-600">of feedback</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
              <p className="text-[11px] leading-5 text-slate-400">
                {topTheme.name} is currently the strongest identified feedback
                theme, based on the analyzed feedback in this workspace.
              </p>

              <Link
                href="/inbox"
                className="mt-3 inline-block rounded-lg border border-cyan-400/30 bg-cyan-400/[0.04] px-3 py-2 text-[10px] font-semibold text-cyan-300 transition hover:bg-cyan-400/[0.09]"
              >
                View feedback
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmergingIssues;
