import { prisma } from "@/lib/prisma";

const themesMetadata = [
  { name: "Checkout Experience", description: "Feedback on checkout flows, payment processing, and checkout errors.", color: "#ff4d72" },
  { name: "Support Response", description: "Response times and helpfulness of customer support agents.", color: "#19e6d1" },
  { name: "Performance & Speed", description: "Page load speeds, UI responsiveness, and latency.", color: "#8b5cf6" },
  { name: "Dark Mode", description: "User feedback on dark mode theme and contrast.", color: "#38bdf8" },
  { name: "Search & Filters", description: "Feedback searching and filtering capabilities.", color: "#f59e0b" },
  { name: "Pricing & Plans", description: "Pricing tiers, discounts, and value perception.", color: "#ec4899" },
  { name: "Team Collaboration", description: "Team invitations, workspace access, and permissions.", color: "#10b981" },
  { name: "Executive Reports", description: "Reports generation, export, and presentation quality.", color: "#6366f1" },
  { name: "Integrations", description: "Third party integrations like Slack, Webhooks, Zendesk.", color: "#a855f7" },
  { name: "User Experience", description: "General navigation, design aesthetic, and usability.", color: "#06b6d4" },
  { name: "Notifications", description: "Email notifications and system alerts.", color: "#f97316" },
  { name: "AI Intelligence", description: "Automated sentiment analysis, clustering, and AI summaries.", color: "#14b8a6" },
];

const sampleFeedbacks = [
  {
    content: "The new checkout flow is incredibly smooth and fast! Paid with Apple Pay in less than 5 seconds.",
    channel: "App Store",
    sentiment: "POS" as const,
    sentimentScore: 0.92,
    status: "ACTIONED" as const,
    featureArea: "Checkout & Payments",
    daysAgo: 1,
    themeName: "Checkout Experience",
    customerLabel: "Enterprise User",
  },
  {
    content: "Customer support resolved my billing discrepancy within 10 minutes. Sarah from support was super helpful!",
    channel: "Email",
    sentiment: "POS" as const,
    sentimentScore: 0.88,
    status: "REVIEWED" as const,
    featureArea: "Customer Support",
    daysAgo: 2,
    themeName: "Support Response",
    customerLabel: "Pro Plan",
  },
  {
    content: "The dashboard analytics load times have improved significantly after the latest update. Great job!",
    channel: "Twitter",
    sentiment: "POS" as const,
    sentimentScore: 0.85,
    status: "REVIEWED" as const,
    featureArea: "Performance",
    daysAgo: 2,
    themeName: "Performance & Speed",
    customerLabel: "Daily Active User",
  },
  {
    content: "Love the dark mode interface, it looks sleek and is very easy on the eyes during late night work.",
    channel: "Survey",
    sentiment: "POS" as const,
    sentimentScore: 0.89,
    status: "ACTIONED" as const,
    featureArea: "UI & Theme",
    daysAgo: 3,
    themeName: "Dark Mode",
    customerLabel: "Power User",
  },
  {
    content: "Payment failed twice when trying to renew our yearly team subscription. Had to re-enter card details.",
    channel: "Chat",
    sentiment: "NEG" as const,
    sentimentScore: -0.78,
    status: "NEW" as const,
    featureArea: "Checkout & Payments",
    daysAgo: 1,
    themeName: "Checkout Experience",
    customerLabel: "Team Lead",
  },
  {
    content: "Support took over 18 hours to reply to my urgent ticket regarding data export. Please improve response times.",
    channel: "Zendesk",
    sentiment: "NEG" as const,
    sentimentScore: -0.84,
    status: "NEW" as const,
    featureArea: "Customer Support",
    daysAgo: 3,
    themeName: "Support Response",
    customerLabel: "Business Account",
  },
  {
    content: "The mobile web app has occasional lag when scrolling through large lists of customer feedback.",
    channel: "Email",
    sentiment: "NEG" as const,
    sentimentScore: -0.65,
    status: "NEW" as const,
    featureArea: "Performance",
    daysAgo: 4,
    themeName: "Performance & Speed",
    customerLabel: "Mobile User",
  },
  {
    content: "The search filters are decent, but it would be nice to have date preset buttons like 'Last 7 days' or 'This Quarter'.",
    channel: "Survey",
    sentiment: "NEU" as const,
    sentimentScore: 0.12,
    status: "REVIEWED" as const,
    featureArea: "UI & Experience",
    daysAgo: 4,
    themeName: "Search & Filters",
    customerLabel: "Analyst",
  },
  {
    content: "Really impressed with how easy it was to invite team members and set up roles.",
    channel: "Chat",
    sentiment: "POS" as const,
    sentimentScore: 0.81,
    status: "ACTIONED" as const,
    featureArea: "Workspace",
    daysAgo: 5,
    themeName: "Team Collaboration",
    customerLabel: "Admin",
  },
  {
    content: "Pricing tier jump between Starter and Growth feels a bit steep for small startups.",
    channel: "Twitter",
    sentiment: "NEU" as const,
    sentimentScore: -0.15,
    status: "NEW" as const,
    featureArea: "Pricing & Billing",
    daysAgo: 5,
    themeName: "Pricing & Plans",
    customerLabel: "Startup Founder",
  },
  {
    content: "Reports PDF export is super clear and helped us present quarterly insights to executive leadership.",
    channel: "Email",
    sentiment: "POS" as const,
    sentimentScore: 0.94,
    status: "ACTIONED" as const,
    featureArea: "Reports",
    daysAgo: 6,
    themeName: "Executive Reports",
    customerLabel: "VP of Product",
  },
  {
    content: "Would love a direct Slack integration for instant alerts on critical negative feedback.",
    channel: "Survey",
    sentiment: "NEU" as const,
    sentimentScore: 0.25,
    status: "NEW" as const,
    featureArea: "Integrations",
    daysAgo: 6,
    themeName: "Integrations",
    customerLabel: "Product Manager",
  },
  {
    content: "Checkout credit card form froze for about 10 seconds before redirecting to confirmation.",
    channel: "Chat",
    sentiment: "NEG" as const,
    sentimentScore: -0.72,
    status: "NEW" as const,
    featureArea: "Checkout & Payments",
    daysAgo: 7,
    themeName: "Checkout Experience",
    customerLabel: "Customer",
  },
  {
    content: "Overall navigation is intuitive and clean. Much faster than our previous feedback tool.",
    channel: "App Store",
    sentiment: "POS" as const,
    sentimentScore: 0.87,
    status: "ACTIONED" as const,
    featureArea: "UI & Experience",
    daysAgo: 7,
    themeName: "User Experience",
    customerLabel: "UX Researcher",
  },
  {
    content: "Notification emails are sometimes delayed by 15-20 minutes during peak hours.",
    channel: "Email",
    sentiment: "NEG" as const,
    sentimentScore: -0.58,
    status: "REVIEWED" as const,
    featureArea: "Notifications",
    daysAgo: 8,
    themeName: "Notifications",
    customerLabel: "Marketing Lead",
  },
  {
    content: "The AI summary captured our customer sentiment accurately without needing manual tagging.",
    channel: "Survey",
    sentiment: "POS" as const,
    sentimentScore: 0.91,
    status: "ACTIONED" as const,
    featureArea: "AI Intelligence",
    daysAgo: 9,
    themeName: "AI Intelligence",
    customerLabel: "Data Scientist",
  },
];

