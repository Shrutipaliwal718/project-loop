import Link from "next/link";
import AnalyticsPreview from "@/components/Landing/AnalyticsPreview";

export default function PreviewPage() {
  return (
    <main className="loop-page min-h-screen">
      <div className="mx-auto max-w-[1180px] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-[0.22em] text-cyan-300">LOOP PREVIEW</div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Customer intelligence workspace</h1>
          </div>
          <Link href="/" className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-300">← Home</Link>
        </div>
      </div>
      <AnalyticsPreview standalone />
    </main>
  );
}
