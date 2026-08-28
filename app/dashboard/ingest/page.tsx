'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  PenTool, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  Globe,
  ArrowRight,
  AlertCircle,
  Building2
} from 'lucide-react';

export default function FeedbackIngestionPage() {
  const [activeTab, setActiveTab] = useState<'real' | 'manual' | 'csv' | 'simulated'>('real');

  // Single Manual Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [channel, setChannel] = useState('Manual Entry');
  const [segment, setSegment] = useState('Pro');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // CSV State
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<any[]>([]);
  const [csvLoading, setCsvLoading] = useState(false);

  // Fetch Live Company Feedback Handler
  const handleFetchRealCompanyFeedback = async () => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/workspace/ingest-real', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch real feedback');

      setSuccessMessage(`Successfully fetched & AI-classified ${data.count} real customer reviews into this company workspace!`);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Single Submission Handler
  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/feedback/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          channel,
          customerSegment: segment,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ingestion failed');

      setSuccessMessage(`Successfully ingested! AI classified as ${data.item.sentiment} (${data.item.category}).`);
      setTitle('');
      setContent('');
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // CSV Parse Handler
  const handleCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setCsvPreview(results.data.slice(0, 5));
        },
      });
    }
  };

  // CSV Submit Handler
  const handleCsvSubmit = async () => {
    if (!csvFile) return;
    setCsvLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const items = results.data.map((row: any) => ({
            title: row.title || row.Title || row.subject || 'CSV Feedback Entry',
            content: row.content || row.Content || row.feedback || row.text || row.description || '',
            channel: row.channel || row.Channel || 'CSV Upload',
            customerSegment: row.segment || row.CustomerSegment || 'Pro',
          }));

          const res = await fetch('/api/feedback/ingest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'csv', items }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'CSV Ingestion failed');

          setSuccessMessage(`Batch Ingestion Complete! Successfully ingested & AI-tagged ${data.count} feedback items.`);
          setCsvFile(null);
          setCsvPreview([]);
        } catch (err: any) {
          setErrorMessage(err.message);
        } finally {
          setCsvLoading(false);
        }
      },
    });
  };

  // Simulated Webhook Trigger Handler
  const handleSimulatedTrigger = async (presetKey: string) => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/feedback/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'simulated', preset: presetKey }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Trigger failed');

      setSuccessMessage(`Simulated ${data.item.channel} webhook received! Auto-tagged as ${data.item.sentiment} (${data.item.category}).`);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Multi-Channel Feedback Ingestion</h1>
        <p className="text-slate-400 text-xs mt-1">Ingest raw customer signals for real-time Claude AI sentiment & theme classification</p>
      </div>

      {/* Alert Messages */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('real')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition ${
            activeTab === 'real'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe className="w-4 h-4 text-emerald-400" /> Fetch Live Reviews
        </button>

        <button
          onClick={() => setActiveTab('manual')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition ${
            activeTab === 'manual'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <PenTool className="w-4 h-4" /> Single Manual Entry
        </button>

        <button
          onClick={() => setActiveTab('csv')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition ${
            activeTab === 'csv'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" /> CSV Bulk Upload
        </button>

        <button
          onClick={() => setActiveTab('simulated')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition ${
            activeTab === 'simulated'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" /> Channel Simulators
        </button>
      </div>

      {/* TAB 0: LIVE REVIEWS AUTO-POPULATOR */}
      {activeTab === 'real' && (
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-5 bg-gradient-to-b from-indigo-950/20 to-slate-950/60">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <Globe className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-1">Fetch Live Real Customer Reviews</h3>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Automatically stream & AI-classify live customer reviews from App Store, Play Store, and Trustpilot for your active company workspace.
            </p>
          </div>

          <button
            onClick={handleFetchRealCompanyFeedback}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white transition inline-flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" /> Fetch Live Customer Feedback Now <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* TAB 1: SINGLE MANUAL ENTRY FORM */}
      {activeTab === 'manual' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <form onSubmit={handleSingleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Feedback Title / Headline</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Checkout page returns 500 error on Amex payment"
                className="w-full px-4 py-2.5 rounded-lg glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Detailed Customer Feedback Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
                placeholder="Paste verbatim customer review, support ticket body, or survey comment..."
                className="w-full px-4 py-2.5 rounded-lg glass-input text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Origin Channel</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-sm bg-slate-900"
                >
                  <option value="Manual Entry">Manual Entry</option>
                  <option value="CSAT Survey">CSAT Survey</option>
                  <option value="Email Support">Email Support</option>
                  <option value="Sales Call Transcript">Sales Call Transcript</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Customer Tier Segment</label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-sm bg-slate-900"
                >
                  <option value="Enterprise">Enterprise Tier</option>
                  <option value="Pro">Pro Tier</option>
                  <option value="SMB">SMB Tier</option>
                  <option value="Free">Free Tier</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Ingest & Run Claude AI Auto-Classification <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: CSV BULK UPLOAD */}
      {activeTab === 'csv' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500/50 rounded-2xl p-8 text-center bg-slate-900/40 transition">
            <UploadCloud className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">Select or Drag CSV Feedback Dataset</h3>
            <p className="text-xs text-slate-400 mb-4">Supports headers: <code className="text-indigo-300">title</code>, <code className="text-indigo-300">content</code>, <code className="text-indigo-300">channel</code>, <code className="text-indigo-300">segment</code></p>
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvFileChange}
              className="hidden"
              id="csv-file-input"
            />
            <label
              htmlFor="csv-file-input"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white cursor-pointer inline-flex items-center gap-2 shadow-md shadow-indigo-600/20"
            >
              Choose CSV File
            </label>
          </div>

          {csvPreview.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">CSV Preview (First 5 Rows)</h4>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="p-3">Title</th>
                      <th className="p-3">Content</th>
                      <th className="p-3">Channel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                    {csvPreview.map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-3 font-semibold text-white">{row.title || row.Title || '—'}</td>
                        <td className="p-3 text-slate-400 line-clamp-1">{row.content || row.Content || '—'}</td>
                        <td className="p-3 text-indigo-400">{row.channel || row.Channel || 'CSV Upload'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={handleCsvSubmit}
                disabled={csvLoading}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 disabled:opacity-50"
              >
                {csvLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-400" /> Start Bulk AI Classification & Ingestion
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SIMULATED CHANNEL WEBHOOK BUTTONS */}
      {activeTab === 'simulated' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Simulated Channel Webhook Ingestors</h3>
            <p className="text-xs text-slate-400">Trigger live 1-click webhook signals from 5 external platforms to test real-time AI tagging</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => handleSimulatedTrigger('zendesk')}
              disabled={loading}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 text-left transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400">Zendesk Support</span>
              </div>
              <p className="text-xs font-semibold text-white">Ticket #8492: Billing Infinite Spinner</p>
              <p className="text-[11px] text-slate-400 line-clamp-2">Chrome 126 user reports infinite loader on payment settings tab...</p>
            </button>

            <button
              onClick={() => handleSimulatedTrigger('intercom')}
              disabled={loading}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500 text-left transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-violet-400">Intercom Live Chat</span>
              </div>
              <p className="text-xs font-semibold text-white">Chat #391: AI Search Praise</p>
              <p className="text-[11px] text-slate-400 line-clamp-2">Saved our product management team 5 hours of manual feedback analysis...</p>
            </button>

            <button
              onClick={() => handleSimulatedTrigger('appstore')}
              disabled={loading}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500 text-left transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400">Apple App Store</span>
              </div>
              <p className="text-xs font-semibold text-white">iOS Review: Rapid Session Logout</p>
              <p className="text-[11px] text-slate-400 line-clamp-2">Mobile application session expires every 2 hours...</p>
            </button>

            <button
              onClick={() => handleSimulatedTrigger('playstore')}
              disabled={loading}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 text-left transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">Google Play Store</span>
              </div>
              <p className="text-xs font-semibold text-white">Android Review: OLED Dark Theme</p>
              <p className="text-[11px] text-slate-400 line-clamp-2">Modern dark theme renders crisp aesthetics on OLED displays...</p>
            </button>

            <button
              onClick={() => handleSimulatedTrigger('trustpilot')}
              disabled={loading}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-left transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">Trustpilot Reviews</span>
              </div>
              <p className="text-xs font-semibold text-white">5 Stars: VoC Intelligence</p>
              <p className="text-[11px] text-slate-400 line-clamp-2">Transformed customer feedback analysis completely in 3 days...</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
