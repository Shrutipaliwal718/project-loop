import AppLayout from "@/components/Common/AppLayout";
import Overview from "./Overview";

const DashboardShell = () => {
  return (
    <AppLayout>
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Overview />
      </div>
    </AppLayout>
  );
};

export default DashboardShell;
