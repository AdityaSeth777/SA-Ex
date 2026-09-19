import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading, Card } from "@/components/ui";
import { evolutionCaseStudies } from "@/content/architecture-evolution";

export default function EvolutionPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Module 3"
        title="Architecture Evolution"
        description="More users → new problems → architectural changes. Watch the same system evolve as its scale grows."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {evolutionCaseStudies.map((study) => (
          <Link key={study.slug} href={`/evolution/${study.slug}`}>
            <Card className="h-full transition-colors hover:border-accent hover:bg-surface-hover">
              <h3 className="font-semibold text-foreground">{study.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{study.intro}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                See the evolution
                <ArrowRight size={14} />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
