"use client";

import Link from "next/link";

const AdminWorkspace = () => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 shadow-[0_0_40px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-cyan-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                />
                <circle cx="9" cy="7" r="4" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Workspace Management
              </p>
              <p className="text-xs text-slate-500">
                Manage members, roles and workspace access
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/admin/members"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-medium text-cyan-200 transition-all duration-200 hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:text-cyan-100"
        >
          Manage Members
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/8 bg-black/10 px-4 py-3">
          <p className="text-xs text-slate-500">Members</p>
          <p className="mt-1 text-xl font-semibold text-white">24</p>
        </div>

        <div className="rounded-xl border border-white/8 bg-black/10 px-4 py-3">
          <p className="text-xs text-slate-500">Analysts</p>
          <p className="mt-1 text-xl font-semibold text-white">8</p>
        </div>

        <div className="rounded-xl border border-white/8 bg-black/10 px-4 py-3">
          <p className="text-xs text-slate-500">Viewers</p>
          <p className="mt-1 text-xl font-semibold text-white">13</p>
        </div>
      </div>
    </section>
  );
};

export default AdminWorkspace;


