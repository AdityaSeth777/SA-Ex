import { SectionHeading, Card } from "@/components/ui";
import { MermaidPlaygroundEditor } from "@/components/MermaidPlaygroundEditor";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { mermaidExamples } from "@/content/mermaid-examples";

export default async function PlaygroundPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Architecture Playground"
        title="Mermaid Diagram Editor"
        description="Write Mermaid on the left, see your architecture render on the right. This is the tool you'll use to design during live classroom challenges."
      />

      <MermaidPlaygroundEditor initialCode={code} height="500px" />

      <div className="mt-16">
        <SectionHeading
          eyebrow="Reference"
          title="Mermaid Starter Guide"
          description="Only what you need for architecture diagrams — nothing more."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {mermaidExamples.map((example) => (
            <Card key={example.title}>
              <h3 className="font-semibold text-foreground">{example.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {example.explanation}
              </p>
              <div className="mt-3">
                <MermaidDiagram code={example.code} zoomable={false} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
