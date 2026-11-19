import { getTrack, tracks } from "@/content/tracks";
import { getProblemsForTrack } from "@/content/problems";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Academy K track problems: practice problems with worked solutions";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return tracks.map((track) => ({ track: track.slug }));
}

export default async function TrackProblemsOpenGraphImage({ params }: { params: Promise<{ track: string }> }) {
  const { track: trackSlug } = await params;
  const track = getTrack(trackSlug);
  const problems = getProblemsForTrack(trackSlug);

  const warmUp = problems.filter((p) => p.difficulty === "warm-up").length;
  const interview = problems.filter((p) => p.difficulty === "interview").length;
  const hard = problems.filter((p) => p.difficulty === "hard").length;

  return ogImage({
    label: track ? `${track.short} Problems` : "Problems",
    title: track ? `${track.title} Problems` : "Track Problems",
    subtitle: track?.tagline ?? "Practice problems for Academy K",
    glyph: track?.slug,
    chips: [`${warmUp} Warm-up`, `${interview} Interview`, `${hard} Hard`],
  });
}
