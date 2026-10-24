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

  // Marks the intro as completed so the root route sends returning visitors
  // straight to /home instead of back through the survey. Used for both
  // "Skip" and a successful submit in step 6 — reaching the end of the
  // flow counts as "done" either way.
  function finishIntro() {
    localStorage.setItem("whyeat_survey_done", "true");
    router.push("/home");
  }

  // Step 1 — 1.5s fade-in, then auto-advance at 2.5s total
  useEffect(() => {
    if (step !== 1) return;
    const t = setTimeout(() => goTo(() => setStep(2)), 2500);
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
          <StepQuestion
            key={`${currentQuestionItem.categoryId}-${currentQuestionItem.questionIndex}`}
            item={currentQuestionItem}
            onAnswer={selectAnswer}
          />
        )}

        {step === 5 && (
          <StepClosing onContinue={() => goTo(() => setStep(6))} />
        )}

        {step === 6 && (
          <StepEmailForm
            selectedCategories={selectedCategories}
            answers={answers}
            onSkip={finishIntro}
            onSubmitted={finishIntro}
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
          animation: "fade-in-opacity 1.5s ease-in-out forwards",
        }}
      >
        <Image
          src="/whyeatnewlogo-nobg.png"
          alt="Why Eat Logo"
          width={834}
          height={299}
          priority
          className="h-auto w-[80vw] max-w-[700px]"
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
                className="text-2xl sm:text-3xl"
              >
                <span
                  className={`inline-block transition-[font-size,font-weight] duration-150 ease-out ${
                    isSelected
                      ? "text-[1.15em] font-medium"
                      : "text-[1em] font-normal"
                  }`}
                >
                  {category.label}
                </span>
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

const OTHER_OPTION = "Other (write your own)";

function StepQuestion({
  item,
  onAnswer,
}: {
  item: FlatQuestion;
  onAnswer: (option: string) => void;
}) {
  const [otherSelected, setOtherSelected] = useState(false);
  const [otherText, setOtherText] = useState("");

  function confirmOther() {
    onAnswer(otherText.trim() || "Other");
  }

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

        <button
          type="button"
          onClick={() => setOtherSelected(true)}
          className="w-fit text-left text-xl text-black/50 transition-colors duration-200 hover:text-black/80 hover:underline sm:text-2xl"
        >
          {OTHER_OPTION}
        </button>

        {otherSelected && (
          <div className="flex items-center gap-3 pl-0">
            <input
              type="text"
              autoFocus
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmOther();
              }}
              placeholder="Type your answer…"
              className="w-full max-w-sm border-0 border-b border-black/30 bg-transparent py-1 text-lg outline-none focus:border-black sm:text-xl"
            />
            <button
              type="button"
              onClick={confirmOther}
              aria-label="Confirm answer"
              className="text-xl text-black/60 transition-colors hover:text-black"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function StepClosing({ onContinue }: { onContinue: () => void }) {
  return (
    <section
      role="button"
      tabIndex={0}
      onClick={onContinue}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onContinue();
      }}
      className="flex flex-1 cursor-pointer flex-col items-center justify-center px-8 py-16 sm:px-16"
    >
      <div
        className="mx-auto max-w-md sm:max-w-lg"
        style={{ textAlign: "center", fontSize: "18px", fontWeight: 400, lineHeight: 2 }}
      >
        <p style={{ margin: 0, marginBottom: "0.8rem" }}>
          We can categorize you, but we don&apos;t want to.
        </p>
        <p
          className="text-muted"
          style={{ margin: 0, marginBottom: "0.8rem", fontSize: "smaller" }}
        >
          Traditional marketing always tries to fit you into a neat category
          for its own convenience.
        </p>

        <p style={{ margin: 0, marginBottom: "0.8rem" }}>
          But you are a human being, not a commodity.
        </p>
        <p style={{ margin: 0, marginBottom: "0.8rem" }}>
          You are a living, breathing entity constantly changing every
          second.
        </p>

        <div
          style={{
            display: "inline-block",
            textAlign: "left",
            fontWeight: 500,
            lineHeight: 1.6,
            marginBottom: "0.8rem",
          }}
        >
          <p style={{ margin: 0 }}>You are a human, not a program</p>
          <p style={{ margin: 0, paddingLeft: "126.3px" }}>not a machine</p>
          <p style={{ margin: 0, paddingLeft: "126.3px" }}>not an object.</p>
        </div>

        <p style={{ margin: 0 }}>Complexity is your dignity, not errors.</p>
      </div>

      <p className="mt-16 text-[11px] text-muted">tap to continue</p>
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
      setTimeout(onSubmitted, 1500);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section className="flex flex-1 items-center justify-center px-8 text-center">
        <p className="text-5xl sm:text-6xl">sent.</p>
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
