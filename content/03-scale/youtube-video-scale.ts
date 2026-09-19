import { CaseStudy } from "@/lib/types";

export const youtubeVideoScale: CaseStudy = {
  slug: "youtube-like-video-platform",
  level: "scale",
  title: "YouTube-like Video Platform",
  tagline: "Millions of uploads, billions of views, worldwide.",
  disclaimer:
    "Simplified architecture inspired by a YouTube-like system — not a reproduction of any company's actual production architecture.",
  scenario:
    "The video platform from before now needs to handle huge upload volume, process videos into multiple qualities, and stream to viewers worldwide with minimal delay.",
  requirements: [
    "Accept a huge volume of uploads",
    "Process videos into multiple resolutions",
    "Serve billions of views globally with low delay",
    "Recommend and search across a massive catalog",
    "Stay available despite individual server or region failures",
    "Store metadata and analytics reliably at scale",
  ],
  mermaid:
    "flowchart LR\n  Creator --> LB[Load Balancer]\n  LB --> Upload[Upload Servers]\n  Upload --> RawStorage[(Raw Video Storage)]\n  RawStorage --> Queue[Processing Queue]\n  Queue --> Transcoders[Transcoding Workers]\n  Transcoders --> ProcessedStorage[(Processed Video Storage)]\n  ProcessedStorage --> CDN\n  Viewer --> CDN\n  Upload --> DB[(Metadata Database)]\n  Viewer --> LB --> SearchService[Search / Recommendation Service]\n  SearchService --> DB",
  components: [
    { name: "Load Balancer", description: "Routes both uploads and viewing traffic to the right set of servers.", glossaryKey: "loadBalancer" },
    { name: "Upload Servers", description: "Receive raw video files from creators and hand them off for processing.", glossaryKey: "backend" },
    { name: "Raw Video Storage", description: "Temporarily holds the original uploaded file before it's processed.", glossaryKey: "objectStorage" },
    { name: "Processing Queue", description: "Lines up uploaded videos so transcoding workers can process them without upload servers waiting around.", glossaryKey: "messageQueue" },
    { name: "Transcoding Workers", description: "Convert each video into multiple resolutions/qualities so playback adapts to each viewer's connection.", glossaryKey: "backend" },
    { name: "Processed Video Storage", description: "Stores the final ready-to-stream video files in all their resolutions.", glossaryKey: "objectStorage" },
    { name: "CDN", description: "Delivers video to viewers from servers near them, absorbing the overwhelming majority of view traffic.", glossaryKey: "cdn" },
    { name: "Metadata Database", description: "Stores titles, descriptions, view counts, and other searchable info about each video.", glossaryKey: "database" },
    { name: "Search / Recommendation Service", description: "Helps viewers find videos across a catalog far too large to browse manually.", glossaryKey: "backend" },
  ],
  flow: [
    { step: 1, title: "Creator uploads a video", description: "The file lands in raw storage and an upload record is created in the metadata database." },
    { step: 2, title: "Video is queued for processing", description: "A processing job is placed on the queue rather than processed immediately inline." },
    { step: 3, title: "Transcoding workers process it", description: "Workers pick up the job, generate multiple quality versions, and save them to processed storage." },
    { step: 4, title: "Video becomes viewable", description: "Once processed, the CDN can cache and serve it; metadata is updated to 'ready.'" },
    { step: 5, title: "Viewers watch worldwide", description: "Each viewer streams from a nearby CDN location, and picks up recommendations from the search/recommendation service." },
  ],
  thinkAboutIt: [
    { question: "Why is uploading and processing split into separate stages instead of doing everything as soon as the file arrives?", hint: "Processing (transcoding) a large video can take much longer than the upload itself — queuing it lets the creator finish uploading quickly while processing happens in the background." },
    { question: "Why store raw and processed video separately?", hint: "The raw file might be reprocessed later (new quality formats), while processed files are what's actually served — keeping them separate keeps each system focused." },
    { question: "What would happen without a CDN at this scale?", hint: "Every single view, of every video, from every country, would hit the origin storage directly — that traffic volume would overwhelm almost any central system." },
  ],
  whatIf: [
    { question: "What happens if users upload huge files?", affectedComponent: "Raw Video Storage / Processing Queue", consequence: "Larger files take longer to upload and transcode — the queue keeps the system stable by processing jobs as capacity allows, rather than failing under sudden load." },
    { question: "What happens if the same piece of data is requested millions of times?", affectedComponent: "CDN", consequence: "A viral video is exactly the CDN's job — it gets cached widely so massive view counts don't repeatedly hit processed storage or the metadata database." },
  ],
  sourcePath: "content/03-scale/youtube-video-scale.ts",
};
