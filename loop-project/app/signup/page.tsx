"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Viewer");
  const [error, setError] = useState("");

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Check fields
    if (!cleanName || !cleanEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Check password
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Account data
    const account = {
      name: cleanName,
      email: cleanEmail,
      password: password,
      role: role,
    };

    try {
      // Save account in browser
      localStorage.setItem("loopAccount", JSON.stringify(account));

      // Success message
      alert(`Account created successfully as ${role}!`);

      // Go to login
      window.location.href = "/login";
    } catch (error) {
      console.error("Signup error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#030912] text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#19e6d1]/10 rounded-full blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl" />

      {/* Signup Card */}
      <div className="relative w-full max-w-md bg-[#080f1c]/90 border border-white/10 rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold tracking-wide">
              LOOP
            </h1>
          </Link>

          <p className="text-[#19e6d1] text-sm mt-1">
            FEEDBACK INTELLIGENCE
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center">
          Create Account
        </h2>

        <p className="text-center text-gray-400 mt-2">
          Join LOOP today
        </p>

        {/* Error Message */}
        {error && (
          <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="mt-6 space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="w-full px-4 py-3 rounded-lg bg-[#0b1422] border border-white/10 text-white placeholder-gray-500 outline-none focus:border-[#19e6d1] transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-lg bg-[#0b1422] border border-white/10 text-white placeholder-gray-500 outline-none focus:border-[#19e6d1] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-lg bg-[#0b1422] border border-white/10 text-white placeholder-gray-500 outline-none focus:border-[#19e6d1] transition"
            />

            <p className="text-xs text-gray-500 mt-1">
              Minimum 6 characters
            </p>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0b1422] border border-white/10 text-white outline-none focus:border-[#19e6d1] transition"
            >
              <option value="Viewer">Viewer</option>
              <option value="Admin">Admin</option>
              <option value="Analyst">Analyst</option>
            </select>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-[#19e6d1] to-[#28a9ff] text-black font-semibold hover:opacity-90 active:scale-[0.98] transition"
          >
            Sign Up
          </button>

        </form>

        {/* Login */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}

          <Link
            href="/login"
            className="text-[#19e6d1] font-medium hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Back */}
        <div className="text-center mt-5">
          <Link
            href="/"
            className="text-gray-400 text-sm hover:text-white transition"
          >
            ← Back to LOOP
          </Link>
        </div>

      </div>
    </main>
  );
}