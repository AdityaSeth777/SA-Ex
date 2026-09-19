import { LiveChallenge } from "@/lib/types";

export const chatApplicationScaleChallenge: LiveChallenge = {
  slug: "chat-application-1m-users",
  title: "Chat Application — 1 Million Users",
  expectedLearning: "Scaling decisions under massive concurrency",
  scenario:
    "Same requirements as the earlier Chat Application challenge — 1-to-1 messaging, group messaging, online status, message history — but now roughly 1 million users are connected at the same time.",
  requirements: [
    "1-to-1 messaging",
    "Group messaging",
    "Online status",
    "Message history",
    "Support ~1 million concurrent connections",
  ],
  constraints: [
    "A single server cannot hold a million connections",
    "A single database cannot take a direct write for every message from every server",
  ],
  questions: [
    "What changes in your architecture from the smaller version?",
    "Which single component from your first design is most likely to break first at this scale, and why?",
    "What new component(s) would you introduce, and what specific problem does each one solve?",
  ],
  reference: {
    mermaid:
      "flowchart LR\n  Users --> LB[Load Balancer]\n  LB --> G1[Server 1]\n  LB --> G2[Server 2]\n  LB --> G3[Server N]\n  G1 --> Queue[Message Queue]\n  G2 --> Queue\n  G3 --> Queue\n  Queue --> Workers[Processing Workers]\n  Workers --> DB[(Sharded Database)]\n  G1 --> Cache[Presence Cache]\n  G2 --> Cache\n  G3 --> Cache",
    components: [
      { name: "Load Balancer", description: "Spreads a million connections across many servers." },
      { name: "Servers", description: "Each holds a portion of the total connections and routes messages between them." },
      { name: "Message Queue", description: "Absorbs the message volume so servers aren't blocked waiting on storage." },
      { name: "Processing Workers", description: "Write queued messages into the database." },
      { name: "Sharded Database", description: "Splits message storage across multiple machines, since one can't hold or serve it all." },
      { name: "Presence Cache", description: "Tracks online status for a huge number of users." },
    ],
    flow: [
      { step: 1, title: "Connect", description: "Load balancer assigns the user to one of many servers." },
      { step: 2, title: "Send", description: "Server delivers live and queues the message for storage." },
      { step: 3, title: "Store", description: "A worker writes it into the correct database shard." },
    ],
    whyEachExists: [
      "Every new component here solves a specific bottleneck that appears only once you cross from thousands to millions of users — none of them are needed at the smaller scale.",
      "This is exactly the same underlying problem as the smaller chat app — the requirements haven't changed, only the scale has.",
    ],
    alternatives: [
      "There are many valid ways to shard the database (by user, by channel, by region) — the right choice depends on how data is typically accessed.",
      "Some designs might use a pub/sub system instead of a queue for live delivery between servers — both are reasonable depending on trade-offs discussed in class.",
    ],
  },
  sourcePath: "content/05-live-challenges/chat-application-scale.ts",
};
