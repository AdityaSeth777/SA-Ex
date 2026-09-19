import { LiveChallenge } from "@/lib/types";

export const urlShortenerChallenge: LiveChallenge = {
  slug: "url-shortener",
  title: "URL Shortener",
  expectedLearning: "Request flow and database mapping",
  scenario:
    "Design a system where users submit a long URL and get back a short one, and visiting the short URL redirects to the original.",
  requirements: [
    "Create a short URL from a long one",
    "Redirect visitors from the short URL to the original",
    "Ensure short codes are unique",
  ],
  constraints: [
    "Assume redirects vastly outnumber URL creations (a typical real-world pattern)",
  ],
  questions: [
    "Walk through, step by step, exactly what happens when someone visits a short URL.",
    "Where in this flow could things go wrong under heavy traffic?",
    "Would you design creation and redirecting as the same backend logic, or different?",
  ],
  reference: {
    mermaid:
      "flowchart LR\n  User --> Frontend\n  Frontend --> Backend\n  Backend --> Database[(Database)]",
    components: [
      { name: "Frontend", description: "Form to submit a long URL and display the resulting short one." },
      { name: "Backend", description: "Generates short codes and resolves short codes back to original URLs." },
      { name: "Database", description: "Stores the short-code-to-URL mapping." },
    ],
    flow: [
      { step: 1, title: "Create", description: "Backend generates a unique code and stores the mapping in the database." },
      { step: 2, title: "Visit", description: "Backend looks up the code in the database and redirects the browser to the original URL." },
    ],
    whyEachExists: [
      "This is the minimal architecture that satisfies the requirements - nothing here is optional at small scale.",
      "The redirect path (read) and the creation path (write) share the same backend and database in this simple version, since traffic doesn't yet justify separating them.",
    ],
    alternatives: [
      "A cache in front of the database is a natural next step once popular links are visited very frequently - see the case study version of this problem for that discussion.",
    ],
  },
  sourcePath: "content/05-live-challenges/url-shortener.ts",
};
