import { LiveChallenge } from "@/lib/types";

export const videoStreamingChallenge: LiveChallenge = {
  slug: "video-streaming",
  title: "Video Streaming Platform",
  expectedLearning: "Object Storage / CDN / Cache",
  scenario:
    "Design a system where creators upload videos, the platform stores them, and millions of viewers stream them.",
  requirements: [
    "Upload videos",
    "Store videos",
    "Stream videos",
    "Support millions of users",
  ],
  constraints: [
    "Video files can be gigabytes in size",
    "Viewers are spread across many countries",
  ],
  questions: [
    "Why might storing videos in the same database as everything else be a bad idea?",
    "How would you make streaming fast for a viewer on the other side of the world from your servers?",
    "What happens to your design if one video suddenly goes viral?",
  ],
  reference: {
    mermaid:
      "flowchart LR\n  Creator --> Backend\n  Backend --> Storage[(Object Storage)]\n  Storage --> CDN\n  Viewer --> CDN\n  Backend --> DB[(Metadata Database)]",
    components: [
      { name: "Backend", description: "Handles uploads and video metadata." },
      { name: "Object Storage", description: "Stores the large video files themselves." },
      { name: "CDN", description: "Delivers video to viewers from a nearby location." },
      { name: "Metadata Database", description: "Stores titles, descriptions, and view counts." },
    ],
    flow: [
      { step: 1, title: "Upload", description: "Video file goes to object storage; metadata is saved to the database." },
      { step: 2, title: "Stream", description: "Viewer streams the video through the CDN, not directly from storage." },
    ],
    whyEachExists: [
      "Object storage exists because databases are built for structured records, not gigabyte-sized binary files.",
      "The CDN exists because serving every viewer worldwide from one central storage location would be slow and would overload that location.",
    ],
    alternatives: [
      "A more advanced design would add a processing queue and transcoding workers to prepare multiple video qualities — appropriate once viewers have varying connection speeds (see the scale-level case study).",
    ],
  },
  sourcePath: "content/05-live-challenges/video-streaming.ts",
};
