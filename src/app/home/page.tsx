import Image from "next/image";
import Link from "next/link";
import FadeInSection from "@/components/FadeInSection";
import { articles } from "@/app/newspaper/articles";

const TESTIMONIAL = {
  quote:
    "From my own life experience, I can say with confidence that what she does truly works. I know why I'm eating, and I can feel in my body how food works with me. I'm not suppressing my desire for unhealthy food; I'm actively choosing to step away from it. Once you experience her, you will undoubtedly feel the difference.",
  name: "— Hanna",
  relation: "daughter",
};

const featuredArticle = articles[0];

export default function HomePage() {
  return (
    <div className="bg-cream">
      {/* Section 1: Hero logo */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div
          className="opacity-0"
          style={{ animation: "fade-in-opacity 1.5s ease-in-out forwards" }}
        >
          <Image
            src="/whyeatnewlogo-nobg.png"
            alt="Why Eat Logo"
            width={834}
            height={299}
            priority
            className="h-auto w-[70vw] max-w-[600px]"
          />
        </div>

        <p
          className="mt-8 text-base italic text-muted opacity-0 [animation-delay:1.2s] [animation-duration:1s] [animation-fill-mode:forwards] [animation-name:fade-in-opacity] [animation-timing-function:ease-in-out]"
        >
          Why do you eat?
        </p>

        <Link
          href="/intro"
          className="mt-10 text-sm tracking-wide text-neutral-700 opacity-0 transition-colors [animation-delay:1.8s] [animation-duration:1s] [animation-fill-mode:forwards] [animation-name:fade-in-opacity] [animation-timing-function:ease-in-out] hover:text-black"
        >
          begin the survey →
        </Link>
      </section>

      <div className="mx-auto max-w-3xl border-t-[0.5px] border-divider" />

      {/* Section 2: Testimony */}
      <section className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
        <FadeInSection>
          <p className="mb-12 text-left text-xs font-medium uppercase tracking-[0.2em] text-muted">
            — what people say
          </p>
        </FadeInSection>

        <FadeInSection>
          <div className="px-0 py-10 sm:px-20 sm:py-[60px]">
            <span
              aria-hidden
              className="block text-[80px] leading-none text-neutral-200"
            >
              &#8220;
            </span>
            <p className="text-[22px] italic leading-relaxed text-neutral-900">
              {TESTIMONIAL.quote}
            </p>
            <p className="mt-6 text-base text-neutral-900">
              {TESTIMONIAL.name}
            </p>
            <p className="mt-1 text-sm text-muted">{TESTIMONIAL.relation}</p>
          </div>
        </FadeInSection>
      </section>

      <div className="mx-auto max-w-3xl border-t-[0.5px] border-divider" />

      {/* Section 3: Brand intro */}
      <section className="mx-auto max-w-2xl px-6 py-32 text-center sm:px-10">
        <FadeInSection>
          <p className="text-3xl sm:text-4xl">
            Don&apos;t just fill your stomach.
          </p>
        </FadeInSection>
        <FadeInSection>
          <p className="mt-4 text-2xl text-muted sm:text-3xl">
            feed your nerve.
          </p>
        </FadeInSection>
      </section>

      <div className="mx-auto max-w-3xl border-t-[0.5px] border-divider" />

      {/* Section 5: Newsletter preview */}
      <section className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
        <FadeInSection>
          <p className="mb-12 text-left text-xs font-medium uppercase tracking-[0.2em] text-muted">
            — from the newspaper
          </p>
        </FadeInSection>

        <FadeInSection>
          <div className="py-8">
            <p className="text-xs text-muted">{featuredArticle.date}</p>
            <h3 className="mt-2 text-lg">{featuredArticle.title}</h3>
            <p className="mt-2 text-sm text-muted">
              {featuredArticle.preview}
            </p>
            <Link
              href={`/newspaper/${featuredArticle.slug}`}
              className="mt-4 inline-block text-sm text-neutral-700 transition-colors hover:text-black"
            >
              Read →
            </Link>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
