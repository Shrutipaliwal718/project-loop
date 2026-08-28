'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  CheckCheck, 
  ChevronRight,
  X,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  channel: string;
  customerSegment: string;
  status: 'NEW' | 'REVIEWED' | 'ACTIONED';
  sentiment: 'Positive' | 'Negative' | 'Neutral' | 'Mixed';
  sentimentScore: number;
  category: string;
  createdAt: string;
}

export default function InboxClientView({ initialFeedbacks }: { initialFeedbacks: FeedbackItem[] }) {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(initialFeedbacks);
  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState('ALL');
  const [sentimentFilter, setSentimentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch feedback strictly for active company workspace from localStorage
  const loadCompanyFeedback = async () => {
    const activeCompany = localStorage.getItem('active_workspace_name');
    if (!activeCompany) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/feedback/list?companyName=${encodeURIComponent(activeCompany)}`);
      const data = await res.json();
      if (data.feedbacks) {
        setFeedbacks(data.feedbacks);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanyFeedback();
  }, []);

  // Status update handler
  const handleStatusChange = async (id: string, newStatus: 'NEW' | 'REVIEWED' | 'ACTIONED') => {
    try {
      const res = await fetch(`/api/feedback/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setFeedbacks((prev) =>
        prev.map((fb) => (fb.id === id ? { ...fb, status: newStatus } : fb))
      );

      if (selectedFeedback?.id === id) {
        setSelectedFeedback((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Filter Logic
  const filtered = feedbacks.filter((fb) => {
    const matchesSearch =
      fb.title.toLowerCase().includes(search.toLowerCase()) ||
      fb.content.toLowerCase().includes(search.toLowerCase());
    const matchesChannel = channelFilter === 'ALL' || fb.channel === channelFilter;
    const matchesSentiment = sentimentFilter === 'ALL' || fb.sentiment === sentimentFilter;
    const matchesStatus = statusFilter === 'ALL' || fb.status === statusFilter;
    return matchesSearch && matchesChannel && matchesSentiment && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3" /> NEW
          </span>
        );
      case 'REVIEWED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <CheckCircle className="w-3 h-3" /> REVIEWED
          </span>
        );
      case 'ACTIONED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCheck className="w-3 h-3" /> ACTIONED
          </span>
        );
      default:
        return null;
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">Positive</span>;
      case 'Negative':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400">Negative</span>;
      case 'Mixed':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400">Mixed</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-300">Neutral</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filters Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search feedback titles or content..."
            className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={loadCompanyFeedback}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            title="Refresh Inbox"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <div className="flex items-center gap-1 text-slate-400 text-xs mr-1">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </div>

          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg glass-input text-xs bg-slate-900"
          >
            <option value="ALL">All Channels</option>
            <option value="CSV Upload">CSV Upload</option>
            <option value="Zendesk">Zendesk</option>
            <option value="Intercom">Intercom</option>
            <option value="App Store">App Store</option>
            <option value="Play Store">Play Store</option>
            <option value="Trustpilot">Trustpilot</option>
            <option value="Manual Entry">Manual Entry</option>
          </select>

          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg glass-input text-xs bg-slate-900"
          >
            <option value="ALL">All Sentiments</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
            <option value="Neutral">Neutral</option>
            <option value="Mixed">Mixed</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg glass-input text-xs bg-slate-900"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">NEW</option>
            <option value="REVIEWED">REVIEWED</option>
            <option value="ACTIONED">ACTIONED</option>
          </select>
        </div>
      </div>

      {/* Main Inbox Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Customer Feedback</th>
                <th className="p-4">Channel & Category</th>
                <th className="p-4">AI Sentiment</th>
                <th className="p-4">Status Pipeline</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 text-xs">
                    No feedback entries found for this company workspace. Click "Feedback Ingestion" to add real feedback.
                  </td>
                </tr>
              ) : (
                filtered.map((fb) => (
                  <tr key={fb.id} className="hover:bg-slate-900/50 transition group">
                    {/* Title & Content */}
                    <td className="p-4 max-w-md">
                      <p className="font-bold text-white text-sm line-clamp-1">{fb.title}</p>
                      <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">{fb.content}</p>
                    </td>

                    {/* Channel & Category */}
                    <td className="p-4">
                      <span className="inline-block font-semibold text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {fb.channel}
                      </span>
                      <p className="text-[11px] text-indigo-400 mt-1 font-medium">{fb.category}</p>
                    </td>

                    {/* Sentiment */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getSentimentBadge(fb.sentiment)}
                        <span className="text-[10px] text-slate-500 font-mono">({fb.sentimentScore})</span>
                      </div>
                    </td>

                    {/* Status Pipeline Buttons */}
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStatusChange(fb.id, 'NEW')}
                          className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                            fb.status === 'NEW'
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          NEW
                        </button>
                        <button
                          onClick={() => handleStatusChange(fb.id, 'REVIEWED')}
                          className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                            fb.status === 'REVIEWED'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          REVIEWED
                        </button>
                        <button
                          onClick={() => handleStatusChange(fb.id, 'ACTIONED')}
                          className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                            fb.status === 'ACTIONED'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          ACTIONED
                        </button>
                      </div>
                    </td>

                    {/* Action Drawer Toggle */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedFeedback(fb)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-medium inline-flex items-center gap-1 transition"
                      >
                        Inspect <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL INSPECT DRAWER / MODAL */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-panel w-full max-w-xl p-6 rounded-2xl border border-slate-800 space-y-5 relative">
            <button
              onClick={() => setSelectedFeedback(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
                  {selectedFeedback.channel}
                </span>
                {getStatusBadge(selectedFeedback.status)}
              </div>
              <h2 className="text-lg font-bold text-white">{selectedFeedback.title}</h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-sm leading-relaxed">
              "{selectedFeedback.content}"
            </div>

            {/* AI Classification Metadata Box */}
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Anthropic Claude AI Analysis
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Sentiment</span>
                  <span className="font-bold text-white">{selectedFeedback.sentiment}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Confidence Score</span>
                  <span className="font-bold text-emerald-400">{selectedFeedback.sentimentScore}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Category Tag</span>
                  <span className="font-bold text-indigo-300">{selectedFeedback.category}</span>
                </div>
              </div>
            </div>

            {/* Status Workflow Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Update Status Workflow:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(selectedFeedback.id, 'NEW')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    selectedFeedback.status === 'NEW' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  NEW
                </button>
                <button
                  onClick={() => handleStatusChange(selectedFeedback.id, 'REVIEWED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    selectedFeedback.status === 'REVIEWED' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  REVIEWED
                </button>
                <button
                  onClick={() => handleStatusChange(selectedFeedback.id, 'ACTIONED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    selectedFeedback.status === 'ACTIONED' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  ACTIONED
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
