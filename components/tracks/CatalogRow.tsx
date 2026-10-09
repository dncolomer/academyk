import Link from "next/link";
import { TrackGlyph } from "@/components/TrackGlyph";
import type { Track } from "@/content/types";

export function CatalogRow({ track }: { track: Track }) {
  const modules = track.modules.length;

  return (
    <Link href={`/tracks/${track.slug}`} className="ak-card group block p-5 sm:p-6">
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="min-w-0 flex-1">
          <p className="ak-label">{track.index}</p>
          <h2 className="ak-serif mt-2 break-words text-3xl leading-[1.05] text-ink sm:text-4xl">
            {track.title}
          </h2>
          <p className="mt-3 max-w-[40rem] text-sm leading-relaxed text-muted">{track.tagline}</p>
        </div>
        <TrackGlyph
          slug={track.slug}
          size={96}
          className="mt-1 h-[72px] w-[72px] shrink-0 sm:h-24 sm:w-24"
        />
      </div>

      <p className="ak-label mt-5 flex flex-wrap gap-x-3 gap-y-1">
        <span>
          {modules} {modules === 1 ? "module" : "modules"}
        </span>
        <span aria-hidden="true">/</span>
        <span className="break-words">{track.timeCommitment.duration}</span>
        <span aria-hidden="true">/</span>
        <span className="break-words">{track.timeCommitment.weekly}</span>
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {track.format.map((item) => (
          <li key={item.label} className="ak-label max-w-full break-words border border-line px-2 py-1">
            {item.label}
          </li>
        ))}
      </ul>

      <p className="ak-label mt-5 inline-flex items-center gap-2 text-ink">
        View track
        <span
          aria-hidden="true"
          className="inline-flex size-8 items-center justify-center border border-line transition-transform duration-200 group-hover:translate-x-0.5 group-hover:border-line-strong"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
      </p>
    </Link>
  );
}
