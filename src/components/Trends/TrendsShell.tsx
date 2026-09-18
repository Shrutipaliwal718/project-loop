import TrendsHeader from "./TrendsHeader";
import SentimentTrend from "./SentimentTrend";
import ThemeTrends from "./ThemeTrends";
import TrendInsights from "./TrendInsights";

const TrendsShell = () => {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <TrendsHeader />

      <div className="grid items-stretch gap-5 lg:grid-cols-2">
        <div className="h-full">
          <SentimentTrend />
        </div>

        <div className="h-full">
          <ThemeTrends />
        </div>
      </div>

      <div className="mt-5">
        <TrendInsights />
      </div>
    </div>
  );
};

export default TrendsShell;
