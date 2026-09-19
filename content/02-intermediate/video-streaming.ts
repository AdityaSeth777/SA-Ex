import { CaseStudy } from "@/lib/types";

export const videoStreaming: CaseStudy = {
  slug: "video-streaming-platform",
  level: "intermediate",
  title: "Video Streaming Platform",
  tagline: "Upload, store, and stream videos to many viewers.",
  disclaimer:
    "Simplified architecture inspired by typical video platforms — not the exact internal design of any specific company.",
  scenario:
    "Creators upload videos, and viewers stream them. The system needs to store large video files and deliver them smoothly to many viewers at once.",
  requirements: [
    "Upload videos",
    "Store videos reliably",
    "Stream videos to viewers",
    "Handle many simultaneous viewers",
    "Keep playback smooth regardless of viewer location",
  ],
  mermaid:
    "flowchart LR\n  Creator --> LB[Load Balancer]\n  LB --> S1[Backend Server 1]\n  LB --> S2[Backend Server 2]\n  S1 --> Storage[(Object Storage)]\n  S2 --> Storage\n  Storage --> CDN\n  Viewer --> CDN\n  S1 --> DB[(Database)]\n  S2 --> DB",
  components: [
    { name: "Load Balancer", description: "Distributes upload and browsing requests across backend servers.", glossaryKey: "loadBalancer" },
    { name: "Backend Servers", description: "Handle uploads, video metadata (titles, descriptions), and coordinate where files get stored.", glossaryKey: "backend" },
    { name: "Object Storage", description: "Stores the actual video files, which can be gigabytes in size each.", glossaryKey: "objectStorage" },
    { name: "CDN", description: "Caches and delivers video content from locations near each viewer, so streaming doesn't depend on distance to one central server.", glossaryKey: "cdn" },
    { name: "Database", description: "Stores video metadata — titles, descriptions, view counts, and which storage file each video maps to.", glossaryKey: "database" },
  ],
  flow: [
    { step: 1, title: "Creator uploads a video", description: "The file goes through a backend server into object storage; metadata is saved to the database." },
    { step: 2, title: "Video becomes available", description: "Object storage makes the file accessible, and the CDN can now cache and serve it." },
    { step: 3, title: "Viewer opens the video", description: "The frontend fetches metadata from the backend/database and starts streaming the actual video from the CDN." },
    { step: 4, title: "CDN serves the video", description: "The viewer receives video data from whichever CDN location is closest to them, not from the original storage directly." },
    { step: 5, title: "Repeat viewers reuse the cached copy", description: "Once the CDN has cached the video near a region, later viewers there get it even faster." },
  ],
  thinkAboutIt: [
    { question: "Why not stream every video directly from object storage to every viewer?", hint: "One central storage location serving millions of viewers worldwide would be slow for anyone far away, and could overload the storage system." },
    { question: "What happens if a video suddenly goes viral?", hint: "The CDN absorbing most of the repeated-viewing traffic is exactly what prevents the origin storage and backend from being overwhelmed." },
    { question: "Where could caching help beyond the CDN?", hint: "Frequently viewed metadata (titles, view counts) could also benefit from a cache in front of the database." },
  ],
  whatIf: [
    { question: "What happens if users upload huge files?", affectedComponent: "Object Storage", consequence: "Large uploads take longer and use more bandwidth and storage space — systems often process (compress/transcode) videos after upload rather than making viewers wait for the raw file." },
    { question: "What happens if the same piece of data is requested millions of times?", affectedComponent: "CDN", consequence: "This is exactly the case a CDN is built for — a popular video gets cached at edge locations so millions of views don't all hit the origin storage." },
  ],
  sourcePath: "content/02-intermediate/video-streaming.ts",
};
