const themes = [
  ["Delivery experience", "2,843", "88%"],
  ["Product quality", "1,827", "66%"],
  ["User interface", "1,492", "54%"],
  ["Feature requests", "1,201", "45%"],
  ["Customer support", "1,018", "38%"],
];

const sentimentBars = [26, 33, 31, 40, 36, 43, 41, 47, 51, 49, 58, 62, 60, 72, 78, 84, 83, 96];

export default function AnalyticsPreview({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="insights" className={`loop-section pt-14 sm:pt-16 lg:pt-20 ${standalone ? "min-h-[80vh]" : ""}`}>
      <div className="loop-container">
        <div className="loop-section-heading loop-reveal mb-9">
          <div className="mb-3 text-[10px] font-bold tracking-[0.22em] text-cyan-300">
            LOOP WORKSPACE PREVIEW
          </div>
          <h2>
            Customer intelligence,{" "}
            <span className="loop-gradient-text">at a glance.</span>
          </h2>
          <p>
            A presentation preview of the LOOP workspace — designed to surface
            sentiment, themes, emerging issues and action signals quickly.
          </p>
        </div>

        <div className="loop-dashboard-preview loop-card loop-glow loop-reveal overflow-hidden [animation-delay:.1s]">
          <div className="flex h-9 items-center gap-2 border-b border-white/[0.08] bg-black/20 px-4">
            <span className="h-2 w-2 rounded-full bg-rose-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-300/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            <div className="mx-auto hidden h-6 w-[300px] items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.025] text-[10px] text-slate-500 sm:flex">
              app.loop.ai / overview
            </div>
            <div className="ml-auto flex items-center gap-2 text-[10px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live intelligence
            </div>
          </div>

          <div className="grid lg:grid-cols-[155px_1fr]">
            <aside className="hidden border-r border-white/[0.08] bg-[#050d18] p-3 lg:block">
              <div className="mb-5 flex items-center gap-2 px-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-300">
                  ◉
                </div>
                <div>
                  <div className="text-xs font-bold text-white">LOOP</div>
                  <div className="text-[7px] tracking-[.12em] text-slate-500">INTELLIGENCE</div>
                </div>
              </div>
              <div className="space-y-1">
                {[
                  ["Overview", "chart"],
                  ["Feedback", "message"],
                  ["Trends", "trend"],
                  ["Ask LOOP", "spark"],
                  ["Reports", "layers"],
                ].map(([label, icon], index) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-[10px] font-medium ${
                      index === 0 ? "bg-cyan-300/10 text-cyan-300" : "text-slate-400"
                    }`}
                  >
                    <span>{icon === "chart" ? "⌁" : icon === "message" ? "◌" : icon === "trend" ? "↗" : icon === "spark" ? "✦" : "◇"}</span>
                    {label}
                  </div>
                ))}
              </div>
            </aside>

            <div className="min-w-0 p-4 sm:p-5 lg:p-6">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <div className="text-[9px] font-bold tracking-[0.2em] text-cyan-300">CUSTOMER INTELLIGENCE</div>
                  <h3 className="mt-1 text-lg font-extrabold text-white sm:text-xl">Feedback overview</h3>
                  <p className="mt-1 text-[11px] text-slate-500">What changed in your customer voice this month</p>
                </div>
                <div className="hidden rounded-full border border-cyan-300/15 bg-cyan-300/[0.04] px-3 py-1.5 text-[10px] text-cyan-300 sm:block">
                  30 day view
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard icon="message" label="Total feedback" value="12,480" change="+18.4%" accent="cyan" points={[3,5,4,7,8,7,11,14]} />
                <MetricCard icon="smile" label="Positive sentiment" value="72.6%" change="+6.2%" accent="green" points={[4,3,5,6,5,8,9,12]} />
                <MetricCard icon="layers" label="Themes detected" value="24" change="+4 new themes" accent="purple" points={[2,3,3,5,4,7,6,9]} />
                <MetricCard icon="bolt" label="Action signals" value="17" change="8 urgent" accent="amber" points={[2,4,3,4,7,6,8,11]} />
              </div>

              <div className="mt-3 grid gap-3 xl:grid-cols-[1.55fr_.9fr]">
                <div className="rounded-xl border border-white/[0.09] bg-[#07111f]/80 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Sentiment movement</h4>
                      <p className="mt-1 text-[10px] text-slate-500">Customer mood over the last 30 days</p>
                    </div>
                    <span className="rounded-md bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold text-emerald-400">Improving ↗</span>
                  </div>

                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[100, 75, 50, 25, 0].map((value) => (
                        <div key={value} className="flex items-center gap-2">
                          <span className="w-7 text-right text-[8px] text-slate-600">{value}%</span>
                          <div className="h-px flex-1 bg-white/[0.045]" />
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-9 right-0 top-0 flex items-end gap-1.5 px-1">
                      {sentimentBars.map((height, index) => (
                        <div
                          key={index}
                          className="loop-chart-bar flex-1 rounded-t-[4px] bg-gradient-to-t from-cyan-500/30 to-cyan-300"
                          style={{ height: `${height}%`, animationDelay: `${index * 55}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between pl-9 text-[8px] text-slate-600">
                    <span>30 days ago</span><span>Today</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.09] bg-[#07111f]/80 p-4">
                  <h4 className="text-sm font-bold text-white">What customers feel</h4>
                  <p className="mt-1 text-[10px] text-slate-500">Overall sentiment distribution</p>
                  <div className="mt-5 space-y-4">
                    <SentimentRow label="Positive" value="72.6%" width="72.6%" color="bg-cyan-300" />
                    <SentimentRow label="Neutral" value="18.1%" width="18.1%" color="bg-violet-400" />
                    <SentimentRow label="Negative" value="9.3%" width="9.3%" color="bg-rose-400" />
                  </div>
                  <div className="mt-5 rounded-lg border border-cyan-300/15 bg-cyan-300/[0.04] p-3">
                    <div className="text-[10px] font-bold text-cyan-300">✦ AI signal</div>
                    <p className="mt-1 text-[10px] leading-4 text-slate-400">Positive sentiment increased after recent onboarding improvements.</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid gap-3 lg:grid-cols-3">
                <ThemeCard />
                <IssueCard />
                <ActionCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  icon, label, value, change, accent, points,
}: {
  icon: "message" | "smile" | "layers" | "bolt";
  label: string; value: string; change: string;
  accent: "cyan" | "green" | "purple" | "amber";
  points: number[];
}) {
  const styles = {
    cyan: "border-cyan-300/15 bg-cyan-300/[0.035] text-cyan-300",
    green: "border-green-400/15 bg-green-400/[0.035] text-green-400",
    purple: "border-violet-400/15 bg-violet-400/[0.035] text-violet-300",
    amber: "border-amber-400/15 bg-amber-400/[0.035] text-amber-300",
  };

  return (
    <div className={`loop-metric-card rounded-xl border p-3.5 ${styles[accent]}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-current/20 bg-black/20 text-sm">
            <span>{icon === "message" ? "◌" : icon === "smile" ? "☺" : icon === "layers" ? "◇" : "ϟ"}</span>
          </div>
          <span className="text-[10px] text-slate-400">{label}</span>
        </div>
        <Sparkline points={points} />
      </div>
      <div className="mt-3 text-2xl font-extrabold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-[9px] font-semibold">{change.startsWith("8") ? "↑ " : "↑ "}{change}</div>
    </div>
  );
}

function Sparkline({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points.map((point, index) => {
    const x = (index / (points.length - 1)) * 76;
    const y = 22 - ((point - min) / Math.max(max - min, 1)) * 18;
    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");
  return (
    <svg width="78" height="24" viewBox="0 0 78 24" className="shrink-0 overflow-visible">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SentimentRow({ label, value, width, color }: { label: string; value: string; width: string; color: string }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-[10px]">
        <span className="text-slate-400">{label}</span><span className="font-semibold text-white">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
        <div className={`h-full rounded-full ${color}`} style={{ width }} />
      </div>
    </div>
  );
}

function ThemeCard() {
  return (
    <div className="rounded-xl border border-white/[0.09] bg-[#07111f]/80 p-4">
      <div className="flex items-center justify-between">
        <div><h4 className="text-sm font-bold text-white">Top themes</h4><p className="mt-1 text-[10px] text-slate-500">Themes mentioned by customers</p></div>
        <span className="text-[10px] font-semibold text-cyan-300">View all</span>
      </div>
      <div className="mt-4 space-y-3">
        {themes.map(([name, count, width]) => (
          <div key={name}>
            <div className="mb-1 flex justify-between gap-2 text-[9px]"><span className="truncate text-slate-300">{name}</span><span className="text-slate-400">{count}</span></div>
            <div className="h-1 rounded-full bg-white/[0.05]"><div className="h-full rounded-full bg-cyan-300" style={{ width }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IssueCard() {
  return (
    <div className="rounded-xl border border-white/[0.09] bg-[#07111f]/80 p-4">
      <div className="flex items-center justify-between">
        <div><h4 className="text-sm font-bold text-white">Emerging issue</h4><p className="mt-1 text-[10px] text-slate-500">New issues gaining attention</p></div>
        <span className="text-[10px] font-semibold text-cyan-300">View all</span>
      </div>
      <div className="mt-4 rounded-lg border border-rose-400/15 bg-rose-400/[0.035] p-3">
        <div className="flex items-start gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-400/10 text-rose-400">!</div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold leading-4 text-white">App performance on low-end devices</div>
            <div className="mt-1 text-[9px] font-semibold text-green-400">↑ 32% vs last 7 days</div>
          </div>
        </div>
        <p className="mt-3 text-[9px] leading-4 text-slate-400">Customers are reporting crashes and slow loading on budget devices.</p>
        <button className="mt-3 rounded-md border border-cyan-300/25 px-2.5 py-1.5 text-[9px] font-semibold text-cyan-300 transition hover:bg-cyan-300/10">View feedback</button>
      </div>
    </div>
  );
}

function ActionCard() {
  const actions = [
    ["▣", "Late deliveries", "23 mentions", "Urgent"],
    ["▤", "Payment failed", "18 mentions", "Urgent"],
    ["△", "App crashes", "15 mentions", "Urgent"],
    ["◐", "Dark mode request", "12 mentions", "High"],
  ];
  return (
    <div className="rounded-xl border border-white/[0.09] bg-[#07111f]/80 p-4">
      <div className="flex items-center justify-between">
        <div><h4 className="text-sm font-bold text-white">Recent action signals</h4><p className="mt-1 text-[10px] text-slate-500">High-priority feedback</p></div>
        <span className="text-[10px] font-semibold text-cyan-300">View all</span>
      </div>
      <div className="mt-3 space-y-2">
        {actions.map(([icon, title, count, priority]) => (
          <div key={title} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.018] p-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cyan-300/10 text-[11px] text-cyan-300">{icon}</div>
            <div className="min-w-0 flex-1"><div className="truncate text-[9px] font-semibold text-slate-200">{title}</div><div className="mt-0.5 text-[8px] text-slate-500">{count}</div></div>
            <span className={`rounded px-1.5 py-1 text-[8px] font-bold ${priority === "High" ? "bg-amber-400/10 text-amber-300" : "bg-rose-400/10 text-rose-400"}`}>{priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
