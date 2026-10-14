"use client";

import { useState } from "react";

type UnitPart = {
  name: string;
  description: string;
};

type Unit = {
  id: string;
  title: string;
  subtitle: string;
  parts: UnitPart[];
};

const units: Unit[] = [
  {
    id: "01",
    title: "Noise Models",
    subtitle: "What kinds of errors actually happen",
    parts: [
      { name: "Formal", description: "Learners create simple noise (bit flips, phase flips, energy loss). They run circuits and count how often each error appears." },
      { name: "Prompting notebook", description: "Exploring which errors matter most and why certain processes dominate." },
      { name: "Unsys", description: "TBD" },
      { name: "Project contribution", description: "The noise model everyone will use later." },
    ],
  },
  {
    id: "02",
    title: "Simple Repetition",
    subtitle: "Protecting a bit by copying it",
    parts: [
      { name: "Formal", description: "Build a short repetition code, add noise, majority vote, plot how often the logical bit still fails." },
      { name: "Prompting notebook", description: "When adding more copies stops helping and what limits the approach." },
      { name: "Unsys", description: "TBD" },
      { name: "Project contribution", description: "First numbers for an unprotected qubit and a simply protected one." },
    ],
  },
  {
    id: "03",
    title: "Measuring Errors Without Destroying the State",
    subtitle: "Syndrome extraction",
    parts: [
      { name: "Formal", description: "Build small parity-check circuits, add errors, see whether the circuit reports them correctly." },
      { name: "Prompting notebook", description: "How a check can reveal an error without destroying the protected information." },
      { name: "Unsys", description: "TBD" },
      { name: "Project contribution", description: "A working way to extract syndromes for the lab system." },
    ],
  },
  {
    id: "04",
    title: "Encoding and Simple Recovery",
    subtitle: "Turning physical qubits into one logical qubit and trying to fix it",
    parts: [
      { name: "Formal", description: "Encode a small code, add noise, read the syndrome, apply a fix, check whether the logical information survived." },
      { name: "Prompting notebook", description: "When a recovery step helps and when it makes the logical qubit worse." },
      { name: "Unsys", description: "TBD" },
      { name: "Project contribution", description: "First full loop of encode → noise → syndrome → recover." },
    ],
  },
  {
    id: "05",
    title: "Running Correction Many Times",
    subtitle: "Why one round is not enough",
    parts: [
      { name: "Formal", description: "Run the correction cycle repeatedly; track logical error rate vs rounds and imperfect resets." },
      { name: "Prompting notebook", description: "When extra rounds start to hurt and how timing or reset errors accumulate." },
      { name: "Unsys", description: "TBD" },
      { name: "Project contribution", description: "Multi-round runs and the ability to watch errors build up." },
    ],
  },
  {
    id: "06",
    title: "Surface Codes",
    subtitle: "A practical layout that uses nearby qubits",
    parts: [
      { name: "Formal", description: "Place qubits on a grid, define the checks, measure how logical error rate falls as the code gets larger." },
      { name: "Prompting notebook", description: "Why local checks matter and how code size interacts with the noise." },
      { name: "Unsys", description: "TBD" },
      { name: "Project contribution", description: "Surface-code layouts and distance-dependent results." },
    ],
  },
  {
    id: "07",
    title: "qLDPC Codes",
    subtitle: "Codes that protect more information with fewer extra qubits",
    parts: [
      { name: "Formal", description: "Look at a small qLDPC example; compare rate and check structure with the surface code; run the same noise and measure logical error rate." },
      { name: "Prompting notebook", description: "What is gained and what becomes harder when checks are no longer purely local." },
      { name: "Unsys", description: "TBD" },
      { name: "Project contribution", description: "A second code family and its performance numbers under the same noise." },
    ],
  },
  {
    id: "08",
    title: "Decoders",
    subtitle: "Turning syndromes into corrections",
    parts: [
      { name: "Formal", description: "Feed syndromes to simple matching, belief-propagation, and one stronger method; compare logical error rate and runtime on surface code and qLDPC example." },
      { name: "Prompting notebook", description: "Why a decoder fails on certain patterns and what a small change might fix." },
      { name: "Unsys", description: "TBD" },
      { name: "Project contribution", description: "Stronger decoder versions running on the lab system." },
    ],
  },
  {
    id: "09",
    title: "Measuring Performance Fairly",
    subtitle: "How to compare designs with numbers you can trust",
    parts: [
      { name: "Formal", description: "Collect enough samples to estimate logical error rates with uncertainty; plots comparing surface code, qLDPC, decoders." },
      { name: "Prompting notebook", description: "How many trials are needed before a difference is meaningful." },
      { name: "Unsys", description: "TBD" },
      { name: "Project contribution", description: "A clear benchmarking method applied to every version of the system." },
    ],
  },
  {
    id: "10",
    title: "Limits and Trade-offs",
    subtitle: "What happens when resources or hardware constraints appear",
    parts: [
      { name: "Formal", description: "Add one realistic limit (slower measurements, missing connections, or leakage); re-run benchmark; see how much performance drops." },
      { name: "Prompting notebook", description: "Which constraint hurts most and why." },
      { name: "Unsys", description: "TBD" },
      { name: "Project contribution", description: "Performance numbers under constraint and a short diagnosis of the bottleneck." },
    ],
  },
  {
    id: "11",
    title: "Capstone",
    subtitle: "Final improvement and written diagnosis",
    parts: [
      { name: "Formal", description: "Pick one or two changes, implement, re-measure the full system." },
      { name: "Prompting notebook", description: "Constructing a short explanation of why the final numbers look the way they do." },
      { name: "Unsys", description: "TBD" },
      { name: "Project contribution", description: "Final performance claim plus the remaining open problems." },
    ],
  },
];

