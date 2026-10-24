import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "../articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const paragraphs = article.content.split("\n\n");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
      <Link
        href="/newspaper"
        className="text-sm text-neutral-700 transition-colors hover:text-black"
      >
        ← Back to Newspaper
      </Link>

      <article className="mx-auto max-w-[680px] py-16 sm:py-24">
        <p className="text-sm text-muted">{article.date}</p>
        <h1 className="mt-3 text-[40px] font-medium leading-snug">
          {article.title}
        </h1>

        <div className="mt-8 border-t-[0.5px] border-divider" />

        <div
          className="mt-12 text-neutral-900"
          style={{ fontSize: "18px", lineHeight: 1.9 }}
        >
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className={i > 0 ? "mt-6" : ""}
              style={{ whiteSpace: "pre-line" }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {article.closing && (
          <p className="mt-10 text-right text-base italic text-muted">
            {article.closing}
          </p>
        )}
      </article>
    </div>
  );
}
