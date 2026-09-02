export default function ProductOverview() {
  return (
    <section id="product" className="loop-section">
      <div className="loop-container">
        <div className="loop-section-heading">
          <div className="mb-3 text-[10px] font-bold tracking-[0.22em] text-cyan-300">THE LOOP INTELLIGENCE LAYER</div>
          <h2>From raw feedback to <span className="loop-gradient-text">decisions.</span></h2>
          <p>LOOP organizes the customer voice into patterns your team can understand, investigate and act on.</p>
        </div>

        <div id="use-cases" className="grid gap-4 md:grid-cols-3">
          <OverviewCard icon="inbox" title="Collect" description="Bring customer feedback into one structured workspace through manual input, CSV uploads and the supported simulated feedback channel." accent="cyan" />
          <OverviewCard icon="spark" title="Understand" description="AI analyzes feedback to identify sentiment, categories, recurring themes, emerging issues and feature requests." accent="purple" />
          <OverviewCard icon="bolt" title="Act" description="Turn customer signals into prioritized insights, reports and grounded questions that support product decisions." accent="amber" />
        </div>

        <div id="resources" className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <div className="loop-card p-5">
            <div className="text-[10px] font-bold tracking-[0.2em] text-cyan-300">WHY LOOP</div>
            <h3 className="mt-2 text-lg font-bold text-white">One customer voice, one intelligence layer.</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Instead of reading disconnected comments, teams can move from feedback exploration to AI-assisted analysis and decision support in one workflow.
            </p>
          </div>
          <div className="loop-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/5 text-cyan-300">✓</div>
              <div><div className="text-sm font-bold text-white">Built for focused decisions</div><div className="mt-1 text-xs text-slate-500">Signal → context → action</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewCard({ icon, title, description, accent }: {
  icon: "inbox" | "spark" | "bolt"; title: string; description: string; accent: "cyan" | "purple" | "amber";
}) {
  const colors = {
    cyan: "text-cyan-300 border-cyan-300/20 bg-cyan-300/5",
    purple: "text-violet-300 border-violet-400/20 bg-violet-400/5",
    amber: "text-amber-300 border-amber-400/20 bg-amber-400/5",
  };
  return (
    <div className="loop-card group p-5 sm:p-6">
      <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border text-lg ${colors[accent]}`}>
        {icon === "inbox" ? "◌" : icon === "spark" ? "✦" : "ϟ"}
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      <div className="mt-5 h-px bg-gradient-to-r from-white/10 to-transparent" />
      <div className="mt-4 text-[10px] font-semibold text-slate-500 group-hover:text-cyan-300">LOOP intelligence layer →</div>
    </div>
  );
}
