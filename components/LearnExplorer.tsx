"use client";

import { useState } from "react";
import { MousePointerClick } from "lucide-react";
import { componentGlossary } from "@/content/components-glossary";
import { MermaidDiagram } from "@/components/MermaidDiagram";
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
      <p className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MousePointerClick size={15} className="text-accent" />
        Click any component below to highlight where it typically sits in a
        full system.
      </p>
      <MermaidDiagram
        code={OVERVIEW_DIAGRAM}
        highlightLabel={selected?.highlightLabel ?? null}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {componentGlossary.map((entry) => {
          const active = selectedKey === entry.key;
          return (
            <button
              key={entry.key}
              type="button"
              onClick={() =>
                setSelectedKey((k) => (k === entry.key ? null : entry.key))
              }
              className={cn(
                "rounded-lg border border-border bg-surface p-5 text-left transition-colors",
                "hover:border-accent/60 hover:bg-surface-hover cursor-pointer",
                active && "border-accent bg-surface-hover"
              )}
            >
              <h3 className="font-semibold text-foreground">{entry.name}</h3>

              <div className="mt-3 space-y-2.5 text-sm">
                <p>
                  <span className="font-medium text-foreground">What is it? </span>
                  <span className="text-muted-foreground">{entry.whatIsIt}</span>
                </p>
                <p>
                  <span className="font-medium text-foreground">
                    Why do we need it?{" "}
                  </span>
                  <span className="text-muted-foreground">{entry.whyNeeded}</span>
                </p>
                <p>
                  <span className="font-medium text-foreground">Example: </span>
                  <span className="text-muted-foreground">{entry.example}</span>
                </p>
              </div>

              {active && (
                <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Where does it appear?
                  </p>
                  <MermaidDiagram code={entry.diagram} zoomable={false} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
