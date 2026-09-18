"use client";

import { KeyboardEvent } from "react";

type QuestionInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

const QuestionInput = ({
  value,
  onChange,
  onSubmit,
  isLoading,
}: QuestionInputProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (value.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#091523]/75 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.14)] backdrop-blur-xl">
      <div className="flex items-end gap-3">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={2}
          placeholder="Ask LOOP anything about your customer feedback..."
          className="min-h-[58px] flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-6 text-white outline-none placeholder:text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="button"
          onClick={onSubmit}
          disabled={!value.trim() || isLoading}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.08] text-cyan-300 transition-all duration-200 hover:bg-cyan-400/[0.14] hover:shadow-[0_0_20px_rgba(25,230,209,0.12)] disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Send question"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M22 2 11 13" />
              <path d="m22 2-7 20-4-9-9-4Z" />
            </svg>
          )}
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between px-2">
        <span className="text-[9px] text-slate-600">
          Ask about sentiment, themes, trends, or customer concerns.
        </span>

        <span className="hidden text-[9px] text-slate-600 sm:block">
          Enter to send · Shift + Enter for new line
        </span>
      </div>
    </div>
  );
};

export default QuestionInput;
