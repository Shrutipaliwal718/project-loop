import { prisma } from '@/lib/prisma';
import InboxClientView from '@/components/InboxClientView';

export const revalidate = 0; // Fresh real-time data from Supabase

export default async function InboxPage() {
  const feedbacks = await prisma.feedback.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Customer Feedback Inbox</h1>
        <p className="text-slate-400 text-xs mt-1">
          Server-side pipeline, search filters, and status workflow (NEW → REVIEWED → ACTIONED)
        </p>
      </div>

      <InboxClientView initialFeedbacks={feedbacks as any} />
    </div>
  );
}
