'use client';

import { useState } from 'react';
import { Sparkles, Search, MessageSquare, ArrowRight, BookOpen, Quote } from 'lucide-react';

interface Source {
  id: string;
  title: string;
  channel: string;
  sentiment: string;
  category: string;
  content: string;
}

export default function AskLoopPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<Source[]>([]);

  const suggestedPrompts = [
    'What are enterprise tier users saying about our billing page?',
    'What is the feedback regarding our new Dark Mode interface?',
    'Are there any recurring performance bugs with CSV exports?',
    'What top feature integrations are customers requesting?',
  ];

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    setAnswer(null);
    setSources([]);

    try {
      const res = await fetch('/api/ai/ask-loop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate answer');

      setAnswer(data.answer);
      setSources(data.sources || []);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Anthropic Claude RAG Engine
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Ask LOOP — Natural Language Feedback Q&A</h1>
        <p className="text-slate-400 text-xs mt-1">
          Perform semantic retrieval over your customer feedback database with factual source attribution
        </p>
      </div>

      {/* Query Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query) handleSearch(query);
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about your customer feedback..."
              className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !query}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white transition flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Ask LOOP <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Suggested Prompt Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-[11px] text-slate-500 font-medium py-1">Try asking:</span>
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(prompt)}
              className="text-xs px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500 text-slate-300 transition hover:text-white"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Answer Output Box */}
      {answer && (
        <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 space-y-6 bg-gradient-to-b from-indigo-950/20 to-slate-950/60">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" /> Anthropic Claude AI Answer
          </div>

          <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            {answer}
          </div>

          {/* Cited Source Tickets */}
          {sources.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Cited Source Feedback Tickets ({sources.length})
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sources.map((src) => (
                  <div key={src.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {src.channel}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">ID: #{src.id.slice(-6)}</span>
                    </div>
                    <p className="text-xs font-bold text-white truncate">{src.title}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-2">"{src.content}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
