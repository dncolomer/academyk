import { getTrack, tracks } from "@/content/tracks";
import { offerChips, ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Academy K course page: four weeks, self-paced, with optional live sessions";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return tracks.map((track) => ({ slug: track.slug }));
}

export default async function TrackOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const track = getTrack(slug);

  return ogImage({
    label: track ? `Track ${track.index}` : "Track",
    title: track?.title ?? "Track",
    subtitle: track?.tagline ?? "Academy K",
    glyph: track?.slug,
    chips: offerChips,
  });
}
