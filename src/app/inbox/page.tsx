"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/Common/AppLayout";
import FeedbackIngestion from "@/components/Feedback/FeedbackIngestion";
import FeedbackInbox from "@/components/Feedback/FeedbackInbox";

type UserRole = "ADMIN" | "ANALYST" | "VIEWER";

type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  workspaceId: string;
};

const InboxPage = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok && data.success && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to load current user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const canIngestFeedback = user?.role === "ADMIN" || user?.role === "ANALYST";

  return (
    <AppLayout>
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {!loading && canIngestFeedback && <FeedbackIngestion />}

        <FeedbackInbox />
      </div>
    </AppLayout>
  );
};

export default InboxPage;
