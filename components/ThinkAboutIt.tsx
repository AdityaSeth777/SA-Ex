"use client";

import { useState } from "react";
import { Lightbulb, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThinkAboutIt({
  items,
}: {
  items: { question: string; hint?: string }[];
}) {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-border bg-surface p-4">
          <div className="flex items-start gap-2.5">
            <Lightbulb size={16} className="mt-0.5 shrink-0 text-accent" />
            <p className="text-sm text-foreground">{item.question}</p>
          </div>
          {item.hint && (
            <div className="mt-2 pl-[26px]">
              <button
                type="button"
                onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
                className="flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                <ChevronDown
                  size={12}
                  className={cn("transition-transform", open[i] && "rotate-180")}
                />
                {open[i] ? "Hide discussion hint" : "Reveal discussion hint"}
              </button>
              {open[i] && (
                <p className="mt-2 text-sm text-muted-foreground">{item.hint}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
