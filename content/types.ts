export type Module = {
  title: string;
  summary: string;
  /** The proof-of-work deliverable a learner submits for verification. */
  proof: string;
};

export type Faq = { q: string; a: string };

export type Track = {
  slug: "quantum-computing" | "ai-si" | "thermodynamic-computing";
  index: string; // "01"
  title: string;
  short: string; // short label for nav / chips
  tagline: string; // one-line catalog description
  hook: string; // Kardashev-themed hook paragraph(s)
  kardashevAngle: string; // one-line "why it matters for the climb"
  audience: string[]; // who it's for
  prerequisites: string[];
  timeCommitment: { duration: string; weekly: string; note: string };
  format: { label: string; detail: string }[];
  modules: Module[];
  outcomes: string[];
  faq: Faq[];
  status: string; // e.g. "Sample syllabus — draft"
};
