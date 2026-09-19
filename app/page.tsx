import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Compass,
  Route,
  Hammer,
  Wand2,
  Boxes,
} from "lucide-react";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const routes = [
  {
    icon: Eye,
    title: "Understand",
    label: "Learn",
    href: "/learn",
    description: "Learn how to read architecture diagrams.",
  },
  {
    icon: Compass,
    title: "Explore",
    label: "Case Studies",
    href: "/case-studies",
    description: "Study real-world-inspired system architectures.",
  },
  {
    icon: Route,
    title: "Trace",
    label: "Architecture Evolution",
    href: "/evolution",
    description: "Follow how architectures evolve as systems scale.",
  },
  {
    icon: Hammer,
    title: "Design",
    label: "Live Challenges",
    href: "/challenges",
    description: "Build architectures yourself during live classroom activities.",
  },
  {
    icon: Wand2,
    title: "Playground",
    label: "Playground",
    href: "/playground",
    description: "Sketch and render your own architecture diagrams in Mermaid.",
  },
];

export default function Home() {
  return (
    <div>
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 pt-6 text-sm font-semibold text-foreground sm:px-6">
        <Boxes size={18} className="text-accent" />
        Software Architecture Foundations
      </div>

      <section className="mx-auto max-w-5xl px-4 pt-10 pb-12 text-center sm:px-6 sm:pt-16">
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <div className="h-full rounded-lg border border-border bg-surface p-5 text-left transition-colors hover:border-accent/60 hover:bg-surface-hover">
                <route.icon size={20} className="text-accent" />
                <h3 className="mt-3 font-semibold text-foreground">
                  {route.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {route.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Go to {route.label}
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
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
