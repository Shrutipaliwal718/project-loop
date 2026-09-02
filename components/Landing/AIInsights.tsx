const insights = [
  { icon: "✦", title: "AI classification", description: "Automatically classify customer feedback into meaningful categories and sentiment signals.", metric: "3", metricLabel: "sentiment classes", accent: "cyan" },
  { icon: "◆", title: "Theme intelligence", description: "Group related feedback into recurring themes so teams can see what customers repeatedly talk about.", metric: "24", metricLabel: "themes detected", accent: "purple" },
  { icon: "ϟ", title: "Action signals", description: "Surface important feedback and emerging problems that may require product or customer-experience attention.", metric: "17", metricLabel: "action signals", accent: "amber" },
];

export default function AIInsights() {
  return (
    <section className="loop-section">
      <div className="loop-container">
        <div className="loop-section-heading">
          <div className="mb-3 text-[10px] font-bold tracking-[0.22em] text-violet-300">AI-POWERED INTELLIGENCE</div>
          <h2>Don&apos;t just collect feedback. <span className="loop-gradient-text">Understand it.</span></h2>
          <p>LOOP connects sentiment, themes, trends and action signals into one intelligence layer.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {insights.map((insight, index) => <InsightCard key={insight.title} insight={insight} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function InsightCard({ insight, index }: { insight: (typeof insights)[number]; index: number }) {
  const styles = {
    cyan: "text-cyan-300 border-cyan-300/20 bg-cyan-300/[0.04]",
    purple: "text-violet-300 border-violet-400/20 bg-violet-400/[0.04]",
    amber: "text-amber-300 border-amber-400/20 bg-amber-400/[0.04]",
  };
  return (
    <div className="loop-card loop-float-slow p-5 sm:p-6" style={{ animationDelay: `${index * 180}ms` }}>
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl border text-lg ${styles[insight.accent as keyof typeof styles]}`}>{insight.icon}</div>
      <h3 className="mt-5 text-lg font-bold text-white">{insight.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{insight.description}</p>
      <div className="mt-5 flex items-end justify-between border-t border-white/[0.08] pt-4">
        <div><div className="text-2xl font-extrabold text-white">{insight.metric}</div><div className="mt-0.5 text-[10px] text-slate-500">{insight.metricLabel}</div></div>
        <div className="text-xl text-slate-600">↗</div>
      </div>
    </div>
  );
}
