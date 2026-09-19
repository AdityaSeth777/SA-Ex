import { CaseStudy } from "@/lib/types";

export const chatApplication: CaseStudy = {
  slug: "chat-application",
  level: "intermediate",
  title: "Chat Application",
  tagline: "1-to-1 and group messaging with online status and history.",
  disclaimer:
    "Simplified architecture inspired by typical chat apps - not the exact internal design of any specific company.",
  scenario:
    "Users need to send direct and group messages to each other in real time, see who's online, and be able to scroll back through message history.",
  requirements: [
    "Send 1-to-1 messages",
    "Send group messages",
    "Show online/offline status",
    "Store and retrieve message history",
    "Deliver messages quickly to many users at once",
    "Handle a server going down without losing messages",
  ],
  mermaid:
    "flowchart LR\n  UserA[User A] --> LB[Load Balancer]\n  UserB[User B] --> LB\n  LB --> S1[Chat Server 1]\n  LB --> S2[Chat Server 2]\n  S1 --> Queue[Message Queue]\n  S2 --> Queue\n  Queue --> DB[(Database)]\n  S1 --> Cache[Online Status Cache]\n  S2 --> Cache",
  components: [
    { name: "Load Balancer", description: "Directs each user's connection to one of several chat servers.", glossaryKey: "loadBalancer" },
    { name: "Chat Servers", description: "Hold live connections and pass messages between users in real time.", glossaryKey: "backend" },
    { name: "Message Queue", description: "Holds messages briefly so they can be reliably written to the database, even if the database is momentarily slow.", glossaryKey: "messageQueue" },
    { name: "Database", description: "Stores every message permanently, so chat history can be loaded later.", glossaryKey: "database" },
    { name: "Online Status Cache", description: "Keeps track of who's currently online right now - this changes constantly, so it lives in fast, temporary storage rather than the main database.", glossaryKey: "cache" },
  ],
  flow: [
    { step: 1, title: "User A sends a message", description: "The message travels through the load balancer to whichever chat server User A is connected to." },
    { step: 2, title: "Chat server forwards it live", description: "If User B is online (checked via the status cache), the message is delivered instantly to their connection." },
    { step: 3, title: "Message is queued for storage", description: "The chat server also places the message on a queue so it gets saved even if User B is offline." },
    { step: 4, title: "Message is saved to the database", description: "A process reads from the queue and writes the message into permanent chat history." },
    { step: 5, title: "User B comes online later", description: "Their client loads recent history directly from the database." },
  ],
  thinkAboutIt: [
    { question: "Why not write every message straight to the database and skip the queue?", hint: "Writing directly means every message waits on the database; a queue lets the chat server hand off the message instantly and keep responding to users." },
    { question: "What happens if User A and User B are connected to two different chat servers?", hint: "The servers need a way to know about each other's connected users - often through a shared queue or a lookup service." },
    { question: "Why keep online status separate from the message database?", hint: "Status changes constantly (online/offline every few seconds) - storing that in the same place as permanent message history would create unnecessary write pressure there." },
  ],
  whatIf: [
    { question: "What happens if one chat server fails?", affectedComponent: "Chat Servers", consequence: "Users connected to it are disconnected and reconnect through the load balancer to a healthy server - messages already queued or saved are not lost." },
    { question: "What happens if traffic suddenly becomes 10x larger?", affectedComponent: "Chat Servers", consequence: "More chat servers can be added behind the load balancer, but the message queue and database also need to handle a proportionally larger write volume." },
  ],
  sourcePath: "content/02-intermediate/chat-application.ts",
};
