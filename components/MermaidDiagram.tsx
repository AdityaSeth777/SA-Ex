"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface MermaidDiagramProps {
  code: string;
  highlightLabel?: string | null;
  className?: string;
  zoomable?: boolean;
}

export function MermaidDiagram({
  code,
  highlightLabel,
  className,
  zoomable = true,
}: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState("");
  const [scale, setScale] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    let active = true;
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === "dark" ? "dark" : "default",
      fontFamily: "inherit",
    });

    mermaid
      .render(`mermaid-${id}`, code)
      .then(({ svg }) => {
        if (active) {
          setSvg(svg);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (active) setError(err.message || "Could not render this diagram.");
      });

    return () => {
      active = false;
    };
  }, [code, resolvedTheme, id]);

  useEffect(() => {
    if (!containerRef.current) return;
    const nodes = containerRef.current.querySelectorAll(
      ".node, .cluster, .edgeLabel"
    );
    nodes.forEach((node) => {
      const text = node.textContent?.trim().toLowerCase() ?? "";
      const match = Boolean(
        highlightLabel && text.includes(highlightLabel.toLowerCase())
      );
      node.classList.toggle("diagram-highlight", match);
    });
  }, [svg, highlightLabel]);

  return (
    <div className={className}>
      {zoomable && (
        <div className="mb-2 flex justify-end gap-1">
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(s + 0.2, 2.6))}
            aria-label="Zoom in"
            className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-surface-hover hover:text-foreground"
          >
            <ZoomIn size={14} />
          </button>
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(s - 0.2, 0.5))}
            aria-label="Zoom out"
            className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-surface-hover hover:text-foreground"
          >
            <ZoomOut size={14} />
          </button>
          <button
            type="button"
            onClick={() => setScale(1)}
            aria-label="Reset zoom"
            className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-surface-hover hover:text-foreground"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      )}
      <div className="overflow-auto rounded-lg border border-border p-4" style={{ background: "var(--diagram-bg)" }}>
        {error ? (
          <p className="font-mono text-sm text-red-400">{error}</p>
        ) : (
          <div
            ref={containerRef}
            className="mermaid-diagram flex justify-center transition-transform"
            style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>
    </div>
  );
}
