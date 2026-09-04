const ARTICLE = {
  title: "Why do we eat?",
  date: "September 4, 2026",
  paragraphs: [
    "Eating should be done when we are truly hungry, feeling genuine hunger.",
    "Yet, I was stressed out again today, and I ended up eating. It was unbearable to endure the emptiness of my emotions, so I ate and ate, even glucose syrup.",
    "However, those things made my heart even heavier. The three seconds of pleasure as the glucose syrup went down left an artificial taste on my tongue, serving as a link that invited another Coke, which in turn triggered a chain reaction calling for spicy flavors. After eating spicy Buldak, I drank sweet Coke again, then had salty chips packed with chemical flavors. In the end, a disaster that could have been prevented by just drinking two cups of water turned into a two-hour binge. Ah, how sad. Why am I like this?",
    "The sequence and habits of eating during times of stress are crucial because they dictate how the brain is triggered. I cannot explain it scientifically, so I will put it in my own terms. If I had drunk hot water packed with sea salt and lemon when stressed, I would not have reached a double- no, triple stress level, filled to bursting like I am right now as I write this. The electrolytes in the salt and the tangy bite of the lemon would have brought a fresh sensation to my brain and my angry organs—especially my liver—putting a stop to this hours-long relay feast of glucose syrup. Why do we eat? Track your mouth's reactions during times of stress for one month.",
    "I will start this one-month tracking first.",
  ],
  closing: "— Clutching my stomach, which feels like it's about to burst",
};

export default function NewspaperPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
      <h1 className="mb-16 text-4xl font-medium sm:text-5xl">
        Why Eat: Newspaper
      </h1>

      <article className="mx-auto max-w-[680px] py-16 sm:py-24">
        <p className="text-sm text-muted">{ARTICLE.date}</p>
        <h2 className="mt-3 text-[36px] font-medium leading-snug">
          {ARTICLE.title}
        </h2>

        <div
          className="mt-12 text-neutral-900"
          style={{ fontSize: "18px", lineHeight: 1.9 }}
        >
          {ARTICLE.paragraphs.map((paragraph, i) => (
            <p key={i} className={i > 0 ? "mt-6" : ""}>
              {paragraph}
            </p>
          ))}
        </div>

        <p className="mt-10 text-right text-base italic text-muted">
          {ARTICLE.closing}
        </p>
      </article>
    </div>
  );
}
