"use client";

import { useState } from "react";
import { ProblemContent } from "@/components/ProblemContent";

type SolutionRevealProps = {
  hints?: string[];
  solution: string;
};

export function SolutionReveal({ hints, solution }: SolutionRevealProps) {
  const [showHints, setShowHints] = useState<boolean[]>(hints ? hints.map(() => false) : []);
  const [showSolution, setShowSolution] = useState(false);

  const toggleHint = (index: number) => {
    setShowHints((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div className="mt-10">
      {hints && hints.length > 0 && (
        <div className="mb-6">
          <p className="ak-label mb-3">Hints</p>
          <div className="space-y-2">
            {hints.map((hint, index) => (
              <div key={index}>
                <button
                  type="button"
                  className="ak-hint-toggle"
                  onClick={() => toggleHint(index)}
                  aria-expanded={showHints[index]}
                >
                  <span>{showHints[index] ? "−" : "+"}</span>
                  <span>Hint {index + 1}</span>
                </button>
                {showHints[index] && (
                  <div className="mt-2 ml-4 border-l border-line pl-4 text-sm text-muted">
                    <ProblemContent content={hint} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <button
          type="button"
          className="ak-solution-toggle"
          onClick={() => setShowSolution(!showSolution)}
          aria-expanded={showSolution}
        >
          <span className="text-lg">{showSolution ? "−" : "+"}</span>
          <span>{showSolution ? "Hide solution" : "Show solution"}</span>
        </button>
        {showSolution && (
          <div className="ak-solution-content">
            <ProblemContent content={solution} />
          </div>
        )}
      </div>
    </div>
  );
}
