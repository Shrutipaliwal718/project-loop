import { PrismaClient, Role, Sentiment, FeedbackStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database for Project LOOP...');

  // 1. Clean existing records
  await prisma.vectorEmbedding.deleteMany();
  await prisma.voCReport.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.user.deleteMany();
  await prisma.workspace.deleteMany();

  // 2. Create Default Workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Zidio Development',
      slug: 'zidio-development',
    },
  });

  console.log(`✅ Created Workspace: ${workspace.name}`);

  // 3. Create Seed Users for RBAC
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Ashish Admin',
      email: 'admin@zidio.com',
      password: hashedPassword,
      role: Role.ADMIN,
      workspaceId: workspace.id,
    },
  });

  const analyst = await prisma.user.create({
    data: {
      name: 'Sarah Analyst',
      email: 'analyst@zidio.com',
      password: hashedPassword,
      role: Role.ANALYST,
      workspaceId: workspace.id,
    },
  });

  const viewer = await prisma.user.create({
    data: {
      name: 'David Viewer',
      email: 'viewer@zidio.com',
      password: hashedPassword,
      role: Role.VIEWER,
      workspaceId: workspace.id,
    },
  });

  console.log(`✅ Created 3 RBAC Users: ${admin.email} (ADMIN), ${analyst.email} (ANALYST), ${viewer.email} (VIEWER)`);

  // 4. Generate 120+ Multi-Channel Customer Feedback Entries
  const channels = ['CSV Upload', 'Zendesk', 'Intercom', 'App Store', 'Play Store', 'Trustpilot', 'Manual Entry'];
  const categories = ['Billing', 'UX/UI Navigation', 'Performance', 'Bug', 'Feature Request', 'Customer Support'];
  const segments = ['Enterprise', 'Pro', 'Free', 'SMB'];

  const feedbackTemplates = [
    { title: "Checkout page crashes on Amex payment", content: "Every time I try to complete purchase using my American Express card on the billing page, the page freezes and throws a 500 server error.", sentiment: Sentiment.Negative, score: -0.85, category: "Billing" },
    { title: "Loving the new dark mode interface!", content: "The modern dark theme layout introduced in the latest update looks crisp and reduces eye strain tremendously during late night analytical work.", sentiment: Sentiment.Positive, score: 0.92, category: "UX/UI Navigation" },
    { title: "Export to CSV takes more than 45 seconds", content: "When downloading large analytics datasets, the CSV export generator takes nearly a minute to load and sometimes fails silently.", sentiment: Sentiment.Negative, score: -0.65, category: "Performance" },
    { title: "Need automated Slack alerts for negative feedback", content: "It would be super helpful if Project LOOP could send instant Webhook or Slack notifications whenever a high severity negative feedback arrives.", sentiment: Sentiment.Neutral, score: 0.20, category: "Feature Request" },
    { title: "Billing invoice PDF missing VAT numbers", content: "Our enterprise accounting department requires VAT breakdown on monthly subscription invoices, but the auto-generated PDF leaves it blank.", sentiment: Sentiment.Negative, score: -0.55, category: "Billing" },
    { title: "Customer support resolved my onboarding issue in 5 mins", content: "Kudos to the support team! Special thanks to Sarah for walking me through the multi-tenant RBAC permissions setup seamlessly.", sentiment: Sentiment.Positive, score: 0.95, category: "Customer Support" },
    { title: "Mobile browser navigation bar overflows text", content: "On iPhone Safari, the side menu text overlaps with the top header when viewing dashboard graphs on small viewports.", sentiment: Sentiment.Negative, score: -0.40, category: "Bug" },
    { title: "Search response speed is blazingly fast", content: "Searching across 10,000+ customer reviews returns instant results with full keyword highlight. Impressive search indexing!", sentiment: Sentiment.Positive, score: 0.88, category: "Performance" },
    { title: "Confusing permission labels for Viewer role", content: "A Viewer user can still see the invite members button even though clicking it shows permission denied. Please hide disabled UI buttons.", sentiment: Sentiment.Mixed, score: -0.10, category: "UX/UI Navigation" },
    { title: "Request for SSO SAML integration (Okta / Azure AD)", content: "We are onboarding 200+ team members and urgently need Enterprise SAML SSO authentication support before Q4 renewal.", sentiment: Sentiment.Neutral, score: 0.15, category: "Feature Request" },
  ];

  const statuses = [FeedbackStatus.NEW, FeedbackStatus.REVIEWED, FeedbackStatus.ACTIONED];

  const feedbackData = [];

  for (let i = 1; i <= 125; i++) {
    const template = feedbackTemplates[i % feedbackTemplates.length];
    const channel = channels[i % channels.length];
    const segment = segments[i % segments.length];
    const status = statuses[i % statuses.length];
    
    // Add realistic variation
    const variationScore = Math.min(1.0, Math.max(-1.0, template.score + (Math.random() * 0.2 - 0.1)));

    feedbackData.push({
      title: `${template.title} #${i}`,
      content: `${template.content} (Reference Ticket ID: ${1000 + i})`,
      channel: channel,
      customerSegment: segment,
      status: status,
      sentiment: template.sentiment,
      sentimentScore: parseFloat(variationScore.toFixed(2)),
      category: template.category,
      workspaceId: workspace.id,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)), // Random date in last 30 days
    });
  }

  await prisma.feedback.createMany({
    data: feedbackData,
  });

  console.log(`✅ Seeded ${feedbackData.length} customer feedback records across 7 channels!`);

  // 5. Create Initial Sample VoC Report
  await prisma.voCReport.create({
    data: {
      title: 'Weekly Voice of Customer Executive Summary',
      summary: 'Overall customer sentiment improved by 14% this week. Top customer friction point remains Checkout Amex Payment errors, while Dark Mode UI received glowing positive feedback.',
      keyMetrics: JSON.stringify({
        totalFeedback: 125,
        positiveRatio: '58%',
        negativeRatio: '24%',
        neutralRatio: '18%',
        topCategory: 'UX/UI Navigation',
      }),
      workspaceId: workspace.id,
    },
  });

  console.log('✅ Created Initial Executive VoC Report!');
  console.log('🎉 Seeding Complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
