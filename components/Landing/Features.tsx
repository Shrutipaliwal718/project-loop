const features = [
  { icon: "◌", title: "Feedback Inbox", text: "Search, filter and review customer feedback from a centralized workspace.", points: ["Searchable feedback", "Status filtering", "Pagination"], color: "cyan" },
  { icon: "☺", title: "Sentiment Analysis", text: "Understand positive, neutral and negative customer sentiment and monitor change.", points: ["Positive / neutral / negative", "Sentiment trends", "Change detection"], color: "green" },
  { icon: "◆", title: "Theme Detection", text: "Discover recurring topics and understand which themes customers mention most.", points: ["Theme clustering", "Mention frequency", "Recurring patterns"], color: "purple" },
  { icon: "↗", title: "Emerging Trends", text: "Surface changing customer concerns before they become difficult-to-ignore problems.", points: ["Trend movement", "Emerging issues", "Time-based analysis"], color: "blue" },
  { icon: "ϟ", title: "Action Signals", text: "Highlight feedback that deserves attention so teams can separate signal from noise.", points: ["Priority indicators", "Urgent feedback", "Action opportunities"], color: "amber" },
  { icon: "✦", title: "Ask LOOP", text: "Ask natural-language questions about available customer feedback for decision support.", points: ["Natural-language Q&A", "Feedback-aware answers", "Decision support"], color: "violet" },
];

export default function Features() {
  return (
    <section id="features" className="loop-section">
      <div className="loop-container">
        <div className="loop-section-heading">
          <div className="mb-3 text-[10px] font-bold tracking-[0.22em] text-cyan-300">BUILT FOR CUSTOMER VOICE</div>
          <h2>Intelligence for every <span className="loop-gradient-text">feedback signal.</span></h2>
          <p>LOOP connects feedback exploration, AI analysis, analytics and decision support into one customer-intelligence workflow.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => <FeatureCard key={feature.title} feature={feature} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: (typeof features)[number]; index: number }) {
  const colors: Record<string, { icon: string; line: string }> = {
    cyan: { icon: "text-cyan-300 border-cyan-300/20 bg-cyan-300/5", line: "from-cyan-300" },
    green: { icon: "text-green-400 border-green-400/20 bg-green-400/5", line: "from-green-400" },
    purple: { icon: "text-violet-300 border-violet-400/20 bg-violet-400/5", line: "from-violet-400" },
    blue: { icon: "text-blue-300 border-blue-400/20 bg-blue-400/5", line: "from-blue-400" },
    amber: { icon: "text-amber-300 border-amber-400/20 bg-amber-400/5", line: "from-amber-400" },
    violet: { icon: "text-fuchsia-300 border-fuchsia-400/20 bg-fuchsia-400/5", line: "from-fuchsia-400" },
  };
  const style = colors[feature.color];

  return (
    <div className="loop-card group p-5 sm:p-6" style={{ animationDelay: `${index * 70}ms` }}>
      <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border text-lg transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 ${style.icon}`}>
        {feature.icon}
      </div>
      <h3 className="text-lg font-bold text-white">{feature.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{feature.text}</p>
      <div className="mt-5 space-y-2.5">
        {feature.points.map((point) => (
          <div key={point} className="flex items-center gap-2.5 text-[11px] text-slate-300">
            <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${style.line} to-transparent`} />
            {point}
          </div>
        ))}
      </div>
      <div className="mt-5 h-px bg-white/[0.08]" />
      <div className="mt-4 text-[10px] font-semibold text-slate-500 transition-colors group-hover:text-cyan-300">Explore capability →</div>
    </div>
  );
}
