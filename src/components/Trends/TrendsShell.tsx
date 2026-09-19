"use client";

import { useState, useEffect } from "react";
import TrendsHeader from "./TrendsHeader";
import SentimentTrend from "./SentimentTrend";
import ThemeTrends from "./ThemeTrends";
import TrendInsights from "./TrendInsights";
import type { DashboardAnalytics } from "@/types/dashboard";

const daysMap: Record<string, number> = {
  "7 days": 7,
  "12 days": 12,
  "30 days": 30,
};

const TrendsShell = () => {
  const [range, setRange] = useState("12 days");
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const days = daysMap[range] ?? 12;
        const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

        const res = await fetch(`/api/dashboard?startDate=${encodeURIComponent(startDate)}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data.success || !data.analytics) {
          throw new Error(data.message ?? "Failed to load trends data.");
        }

        if (isMounted) {
          setAnalytics(data.analytics);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load trends data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAnalytics();

    return () => {
      isMounted = false;
    };
  }, [range]);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <TrendsHeader range={range} onRangeChange={setRange} />

      <div className="grid items-stretch gap-5 lg:grid-cols-2">
        <div className="h-full">
          <SentimentTrend
            analytics={analytics}
            loading={loading}
            error={error}
            range={range}
          />
        </div>

        <div className="h-full">
          <ThemeTrends
            analytics={analytics}
            loading={loading}
            error={error}
            range={range}
          />
        </div>
      </div>

      <div className="mt-5">
        <TrendInsights
          analytics={analytics}
          loading={loading}
          error={error}
          range={range}
        />
      </div>
    </div>
  );
};

export default TrendsShell;
