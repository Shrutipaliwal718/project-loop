'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Shield, 
  Eye, 
  Trash2, 
  AlertOctagon, 
  CheckCircle2, 
  Mail, 
  User, 
  Lock 
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'ANALYST' | 'VIEWER';
  createdAt: string;
}

export default function WorkspaceMembersPage() {
  const { data: session } = useSession();
  const currentUser = session?.user as any;
  const isAdmin = currentUser?.role === 'ADMIN';

  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'ADMIN' | 'ANALYST' | 'VIEWER'>('ANALYST');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch team members
  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/workspace/members');
      const data = await res.json();
      if (data.members) {
        setMembers(data.members);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Invite new member handler
  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/workspace/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inviteName,
          email: inviteEmail,
          role: inviteRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to invite member');

      setSuccessMsg(`Successfully added ${data.member.name} (${data.member.role}) to workspace!`);
      setInviteName('');
      setInviteEmail('');
      fetchMembers();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setInviteLoading(false);
    }
  };

  // Change role handler
  const handleRoleChange = async (memberId: string, newRole: string) => {
    setErrorMsg('');
    try {
      const res = await fetch(`/api/workspace/members/${memberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update role');

      setMembers((prev) =>
        prev.map((m) => (m.id === memberId ? { ...m, role: newRole as any } : m))
      );
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  // Delete member handler
  const handleDeleteMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member from the workspace?')) return;
    setErrorMsg('');
    try {
      const res = await fetch(`/api/workspace/members/${memberId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to remove member');

      setMembers((prev) => prev.filter((m) => m.id !== memberId));
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" /> Workspace RBAC Controls
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Team Members & Permissions</h1>
        <p className="text-slate-400 text-xs mt-1">
          Manage workspace team members, assign RBAC roles (ADMIN, ANALYST, VIEWER), and control access rights
        </p>
      </div>

      {/* NON-ADMIN 403 WARNING BANNER */}
      {!isAdmin && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
          <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <strong className="font-bold">403 Restricted Access Mode:</strong> You are logged in as{' '}
            <span className="uppercase font-mono bg-amber-500/20 px-1 rounded">{currentUser?.role}</span>. Member invitation & role modification are strictly reserved for <strong className="text-white">ADMIN</strong> users.
          </div>
        </div>
      )}

      {/* Success / Error Alerts */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* INVITE MEMBER FORM (ADMIN ONLY) */}
      {isAdmin && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <UserPlus className="w-4 h-4 text-indigo-400" /> Invite New Team Member
          </div>

          <form onSubmit={handleInviteMember} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                required
                placeholder="e.g. Alex Rivera"
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
                placeholder="alex@company.com"
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Assign RBAC Role</label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-slate-900"
              >
                <option value="ADMIN">ADMIN (Full Super Control)</option>
                <option value="ANALYST">ANALYST (Ingest & AI Operations)</option>
                <option value="VIEWER">VIEWER (Read-Only Access)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={inviteLoading}
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white transition flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/25 disabled:opacity-50"
              >
                {inviteLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" /> Invite Teammate
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MEMBERS LIST TABLE */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" /> Active Workspace Members ({members.length})
          </h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500 text-xs">Loading workspace members...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Member</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4">Joined Date</th>
                  {isAdmin && <th className="p-4 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950/30">
                {members.map((mem) => (
                  <tr key={mem.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-4 font-bold text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400">
                        {mem.name[0]}
                      </div>
                      <div>
                        <p>{mem.name}</p>
                        {mem.id === currentUser?.id && (
                          <span className="text-[9px] text-indigo-400 font-mono">(You)</span>
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-slate-400">{mem.email}</td>

                    <td className="p-4">
                      {isAdmin && mem.id !== currentUser?.id ? (
                        <select
                          value={mem.role}
                          onChange={(e) => handleRoleChange(mem.id, e.target.value)}
                          className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-semibold text-indigo-300"
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="ANALYST">ANALYST</option>
                          <option value="VIEWER">VIEWER</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            mem.role === 'ADMIN'
                              ? 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-400'
                              : mem.role === 'ANALYST'
                              ? 'bg-violet-500/10 border border-violet-500/30 text-violet-400'
                              : 'bg-slate-800 border border-slate-700 text-slate-400'
                          }`}
                        >
                          {mem.role}
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-slate-500 font-mono text-[11px]">
                      {new Date(mem.createdAt).toLocaleDateString()}
                    </td>

                    {isAdmin && (
                      <td className="p-4 text-right">
                        {mem.id !== currentUser?.id && (
                          <button
                            onClick={() => handleDeleteMember(mem.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                            title="Remove Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ROLE PERMISSIONS SUMMARY MATRIX */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-400" /> RBAC Permissions Matrix Reference
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="p-3">Feature / Action</th>
                <th className="p-3 text-center">ADMIN</th>
                <th className="p-3 text-center">ANALYST</th>
                <th className="p-3 text-center">VIEWER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/40">
              <tr>
                <td className="p-3 font-semibold text-white">Manage Members & Assign Roles</td>
                <td className="p-3 text-center text-emerald-400 font-bold">✅ Full Control</td>
                <td className="p-3 text-center text-rose-400 font-semibold">❌ Blocked (403)</td>
                <td className="p-3 text-center text-rose-400 font-semibold">❌ Blocked (403)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Upload CSV & Ingest Data</td>
                <td className="p-3 text-center text-emerald-400 font-bold">✅ Allowed</td>
                <td className="p-3 text-center text-emerald-400 font-bold">✅ Allowed</td>
                <td className="p-3 text-center text-rose-400 font-semibold">❌ Blocked (403)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Change Feedback Status (Reviewed/Actioned)</td>
                <td className="p-3 text-center text-emerald-400 font-bold">✅ Allowed</td>
                <td className="p-3 text-center text-emerald-400 font-bold">✅ Allowed</td>
                <td className="p-3 text-center text-amber-400 font-semibold">❌ Read-Only</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Ask LOOP Q&A & VoC Reports</td>
                <td className="p-3 text-center text-emerald-400 font-bold">✅ Allowed</td>
                <td className="p-3 text-center text-emerald-400 font-bold">✅ Allowed</td>
                <td className="p-3 text-center text-sky-400 font-semibold">✅ Read / View Only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
