"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Product");
  const [rating, setRating] = useState("5");
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");

    if (!name.trim() || !email.trim() || !feedback.trim()) {
      setSuccess("Please fill in all required fields.");
      return;
    }

    const newFeedback = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      category,
      rating,
      feedback: feedback.trim(),
      createdAt: new Date().toISOString(),
    };

    const oldFeedback = localStorage.getItem("loopFeedback");

    const feedbackList = oldFeedback
      ? JSON.parse(oldFeedback)
      : [];

    feedbackList.push(newFeedback);

    localStorage.setItem(
      "loopFeedback",
      JSON.stringify(feedbackList)
    );

    setSuccess("Feedback submitted successfully! 🎉");

    setName("");
    setEmail("");
    setCategory("Product");
    setRating("5");
    setFeedback("");
  };

  return (
    <main className="min-h-screen bg-[#030912] text-white px-6 py-10 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#19e6d1]/10 rounded-full blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-[#8b5cf6]/10 rounded-full blur-3xl" />

      {/* Navbar */}
      <nav className="relative max-w-6xl mx-auto flex items-center justify-between mb-10">

        <Link href="/" className="inline-block">
          <h1 className="text-3xl font-bold tracking-wide">
            LOOP
          </h1>

          <p className="text-[#19e6d1] text-xs mt-1">
            FEEDBACK INTELLIGENCE
          </p>
        </Link>

        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to LOOP
        </Link>

      </nav>

      {/* Main Card */}
      <div className="relative max-w-2xl mx-auto">

        <div className="bg-[#091523]/90 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">

          {/* Heading */}
          <div className="text-center mb-8">

            <h2 className="text-3xl font-semibold">
              Share Your Feedback
            </h2>

            <p className="text-[#94a3b8] mt-2">
              Your feedback helps us improve LOOP.
            </p>

          </div>

          {/* Success / Error */}
          {success && (
            <div className="mb-6 rounded-lg border border-[#19e6d1]/30 bg-[#19e6d1]/10 px-4 py-3 text-sm text-[#19e6d1]">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm text-[#cbd5e1] mb-2">
                Full Name *
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-lg bg-[#07111d] border border-white/10 text-white placeholder-[#64748b] outline-none focus:border-[#19e6d1] focus:ring-1 focus:ring-[#19e6d1] transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-[#cbd5e1] mb-2">
                Email *
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

            {/* Category */}
            <div>
              <label className="block text-sm text-[#cbd5e1] mb-2">
                Feedback Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-[#07111d] border border-white/10 text-white outline-none focus:border-[#19e6d1] transition"
              >
                <option value="Product">Product</option>
                <option value="Service">Service</option>
                <option value="Website">Website</option>
                <option value="Support">Support</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm text-[#cbd5e1] mb-2">
                Rating
              </label>

              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-[#07111d] border border-white/10 text-white outline-none focus:border-[#19e6d1] transition"
              >
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Good</option>
                <option value="3">⭐⭐⭐ Average</option>
                <option value="2">⭐⭐ Poor</option>
                <option value="1">⭐ Very Poor</option>
              </select>
            </div>

            {/* Feedback */}
            <div>
              <label className="block text-sm text-[#cbd5e1] mb-2">
                Your Feedback *
              </label>

              <textarea
                placeholder="Tell us what you think..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-[#07111d] border border-white/10 text-white placeholder-[#64748b] outline-none focus:border-[#19e6d1] focus:ring-1 focus:ring-[#19e6d1] transition resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-gradient-to-r from-[#19e6d1] to-[#28a9ff] text-[#030912] font-semibold hover:opacity-90 active:scale-[0.98] transition shadow-lg shadow-cyan-500/20"
            >
              Submit Feedback
            </button>

          </form>

        </div>
      </div>

    </main>
  );
}