import type { Problem, TrackProblems } from "../problem-types";
import { quantumComputingProblems } from "./quantum-computing";
import { aiSiProblems } from "./ai-si";
import { thermodynamicComputingProblems } from "./thermodynamic-computing";

export const allProblems: TrackProblems[] = [
  {
    trackSlug: "quantum-computing",
    problems: quantumComputingProblems,
  },
  {
    trackSlug: "ai-si",
    problems: aiSiProblems,
  },
  {
    trackSlug: "thermodynamic-computing",
    problems: thermodynamicComputingProblems,
  },
];

export function getProblemsForTrack(trackSlug: string): Problem[] {
  const trackProblems = allProblems.find((tp) => tp.trackSlug === trackSlug);
  return trackProblems?.problems ?? [];
}

export function getProblem(trackSlug: string, problemSlug: string): Problem | undefined {
  const problems = getProblemsForTrack(trackSlug);
  return problems.find((p) => p.slug === problemSlug);
}

export function getAllProblemSlugs(): Array<{ trackSlug: string; problemSlug: string }> {
  return allProblems.flatMap((tp) =>
    tp.problems.map((p) => ({
      trackSlug: tp.trackSlug,
      problemSlug: p.slug,
    }))
  );
}

export { quantumComputingProblems, aiSiProblems, thermodynamicComputingProblems };
