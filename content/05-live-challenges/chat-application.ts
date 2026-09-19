import { LiveChallenge } from "@/lib/types";

export const chatApplicationChallenge: LiveChallenge = {
  slug: "chat-application",
  title: "Chat Application",
  expectedLearning: "Real-time communication / message queues / databases",
  scenario:
    "Design a system supporting 1-to-1 messaging, group messaging, online status, and message history.",
  requirements: [
    "1-to-1 messaging",
    "Group messaging",
    "Online status",
    "Message history",
  ],
  constraints: [
    "Assume a moderate user base (tens of thousands), not yet at massive scale",
  ],
  questions: [
    "How is delivering a message different from storing a message?",
    "Where would you track who's currently online, and why not in the same place as message history?",
    "What happens if the recipient is offline when a message is sent?",
  ],
  reference: {
    mermaid:
      "flowchart LR\n  UserA[User A] --> Server\n  UserB[User B] --> Server\n  Server --> Cache[Online Status Cache]\n  Server --> Database[(Database)]",
    components: [
      { name: "Server", description: "Holds live connections and routes messages between users." },
      { name: "Online Status Cache", description: "Tracks who's currently connected, separate from permanent history." },
      { name: "Database", description: "Stores message history durably." },
    ],
    flow: [
      { step: 1, title: "Send", description: "Server delivers the message live if the recipient is connected, and saves it to the database regardless." },
      { step: 2, title: "Catch up", description: "An offline user loads missed messages from the database once they reconnect." },
    ],
    whyEachExists: [
      "Online status is separated from message storage because it changes far more frequently and doesn't need the same durability guarantees.",
      "Saving every message to the database (not just delivering it live) is what makes message history and offline delivery possible.",
    ],
    alternatives: [
      "At larger scale, a message queue between the server and database (see the 1M-user version of this challenge) becomes important - but for a moderate user base, writing directly to the database is a reasonable simplification.",
    ],
  },
  sourcePath: "content/05-live-challenges/chat-application.ts",
};
