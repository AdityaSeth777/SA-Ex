import { GitFork } from "lucide-react";
import { githubSourceUrl } from "@/lib/github";

export function ViewSourceLink({ sourcePath }: { sourcePath: string }) {
  return (
    <a
      href={githubSourceUrl(sourcePath)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-surface-hover hover:text-foreground"
    >
      <GitFork size={13} />
      View source on GitHub
    </a>
  );
}