function UnitCard({ unit, isExpanded, onToggle }: { unit: Unit; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="ak-card overflow-hidden">
      <button
        type="button"
        className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <span className="ak-mono shrink-0 text-sm text-cyan-400">{unit.id}</span>
        <div className="min-w-0 flex-1">
          <h3 className="ak-serif text-xl text-ink sm:text-2xl">{unit.title}</h3>
          <p className="mt-1 text-sm text-muted">{unit.subtitle}</p>
        </div>
        <span className="shrink-0 text-muted transition-transform" style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-line px-5 pb-6 pt-5 sm:px-6">
          <div className="space-y-4">
            {unit.parts.map((part) => (
              <div key={part.name}>
                <p className="ak-label mb-1">{part.name}</p>
                <p className="text-sm text-muted">{part.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function CourseOutline() {
  const [expanded, setExpanded] = useState<string | null>("01");

  return (
    <section id="outline" className="scroll-mt-8">
      <header className="mb-8">
        <p className="ak-label">Course Structure</p>
        <h2 className="ak-serif mt-3 text-3xl text-ink sm:text-4xl">Full Outline</h2>
        <p className="mt-4 max-w-2xl text-muted">
          11 units including a capstone project. Each unit has four parts: Formal (code notebook), 
          Prompting notebook (guiding questions), Unsys (TBD), and Project contribution.
        </p>
      </header>

      <div className="ak-card mb-6 p-5 sm:p-6">
        <p className="ak-label mb-2">Running Project</p>
        <h3 className="ak-serif text-xl text-ink">Decoder Co-Design and Benchmarking Lab</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Learners maintain one evolving system throughout the course: a fixed noise model paired 
          with a small stabilizer code. They instrument syndrome extraction, start with a basic 
          decoder, and successively replace or strengthen it while measuring logical error rate 
          against latency and overhead. At each stage they diagnose why a change improves or 
          degrades performance under the given noise.
        </p>
      </div>

      <div className="space-y-3">
        {units.map((unit) => (
          <UnitCard
            key={unit.id}
            unit={unit}
            isExpanded={expanded === unit.id}
            onToggle={() => setExpanded(expanded === unit.id ? null : unit.id)}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="ak-card p-5">
          <p className="ak-label">Units</p>
          <p className="ak-serif mt-2 text-3xl text-cyan-400">11</p>
        </div>
        <div className="ak-card p-5">
          <p className="ak-label">Parts per Unit</p>
          <p className="ak-serif mt-2 text-3xl text-cyan-400">4</p>
        </div>
        <div className="ak-card p-5">
          <p className="ak-label">Tools</p>
          <p className="mt-2 text-sm text-muted">Stim, PyMatching, Sinter, Google Colab</p>
        </div>
      </div>
    </section>
  );
}
