import { EvolutionCaseStudy } from "@/lib/types";

export const chatEvolution: EvolutionCaseStudy = {
  slug: "chat-application-evolution",
  title: "Chat Application",
  intro:
    "The same feature — real-time messaging — needs a very different architecture depending on how many people are using it at once.",
  versions: [
    {
      version: 1,
      label: "Version 1",
      scale: "100 Users",
      mermaid: "flowchart LR\n  Client --> Server\n  Server --> Database[(Database)]",
      explanation:
        "A single backend server may be sufficient for a small system. One server can easily handle 100 users' connections and messages, and one database can store all their history without strain.",
    },
    {
      version: 2,
      label: "Version 2",
      scale: "10,000 Users",
      mermaid:
        "flowchart LR\n  Client --> LB[Load Balancer]\n  LB --> Server1[Server 1]\n  LB --> Server2[Server 2]\n  LB --> Server3[Server 3]\n  Server1 --> DB[(Database)]\n  Server2 --> DB\n  Server3 --> DB",
      explanation:
        "One server now starts to strain under 10,000 users' worth of connections and messages. A load balancer spreads users across multiple servers, and all of them share the same database, since it can still comfortably keep up at this scale.",
      newComponents: ["Load Balancer", "Multiple Backend Servers"],
    },
    {
      version: 3,
      label: "Version 3",
      scale: "1 Million Users",
      mermaid:
        "flowchart LR\n  Client --> LB[Load Balancer]\n  LB --> S1[Server 1]\n  LB --> S2[Server 2]\n  LB --> S3[Server N]\n  S1 --> Cache[Presence Cache]\n  S2 --> Cache\n  S3 --> Cache\n  S1 --> Queue[Message Queue]\n  S2 --> Queue\n  S3 --> Queue\n  Queue --> DB[(Database)]\n  S1 --> Storage[(Object Storage)]\n  S2 --> Storage",
      explanation:
        "At a million users, the database alone can no longer keep up with direct writes from every server, and tracking who's online becomes its own challenge. A message queue smooths out the flood of messages before they're saved, a cache handles fast-changing presence data, and object storage holds shared files separately from message text.",
      newComponents: ["Message Queue", "Presence Cache", "Object Storage"],
    },
  ],
  sourcePath: "content/04-architecture-evolution/chat-evolution.ts",
};
