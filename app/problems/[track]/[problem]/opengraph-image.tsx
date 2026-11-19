import { getTrack, tracks } from "@/content/tracks";
import { getAllProblemSlugs, getProblem } from "@/content/problems";
import { difficultyLabels, typeLabels } from "@/content/problem-types";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Academy K problem: practice problem with worked solution";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getAllProblemSlugs().map(({ trackSlug, problemSlug }) => ({
    track: trackSlug,
    problem: problemSlug,
  }));
}

export default async function ProblemOpenGraphImage({
  params,
}: {
  params: Promise<{ track: string; problem: string }>;
}) {
  const { track: trackSlug, problem: problemSlug } = await params;
  const track = getTrack(trackSlug);
  const problem = getProblem(trackSlug, problemSlug);

  return ogImage({
    label: track ? `${track.short} Problem` : "Problem",
    title: problem?.title ?? "Practice Problem",
    subtitle: problem
      ? `${difficultyLabels[problem.difficulty]} ${typeLabels[problem.type].toLowerCase()} problem`
      : "Practice problem for Academy K",
    glyph: track?.slug,
    chips: problem?.topics.slice(0, 4) ?? [],
  });
}
