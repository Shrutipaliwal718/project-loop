"use client";

import { useEffect, useState } from "react";

type Theme = {
  name: string;
  count: number;
  percentage: number;
};

const KeyThemes = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/dashboard", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok || !data.success || !data.analytics) {
          throw new Error(data.message ?? "Failed to load key themes.");
        }

        setThemes(data.analytics.topThemes ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load key themes.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  if (loading) {
    return (
      <section className="h-full rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400">
            Theme intelligence
          </p>

          <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-white">
            Key themes
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Topics generating the strongest feedback signals.
          </p>
        </div>

        <div className="mt-6 flex min-h-[220px] items-center justify-center">
          <p className="text-xs text-slate-500">Loading key themes...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="h-full rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400">
            Theme intelligence
          </p>

          <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-white">
            Key themes
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Topics generating the strongest feedback signals.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-rose-400/10 bg-rose-400/[0.03] p-4">
          <p className="text-xs font-medium text-rose-300">
            Unable to load key themes
          </p>

          <p className="mt-1 text-[11px] text-slate-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="h-full rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/[0.14]">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400">
          Theme intelligence
        </p>

        <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-white">
          Key themes
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Topics generating the strongest feedback signals.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {themes.length === 0 ? (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 text-center">
            <p className="text-xs text-slate-500">No themes identified yet.</p>
          </div>
        ) : (
          themes.map((theme, index) => (
            <div key={theme.name}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-[9px] font-semibold text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="truncate text-xs font-medium text-slate-200">
                    {theme.name}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-[10px] text-slate-600">
                    {theme.count.toLocaleString()}
                  </span>

                  <span className="text-xs font-semibold text-violet-300">
                    {theme.percentage}%
                  </span>
                </div>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.055]">
                <div
                  className="h-full rounded-full bg-violet-400/80 transition-all duration-500"
                  style={{
                    width: `${Math.min(Math.max(theme.percentage, 0), 100)}%`,
                    boxShadow: "0 0 10px rgba(167,139,250,0.18)",
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-600">Themes identified</span>

          <span className="text-[10px] font-medium text-slate-400">
            {themes.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default KeyThemes;
