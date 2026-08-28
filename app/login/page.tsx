'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Sparkles, Shield, UserCheck, Eye, ArrowRight, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@zidio.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  const handleQuickRoleSelect = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden bg-[#090d16]">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Project LOOP AI Platform
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Customer Feedback <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Intelligence</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Multi-Tenant SaaS with AI Sentiment & VoC Intelligence
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-panel p-8 rounded-2xl shadow-2xl relative border border-slate-800">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 shrink-0 text-rose-400" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Work Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg glass-input text-sm transition"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg glass-input text-sm transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-medium text-sm text-white transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In to Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick RBAC Role Selector for Evaluators & Mentors */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <p className="text-xs font-semibold text-slate-400 mb-3 text-center uppercase tracking-wider">
              Quick Role Test Credentials (RBAC Demo)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickRoleSelect('admin@zidio.com')}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col items-center justify-center gap-1 ${
                  email === 'admin@zidio.com'
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400'
                }`}
              >
                <Shield className="w-4 h-4 text-indigo-400" />
                <span className="text-[11px] font-bold">ADMIN</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleSelect('analyst@zidio.com')}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col items-center justify-center gap-1 ${
                  email === 'analyst@zidio.com'
                    ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400'
                }`}
              >
                <UserCheck className="w-4 h-4 text-violet-400" />
                <span className="text-[11px] font-bold">ANALYST</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleSelect('viewer@zidio.com')}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col items-center justify-center gap-1 ${
                  email === 'viewer@zidio.com'
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400'
                }`}
              >
                <Eye className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-bold">VIEWER</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Standardized Stack: Next.js 14 • Supabase Postgres • Prisma • Anthropic Claude
        </p>
      </div>
    </div>
  );
}
