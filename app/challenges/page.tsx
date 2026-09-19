import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading, Card, Badge } from "@/components/ui";
import { liveChallenges } from "@/content/live-challenges";

export default function ChallengesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Module 4"
        title="Live Architecture Challenges"
        description="Not an assignment - a collection of problems for an instructor to open in class and ask: how would you design this system?"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {liveChallenges.map((challenge, i) => (
          <Link key={challenge.slug} href={`/challenges/${challenge.slug}`}>
            <Card className="h-full transition-colors hover:border-accent hover:bg-surface-hover">
              <div className="mb-1.5 flex items-center gap-2">
                <Badge>Challenge {i + 1}</Badge>
              </div>
              <h3 className="font-semibold text-foreground">{challenge.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {challenge.expectedLearning}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Open challenge
                <ArrowRight size={14} />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
