import { LiveChallenge } from "@/lib/types";

export const onlineExaminationChallenge: LiveChallenge = {
  slug: "online-examination",
  title: "Online Examination System",
  expectedLearning: "Authentication / Backend / Database",
  scenario:
    "Design a system where students log in, view exam questions, submit their answers before a time limit, and results are stored for grading.",
  requirements: [
    "Student login",
    "View questions",
    "Submit answers",
    "Store results",
  ],
  constraints: [
    "Assume up to a few hundred students taking the same exam at the same scheduled time",
    "Answers must not be editable after submission or after time runs out",
  ],
  questions: [
    "Where should login/identity checking happen, and why there specifically?",
    "How would you prevent a student from submitting after time is up?",
    "What happens if hundreds of students start the exam in the same minute?",
  ],
  reference: {
    mermaid:
      "flowchart LR\n  Student --> Frontend\n  Frontend --> Auth[Authentication]\n  Auth --> Backend\n  Backend --> Database[(Database)]",
    components: [
      { name: "Frontend", description: "Login form, question view, and submission." },
      { name: "Authentication", description: "Verifies the student's identity before granting access to the exam." },
      { name: "Backend", description: "Serves questions, enforces the time limit server-side, and records submissions." },
      { name: "Database", description: "Stores accounts, question banks, and results." },
    ],
    flow: [
      { step: 1, title: "Login", description: "Authentication checks credentials before the frontend can load any exam content." },
      { step: 2, title: "Exam loads", description: "Backend fetches the correct question set from the database." },
      { step: 3, title: "Submit", description: "Backend checks the actual submission time against the exam's end time before accepting the answers." },
    ],
    whyEachExists: [
      "Authentication is separated conceptually from general backend logic because 'who is this user' is a distinct concern from 'what should happen with their answers.'",
      "The time-limit check must live in the backend, not just the frontend's visible timer, since a student could otherwise bypass a client-side-only check.",
    ],
    alternatives: [
      "A single backend that also handles login (no separate auth step) is a reasonable simplification for a small system.",
      "For very high concurrency, some designs would add caching for the (mostly static) question sets.",
    ],
  },
  sourcePath: "content/05-live-challenges/online-examination.ts",
};
