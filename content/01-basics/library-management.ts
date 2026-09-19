import { CaseStudy } from "@/lib/types";

export const libraryManagement: CaseStudy = {
  slug: "library-management",
  level: "basic",
  title: "Library Management System",
  tagline: "Search, borrow, and return books from a shared catalog.",
  scenario:
    "A college library wants a system where students can search the book catalog, borrow available books, return them later, and where staff can keep track of who has which book.",
  requirements: [
    "Search the book catalog by title or author",
    "Show whether a book is available or already borrowed",
    "Let a student borrow an available book",
    "Let a student return a borrowed book",
    "Store student and book records reliably",
  ],
  mermaid: "flowchart LR\n  Student[Student / Staff] --> Frontend\n  Frontend --> Backend\n  Backend --> Database[(Database)]",
  components: [
    {
      name: "Frontend",
      description:
        "The catalog search page and 'borrow/return' buttons that students and staff use.",
      glossaryKey: "frontend",
    },
    {
      name: "Backend",
      description:
        "Checks whether a book is available, updates its status when borrowed or returned, and enforces rules (e.g. one copy can't be borrowed twice).",
      glossaryKey: "backend",
    },
    {
      name: "Database",
      description:
        "Stores every book's details and status, plus student records and borrowing history.",
      glossaryKey: "database",
    },
  ],
  flow: [
    { step: 1, title: "Student searches for a book", description: "The frontend sends the search text to the backend." },
    { step: 2, title: "Backend queries the database", description: "The backend looks up matching books and their availability." },
    { step: 3, title: "Results are shown", description: "The frontend displays matching books and whether each is available." },
    { step: 4, title: "Student borrows a book", description: "The backend checks availability, then marks the book as borrowed and links it to the student." },
    { step: 5, title: "Database is updated", description: "The book's status and the student's borrowed-books record are saved." },
  ],
  thinkAboutIt: [
    { question: "What happens if two students try to borrow the last copy of the same book at the exact same moment?", hint: "The backend needs to check-and-update availability as one safe step, not two separate steps, or both requests might succeed." },
    { question: "Should the search feature and the borrow feature use the same backend logic, or could they be separated?", hint: "For a system this small, one backend handling both is simplest — separation becomes useful only once each part needs to scale independently." },
    { question: "What data would you need to store for each book, and for each student?", hint: "Think about what's needed to search (title, author) versus what's needed to track borrowing (status, due date, borrower)." },
  ],
  whatIf: [
    { question: "What happens if the database goes down?", affectedComponent: "Database", consequence: "No searches, borrows, or returns can be processed — the backend has nowhere to read or write book records, so the whole system becomes unusable until it's back." },
  ],
  sourcePath: "content/01-basics/library-management.ts",
};
