import { Container } from "@/components/Container";
import { ReserveButton } from "@/components/ReserveButton";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { Ticker } from "@/components/Ticker";
import { CatalogRow } from "@/components/tracks/CatalogRow";
import { pageMetadata } from "@/components/tracks/page-meta";
import { TrackComparison } from "@/components/tracks/TrackComparison";
import { offer, priceLine } from "@/content/site";
import { tracks } from "@/content/tracks";

const title = "Tracks";
const description = `Quantum computing, AI / SI, and thermodynamic computing. ${offer.weeks} weeks, self-paced. Founding price ${offer.foundingPrice} per course.`;

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
    priceLine,
  ]);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] overflow-x-clip">
      <Container className="min-w-0 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <SectionHeader
            as="h1"
            index="02"
            label="Tracks"
            title="Three tracks"
            lede="Quantum computing, AI / SI, and thermodynamic computing. Each course is four weeks and self-paced."
          />
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
            Side by side
          </h2>
          <p className="mt-3 max-w-[36rem] text-sm leading-relaxed text-muted">
            Modules, duration, pace, and who each track is for.
          </p>
          <div className="mt-8">
            <TrackComparison tracks={tracks} />
          </div>
        </section>

        <section className="mt-16 border border-line p-6 sm:p-8" aria-labelledby="start-heading">
          <h2 id="start-heading" className="ak-serif break-words text-3xl leading-tight text-ink">
            Reserve a place
          </h2>
          <p className="mt-4 max-w-[36rem] text-sm leading-relaxed text-muted">
            Free to join. Nothing to pay now. Name a track on the form, or say you are not sure.
          </p>
          <div className="mt-6">
            <ReserveButton className="w-full sm:w-auto" />
          </div>
        </section>
      </Container>
    </div>
  );
}
