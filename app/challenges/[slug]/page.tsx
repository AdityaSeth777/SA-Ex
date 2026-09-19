import { notFound } from "next/navigation";
import { liveChallenges, getLiveChallenge } from "@/content/live-challenges";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { ComponentExplanationCard } from "@/components/ComponentExplanationCard";
import { RequestFlowStepper } from "@/components/RequestFlowStepper";
import { RevealSection } from "@/components/RevealSection";
import { ViewSourceLink } from "@/components/ViewSourceLink";
import { MermaidPlaygroundEditor } from "@/components/MermaidPlaygroundEditor";
import { Badge, Card } from "@/components/ui";

export function generateStaticParams() {
  return liveChallenges.map((c) => ({ slug: c.slug }));
}

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const challenge = getLiveChallenge(slug);
  if (!challenge) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-3 flex items-center gap-2">
        <Badge>Live Challenge</Badge>
        <ViewSourceLink sourcePath={challenge.sourcePath} />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {challenge.title}
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Expected learning: {challenge.expectedLearning}
      </p>

      <section className="mt-8">
        <h2 className="mb-2 text-lg font-semibold text-foreground">Scenario</h2>
        <p className="text-muted-foreground">{challenge.scenario}</p>
      </section>

      <section className="mt-8">
        <h2 className="mb-2 text-lg font-semibold text-foreground">
          Requirements
        </h2>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          {challenge.requirements.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      {challenge.constraints.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Constraints
          </h2>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            {challenge.constraints.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <h2 className="mb-2 text-lg font-semibold text-foreground">
          Questions
        </h2>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          {challenge.questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </section>

      {challenge.designOptions && (
        <section className="mt-8">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Choose a System
          </h2>
          <div className="flex flex-wrap gap-2">
            {challenge.designOptions.map((opt) => (
              <span
                key={opt}
                className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground"
              >
                {opt}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="mb-2 text-lg font-semibold text-foreground">
          Blank Architecture Canvas
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Design your architecture live in Mermaid.
        </p>
        <MermaidPlaygroundEditor initialCode="" />
      </section>

      {challenge.reference && (
        <section className="mt-10">
          <RevealSection
            label="Reveal Reference Architecture"
            revealedLabel="Hide Reference Architecture"
          >
            <Card>
              <p className="mb-4 text-sm italic text-muted-foreground">
                Software architecture often has multiple valid designs. The
                goal is to justify your design and understand its
                trade-offs - this is one reasonable answer, not the only one.
              </p>

              <MermaidDiagram code={challenge.reference.mermaid} />

              <h3 className="mb-2 mt-5 font-semibold text-foreground">
                Component Explanation
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {challenge.reference.components.map((c) => (
                  <ComponentExplanationCard key={c.name} component={c} />
                ))}
              </div>

              <h3 className="mb-2 mt-5 font-semibold text-foreground">
                Request Flow
              </h3>
              <RequestFlowStepper steps={challenge.reference.flow} />

              <h3 className="mb-2 mt-5 font-semibold text-foreground">
                Why Each Component Exists
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {challenge.reference.whyEachExists.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>

              <h3 className="mb-2 mt-5 font-semibold text-foreground">
                Possible Alternatives
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {challenge.reference.alternatives.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </Card>
          </RevealSection>
        </section>
      )}
    </div>
  );
}
