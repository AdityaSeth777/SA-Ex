import { CaseStudy } from "@/lib/types";

export const cloudFileStorage: CaseStudy = {
  slug: "cloud-file-storage",
  level: "scale",
  title: "Cloud File Storage",
  tagline: "Store, sync, and share files reliably across devices.",
  disclaimer:
    "Simplified architecture inspired by cloud file storage services — not a reproduction of any company's actual production architecture.",
  scenario:
    "Users upload files from multiple devices, expect them to sync automatically, and want to share files or folders with others — all while files must never be lost.",
  requirements: [
    "Upload and download files from any device",
    "Sync changes across a user's devices automatically",
    "Share files or folders with other users",
    "Never lose a file, even if a server or disk fails",
    "Handle huge numbers of small and large files",
    "Search files by name or metadata",
  ],
  mermaid:
    "flowchart LR\n  Device1[User's Devices] --> LB[Load Balancer]\n  LB --> S1[Sync Servers]\n  S1 --> Auth[Authentication]\n  S1 --> Queue[Upload Queue]\n  Queue --> Chunker[File Chunking Workers]\n  Chunker --> Storage[(Replicated Object Storage)]\n  S1 --> DB[(Metadata Database)]\n  Storage --> CDN\n  Device1 --> CDN",
  components: [
    { name: "Load Balancer", description: "Distributes upload, download, and sync requests across sync servers.", glossaryKey: "loadBalancer" },
    { name: "Sync Servers", description: "Coordinate what's changed on each device and what needs to be uploaded or downloaded.", glossaryKey: "backend" },
    { name: "Authentication", description: "Confirms user identity and permissions before allowing access to files or shares.", glossaryKey: "auth" },
    { name: "Upload Queue", description: "Buffers incoming file uploads so sync servers stay responsive even under heavy upload volume.", glossaryKey: "messageQueue" },
    { name: "File Chunking Workers", description: "Split large files into smaller chunks, which upload more reliably and can be stored redundantly.", glossaryKey: "backend" },
    { name: "Replicated Object Storage", description: "Stores file chunks in multiple copies across different machines, so a single hardware failure never loses data.", glossaryKey: "objectStorage" },
    { name: "Metadata Database", description: "Tracks which chunks make up each file, folder structures, sharing permissions, and version history.", glossaryKey: "database" },
    { name: "CDN", description: "Speeds up downloading frequently accessed shared files by caching them closer to requesters.", glossaryKey: "cdn" },
  ],
  flow: [
    { step: 1, title: "User edits a file on one device", description: "The sync server is notified of the change and the file is queued for upload." },
    { step: 2, title: "File is chunked and stored", description: "Chunking workers split the file and write copies into replicated object storage." },
    { step: 3, title: "Metadata is updated", description: "The metadata database records the new version and which chunks make it up." },
    { step: 4, title: "Other devices are notified", description: "Sync servers tell the user's other devices a change is available." },
    { step: 5, title: "Other devices download it", description: "They fetch the updated chunks, often through the CDN if the file is frequently accessed or shared." },
  ],
  thinkAboutIt: [
    { question: "Why split files into chunks instead of storing each file as one single unit?", hint: "Chunking makes large files easier to upload reliably (resuming a failed chunk instead of the whole file) and lets unchanged parts of a file skip re-uploading entirely." },
    { question: "Why replicate storage across multiple machines?", hint: "If a file exists on only one disk and that disk fails, the file is gone forever — multiple copies protect against exactly that." },
    { question: "How would sharing a file with another user work in this architecture?", hint: "The metadata database would need a permissions record linking that file/folder to the other user, checked by authentication whenever they try to access it." },
  ],
  whatIf: [
    { question: "What happens if a storage server holding one copy of a file fails?", affectedComponent: "Replicated Object Storage", consequence: "Because the file is replicated, the remaining healthy copies serve requests normally while the system creates a new replica to restore full redundancy." },
    { question: "What happens if users upload huge files?", affectedComponent: "Upload Queue / File Chunking Workers", consequence: "Chunking keeps individual pieces manageable, and the queue prevents a wave of large uploads from overwhelming the sync servers all at once." },
  ],
  sourcePath: "content/03-scale/cloud-file-storage.ts",
};
