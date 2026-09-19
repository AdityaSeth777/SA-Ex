import { LiveChallenge } from "@/lib/types";

export const libraryManagementChallenge: LiveChallenge = {
  slug: "library-management",
  title: "Library Management System",
  expectedLearning: "Client / Backend / Database",
  scenario:
    "Design a system for a college library where students can search books, borrow them, return them, and staff can track who has what.",
  requirements: [
    "Search books",
    "Borrow books",
    "Return books",
    "Store student information",
  ],
  constraints: [
    "Assume a single campus library, a few thousand books, a few hundred active students",
    "No need to support multiple library branches",
  ],
  questions: [
    "What components does this system need, at minimum?",
    "What data would you store, and where?",
    "What happens if two students try to borrow the last copy of the same book at once?",
  ],
  reference: {
    mermaid:
      "flowchart LR\n  Student[Student / Staff] --> Frontend\n  Frontend --> Backend\n  Backend --> Database[(Database)]",
    components: [
      { name: "Frontend", description: "Search interface and borrow/return actions." },
      { name: "Backend", description: "Validates availability and updates records." },
      { name: "Database", description: "Stores books, students, and borrowing history." },
    ],
    flow: [
      { step: 1, title: "Search", description: "Frontend sends a search query to the backend, which checks the database." },
      { step: 2, title: "Borrow", description: "Backend checks availability, then marks the book borrowed and links it to the student." },
      { step: 3, title: "Return", description: "Backend marks the book available again and clears the borrowing record." },
    ],
    whyEachExists: [
      "A three-tier design (client/backend/database) is the simplest architecture that safely separates the user interface from the source of truth.",
      "Putting the borrow/availability check in the backend (not the frontend) keeps the rule enforced consistently, no matter which device is used.",
    ],
    alternatives: [
      "A design with a cache for popular book searches would also be reasonable if search volume were much higher.",
      "Some designs might separate 'catalog' and 'circulation' (borrowing) into different backend services — valid, but likely unnecessary at this scale.",
    ],
  },
  sourcePath: "content/05-live-challenges/library-management.ts",
};
