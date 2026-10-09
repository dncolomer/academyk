import Link from "next/link";
import { Container } from "@/components/Container";
import { KMotif } from "@/components/KMotif";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/content/site";
import { tracks } from "@/content/tracks";

export function KardashevSection() {
  return (
    <Container as="section" className="border-t border-line py-20 lg:py-28">
      <Reveal>
        <SectionHeader
          index="02"
          label="The Kardashev connection"
          title="Why the K"
        />
      </Reveal>
      <Reveal delayMs={80}>
        <div className="mt-12 grid border border-line lg:grid-cols-2">
          <div className="min-w-0 border-b border-line p-6 sm:p-8 lg:border-r lg:border-b-0">
            <p className="text-[0.975rem] leading-relaxed text-muted">
              The Kardashev scale describes a civilisation by the energy it can use. From Type 0
              to Type I, that is a climb in energy, and in the computation that energy can
              sustain. Observatory-K tracks the climb. Academy K teaches the technology that
              powers it.
            </p>
            <KMotif className="mt-10" observatoryHref={site.observatoryUrl} />
          </div>
          <div className="min-w-0">
            <p className="ak-label border-b border-line px-6 py-4 sm:px-8">Track and angle</p>
            <ul>
              {tracks.map((track) => (
                <li key={track.slug} className="border-b border-line last:border-b-0">
                  <Link
                    href={`/tracks/${track.slug}`}
                    className="group block min-w-0 px-6 py-5 sm:px-8"
                  >
                    <span className="ak-label block text-ink group-hover:underline">
                      {track.index} / {track.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted group-hover:text-ink">
                      {track.kardashevAngle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
