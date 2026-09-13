"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Sidebar from "../Component/Sidebar";
import { useEffect, useState } from "react";

type Feedback = {
  name: string;
  email: string;
  category: string;
  rating: string;
  feedback: string;
  createdAt?: string;
};

export default function FeedbackListPage() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  useEffect(() => {
    const savedFeedback = localStorage.getItem("loopFeedback");

    if (savedFeedback) {
      try {
        setFeedbackList(JSON.parse(savedFeedback));
      } catch {
        setFeedbackList([]);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#030912] text-white relative overflow-hidden">

      {/* Sidebar - Desktop only */}
      <Sidebar />

      {/* Main Area */}
      <div className="lg:ml-64 min-h-screen">

        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="px-6 py-10 relative">

          {/* Background Glow */}
          <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#19e6d1]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-[#8b5cf6]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="relative max-w-6xl mx-auto mb-8">
            <h2 className="text-3xl font-semibold">
              Feedback Dashboard
            </h2>

            <p className="text-[#94a3b8] mt-2">
              View all submitted feedback in one place.
            </p>
          </div>

          {/* Stats */}
          <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

            {/* Total Feedback */}
            <div className="bg-[#091523]/90 border border-white/10 rounded-xl p-5">
              <p className="text-sm text-[#94a3b8]">
                Total Feedback
              </p>

              <p className="text-3xl font-bold mt-2 text-[#19e6d1]">
                {feedbackList.length}
              </p>
            </div>

            {/* 5 Star */}
            <div className="bg-[#091523]/90 border border-white/10 rounded-xl p-5">
              <p className="text-sm text-[#94a3b8]">
                5 Star Feedback
              </p>

              <p className="text-3xl font-bold mt-2 text-[#19e6d1]">
                {
                  feedbackList.filter(
                    (item) => item.rating === "5"
                  ).length
                }
              </p>
            </div>

            {/* Categories */}
            <div className="bg-[#091523]/90 border border-white/10 rounded-xl p-5">
              <p className="text-sm text-[#94a3b8]">
                Categories
              </p>

              <p className="text-3xl font-bold mt-2 text-[#28a9ff]">
                {
                  new Set(
                    feedbackList.map(
                      (item) => item.category
                    )
                  ).size
                }
              </p>
            </div>

          </div>

          {/* Feedback Cards */}
          <div className="relative max-w-6xl mx-auto">

            {feedbackList.length === 0 ? (

              <div className="bg-[#091523]/90 border border-white/10 rounded-2xl p-10 text-center">

                <p className="text-[#94a3b8]">
                  No feedback submitted yet.
                </p>

                <Link
                  href="/feedback"
                  className="inline-block mt-5 px-6 py-3 rounded-lg bg-gradient-to-r from-[#19e6d1] to-[#28a9ff] text-[#030912] font-semibold hover:opacity-90 transition"
                >
                  Submit Feedback
                </Link>

              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {feedbackList.map((item, index) => (

                  <div
                    key={index}
                    className="bg-[#091523]/90 border border-white/10 rounded-2xl p-6 shadow-xl hover:border-[#19e6d1]/40 transition"
                  >

                    {/* User + Rating */}
                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <h3 className="text-lg font-semibold">
                          {item.name}
                        </h3>

                        <p className="text-sm text-[#64748b] mt-1">
                          {item.email}
                        </p>
                      </div>

                      <span className="text-[#19e6d1] text-sm whitespace-nowrap">
                        {"⭐".repeat(Number(item.rating))}
                      </span>

                    </div>

                    {/* Category */}
                    <div className="mt-4">

                      <span className="inline-block px-3 py-1 rounded-full bg-[#19e6d1]/10 border border-[#19e6d1]/20 text-[#19e6d1] text-xs">
                        {item.category}
                      </span>

                    </div>

                    {/* Feedback */}
                    <p className="text-[#cbd5e1] mt-5 leading-6">
                      "{item.feedback}"
                    </p>

                    {/* Date */}
                    {item.createdAt && (
                      <p className="text-xs text-[#64748b] mt-5">
                        Submitted:{" "}
                        {new Date(
                          item.createdAt
                        ).toLocaleString()}
                      </p>
                    )}

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>
      </div>
    </main>
  );
}