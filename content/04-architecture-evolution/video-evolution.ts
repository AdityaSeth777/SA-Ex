import { EvolutionCaseStudy } from "@/lib/types";

export const videoEvolution: EvolutionCaseStudy = {
  slug: "video-platform-evolution",
  title: "Video Streaming Platform",
  intro:
    "A video platform's architecture changes dramatically as the audience — and the size of the video files being served — grows.",
  versions: [
    {
      version: 1,
      label: "Version 1",
      scale: "A Few Hundred Views a Day",
      mermaid:
        "flowchart LR\n  Viewer --> Server\n  Server --> Storage[(Storage)]",
      explanation:
        "A single server can store video files directly and serve them straight to viewers. At low traffic, there's no real difference yet between 'storage' and 'the database' — one server does it all.",
    },
    {
      version: 2,
      label: "Version 2",
      scale: "Tens of Thousands of Views a Day",
      mermaid:
        "flowchart LR\n  Viewer --> LB[Load Balancer]\n  LB --> S1[Server 1]\n  LB --> S2[Server 2]\n  S1 --> Storage[(Object Storage)]\n  S2 --> Storage\n  S1 --> DB[(Metadata Database)]\n  S2 --> DB",
      explanation:
        "Video files move into dedicated object storage, separate from metadata (titles, views) in a proper database. Multiple servers behind a load balancer handle the growing number of upload and browse requests.",
      newComponents: ["Load Balancer", "Object Storage", "Metadata Database"],
    },
    {
      version: 3,
      label: "Version 3",
      scale: "Millions of Views a Day, Worldwide",
      mermaid:
        "flowchart LR\n  Viewer --> CDN\n  CDN --> Storage[(Object Storage)]\n  Viewer --> LB[Load Balancer]\n  LB --> S1[Server 1]\n  LB --> S2[Server 2]\n  S1 --> DB[(Metadata Database)]\n  S2 --> DB\n  S1 --> Queue[Processing Queue]\n  Queue --> Workers[Transcoding Workers]\n  Workers --> Storage",
      explanation:
        "Serving video directly from one storage location to viewers worldwide is now far too slow — a CDN caches video near each viewer instead. Uploads are queued for background processing (transcoding into multiple qualities) rather than handled instantly, so upload servers stay responsive.",
      newComponents: ["CDN", "Processing Queue", "Transcoding Workers"],
    },
  ],
  sourcePath: "content/04-architecture-evolution/video-evolution.ts",
};
