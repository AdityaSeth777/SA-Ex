import { notFound } from "next/navigation";
import {
  evolutionCaseStudies,
  getEvolutionCaseStudy,
} from "@/content/architecture-evolution";
import { EvolutionTimeline } from "@/components/EvolutionTimeline";
import { ViewSourceLink } from "@/components/ViewSourceLink";

export function generateStaticParams() {
  return evolutionCaseStudies.map((study) => ({ slug: study.slug }));
}

export default async function EvolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getEvolutionCaseStudy(slug);
  if (!study) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-3">
        <ViewSourceLink sourcePath={study.sourcePath} />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {study.title}
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{study.intro}</p>

      <div className="mt-10">
        <EvolutionTimeline study={study} />
      </div>
    </div>
  );
}
