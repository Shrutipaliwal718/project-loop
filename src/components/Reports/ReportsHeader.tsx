const ReportsHeader = () => {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Voice of Customer
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Intelligence Reports
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Turn customer feedback into a concise view of what customers are
          saying, what matters most, and where action is needed.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(25,230,209,0.8)]" />

          <div>
            <p className="text-[10px] font-medium text-cyan-300">
              AI generated
            </p>

            <p className="mt-0.5 text-[9px] text-slate-500">
              Workspace intelligence
            </p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] font-medium text-slate-400 transition-all duration-200 hover:border-cyan-400/15 hover:bg-cyan-400/[0.04] hover:text-cyan-300"
        >
          Generate report
        </button>
      </div>
    </div>
  );
};

export default ReportsHeader;
