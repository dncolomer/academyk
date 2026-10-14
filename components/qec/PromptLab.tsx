"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import {
  syndrome,
  REP3,
  SURF3,
  pauliString,
  type Code,
} from "./engine/pauli";

type Experiment = {
  id: string;
  prompt: string;
  action: string;
  codeId: string;
  errors: Array<{ qubits: number[]; paulis: string[] }>;
  explanation: string;
  generatedCode?: string;
  result: {
    litChecks: string[];
    isLogicalError: boolean;
    errorString: string;
  } | null;
  timestamp: number;
};

type PromptLabProps = {
  onOpenInCodeMode: (code: string) => void;
};

const SUGGESTED_PROMPTS = [
  "Put an X error on qubit 4",
  "What happens with Y on the center?",
  "Try two X errors next to each other",
  "Show me a logical error",
  "Compare X on q0 vs X on q4",
];

const CHALLENGES = [
  { id: "c1", question: "Can you find an error that lights up all four face checks?", hint: "Think about which Pauli type affects both X and Z checks" },
  { id: "c2", question: "Can you find the smallest error that fools distance-3?", hint: "A 'logical error' lights up zero checks but flips the logical qubit" },
  { id: "c3", question: "Why do two adjacent X errors light up fewer checks than one?", hint: "Error chains only show their endpoints" },
];

const CODES: Record<string, Code> = {
  rep3: REP3,
  surf3: SURF3,
};

function buildErrorString(code: Code, errors: Array<{ qubits: number[]; paulis: string[] }>): string {
  const result = Array(code.n).fill("_");
  for (const err of errors) {
    for (let i = 0; i < err.qubits.length; i++) {
      const q = err.qubits[i];
      const p = err.paulis[i] || err.paulis[0];
      if (q >= 0 && q < code.n) {
        result[q] = p;
      }
    }
  }
  return result.join("");
}

function checkIsLogicalError(code: Code, litChecks: string[], errorString: string): boolean {
  if (litChecks.length > 0) return false;
  if (code.id === "surf3") {
    const logicalX = "X__X__X__";
    const logicalZ = "ZZZ______";
    return errorString === logicalX || errorString === logicalZ;
  }
  return false;
}

function parseOfflinePrompt(prompt: string): Experiment | null {
  const lower = prompt.toLowerCase();
  const id = `exp-${Date.now()}`;
  const base = {
    id,
    prompt,
    timestamp: Date.now(),
    codeId: "surf3",
  };

  const xMatch = lower.match(/x\s*(?:error\s*)?(?:on\s*)?(?:qubit\s*)?(\d+)/i);
  const yMatch = lower.match(/y\s*(?:error\s*)?(?:on\s*)?(?:qubit\s*)?(\d+)/i);
  const zMatch = lower.match(/z\s*(?:error\s*)?(?:on\s*)?(?:qubit\s*)?(\d+)/i);
  const centerMatch = lower.match(/center|centre|middle/);
  const logicalMatch = lower.match(/logical\s*error|undetect|fool/);
  const twoErrorsMatch = lower.match(/two|adjacent|next\s*to|pair/);
  const allChecksMatch = lower.match(/all\s*(four|4)?\s*checks|light\s*up\s*everything/);

  if (allChecksMatch || lower.includes("y on") && centerMatch) {
    return {
      ...base,
      action: "inject_error",
      errors: [{ qubits: [4], paulis: ["Y"] }],
      explanation: "A Y error on the center qubit (q4) lights up all four face checks because Y = iXZ anticommutes with both X-type and Z-type stabilisers.",
      result: null,
    };
  }

  if (logicalMatch) {
    return {
      ...base,
      action: "find_undetectable",
      errors: [{ qubits: [0, 3, 6], paulis: ["X", "X", "X"] }],
      explanation: "This is the logical X operator (X on q0, q3, q6). It commutes with all stabilisers, so no checks light up—but it flips the logical qubit. This is how a distance-3 code can fail.",
      result: null,
    };
  }

  if (twoErrorsMatch) {
    return {
      ...base,
      action: "compare_errors",
      errors: [{ qubits: [3, 4], paulis: ["X", "X"] }],
      explanation: "Two adjacent X errors form a chain. Z_b touches both qubits (even overlap → stays dark). Only the chain endpoints light up: Z_a and Z_left.",
      result: null,
    };
  }

  if (centerMatch) {
    const pauli = yMatch ? "Y" : zMatch ? "Z" : "X";
    return {
      ...base,
      action: "inject_error",
      errors: [{ qubits: [4], paulis: [pauli] }],
      explanation: `The center qubit (q4) sits inside all four face checks. A ${pauli} error here lights up the checks that anticommute with ${pauli}.`,
      result: null,
    };
  }

  if (xMatch) {
    const qubit = parseInt(xMatch[1], 10);
    return {
      ...base,
      action: "inject_error",
      errors: [{ qubits: [qubit], paulis: ["X"] }],
      explanation: `An X error on qubit ${qubit}. X errors are detected by Z-type checks (which contain Z operators).`,
      result: null,
    };
  }

  if (yMatch) {
    const qubit = parseInt(yMatch[1], 10);
    return {
      ...base,
      action: "inject_error",
      errors: [{ qubits: [qubit], paulis: ["Y"] }],
      explanation: `A Y error on qubit ${qubit}. Since Y = iXZ, it anticommutes with both X-type and Z-type checks.`,
      result: null,
    };
  }

  if (zMatch) {
    const qubit = parseInt(zMatch[1], 10);
    return {
      ...base,
      action: "inject_error",
      errors: [{ qubits: [qubit], paulis: ["Z"] }],
      explanation: `A Z error on qubit ${qubit}. Z errors are detected by X-type checks (which contain X operators).`,
      result: null,
    };
  }

  return null;
}

