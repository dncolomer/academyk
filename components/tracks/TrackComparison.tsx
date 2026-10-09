import type { ReactNode } from "react";
import Link from "next/link";
import type { Track } from "@/content/types";

const columns = ["Track", "Modules", "Duration", "Weekly", "Best for"] as const;

export function TrackComparison({ tracks }: { tracks: Track[] }) {
  return (
    <>
      <ul className="grid gap-3 md:hidden">
        {tracks.map((track) => (
          <li key={track.slug} className="min-w-0 border border-line p-4">
            <p className="ak-label">{track.index}</p>
            <h3 className="ak-serif mt-2 break-words text-2xl leading-tight text-ink">
              <Link href={`/tracks/${track.slug}`} className="hover:underline">
                {track.title}
              </Link>
            </h3>
            <dl className="mt-4 grid gap-4">
              <Fact label="Modules">{track.modules.length}</Fact>
              <Fact label="Duration">{track.timeCommitment.duration}</Fact>
              <Fact label="Weekly">{track.timeCommitment.weekly}</Fact>
              <Fact label="Best for">
                <AudienceList audience={track.audience} />
              </Fact>
            </dl>
          </li>
        ))}
      </ul>

      <div className="hidden min-w-0 md:grid md:grid-cols-[minmax(0,1fr)]">
        <div className="max-w-full overflow-x-auto" tabIndex={0} role="region" aria-label="Track comparison">
          <table className="w-full min-w-[44rem] table-fixed border-collapse text-left">
            <caption className="sr-only">
              Draft comparison of module count, duration, weekly time, and audience
            </caption>
            <thead>
              <tr className="border-b border-line">
                {columns.map((column) => (
                  <th key={column} scope="col" className="ak-label py-3 pr-4 align-bottom font-normal">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tracks.map((track) => (
                <tr key={track.slug} className="border-b border-line align-top">
                  <th scope="row" className="py-4 pr-4 font-normal">
                    <Link
                      href={`/tracks/${track.slug}`}
                      className="ak-serif break-words text-xl leading-tight text-ink hover:underline"
                    >
                      {track.title}
                    </Link>
                    <span className="ak-label mt-2 block">{track.index}</span>
                  </th>
                  <td className="py-4 pr-4 text-sm text-ink">{track.modules.length}</td>
                  <td className="py-4 pr-4 break-words text-sm leading-snug text-ink">
                    {track.timeCommitment.duration}
                  </td>
                  <td className="py-4 pr-4 break-words text-sm leading-snug text-ink">
                    {track.timeCommitment.weekly}
                  </td>
                  <td className="py-4 text-sm leading-snug text-muted">
                    <AudienceList audience={track.audience} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="ak-label">{label}</dt>
      <dd className="mt-1 break-words text-sm leading-snug text-ink">{children}</dd>
    </div>
  );
}

function AudienceList({ audience }: { audience: string[] }) {
  return (
    <ul className="space-y-2">
      {audience.map((item) => (
        <li key={item} className="break-words">
          {item}
        </li>
      ))}
    </ul>
  );
}
