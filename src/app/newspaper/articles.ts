export type Article = {
  slug: string;
  title: string;
  date: string;
  preview: string;
  content: string;
  closing: string;
  // Card-news articles (vertical scroll of designed cards) render via a
  // dedicated page at src/app/newspaper/<slug>/page.tsx instead of the
  // plain-text layout in [slug]/page.tsx — content/closing stay empty.
  cardNews?: boolean;
};

export const articles: Article[] = [
  {
    slug: "nates-brain-part1",
    title: "Nate's Brain — Part 1",
    date: "October 28, 2026",
    preview:
      "Are we drinking coffee, or are we soothing a brain that has lost its ability to self-recover?",
    content: "",
    closing: "",
    cardNews: true,
  },
  {
    slug: "why-do-we-eat",
    title: "Why do we eat?",
    date: "September 4, 2026",
    preview:
      "Eating should be done when we are truly hungry, feeling genuine hunger.",
    content: `Eating should be done when we are truly hungry, feeling genuine hunger.

Yet, I was stressed out again today, and I ended up eating. It was unbearable to endure the emptiness of my emotions, so I ate and ate, even glucose syrup.

However, those things made my heart even heavier. The three seconds of pleasure as the glucose syrup went down left an artificial taste on my tongue, serving as a link that invited another Coke, which in turn triggered a chain reaction calling for spicy flavors. After eating spicy Buldak, I drank sweet Coke again, then had salty chips packed with chemical flavors. In the end, a disaster that could have been prevented by just drinking two cups of water turned into a two-hour binge. Ah, how sad. Why am I like this?

The sequence and habits of eating during times of stress are crucial because they dictate how the brain is triggered. I cannot explain it scientifically, so I will put it in my own terms. If I had drunk hot water packed with sea salt and lemon when stressed, I would not have reached a double- no, triple stress level, filled to bursting like I am right now as I write this. The electrolytes in the salt and the tangy bite of the lemon would have brought a fresh sensation to my brain and my angry organs—especially my liver—putting a stop to this hours-long relay feast of glucose syrup. Why do we eat? Track your mouth's reactions during times of stress for one month.

I will start this one-month tracking first.`,
    closing: "— Clutching my stomach, which feels like it's about to burst",
  },
  {
    slug: "life-energy-and-nutritional-energy",
    title: "Life Energy and Nutritional Energy",
    date: "October 23, 2026",
    preview:
      "Are life energy and nutritional energy the same? What is the difference between looking at something through the concept of nutritional energy and looking at it through the concept of life energy?",
    content: `Are life energy and nutritional energy the same?
What is the difference between looking at something through the concept of nutritional energy and looking at it through the concept of life energy?

Let me give an example.
Farmer A runs an egg business, selling eggs at the market.
He runs a cage-free farm.
Since the hens are raised indoors, they don't have to go outside. Square feet is required per hen.
They are simply raised indoors, eating feed.
Either way, it can meet the standard of being an "egg."
Since it comes out in the form of an egg, you can call it an egg.

However, the egg I'm looking for is a complete food: amino acids, cysteine, biotin, meaning good-quality biotin and selenium, the real living nutrients passed on to the hen by earthworms that grew up eating soil. To eat those, it has to be that kind of egg. That is the egg I'm looking for.
Not eggs laid by hens raised on feed made in a factory from artificial nutrients.

It's an egg from a hen that runs around the grass in the morning, on grass with no herbicide sprayed on it. A hen that grew up on soil rich in earthworms, eating grass and bugs.
All nutrition comes from soil in the end. We are soil. So we are eating soil. That is the essence, in the end.

But things raised from a "nutrition" point of view are just nutritional feed. For hens raised locked up indoors, the strange phrase "cage-free" is used. It's language that creates a strange illusion that these hens weren't raised confined.

But does a hen that grew up never leaving a big space, a house, have any life energy? The life energy of a hen that runs around outside, gets plenty of sunlight, makes noise, and hunts bugs to eat... and "cage-free" by itself just means a hen raised inside a house...

I want to eat real eggs filled with life energy.`,
    closing: "",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
