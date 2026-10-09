import { tracks } from "@/content/tracks";

/** A format line that is identical on every track. Divergent lines are omitted. */
export function sharedFormatDetail(label: string): string | undefined {
  const details = tracks.map((track) => track.format.find((item) => item.label === label)?.detail ?? null);
  const [first, ...rest] = details;
  if (!first || rest.some((detail) => detail !== first)) return undefined;
  return first;
}
