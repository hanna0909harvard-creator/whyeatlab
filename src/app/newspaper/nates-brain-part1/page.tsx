import Link from "next/link";
import type { ReactNode } from "react";

const INK = "#2A1810";
const CREAM = "#FFF3DC";
const YELLOW = "#FFD23F";
const RED = "#C9301C";
const PINK = "#FF8FA3";
const DARK_TEXT = "#1A1210";

function Eyebrow({ color }: { color: string }) {
  return (
    <div
      style={{
        fontFamily: "'Bangers', cursive",
        fontSize: "clamp(20px, 4vw, 32px)",
        letterSpacing: "2px",
        color,
      }}
    >
      NATE&apos;S BRAIN
    </div>
  );
}

function Bubble({
  bg,
  color,
  border,
  children,
}: {
  bg: string;
  color: string;
  border?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        display: "inline-block",
        background: bg,
        color,
        border,
        borderRadius: "24px",
        padding: "28px 32px",
        fontSize: "clamp(22px, 5vw, 34px)",
        fontWeight: 800,
        lineHeight: 1.3,
      }}
    >
      {children}
    </div>
  );
}

function Card({
  bg,
  color,
  children,
}: {
  bg: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <div
      className="mx-auto flex w-full max-w-[680px] flex-col justify-center overflow-hidden"
      style={{
        aspectRatio: "1080 / 1350",
        backgroundColor: bg,
        color,
        padding: "9% 8%",
        fontFamily: "'Archivo', sans-serif",
      }}
    >
      {children}
    </div>
  );
}

export default function NatesBrainPart1Page() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=Bangers&display=swap"
      />

      <div className="bg-white px-6 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-[680px]">
          <Link
            href="/newspaper"
            className="text-sm text-neutral-700 transition-colors hover:text-black"
          >
            ← Back to Newspaper
          </Link>

          <h1
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 900,
              color: DARK_TEXT,
            }}
            className="mb-10 mt-8 text-3xl sm:text-4xl"
          >
            NATE&apos;S BRAIN — Part 1
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          {/* Card 1 — cover */}
          <Card bg={INK} color={CREAM}>
            <div className="flex flex-col gap-10 sm:gap-14">
              <Eyebrow color={YELLOW} />
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(36px, 9vw, 72px)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-1px",
                }}
              >
                Are we drinking coffee,
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(22px, 5vw, 36px)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                }}
              >
                or are we soothing a brain that has lost its ability to{" "}
                <span style={{ color: PINK }}>self-recover?</span>
              </p>
            </div>
          </Card>

          {/* Card 2 — meet Nate */}
          <Card bg={CREAM} color={DARK_TEXT}>
            <div className="flex flex-col gap-8 sm:gap-10">
              <Eyebrow color={RED} />
              <div
                style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: "clamp(80px, 22vw, 180px)",
                  lineHeight: 1,
                  color: RED,
                }}
              >
                ×3
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(20px, 4.5vw, 32px)",
                  fontWeight: 800,
                  lineHeight: 1.3,
                }}
              >
                Nate, who drinks 3 cups of double-shot espresso a day
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(20px, 4.5vw, 32px)",
                  fontWeight: 800,
                  lineHeight: 1.3,
                }}
              >
                Nate doesn&apos;t want to wake up in the morning.
              </p>
            </div>
          </Card>

          {/* Card 3 — Hi, I'm Nate's brain */}
          <Card bg={YELLOW} color={DARK_TEXT}>
            <div className="flex flex-col items-start gap-6">
              <Bubble bg="#FFFFFF" color={DARK_TEXT} border={`4px solid ${DARK_TEXT}`}>
                Hi, I&apos;m Nate&apos;s brain.
              </Bubble>
              <Bubble bg={DARK_TEXT} color={CREAM}>
                I have something to tell you guys.
              </Bubble>
            </div>
          </Card>

          {/* Card 4 — ZAP */}
          <Card bg={INK} color={CREAM}>
            <div className="flex flex-col gap-10 sm:gap-14">
              <div
                style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: "clamp(56px, 15vw, 120px)",
                  lineHeight: 1,
                  color: YELLOW,
                }}
              >
                ⚡ ZAP!
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(22px, 5vw, 34px)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                Every morning, Nate gives me a{" "}
                <span style={{ color: YELLOW }}>massive electric shock</span>{" "}
                with a double-shot espresso.
              </p>
            </div>
          </Card>

          {/* Card 5 — think about it */}
          <Card bg={CREAM} color={DARK_TEXT}>
            <Bubble bg="#FFFFFF" color={DARK_TEXT} border={`4px solid ${DARK_TEXT}`}>
              Think about it: you don&apos;t want to wake up, but suddenly
              someone zaps your brain with a shock machine—
              <span style={{ color: RED }}>do you like that?</span>
            </Bubble>
          </Card>

          {/* Card 6 — No. */}
          <Card bg={RED} color={CREAM}>
            <div className="flex flex-col gap-10 sm:gap-14">
              <div
                style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: "clamp(80px, 20vw, 160px)",
                  lineHeight: 1,
                  color: YELLOW,
                }}
              >
                No.
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(22px, 5vw, 34px)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                It&apos;s terrifying because it&apos;s such a shock.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(22px, 5vw, 34px)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                I do move only because I&apos;m so shocked—
              </p>
            </div>
          </Card>

          {/* Card 7 — pissed off */}
          <Card bg={INK} color={CREAM}>
            <div className="flex flex-col gap-10">
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(26px, 6vw, 42px)",
                  fontWeight: 800,
                  lineHeight: 1.25,
                  color: YELLOW,
                }}
              >
                And after that, I get insanely pissed off.
              </p>
              <div style={{ height: "2px", background: "rgba(255,243,220,0.3)" }} />
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(20px, 4.5vw, 30px)",
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}
              >
                After an hour or two, irritability surges up.—
              </p>
            </div>
          </Card>

          {/* Card 8 — close your mouth */}
          <Card bg={CREAM} color={DARK_TEXT}>
            <div className="flex flex-col gap-10">
              <Bubble bg={DARK_TEXT} color={CREAM}>
                &ldquo;Nutrition in coffee&rdquo; or whatever—
                <span style={{ color: YELLOW }}>close your mouth.</span>
              </Bubble>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(20px, 4.5vw, 30px)",
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                Is the main reason you drink coffee for nutrition? For
                antioxidants?
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Bangers', cursive",
                  fontSize: "clamp(48px, 13vw, 100px)",
                  lineHeight: 1,
                  color: RED,
                }}
              >
                No, it&apos;s not.
              </p>
            </div>
          </Card>

          {/* Card 9 — second round */}
          <Card bg={INK} color={CREAM}>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(26px, 6vw, 40px)",
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              After lunch, Nate{" "}
              <span style={{ color: YELLOW }}>
                tortures me with coffee again
              </span>{" "}
              for a second round, even though I&apos;m already annoyed as
              hell.
            </p>
          </Card>

          {/* Card 10 — exhausted */}
          <Card bg={CREAM} color={DARK_TEXT}>
            <div className="flex flex-col gap-8">
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(24px, 5.5vw, 38px)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                I&apos;m already exhausted and have no strength left to move.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(24px, 5.5vw, 38px)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                I&apos;m so fatigued that{" "}
                <span style={{ background: YELLOW, padding: "0 6px" }}>
                  adenosine
                </span>
                ...
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
