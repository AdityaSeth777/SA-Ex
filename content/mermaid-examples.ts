import { MermaidExample } from "@/lib/types";

export const mermaidExamples: MermaidExample[] = [
  {
    title: "A basic box",
    code: "flowchart LR\n  A[Frontend]",
    explanation:
      "Square brackets [ ] draw a simple box. The text inside is just a label — give it a short, clear name.",
  },
  {
    title: "A database shape",
    code: "flowchart LR\n  DB[(Database)]",
    explanation:
      "Wrapping the label in [( )] draws a cylinder — the standard shape for a database in architecture diagrams.",
  },
  {
    title: "A simple arrow",
    code: "flowchart LR\n  A --> B",
    explanation:
      "--> draws an arrow from A to B, showing that A sends something to B (a request, data, etc.).",
  },
  {
    title: "A labelled arrow",
    code: 'flowchart LR\n  A -->|Request| B',
    explanation:
      "Put text between pipes |like this| on an arrow to describe what's flowing through it.",
  },
  {
    title: "Chaining multiple components",
    code: "flowchart LR\n  User --> Frontend\n  Frontend --> Backend\n  Backend --> Database[(Database)]",
    explanation:
      "Each line is one connection. Stack lines to build a full request path from the user to the database.",
  },
  {
    title: "Grouping with a subgraph",
    code: "flowchart LR\n  User --> LB[Load Balancer]\n  subgraph Servers\n    S1[Server 1]\n    S2[Server 2]\n  end\n  LB --> S1\n  LB --> S2\n  S1 --> DB[(Database)]\n  S2 --> DB",
    explanation:
      "subgraph Name ... end visually groups related boxes together — useful for showing 'these are all backend servers.'",
  },
];
