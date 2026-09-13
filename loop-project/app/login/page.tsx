"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const savedAccount = localStorage.getItem("loopAccount");

    if (!savedAccount) {
      alert("Please create an account first.");
      return;
    }

    const account = JSON.parse(savedAccount);

    if (email === account.email && password === account.password) {
      alert(`Login successful! Welcome ${account.name}`);
      window.location.href = "/";
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <main className="min-h-screen bg-[#030912] text-white flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#19e6d1]/10 rounded-full blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-[#8b5cf6]/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">

        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold tracking-wide">
              LOOP
            </h1>
          </Link>

          <p className="text-[#19e6d1] text-sm mt-2">
            FEEDBACK INTELLIGENCE
          </p>
        </div>

        <div className="bg-[#091523]/90 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">
              Welcome back!
            </h2>

            <p className="text-[#94a3b8] text-sm mt-2">
              Sign in to continue to LOOP
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-sm text-[#cbd5e1] mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-lg bg-[#07111d] border border-white/10 text-white placeholder-[#64748b] outline-none focus:border-[#19e6d1] focus:ring-1 focus:ring-[#19e6d1] transition"
              />
            </div>

            <div>
              <label className="block text-sm text-[#cbd5e1] mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-lg bg-[#07111d] border border-white/10 text-white placeholder-[#64748b] outline-none focus:border-[#19e6d1] focus:ring-1 focus:ring-[#19e6d1] transition"
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[#19e6d1] hover:text-[#28a9ff]"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-gradient-to-r from-[#19e6d1] to-[#28a9ff] text-[#030912] font-semibold hover:opacity-90 transition shadow-lg shadow-cyan-500/20"
            >
              Login
            </button>

          </form>

          <p className="text-center text-sm text-[#94a3b8] mt-7">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#19e6d1] font-medium hover:text-[#28a9ff]"
            >
              Sign Up
            </Link>
          </p>

          <div className="text-center mt-5">
            <Link
              href="/"
              className="text-sm text-[#64748b] hover:text-white transition"
            >
              ← Back to LOOP
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}