type LoopLogoProps = { size?: number };

export default function LoopLogo({ size = 46 }: LoopLogoProps) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      aria-label="LOOP"
    >
      <div
        className="absolute inset-0 rounded-full opacity-30 blur-md"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,212,.9), rgba(32,191,255,.45) 45%, transparent 72%)",
        }}
      />
      <div
        className="relative flex h-full w-full items-center justify-center rounded-full border border-cyan-300/25 bg-[#071522]"
        style={{ boxShadow: "0 0 28px rgba(0,229,212,.14)" }}
      >
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="loopLogoGradient" x1="6" y1="8" x2="34" y2="32">
              <stop stopColor="#00E5D4" />
              <stop offset=".55" stopColor="#20BFFF" />
              <stop offset="1" stopColor="#A855F7" />
            </linearGradient>
          </defs>
          <path d="M29.5 13.1a11.8 11.8 0 1 0 1.3 11.5" stroke="url(#loopLogoGradient)" strokeWidth="4" strokeLinecap="round" />
          <path d="M25.7 13.2c-2.2-2.5-6-3.1-9.1-1.4-3.8 2-5.1 6.6-3 10.3 2 3.5 6.4 4.7 10 2.7 2.7-1.5 4.1-4.4 3.6-7.3" stroke="url(#loopLogoGradient)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="28.8" cy="11.2" r="3.5" fill="#A855F7" />
        </svg>
      </div>
    </div>
  );
}
