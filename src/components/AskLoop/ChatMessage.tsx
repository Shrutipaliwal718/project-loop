type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[85%] gap-3 sm:max-w-[75%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${
            isUser
              ? "border-white/10 bg-white/[0.05]"
              : "border-cyan-400/15 bg-cyan-400/[0.06]"
          }`}
        >
          {isUser ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="text-slate-300"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" />
            </svg>
          ) : (
            <span className="text-xs font-bold text-cyan-300">L</span>
          )}
        </div>

        {/* Message */}
        <div
          className={`rounded-2xl border px-4 py-3 ${
            isUser
              ? "border-white/[0.08] bg-white/[0.055]"
              : "border-cyan-400/[0.08] bg-[#0b1827]/90"
          }`}
        >
          <p className="whitespace-pre-line text-sm leading-6 text-slate-200">
            {content}
          </p>

          {!isUser && (
            <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-2">
              <span className="h-1 w-1 rounded-full bg-cyan-400" />
              <span className="text-[9px] uppercase tracking-[0.12em] text-slate-600">
                LOOP insight
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
