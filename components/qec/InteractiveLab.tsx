"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";
import {
  syndrome,
  REP3,
  SURF3,
  REP3_PUZZLES,
  SURF3_PUZZLES,
  type Code,
  type Puzzle,
} from "./engine/pauli";

type Mode = "guided" | "code";
type Step = "intro" | "clash" | "rep3" | "surf3" | "check";

// Color mapping for Pauli operators
const PAULI_COLORS: Record<string, string> = {
  X: "text-red-400",
  Y: "text-purple-400",
  Z: "text-emerald-400",
  I: "text-muted",
  _: "text-muted",
};

function QubitGrid({
  code,
  error,
  onQubitClick,
  litChecks,
  showChecks = true,
}: {
  code: Code;
  error: string;
  onQubitClick?: (qubit: number) => void;
  litChecks: string[];
  showChecks?: boolean;
}) {
  const isRep3 = code.id === "rep3";
  const gridCols = isRep3 ? 3 : 3;
  const cellSize = isRep3 ? 80 : 64;
  const gap = isRep3 ? 16 : 8;

  return (
    <div className="relative inline-block">
      {/* Qubit grid */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, ${cellSize}px)`,
          gap: `${gap}px`,
        }}
      >
        {code.qubitPositions.map((_, idx) => {
          const errorChar = error[idx] || "_";
          const hasError = errorChar !== "_" && errorChar !== "I";

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onQubitClick?.(idx)}
              disabled={!onQubitClick}
              className={cn(
                "flex flex-col items-center justify-center rounded-lg border transition-all",
                hasError
                  ? "border-amber-400 bg-amber-400/10"
                  : "border-line bg-bg/50",
                onQubitClick && "cursor-pointer hover:border-ink"
              )}
              style={{ width: cellSize, height: cellSize }}
            >
              <span className="ak-mono text-xs text-muted">q{idx}</span>
              {hasError && (
                <span className={cn("ak-mono text-2xl font-bold", PAULI_COLORS[errorChar])}>
                  {errorChar}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Check indicators for surface code */}
      {showChecks && code.id === "surf3" && (
        <div className="mt-4 flex flex-wrap gap-2">
          {code.checks.map((check) => {
            const isLit = litChecks.includes(check.id);
            return (
              <div
                key={check.id}
                className={cn(
                  "rounded px-3 py-1.5 ak-mono text-xs transition-all",
                  isLit
                    ? "bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                    : "border border-line text-muted"
                )}
              >
                {check.id}
                <span className={cn("ml-1", check.kind === "X" ? "text-red-600" : "text-emerald-600")}>
                  ({check.kind})
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Check indicators for rep3 */}
      {showChecks && code.id === "rep3" && (
        <div className="mt-4 flex gap-4">
          {code.checks.map((check) => {
            const isLit = litChecks.includes(check.id);
            return (
              <div
                key={check.id}
                className={cn(
                  "rounded px-4 py-2 ak-mono text-sm transition-all",
                  isLit
                    ? "bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                    : "border border-line text-muted"
                )}
              >
                {check.id}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ClashRuleDemo() {
  const [errorOp, setErrorOp] = useState<string>("X");
  const [checkOp, setCheckOp] = useState<string>("Z");

  const clashes = useMemo(() => {
    if (errorOp === "I" || checkOp === "I") return false;
    if (errorOp === checkOp) return false;
    return true;
  }, [errorOp, checkOp]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">
        The fundamental rule: an error and a check <strong>clash</strong> at a position
        if both are non-identity and different. A check lights up when there&apos;s an
        odd number of clashes.
      </p>

      <div className="flex flex-wrap items-center gap-8">
        <div>
          <p className="ak-label mb-2">Error</p>
          <div className="flex gap-2">
            {["I", "X", "Y", "Z"].map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => setErrorOp(op)}
                className={cn(
                  "w-12 h-12 rounded ak-mono text-xl transition-all",
                  errorOp === op
                    ? "bg-ink text-bg"
                    : "border border-line hover:border-ink",
                  PAULI_COLORS[op]
                )}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        <div className="text-3xl text-muted">×</div>

        <div>
          <p className="ak-label mb-2">Check</p>
          <div className="flex gap-2">
            {["X", "Z"].map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => setCheckOp(op)}
                className={cn(
                  "w-12 h-12 rounded ak-mono text-xl transition-all",
                  checkOp === op
                    ? "bg-ink text-bg"
                    : "border border-line hover:border-ink",
                  PAULI_COLORS[op]
                )}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        <div className="text-3xl text-muted">=</div>

        <div
          className={cn(
            "px-6 py-4 rounded-lg ak-mono text-lg",
            clashes
              ? "bg-amber-400 text-black shadow-[0_0_16px_rgba(251,191,36,0.5)]"
              : "border border-line text-muted"
          )}
        >
          {clashes ? "CLASH ⚡" : "no clash"}
        </div>
      </div>

      <div className="rounded border border-cyan-400/30 bg-cyan-400/5 p-4">
        <p className="ak-mono text-xs text-cyan-400">RULE</p>
        <p className="mt-1 text-sm text-ink">
          X and Z clash. X and Y clash. Y and Z clash. Same operators never clash.
          Identity never clashes with anything.
        </p>
      </div>
    </div>
  );
}

function PuzzleView({
  puzzle,
  code,
  onComplete,
}: {
  puzzle: Puzzle;
  code: Code;
  onComplete: () => void;
}) {
  const [userGuess, setUserGuess] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  const actualLit = useMemo(() => syndrome(code, puzzle.error), [code, puzzle.error]);
  const isCorrect = useMemo(() => {
    const sortedGuess = [...userGuess].sort();
    const sortedActual = [...actualLit].sort();
    return JSON.stringify(sortedGuess) === JSON.stringify(sortedActual);
  }, [userGuess, actualLit]);

  const toggleCheck = (checkId: string) => {
    if (revealed) return;
    setUserGuess((prev) =>
      prev.includes(checkId)
        ? prev.filter((c) => c !== checkId)
        : [...prev, checkId]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="ak-label">Puzzle</p>
        <p className="mt-1 text-lg text-ink">{puzzle.description}</p>
      </div>

      <QubitGrid
        code={code}
        error={puzzle.error}
        litChecks={revealed ? actualLit : userGuess}
        showChecks={false}
      />

      <div>
        <p className="ak-label mb-2">Which checks light up? (click to toggle)</p>
        <div className="flex flex-wrap gap-2">
          {code.checks.map((check) => {
            const isSelected = userGuess.includes(check.id);
            const isActuallyLit = actualLit.includes(check.id);
            const showResult = revealed;

            return (
              <button
                key={check.id}
                type="button"
                onClick={() => toggleCheck(check.id)}
                disabled={revealed}
                className={cn(
                  "rounded px-4 py-2 ak-mono text-sm transition-all",
                  !revealed && isSelected && "bg-amber-400 text-black",
                  !revealed && !isSelected && "border border-line text-muted hover:border-ink",
                  revealed && isActuallyLit && "bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.5)]",
                  revealed && !isActuallyLit && "border border-line text-muted"
                )}
              >
                {check.id}
                {showResult && isSelected && !isActuallyLit && (
                  <span className="ml-1 text-red-500">✗</span>
                )}
                {showResult && !isSelected && isActuallyLit && (
                  <span className="ml-1 text-red-500">missed</span>
                )}
              </button>
            );
          })}
          {!revealed && (
            <button
              type="button"
              onClick={() => setUserGuess([])}
              className={cn(
                "rounded px-4 py-2 ak-mono text-sm transition-all border",
                userGuess.length === 0
                  ? "border-amber-400 text-amber-400"
                  : "border-line text-muted hover:border-ink"
              )}
            >
              None
            </button>
          )}
        </div>
      </div>

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="ak-btn-solid"
        >
          Check Answer
        </button>
      ) : (
        <div className="space-y-4">
          <div
            className={cn(
              "rounded-lg p-4",
              isCorrect
                ? "border border-emerald-400/30 bg-emerald-400/10"
                : "border border-red-400/30 bg-red-400/10"
            )}
          >
            <p className={cn("font-medium", isCorrect ? "text-emerald-400" : "text-red-400")}>
              {isCorrect ? "Correct!" : "Not quite."}
            </p>
            <p className="mt-2 text-sm text-muted">{puzzle.explanation}</p>
          </div>
          <button type="button" onClick={onComplete} className="ak-btn-solid">
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function GuidedMode() {
  const [step, setStep] = useState<Step>("intro");
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  const puzzles = step === "rep3" ? REP3_PUZZLES : SURF3_PUZZLES;
  const code = step === "rep3" ? REP3 : SURF3;

  const nextPuzzle = () => {
    if (puzzleIndex < puzzles.length - 1) {
      setPuzzleIndex(puzzleIndex + 1);
    } else if (step === "rep3") {
      setStep("surf3");
      setPuzzleIndex(0);
    } else {
      setStep("check");
    }
  };

  const steps: { id: Step; label: string }[] = [
    { id: "intro", label: "Start" },
    { id: "clash", label: "Clash Rule" },
    { id: "rep3", label: "Repetition Code" },
    { id: "surf3", label: "Surface Code" },
    { id: "check", label: "Complete" },
  ];

  return (
    <div>
      {/* Progress dots */}
      <div className="mb-8 flex items-center gap-2">
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "flex items-center gap-2",
              i > 0 && "before:h-px before:w-4 before:bg-line"
            )}
          >
            <div
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                step === s.id
                  ? "bg-cyan-400"
                  : steps.findIndex((x) => x.id === step) > i
                  ? "bg-ink"
                  : "bg-line"
              )}
            />
            <span className="ak-mono text-xs text-muted hidden sm:inline">{s.label}</span>
          </div>
        ))}
      </div>

      {step === "intro" && (
        <div className="space-y-6">
          <h3 className="ak-serif text-2xl text-ink">Which Checks Light Up?</h3>
          <p className="text-muted">
            Quantum error correction codes never look at your data directly—that would
            destroy it. Instead, they run <strong>checks</strong> (stabiliser measurements)
            that light up in patterns that reveal where errors occurred.
          </p>
          <p className="text-muted">
            In this demo, you&apos;ll learn the single rule that governs all stabiliser codes:
            the <strong>odd-overlap rule</strong>. Master it, and you can read the syndrome
            of any code from a repetition code to the surface code.
          </p>
          <button type="button" onClick={() => setStep("clash")} className="ak-btn-solid">
            Start
          </button>
        </div>
      )}

      {step === "clash" && (
        <div className="space-y-6">
          <h3 className="ak-serif text-2xl text-ink">The Clash Rule</h3>
          <ClashRuleDemo />
          <button type="button" onClick={() => setStep("rep3")} className="ak-btn-solid">
            Continue to Puzzles
          </button>
        </div>
      )}

      {(step === "rep3" || step === "surf3") && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="ak-serif text-2xl text-ink">
              {step === "rep3" ? "3-Qubit Repetition Code" : "Distance-3 Surface Code"}
            </h3>
            <span className="ak-mono text-sm text-muted">
              {puzzleIndex + 1} / {puzzles.length}
            </span>
          </div>

          <PuzzleView
            key={puzzles[puzzleIndex].id}
            puzzle={puzzles[puzzleIndex]}
            code={code}
            onComplete={nextPuzzle}
          />
        </div>
      )}

      {step === "check" && (
        <div className="space-y-6">
          <h3 className="ak-serif text-2xl text-ink">Demo Complete</h3>
          <p className="text-muted">
            You&apos;ve learned the odd-overlap rule that governs all stabiliser codes.
            With this rule, you can predict which checks light up for any error pattern.
          </p>
          <div className="rounded border border-cyan-400/30 bg-cyan-400/5 p-4">
            <p className="ak-mono text-xs text-cyan-400">KEY INSIGHT</p>
            <p className="mt-2 text-sm text-ink">
              A check lights up iff it clashes with the error on an <strong>odd</strong> number
              of qubits. Error chains only light up their endpoints. Logical errors light up nothing.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep("intro");
              setPuzzleIndex(0);
            }}
            className="ak-btn"
          >
            Restart Demo
          </button>
        </div>
      )}
    </div>
  );
}

function CodeMode() {
  const [code, setCode] = useState(`// Quantum Error Correction: Syndrome Detective
// This code implements the odd-overlap rule for stabiliser syndromes.

// Pauli operators: I (identity), X (bit-flip), Y, Z (phase-flip)
// Two operators "clash" if both are non-identity and different.

function clashCount(check: string, error: string): number {
  let count = 0;
  for (let i = 0; i < check.length; i++) {
    const c = check[i];
    const e = error[i];
    const isIdC = c === 'I' || c === '_';
    const isIdE = e === 'I' || e === '_';
    if (!isIdC && !isIdE && c !== e) {
      count++;
    }
  }
  return count;
}

// A check lights up iff clash count is odd (anticommutation)
function flips(check: string, error: string): boolean {
  return clashCount(check, error) % 2 === 1;
}

// 3-qubit repetition code checks
const REP3_CHECKS = {
  Z01: "ZZ_",  // checks qubits 0,1
  Z12: "_ZZ",  // checks qubits 1,2
};

// Test: X error on qubit 1
const error = "_X_";
console.log("Error:", error);

for (const [name, check] of Object.entries(REP3_CHECKS)) {
  const lit = flips(check, error);
  console.log(\`\${name}: \${lit ? "LIT 🔆" : "dark"}\`);
}
`);

  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const runCode = useCallback(() => {
    setOutput([]);
    setError(null);

    const logs: string[] = [];
    const mockConsole = {
      log: (...args: unknown[]) => {
        logs.push(args.map(String).join(" "));
      },
    };

    try {
      const fn = new Function("console", code);
      fn(mockConsole);
      setOutput(logs);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [code]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="ak-serif text-2xl text-ink">Code Mode</h3>
        <p className="mt-2 text-sm text-muted">
          Edit the code below to experiment with the syndrome engine. Try different error
          patterns and see which checks light up.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <p className="ak-label mb-2">Code</p>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-96 w-full rounded border border-line bg-bg/50 p-4 ak-mono text-sm text-ink focus:border-cyan-400 focus:outline-none"
            spellCheck={false}
          />
          <button type="button" onClick={runCode} className="ak-btn-solid mt-3">
            Run ▶
          </button>
        </div>

        <div>
          <p className="ak-label mb-2">Output</p>
          <div className="h-96 overflow-auto rounded border border-line bg-black/50 p-4">
            {error ? (
              <p className="ak-mono text-sm text-red-400">{error}</p>
            ) : output.length > 0 ? (
              output.map((line, i) => (
                <p key={i} className="ak-mono text-sm text-emerald-400">
                  {line}
                </p>
              ))
            ) : (
              <p className="ak-mono text-sm text-muted">Click Run to execute</p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded border border-line p-4">
        <p className="ak-label mb-2">Try These Experiments</p>
        <ul className="space-y-1 text-sm text-muted">
          <li>
            <span className="text-cyan-400 mr-2">1.</span>
            Change the error to &quot;X__&quot; (X on qubit 0). Which check lights up?
          </li>
          <li>
            <span className="text-cyan-400 mr-2">2.</span>
            Try &quot;Z__&quot; (Z error on qubit 0). Why does nothing light up?
          </li>
          <li>
            <span className="text-cyan-400 mr-2">3.</span>
            Add the surface code checks and test &quot;____X____&quot; (X on centre).
          </li>
        </ul>
      </div>
    </div>
  );
}

export function InteractiveLab() {
  const [mode, setMode] = useState<Mode>("guided");

  return (
    <section id="lab" className="scroll-mt-8">
      <header className="mb-8">
        <p className="ak-label">Interactive Demo</p>
        <h2 className="ak-serif mt-3 text-3xl text-ink sm:text-4xl">
          Which Checks Light Up?
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          A micro-lesson from Unit 2: learn the odd-overlap rule that governs all stabiliser
          codes. Predict which checks light up for a given error, then reveal the answer.
        </p>
      </header>

      {/* Mode toggle */}
      <div className="mb-8 inline-flex rounded border border-line">
        <button
          type="button"
          onClick={() => setMode("guided")}
          className={cn(
            "px-4 py-2 ak-mono text-sm transition-colors",
            mode === "guided"
              ? "bg-ink text-bg"
              : "text-muted hover:text-ink"
          )}
        >
          Guided Walkthrough
        </button>
        <button
          type="button"
          onClick={() => setMode("code")}
          className={cn(
            "px-4 py-2 ak-mono text-sm transition-colors",
            mode === "code"
              ? "bg-ink text-bg"
              : "text-muted hover:text-ink"
          )}
        >
          Code Mode
        </button>
      </div>

      {/* Content area with blueprint styling */}
      <div className="rounded-lg border border-cyan-400/20 bg-[#0a1628] p-6 sm:p-8">
        <div className="relative">
          {/* Corner brackets */}
          <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-cyan-400/50" />
          <div className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-cyan-400/50" />
          <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-cyan-400/50" />
          <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-cyan-400/50" />

          {mode === "guided" ? <GuidedMode /> : <CodeMode />}
        </div>
      </div>
    </section>
  );
}
