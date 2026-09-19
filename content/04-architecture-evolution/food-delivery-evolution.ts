import { EvolutionCaseStudy } from "@/lib/types";

export const foodDeliveryEvolution: EvolutionCaseStudy = {
  slug: "food-delivery-evolution",
  title: "Food Delivery Platform",
  intro:
    "Delivering food for one restaurant is simple. Coordinating thousands of restaurants, customers, and riders across a city is a very different problem.",
  versions: [
    {
      version: 1,
      label: "Version 1",
      scale: "One Restaurant, ~50 Orders a Day",
      mermaid: "flowchart LR\n  Customer --> Server\n  Server --> Database[(Database)]",
      explanation:
        "One backend server takes orders and stores them; the restaurant checks the same database to see new orders. No matching or dispatch logic is needed yet - there's only one restaurant.",
    },
    {
      version: 2,
      label: "Version 2",
      scale: "Many Restaurants, One City",
      mermaid:
        "flowchart LR\n  Customer --> LB[Load Balancer]\n  Restaurant --> LB\n  Rider --> LB\n  LB --> S1[Server 1]\n  LB --> S2[Server 2]\n  S1 --> DB[(Database)]\n  S2 --> DB\n  S1 --> Cache[Menu Cache]",
      explanation:
        "Now there are many restaurants and a fleet of riders to coordinate, plus more customer traffic. Multiple servers behind a load balancer handle the load, and a cache keeps frequently viewed menus fast to load.",
      newComponents: ["Load Balancer", "Multiple Servers", "Menu Cache"],
    },
    {
      version: 3,
      label: "Version 3",
      scale: "Many Cities, Peak-Hour Order Spikes",
      mermaid:
        "flowchart LR\n  Customer --> LB[Load Balancer]\n  Restaurant --> LB\n  Rider --> LB\n  LB --> S1[Order Servers]\n  LB --> S2[Dispatch Servers]\n  S1 --> Queue[Order Queue]\n  Queue --> S2\n  S2 --> LocCache[Live Rider Location Cache]\n  S1 --> DB[(Orders Database)]\n  S2 --> DB",
      explanation:
        "At city-wide scale with sharp peak-hour spikes, order placement and rider dispatch are split into separate server groups so each can scale on its own. An order queue smooths out bursts, and a dedicated cache tracks constantly-updating live rider locations.",
      newComponents: ["Order Queue", "Dedicated Dispatch Servers", "Live Rider Location Cache"],
    },
  ],
  sourcePath: "content/04-architecture-evolution/food-delivery-evolution.ts",
};
