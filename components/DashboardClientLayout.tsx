'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  BarChart3, 
  Inbox, 
  PlusCircle, 
  Sparkles, 
  FileText, 
  LogOut, 
  Building2, 
  ShieldCheck, 
  Users, 
  Plus, 
  X, 
  Check 
} from 'lucide-react';

export default function DashboardClientLayout({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [currentCompany, setCurrentCompany] = useState(user.workspaceName || 'Zidio Development');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Persist Active Workspace in localStorage across page refreshes
  useEffect(() => {
    const saved = localStorage.getItem('active_workspace_name');
    if (saved) {
      setCurrentCompany(saved);
    }
  }, []);

  const navItems = [
    { name: 'Analytics Overview', href: '/dashboard', icon: BarChart3 },
    { name: 'Feedback Inbox', href: '/dashboard/inbox', icon: Inbox },
    { name: 'Feedback Ingestion', href: '/dashboard/ingest', icon: PlusCircle },
    { name: 'Ask LOOP (AI Q&A)', href: '/dashboard/ask-loop', icon: Sparkles },
    { name: 'VoC Reports', href: '/dashboard/voc-reports', icon: FileText },
    { name: 'Team & Permissions', href: '/dashboard/settings/members', icon: Users, badge: 'ADMIN' },
  ];

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName) return;
    setLoading(true);

    try {
      // 1. Create Workspace in DB
      const res = await fetch('/api/workspace/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: companyName }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create workspace');

      const newName = data.workspace.name;
      setCurrentCompany(newName);
      localStorage.setItem('active_workspace_name', newName);

      // 2. Automatically populate real customer feedback reviews for this new company workspace
      await fetch('/api/workspace/ingest-real', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName: newName }),
      });

      setSuccessMsg(`Created workspace "${newName}" & fetched real customer reviews!`);
      setCompanyName('');
      setTimeout(() => {
        setShowAddCompanyModal(false);
        setSuccessMsg('');
        router.refresh();
      }, 1500);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#030712] text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 glass-panel border-r border-slate-800/80 flex flex-col justify-between p-4 shrink-0 hidden md:flex">
        <div className="space-y-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 px-2 pt-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-500/30">
              L
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-white">Project LOOP</h2>
              <p className="text-[10px] text-indigo-400 font-medium tracking-wider uppercase">Feedback Intelligence</p>
            </div>
          </div>

          {/* Current Workspace Tenant Box */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Tenant Workspace</span>
              <button
                onClick={() => setShowAddCompanyModal(true)}
                className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" /> Add Company
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-xs font-bold text-white truncate">{currentCompany}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    {item.name}
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-extrabold text-indigo-300 bg-indigo-500/20 px-1.5 py-0.2 rounded border border-indigo-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Account & Sign Out */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-300 shrink-0">
                {user.name?.[0] || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded inline-block">
                  {user.role}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem('active_workspace_name');
                signOut({ callbackUrl: '/login' });
              }}
              className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 glass-panel border-b border-slate-800/80 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-400">
              Workspace Isolation Active • Tenant: <strong className="text-indigo-300 font-semibold">{currentCompany}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddCompanyModal(true)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Company Workspace
            </button>

            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> RBAC Role: <span className="text-indigo-400 uppercase">{user.role}</span>
            </span>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {/* CREATE NEW COMPANY WORKSPACE MODAL */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-slate-800 space-y-4 relative">
            <button
              onClick={() => setShowAddCompanyModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Add New Company Workspace</h3>
              <p className="text-xs text-slate-400 mt-0.5">Register a new enterprise tenant for isolated feedback intelligence</p>
            </div>

            {successMsg ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleCreateCompany} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    placeholder="e.g. Flipkart, Uber, Swiggy, Amazon..."
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Create & Fetch Real Company Reviews</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
