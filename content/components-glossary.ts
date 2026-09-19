import { ComponentGlossaryEntry } from "@/lib/types";

export const componentGlossary: ComponentGlossaryEntry[] = [
  {
    key: "client",
    name: "Client",
    whatIsIt:
      "The device or app the user is directly using — a browser, a phone app, or a desktop app.",
    whyNeeded:
      "Every system needs a starting point where a real person interacts with it.",
    example:
      "Like a customer walking up to a restaurant counter — they're the one making the request.",
    diagram: "flowchart LR\n  Client --> System[Rest of the System]",
    highlightLabel: "Client",
  },
  {
    key: "frontend",
    name: "Frontend",
    whatIsIt:
      "The visual interface the user sees and interacts with — buttons, forms, pages.",
    whyNeeded:
      "Someone needs to translate what the user does (clicks, typing) into requests the system understands.",
    example:
      "Like the menu and counter display at a restaurant — it's how you place your order, not the kitchen itself.",
    diagram: "flowchart LR\n  User --> Frontend --> Backend",
    highlightLabel: "Frontend",
  },
  {
    key: "backend",
    name: "Backend",
    whatIsIt:
      "The server-side program that processes requests, runs business logic, and talks to the database.",
    whyNeeded:
      "Raw data and rules need somewhere to live that isn't directly exposed to (or trusted from) the user's device.",
    example:
      "Like the kitchen at a restaurant — it takes the order and actually prepares it, following recipes and rules.",
    diagram: "flowchart LR\n  Frontend --> Backend --> Database",
    highlightLabel: "Backend",
  },
  {
    key: "api",
    name: "API",
    whatIsIt:
      "A defined set of rules for how the frontend (or other systems) can ask the backend to do something.",
    whyNeeded:
      "It gives frontend and backend a shared contract, so either side can change internally without breaking the other.",
    example:
      "Like a restaurant order slip format — the waiter always writes orders the same way, so the kitchen always knows how to read them.",
    diagram: "flowchart LR\n  Frontend -->|API request| Backend",
    highlightLabel: "API",
  },
  {
    key: "database",
    name: "Database",
    whatIsIt:
      "Where the system permanently stores and organizes data — users, orders, messages, and more.",
    whyNeeded:
      "Data needs to survive after a request finishes, and be reliably searchable and updatable later.",
    example:
      "Like a restaurant's filing cabinet of customer orders and inventory — nothing is remembered if it isn't written down somewhere.",
    diagram: "flowchart LR\n  Backend --> Database[(Database)]",
    highlightLabel: "Database",
  },
  {
    key: "cache",
    name: "Cache",
    whatIsIt:
      "A small, very fast storage layer that keeps a temporary copy of frequently requested data.",
    whyNeeded:
      "Fetching the same data from the database repeatedly is slow and wasteful; a cache serves it almost instantly instead.",
    example:
      "Like a waiter keeping today's most-ordered dish already plated and ready, instead of cooking it from scratch every single time.",
    diagram: "flowchart LR\n  Backend --> Cache\n  Backend --> Database[(Database)]",
    highlightLabel: "Cache",
  },
  {
    key: "loadBalancer",
    name: "Load Balancer",
    whatIsIt:
      "A component that receives incoming requests and distributes them across multiple backend servers.",
    whyNeeded:
      "One server can only handle so many requests at once; spreading the load keeps the system fast and available.",
    example:
      "Like a host at a busy restaurant directing each new customer to whichever open table (server) is free.",
    diagram:
      "flowchart LR\n  Client --> LB[Load Balancer]\n  LB --> S1[Server 1]\n  LB --> S2[Server 2]",
    highlightLabel: "Load Balancer",
  },
  {
    key: "messageQueue",
    name: "Message Queue",
    whatIsIt:
      "A waiting line where tasks are placed so they can be processed later, often by a separate worker, without making the user wait.",
    whyNeeded:
      "Some tasks (sending emails, processing videos) take too long to do immediately while the user waits for a response.",
    example:
      "Like a restaurant kitchen's order tickets on a spike — the waiter drops off the ticket and moves on, and a cook processes it in order.",
    diagram:
      "flowchart LR\n  Backend --> Queue[Message Queue]\n  Queue --> Worker",
    highlightLabel: "Message Queue",
  },
  {
    key: "objectStorage",
    name: "Object Storage",
    whatIsIt:
      "A storage system built specifically for large files — images, videos, documents — rather than structured rows of data.",
    whyNeeded:
      "Databases are optimized for small structured records, not gigabyte-sized video files; object storage is built for exactly that.",
    example:
      "Like a restaurant's separate warehouse for bulk supplies, instead of trying to stuff sacks of rice into the same filing cabinet as receipts.",
    diagram: "flowchart LR\n  Backend --> Storage[(Object Storage)]",
    highlightLabel: "Object Storage",
  },
  {
    key: "cdn",
    name: "CDN (Content Delivery Network)",
    whatIsIt:
      "A network of servers spread across many locations worldwide that deliver static content (images, videos, files) from a location near the user.",
    whyNeeded:
      "Sending every file from one central server to users around the world is slow; a nearby copy loads much faster.",
    example:
      "Like a restaurant chain having a branch in every city, instead of making every customer travel to the one original location.",
    diagram: "flowchart LR\n  User --> CDN --> Storage[(Object Storage)]",
    highlightLabel: "CDN",
  },
  {
    key: "auth",
    name: "Authentication",
    whatIsIt:
      "The part of the system that checks who a user is (login) and what they're allowed to do.",
    whyNeeded:
      "Systems need to know who is making a request before deciding whether to allow it — protecting data and personalizing access.",
    example:
      "Like a restaurant checking a reservation or membership card before letting you into a private dining room.",
    diagram: "flowchart LR\n  Client --> Auth[Authentication] --> Backend",
    highlightLabel: "Authentication",
  },
];

export function getGlossaryEntry(key: string) {
  return componentGlossary.find((c) => c.key === key);
}
