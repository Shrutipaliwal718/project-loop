export default function APIRootPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-emerald-400 p-8 font-mono">
      <div className="max-w-2xl text-center space-y-4 border border-emerald-900/50 p-8 rounded-xl bg-emerald-950/20 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Project LOOP API Active</h1>
        
        <p className="text-emerald-500/80 text-sm">
          System is running in isolated Backend/AI mode.
        </p>
        
        <div className="mt-8 text-left bg-black/50 p-6 rounded-lg border border-emerald-900/50">
          <h2 className="text-sm font-semibold text-white mb-4">Available Endpoints:</h2>
          <ul className="space-y-3 text-xs text-emerald-300">
            <li className="flex items-center gap-3"><span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded">POST</span> <code>/api/workspace/ingest-real</code> <span className="text-emerald-700 ml-auto hidden sm:block">Generate feedback & vector embeddings</span></li>
            <li className="flex items-center gap-3"><span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded">POST</span> <code>/api/ai/ask-loop</code> <span className="text-emerald-700 ml-auto hidden sm:block">pgvector semantic search + RAG Synthesis</span></li>
            <li className="flex items-center gap-3"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">GET</span> <code>/api/ai/trends</code> <span className="text-emerald-700 ml-auto hidden sm:block">Automated trend spike detection</span></li>
            <li className="flex items-center gap-3"><span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded">POST</span> <code>/api/reports/generate</code> <span className="text-emerald-700 ml-auto hidden sm:block">1-Click Voice-of-Customer PDF/Report</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
