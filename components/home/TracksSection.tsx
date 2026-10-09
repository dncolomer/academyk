import { LinkButton } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TrackCard } from "@/components/TrackCard";
import { tracks } from "@/content/tracks";

export function TracksSection() {
  return (
    <Container as="section" className="border-t border-line py-20 lg:py-28">
      <Reveal>
        <SectionHeader
          index="01"
          label="Tracks"
          title="Three tracks"
          lede="Quantum computing, AI / SI and thermodynamic computing. Four weeks each, self-paced."
        />
      </Reveal>
      <ul className="mt-12 grid gap-4">
        {tracks.map((track, i) => (
          <li key={track.slug} className="min-w-0">
            <Reveal delayMs={i * 70}>
              <TrackCard track={track} />
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal delayMs={80}>
        <div className="mt-8">
          <LinkButton href="/tracks">All tracks</LinkButton>
        </div>
      </Reveal>
    </Container>
  );
}
