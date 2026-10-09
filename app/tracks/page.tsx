import { LinkButton } from "@/components/Button";
import { Container } from "@/components/Container";
import { Lamp } from "@/components/Lamp";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { Ticker } from "@/components/Ticker";
import { CatalogRow } from "@/components/tracks/CatalogRow";
import { pageMetadata } from "@/components/tracks/page-meta";
import { TrackComparison } from "@/components/tracks/TrackComparison";
import { waitlistHref } from "@/content/site";
import { tracks } from "@/content/tracks";

const title = "Tracks";
const description =
  "Quantum computing, AI / SI, and thermodynamic computing. Sample syllabi — drafts. Dates and pricing TBA.";

export const metadata = pageMetadata({
  title,
  description,
  canonical: "/tracks",
});

export default function TracksPage() {
  const tickerItems = tracks.flatMap((track) => [
    `${track.index} ${track.short}`,
    `${track.modules.length} modules`,
    track.timeCommitment.duration,
    track.timeCommitment.weekly,
  ]);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)]">
      <Container className="min-w-0 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <SectionHeader
            as="h1"
            index="02"
            label="Tracks"
            title="Three tracks. One climb."
            lede="Quantum computing, AI / SI, and thermodynamic computing. Read the sample syllabi — dates and pricing are TBA."
          />
          <p className="ak-label mt-6 inline-flex max-w-full items-center gap-2 break-words text-ink">
            <Lamp />
            <span>Sample syllabi — drafts</span>
          </p>
        </Reveal>
      </Container>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)]">
        <Ticker items={tickerItems} />
      </div>

      <Container className="min-w-0 pt-10 pb-20 sm:pb-24 lg:pb-28">
        <ul className="grid gap-4">
          {tracks.map((track, index) => (
            <li key={track.slug}>
              <Reveal delayMs={index * 70}>
                <CatalogRow track={track} />
              </Reveal>
            </li>
          ))}
        </ul>

        <section className="mt-20 min-w-0" aria-labelledby="compare-heading">
          <h2 id="compare-heading" className="ak-serif text-3xl leading-tight text-ink sm:text-4xl">
            Side by side.
          </h2>
          <p className="mt-3 max-w-[36rem] text-sm leading-relaxed text-muted">
            Modules, duration, weekly time, and who each track is for. Draft figures from the sample syllabi.
          </p>
          <div className="mt-8">
            <TrackComparison tracks={tracks} />
          </div>
        </section>

        <section className="mt-16 border border-line p-6 sm:p-8" aria-labelledby="start-heading">
          <h2 id="start-heading" className="ak-serif break-words text-3xl leading-tight text-ink">
            Not sure where to start?
          </h2>
          <p className="mt-4 max-w-[36rem] text-sm leading-relaxed text-muted">
            Dates are not set yet. Join the waitlist and we will write to you.
          </p>
          <div className="mt-6">
            <LinkButton solid href={waitlistHref("Academy K waitlist")} className="w-full sm:w-auto">
              Join the waitlist
            </LinkButton>
          </div>
        </section>
      </Container>
    </div>
  );
}
