import Image from "next/image";
import Link from "next/link";

const TESTIMONIALS = [
  {
    name: "Sarah K.",
    quote:
      "“I always thought I had no willpower. Turns out I was just eating my loneliness. Understanding why changed everything.”",
  },
  {
    name: "James L.",
    quote:
      "“This is the first program that didn't hand me a meal plan. It handed me a mirror instead. Uncomfortable, but exactly what I needed.”",
  },
  {
    name: "Mia P.",
    quote:
      "“I used to eat to calm my anxiety without even noticing. Now I notice the urge before I open the fridge.”",
  },
];

function PersonIcon() {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-300 text-neutral-500">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="h-10 w-10"
      >
        <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5Zm0 2c-3.87 0-9 1.94-9 5.5V22h18v-2.5c0-3.56-5.13-5.5-9-5.5Z" />
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* 1. Opening hero section */}
      <section className="flex h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <div
          className="opacity-0 [animation-delay:0.1s] [animation-duration:1.5s] [animation-fill-mode:forwards] [animation-name:fade-in] [animation-timing-function:ease-out]"
        >
          <Image
            src="/whyeatlablogo_nobg.png"
            alt="Why Eat Logo"
            width={612}
            height={408}
            priority
            className="h-auto w-72 sm:w-96"
          />
        </div>
        <p
          className="mt-6 text-lg text-neutral-600 opacity-0 [animation-delay:1.4s] [animation-duration:1.2s] [animation-fill-mode:forwards] [animation-name:fade-in] [animation-timing-function:ease-out] sm:text-xl"
        >
          We don&apos;t ask what you eat. We ask why.
        </p>
      </section>

      {/* 2. Brand intro section */}
      <section className="mx-auto max-w-2xl px-6 py-24 text-center sm:px-10">
        <div className="mx-auto mb-16 h-px w-16 bg-neutral-200" />

        <h2 className="mb-6 text-3xl font-medium sm:text-4xl">
          We see WHY eat.
        </h2>
        <p className="text-lg leading-relaxed text-neutral-600">
          Why Eat is a brand that explores the relationship between food,
          emotion, and your nervous system. We help you understand yourself
          first — before changing what&apos;s on your plate.
        </p>

        <div className="mx-auto mt-16 h-px w-16 bg-neutral-200" />
      </section>

      {/* 3. Testimony section */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <h2 className="mb-12 text-center text-3xl font-medium sm:text-4xl">
          What people say
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col items-center rounded-2xl bg-sage-100 px-8 py-10 text-center shadow-sm"
            >
              <PersonIcon />
              <p className="mt-6 text-neutral-700 italic leading-relaxed">
                {testimonial.quote}
              </p>
              <p className="mt-4 text-sm font-medium text-sage-700">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CTA section */}
      <section className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-6 bg-sage-800 px-8 py-20 text-center text-white">
          <h3 className="text-2xl font-medium sm:text-3xl">
            Have questions?
          </h3>
          <Link
            href="/contact"
            className="rounded-full border border-white px-6 py-2.5 text-sm transition-colors hover:bg-white hover:text-sage-800"
          >
            Contact us
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 bg-sage-900 px-8 py-20 text-center text-white">
          <h3 className="text-2xl font-medium sm:text-3xl">
            Explore our program
          </h3>
          <Link
            href="/product"
            className="rounded-full border border-white px-6 py-2.5 text-sm transition-colors hover:bg-white hover:text-sage-900"
          >
            View program
          </Link>
        </div>
      </section>
    </div>
  );
}
