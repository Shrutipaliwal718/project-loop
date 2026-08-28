import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanDemoData() {
  console.log('🧹 Cleaning up demo feedback and reports data from Supabase...');

  // Delete all feedback records
  const deletedFeedbacks = await prisma.feedback.deleteMany({});
  console.log(`✅ Deleted ${deletedFeedbacks.count} demo feedback entries.`);

  // Delete all VoC reports
  const deletedReports = await prisma.voCReport.deleteMany({});
  console.log(`✅ Deleted ${deletedReports.count} demo VoC reports.`);

  // Delete all vector embeddings
  const deletedEmbeddings = await prisma.vectorEmbedding.deleteMany({});
  console.log(`✅ Deleted ${deletedEmbeddings.count} vector embeddings.`);

  console.log('✨ Database feedback tables are now completely clean!');
}

cleanDemoData()
  .catch((e) => {
    console.error('Clean error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
