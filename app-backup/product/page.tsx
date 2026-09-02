import Link from "next/link";
import ProductOverview from "@/components/Landing/ProductOverview";

export default function ProductPage() {
  return (
    <main className="loop-page min-h-screen">
      <div className="mx-auto max-w-[1180px] px-4 pb-2 pt-16 sm:px-6 lg:px-8">
        <Link href="/" className="text-xs font-semibold text-cyan-300">← Back to LOOP</Link>
      </div>
      <ProductOverview />
    </main>
  );
}
