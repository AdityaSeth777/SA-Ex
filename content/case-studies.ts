import { CaseStudy } from "@/lib/types";
import { libraryManagement } from "@/content/01-basics/library-management";
import { onlineExamination } from "@/content/01-basics/online-examination";
import { urlShortener } from "@/content/01-basics/url-shortener";
import { foodOrdering } from "@/content/01-basics/food-ordering";
import { ecommerce } from "@/content/02-intermediate/ecommerce";
import { chatApplication } from "@/content/02-intermediate/chat-application";
import { videoStreaming } from "@/content/02-intermediate/video-streaming";
import { rideBooking } from "@/content/02-intermediate/ride-booking";
import { discordChatScale } from "@/content/03-scale/discord-chat-scale";
import { youtubeVideoScale } from "@/content/03-scale/youtube-video-scale";
import { netflixStreamingScale } from "@/content/03-scale/netflix-streaming-scale";
import { cloudFileStorage } from "@/content/03-scale/cloud-file-storage";
import { foodDeliveryScale } from "@/content/03-scale/food-delivery-scale";

export const caseStudies: CaseStudy[] = [
  libraryManagement,
  onlineExamination,
  urlShortener,
  foodOrdering,
  ecommerce,
  chatApplication,
  videoStreaming,
  rideBooking,
  discordChatScale,
  youtubeVideoScale,
  netflixStreamingScale,
  cloudFileStorage,
  foodDeliveryScale,
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudiesByLevel(level: CaseStudy["level"]) {
  return caseStudies.filter((c) => c.level === level);
}

export const levelInfo = {
  basic: {
    title: "Level 1 - Basic",
    description: "Client → Server → Database. The foundation every architecture builds on.",
  },
  intermediate: {
    title: "Level 2 - Intermediate",
    description:
      "Load balancers, caching, CDNs, authentication, and message queues enter the picture.",
  },
  scale: {
    title: "Level 3 - Scale",
    description:
      "The same problems, at a scale where reliability and performance force new decisions.",
  },
} as const;
