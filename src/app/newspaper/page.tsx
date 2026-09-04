import Link from "next/link";
import { articles } from "./articles";

export default function NewspaperPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
      <h1 className="mb-16 text-4xl font-medium sm:text-5xl">
        Why Eat: Newspaper
      </h1>

      <div className="mx-auto max-w-[720px]">
        {articles.map((article) => (
          <article key={article.slug} className="py-10">
            <p className="text-sm text-muted">{article.date}</p>
            <h2 className="mt-2 text-[28px] font-medium leading-snug">
              {article.title}
            </h2>
            <p className="mt-3 text-[16px] text-muted">{article.preview}</p>
            <Link
              href={`/newspaper/${article.slug}`}
              className="mt-4 inline-block text-sm text-neutral-700 transition-colors hover:text-black"
            >
              Read →
            </Link>
            <div className="mt-10 border-t-[0.5px] border-divider" />
          </article>
        ))}
      </div>
    </div>
  );
}
