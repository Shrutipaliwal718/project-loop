"use client";

import AppLayout from "@/components/Common/AppLayout";
import { mockRole } from "@/lib/mockAuth";
import AdminDashboard from "./AdminDashboard";
import AnalystDashboard from "./AnalystDashboard";
import ViewerDashboard from "./ViewerDashboard";

const DashboardShell = () => {
  const renderDashboard = () => {
    switch (mockRole) {
      case "ADMIN":
        return <AdminDashboard />;

      case "VIEWER":
        return <ViewerDashboard />;

      case "ANALYST":
      default:
        return <AnalystDashboard />;
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
