import { CaseStudy } from "@/lib/types";

export const rideBooking: CaseStudy = {
  slug: "ride-booking-application",
  level: "intermediate",
  title: "Ride Booking Application",
  tagline: "Match riders with nearby drivers and track trips live.",
  disclaimer:
    "Simplified architecture inspired by typical ride-booking apps - not the exact internal design of any specific company.",
  scenario:
    "Riders request a trip, the system finds a nearby available driver, and both sides track the trip's progress until it's complete.",
  requirements: [
    "Rider requests a ride",
    "Match the rider with a nearby driver",
    "Track a trip's location live",
    "Log in as a rider or driver (authentication)",
    "Handle many ride requests across a city at once",
    "Store trip and payment records reliably",
  ],
  mermaid:
    "flowchart LR\n  Rider --> LB[Load Balancer]\n  Driver --> LB\n  LB --> S1[Backend Server 1]\n  LB --> S2[Backend Server 2]\n  S1 --> Auth[Authentication]\n  S2 --> Auth\n  S1 --> Cache[Live Location Cache]\n  S2 --> Cache\n  S1 --> Queue[Message Queue]\n  S2 --> Queue\n  Queue --> DB[(Database)]",
  components: [
    { name: "Load Balancer", description: "Spreads rider and driver traffic across backend servers.", glossaryKey: "loadBalancer" },
    { name: "Backend Servers", description: "Handle ride requests, matching logic, and trip status updates.", glossaryKey: "backend" },
    { name: "Authentication", description: "Confirms whether someone is a verified rider or driver before letting them request or accept trips.", glossaryKey: "auth" },
    { name: "Live Location Cache", description: "Holds each driver's current GPS position, which updates every few seconds - too frequently to write straight to the main database.", glossaryKey: "cache" },
    { name: "Message Queue", description: "Buffers trip events (started, completed, payment) so they're reliably recorded without slowing down the live matching flow.", glossaryKey: "messageQueue" },
    { name: "Database", description: "Stores completed trip history, ratings, and payment records.", glossaryKey: "database" },
  ],
  flow: [
    { step: 1, title: "Rider requests a trip", description: "The request goes through the load balancer to an available backend server." },
    { step: 2, title: "Backend finds nearby drivers", description: "It checks the live location cache for available drivers close to the rider." },
    { step: 3, title: "A driver accepts", description: "The backend confirms the match and both rider and driver apps start receiving live updates." },
    { step: 4, title: "Location updates stream in", description: "The driver's position keeps updating in the location cache throughout the trip." },
    { step: 5, title: "Trip ends and is recorded", description: "A trip-completed event is queued and then written to the database, along with the payment record." },
  ],
  thinkAboutIt: [
    { question: "Why keep live driver locations in a cache instead of the main database?", hint: "Position updates happen every few seconds per driver - across a whole city that's an enormous number of tiny, frequent writes, which a fast cache handles far better than a durable database." },
    { question: "What happens during rush hour when ride requests spike in one part of a city?", hint: "More backend servers help handle request volume, but the matching logic itself also needs to search efficiently among many nearby drivers at once." },
    { question: "Why use a queue for trip-completed events instead of writing directly to the database?", hint: "It decouples the fast-moving live-trip experience from the database write, so a slow write never delays the rider or driver's app." },
  ],
  whatIf: [
    { question: "What happens if traffic suddenly becomes 10x larger?", affectedComponent: "Backend Servers", consequence: "More servers can be added behind the load balancer, but the matching logic and location cache both need to keep up with far more simultaneous searches and updates." },
  ],
  sourcePath: "content/02-intermediate/ride-booking.ts",
};
