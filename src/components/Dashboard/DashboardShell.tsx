"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/Common/AppLayout";
import { mockRole } from "@/lib/mockAuth";
import type { DashboardAnalytics } from "@/types/dashboard";
import AdminDashboard from "./AdminDashboard";
import AnalystDashboard from "./AnalystDashboard";
import ViewerDashboard from "./ViewerDashboard";

const DashboardShell = () => {
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("/api/dashboard");

        if (!response.ok) {
          throw new Error("Failed to load dashboard data.");
        }

        const data = await response.json();

        if (!data.success || !data.analytics) {
          throw new Error("Invalid dashboard response.");
        }

        setAnalytics(data.analytics);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading the dashboard.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const renderDashboard = () => {
    if (loading) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-slate-400">Loading dashboard...</p>
        </div>
      );
    }

    if (error || !analytics) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-xl border border-red-400/20 bg-red-400/[0.05] px-5 py-4 text-center">
            <p className="text-sm font-medium text-red-300">
              Unable to load dashboard
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {error ?? "Dashboard data is unavailable."}
            </p>
          </div>
        </div>
      );
    }

    switch (mockRole) {
      case "ADMIN":
        return <AdminDashboard analytics={analytics} />;

      case "VIEWER":
        return <ViewerDashboard analytics={analytics} />;

      case "ANALYST":
      default:
        return <AnalystDashboard analytics={analytics} />;
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {renderDashboard()}
      </div>
    </AppLayout>
  );
};

export default DashboardShell;
