import { Lamp } from "@/components/Lamp";
import { cn } from "@/lib/cn";

type ProceedsBadgeProps = {
  className?: string;
  /** Show the small mono "Giving back" label. */
  label?: boolean;
};

export function ProceedsBadge({ className, label = true }: ProceedsBadgeProps) {
  return (
    <div
      className={cn(
        "relative z-10 inline-flex max-w-full flex-col gap-1.5 border border-ink/50 bg-bg/80 px-4 py-3 sm:flex-row sm:items-center sm:gap-4",
        className,
      )}
    >
      {label ? (
        <span className="ak-label flex shrink-0 items-center gap-2 text-ink">
          <Lamp />
          Giving back
        </span>
      ) : null}
      <span className="min-w-0 text-sm leading-snug text-pretty text-ink">
        50% of proceeds go to Kardashev Research and related initiatives.
      </span>
    </div>
  );
}
