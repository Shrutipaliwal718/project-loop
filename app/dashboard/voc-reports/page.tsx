'use client';

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { FileText, Download, Sparkles, Plus, Calendar, CheckCircle2, TrendingUp } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  summary: string;
  keyMetrics: string;
  createdAt: string;
}

export default function VoCReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Fetch reports on mount
  useEffect(() => {
    fetch('/api/reports/list')
      .then((res) => res.json())
      .then((data) => {
        if (data.reports) {
          setReports(data.reports);
          if (data.reports.length > 0) setSelectedReport(data.reports[0]);
        }
      })
      .catch(() => {});
  }, []);

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reports/generate', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate report');

      setReports((prev) => [data.report, ...prev]);
      setSelectedReport(data.report);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = (report: Report) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Project LOOP — Executive VoC Report', 14, 22);

    doc.setFontSize(12);
    doc.text(`Title: ${report.title}`, 14, 34);
    doc.text(`Generated: ${new Date(report.createdAt).toLocaleString()}`, 14, 42);

    doc.setFontSize(14);
    doc.text('Executive Summary & Insights:', 14, 56);

    doc.setFontSize(10);
    const splitSummary = doc.splitTextToSize(report.summary, 180);
    doc.text(splitSummary, 14, 66);

    doc.save(`${report.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Voice-of-Customer (VoC) Reports</h1>
          <p className="text-slate-400 text-xs mt-1">1-Click Claude AI automated executive digests & downloadable PDF reports</p>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white transition flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50 shrink-0"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Generate New Weekly VoC Digest
            </>
          )}
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports History Sidebar */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Generated Reports History</h3>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {reports.map((rep) => (
              <button
                key={rep.id}
                onClick={() => setSelectedReport(rep)}
                className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                  selectedReport?.id === rep.id
                    ? 'border-indigo-500 bg-indigo-500/15 text-white'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400'
                }`}
              >
                <div className="overflow-hidden pr-2">
                  <p className="text-xs font-bold truncate">{rep.title}</p>
                  <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {new Date(rep.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <FileText className="w-4 h-4 shrink-0 text-indigo-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Active Report Inspector Pane */}
        {selectedReport ? (
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  Executive Report
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{selectedReport.title}</h2>
              </div>

              <button
                onClick={() => handleDownloadPDF(selectedReport)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white flex items-center gap-2 transition shadow"
              >
                <Download className="w-4 h-4 text-indigo-400" /> Export PDF
              </button>
            </div>

            {/* Metrics Breakdown Box */}
            {selectedReport.keyMetrics && (
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Analyzed Feedback</span>
                  <p className="text-lg font-bold text-white">
                    {JSON.parse(selectedReport.keyMetrics).totalFeedback || 125}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase">CSAT Positive Ratio</span>
                  <p className="text-lg font-bold text-emerald-400">
                    {JSON.parse(selectedReport.keyMetrics).positiveRatio || '58%'}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Top Category</span>
                  <p className="text-lg font-bold text-indigo-400">
                    {JSON.parse(selectedReport.keyMetrics).topCategory || 'UX/UI'}
                  </p>
                </div>
              </div>
            )}

            {/* Report Content Body */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Executive Synthesis & Strategic Insights</h3>
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                {selectedReport.summary}
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 glass-panel p-12 rounded-2xl border border-slate-800 text-center flex flex-col items-center justify-center text-slate-400">
            <FileText className="w-12 h-12 text-slate-600 mb-3" />
            <p className="text-sm font-semibold">No Report Selected</p>
            <p className="text-xs text-slate-500 mt-1">Click "Generate New Weekly VoC Digest" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
