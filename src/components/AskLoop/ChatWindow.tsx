import ChatMessage from "./ChatMessage";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

type ChatWindowProps = {
  messages: Message[];
  isLoading: boolean;
};

const ChatWindow = ({ messages, isLoading }: ChatWindowProps) => {
  return (
    <div className="flex min-h-[430px] flex-col rounded-2xl border border-white/[0.08] bg-[#091523]/75 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06]">
            <span className="text-sm font-bold text-cyan-300">L</span>
          </div>

          <div>
            <p className="text-xs font-semibold text-white">LOOP Assistant</p>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.7)]" />
              <span className="text-[9px] text-slate-500">
                Ready to analyze feedback
              </span>
            </div>
          </div>
        </div>

        <span className="hidden rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[9px] text-slate-500 sm:block">
          Workspace context
        </span>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-6">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06]">
              <span className="text-xs font-bold text-cyan-300">L</span>
            </div>

            <div className="rounded-2xl border border-cyan-400/[0.08] bg-[#0b1827]/90 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
