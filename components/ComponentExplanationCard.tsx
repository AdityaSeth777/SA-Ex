"use client";

import { ComponentExplanation } from "@/lib/types";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export function ComponentExplanationCard({
  component,
  active,
  onHover,
}: {
  component: ComponentExplanation;
  active?: boolean;
  onHover?: (name: string | null) => void;
}) {
  return (
    <Card
      className={cn(
        "cursor-default transition-colors",
        active && "border-accent bg-surface-hover"
      )}
    >
      <div
        onMouseEnter={() => onHover?.(component.name)}
        onMouseLeave={() => onHover?.(null)}
        onClick={() => onHover?.(component.name)}
      >
        <h3 className="font-semibold text-foreground">{component.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {component.description}
        </p>
      </div>
    </Card>
  );
}
