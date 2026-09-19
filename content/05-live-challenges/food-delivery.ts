import { LiveChallenge } from "@/lib/types";

export const foodDeliveryChallenge: LiveChallenge = {
  slug: "food-delivery",
  title: "Food Delivery Application",
  expectedLearning: "Multiple backend components / database",
  scenario:
    "Design a system connecting three groups: customers browsing restaurants and placing orders, restaurants receiving orders, and riders picking up and delivering them.",
  requirements: [
    "Browse restaurants",
    "Place orders",
    "Track order",
    "Restaurant receives order",
  ],
  constraints: [
    "Assume one mid-sized city, a few hundred restaurants and riders",
    "Order status must update in something close to real time for the customer",
  ],
  questions: [
    "Should order-taking and rider-matching be the same backend logic, or separate?",
    "How does a restaurant find out about a new order?",
    "How would you track order status changes without constantly overloading the database?",
  ],
  reference: {
    mermaid:
      "flowchart LR\n  Customer --> Backend\n  Restaurant --> Backend\n  Rider --> Backend\n  Backend --> Database[(Database)]\n  Backend --> Matching[Rider Matching Logic]",
    components: [
      { name: "Backend", description: "Handles order placement, restaurant notifications, and status updates." },
      { name: "Rider Matching Logic", description: "Finds an available rider near the restaurant for a new order." },
      { name: "Database", description: "Stores restaurants, orders, and delivery status." },
    ],
    flow: [
      { step: 1, title: "Order placed", description: "Customer's order is validated and saved by the backend." },
      { step: 2, title: "Restaurant notified", description: "The restaurant's screen polls or is pushed the new order." },
      { step: 3, title: "Rider matched", description: "Matching logic finds a nearby available rider and assigns the delivery." },
      { step: 4, title: "Status updates", description: "As the order moves through stages (preparing → picked up → delivered), the database is updated and the customer sees the change." },
    ],
    whyEachExists: [
      "Matching logic is called out separately from general order handling because finding a nearby available rider is a distinct, more specialized problem than saving an order.",
      "A single shared database for orders keeps all three sides (customer, restaurant, rider) looking at one consistent source of truth for status.",
    ],
    alternatives: [
      "At small scale, a single backend handling orders, notifications, and matching together is perfectly reasonable - splitting into separate services becomes worthwhile mainly at higher scale (see the 1M-scale version of this problem).",
    ],
  },
  sourcePath: "content/05-live-challenges/food-delivery.ts",
};
