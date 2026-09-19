import { EvolutionCaseStudy } from "@/lib/types";
import { chatEvolution } from "@/content/04-architecture-evolution/chat-evolution";
import { videoEvolution } from "@/content/04-architecture-evolution/video-evolution";
import { foodDeliveryEvolution } from "@/content/04-architecture-evolution/food-delivery-evolution";

export const evolutionCaseStudies: EvolutionCaseStudy[] = [
  chatEvolution,
  videoEvolution,
  foodDeliveryEvolution,
];

export function getEvolutionCaseStudy(slug: string) {
  return evolutionCaseStudies.find((e) => e.slug === slug);
}
