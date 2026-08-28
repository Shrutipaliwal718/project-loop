import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateWorkspaceToZidio() {
  console.log('Updating workspace name to Zidio Development...');

  await prisma.workspace.updateMany({
    data: {
      name: 'Zidio Development',
      slug: 'zidio-development',
    },
  });

  console.log('✅ Default workspace updated to "Zidio Development" in Supabase!');
}

updateWorkspaceToZidio()
  .catch((e) => {
    console.error('Update workspace error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
