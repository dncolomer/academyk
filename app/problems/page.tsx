import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TrackGlyph } from "@/components/TrackGlyph";
import { pageMetadata } from "@/components/tracks/page-meta";
import { tracks } from "@/content/tracks";
import { allProblems } from "@/content/problems";

const title = "Problem Catalog";
const description =
  "150 practice problems across quantum computing, AI / SI, and thermodynamic computing. Real interview questions with worked solutions.";

export const metadata = pageMetadata({
  title,
  description,
  canonical: "/problems",
});

export default function ProblemsHubPage() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)]">
      <Container className="min-w-0 py-16 sm:py-20 lg:py-24">
        <Reveal>
          <SectionHeader
            as="h1"
            index="00"
            label="Problems"
            title="Problem Catalog"
            lede="150 practice problems grounded in real industry needs. The kind of questions you would be asked in technical interviews for roles in quantum computing, AI, and thermodynamic computing."
          />
        </Reveal>

        <Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => {
              const trackProblems = allProblems.find((tp) => tp.trackSlug === track.slug);
              const count = trackProblems?.problems.length ?? 0;
              const difficulties = trackProblems?.problems.reduce(
                (acc, p) => {
                  acc[p.difficulty] = (acc[p.difficulty] || 0) + 1;
                  return acc;
                },
                {} as Record<string, number>
              );

              return (
                <li key={track.slug}>
                  <Link
                    href={`/problems/${track.slug}`}
                    className="ak-card group flex flex-col p-6"
                  >
                    <div className="flex items-start justify-between">
                      <TrackGlyph
                        slug={track.slug}
                        size={64}
                        className="h-14 w-14 opacity-70 transition-opacity group-hover:opacity-100"
                      />
                      <span className="ak-label">{track.index}</span>
                    </div>
                    <h2 className="ak-serif mt-6 text-2xl leading-tight text-ink">
                      {track.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted">{count} problems</p>
                    {difficulties && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {difficulties["warm-up"] && (
                          <span className="ak-difficulty-tag" data-difficulty="warm-up">
                            {difficulties["warm-up"]} warm-up
                          </span>
                        )}
                        {difficulties["interview"] && (
                          <span className="ak-difficulty-tag" data-difficulty="interview">
                            {difficulties["interview"]} interview
                          </span>
                        )}
                        {difficulties["hard"] && (
                          <span className="ak-difficulty-tag" data-difficulty="hard">
                            {difficulties["hard"]} hard
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal>
          <section className="mt-16 border border-line p-6 sm:p-8">
            <h2 className="ak-serif text-2xl leading-tight text-ink">How to use</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-3">
                <span className="ak-label shrink-0 text-ink">01</span>
                <span>Pick a problem. Try to solve it without looking at the solution.</span>
              </li>
              <li className="flex gap-3">
                <span className="ak-label shrink-0 text-ink">02</span>
                <span>Use the hints if you get stuck. They guide without giving everything away.</span>
              </li>
              <li className="flex gap-3">
                <span className="ak-label shrink-0 text-ink">03</span>
                <span>Check your answer against the worked solution.</span>
              </li>
              <li className="flex gap-3">
                <span className="ak-label shrink-0 text-ink">04</span>
                <span>
                  Verify you actually understand it on Uncertain Systems. Reading the answer is not the same as knowing it.
                </span>
              </li>
            </ul>
          </section>
        </Reveal>
      </Container>
    </div>
  );
}
