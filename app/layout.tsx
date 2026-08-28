import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Project LOOP | AI Customer Feedback Intelligence',
  description: 'Enterprise multi-tenant SaaS platform for customer feedback sentiment classification, trend detection, Ask LOOP RAG Q&A, and Voice-of-Customer reporting.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
