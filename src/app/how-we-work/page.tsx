export default function HowWeWorkPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
      <h1 className="mb-12 text-4xl font-medium sm:text-5xl">How we work</h1>

      <div className="space-y-10 text-lg leading-relaxed text-neutral-800">
        <section>
          <h2 className="mb-3 text-2xl font-medium text-sage-700">
            What brand are we?
          </h2>
          <p>
            Why eat is a brand that ask question about food, emotion,
            relationship and nerve system and help people to understand
            themselve first.
          </p>
        </section>

        <section className="space-y-4">
          <p>We do not teach WHAT to eat. We see WHY eat.</p>
          <p>
            We don&apos;t eat just because we are hungry. We eat when we
            lonely, anxious, want to feel be loved.
          </p>
          <p>
            Why Eat started from this question. So we ask WHY did you need to
            choose it Instead of what you ate.
          </p>
          <p>We pursue fundamental.</p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium text-sage-700">
            The program struture
          </h2>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-3 text-base sm:text-lg">
            {[
              "Redesign the sense",
              "Feel different",
              "Thinking pattern change",
              "Emotional pattern change",
              "Decision making change",
            ].map((step, i, arr) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-sage-300 px-4 py-1.5">
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-sage-500" aria-hidden>
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-2 border-t border-neutral-200 pt-8 text-xl italic text-neutral-700">
          <p>Question over Method.</p>
          <p>Resilience over Control.</p>
          <p>Comprehension over Correct Answer.</p>
        </section>
      </div>
    </div>
  );
}
