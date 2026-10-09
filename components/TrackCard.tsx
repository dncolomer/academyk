import Link from "next/link";
import type { Track } from "@/content/types";
import { TrackGlyph } from "@/components/TrackGlyph";
import { cn } from "@/lib/cn";

type TrackCardProps = {
  track: Track;
  className?: string;
};

export function TrackCard({ track, className }: TrackCardProps) {
  const href = `/tracks/${track.slug}`;
  const modules = track.modules.length;

  return (
    <Link
      href={href}
      className={cn(
        "ak-card group flex items-start gap-5 p-5 sm:p-6",
        className,
      )}
    >
      <TrackGlyph slug={track.slug} size={64} className="mt-0.5 hidden shrink-0 sm:block" />
      <div className="min-w-0 flex-1">
        <p className="ak-label">{track.index}</p>
        <h3 className="ak-serif mt-2 text-2xl leading-tight text-ink sm:text-3xl">{track.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{track.tagline}</p>
        <p className="ak-label mt-4 flex flex-wrap gap-x-3 gap-y-1">
          <span>
            {modules} {modules === 1 ? "module" : "modules"}
          </span>
          <span aria-hidden>·</span>
          <span>{track.timeCommitment.duration}</span>
        </p>
      </div>
      <span
        className="mt-1 inline-flex size-8 items-center justify-center border border-line text-ink transition-transform duration-200 group-hover:translate-x-0.5 group-hover:border-line-strong"
        aria-hidden
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1" />
        </svg>
      </span>
    </Link>
  );
}
