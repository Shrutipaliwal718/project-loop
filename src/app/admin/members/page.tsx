"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Role = "ADMIN" | "ANALYST" | "VIEWER";

type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  profileImage: string | null;
};

type Counts = {
  total: number;
  admins: number;
  analysts: number;
  viewers: number;
};

type Invite = {
  id: string;
  code: string;
  memberName: string | null;
  memberEmail: string | null;
  role: Role;
  createdAt: string;
};

const AdminMembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const [counts, setCounts] = useState<Counts>({
    total: 0,
    admins: 0,
    analysts: 0,
    viewers: 0,
  });

  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"ANALYST" | "VIEWER">(
    "ANALYST",
  );

  const [generatedInvite, setGeneratedInvite] = useState<Invite | null>(null);

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [updatingMember, setUpdatingMember] = useState<string | null>(null);
  const [removingMember, setRemovingMember] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadMembers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/workspace/members", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Unable to load members.");
      }

      setMembers(data.members ?? []);

      setCounts(
        data.counts ?? {
          total: 0,
          admins: 0,
          analysts: 0,
          viewers: 0,
        },
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load workspace members.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const generateInvite = async () => {
    const name = inviteName.trim();
    const email = inviteEmail.trim().toLowerCase();

    if (!name) {
      setError("Member name is required.");
      return;
    }

    if (!email) {
      setError("Member email is required.");
      return;
    }

    try {
      setGenerating(true);
      setError("");
      setSuccess("");
      setGeneratedInvite(null);
      setCopied(false);

      const response = await fetch("/api/workspace/invites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          memberName: name,
          memberEmail: email,
          role: inviteRole,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Unable to generate invite.");
      }

      setGeneratedInvite(data.invite);

      setSuccess(
        `${inviteRole === "ANALYST" ? "Analyst" : "Viewer"} invite generated successfully.`,
      );

      setInviteName("");
      setInviteEmail("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate invite.",
      );
    } finally {
      setGenerating(false);
    }
  };

  const copyInvite = async () => {
    if (!generatedInvite) return;

    try {
      await navigator.clipboard.writeText(generatedInvite.code);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setError("Unable to copy the invite code.");
    }
  };

  const changeRole = async (
    member: Member,
    newRole: "ANALYST" | "VIEWER",
  ) => {
    if (member.role === newRole) return;

    try {
      setUpdatingMember(member.id);
      setError("");
      setSuccess("");

      const response = await fetch("/api/workspace/members", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          memberId: member.id,
          role: newRole,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Unable to change member role.");
      }

      setSuccess(`${member.name}'s role was updated successfully.`);

      await loadMembers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to change member role.",
      );
    } finally {
      setUpdatingMember(null);
    }
  };

  const removeMember = async (member: Member) => {
    const confirmed = window.confirm(
      `Remove ${member.name} from this workspace?\n\nThis will remove their account access. Workspace business data will not be intentionally deleted.`,
    );

    if (!confirmed) return;

    try {
      setRemovingMember(member.id);
      setError("");
      setSuccess("");

      const response = await fetch("/api/workspace/members", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          memberId: member.id,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Unable to remove member.");
      }

      setSuccess(data.message ?? "Member removed successfully.");

      await loadMembers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to remove member.",
      );
    } finally {
      setRemovingMember(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#030912] px-4 py-6 text-white sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="mb-3 inline-flex items-center gap-2 text-xs text-slate-500 transition hover:text-cyan-300"
            >
              <span aria-hidden="true">←</span>
              Back to Dashboard
            </Link>

            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Manage Members
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage workspace members and generate secure role-based invites.
            </p>
          </div>
        </div>

        {error ? (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mb-5 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] px-4 py-3 text-sm text-cyan-200">
            {success}
          </div>
        ) : null}

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <p className="text-xs text-slate-500">Total Members</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {counts.total}
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.025] p-5">
            <p className="text-xs text-slate-500">Admins</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {counts.admins}
            </p>
          </div>

          <div className="rounded-2xl border border-violet-400/10 bg-violet-400/[0.025] p-5">
            <p className="text-xs text-slate-500">Analysts</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {counts.analysts}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-400/10 bg-amber-400/[0.025] p-5">
            <p className="text-xs text-slate-500">Viewers</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {counts.viewers}
            </p>
          </div>
        </div>

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5 shadow-[0_0_40px_rgba(0,0,0,0.18)]">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-white">
              Invite a Member
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              The invite binds the member name, email and role to this
              workspace.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_1fr_180px_auto] lg:items-end">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Member Name
              </label>

              <input
                type="text"
                value={inviteName}
                onChange={(event) => setInviteName(event.target.value)}
                placeholder="e.g. Shruti Sharma"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#07121e] px-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Member Email
              </label>

              <input
                type="email"
                value={inviteEmail}
                onChange={(event) => setInviteEmail(event.target.value)}
                placeholder="member@example.com"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#07121e] px-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Role
              </label>

              <select
                value={inviteRole}
                onChange={(event) =>
                  setInviteRole(
                    event.target.value as "ANALYST" | "VIEWER",
                  )
                }
                className="h-11 w-full rounded-xl border border-white/10 bg-[#07121e] px-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
              >
                <option value="ANALYST">Analyst</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </div>

            <button
              type="button"
              onClick={generateInvite}
              disabled={generating}
              className="h-11 rounded-xl border border-cyan-400/25 bg-cyan-400/10 px-5 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {generating ? "Generating..." : "Generate Invite"}
            </button>
          </div>

          {generatedInvite ? (
            <div className="mt-5 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.035] p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs text-slate-500">Generated Invite</p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-600">
                        Name
                      </span>
                      <p className="text-sm font-medium text-slate-200">
                        {generatedInvite.memberName ?? "—"}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-600">
                        Email
                      </span>
                      <p className="text-sm text-slate-300">
                        {generatedInvite.memberEmail ?? "—"}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-600">
                        Role
                      </span>
                      <p className="text-sm text-cyan-200">
                        {generatedInvite.role}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 font-mono text-lg font-semibold tracking-[0.12em] text-cyan-200">
                    {generatedInvite.code}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={copyInvite}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-cyan-400/20 hover:text-cyan-200"
                >
                  {copied ? "Copied!" : "Copy Code"}
                </button>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-slate-500">
                The invited person must use the bound email address when
                joining this workspace. Their role comes from this invite.
              </p>
            </div>
          ) : null}
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-base font-semibold text-white">
              Workspace Members
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Members belonging to your current workspace.
            </p>
          </div>

          {loading ? (
            <div className="px-5 py-12 text-center text-sm text-slate-500">
              Loading members...
            </div>
          ) : members.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-slate-500">
              No workspace members found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-white/8 text-left">
                    <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-600">
                      Member
                    </th>

                    <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-600">
                      Email
                    </th>

                    <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-600">
                      Role
                    </th>

                    <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {members.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-white/6 last:border-0 transition hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xs font-semibold text-cyan-200">
                            {member.name
                              .split(" ")
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </div>

                          <span className="text-sm font-medium text-slate-200">
                            {member.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {member.email}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                            member.role === "ADMIN"
                              ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
                              : member.role === "ANALYST"
                                ? "border-violet-400/20 bg-violet-400/10 text-violet-200"
                                : "border-amber-400/20 bg-amber-400/10 text-amber-200"
                          }`}
                        >
                          {member.role}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {member.role === "ADMIN" ? (
                          <span className="text-[11px] text-slate-600">
                            Workspace admin
                          </span>
                        ) : (
                          <div className="flex flex-wrap items-center gap-2">
                            <select
                              value={member.role}
                              disabled={updatingMember === member.id}
                              onChange={(event) =>
                                changeRole(
                                  member,
                                  event.target.value as
                                    | "ANALYST"
                                    | "VIEWER",
                                )
                              }
                              className="h-8 rounded-lg border border-white/10 bg-[#07121e] px-2 text-[11px] text-slate-300 outline-none transition hover:border-violet-400/30 focus:border-violet-400/40 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="ANALYST">Analyst</option>
                              <option value="VIEWER">Viewer</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => removeMember(member)}
                              disabled={removingMember === member.id}
                              className="h-8 rounded-lg border border-red-400/15 bg-red-400/[0.04] px-3 text-[11px] font-medium text-red-300 transition hover:border-red-400/30 hover:bg-red-400/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {removingMember === member.id
                                ? "Removing..."
                                : "Remove"}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminMembersPage;