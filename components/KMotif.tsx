import { cn } from "@/lib/cn";

type KMotifProps = {
  compact?: boolean;
  /** When set, a compact Observatory-K link is shown under the scale. */
  observatoryHref?: string;
  className?: string;
};

const K = 0.73;

export function KMotif({ compact = false, observatoryHref, className }: KMotifProps) {
  return (
    <figure className={cn("block", className)}>
      <p
        className={cn(
          "ak-serif text-ink",
          compact ? "text-2xl leading-none" : "text-4xl leading-none sm:text-5xl",
        )}
      >
        K = {K.toFixed(2)}
      </p>
      <div className={cn("relative", compact ? "mt-3" : "mt-5")}>
        <div className="relative h-px w-full bg-line">
          <span className="absolute top-1/2 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 bg-ink" />
          <span
            className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 bg-ink"
            style={{ left: `${K * 100}%` }}
            title={`K = ${K.toFixed(2)}`}
          />
          <span className="absolute top-1/2 right-0 size-1.5 translate-x-1/2 -translate-y-1/2 border border-ink" />
        </div>
        <div className="mt-2 flex justify-between">
          <span className="ak-label">Type 0</span>
          <span className="ak-label">Type I</span>
        </div>
      </div>
      <figcaption className={cn("ak-label", compact ? "mt-2" : "mt-3")}>
        {observatoryHref ? "K now (estimate), tracked live at" : "Estimate · Observatory-K"}
      </figcaption>
      {observatoryHref ? (
        <a
          href={observatoryHref}
          target="_blank"
          rel="noreferrer"
          className="ak-label mt-3 inline-flex items-center gap-1.5 text-ink hover:underline"
        >
          Observatory-K <span aria-hidden>↗</span>
        </a>
      ) : null}
    </figure>
  );
}
