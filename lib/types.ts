export type ArchComponentKey =
  | "client"
  | "frontend"
  | "backend"
  | "api"
  | "database"
  | "cache"
  | "loadBalancer"
  | "messageQueue"
  | "objectStorage"
  | "cdn"
  | "auth";

export interface ComponentGlossaryEntry {
  key: ArchComponentKey;
  name: string;
  whatIsIt: string;
  whyNeeded: string;
  example: string;
  diagram: string;
  highlightLabel: string;
}

export interface ComponentExplanation {
  name: string;
  description: string;
  glossaryKey?: ArchComponentKey;
}

export interface FlowStep {
  step: number;
  title: string;
  description: string;
  highlight?: string;
}

export interface WhatIfScenario {
  question: string;
  affectedComponent: string;
  consequence: string;
}

export type CaseStudyLevel = "basic" | "intermediate" | "scale";

export interface CaseStudy {
  slug: string;
  level: CaseStudyLevel;
  title: string;
  tagline: string;
  disclaimer?: string;
  scenario: string;
  requirements: string[];
  mermaid: string;
  components: ComponentExplanation[];
  flow: FlowStep[];
  thinkAboutIt: { question: string; hint?: string }[];
  whatIf?: WhatIfScenario[];
  sourcePath: string;
}

export interface EvolutionVersion {
  version: number;
  label: string;
  scale: string;
  mermaid: string;
  explanation: string;
  newComponents?: string[];
}

export interface EvolutionCaseStudy {
  slug: string;
  title: string;
  intro: string;
  versions: EvolutionVersion[];
  sourcePath: string;
}

export interface ChallengeConstraint {
  text: string;
}

export interface ReferenceArchitecture {
  mermaid: string;
  components: ComponentExplanation[];
  flow: FlowStep[];
  whyEachExists: string[];
  alternatives: string[];
}

export interface LiveChallenge {
  slug: string;
  title: string;
  expectedLearning: string;
  scenario: string;
  requirements: string[];
  constraints: string[];
  questions: string[];
  reference?: ReferenceArchitecture;
  designOptions?: string[];
  sourcePath: string;
}

export interface MermaidExample {
  title: string;
  code: string;
  explanation: string;
}
