"use client";

import { useState } from "react";
import dashboardData from "@/data/dashboard.json";

type SentimentType = "Positive" | "Neutral" | "Negative" | null;

const SentimentTrend = () => {
  const { sentimentBreakdown, totalFeedback } = dashboardData.analytics;

  const positive = sentimentBreakdown.POS;
  const neutral = sentimentBreakdown.NEU;
  const negative = sentimentBreakdown.NEG;

  const [hoveredSegment, setHoveredSegment] = useState<SentimentType>(null);

  const sentimentData = [
    {
      label: "Positive" as const,
      value: positive,
      color: "#19e6d1",
      textColor: "text-cyan-300",
      count: Math.round((totalFeedback * positive) / 100),
    },
    {
      label: "Neutral" as const,
      value: neutral,
      color: "#94a3b8",
      textColor: "text-slate-300",
      count: Math.round((totalFeedback * neutral) / 100),
    },
    {
      label: "Negative" as const,
      value: negative,
      color: "#ff4d72",
      textColor: "text-rose-300",
      count: Math.round((totalFeedback * negative) / 100),
    },
  ];

  const size = 190;
  const center = size / 2;
  const radius = 72;
  const strokeWidth = 32;
  const circumference = 2 * Math.PI * radius;

  const getSegmentOffset = (index: number) => {
    const previousPercentage = sentimentData
      .slice(0, index)
      .reduce((total, item) => total + item.value, 0);

    return -(previousPercentage / 100) * circumference;
  };

  const getSegmentLength = (value: number) => {
    return (value / 100) * circumference;
  };

  const hoveredData = sentimentData.find(
    (item) => item.label === hoveredSegment,
  );

  return (
    <section className="h-full rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/[0.14]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Sentiment
          </p>

          <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-white">
            Sentiment distribution
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Overall customer sentiment across all feedback
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] px-3 py-2 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(25,230,209,0.8)]" />

          <div>
            <p className="text-[10px] font-medium text-cyan-300">Current mix</p>

            <p className="mt-0.5 text-[9px] text-slate-500">
              Workspace overview
            </p>
          </div>
        </div>
      </div>

      {/* Donut + Breakdown */}
      <div className="mt-6 flex flex-col items-center gap-7 sm:flex-row sm:justify-center sm:gap-8 lg:gap-10">
        {/* Interactive Donut */}
        <div className="relative flex h-[190px] w-[190px] shrink-0 items-center justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="overflow-visible"
          >
            {/* Background Ring */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.045)"
              strokeWidth={strokeWidth}
            />

            {/* Donut Segments */}
            {sentimentData.map((item, index) => {
              const isHovered = hoveredSegment === item.label;

              return (
                <circle
                  key={item.label}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={isHovered ? strokeWidth + 5 : strokeWidth}
                  strokeLinecap="butt"
                  strokeDasharray={`${getSegmentLength(
                    item.value,
                  )} ${circumference}`}
                  strokeDashoffset={getSegmentOffset(index)}
                  transform={`rotate(-90 ${center} ${center})`}
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    filter: isHovered
                      ? `drop-shadow(0 0 8px ${item.color}80)`
                      : "none",
                    opacity: hoveredSegment && !isHovered ? 0.4 : 1,
                  }}
                  onMouseEnter={() => setHoveredSegment(item.label)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
              );
            })}
          </svg>

          {/* Donut Center */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            {hoveredData ? (
              <>
                <span
                  className="text-2xl font-semibold tracking-tight"
                  style={{ color: hoveredData.color }}
                >
                  {hoveredData.count.toLocaleString()}
                </span>

                <span className="mt-1 text-[10px] font-medium text-slate-300">
                  {hoveredData.label}
                </span>

                <span className="mt-0.5 text-[9px] text-slate-500">
                  feedback
                </span>
              </>
            ) : (
              <>
                <span className="text-2xl font-semibold tracking-tight text-white">
                  {totalFeedback.toLocaleString()}
                </span>

                <span className="mt-1 text-[10px] text-slate-500">
                  Total feedback
                </span>
              </>
            )}
          </div>
        </div>

        {/* Sentiment Breakdown */}
        <div className="w-full max-w-[270px] space-y-5">
          {sentimentData.map((item) => {
            const isHovered = hoveredSegment === item.label;

            return (
              <div
                key={item.label}
                className="cursor-default transition-all duration-200"
                onMouseEnter={() => setHoveredSegment(item.label)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                {/* Label + Percentage + Faded Count */}
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-3 w-3 rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: isHovered
                          ? `0 0 12px ${item.color}90`
                          : `0 0 8px ${item.color}40`,
                      }}
                    />

                    <span
                      className={`text-xs font-medium transition-colors ${
                        isHovered ? "text-white" : "text-slate-200"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Percentage */}
                    <span className={`text-sm font-semibold ${item.textColor}`}>
                      {item.value}%
                    </span>

                    {/* Faded Feedback Count */}
                    <span className="text-[10px] text-slate-600">
                      {item.count.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Visual Bar */}
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                      boxShadow: isHovered
                        ? `0 0 12px ${item.color}50`
                        : `0 0 8px ${item.color}20`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-white/[0.07] pt-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Total analyzed feedback
          </span>

          <span className="text-[11px] font-medium text-slate-300">
            {totalFeedback.toLocaleString()} responses
          </span>
        </div>
      </div>
    </section>
  );
};

export default SentimentTrend;
