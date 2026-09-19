import Link from "next/link";
import { ArrowRight, Eye, Compass, Route, Hammer } from "lucide-react";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { Card } from "@/components/ui";

const stages = [
  {
    icon: Eye,
    title: "Understand",
    description: "Learn how to read architecture diagrams.",
  },
  {
    icon: Compass,
    title: "Explore",
    description: "Study real-world-inspired system architectures.",
  },
  {
    icon: Route,
    title: "Trace",
    description: "Follow how requests and data move through a system.",
  },
  {
    icon: Hammer,
    title: "Design",
    description: "Build architectures yourself during live classroom activities.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-4 pt-16 pb-12 text-center sm:px-6 sm:pt-24">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
          A study companion, not an LMS
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Software Architecture Foundations
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Learn how software systems are structured, how components
          communicate, and how architectures evolve as systems scale.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Start Learning
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <Card key={stage.title} className="text-left">
              <stage.icon size={20} className="text-accent" />
              <h3 className="mt-3 font-semibold text-foreground">{stage.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {stage.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <p className="mb-3 text-center text-sm text-muted-foreground">
          Every system starts simple, and grows as requirements change.
        </p>
        <MermaidDiagram
          zoomable={false}
          code={`flowchart TB\n  U[User] --> F[Frontend]\n  F --> B[Backend]\n  B --> D[(Database)]`}
        />
      </section>
    </div>
  );
}
