import Image from "next/image";
import Link from "next/link";

const IMAGE_COUNT = 10;

export default function NatesBrainPart1Page() {
  return (
    <div className="bg-white px-6 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[680px]">
        <Link
          href="/newspaper"
          className="text-sm text-neutral-700 transition-colors hover:text-black"
        >
          ← Newspaper
        </Link>

        <h1 className="mb-1 mt-8 text-4xl font-medium sm:text-5xl">
          Nate&apos;s Brain
        </h1>
        <p className="mb-10 text-lg text-muted">Part 1</p>
      </div>

      <div className="mx-auto flex max-w-[680px] flex-col gap-2">
        {Array.from({ length: IMAGE_COUNT }, (_, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <Image
              key={num}
              src={`/card-news/nates-brain-part1/${num}.png`}
              alt={`Nate's Brain — Part 1, card ${i + 1}`}
              width={1080}
              height={1350}
              priority={i === 0}
              style={{ width: "100%", height: "auto", aspectRatio: "4 / 5" }}
              sizes="(min-width: 680px) 680px, 100vw"
            />
          );
        })}
      </div>
    </div>
  );
}
