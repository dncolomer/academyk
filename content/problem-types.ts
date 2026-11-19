import type { Track } from "./types";

export type Difficulty = "warm-up" | "interview" | "hard";

export type ProblemType = "conceptual" | "derivation" | "coding" | "system-design";

export interface Problem {
  slug: string;
  title: string;
  difficulty: Difficulty;
  type: ProblemType;
  topics: string[];
  moduleRef?: string;
  statement: string;
  hints?: string[];
  solution: string;
}

export interface TrackProblems {
  trackSlug: Track["slug"];
  problems: Problem[];
}

export const difficultyLabels: Record<Difficulty, string> = {
  "warm-up": "Warm-up",
  interview: "Interview",
  hard: "Hard",
};

export const typeLabels: Record<ProblemType, string> = {
  conceptual: "Conceptual",
  derivation: "Derivation",
  coding: "Coding",
  "system-design": "System Design",
};
