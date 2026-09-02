import Link from "next/link";
import LoopIcon from "../Common/LoopIcon";

const stripItems = [
  { icon: "brain" as const, label: "AI-Powered Analysis" },
  { icon: "clock" as const, label: "Real-time Insights" },
  { icon: "spark" as const, label: "Actionable Intelligence" },
  { icon: "shield" as const, label: "Trusted by Teams" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <div className="hero-grid loop-grid absolute inset-0 opacity-35" />
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <WaveSide side="left" />
      <WaveSide side="right" />

      <div className="hero-particle left-[17%] top-[38%]" />
      <div className="hero-particle left-[23%] top-[57%] [animation-delay:1.4s]" />
      <div className="hero-particle right-[19%] top-[34%] [animation-delay:.8s]" />
      <div className="hero-particle right-[13%] top-[48%] [animation-delay:2s]" />

      <div className="relative mx-auto max-w-[1320px] px-5 pb-14 pt-20 text-center sm:pb-16 lg:px-8 lg:pt-24">
        <div className="loop-reveal mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/[0.04] px-4 py-2 text-xs font-semibold text-cyan-300 shadow-[0_0_28px_rgba(0,229,212,.07)] sm:text-sm">
          <span className="loop-pulse h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,229,212,.8)]" />
          AI-powered customer feedback intelligence
        </div>

        <h1 className="loop-reveal mx-auto mt-7 max-w-5xl text-[clamp(2.65rem,5.2vw,4.5rem)] font-extrabold leading-[1.03] tracking-[-0.055em] text-white [animation-delay:.08s]">
          Your customers are talking.
          <br />
          <span className="loop-gradient-text loop-gradient-animated">
            LOOP tells you what they mean.
          </span>
        </h1>

        <p className="loop-reveal mx-auto mt-6 max-w-3xl text-[15px] leading-7 text-slate-300 [animation-delay:.16s] sm:text-base sm:leading-8">
          LOOP transforms thousands of customer comments into structured intelligence —
          revealing sentiment, recurring themes, emerging problems, feature requests,
          and the actions your team should prioritize next.
        </p>

        <div className="loop-reveal mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row [animation-delay:.24s]">
          <Link
            href="/dashboard"
            className="loop-button-primary group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-300 to-teal-400 px-6 py-3.5 text-sm font-bold text-[#031017] shadow-[0_0_32px_rgba(0,229,212,.16)]"
          >
            Explore LOOP
            <LoopIcon name="arrow" size={18} strokeWidth={2.2} />
          </Link>

          <a
            href="#how-it-works"
            className="loop-button-secondary group inline-flex items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/[0.015] px-6 py-3.5 text-sm font-semibold text-white"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/50 text-cyan-300">
              <LoopIcon name="play" size={15} />
            </span>
            See how it works
          </a>
        </div>

        <div className="loop-reveal mx-auto mt-12 grid max-w-5xl grid-cols-2 border-y border-white/[0.07] py-5 sm:grid-cols-4 [animation-delay:.32s]">
          {stripItems.map((item, index) => (
            <div
              key={item.label}
              className={`flex items-center justify-center gap-2.5 px-3 py-2 text-xs text-slate-300 sm:text-sm ${
                index > 0 ? "border-l border-white/[0.08]" : ""
              }`}
            >
              <LoopIcon name={item.icon} size={20} className="text-cyan-300" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaveSide({ side }: { side: "left" | "right" }) {
  const flip = side === "right";
  return (
    <div
      className={`pointer-events-none absolute top-[190px] hidden h-[390px] w-[560px] opacity-80 lg:block ${
        flip ? "right-[-100px]" : "left-[-110px]"
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 620 360"
        className={`h-full w-full ${flip ? "-scale-x-100" : ""}`}
        fill="none"
      >
        <defs>
          <linearGradient id={`wave-${side}`} x1="0" y1="0" x2="620" y2="0">
            <stop stopColor={flip ? "#7C3AED" : "#00E5D4"} stopOpacity=".05" />
            <stop offset=".5" stopColor={flip ? "#C026FF" : "#20BFFF"} stopOpacity=".9" />
            <stop offset="1" stopColor={flip ? "#7C3AED" : "#00D9FF"} stopOpacity=".03" />
          </linearGradient>
          <filter id={`blur-${side}`}>
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <path d="M-20 230C100 130 150 315 290 225S480 105 650 205" stroke={`url(#wave-${side})`} strokeWidth="3" filter={`url(#blur-${side})`} opacity=".65" />
        <path d="M-20 215C105 115 155 290 290 205S485 90 650 185" stroke={`url(#wave-${side})`} strokeWidth="1.5" />
        <path d="M-20 245C110 150 155 330 305 235S490 125 650 225" stroke={`url(#wave-${side})`} strokeWidth="1" opacity=".55" />
      </svg>
    </div>
  );
}
