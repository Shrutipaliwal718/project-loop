"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import LoopIcon from "./LoopIcon";
import { getTheme, setTheme, toggleTheme } from "@/lib/theme";

type AppNavbarProps = {
  onMenuClick: () => void;
  sidebarOpen: boolean;
};

type CurrentUser = {
  id?: string;
  name: string;
  email: string;
  role: "ADMIN" | "ANALYST" | "VIEWER";
  workspaceId?: string;
  profileImage?: string | null;
};

const AppNavbar = ({ onMenuClick, sidebarOpen }: AppNavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<"account" | "appearance" | "notifications" | "workspace">("account");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState("");
  const [settingsError, setSettingsError] = useState("");
  const [alertSpike, setAlertSpike] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [copiedWorkspace, setCopiedWorkspace] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [lightMode, setLightMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLightMode(getTheme() === "light");

    try {
      const sp = localStorage.getItem("loop_pref_alert_spike");
      if (sp !== null) setAlertSpike(sp === "true");
      const wd = localStorage.getItem("loop_pref_weekly_digest");
      if (wd !== null) setWeeklyDigest(wd === "true");
      const se = localStorage.getItem("loop_pref_sound");
      if (se !== null) setSoundEnabled(se === "true");
    } catch {
      // ignore
    }

    const onThemeChange = () => {
      setLightMode(getTheme() === "light");
    };

    window.addEventListener("loop-theme-change", onThemeChange);
    return () => {
      window.removeEventListener("loop-theme-change", onThemeChange);
    };
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (data.success && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to load current user:", error);
      }
    };

    loadUser();
  }, []);

  const pageInfo = {
    "/dashboard": {
      label: "Overview",
      path: "overview",
    },
    "/inbox": {
      label: "Feedback",
      path: "feedback",
    },
    "/trends": {
      label: "Trends",
      path: "trends",
    },
    "/ask": {
      label: "Ask LOOP",
      path: "ask",
    },
    "/reports": {
      label: "Reports",
      path: "reports",
    },
    "/profile": {
      label: "Profile",
      path: "profile",
    },
  };

  const currentPage =
    pageInfo[pathname as keyof typeof pageInfo] ?? pageInfo["/dashboard"];

  const roleLabel =
    user?.role === "ADMIN"
      ? "Administrator"
      : user?.role === "ANALYST"
        ? "Analyst"
        : user?.role === "VIEWER"
          ? "Viewer"
          : "";

  const userInitial =
    user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setProfileOpen(false);
      router.replace("/login");
      router.refresh();
    }
  };

  const handleProfileClick = () => {
    setProfileOpen(false);
    router.push("/profile");
  };

  const handleSettingsClick = () => {
    setProfileOpen(false);
    if (user) {
      setEditName(user.name || "");
      setEditEmail(user.email || "");
    }
    setSettingsMsg("");
    setSettingsError("");
    setSettingsTab("account");
    setSettingsOpen(true);
  };

  const handleSaveProfileSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editName.trim()) {
      setSettingsError("Name is required.");
      return;
    }
    if (!editEmail.trim() || !editEmail.includes("@")) {
      setSettingsError("Valid email is required.");
      return;
    }
    setSavingSettings(true);
    setSettingsError("");
    setSettingsMsg("");
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: editName.trim(),
          email: editEmail.trim().toLowerCase(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        setUser((prev) => prev ? { ...prev, name: data.user.name, email: data.user.email } : data.user);
        setSettingsMsg("Profile updated successfully!");
        setTimeout(() => setSettingsMsg(""), 3000);
      } else {
        setSettingsError(data.message || "Failed to update profile.");
      }
    } catch {
      setSettingsError("Error updating profile.");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleToggleAlertSpike = () => {
    const val = !alertSpike;
    setAlertSpike(val);
    try { localStorage.setItem("loop_pref_alert_spike", String(val)); } catch {}
  };

  const handleToggleWeeklyDigest = () => {
    const val = !weeklyDigest;
    setWeeklyDigest(val);
    try { localStorage.setItem("loop_pref_weekly_digest", String(val)); } catch {}
  };

  const handleToggleSound = () => {
    const val = !soundEnabled;
    setSoundEnabled(val);
    try { localStorage.setItem("loop_pref_sound", String(val)); } catch {}
  };

  const handleCopyWorkspace = () => {
    if (user?.workspaceId) {
      navigator.clipboard.writeText(user.workspaceId);
      setCopiedWorkspace(true);
      setTimeout(() => setCopiedWorkspace(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#030912]/90 backdrop-blur-xl">
      <div className="flex h-[58px] items-center px-4 sm:px-6 lg:px-7">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={
            sidebarOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={sidebarOpen}
          className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] text-slate-400 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-300 lg:hidden"
        >
          {sidebarOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          )}
        </button>

        {/* Current workspace */}
        <div className="flex items-center">
          <div className="hidden text-xs sm:block">
            <p className="font-medium text-slate-500">Workspace</p>

            <p className="mt-0.5 text-[11px] text-slate-300">
              {currentPage.label}
            </p>
          </div>

          <div className="sm:hidden">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              LOOP
            </p>

            <p className="mt-0.5 text-[10px] text-cyan-400/80">
              {currentPage.label}
            </p>
          </div>
        </div>

        {/* Current location */}
        <div className="absolute left-1/2 hidden w-[280px] -translate-x-1/2 md:block lg:w-[360px]">
          <div className="flex h-9 items-center justify-center rounded-xl border border-white/[0.08] bg-[#091523]/80">
            <span className="text-[11px] font-medium text-slate-500">
              app.loop.ai
            </span>

            <span className="mx-1.5 text-slate-700">/</span>

            <span className="text-[11px] font-medium text-cyan-400/80">
              {currentPage.path}
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Live intelligence */}
          <div className="hidden items-center gap-2 text-[11px] font-medium text-slate-400 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(25,230,209,0.8)]" />
            Live intelligence
          </div>

          <div className="hidden h-6 w-px bg-white/[0.08] sm:block" />

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen((prev) => !prev);
                setHelpOpen(false);
                setProfileOpen(false);
              }}
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-300 hover:bg-white/[0.04] hover:text-cyan-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-[19px] w-[19px]"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                />

                <path strokeLinecap="round" d="M10 21h4" />
              </svg>

              {hasUnread && (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(25,230,209,0.8)]" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 overflow-hidden rounded-xl border border-white/[0.1] bg-[#091523] p-3 shadow-2xl shadow-black/60 z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-white">Notifications</p>
                    {hasUnread && (
                      <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 text-[10px] font-medium text-cyan-300">
                        3 new
                      </span>
                    )}
                  </div>
                  {hasUnread && (
                    <button
                      type="button"
                      onClick={() => setHasUnread(false)}
                      className="text-[10px] text-slate-400 hover:text-cyan-300 transition"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="mt-2 space-y-1.5 max-h-[320px] overflow-y-auto">
                  <Link
                    href="/inbox"
                    onClick={() => setNotificationsOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.04] transition group"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-400/20 text-red-400 text-xs font-bold">
                      !
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition">
                        Checkout issue detected
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-2">
                        Multiple customers reported payment failure on subscription renew.
                      </p>
                      <span className="mt-1 inline-block text-[9px] text-slate-500">10m ago</span>
                    </div>
                  </Link>

                  <Link
                    href="/trends"
                    onClick={() => setNotificationsOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.04] transition group"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-bold">
                      ✓
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition">
                        Sentiment milestone reached
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-2">
                        Customer satisfaction reached 85% positive this week.
                      </p>
                      <span className="mt-1 inline-block text-[9px] text-slate-500">1h ago</span>
                    </div>
                  </Link>

                  <Link
                    href="/reports"
                    onClick={() => setNotificationsOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.04] transition group"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold">
                      ✦
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition">
                        Voice-of-Customer report ready
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-2">
                        Weekly intelligence summary is ready for executive download.
                      </p>
                      <span className="mt-1 inline-block text-[9px] text-slate-500">3h ago</span>
                    </div>
                  </Link>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/[0.08] text-center">
                  <Link
                    href="/inbox"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[11px] font-medium text-cyan-400 hover:text-cyan-300 transition"
                  >
                    View all in Feedback Inbox →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Help */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setHelpOpen(true);
                setNotificationsOpen(false);
                setProfileOpen(false);
              }}
              aria-label="Help & Documentation"
              className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-300 hover:bg-white/[0.04] hover:text-cyan-300 sm:flex"
            >
              <span className="flex h-[19px] w-[19px] items-center justify-center rounded-full border border-current text-[10px] font-medium">
                ?
              </span>
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => toggleTheme()}
            aria-label={lightMode ? "Switch to dark mode" : "Switch to light mode"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-cyan-300/[0.06] hover:text-cyan-300"
          >
            <LoopIcon name={lightMode ? "sun" : "moon"} size={16} />
          </button>

          {/* Profile */}
          <div className="relative ml-1">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-gradient-to-br from-cyan-300 to-cyan-500 text-sm font-bold text-[#031018] shadow-[0_0_18px_rgba(25,230,209,0.18)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(25,230,209,0.3)]"
            >
              {userInitial}
            </button>

            {profileOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-xl border border-white/[0.09] bg-[#091523] p-2 shadow-2xl shadow-black/40"
              >
                <div className="border-b border-white/[0.07] px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-semibold text-cyan-300">
                      {userInitial}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {user?.name || "Loading..."}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {roleLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile */}
                <button
                  type="button"
                  onClick={handleProfileClick}
                  className="mt-1 w-full rounded-lg px-3 py-2.5 text-left text-xs text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                >
                  Profile
                </button>

                {/* Settings */}
                <button
                  type="button"
                  onClick={handleSettingsClick}
                  className="w-full rounded-lg px-3 py-2.5 text-left text-xs text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                >
                  Settings
                </button>

                <div className="my-1 border-t border-white/[0.07]" />

                {/* Logout */}
                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2.5 text-left text-xs text-red-400 transition hover:bg-red-400/[0.05]"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Help Modal using React Portal to escape header backdrop-blur containment */}
      {mounted && helpOpen && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm"
          onClick={() => setHelpOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#091523] p-5 sm:p-6 shadow-2xl text-left transition-all max-h-[85vh] my-auto flex flex-col loop-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] shrink-0 loop-modal-header">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 font-bold">
                  ?
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white loop-modal-title">LOOP Feedback Intelligence Help</h3>
                  <p className="text-[11px] text-slate-400 loop-modal-subtitle">Quick guide & documentation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                aria-label="Close help modal"
                className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 overflow-y-auto pr-1 flex-1">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 loop-modal-item">
                <p className="text-xs font-semibold text-cyan-300">📊 Overview & Metrics</p>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed loop-modal-desc">
                  Monitor feedback volume, real-time sentiment distribution (POS, NEU, NEG), top customer themes, and high-priority action signals all in one unified dashboard.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 loop-modal-item">
                <p className="text-xs font-semibold text-cyan-300">📥 Feedback Ingestion</p>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed loop-modal-desc">
                  Navigate to <strong className="text-slate-200">Feedback</strong> in the sidebar to capture customer voices via manual entry, bulk CSV import, or simulated support channels.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 loop-modal-item">
                <p className="text-xs font-semibold text-cyan-300">🧠 AI Sentiment & Themes</p>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed loop-modal-desc">
                  Each piece of feedback is automatically classified with a sentiment score and categorized into business themes like Checkout, Performance, Support, and UI.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 loop-modal-item">
                <p className="text-xs font-semibold text-cyan-300">📄 Executive Reports</p>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed loop-modal-desc">
                  Export complete Voice-of-Customer intelligence summaries to share actionable insights with leadership and product stakeholders.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between shrink-0 loop-modal-footer">
              <span className="text-[11px] text-slate-400">Need direct support? support@loop.ai</span>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="rounded-lg bg-cyan-400/15 border border-cyan-400/30 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-400/25 transition"
              >
                Got it
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Settings Modal using React Portal */}
      {mounted && settingsOpen && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm"
          onClick={() => setSettingsOpen(false)}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl border border-white/15 bg-[#091523] p-5 sm:p-6 shadow-2xl text-left transition-all max-h-[90vh] my-auto flex flex-col loop-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] shrink-0 loop-modal-header">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 font-bold">
                  ⚙
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white loop-modal-title">Settings & Preferences</h3>
                  <p className="text-[11px] text-slate-400 loop-modal-subtitle">Manage your profile, theme, and workspace alerts</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                aria-label="Close settings modal"
                className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
              >
                ✕
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-4 flex gap-1 rounded-xl border border-white/[0.07] bg-white/[0.02] p-1 shrink-0">
              <button
                type="button"
                onClick={() => setSettingsTab("account")}
                className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition ${
                  settingsTab === "account"
                    ? "bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                👤 Profile
              </button>
              <button
                type="button"
                onClick={() => setSettingsTab("appearance")}
                className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition ${
                  settingsTab === "appearance"
                    ? "bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                🎨 Theme
              </button>
              <button
                type="button"
                onClick={() => setSettingsTab("notifications")}
                className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition ${
                  settingsTab === "notifications"
                    ? "bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                🔔 Alerts
              </button>
              <button
                type="button"
                onClick={() => setSettingsTab("workspace")}
                className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition ${
                  settingsTab === "workspace"
                    ? "bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                🏢 Workspace
              </button>
            </div>

            {/* Tab Contents */}
            <div className="mt-4 overflow-y-auto pr-1 flex-1 min-h-[260px]">
              {/* Account Tab */}
              {settingsTab === "account" && (
                <form onSubmit={handleSaveProfileSettings} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/40 focus:outline-none focus:ring-1 focus:ring-cyan-400/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/40 focus:outline-none focus:ring-1 focus:ring-cyan-400/30"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    <div>
                      <p className="text-xs font-medium text-slate-300">Account Role</p>
                      <p className="text-[11px] text-slate-500">Determined by workspace administrator</p>
                    </div>
                    <span className="rounded-md border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                      {roleLabel || "Member"}
                    </span>
                  </div>

                  {settingsError && (
                    <div className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                      {settingsError}
                    </div>
                  )}

                  {settingsMsg && (
                    <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
                      ✓ {settingsMsg}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setSettingsOpen(false);
                        router.push("/profile");
                      }}
                      className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline transition"
                    >
                      Open full profile page →
                    </button>

                    <button
                      type="submit"
                      disabled={savingSettings}
                      className="rounded-lg bg-cyan-400/15 border border-cyan-400/30 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-400/25 transition disabled:opacity-50"
                    >
                      {savingSettings ? "Saving..." : "Save Profile"}
                    </button>
                  </div>
                </form>
              )}

              {/* Appearance Tab */}
              {settingsTab === "appearance" && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">Select your preferred display theme for the LOOP intelligence console:</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Dark Mode Card */}
                    <div
                      onClick={() => {
                        setTheme("dark");
                        setLightMode(false);
                      }}
                      className={`cursor-pointer rounded-xl border p-4 transition-all ${
                        !lightMode
                          ? "border-cyan-400 bg-cyan-400/[0.08] shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                          : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">🌙 Dark Mode</span>
                        {!lightMode && (
                          <span className="h-4 w-4 rounded-full bg-cyan-400 text-[#031018] flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="mt-3 h-14 rounded-lg bg-[#050e18] border border-white/10 p-2 flex flex-col justify-between">
                        <div className="flex gap-1.5">
                          <div className="h-2 w-8 rounded bg-cyan-400/60" />
                          <div className="h-2 w-12 rounded bg-violet-400/40" />
                        </div>
                        <div className="h-2 w-full rounded bg-white/10" />
                      </div>
                      <p className="mt-2 text-[11px] text-cyan-300 font-medium">Default • Cyberpunk Neon</p>
                    </div>

                    {/* Light Mode Card */}
                    <div
                      onClick={() => {
                        setTheme("light");
                        setLightMode(true);
                      }}
                      className={`cursor-pointer rounded-xl border p-4 transition-all ${
                        lightMode
                          ? "border-cyan-400 bg-cyan-400/[0.08] shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                          : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">☀️ Light Mode</span>
                        {lightMode && (
                          <span className="h-4 w-4 rounded-full bg-cyan-400 text-[#031018] flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="mt-3 h-14 rounded-lg bg-[#f8fafc] border border-slate-300 p-2 flex flex-col justify-between">
                        <div className="flex gap-1.5">
                          <div className="h-2 w-8 rounded bg-cyan-600" />
                          <div className="h-2 w-12 rounded bg-slate-400" />
                        </div>
                        <div className="h-2 w-full rounded bg-slate-300" />
                      </div>
                      <p className="mt-2 text-[11px] text-slate-400 font-medium">Clean • Modern White</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-[11px] text-slate-400">
                    💡 Theme changes apply immediately across all tabs and screens.
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {settingsTab === "notifications" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 loop-modal-item">
                    <div className="pr-4">
                      <p className="text-xs font-semibold text-white">Critical Sentiment Alert</p>
                      <p className="mt-0.5 text-[11px] text-slate-400 leading-relaxed loop-modal-desc">
                        Highlight anomalies when negative customer sentiment crosses 20%.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleAlertSpike}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        alertSpike ? "bg-cyan-400" : "bg-slate-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          alertSpike ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 loop-modal-item">
                    <div className="pr-4">
                      <p className="text-xs font-semibold text-white">Weekly Executive Digest</p>
                      <p className="mt-0.5 text-[11px] text-slate-400 leading-relaxed loop-modal-desc">
                        Consolidated summary of voice-of-customer trends delivered every Monday.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleWeeklyDigest}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        weeklyDigest ? "bg-cyan-400" : "bg-slate-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          weeklyDigest ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 loop-modal-item">
                    <div className="pr-4">
                      <p className="text-xs font-semibold text-white">Live Feedback Indicator</p>
                      <p className="mt-0.5 text-[11px] text-slate-400 leading-relaxed loop-modal-desc">
                        Pulse badge and sound notification when fresh customer feedback arrives.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleSound}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        soundEnabled ? "bg-cyan-400" : "bg-slate-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          soundEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 pt-1">Preferences are automatically saved to your browser session.</p>
                </div>
              )}

              {/* Workspace Tab */}
              {settingsTab === "workspace" && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 loop-modal-item">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-white">Workspace Identifier</p>
                      <button
                        type="button"
                        onClick={handleCopyWorkspace}
                        className="text-[11px] font-medium text-cyan-300 hover:text-cyan-200 flex items-center gap-1 transition"
                      >
                        {copiedWorkspace ? "✓ Copied!" : "📋 Copy ID"}
                      </button>
                    </div>
                    <p className="mt-1 font-mono text-xs text-slate-300 bg-black/30 rounded px-2.5 py-1.5 select-all border border-white/[0.06] truncate">
                      {user?.workspaceId || "ws_default_project_loop"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 loop-modal-item">
                    <div>
                      <p className="text-xs font-semibold text-white">Session Security</p>
                      <p className="mt-0.5 text-[11px] text-slate-400 loop-modal-desc">Active token with HTTP-only cookie</p>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Secured
                    </span>
                  </div>

                  {user?.role === "ADMIN" && (
                    <button
                      type="button"
                      onClick={() => {
                        setSettingsOpen(false);
                        router.push("/admin/members");
                      }}
                      className="w-full flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] p-3.5 text-left transition hover:bg-cyan-400/[0.1] hover:border-cyan-400/40"
                    >
                      <div>
                        <p className="text-xs font-semibold text-cyan-300">👥 Team & Member Management</p>
                        <p className="mt-0.5 text-[11px] text-slate-400">Invite colleagues, update roles, and manage permissions</p>
                      </div>
                      <span className="text-xs text-cyan-300 font-bold">→</span>
                    </button>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-lg border border-red-500/25 bg-red-500/10 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition"
                    >
                      Log out of LOOP
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between shrink-0 loop-modal-footer">
              <span className="text-[11px] text-slate-500">LOOP Intelligence Console v2.4</span>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="rounded-lg bg-white/[0.05] border border-white/10 px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.1] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};

export default AppNavbar;
