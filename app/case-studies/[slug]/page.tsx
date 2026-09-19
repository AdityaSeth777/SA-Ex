import Link from "next/link";
import { notFound } from "next/navigation";
import { Wand2 } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { Badge } from "@/components/ui";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { ComponentExplanationCard } from "@/components/ComponentExplanationCard";
import { RequestFlowStepper } from "@/components/RequestFlowStepper";
import { ThinkAboutIt } from "@/components/ThinkAboutIt";
import { WhatIfPanel } from "@/components/WhatIfPanel";
import { ViewSourceLink } from "@/components/ViewSourceLink";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-3 flex items-center gap-2">
        <Badge tone={study.level}>{study.level}</Badge>
        <ViewSourceLink sourcePath={study.sourcePath} />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {study.title}
      </h1>
      {study.disclaimer && (
        <p className="mt-2 text-sm italic text-muted-foreground">
          {study.disclaimer}
        </p>
      )}

      <section className="mt-8">
        <h2 className="mb-2 text-lg font-semibold text-foreground">Scenario</h2>
        <p className="text-muted-foreground">{study.scenario}</p>
      </section>

      <section className="mt-8">
        <h2 className="mb-2 text-lg font-semibold text-foreground">
          Requirements
        </h2>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          {study.requirements.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Architecture Diagram
          </h2>
          <Link
            href={`/playground?code=${encodeURIComponent(study.mermaid)}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
          >
            <Wand2 size={12} />
            Open in Playground
          </Link>
        </div>
        <MermaidDiagram code={study.mermaid} />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Component Explanation
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {study.components.map((c) => (
            <ComponentExplanationCard key={c.name} component={c} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Request Flow
        </h2>
        <RequestFlowStepper steps={study.flow} />
      </section>

      {study.whatIf && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            What Happens If...?
          </h2>
          <WhatIfPanel scenarios={study.whatIf} />
        </section>
      )}

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Think About It
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Consider these before class - there&apos;s no submission here, just
          questions worth having an opinion on.
        </p>
        <ThinkAboutIt items={study.thinkAboutIt} />
      </section>
    </div>
  );
}