function QubitGridCompact({
  code,
  errorString,
  litChecks,
}: {
  code: Code;
  errorString: string;
  litChecks: string[];
}) {
  const PAULI_COLORS: Record<string, string> = {
    X: "text-red-400 bg-red-400/20",
    Y: "text-purple-400 bg-purple-400/20",
    Z: "text-emerald-400 bg-emerald-400/20",
  };

  return (
    <div className="inline-block">
      <div className="grid grid-cols-3 gap-1">
        {code.qubitPositions.map((_, idx) => {
          const p = errorString[idx] || "_";
          const hasError = p !== "_" && p !== "I";
          return (
            <div
              key={idx}
              className={cn(
                "w-10 h-10 rounded flex items-center justify-center text-xs ak-mono",
                hasError ? PAULI_COLORS[p] || "bg-amber-400/20" : "bg-line/30"
              )}
            >
              {hasError ? p : idx}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {code.checks.map((check) => (
          <span
            key={check.id}
            className={cn(
              "px-1.5 py-0.5 rounded text-[10px] ak-mono",
              litChecks.includes(check.id)
                ? "bg-amber-400 text-black"
                : "bg-line/20 text-muted"
            )}
          >
            {check.id}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PromptLab({ onOpenInCodeMode }: PromptLabProps) {
  const [prompt, setPrompt] = useState("");
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current && experiments.length > 0) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [experiments]);

  const runExperiment = useCallback((exp: Experiment): Experiment => {
    const code = CODES[exp.codeId] || SURF3;
    const errorString = buildErrorString(code, exp.errors || []);
    const litChecks = syndrome(code, errorString);
    const isLogicalError = checkIsLogicalError(code, litChecks, errorString);
    
    return {
      ...exp,
      result: { litChecks, isLogicalError, errorString },
    };
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/qec-lab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await res.json();

      if (data.offline || data.error === "NO_API_KEY") {
        setIsOffline(true);
        const offlineExp = parseOfflinePrompt(prompt);
        if (offlineExp) {
          const withResult = runExperiment(offlineExp);
          setExperiments((prev) => [...prev, withResult]);
        } else {
          setError("I couldn't understand that prompt. Try something like 'X error on qubit 4' or use one of the suggested prompts.");
        }
      } else if (data.error) {
        setError(data.error);
      } else if (data.experiment) {
        const exp: Experiment = {
          id: `exp-${Date.now()}`,
          prompt: prompt.trim(),
          action: data.experiment.action,
          codeId: data.experiment.codeId || "surf3",
          errors: data.experiment.errors || [],
          explanation: data.experiment.explanation,
          generatedCode: data.experiment.generatedCode,
          result: null,
          timestamp: Date.now(),
        };
        const withResult = runExperiment(exp);
        setExperiments((prev) => [...prev, withResult]);
      }
    } catch (e) {
      const offlineExp = parseOfflinePrompt(prompt);
      if (offlineExp) {
        setIsOffline(true);
        const withResult = runExperiment(offlineExp);
        setExperiments((prev) => [...prev, withResult]);
      } else {
        setError("Failed to process prompt. Try a simpler request.");
      }
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  }, [prompt, isLoading, runExperiment]);

  const handleSuggestedPrompt = (suggested: string) => {
    setPrompt(suggested);
    inputRef.current?.focus();
  };

  const generateCodeForExperiment = (exp: Experiment): string => {
    const code = CODES[exp.codeId] || SURF3;
    const errorString = exp.result?.errorString || buildErrorString(code, exp.errors || []);
    
    const checksObj = code.checks.reduce((acc, c) => {
      acc[c.id] = c.pauli;
      return acc;
    }, {} as Record<string, string>);

    return `// Experiment: ${exp.prompt}
// Generated from prompt lab

function clashCount(check, error) {
  let count = 0;
  for (let i = 0; i < check.length; i++) {
    const c = check[i], e = error[i];
    if (c !== '_' && c !== 'I' && e !== '_' && e !== 'I' && c !== e) count++;
  }
  return count;
}

function flips(check, error) {
  return clashCount(check, error) % 2 === 1;
}

const CHECKS = ${JSON.stringify(checksObj, null, 2)};

const error = "${errorString}";
console.log("Error pattern:", error);
console.log("");

for (const [name, check] of Object.entries(CHECKS)) {
  const lit = flips(check, error);
  console.log(\`\${name}: \${lit ? "LIT 🔆" : "dark"}\`);
}
`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="ak-serif text-2xl text-ink">Prompt Lab</h3>
          <p className="mt-1 text-sm text-muted">
            Type a prompt to run an experiment. The simulator is ground truth.
          </p>
        </div>
        {isOffline && (
          <span className="shrink-0 rounded bg-amber-400/20 px-2 py-1 text-xs ak-mono text-amber-400">
            OFFLINE MODE
          </span>
        )}
      </div>

      {/* Suggested prompts */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_PROMPTS.map((sp) => (
          <button
            key={sp}
            type="button"
            onClick={() => handleSuggestedPrompt(sp)}
            className="rounded-full border border-line px-3 py-1 text-xs text-muted hover:border-cyan-400 hover:text-cyan-400 transition-colors"
          >
            {sp}
          </button>
        ))}
      </div>

      {/* Experiment history */}
      <div
        ref={historyRef}
        className="h-80 overflow-y-auto space-y-4 rounded border border-line bg-black/30 p-4"
      >
        {experiments.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted">
              Your experiments will appear here. Try a prompt above or type your own.
            </p>
          </div>
        ) : (
          experiments.map((exp) => (
            <div key={exp.id} className="rounded border border-line/50 bg-bg/50 p-4">
              {/* Prompt */}
              <p className="text-sm text-cyan-400 ak-mono">&gt; {exp.prompt}</p>
              
              {/* Result grid */}
              {exp.result && (
                <div className="mt-3 flex gap-6 items-start">
                  <QubitGridCompact
                    code={CODES[exp.codeId] || SURF3}
                    errorString={exp.result.errorString}
                    litChecks={exp.result.litChecks}
                  />
                  
                  <div className="flex-1 min-w-0">
                    {/* Simulator says */}
                    <div className="rounded bg-emerald-400/10 border border-emerald-400/30 p-2 mb-2">
                      <p className="text-[10px] ak-mono text-emerald-400 mb-1">SIMULATOR SAYS</p>
                      <p className="text-sm text-ink">
                        {exp.result.litChecks.length === 0 ? (
                          exp.result.isLogicalError ? (
                            <span className="text-red-400">No checks lit — LOGICAL ERROR detected!</span>
                          ) : (
                            "No checks light up"
                          )
                        ) : (
                          <>Lit: <span className="text-amber-400">{exp.result.litChecks.join(", ")}</span></>
                        )}
                      </p>
                    </div>
                    
                    {/* Model explains */}
                    <div className="rounded bg-blue-400/10 border border-blue-400/30 p-2">
                      <p className="text-[10px] ak-mono text-blue-400 mb-1">MODEL EXPLAINS</p>
                      <p className="text-sm text-muted">{exp.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => onOpenInCodeMode(generateCodeForExperiment(exp))}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  Open in Code Mode →
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Describe an experiment..."
          className="flex-1 rounded border border-line bg-bg/50 px-4 py-2 text-sm text-ink placeholder:text-muted focus:border-cyan-400 focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !prompt.trim()}
          className={cn(
            "ak-btn-solid px-6",
            isLoading && "opacity-50 cursor-wait"
          )}
        >
          {isLoading ? "..." : "Run"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {/* Challenges */}
      <div className="rounded border border-cyan-400/30 bg-cyan-400/5 p-4">
        <p className="ak-mono text-xs text-cyan-400 mb-3">CHALLENGES</p>
        <div className="space-y-2">
          {CHALLENGES.map((c) => (
            <div key={c.id}>
              <button
                type="button"
                onClick={() => setActiveChallenge(activeChallenge === c.id ? null : c.id)}
                className="text-sm text-ink hover:text-cyan-400 text-left"
              >
                • {c.question}
              </button>
              {activeChallenge === c.id && (
                <p className="mt-1 ml-3 text-xs text-muted">
                  Hint: {c.hint}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
