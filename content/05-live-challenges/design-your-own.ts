import { LiveChallenge } from "@/lib/types";

export const designYourOwnChallenge: LiveChallenge = {
  slug: "design-your-own-system",
  title: "Design Your Own System",
  expectedLearning: "Open-ended architecture design and justification",
  scenario:
    "Pick one system below and design an architecture for it from scratch, using the Architecture Playground. There is no single hidden 'right answer' here — be ready to explain and justify your choices.",
  requirements: [
    "Choose one system: Instagram-like application, Food delivery, Online gaming, Cloud storage, or College management system",
    "Identify the core user-facing features first",
    "Decide which components you need, and why",
    "Be ready to explain what would break first as usage grows",
  ],
  constraints: [
    "Keep your diagram to a reasonable number of components — focus on justifying each one",
  ],
  questions: [
    "What are the 3-4 core features your system absolutely must support?",
    "For each component in your diagram, what specific problem does it solve?",
    "If your system suddenly got 10x more users, what would you change first?",
  ],
  designOptions: [
    "Instagram-like application",
    "Food delivery",
    "Online gaming",
    "Cloud storage",
    "College management system",
  ],
  sourcePath: "content/05-live-challenges/design-your-own.ts",
};
