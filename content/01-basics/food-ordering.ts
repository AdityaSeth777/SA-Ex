import { CaseStudy } from "@/lib/types";

export const foodOrdering: CaseStudy = {
  slug: "food-ordering",
  level: "basic",
  title: "Food Ordering System",
  tagline: "Browse a menu, place an order, and have it recorded.",
  scenario:
    "A single restaurant wants a simple app: customers browse the menu, add items to a cart, and place an order that the kitchen can see and prepare.",
  requirements: [
    "Browse the menu",
    "Add items to a cart",
    "Place an order",
    "Store orders so the kitchen can see them",
    "Handle multiple customers ordering at once",
  ],
  mermaid:
    "flowchart LR\n  Customer --> Frontend\n  Frontend --> Backend\n  Backend --> Database[(Database)]",
  components: [
    {
      name: "Frontend",
      description:
        "The menu browsing screen, cart, and checkout button customers use.",
      glossaryKey: "frontend",
    },
    {
      name: "Backend",
      description:
        "Validates the order (items exist, prices are correct) and saves it so it can be picked up by the kitchen.",
      glossaryKey: "backend",
    },
    {
      name: "Database",
      description:
        "Stores the menu, and every order placed along with its status (received, preparing, ready).",
      glossaryKey: "database",
    },
  ],
  flow: [
    { step: 1, title: "Customer browses the menu", description: "The frontend fetches the current menu from the backend." },
    { step: 2, title: "Customer builds a cart", description: "Item selections are held in the frontend as the customer adds to their order." },
    { step: 3, title: "Customer places the order", description: "The frontend sends the full order to the backend." },
    { step: 4, title: "Backend validates and saves it", description: "The backend checks the order makes sense, then stores it in the database as a new order." },
    { step: 5, title: "Kitchen sees the order", description: "A kitchen-facing screen reads new orders from the same database." },
  ],
  thinkAboutIt: [
    { question: "What happens if 1,000 users access the system simultaneously?", hint: "During a lunch rush, many customers browsing and ordering at once puts sustained load on both the backend and the database." },
    { question: "Which component could become a bottleneck?", hint: "If the menu is re-fetched from the database on every single page view, that read pattern repeats unnecessarily often." },
    { question: "Could we have more than one backend server?", hint: "Yes - order placement doesn't depend on which server handled the previous request, so multiple backend copies can share the load." },
    { question: "Where could caching help?", hint: "The menu rarely changes minute-to-minute, so it's a good candidate to keep in a fast cache instead of querying the database every time." },
  ],
  sourcePath: "content/01-basics/food-ordering.ts",
};
