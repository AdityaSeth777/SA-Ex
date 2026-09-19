import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CaseStudy } from "@/lib/types";
import { Card } from "@/components/ui";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/case-studies/${study.slug}`}>
      <Card className="h-full transition-colors hover:border-accent hover:bg-surface-hover">
        <h3 className="font-semibold text-foreground">{study.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{study.tagline}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
          Study this case
          <ArrowRight size={14} />
        </span>
      </Card>
    </Link>
  );
}
