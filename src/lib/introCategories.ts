export type CategoryId =
  | "HUNGRY"
  | "SURVIVE"
  | "STRESS"
  | "HEAL"
  | "CONTROL"
  | "FORGET"
  | "BORING"
  | "EMOTION";

export type Question = {
  text: string;
  options: string[];
};

export type Category = {
  id: CategoryId;
  label: string;
  questions: Question[];
};

// Canonical order — drives both the Step 3 selection list and the order
// questions are asked in across multiple selected categories in Step 4.
export const CATEGORIES: Category[] = [
  {
    id: "HUNGRY",
    label: "Hungry",
    questions: [
      {
        text: "When do you usually feel hungry?",
        options: [
          "① Morning (6AM - 9AM)",
          "② Lunch (11AM - 1PM)",
          "③ Afternoon (3PM - 5PM)",
          "④ Evening (7PM - 10PM)",
        ],
      },
      {
        text: "What do you feel like eating?",
        options: [
          "① Fresh food (fruit, watermelon, strawberries...)",
          "② Something indulgent (chocolate, bread, snacks, specific drinks)",
          "③ Fast food (pasta, pizza, burger)",
          "④ Meat",
        ],
      },
    ],
  },
  {
    id: "SURVIVE",
    label: "Survive",
    questions: [
      {
        text: "At home, work, or in relationships — what emotion makes you want to eat?",
        options: ["① Hopeless", "② Sad", "③ Frustrated", "④ Nervous"],
      },
      {
        text: "When during the day do you feel this and eat?",
        options: [
          "① 6AM - 10AM",
          "② 11AM - 2PM",
          "③ 3PM - 5:30PM",
          "④ 7:30PM - 10:30PM",
        ],
      },
    ],
  },
  {
    id: "STRESS",
    label: "Stress",
    questions: [
      {
        text: "When do you feel stressed and want to eat?",
        options: [
          "① At work / job or business",
          "② In relationships",
          "③ Daily tasks",
        ],
      },
    ],
  },
  {
    id: "HEAL",
    label: "Healing",
    questions: [
      {
        text: "What kind of nutrition care do you practice?",
        options: [
          "① Regular supplement intake",
          "② Regular meal times",
          "③ Avoiding processed food",
          "④ A specific diet",
        ],
      },
    ],
  },
  {
    id: "CONTROL",
    label: "Control",
    questions: [
      {
        text: "When do you want to take control?",
        options: [
          "① When I'm angry",
          "② When I'm sad",
          "③ When I feel helpless",
          "④ When I feel depressed",
        ],
      },
    ],
  },
  {
    id: "FORGET",
    label: "Forget",
    questions: [
      {
        text: "When do you want to forget and eat?",
        options: [
          "① When I'm sad",
          "② When I'm in pain",
          "③ When I'm angry",
          "④ When there's something I need to resolve",
        ],
      },
    ],
  },
  {
    id: "BORING",
    label: "Bored",
    questions: [
      {
        text: "When do you feel bored and eat?",
        options: [
          "① When I'm alone",
          "② When I feel lonely",
          "③ When I don't want to think",
        ],
      },
    ],
  },
  {
    id: "EMOTION",
    label: "Emotion",
    questions: [
      {
        text: "Which emotion makes you want to fill yourself?",
        options: [
          "① When I'm sad",
          "② When I'm angry",
          "③ When things don't go as planned",
          "④ When I have something to resolve",
          "⑤ When I want to talk to someone",
          "⑥ When I want to feel warmth",
          "⑦ When I need comfort",
          "⑧ When a childhood memory comes up",
          "⑨ Hopeless",
          "⑩ When I don't want to feel anything",
        ],
      },
    ],
  },
];

export function getCategory(id: CategoryId): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
