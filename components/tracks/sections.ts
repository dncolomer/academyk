export const trackToc = [
  { id: "climb", index: "01", label: "The climb" },
  { id: "audience", index: "02", label: "Who it's for" },
  { id: "prerequisites", index: "03", label: "Prerequisites & time" },
  { id: "syllabus", index: "04", label: "Syllabus" },
  { id: "format", index: "05", label: "Format" },
  { id: "outcomes", index: "06", label: "Outcomes" },
  { id: "faq", index: "07", label: "FAQ" },
] as const;

export type TrackSectionId = (typeof trackToc)[number]["id"];

/**
 * The section that owns the reading line near the top of the viewport.
 * While every heading is still below that line (page load), the first section stays current.
 * After that, the last heading that has crossed the line is current — the one nearest the top.
 */
export function activeSectionId(
  sections: { id: TrackSectionId; top: number }[],
  line: number,
): TrackSectionId {
  const fallback = sections[0]?.id ?? trackToc[0].id;
  let current = fallback;
  for (const section of sections) {
    if (section.top <= line) current = section.id;
  }
  return current;
}
