const ARTICLES = [
  {
    title: "Why we eat when we are not hungry",
    date: "June 12, 2026",
  },
  {
    title: "The nervous system and the plate",
    date: "May 28, 2026",
  },
  {
    title: "Understanding emotional hunger",
    date: "May 9, 2026",
  },
  {
    title: "Redesigning the sense of taste",
    date: "April 20, 2026",
  },
];

const UPDATES = [
  {
    title: "New cohort opens for enrollment",
    date: "July 1, 2026",
  },
  {
    title: "Why Eat lab studio, coming soon",
    date: "June 15, 2026",
  },
  {
    title: "A note from the founders",
    date: "May 30, 2026",
  },
];

function Thumbnail() {
  return (
    <div
      aria-hidden
      className="aspect-[4/3] w-full flex-shrink-0 rounded-sm bg-sage-100"
    />
  );
}

export default function NewspaperPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
      <h1 className="mb-12 text-4xl font-medium sm:text-5xl">Newspaper</h1>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-sage-700">
            Articles
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {ARTICLES.map((article) => (
              <article key={article.title} className="flex flex-col gap-3">
                <Thumbnail />
                <h3 className="text-lg font-medium leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-neutral-500">{article.date}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-sage-700">
            Updates
          </h2>
          <div className="flex flex-col gap-8">
            {UPDATES.map((update) => (
              <article key={update.title} className="flex gap-4">
                <div className="w-20 flex-shrink-0">
                  <Thumbnail />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-medium leading-snug">
                    {update.title}
                  </h3>
                  <p className="text-sm text-neutral-500">{update.date}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
