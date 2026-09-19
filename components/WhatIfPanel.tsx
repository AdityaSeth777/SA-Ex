"use client";

import { useState } from "react";
import { WhatIfScenario } from "@/lib/types";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function WhatIfPanel({
  scenarios,
  onSelect,
}: {
  scenarios: WhatIfScenario[];
  onSelect?: (component: string | null) => void;
}) {
  const [active, setActive] = useState<number | null>(null);

  function handleClick(i: number) {
    const next = active === i ? null : i;
    setActive(next);
    onSelect?.(next === null ? null : scenarios[next].affectedComponent);
  }

  return (
    <div className="space-y-2">
      {scenarios.map((s, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => handleClick(i)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg border p-3.5 text-left text-sm font-medium transition-colors",
              active === i
                ? "border-accent bg-surface-hover text-foreground"
                : "border-border bg-surface text-foreground hover:bg-surface-hover"
            )}
          >
            <AlertTriangle size={15} className="shrink-0 text-amber-400" />
            {s.question}
          </button>
          {active === i && (
            <div className="mt-1.5 rounded-lg border border-border bg-transparent p-3.5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                Affected: {s.affectedComponent}.
              </span>{" "}
              {s.consequence}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
