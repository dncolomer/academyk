"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import { PromptLab } from "./PromptLab";

type Mode = "prompt" | "code";

function CodeMode({ initialCode, onCodeChange }: { initialCode: string; onCodeChange?: (code: string) => void }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

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
            onChange={(e) => handleCodeChange(e.target.value)}
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

const DEFAULT_CODE = `// Quantum Error Correction: Syndrome Detective
// This code implements the odd-overlap rule for stabiliser syndromes.

// Pauli operators: I (identity), X (bit-flip), Y, Z (phase-flip)
// Two operators "clash" if both are non-identity and different.

function clashCount(check, error) {
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
function flips(check, error) {
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
`;

export function InteractiveLab() {
  const [mode, setMode] = useState<Mode>("prompt");
  const [codeContent, setCodeContent] = useState(DEFAULT_CODE);

  const handleOpenInCodeMode = useCallback((code: string) => {
    setCodeContent(code);
    setMode("code");
  }, []);

  return (
    <section id="lab" className="scroll-mt-8">
      <header className="mb-8">
        <p className="ak-label">Interactive Demo</p>
        <h2 className="ak-serif mt-3 text-3xl text-ink sm:text-4xl">
          Which Checks Light Up?
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          A micro-lesson from Unit 2: explore the odd-overlap rule that governs all stabiliser
          codes. Type prompts to run experiments, or write code directly.
        </p>
      </header>

      {/* Mode toggle */}
      <div className="mb-8 inline-flex rounded border border-line">
        <button
          type="button"
          onClick={() => setMode("prompt")}
          className={cn(
            "px-4 py-2 ak-mono text-sm transition-colors",
            mode === "prompt"
              ? "bg-ink text-bg"
              : "text-muted hover:text-ink"
          )}
        >
          Prompt Lab
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

          {mode === "prompt" ? (
            <PromptLab onOpenInCodeMode={handleOpenInCodeMode} />
          ) : (
            <CodeMode initialCode={codeContent} onCodeChange={setCodeContent} />
          )}
        </div>
      </div>
    </section>
  );
}
