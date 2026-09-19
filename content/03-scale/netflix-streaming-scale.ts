import { CaseStudy } from "@/lib/types";

export const netflixStreamingScale: CaseStudy = {
  slug: "netflix-like-streaming-platform",
  level: "scale",
  title: "Netflix-like Streaming Platform",
  tagline: "A curated catalog streamed smoothly to a global audience.",
  disclaimer:
    "Simplified architecture inspired by a Netflix-like system - not a reproduction of any company's actual production architecture.",
  scenario:
    "Unlike a user-upload platform, this system streams a curated, pre-processed catalog of shows and movies to a large global audience, prioritizing smooth playback over live uploads.",
  requirements: [
    "Stream pre-processed video smoothly worldwide",
    "Support personalized browsing and recommendations",
    "Adapt video quality to each viewer's connection speed",
    "Handle huge simultaneous viewership (e.g. a popular new release)",
    "Stay available across regions and device types",
    "Track viewing progress and preferences per user",
  ],
  mermaid:
    "flowchart LR\n  Viewer --> CDN\n  Viewer --> LB[Load Balancer]\n  LB --> S1[App Servers]\n  S1 --> Cache[Catalog / Recommendation Cache]\n  S1 --> DB[(User & Catalog Database)]\n  CDN --> ProcessedStorage[(Processed Video Storage)]\n  Studio[Content Team] --> Pipeline[Encoding Pipeline]\n  Pipeline --> ProcessedStorage",
  components: [
    { name: "CDN", description: "Delivers the actual video stream to viewers from a location near them - this carries almost all the heavy playback traffic.", glossaryKey: "cdn" },
    { name: "Load Balancer", description: "Spreads app requests (browsing, search, account actions) across app servers.", glossaryKey: "loadBalancer" },
    { name: "App Servers", description: "Handle browsing, search, recommendations, and playback session setup - not the video bytes themselves.", glossaryKey: "backend" },
    { name: "Catalog / Recommendation Cache", description: "Keeps frequently accessed catalog data and personalized recommendations ready to serve quickly.", glossaryKey: "cache" },
    { name: "User & Catalog Database", description: "Stores accounts, viewing history, preferences, and the show/movie catalog.", glossaryKey: "database" },
    { name: "Encoding Pipeline", description: "Processes new content into multiple quality levels ahead of time, before it's ever streamed to a viewer.", glossaryKey: "backend" },
    { name: "Processed Video Storage", description: "Holds the fully processed video files that the CDN pulls from and caches.", glossaryKey: "objectStorage" },
  ],
  flow: [
    { step: 1, title: "Viewer opens the app", description: "App servers, behind the load balancer, return personalized recommendations pulled from cache when possible." },
    { step: 2, title: "Viewer selects a title", description: "The app server sets up a playback session and tells the client which CDN endpoint to stream from." },
    { step: 3, title: "Video streams from the CDN", description: "The heavy video data flows from a nearby CDN location, adapting quality to the viewer's connection." },
    { step: 4, title: "Progress is recorded", description: "Playback progress and preferences are written back to the database for continuing later." },
    { step: 5, title: "New content is added ahead of time", description: "The encoding pipeline processes new shows/movies into ready-to-stream formats before release, well before any viewer requests them." },
  ],
  thinkAboutIt: [
    { question: "Why process (encode) all content in advance rather than on-demand like a live-upload platform?", hint: "Since the catalog is curated rather than user-generated in real time, there's no need to react instantly to a fresh upload - content can be fully prepared before anyone watches it." },
    { question: "What happens when a hugely anticipated new release drops and everyone streams it at once?", hint: "Because playback traffic goes through the CDN rather than the app servers, this kind of spike mostly stresses CDN capacity rather than the core backend." },
    { question: "Why separate the recommendation/catalog cache from the main database?", hint: "Recommendations are read extremely often but change less often - a cache serves that pattern far more efficiently than repeatedly querying the full database." },
  ],
  whatIf: [
    { question: "What happens if traffic suddenly becomes 10x larger (e.g. a viral new season)?", affectedComponent: "CDN", consequence: "The CDN, built for exactly this kind of high-repeat-viewing spike, absorbs almost all of the extra load, largely insulating the app servers and database." },
    { question: "What happens if an app server fails?", affectedComponent: "App Servers", consequence: "Ongoing video streams are unaffected since they run through the CDN - only browsing/account actions on that server are interrupted, and the load balancer routes around it." },
  ],
  sourcePath: "content/03-scale/netflix-streaming-scale.ts",
};
