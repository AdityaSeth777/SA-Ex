"use client";

import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import { Play, RotateCcw, FileText, Eraser } from "lucide-react";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { useIsClient } from "@/lib/useIsClient";

const DEFAULT_CODE = `flowchart LR
  User --> Backend
  Backend --> Database[(Database)]`;

const EXAMPLE_CODE = `flowchart LR
  Client --> LB[Load Balancer]
  LB --> S1[Server 1]
  LB --> S2[Server 2]
  S1 --> Cache
  S2 --> Cache
  S1 --> DB[(Database)]
  S2 --> DB`;

export function MermaidPlaygroundEditor({
  initialCode,
  height = "420px",
  title,
}: {
  initialCode?: string;
  height?: string;
  title?: string;
}) {
  const startingCode = initialCode !== undefined ? initialCode : DEFAULT_CODE;
  const [draft, setDraft] = useState(startingCode);
  const [rendered, setRendered] = useState(startingCode);
  const { resolvedTheme } = useTheme();
  const isClient = useIsClient();
  const editorTheme = isClient && resolvedTheme === "light" ? "light" : "dark";

  useEffect(() => {
    const t = setTimeout(() => setRendered(draft), 350);
    return () => clearTimeout(t);
  }, [draft]);

  return (
    <div>
      {title && <p className="mb-2 text-sm font-medium text-foreground">{title}</p>}

      <div className="mb-3 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setRendered(draft)}
          className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground hover:opacity-90"
        >
          <Play size={12} />
          Render
        </button>
        <button
          type="button"
          onClick={() => {
            setDraft(startingCode);
            setRendered(startingCode);
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-surface-hover hover:text-foreground"
        >
          <RotateCcw size={12} />
          Reset
        </button>
        <button
          type="button"
          onClick={() => {
            setDraft(EXAMPLE_CODE);
            setRendered(EXAMPLE_CODE);
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-surface-hover hover:text-foreground"
        >
          <FileText size={12} />
          Example
        </button>
        <button
          type="button"
          onClick={() => {
            setDraft("");
            setRendered("");
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-surface-hover hover:text-foreground"
        >
          <Eraser size={12} />
          Clear
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div
          className="overflow-hidden rounded-lg border border-border"
          style={{ height }}
        >
          <CodeMirror
            value={draft}
            height={height}
            theme={editorTheme}
            basicSetup={{ lineNumbers: true, foldGutter: false }}
            onChange={(value) => setDraft(value)}
            style={{ height: "100%" }}
          />
        </div>
        <div className="overflow-auto rounded-lg border border-border" style={{ height }}>
          {rendered.trim() ? (
            <MermaidDiagram code={rendered} zoomable={false} className="h-full" />
          ) : (
            <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
              Nothing to render yet - write some Mermaid on the left.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
