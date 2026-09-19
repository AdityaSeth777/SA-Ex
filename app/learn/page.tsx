import { SectionHeading } from "@/components/ui";
import { LearnExplorer } from "@/components/LearnExplorer";

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Module 1"
        title="How to Read an Architecture"
        description="Before diving into case studies, get comfortable with the basic building blocks every system diagram is made of."
      />
      <LearnExplorer />
    </div>
  );
}
