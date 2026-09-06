"use client";

import { useMemo, useState } from "react";
import styles from "./feedback.module.css";

type FeedbackItem = {
  id: number;
  content: string;
  channel: string;
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  status: "OPEN" | "REVIEWING" | "RESOLVED";
  time: string;
};

const feedbackData: FeedbackItem[] = [
  {
    id: 1,
    content: "The checkout process is too slow and confusing.",
    channel: "MANUAL",
    sentiment: "NEGATIVE",
    status: "OPEN",
    time: "2 min ago",
  },
  {
    id: 2,
    content: "I really like how quickly the new dashboard loads.",
    channel: "CHAT",
    sentiment: "POSITIVE",
    status: "RESOLVED",
    time: "18 min ago",
  },
  {
    id: 3,
    content: "Customer support helped me solve the issue quickly.",
    channel: "EMAIL",
    sentiment: "POSITIVE",
    status: "RESOLVED",
    time: "42 min ago",
  },
  {
    id: 4,
    content: "The pricing page is difficult to understand.",
    channel: "SURVEY",
    sentiment: "NEGATIVE",
    status: "REVIEWING",
    time: "1 hr ago",
  },
  {
    id: 5,
    content: "The product works well, but the mobile experience could improve.",
    channel: "CHAT",
    sentiment: "NEUTRAL",
    status: "OPEN",
    time: "2 hrs ago",
  },
  {
    id: 6,
    content: "The latest update made the navigation much easier.",
    channel: "EMAIL",
    sentiment: "POSITIVE",
    status: "RESOLVED",
    time: "3 hrs ago",
  },
];

const FeedbackInbox = () => {
  const [search, setSearch] = useState("");
  const [channel, setChannel] = useState("ALL");
  const [sentiment, setSentiment] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const filteredFeedback = useMemo(() => {
    return feedbackData.filter((item) => {
      const matchesSearch = item.content
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesChannel = channel === "ALL" || item.channel === channel;

      const matchesSentiment =
        sentiment === "ALL" || item.sentiment === sentiment;

      const matchesStatus = status === "ALL" || item.status === status;

      return (
        matchesSearch && matchesChannel && matchesSentiment && matchesStatus
      );
    });
  }, [search, channel, sentiment, status]);

  return (
    <section className={`${styles.fadeUpDelayed} mt-8`}>
      {/* Header */}
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight text-white">
              Feedback inbox
            </h2>

            <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2 py-0.5 text-[9px] font-medium text-slate-500">
              {filteredFeedback.length}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-600">
            Review, filter and track customer feedback across your workspace.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        className={`${styles.filterBar} rounded-2xl border border-white/[0.07] bg-[#07111e]/90 p-3 shadow-2xl shadow-black/15`}
      >
        <div className="flex flex-col gap-2 xl:flex-row">
          <div className="relative min-w-0 flex-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600"
            >
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m20 20-4-4" />
            </svg>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search feedback..."
              className={`${styles.filterInput} h-10 w-full rounded-lg border border-white/[0.06] bg-[#030912]/70 pl-9 pr-3 text-xs text-slate-300 outline-none placeholder:text-slate-700`}
            />
          </div>

          <select
            value={channel}
            onChange={(event) => setChannel(event.target.value)}
            className="h-10 rounded-lg border border-white/[0.06] bg-[#030912]/70 px-3 text-xs text-slate-400 outline-none transition hover:border-white/[0.1] focus:border-cyan-400/20"
          >
            <option value="ALL">All channels</option>
            <option value="MANUAL">Manual</option>
            <option value="CHAT">Chat</option>
            <option value="EMAIL">Email</option>
            <option value="SURVEY">Survey</option>
          </select>

          <select
            value={sentiment}
            onChange={(event) => setSentiment(event.target.value)}
            className="h-10 rounded-lg border border-white/[0.06] bg-[#030912]/70 px-3 text-xs text-slate-400 outline-none transition hover:border-white/[0.1] focus:border-cyan-400/20"
          >
            <option value="ALL">All sentiment</option>
            <option value="POSITIVE">Positive</option>
            <option value="NEUTRAL">Neutral</option>
            <option value="NEGATIVE">Negative</option>
          </select>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-10 rounded-lg border border-white/[0.06] bg-[#030912]/70 px-3 text-xs text-slate-400 outline-none transition hover:border-white/[0.1] focus:border-cyan-400/20"
          >
            <option value="ALL">All status</option>
            <option value="OPEN">Open</option>
            <option value="REVIEWING">Reviewing</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="mt-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#07111e]/90 shadow-2xl shadow-black/15">
        {filteredFeedback.length === 0 ? (
          <div className={`${styles.emptyState} px-6 py-16 text-center`}>
            <div
              className={`${styles.emptyStateIcon} mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-600`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5"
              >
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="m20 20-4-4" />
              </svg>
            </div>

            <p className="mt-4 text-xs font-medium text-slate-400">
              No feedback found
            </p>

            <p className="mt-1 text-[10px] text-slate-600">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          filteredFeedback.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.feedbackRow} ${
                index !== filteredFeedback.length - 1
                  ? "border-b border-white/[0.05]"
                  : ""
              } px-4 py-4 sm:px-5`}
            >
              <div className="flex gap-4">
                <div
                  className={`mt-1 h-8 w-1 shrink-0 rounded-full ${
                    item.sentiment === "POSITIVE"
                      ? "bg-emerald-400/70"
                      : item.sentiment === "NEGATIVE"
                        ? "bg-red-400/70"
                        : "bg-amber-400/70"
                  }`}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <p
                      className={`${styles.feedbackContent} max-w-3xl text-xs leading-5 text-slate-300`}
                    >
                      {item.content}
                    </p>

                    <span
                      className={`${styles.badge} w-fit shrink-0 rounded-full border px-2 py-1 text-[8px] font-semibold uppercase tracking-wider ${
                        item.sentiment === "POSITIVE"
                          ? "border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-300"
                          : item.sentiment === "NEGATIVE"
                            ? "border-red-400/15 bg-red-400/[0.05] text-red-300"
                            : "border-amber-400/15 bg-amber-400/[0.05] text-amber-300"
                      }`}
                    >
                      {item.sentiment}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] text-slate-600">
                    <span>{item.channel}</span>

                    <span className="h-1 w-1 rounded-full bg-slate-700" />

                    <span>{item.time}</span>

                    <span className="h-1 w-1 rounded-full bg-slate-700" />

                    <span
                      className={
                        item.status === "RESOLVED"
                          ? "text-emerald-400/70"
                          : item.status === "REVIEWING"
                            ? "text-amber-400/70"
                            : "text-cyan-400/70"
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Open feedback"
                  className={`${styles.rowAction} hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-700 sm:flex`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 18l6-6-6-6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-white/[0.05] px-4 py-3 sm:px-5">
          <span className="text-[9px] text-slate-600">
            Showing {filteredFeedback.length} of {feedbackData.length} feedback
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              className="flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.05] text-slate-700 disabled:cursor-not-allowed"
            >
              ←
            </button>

            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-cyan-400/15 bg-cyan-400/[0.06] text-[9px] text-cyan-300"
            >
              1
            </button>

            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.05] text-[9px] text-slate-600 transition hover:border-white/[0.1] hover:text-slate-300"
            >
              2
            </button>

            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.05] text-slate-500 transition hover:border-white/[0.1] hover:text-slate-300"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackInbox;
