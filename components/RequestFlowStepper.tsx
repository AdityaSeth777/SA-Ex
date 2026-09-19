"use client";

import { useState } from "react";
import { FlowStep } from "@/lib/types";
import { ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export function RequestFlowStepper({ steps }: { steps: FlowStep[] }) {
  const [current, setCurrent] = useState(0);
  const isLast = current === steps.length - 1;

  return (
    <div>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div
            key={step.step}
            className={cn(
              "flex gap-3 rounded-lg border p-3.5 transition-all",
              i === current
                ? "border-accent bg-surface-hover"
                : i < current
                ? "border-border bg-surface opacity-60"
                : "border-border bg-transparent opacity-40"
            )}
          >
            <div
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                i <= current
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface-hover text-muted-foreground"
              )}
            >
              {step.step}
            </div>
            <div>
              <p className="font-medium text-foreground">{step.title}</p>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          disabled={isLast}
          onClick={() => setCurrent((c) => Math.min(c + 1, steps.length - 1))}
          className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next Step
          <ArrowRight size={14} />
        </button>
        <button
          type="button"
          onClick={() => setCurrent(0)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-surface-hover hover:text-foreground"
        >
          <RotateCcw size={14} />
          Restart
        </button>
      </div>
    </div>
  );
}
