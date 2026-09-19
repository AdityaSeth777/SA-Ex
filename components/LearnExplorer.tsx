"use client";

import { useState } from "react";
import { componentGlossary } from "@/content/components-glossary";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

const OVERVIEW_DIAGRAM = `flowchart LR
  Client --> CDN
  Client --> LB[Load Balancer]
  LB --> Frontend
  Frontend -->|API request| Backend
  Backend --> Auth[Authentication]
  Backend --> Cache
  Backend --> Database[(Database)]
  Backend --> Queue[Message Queue]
  Backend --> Storage[(Object Storage)]
  CDN --> Storage`;

export function LearnExplorer() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selected = componentGlossary.find((c) => c.key === selectedKey);

  return (
    <div>
      <div className="sticky top-16 z-10 -mx-4 bg-background px-4 pb-2 pt-1 sm:-mx-6 sm:px-6">
        <p className="mb-2 text-sm text-muted-foreground">
          Click any component below to highlight where it typically sits in a
          full system.
        </p>
        <MermaidDiagram
          code={OVERVIEW_DIAGRAM}
          highlightLabel={selected?.highlightLabel ?? null}
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {componentGlossary.map((entry) => (
          <Card
            key={entry.key}
            className={cn(
              "cursor-pointer transition-colors",
              selectedKey === entry.key && "border-accent bg-surface-hover"
            )}
          >
            <button
              type="button"
              onClick={() =>
                setSelectedKey((k) => (k === entry.key ? null : entry.key))
              }
              className="w-full text-left"
            >
              <h3 className="font-semibold text-foreground">{entry.name}</h3>
            </button>

            <div className="mt-3 space-y-2.5 text-sm">
              <p>
                <span className="font-medium text-foreground">What is it? </span>
                <span className="text-muted-foreground">{entry.whatIsIt}</span>
              </p>
              <p>
                <span className="font-medium text-foreground">Why do we need it? </span>
                <span className="text-muted-foreground">{entry.whyNeeded}</span>
              </p>
              <p>
                <span className="font-medium text-foreground">Example: </span>
                <span className="text-muted-foreground">{entry.example}</span>
              </p>
            </div>

            {selectedKey === entry.key && (
              <div className="mt-4">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Where does it appear?
                </p>
                <MermaidDiagram code={entry.diagram} zoomable={false} />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
