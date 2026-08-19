"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type SubmitEvent } from "react";
import { CATEGORIES, type CategoryId, type Question } from "@/lib/introCategories";

const TRANSITION_MS = 300;

type FlatQuestion = {
  categoryId: CategoryId;
  categoryLabel: string;
  questionIndex: number;
  totalInCategory: number;
  question: Question;
};

function buildQuestionQueue(selected: CategoryId[]): FlatQuestion[] {
  return CATEGORIES.filter((c) => selected.includes(c.id)).flatMap((c) =>
    c.questions.map((question, questionIndex) => ({
      categoryId: c.id,
      categoryLabel: c.label,
      questionIndex,
      totalInCategory: c.questions.length,
      question,
    })),
  );
}

export default function IntroPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [visible, setVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>(
    [],
  );
  const [flatQuestionIndex, setFlatQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [linesShown, setLinesShown] = useState(0);
  const [showEnter, setShowEnter] = useState(false);

  // Initial fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  function goTo(update: () => void) {
    setVisible(false);
    setTimeout(() => {
      update();
      setVisible(true);
    }, TRANSITION_MS);
  }

  // Step 1 — 2s clip-path reveal, then hold 1s, then auto-advance
  useEffect(() => {
    if (step !== 1) return;
    const t = setTimeout(() => goTo(() => setStep(2)), 3000);
    return () => clearTimeout(t);
  }, [step]);

  // Step 2 — staggered lines, then enter button (step is entered at most
  // once in this linear flow, so linesShown/showEnter never need resetting)
  useEffect(() => {
    if (step !== 2) return;
    const timers = [
      setTimeout(() => setLinesShown(1), 400),
      setTimeout(() => setLinesShown(2), 1200),
      setTimeout(() => setLinesShown(3), 2000),
      setTimeout(() => setShowEnter(true), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [step]);

  // Step 5 — auto-advance to Step 6 after 4s
  useEffect(() => {
    if (step !== 5) return;
    const t = setTimeout(() => goTo(() => setStep(6)), 4000);
    return () => clearTimeout(t);
  }, [step]);

  function toggleCategory(id: CategoryId) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }

  function startQuestions() {
    goTo(() => {
      setFlatQuestionIndex(0);
      setStep(4);
    });
  }

  const questionQueue = buildQuestionQueue(selectedCategories);
  const currentQuestionItem = questionQueue[flatQuestionIndex];

  function selectAnswer(option: string) {
    if (!currentQuestionItem) return;
    const key = `${currentQuestionItem.categoryId}-${currentQuestionItem.questionIndex}`;

    goTo(() => {
      setAnswers((prev) => ({ ...prev, [key]: option }));
      if (flatQuestionIndex < questionQueue.length - 1) {
        setFlatQuestionIndex((i) => i + 1);
      } else {
        setStep(5);
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#f5f0eb] font-sans text-black">
      <div
        className="flex min-h-screen flex-col transition-opacity ease-in-out"
        style={{
          opacity: visible ? 1 : 0,
          transitionDuration: `${TRANSITION_MS}ms`,
        }}
      >
        {step === 1 && <StepLogo />}

        {step === 2 && (
          <StepTyping
            linesShown={linesShown}
            showEnter={showEnter}
            onEnter={() => goTo(() => setStep(3))}
          />
        )}

        {step === 3 && (
          <StepCategory
            selected={selectedCategories}
            onToggle={toggleCategory}
            onContinue={startQuestions}
          />
        )}

        {step === 4 && currentQuestionItem && (
          <StepQuestion item={currentQuestionItem} onAnswer={selectAnswer} />
        )}

        {step === 5 && (
          <StepClosing onContinue={() => goTo(() => setStep(6))} />
        )}

        {step === 6 && (
          <StepEmailForm
            selectedCategories={selectedCategories}
            answers={answers}
            onSkip={() => router.push("/home")}
            onSubmitted={() => router.push("/home")}
          />
        )}
      </div>
    </div>
  );
}

function StepLogo() {
  return (
    <section className="flex flex-1 items-center justify-center px-6">
      <div
        style={{
          clipPath: "inset(0 100% 0 0)",
          animation: "logo-reveal-clip 2s ease-out forwards",
        }}
      >
        <Image
          src="/whyeatlablogo_nobg.png"
          alt="Why Eat Logo"
          width={612}
          height={408}
          priority
          className="h-auto w-[60vw]"
        />
      </div>
    </section>
  );
}

function StepTyping({
  linesShown,
  showEnter,
  onEnter,
}: {
  linesShown: number;
  showEnter: boolean;
  onEnter: () => void;
}) {
  const lines = ["Why eat.", "Not what we eat.", "Why do we eat?"];

  return (
    <section className="flex flex-1 flex-col justify-center px-8 sm:px-16">
      <div className="flex flex-col gap-3">
        {lines.map((line, i) => (
          <p
            key={line}
            className="text-4xl transition-opacity duration-700 ease-out sm:text-6xl"
            style={{ opacity: linesShown > i ? 1 : 0 }}
          >
            {line}
          </p>
        ))}
      </div>

      <button
        type="button"
        onClick={onEnter}
        className="mt-12 w-fit text-2xl transition-opacity duration-700 ease-out hover:opacity-60"
        style={{
          opacity: showEnter ? 1 : 0,
          pointerEvents: showEnter ? "auto" : "none",
        }}
        aria-hidden={!showEnter}
      >
        →
      </button>
    </section>
  );
}

function StepCategory({
  selected,
  onToggle,
  onContinue,
}: {
  selected: CategoryId[];
  onToggle: (id: CategoryId) => void;
  onContinue: () => void;
}) {
  const hasSelection = selected.length > 0;

  return (
    <section className="flex flex-1 flex-col justify-center gap-12 px-8 py-16 sm:px-16">
      <h2 className="text-3xl leading-snug sm:text-5xl">Why you eat?</h2>

      <ul className="flex flex-col gap-4">
        {CATEGORIES.map((category) => {
          const isSelected = selected.includes(category.id);
          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onToggle(category.id)}
                className={`text-2xl transition-colors duration-200 sm:text-3xl ${
                  isSelected
                    ? "underline decoration-1 underline-offset-4"
                    : "hover:underline hover:decoration-1 hover:underline-offset-4"
                }`}
              >
                {isSelected ? "✓ " : ""}
                {category.label}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={onContinue}
        className="w-fit text-xl transition-opacity duration-300 hover:opacity-60"
        style={{
          opacity: hasSelection ? 1 : 0,
          pointerEvents: hasSelection ? "auto" : "none",
        }}
        aria-hidden={!hasSelection}
      >
        → Continue
      </button>
    </section>
  );
}

function StepQuestion({
  item,
  onAnswer,
}: {
  item: FlatQuestion;
  onAnswer: (option: string) => void;
}) {
  return (
    <section className="flex flex-1 flex-col justify-center gap-10 px-8 py-16 sm:px-16">
      <p className="text-sm uppercase tracking-widest text-black/50">
        {item.categoryLabel} · {item.questionIndex + 1}/{item.totalInCategory}
      </p>

      <h2 className="max-w-3xl text-3xl leading-snug sm:text-5xl">
        {item.question.text}
      </h2>

      <div className="flex flex-col gap-4">
        {item.question.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onAnswer(option)}
            className="w-fit text-left text-xl text-black/80 transition-colors duration-200 hover:text-black hover:underline sm:text-2xl"
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}

function StepClosing({ onContinue }: { onContinue: () => void }) {
  const text = `We can categorize you, but we don't want.
Traditional marketing always tries to fit you into a neat category for its own convenience.

But you are a human being, not a commodity.
You are a living, breathing entity constantly changing every second.

          You are a human, not a program
                    not a machine
                    not a object.

          Complexity is you dignity, not errors.`;

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-12 px-8 py-16 text-center sm:px-16">
      <p
        className="max-w-2xl text-xl leading-relaxed sm:text-2xl"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {text}
      </p>

      <button
        type="button"
        onClick={onContinue}
        className="text-lg transition-opacity duration-300 hover:opacity-60"
      >
        →
      </button>
    </section>
  );
}

function StepEmailForm({
  selectedCategories,
  answers,
  onSkip,
  onSubmitted,
}: {
  selectedCategories: CategoryId[];
  answers: Record<string, string>;
  onSkip: () => void;
  onSubmitted: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    setStatus("sending");

    try {
      const res = await fetch("/api/send-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          selectedCategories,
          answers,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("sent");
      setTimeout(onSubmitted, 2000);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <p className="text-2xl sm:text-3xl">
          Thank you. See you on the other side.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col justify-center gap-10 px-8 py-16 sm:px-16">
      <p className="max-w-xl text-2xl leading-snug sm:text-3xl">
        If you&apos;d like to receive your results and stay connected with
        Why Eat,
      </p>

      <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-8">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-black/50">Name</span>
          <input
            name="name"
            type="text"
            required
            className="border-b border-black/30 bg-transparent py-2 text-xl outline-none focus:border-black"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-black/50">Email</span>
          <input
            name="email"
            type="email"
            required
            className="border-b border-black/30 bg-transparent py-2 text-xl outline-none focus:border-black"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-black/50">
            Any questions or thoughts you&apos;d like to share?
          </span>
          <textarea
            name="message"
            rows={3}
            className="resize-none border-b border-black/30 bg-transparent py-2 text-xl outline-none focus:border-black"
          />
        </label>

        {status === "error" && (
          <p className="text-sm text-red-700">
            Something went wrong. Please try again, or skip for now.
          </p>
        )}

        <div className="flex items-center gap-8">
          <button
            type="submit"
            disabled={status === "sending"}
            className="text-xl transition-opacity duration-300 hover:opacity-60 disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Send →"}
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="text-sm text-black/50 transition-opacity duration-300 hover:opacity-70"
          >
            Skip →
          </button>
        </div>
      </form>
    </section>
  );
}
