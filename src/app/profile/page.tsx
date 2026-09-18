"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/Common/AppLayout";

type UserRole = "ADMIN" | "ANALYST" | "VIEWER";

type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  workspaceId: string;
  profileImage?: string | null;
};

const ProfilePage = () => {
  const router = useRouter();

  const [user, setUser] = useState<CurrentUser | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [saveMessage, setSaveMessage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok || !data.success || !data.user) {
          setError(data.message || "Unable to load profile.");
          return;
        }

        setUser(data.user);
        setProfileImage(data.user.profileImage || "");
      } catch (err) {
        console.error("Profile loading error:", err);
        setError("Something went wrong while loading your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    return parts[0]?.charAt(0).toUpperCase() || "U";
  };

  const formatRole = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "Administrator";
      case "ANALYST":
        return "Analyst";
      case "VIEWER":
        return "Viewer";
      default:
        return role;
    }
  };

  const openEditProfile = () => {
    if (!user) return;

    setName(user.name);
    setEmail(user.email);
    setError("");
    setSaveMessage("");
    setEditOpen(true);
  };

  const closeEditProfile = () => {
    if (saving) return;

    setEditOpen(false);
    setError("");
    setSaveMessage("");
  };

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setSaveMessage("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setSaveMessage("Profile image must be smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        console.log("PROFILE IMAGE LOADED:", reader.result.substring(0, 50));
        setProfileImage(reader.result);
        setSaveMessage("");
      }
    };

    reader.onerror = () => {
      setSaveMessage("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  };
  const handleSaveProfile = async () => {
    if (!user) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setError("Name is required.");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (!trimmedEmail) {
      setError("Email address is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSaving(true);
    setError("");
    setSaveMessage("");

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          ...(profileImage ? { profileImage } : {}),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.user) {
        setError(data.message || "Unable to update profile.");
        return;
      }

      setUser(data.user);

      setName(data.user.name);
      setEmail(data.user.email);

      setSaveMessage("Profile updated successfully.");

      setTimeout(() => {
        setEditOpen(false);
        setSaveMessage("");
      }, 900);
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Something went wrong while updating your profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-[#030912] px-4 py-8 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-[260px] -top-[220px] h-[600px] w-[600px] rounded-full border border-cyan-400/[0.08] bg-cyan-400/[0.018]" />

          <div className="absolute -right-[250px] top-[80px] h-[560px] w-[560px] rounded-full border border-cyan-400/[0.08] bg-cyan-400/[0.018]" />

          <div className="absolute bottom-[-260px] left-[3%] h-[420px] w-[650px] rotate-[-14deg] rounded-[50%] border border-cyan-400/[0.08] bg-cyan-400/[0.02]" />

          <div className="absolute bottom-[-300px] right-[3%] h-[480px] w-[700px] rotate-[14deg] rounded-[50%] border border-violet-500/[0.07] bg-violet-500/[0.018]" />

          <div className="absolute left-1/2 top-[30%] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-cyan-400/[0.035] blur-[110px]" />

          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-122px)] max-w-[1100px] flex-col items-center">
          {/* Page heading */}
          <div className="mb-7 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-cyan-400">
              My Account
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-[38px]">
              Profile
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              View and manage your account information.
            </p>
          </div>

          {/* Main profile card */}
          <div className="relative w-full max-w-[720px] overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#07121e]/90 shadow-[0_0_80px_rgba(34,211,238,0.06)] backdrop-blur-xl">
            {/* Top glow */}
            <div className="absolute left-1/2 top-0 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />

            {/* Inner glow */}
            <div className="pointer-events-none absolute right-[-100px] top-[-120px] h-[280px] w-[280px] rounded-full bg-cyan-400/[0.035] blur-[70px]" />

            <div className="relative p-5 sm:p-7 lg:p-8">
              {/* Profile header */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-cyan-400 to-cyan-500 text-3xl font-semibold text-[#031019] shadow-[0_0_38px_rgba(34,211,238,0.2)]">
                      {loading ? "..." : profileImage ? (<img src={profileImage} alt="Profile preview" className="h-full w-full rounded-full object-cover" />) : user?.profileImage ? (<img src={user.profileImage} alt="Profile" className="h-full w-full rounded-full object-cover" />) : getInitials(user?.name || "User")}
                    </div>

                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />

                    {/* Camera button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      aria-label="Change profile picture"
                      className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#07121e] bg-[#17142f] text-cyan-300 transition-all duration-200 hover:bg-violet-500/20 hover:text-cyan-200"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 7h3l1.5-2h7L17 7h3v11H4V7Z"
                        />
                        <circle cx="12" cy="13" r="3.5" />
                      </svg>
                    </button>

                    {/* Active indicator */}
                    <span className="absolute bottom-1 left-1 h-3.5 w-3.5 rounded-full border-[3px] border-[#07121e] bg-emerald-400" />
                  </div>

                  {/* Name / role */}
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">
                      {loading ? "Loading..." : user?.name}
                    </h2>

                    <div className="mt-2 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                      <span className="ml-2 text-xs font-medium text-cyan-300">
                        {loading
                          ? "Loading..."
                          : formatRole(user?.role || "VIEWER")}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                      Turning customer feedback into better products.
                    </p>
                  </div>
                </div>

                {/* Edit button */}
                <button
                  type="button"
                  onClick={openEditProfile}
                  disabled={loading || !user}
                  className="group inline-flex items-center justify-center gap-2 self-center rounded-lg border border-cyan-400/25 bg-cyan-400/[0.04] px-4 py-2.5 text-sm font-medium text-cyan-300 transition-all duration-200 hover:border-cyan-300/50 hover:bg-cyan-400/[0.09] hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-50 sm:self-start"
                >
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20h9"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 3.5a2.121 2.121 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"
                    />
                  </svg>
                  Edit Profile
                </button>
              </div>

              <div className="my-7 h-px bg-gradient-to-r from-transparent via-slate-700/70 to-transparent" />

              {/* Account information */}
              <div>
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-white">
                    Account Information
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Your account details and workspace information.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Full name */}
                  <div className="group rounded-xl border border-slate-800/90 bg-[#0a1725]/75 px-4 py-3.5 transition-all duration-200 hover:border-cyan-400/20 hover:bg-[#0c1b2b]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/60 text-slate-300 group-hover:text-cyan-300">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        >
                          <circle cx="12" cy="7" r="4" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 21a8 8 0 0 1 16 0"
                          />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-slate-500">
                          Full Name
                        </p>

                        <p className="mt-0.5 truncate text-sm font-medium text-slate-100">
                          {user?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group rounded-xl border border-slate-800/90 bg-[#0a1725]/75 px-4 py-3.5 transition-all duration-200 hover:border-cyan-400/20 hover:bg-[#0c1b2b]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/60 text-slate-300 group-hover:text-cyan-300">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        >
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4 7 8 6 8-6"
                          />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-slate-500">
                          Email Address
                        </p>

                        <p className="mt-0.5 truncate text-sm font-medium text-slate-100">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="group rounded-xl border border-slate-800/90 bg-[#0a1725]/75 px-4 py-3.5 transition-all duration-200 hover:border-cyan-400/20 hover:bg-[#0c1b2b]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/60 text-slate-300 group-hover:text-cyan-300">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3 4.5 6v5.5c0 4.8 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.7 7.5-9.5V6L12 3Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.5 12 1.7 1.7 3.5-3.7"
                          />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-slate-500">
                          Role
                        </p>

                        <p className="mt-0.5 text-sm font-medium text-slate-100">
                          {formatRole(user?.role || "VIEWER")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Workspace */}
                  <div className="group rounded-xl border border-slate-800/90 bg-[#0a1725]/75 px-4 py-3.5 transition-all duration-200 hover:border-violet-400/20 hover:bg-[#0c1b2b]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/60 text-slate-300 group-hover:text-violet-300">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2 21h20"
                          />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-slate-500">
                          Workspace ID
                        </p>

                        <p className="mt-0.5 truncate font-mono text-xs text-slate-300 sm:text-sm">
                          {user?.workspaceId}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account status */}
              <div className="mt-5 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.035] px-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-25" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200">
                      Account Status
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Your LOOP account is active and ready to use.
                    </p>
                  </div>

                  <span className="ml-auto shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Active
                  </span>
                </div>
              </div>

              {error && !editOpen && (
                <div className="mt-4 rounded-lg border border-red-400/20 bg-red-400/[0.04] px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* LOOP footer */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[9px] font-medium uppercase tracking-[0.35em] text-slate-600">
            <span className="hidden h-px w-8 bg-slate-800 sm:block" />
            <span>LOOP</span>
            <span>â€¢</span>
            <span>Listen</span>
            <span>â€¢</span>
            <span>Understand</span>
            <span>â€¢</span>
            <span>Build Better</span>
            <span className="hidden h-px w-8 bg-slate-800 sm:block" />
          </div>

          {/* Back */}
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-cyan-300"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 18-6-6 6-6"
              />
            </svg>
            Back to Dashboard
          </button>
        </div>

        {/* Edit Profile Modal */}
        {editOpen && user && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-[470px] overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#07121e] shadow-[0_0_80px_rgba(34,211,238,0.1)]">
              {/* Modal glow */}
              <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />

              <div className="p-5 sm:p-6">
                {/* Modal header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400">
                      My Account
                    </p>

                    <h2 className="mt-2 text-xl font-semibold text-white">
                      Edit Profile
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Update the information associated with your LOOP account.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeEditProfile}
                    disabled={saving}
                    aria-label="Close edit profile"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white/[0.04] hover:text-white disabled:opacity-50"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6l12 12M18 6 6 18"
                      />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <div className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="mb-2 block text-xs font-medium text-slate-400"
                    >
                      Full Name
                    </label>

                    <input
                      id="profile-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      disabled={saving}
                      autoComplete="name"
                      className="h-11 w-full rounded-lg border border-slate-700/80 bg-[#0a1725] px-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/[0.08] disabled:opacity-60"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="profile-email"
                      className="mb-2 block text-xs font-medium text-slate-400"
                    >
                      Email Address
                    </label>

                    <input
                      id="profile-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      disabled={saving}
                      autoComplete="email"
                      className="h-11 w-full rounded-lg border border-slate-700/80 bg-[#0a1725] px-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/[0.08] disabled:opacity-60"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Role - read only */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      Role
                    </label>

                    <div className="flex h-11 items-center rounded-lg border border-slate-800 bg-[#08131f] px-3.5 text-sm text-slate-500">
                      {formatRole(user.role)}
                      <span className="ml-auto text-[10px] uppercase tracking-wider text-slate-700">
                        Read only
                      </span>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="rounded-lg border border-red-400/20 bg-red-400/[0.04] px-3.5 py-3 text-xs text-red-300">
                      {error}
                    </div>
                  )}

                  {/* Success */}
                  {saveMessage && (
                    <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3.5 py-3 text-xs text-emerald-300">
                      {saveMessage}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeEditProfile}
                    disabled={saving}
                    className="rounded-lg border border-slate-700/80 px-4 py-2.5 text-sm font-medium text-slate-400 transition-all hover:border-slate-600 hover:bg-white/[0.03] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-4 py-2.5 text-sm font-medium text-cyan-300 transition-all hover:border-cyan-300/50 hover:bg-cyan-400/15 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-300/20 border-t-cyan-300" />
                    )}

                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
