import { CaseStudy } from "@/lib/types";

export const ecommerce: CaseStudy = {
  slug: "ecommerce-platform",
  level: "intermediate",
  title: "E-commerce Platform",
  tagline: "Browse products, check out, and handle many shoppers at once.",
  disclaimer:
    "Simplified architecture inspired by typical e-commerce platforms - not the exact internal design of any specific company.",
  scenario:
    "An online store needs to handle many shoppers browsing products, adding to cart, and checking out at the same time - including during sales when traffic spikes heavily.",
  requirements: [
    "Browse and search products",
    "Add items to a cart and check out",
    "Log in and manage an account (authentication)",
    "Store product images reliably",
    "Stay fast and available under heavy traffic",
    "Store orders, users, and inventory reliably",
  ],
  mermaid:
    "flowchart LR\n  User --> CDN\n  CDN --> LB[Load Balancer]\n  LB --> S1[Backend Server 1]\n  LB --> S2[Backend Server 2]\n  S1 --> Auth[Authentication]\n  S2 --> Auth\n  S1 --> Cache\n  S2 --> Cache\n  S1 --> DB[(Database)]\n  S2 --> DB\n  S1 --> Storage[(Object Storage)]\n  S2 --> Storage",
  components: [
    { name: "CDN", description: "Delivers product images quickly to shoppers everywhere, without every image request hitting the main servers.", glossaryKey: "cdn" },
    { name: "Load Balancer", description: "Spreads incoming shopper traffic across multiple backend servers so no single one is overwhelmed.", glossaryKey: "loadBalancer" },
    { name: "Backend Servers", description: "Multiple identical servers handle browsing, cart, and checkout requests in parallel.", glossaryKey: "backend" },
    { name: "Authentication", description: "Confirms who each shopper is when they log in, so orders and saved carts are tied to the right account.", glossaryKey: "auth" },
    { name: "Cache", description: "Keeps popular product listings and details ready to serve instantly, instead of querying the database every time.", glossaryKey: "cache" },
    { name: "Database", description: "Stores product catalog, user accounts, orders, and current inventory counts.", glossaryKey: "database" },
    { name: "Object Storage", description: "Holds the actual product image and video files, separate from the structured order/user data.", glossaryKey: "objectStorage" },
  ],
  flow: [
    { step: 1, title: "Shopper loads the storefront", description: "Product images load from the CDN; the page requests product data through the load balancer." },
    { step: 2, title: "Load balancer picks a server", description: "The request is routed to whichever backend server has capacity." },
    { step: 3, title: "Backend checks the cache first", description: "If the product listing is already cached, it's returned immediately; otherwise the database is queried and the result is cached." },
    { step: 4, title: "Shopper logs in and adds to cart", description: "Authentication verifies the shopper's identity before cart and checkout actions proceed." },
    { step: 5, title: "Shopper checks out", description: "The backend validates the order, updates inventory in the database, and records the new order." },
  ],
  thinkAboutIt: [
    { question: "What happens during a flash sale when traffic suddenly spikes 10x?", hint: "More backend servers behind the load balancer help, but a hot product's inventory count in the database still needs careful, safe updates so it doesn't oversell." },
    { question: "Why put a cache in front of the database instead of just adding more database servers?", hint: "A cache serves repeated reads far faster and cheaper than even a well-tuned database, especially for data that doesn't change every second." },
    { question: "Why store product images separately from the database?", hint: "Databases are optimized for structured, searchable records - not for storing and streaming large binary files efficiently." },
  ],
  whatIf: [
    { question: "What happens if one backend server fails?", affectedComponent: "Backend Servers", consequence: "The load balancer detects the failure and stops sending it traffic - shoppers keep shopping through the remaining servers, just with slightly less capacity." },
    { question: "What happens if the cache goes down?", affectedComponent: "Cache", consequence: "Every request falls back to the database directly - the site still works, but noticeably slower, and the database takes on much more load." },
  ],
  sourcePath: "content/02-intermediate/ecommerce.ts",
};
