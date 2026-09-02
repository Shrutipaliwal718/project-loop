import Link from "next/link";
import LoopLogo from "../Common/LoopLogo";

export default function CTA() {
  return (
    <section id="cta" className="loop-section pt-14">
      <div className="loop-container">
        <div className="loop-cta relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/[0.07] via-[#07111f] to-violet-500/[0.08] p-7 text-center sm:p-10">
          <div className="absolute -left-20 -top-20 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="relative">
            <div className="mx-auto mb-5 flex w-fit"><LoopLogo size={48} /></div>
            <div className="text-[10px] font-bold tracking-[0.22em] text-cyan-300">CLOSE THE LOOP</div>
            <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-extrabold tracking-tight text-white sm:text-4xl">Turn customer feedback into your next best decision.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">Explore how LOOP connects customer feedback, AI analysis, analytics and actionable intelligence in one workspace.</p>
            <Link href="/dashboard" className="loop-button-primary mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-300 to-teal-400 px-6 py-3 text-sm font-bold text-[#031017]">Get started with LOOP →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
