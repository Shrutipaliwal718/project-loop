"use client";

import { useState } from "react";
import AskLoopHeader from "./AskLoopHeader";
import ChatWindow from "./ChatWindow";
import QuestionInput from "./QuestionInput";
import SuggestedQuestions from "./SuggestedQuestions";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const AskLoopShell = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm LOOP Assistant. Ask me anything about your customer feedback, sentiment, themes, or emerging patterns.",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitQuestion = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((current) => [...current, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/ask-loop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          query: trimmedQuestion,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || data.message || "Unable to get an answer from LOOP.",
        );
      }

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          data.answer ||
          "I couldn't generate an answer from the available feedback.",
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      console.error("Ask LOOP request error:", error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          error instanceof Error
            ? `I couldn't complete that request: ${error.message}`
            : "I couldn't complete that request. Please try again.",
      };

      setMessages((current) => [...current, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (selectedQuestion: string) => {
    setQuestion(selectedQuestion);
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <AskLoopHeader />

      <div className="mt-7">
        <ChatWindow messages={messages} isLoading={isLoading} />
      </div>

      <div className="mt-4">
        <SuggestedQuestions onSelect={handleSuggestedQuestion} />
      </div>

      <div className="mt-4">
        <QuestionInput
          value={question}
          onChange={setQuestion}
          onSubmit={submitQuestion}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AskLoopShell;
