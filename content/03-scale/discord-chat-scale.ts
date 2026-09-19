import { CaseStudy } from "@/lib/types";

export const discordChatScale: CaseStudy = {
  slug: "discord-like-chat-1m-users",
  level: "scale",
  title: "Discord-like Chat Application — 1M Users",
  tagline: "The same chat problem, but at massive concurrent scale.",
  disclaimer:
    "Simplified architecture inspired by a Discord-like system — not a reproduction of any company's actual production architecture.",
  scenario:
    "The same 1-to-1 and group chat features from before now need to support around a million concurrently connected users across thousands of communities, without message delivery slowing down.",
  requirements: [
    "Support ~1 million concurrent live connections",
    "Deliver messages in real time within and across servers",
    "Keep message history durable and fast to load",
    "Track online presence for huge numbers of users",
    "Stay available even if individual machines fail",
    "Route traffic efficiently to avoid overloading any single component",
  ],
  mermaid:
    "flowchart LR\n  Users --> LB[Load Balancer]\n  LB --> G1[Gateway Server 1]\n  LB --> G2[Gateway Server 2]\n  LB --> G3[Gateway Server N]\n  G1 --> Queue[Message Queue]\n  G2 --> Queue\n  G3 --> Queue\n  Queue --> Workers[Message Processing Workers]\n  Workers --> DB[(Sharded Database)]\n  G1 --> PresenceCache[Presence Cache]\n  G2 --> PresenceCache\n  G3 --> PresenceCache\n  Workers --> MediaStorage[(Object Storage)]\n  MediaStorage --> CDN\n  Users --> CDN",
  components: [
    { name: "Load Balancer", description: "Distributes the huge number of incoming connections across many gateway servers.", glossaryKey: "loadBalancer" },
    { name: "Gateway Servers", description: "Hold millions of persistent live connections and pass messages between connected users and channels.", glossaryKey: "backend" },
    { name: "Message Queue", description: "Absorbs the enormous volume of messages so gateway servers can keep responding instantly instead of waiting on storage.", glossaryKey: "messageQueue" },
    { name: "Message Processing Workers", description: "Read from the queue, apply logic (filtering, notifications), and write final messages into storage.", glossaryKey: "backend" },
    { name: "Sharded Database", description: "Message history is split ('sharded') across many database machines by community/channel, since no single database could hold or serve it all.", glossaryKey: "database" },
    { name: "Presence Cache", description: "Tracks online/offline/away status for huge numbers of users, updated constantly.", glossaryKey: "cache" },
    { name: "Object Storage + CDN", description: "Stores and delivers shared images, files, and attachments efficiently to users everywhere.", glossaryKey: "objectStorage" },
  ],
  flow: [
    { step: 1, title: "User connects", description: "The load balancer assigns their connection to one of many gateway servers." },
    { step: 2, title: "User sends a message", description: "The gateway server delivers it live to other connected members and places it on the queue for storage." },
    { step: 3, title: "Workers process the message", description: "A worker picks it up from the queue and writes it into the correct database shard for that channel." },
    { step: 4, title: "Offline members catch up later", description: "When they come online, their client loads recent history from the sharded database." },
    { step: 5, title: "Shared files load fast", description: "Attachments are served through the CDN rather than from a single central server." },
  ],
  thinkAboutIt: [
    { question: "Why split ('shard') the database instead of using one large database?", hint: "At this scale, no single machine can store or serve all messages fast enough — splitting by channel/community spreads the load across many machines." },
    { question: "What's the difference between the gateway servers here and the 'chat servers' in the smaller version?", hint: "The core idea is identical — the difference is quantity and coordination: many more instances, needing shared systems (queue, presence cache) to stay consistent with each other." },
    { question: "Why does presence status live in a cache instead of the sharded database?", hint: "Presence changes constantly for millions of users — that write pattern doesn't fit a durable, sharded store built for message history." },
  ],
  whatIf: [
    { question: "What happens if one gateway server fails?", affectedComponent: "Gateway Servers", consequence: "Only the users connected to that specific server are disconnected; they reconnect through the load balancer to a healthy server, and no messages already queued or stored are lost." },
    { question: "What happens if traffic suddenly becomes 10x larger?", affectedComponent: "Load Balancer / Gateway Servers", consequence: "More gateway servers can be added, but the message queue and database shards must also scale — otherwise they become the new bottleneck even with enough gateways." },
  ],
  sourcePath: "content/03-scale/discord-chat-scale.ts",
};
