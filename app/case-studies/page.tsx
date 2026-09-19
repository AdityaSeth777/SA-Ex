import { SectionHeading, Badge } from "@/components/ui";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { getCaseStudiesByLevel, levelInfo } from "@/content/case-studies";
import { CaseStudyLevel } from "@/lib/types";

const levels: CaseStudyLevel[] = ["basic", "intermediate", "scale"];

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Module 2"
        title="Case Studies"
        description="Real-world-inspired systems, organized by how much scale and complexity they introduce."
      />

      <div className="space-y-12">
        {levels.map((level) => (
          <section key={level}>
            <div className="mb-4 flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                {levelInfo[level].title}
              </h3>
              <Badge tone={level}>{level}</Badge>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              {levelInfo[level].description}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {getCaseStudiesByLevel(level).map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
