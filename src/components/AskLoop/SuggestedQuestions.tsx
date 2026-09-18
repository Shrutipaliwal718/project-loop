type SuggestedQuestionsProps = {
  onSelect: (question: string) => void;
};

const SuggestedQuestions = ({ onSelect }: SuggestedQuestionsProps) => {
  const questions = [
    "What are the top customer complaints?",
    "Which themes are most important?",
    "What is driving negative sentiment?",
    "What should we prioritize?",
  ];

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Suggested questions
        </span>

        <span className="h-px flex-1 bg-white/[0.05]" />
      </div>

      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onSelect(question)}
            className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-left text-[11px] text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-300"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
