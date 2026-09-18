"use client";

import { FormEvent, useState } from "react";
import styles from "./feedback.module.css";

const ManualFeedbackForm = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setMessage({
        type: "error",
        text: "Please enter customer feedback before submitting.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage(null);

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: trimmedContent,
          channel: "MANUAL",
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit feedback.");
      }

      setContent("");

      setMessage({
        type: "success",
        text: "Feedback submitted successfully.",
      });
    } catch {
      setMessage({
        type: "error",
        text: "Feedback could not be submitted. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-white">
            Add customer feedback
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Capture a customer response manually. LOOP can analyze it after
            ingestion.
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="feedback-content"
              className="text-[11px] font-medium text-slate-400"
            >
              Customer feedback
            </label>

            <span className="text-[10px] text-slate-600">
              {content.length}/2000
            </span>
          </div>

          <textarea
            id="feedback-content"
            value={content}
            onChange={(event) => {
              if (event.target.value.length <= 2000) {
                setContent(event.target.value);
              }
            }}
            placeholder="e.g. The checkout process is too slow and confusing..."
            rows={7}
            className={`${styles.input} w-full resize-none rounded-xl border border-white/[0.08] bg-[#030912]/70 px-4 py-3.5 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-700`}
          />

          <p className="mt-2 text-[10px] leading-5 text-slate-600">
            Keep the feedback close to the customer&apos;s original wording for
            better AI analysis.
          </p>
        </div>

        {message && (
          <div
            className={`mt-4 rounded-lg border px-3 py-2.5 text-xs ${
              message.type === "success"
                ? "border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-300"
                : "border-red-400/15 bg-red-400/[0.05] text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className={`${styles.primaryButton} inline-flex items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-400/10 px-4 py-2.5 text-xs font-semibold text-cyan-300`}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner} />
                Submitting
              </>
            ) : (
              <>
                <span className="relative z-10">Submit feedback</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      <div className="rounded-xl border border-white/[0.06] bg-[#030912]/45 p-5">
        <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-300">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3l8 4.5v5c0 4.5-3.4 7.7-8 8.5-4.6-.8-8-4-8-8.5v-5L12 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4"
            />
          </svg>
        </div>

        <h3 className="text-xs font-semibold text-slate-200">
          What happens next?
        </h3>

        <div className="mt-4 space-y-4">
          {[
            ["01", "Ingest", "Feedback enters your workspace."],
            ["02", "Analyze", "AI evaluates sentiment and themes."],
            ["03", "Act", "Insights become actionable signals."],
          ].map(([number, title, description]) => (
            <div key={number} className="flex gap-3">
              <span className="font-mono text-[10px] text-cyan-400/60">
                {number}
              </span>

              <div>
                <p className="text-[11px] font-medium text-slate-300">
                  {title}
                </p>

                <p className="mt-0.5 text-[10px] leading-5 text-slate-600">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManualFeedbackForm;
