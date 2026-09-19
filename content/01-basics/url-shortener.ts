import { CaseStudy } from "@/lib/types";

export const urlShortener: CaseStudy = {
  slug: "url-shortener",
  level: "basic",
  title: "URL Shortener",
  tagline: "Turn a long URL into a short one that redirects back to it.",
  scenario:
    "Users can enter a long URL and receive a short URL. When another user visits the short URL, they should be redirected to the original URL.",
  requirements: [
    "Create short URLs from long ones",
    "Redirect users from a short URL to the original",
    "Store URL mappings",
    "Handle multiple users creating links at once",
    "Avoid generating the same short code twice",
  ],
  mermaid:
    "flowchart LR\n  User --> Frontend\n  Frontend --> Backend\n  Backend --> Database[(Database)]",
  components: [
    {
      name: "Frontend",
      description:
        "A simple form where users paste a long URL and receive back a short one to copy.",
      glossaryKey: "frontend",
    },
    {
      name: "Backend",
      description:
        "Generates a unique short code for each long URL, and looks up the original URL when a short one is visited.",
      glossaryKey: "backend",
    },
    {
      name: "Database",
      description:
        "Stores the mapping between each short code and its original long URL.",
      glossaryKey: "database",
    },
  ],
  flow: [
    { step: 1, title: "User enters a URL", description: "The frontend collects the long URL from the user." },
    { step: 2, title: "Frontend sends request to backend", description: "The long URL is sent to the backend to be shortened." },
    { step: 3, title: "Backend generates short ID", description: "The backend creates a short, unique code for this URL." },
    { step: 4, title: "Backend stores mapping in database", description: "The short code and long URL pair is saved so it can be looked up later." },
    { step: 5, title: "Short URL is returned to user", description: "The frontend shows the new short URL, ready to share." },
  ],
  thinkAboutIt: [
    { question: "What happens if 1,000 users access the system simultaneously?", hint: "Every visit to a short URL requires a database lookup - at high volume, this lookup path is worth watching closely." },
    { question: "Which component could become a bottleneck?", hint: "Since short-URL visits vastly outnumber URL creations in most real systems, the read path (redirect lookups) is usually the first pressure point." },
    { question: "Could we have more than one backend server?", hint: "Yes - since the backend doesn't need to remember anything between requests (it just reads/writes the database), running several copies behind something that spreads traffic between them works well." },
    { question: "Where could caching help?", hint: "Popular short links get visited constantly - keeping their mappings in a fast, temporary store avoids hitting the database every single time." },
  ],
  whatIf: [
    { question: "What happens if the same piece of data is requested millions of times?", affectedComponent: "Database", consequence: "A single wildly popular short link could flood the database with identical lookup queries - a cache in front of the database would absorb almost all of that traffic instead." },
  ],
  sourcePath: "content/01-basics/url-shortener.ts",
};
