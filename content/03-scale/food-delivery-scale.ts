import { CaseStudy } from "@/lib/types";

export const foodDeliveryScale: CaseStudy = {
  slug: "large-scale-food-delivery",
  level: "scale",
  title: "Large-scale Food Delivery Platform",
  tagline: "Thousands of restaurants, riders, and orders, live, city-wide.",
  disclaimer:
    "Simplified architecture inspired by large food delivery platforms — not a reproduction of any company's actual production architecture.",
  scenario:
    "The food ordering system from before now needs to coordinate three sides at once — customers, thousands of restaurants, and a large fleet of delivery riders — in real time, across many cities.",
  requirements: [
    "Customers browse restaurants and place orders",
    "Restaurants receive and confirm orders instantly",
    "Riders are matched and dispatched to pick up and deliver orders",
    "Track order and delivery status live",
    "Handle huge order volume during peak hours (e.g. dinner rush)",
    "Keep order, payment, and delivery records durable",
  ],
  mermaid:
    "flowchart LR\n  Customer --> LB[Load Balancer]\n  Restaurant --> LB\n  Rider --> LB\n  LB --> S1[Order Servers]\n  LB --> S2[Dispatch Servers]\n  S1 --> Queue[Order Queue]\n  Queue --> S2\n  S2 --> Cache[Live Rider Location Cache]\n  S1 --> Cache2[Restaurant Menu Cache]\n  S1 --> DB[(Orders Database)]\n  S2 --> DB",
  components: [
    { name: "Load Balancer", description: "Spreads the combined traffic from customers, restaurants, and riders across servers.", glossaryKey: "loadBalancer" },
    { name: "Order Servers", description: "Handle browsing, cart, and order placement from the customer side.", glossaryKey: "backend" },
    { name: "Dispatch Servers", description: "Match new orders with an available nearby rider and track delivery progress.", glossaryKey: "backend" },
    { name: "Order Queue", description: "Holds newly placed orders so dispatch can process matching without customer-facing servers waiting on it.", glossaryKey: "messageQueue" },
    { name: "Live Rider Location Cache", description: "Tracks where every active rider currently is, updated every few seconds.", glossaryKey: "cache" },
    { name: "Restaurant Menu Cache", description: "Keeps frequently viewed restaurant menus ready to serve quickly instead of querying the database each time.", glossaryKey: "cache" },
    { name: "Orders Database", description: "Stores completed and in-progress orders, payments, and delivery outcomes durably.", glossaryKey: "database" },
  ],
  flow: [
    { step: 1, title: "Customer places an order", description: "The order server validates it and places it on the order queue." },
    { step: 2, title: "Dispatch picks up the order", description: "A dispatch server reads from the queue and searches the rider location cache for someone nearby." },
    { step: 3, title: "Restaurant is notified", description: "The restaurant confirms they can prepare the order." },
    { step: 4, title: "Rider is matched and dispatched", description: "The rider heads to the restaurant, with their location cache updating live throughout." },
    { step: 5, title: "Order is delivered and recorded", description: "Once delivered, the full order/delivery record is saved to the orders database." },
  ],
  thinkAboutIt: [
    { question: "Why separate order servers from dispatch servers instead of one backend doing everything?", hint: "Order placement and rider matching have very different load patterns and urgency — separating them lets each scale and be tuned independently." },
    { question: "What happens during a dinner rush when order volume spikes heavily in one city?", hint: "The order queue smooths out the burst for dispatch, but if riders are genuinely scarce in that area, no architecture change fixes a real-world shortage of available riders." },
    { question: "Why cache restaurant menus separately from live rider locations?", hint: "They have very different update frequencies and access patterns — menus change rarely and are read constantly, while rider locations change constantly and are read by nearby matching logic." },
  ],
  whatIf: [
    { question: "What happens if one dispatch server fails mid-shift?", affectedComponent: "Dispatch Servers", consequence: "In-flight matching on that server is disrupted, but the load balancer routes new requests to healthy servers, and orders already recorded in the database aren't lost." },
    { question: "What happens if traffic suddenly becomes 10x larger?", affectedComponent: "Order Queue", consequence: "The queue absorbs the burst of incoming orders so nothing is dropped, but dispatch and rider capacity still ultimately limit how fast those orders can actually be fulfilled." },
  ],
  sourcePath: "content/03-scale/food-delivery-scale.ts",
};
