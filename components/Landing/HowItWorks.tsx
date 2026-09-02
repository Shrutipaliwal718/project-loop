const steps = [
  { number: "01", icon: "↓", title: "Bring customer feedback into LOOP", description: "Add feedback manually, upload structured CSV data, or use the supported simulated feedback channel.", detail: "Feedback ingestion" },
  { number: "02", icon: "✦", title: "LOOP analyzes the customer voice", description: "AI processes feedback to identify sentiment, categories, recurring themes, emerging issues and meaningful signals.", detail: "AI classification" },
  { number: "03", icon: "◈", title: "Explore patterns and trends", description: "Use the analytics dashboard to understand sentiment movement, theme frequency, trends and high-priority feedback.", detail: "Customer intelligence" },
  { number: "04", icon: "ϟ", title: "Turn intelligence into action", description: "Use Ask LOOP and Voice-of-Customer reporting to answer questions and communicate what customers are telling your team.", detail: "Decision support" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="loop-section">
      <div className="loop-container">
        <div className="loop-section-heading">
          <div className="mb-3 text-[10px] font-bold tracking-[0.22em] text-cyan-300">HOW LOOP WORKS</div>
          <h2>From feedback to <span className="loop-gradient-text">customer intelligence.</span></h2>
          <p>LOOP creates a simple path from raw customer comments to structured intelligence and product decisions.</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-3">
          {steps.map((step, index) => (
            <div key={step.number} className="loop-card group relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/5 text-lg text-cyan-300 transition group-hover:border-cyan-300/50 group-hover:bg-cyan-300/10">{step.icon}</div>
                <div className="sm:hidden">
                  <div className="text-[9px] font-bold tracking-widest text-cyan-300">STEP {step.number}</div>
                  <h3 className="mt-1 text-base font-bold text-white">{step.title}</h3>
                </div>
              </div>

              <div className="hidden min-w-[62px] sm:block">
                <div className="text-[9px] font-bold tracking-widest text-cyan-300">STEP</div>
                <div className="mt-0.5 text-xl font-extrabold text-white">{step.number}</div>
              </div>

              <div className="flex-1">
                <h3 className="hidden text-base font-bold text-white sm:block">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">{step.description}</p>
              </div>

              <div className="w-fit rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[9px] font-semibold text-slate-400">{step.detail}</div>

              {index !== steps.length - 1 && <div className="absolute -bottom-4 left-1/2 hidden h-4 w-px bg-gradient-to-b from-cyan-300/25 to-transparent sm:block" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
