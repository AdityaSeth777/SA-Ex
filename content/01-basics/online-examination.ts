import { CaseStudy } from "@/lib/types";

export const onlineExamination: CaseStudy = {
  slug: "online-examination",
  level: "basic",
  title: "Online Examination System",
  tagline: "Students log in, answer questions, and submit results.",
  scenario:
    "A university wants students to take exams online: log in, view a set of questions, submit their answers before time runs out, and have their results stored for grading.",
  requirements: [
    "Student login",
    "View exam questions",
    "Submit answers",
    "Store results securely",
    "Prevent submitting after the time limit",
  ],
  mermaid:
    "flowchart LR\n  Student --> Frontend\n  Frontend --> Backend\n  Backend --> Database[(Database)]",
  components: [
    {
      name: "Frontend",
      description:
        "Shows the login form, the exam questions with a timer, and the submit button.",
      glossaryKey: "frontend",
    },
    {
      name: "Backend",
      description:
        "Verifies login credentials, serves the correct question set, checks the time limit, and records submitted answers.",
      glossaryKey: "backend",
    },
    {
      name: "Database",
      description:
        "Stores student accounts, question banks, and each student's submitted answers and results.",
      glossaryKey: "database",
    },
  ],
  flow: [
    { step: 1, title: "Student logs in", description: "The frontend sends credentials to the backend, which checks them against the database." },
    { step: 2, title: "Backend loads the exam", description: "Questions for this exam are fetched from the database and sent to the frontend." },
    { step: 3, title: "Student answers questions", description: "Answers are held in the frontend as the student works, with a countdown timer running." },
    { step: 4, title: "Student submits", description: "The frontend sends all answers to the backend before the time limit expires." },
    { step: 5, title: "Backend stores the result", description: "Answers are saved to the database and marked as submitted, so they can't be changed again." },
  ],
  thinkAboutIt: [
    { question: "What should happen if a student's internet disconnects right before they submit?", hint: "Consider whether the frontend should auto-save answers periodically, so a disconnect doesn't lose everything." },
    { question: "How would the system stop a student from submitting after time is up?", hint: "Relying only on the frontend's timer is risky - the backend should also check the actual submission time against the exam's end time." },
    { question: "What happens if 500 students all start the exam at the exact same time?", hint: "Every one of those logins and question-loads hits the backend and database at once - this is where a single backend server could become a bottleneck." },
  ],
  whatIf: [
    { question: "What happens if one backend server fails during the exam?", affectedComponent: "Backend", consequence: "Every student connected to that server loses the ability to load questions or submit answers - with only one server, there's no backup to take over." },
  ],
  sourcePath: "content/01-basics/online-examination.ts",
};
