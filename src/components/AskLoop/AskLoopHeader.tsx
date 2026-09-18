const AskLoopHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
          AI Intelligence
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Ask LOOP
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Ask questions about your customer feedback and uncover insights using
          workspace data.
        </p>
      </div>

      <div className="flex w-fit items-center gap-2 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(25,230,209,0.8)]" />

        <div>
          <p className="text-[10px] font-medium text-cyan-300">
            LOOP Intelligence
          </p>

          <p className="mt-0.5 text-[9px] text-slate-500">
            Grounded in workspace feedback
          </p>
        </div>
      </div>
    </div>
  );
};

export default AskLoopHeader;
