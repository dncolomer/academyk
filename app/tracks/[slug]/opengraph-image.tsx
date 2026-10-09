import { getTrack, tracks } from "@/content/tracks";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Academy K track";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return tracks.map((track) => ({ slug: track.slug }));
}

export default async function TrackOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const track = getTrack(slug);

  return ogImage({
    label: track ? `TRACK ${track.index}` : "TRACK",
    title: track?.title ?? "Track",
    subtitle: track?.tagline ?? "Academy K",
  });
}
