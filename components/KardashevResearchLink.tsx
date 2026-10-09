import { cn } from "@/lib/cn";

export const KARDASHEV_RESEARCH_URL = "https://x.com/Kardashev_AI";

export function KardashevResearchLink({ className }: { className?: string }) {
  return (
    <a
      href={KARDASHEV_RESEARCH_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Kardashev Research on X (opens in a new tab)"
      className={cn(
        "text-ink underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className,
      )}
    >
      Kardashev Research
    </a>
  );
}
