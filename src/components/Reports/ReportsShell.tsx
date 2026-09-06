import ReportsHeader from "./ReportsHeader";
import ReportSummary from "./ReportSummary";
import KeyThemes from "./KeyThemes";
import ActionableInsights from "./ActionableInsights";
import ReportPreview from "./ReportPreview";

const ReportsShell = () => {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <ReportsHeader />

      <div className="mt-7">
        <ReportSummary />
      </div>

      <div className="mt-5 grid items-stretch gap-5 lg:grid-cols-2">
        <div className="h-full">
          <KeyThemes />
        </div>

        <div className="h-full">
          <ActionableInsights />
        </div>
      </div>

      <div className="mt-5">
        <ReportPreview />
      </div>
    </div>
  );
};

export default ReportsShell;
