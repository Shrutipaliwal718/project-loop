import Link from "next/link";
import HowItWorks from "@/components/Landing/HowItWorks";

export default function HowItWorksPage() {
  return (
    <main className="loop-page min-h-screen">
      <div className="mx-auto max-w-[1180px] px-4 pt-16 sm:px-6 lg:px-8">
        <Link href="/" className="text-xs font-semibold text-cyan-300">← Back to LOOP</Link>
      </div>
      <HowItWorks />
    </main>
  );
}
