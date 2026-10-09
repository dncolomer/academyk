import { Container } from "@/components/Container";
import { KMotif } from "@/components/KMotif";
import { TrackCard } from "@/components/TrackCard";
import { site } from "@/content/site";
import { tracks } from "@/content/tracks";

export default function HomePage() {
  return (
    <Container className="py-16 lg:py-24">
      <KMotif observatoryHref={site.observatoryUrl} />
      <ul className="mt-16 grid gap-4">
        {tracks.map((track) => (
          <li key={track.slug}>
            <TrackCard track={track} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
