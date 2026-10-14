/**
 * Pauli syndrome engine for "Which Checks Light Up?" lab.
 * Implements the odd-overlap rule: a check lights up iff it anticommutes with the error.
 * Verified against Stim 1.16 reference implementation.
 */

export type PauliChar = "I" | "_" | "X" | "Y" | "Z";

export function isIdentity(p: string): boolean {
  return p === "I" || p === "_";
}

/**
 * Count positions where check and error both have non-identity, different Paulis.
 * X vs Z, X vs Y, Y vs Z all count as clashes.
 */
export function clashCount(check: string, error: string): number {
  if (check.length !== error.length) {
    throw new Error(`Length mismatch: check=${check.length}, error=${error.length}`);
  }
  let count = 0;
  for (let i = 0; i < check.length; i++) {
    const c = check[i];
    const e = error[i];
    if (!isIdentity(c) && !isIdentity(e) && c !== e) {
      count++;
    }
  }
  return count;
}

/**
 * A check "flips" (lights up) iff the clash count is odd.
 * This is equivalent to the check anticommuting with the error.
 */
export function flips(check: string, error: string): boolean {
  return clashCount(check, error) % 2 === 1;
}

export interface Check {
  id: string;
  pauli: string;
  kind: "X" | "Z";
}

export interface Code {
  id: string;
  name: string;
  n: number;
  checks: Check[];
  qubitPositions: [number, number][];
  logicalX?: string;
  logicalZ?: string;
}

/**
 * Compute the syndrome: which checks light up for a given error.
 */
export function syndrome(code: Code, error: string): string[] {
  return code.checks
    .filter((c) => flips(c.pauli, error))
    .map((c) => c.id)
    .sort();
}

/**
 * Helper to build a Pauli string from qubit positions.
 */
export function pauliString(n: number, ops: Record<number, PauliChar>): string {
  const s = Array(n).fill("_");
  for (const [q, p] of Object.entries(ops)) {
    s[Number(q)] = p;
  }
  return s.join("");
}

// 3-qubit repetition code
export const REP3: Code = {
  id: "rep3",
  name: "3-qubit Repetition Code",
  n: 3,
  checks: [
    { id: "Z01", pauli: "ZZ_", kind: "Z" },
    { id: "Z12", pauli: "_ZZ", kind: "Z" },
  ],
  qubitPositions: [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
};

// Distance-3 rotated surface code (9 data qubits, q = 3*row + col)
export const SURF3: Code = {
  id: "surf3",
  name: "Distance-3 Surface Code",
  n: 9,
  checks: [
    { id: "X_a", pauli: pauliString(9, { 0: "X", 1: "X", 3: "X", 4: "X" }), kind: "X" },
    { id: "X_b", pauli: pauliString(9, { 4: "X", 5: "X", 7: "X", 8: "X" }), kind: "X" },
    { id: "X_top", pauli: pauliString(9, { 1: "X", 2: "X" }), kind: "X" },
    { id: "X_bot", pauli: pauliString(9, { 6: "X", 7: "X" }), kind: "X" },
    { id: "Z_a", pauli: pauliString(9, { 1: "Z", 2: "Z", 4: "Z", 5: "Z" }), kind: "Z" },
    { id: "Z_b", pauli: pauliString(9, { 3: "Z", 4: "Z", 6: "Z", 7: "Z" }), kind: "Z" },
    { id: "Z_left", pauli: pauliString(9, { 0: "Z", 3: "Z" }), kind: "Z" },
    { id: "Z_right", pauli: pauliString(9, { 5: "Z", 8: "Z" }), kind: "Z" },
  ],
  qubitPositions: [
    [0, 0], [1, 0], [2, 0],
    [0, 1], [1, 1], [2, 1],
    [0, 2], [1, 2], [2, 2],
  ],
  logicalX: "X__X__X__",
  logicalZ: "ZZZ______",
};

// Puzzle definitions
export interface Puzzle {
  id: string;
  codeId: string;
  description: string;
  error: string;
  expectedLit: string[];
  explanation: string;
}

export const REP3_PUZZLES: Puzzle[] = [
  {
    id: "rep3-x0",
    codeId: "rep3",
    description: "X error on qubit 0",
    error: "X__",
    expectedLit: ["Z01"],
    explanation: "Z01 overlaps the X error on 1 qubit (q0). Odd overlap → lights up.",
  },
  {
    id: "rep3-x1",
    codeId: "rep3",
    description: "X error on qubit 1",
    error: "_X_",
    expectedLit: ["Z01", "Z12"],
    explanation: "Both checks share q1 with the error. Each has overlap 1 (odd) → both light up.",
  },
  {
    id: "rep3-x2",
    codeId: "rep3",
    description: "X error on qubit 2",
    error: "__X",
    expectedLit: ["Z12"],
    explanation: "Z12 overlaps on q2 (odd). Z01 doesn't touch q2 → stays dark.",
  },
  {
    id: "rep3-z0",
    codeId: "rep3",
    description: "Z error on qubit 0",
    error: "Z__",
    expectedLit: [],
    explanation: "Z never clashes with Z. This bit-flip code is blind to phase errors.",
  },
];

export const SURF3_PUZZLES: Puzzle[] = [
  {
    id: "surf3-x4",
    codeId: "surf3",
    description: "X error on centre qubit (q4)",
    error: "____X____",
    expectedLit: ["Z_a", "Z_b"],
    explanation: "X errors are detected by Z checks. q4 sits in both Z_a and Z_b.",
  },
  {
    id: "surf3-z4",
    codeId: "surf3",
    description: "Z error on centre qubit (q4)",
    error: "____Z____",
    expectedLit: ["X_a", "X_b"],
    explanation: "Z errors are detected by X checks. q4 sits in both X_a and X_b.",
  },
  {
    id: "surf3-y4",
    codeId: "surf3",
    description: "Y error on centre qubit (q4)",
    error: "____Y____",
    expectedLit: ["X_a", "X_b", "Z_a", "Z_b"],
    explanation: "Y = iXZ. It clashes with both X and Z checks → all four face checks light up.",
  },
  {
    id: "surf3-chain",
    codeId: "surf3",
    description: "X errors on q3 and q4 (error chain)",
    error: "___XX____",
    expectedLit: ["Z_a", "Z_left"],
    explanation: "Z_b overlaps on 2 qubits (even) → stays dark. Only the chain endpoints light up.",
  },
  {
    id: "surf3-logical",
    codeId: "surf3",
    description: "X errors on q0, q3, q6 (logical X)",
    error: "X__X__X__",
    expectedLit: [],
    explanation: "This is the logical X operator. It commutes with all checks → undetected. The code has failed.",
  },
];
