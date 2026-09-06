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

  const getMockResponse = (input: string) => {
    const normalized = input.toLowerCase();

    if (normalized.includes("complaint") || normalized.includes("problem")) {
      return "Based on the current workspace data, Product Quality is the leading theme, followed by Customer Support and Pricing. These areas represent the strongest signals in the available feedback.";
    }

    if (normalized.includes("theme") || normalized.includes("themes")) {
      return "The leading themes are Product Quality, Customer Support, Pricing, User Experience, and Performance. Product Quality currently has the strongest signal in the workspace.";
    }

    if (normalized.includes("negative") || normalized.includes("sentiment")) {
      return "Negative sentiment currently represents 11% of analyzed feedback, while positive sentiment accounts for 68% and neutral sentiment for 21%. Negative feedback should be examined alongside the strongest themes to identify the underlying issues.";
    }

    if (normalized.includes("prioritize") || normalized.includes("priority")) {
      return "A reasonable priority would be to investigate Product Quality first, followed by Customer Support and Pricing. Combining these themes with negative-feedback examples would help identify the highest-impact opportunities.";
    }

    return "I can help you explore customer sentiment, feedback volume, themes, complaints, and potential priorities. Try asking about the top complaints, negative sentiment, or the most important themes.";
  };

  const submitQuestion = () => {
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

    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: getMockResponse(trimmedQuestion),
      };

      setMessages((current) => [...current, assistantMessage]);
      setIsLoading(false);
    }, 800);
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

      <p className="mt-3 text-center text-[9px] text-slate-700">
        LOOP responses are currently using demonstration data.
      </p>
    </div>
  );
};

export default AskLoopShell;
