"use client";

import { ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function RevealSection({
  label,
  revealedLabel,
  children,
}: {
  label: string;
  revealedLabel?: string;
  children: ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setRevealed((r) => !r)}
        className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20"
      >
        {revealed ? <EyeOff size={15} /> : <Eye size={15} />}
        {revealed ? revealedLabel ?? "Hide" : label}
      </button>
      {revealed && <div className="mt-5">{children}</div>}
    </div>
  );
}
