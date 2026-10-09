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
