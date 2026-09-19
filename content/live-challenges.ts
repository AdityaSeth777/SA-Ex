import { LiveChallenge } from "@/lib/types";
import { libraryManagementChallenge } from "@/content/05-live-challenges/library-management";
import { onlineExaminationChallenge } from "@/content/05-live-challenges/online-examination";
import { foodDeliveryChallenge } from "@/content/05-live-challenges/food-delivery";
import { urlShortenerChallenge } from "@/content/05-live-challenges/url-shortener";
import { videoStreamingChallenge } from "@/content/05-live-challenges/video-streaming";
import { chatApplicationChallenge } from "@/content/05-live-challenges/chat-application";
import { chatApplicationScaleChallenge } from "@/content/05-live-challenges/chat-application-scale";
import { designYourOwnChallenge } from "@/content/05-live-challenges/design-your-own";

export const liveChallenges: LiveChallenge[] = [
  libraryManagementChallenge,
  onlineExaminationChallenge,
  foodDeliveryChallenge,
  urlShortenerChallenge,
  videoStreamingChallenge,
  chatApplicationChallenge,
  chatApplicationScaleChallenge,
  designYourOwnChallenge,
];

export function getLiveChallenge(slug: string) {
  return liveChallenges.find((c) => c.slug === slug);
}