export async function ensureWorkspaceSeed(workspaceId: string) {
  try {
    const existingCount = await prisma.feedback.count({
      where: { workspaceId },
    });

    if (existingCount >= 5) {
      return;
    }

    // 1. Ensure themes exist
    const themeMap: Record<string, string> = {};
    for (const t of themesMetadata) {
      let theme = await prisma.theme.findFirst({
        where: { workspaceId, name: t.name },
      });
      if (!theme) {
        theme = await prisma.theme.create({
          data: {
            name: t.name,
            description: t.description,
            color: t.color,
            workspaceId,
          },
        });
      }
      themeMap[t.name] = theme.id;
    }

    // 2. Insert sample feedbacks
    const now = new Date();
    for (const item of sampleFeedbacks) {
      const createdAt = new Date(now.getTime() - item.daysAgo * 24 * 60 * 60 * 1000);

      const feedback = await prisma.feedback.create({
        data: {
          content: item.content,
          channel: item.channel,
          customerLabel: item.customerLabel,
          sentiment: item.sentiment,
          sentimentScore: item.sentimentScore,
          status: item.status,
          featureArea: item.featureArea,
          workspaceId,
          createdAt,
        },
      });

      const themeId = themeMap[item.themeName];
      if (themeId) {
        await prisma.feedbackTheme.upsert({
          where: {
            feedbackId_themeId: {
              feedbackId: feedback.id,
              themeId,
            },
          },
          update: {},
          create: {
            feedbackId: feedback.id,
            themeId,
            confidence: 0.9,
          },
        });
      }
    }
  } catch (err) {
    console.error("ensureWorkspaceSeed error:", err);
  }
}
