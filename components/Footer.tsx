import { githubRepoUrl } from "@/lib/github";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
        <p>
          Software Architecture Foundations - a study companion, not an LMS.
          Content lives in the{" "}
          <a
            href={githubRepoUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            study repository on GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
