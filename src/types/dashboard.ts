export type DashboardAnalytics = {
  totalFeedback: number;
  negativePercentage: number;
  newThisWeek: number;
  sentimentBreakdown: {
    POS: number;
    NEU: number;
    NEG: number;
  };
  volumeOverTime: {
    date: string;
    count: number;
  }[];
  topThemes: {
    name: string;
    count: number;
    percentage: number;
  }[];
};

export type DashboardApiResponse = {
  success: boolean;
  filters: {
    startDate: string | null;
    endDate: string | null;
    channel: string | null;
    sentiment: string | null;
    status: string | null;
  };
  analytics: DashboardAnalytics;
};
