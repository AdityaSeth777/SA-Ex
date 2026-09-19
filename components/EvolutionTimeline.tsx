import { EvolutionCaseStudy } from "@/lib/types";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { Card } from "@/components/ui";

export function EvolutionTimeline({ study }: { study: EvolutionCaseStudy }) {
  return (
    <div className="space-y-10">
      {study.versions.map((v, i) => (
        <div key={v.version} className="relative">
          <div className="mb-3 flex items-baseline gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {v.label}
            </span>
            <span className="text-sm text-muted-foreground">— {v.scale}</span>
          </div>

          <MermaidDiagram code={v.mermaid} />

          <Card className="mt-3">
            <p className="text-sm text-foreground">{v.explanation}</p>
            {v.newComponents && v.newComponents.length > 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">New this version: </span>
                {v.newComponents.join(", ")}
              </p>
            )}
          </Card>

          {i < study.versions.length - 1 && (
            <div className="mt-6 flex items-center justify-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
              more users → new problems → architectural changes
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
