"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type AppNavbarProps = {
  onMenuClick: () => void;
  sidebarOpen: boolean;
};

type CurrentUser = {
  name: string;
  email: string;
  role: "ADMIN" | "ANALYST" | "VIEWER";
};

const AppNavbar = ({ onMenuClick, sidebarOpen }: AppNavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [hasNewFeedback, setHasNewFeedback] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);

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

  useEffect(() => {
    let active = true;

    const checkFeedback = async () => {
      try {
        const response = await fetch("/api/feedback", {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok || !active) return;

        const data = await response.json();
        const feedbackList = data?.feedbacks;

        if (!Array.isArray(feedbackList) || feedbackList.length === 0) return;

        const latestId = feedbackList[0]?.id;
        if (!latestId) return;

        const storedId = localStorage.getItem("loop_last_feedback_id");

        if (!storedId) {
          localStorage.setItem("loop_last_feedback_id", String(latestId));
          return;
        }

        if (storedId !== String(latestId)) {
          localStorage.setItem("loop_last_feedback_id", String(latestId));
          setNotificationCount((count) => count + 1);
          setHasNewFeedback(true);
        }
      } catch {
        // Keep the existing navbar working if notification polling fails.
      }
    };

    checkFeedback();

    const interval = setInterval(checkFeedback, 10000);

    return () => {
      active = false;
      clearInterval(interval);
    };
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
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => {
              setNotificationsOpen((open) => !open);
              setNotificationCount(0);
            }}
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

            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex min-h-[17px] min-w-[17px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white shadow-[0_0_10px_rgba(239,68,68,0.7)]">
                {notificationCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-white/[0.08] bg-[#07111d] shadow-2xl shadow-black/40">
              <div className="border-b border-white/[0.06] px-4 py-3">
                <p className="text-sm font-semibold text-white">Notifications</p>
                <p className="mt-0.5 text-[11px] text-slate-500">Recent workspace activity</p>
              </div>
              <div className="px-4 py-6">
                {hasNewFeedback ? (
                  <div>
                    <p className="text-sm font-medium text-white">New feedback received</p>
                    <p className="mt-1 text-xs text-slate-400">A new feedback entry was added to your workspace.</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-slate-300">No new notifications</p>
                    <p className="mt-1 text-xs text-slate-500">You&apos;re all caught up.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Help */}
          <button
            type="button"
            aria-label="Help"
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-300 hover:bg-white/[0.04] hover:text-cyan-300 sm:flex"
          >
            <span className="flex h-[19px] w-[19px] items-center justify-center rounded-full border border-current text-[10px] font-medium">
              ?
            </span>
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

                {/* Settings - will be connected next */}
                <button
                  type="button"
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
    </header>
  );
};

export default AppNavbar;









