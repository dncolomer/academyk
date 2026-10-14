"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Unit = {
  id: string;
  title: string;
  subtitle: string;
  hours: number;
  goal: string;
  concepts: string[];
  lab: string;
  challenge: string;
  outcomes: string[];
};

const units: Unit[] = [
  {
    id: "00",
    title: "Welcome to the QEC Lab",
    subtitle: "Why Quantum Computers Fail",
    hours: 2,
    goal: "Create an immediate reason to care about QEC by watching computation fail under noise.",
    concepts: [
      "Physical vs logical qubits",
      "Quantum noise: bit-flip, phase-flip, depolarising",
      "Decoherence and T1/T2 times",
      "Gate errors, measurement errors, correlated errors",
      "The no-cloning theorem",
      "Error mitigation vs error correction",
    ],
    lab: "How Long Can Your Qubit Survive? — vary circuit depth on a noisy qubit and observe when computation fails.",
    challenge: "Watch a GHZ state fail under increasing noise levels (0.1%, 1%, 5%).",
    outcomes: [
      "Explain why quantum errors accumulate faster than classical errors",
      "Identify different error types from circuit behaviour",
    ],
  },
  {
    id: "01",
    title: "Think Like an Error-Correction Engineer",
    subtitle: "Learning Through Classical Error Correction",
    hours: 4,
    goal: "Build intuition with classical codes before quantum complications.",
    concepts: [
      "Redundancy and repetition codes",
      "Parity checks and syndrome extraction",
      "Hamming distance and code distance",
      "Error detection vs error correction",
      "Parity-check matrices",
      "Quantum repetition code (bit-flip, phase-flip)",
      "Logical states and logical operators",
    ],
    lab: "Build a noisy classical channel, add redundancy, compare error rates before and after.",
    challenge: "Error Detection Puzzles — diagnose ~15 syndrome patterns as case files.",
    outcomes: [
      "Explain how parity checks detect errors without revealing data",
      "Calculate code distance from a parity-check matrix",
      "Implement a quantum repetition code",
    ],
  },
  {
    id: "02",
    title: "The Syndrome Is the Clue",
    subtitle: "Detecting Errors Without Measuring Quantum Information",
    hours: 4,
    goal: "Master syndrome extraction—the core mechanic of all QEC.",
    concepts: [
      "Data qubits vs ancilla qubits",
      "Parity measurements via ancilla",
      "Syndrome extraction circuits",
      "The odd-overlap rule",
      "Repeated syndrome measurements",
      "Detection events",
      "Measurement errors and their signatures",
    ],
    lab: "Build syndrome extraction circuits for bit-flip and phase-flip errors.",
    challenge: "Syndrome Case Files — diagnose ~20 syndrome histories including measurement errors.",
    outcomes: [
      "Design syndrome extraction circuits",
      "Distinguish data errors from measurement errors",
      "Explain why repeated measurements are necessary",
    ],
  },
  {
    id: "03",
    title: "Stabilisers and CSS Codes",
    subtitle: "The Language of Modern QEC",
    hours: 6,
    goal: "Teach stabiliser formalism as a useful tool, not abstract mathematics.",
    concepts: [
      "Pauli operators and Pauli strings",
      "Commutation and anticommutation",
      "Stabiliser generators and codespace",
      "Logical operators and the normaliser",
      "Code parameters [[n, k, d]]",
      "CSS construction from classical codes",
      "The dual code condition",
    ],
    lab: "Construct the Steane [[7,1,3]] code from two classical Hamming codes.",
    challenge: "Code Inspector — identify faults in proposed CSS codes (non-commuting stabilisers, wrong distance).",
    outcomes: [
      "Read and write stabiliser code specifications",
      "Verify code parameters computationally",
      "Construct CSS codes from parity-check matrices",
    ],
  },
  {
    id: "05",
    title: "Welcome to the Surface Code",
    subtitle: "Operating a Real QEC Architecture",
    hours: 6,
    goal: "The most important unit: learners simulate and operate a surface code.",
    concepts: [
      "Topology in QEC (torus vs planar)",
      "Rotated surface code layout",
      "X stabilisers and Z stabilisers",
      "Plaquettes and boundary conditions",
      "Logical operators as strings",
      "Code distance from lattice size",
      "Error chains and detection events",
    ],
    lab: "Operate a Surface Code (Stim) — generate circuits for d=3, 5, 7 and compare logical error rates.",
    challenge: "Save the Logical Qubit — determine required code distance for a target logical error rate.",
    outcomes: [
      "Explain why surface codes need only nearest-neighbour interactions",
      "Generate and simulate surface-code circuits with Stim",
      "Predict logical error scaling below threshold",
    ],
  },
  {
    id: "06",
    title: "Decoding",
    subtitle: "Turning Syndrome Clues Into Corrections",
    hours: 6,
    goal: "Make decoding a major differentiator—this is where engineering matters.",
    concepts: [
      "What a decoder does",
      "Decoding graphs and error chains",
      "Maximum-likelihood decoding",
      "Minimum-weight perfect matching (MWPM)",
      "Union-find decoding",
      "Decoder metrics: accuracy, latency, throughput, scalability",
    ],
    lab: "Build the QEC Pipeline — noise → circuit → syndrome → decoder → result.",
    challenge: "Decoder Showdown — compare MWPM vs Union-Find across scenarios.",
    outcomes: [
      "Implement a complete decode-and-correct pipeline",
      "Benchmark decoder performance systematically",
      "Choose appropriate decoders for different constraints",
    ],
  },
  {
    id: "07",
    title: "Find the Threshold",
    subtitle: "When Error Correction Actually Works",
    hours: 4,
    goal: "Understand the threshold—the most important number in QEC.",
    concepts: [
      "Physical error rate p vs logical error rate p_L",
      "The threshold p_th",
      "Below-threshold scaling: p_L ~ (p/p_th)^(d/2)",
      "Pseudo-threshold and finite-size effects",
      "Circuit-level vs code-capacity noise",
      "Monte Carlo sampling and error bars",
    ],
    lab: "Threshold Experiment (Sinter) — find the crossing point across distances 3, 5, 7, 9.",
    challenge: "Something Is Wrong — diagnose why larger distance gives worse results.",
    outcomes: [
      "Estimate a threshold from simulation data",
      "Explain why bigger codes can be worse above threshold",
      "Identify when a setup is below threshold",
    ],
  },
  {
    id: "08",
    title: "Real QEC Is Messy",
    subtitle: "Noise Models and Hardware",
    hours: 4,
    goal: "Show why the best QEC strategy depends on physical hardware.",
    concepts: [
      "Depolarising, dephasing, amplitude damping",
      "Biased noise",
      "Leakage and erasure errors",
      "Correlated errors (cosmic rays, TLS)",
      "Real-time decoding requirements",
      "Case studies: Google, neutral atoms, trapped ions",
    ],
    lab: "Same Code, Three Noise Models — compare surface code under depolarising, biased, and erasure noise.",
    challenge: "Diagnose the Hardware — identify dominant error types from syndrome data.",
    outcomes: [
      "Match noise models to hardware platforms",
      "Explain why erasure errors are easier than depolarising",
      "Adapt QEC strategies to noise structure",
    ],
  },
  {
    id: "09",
    title: "Beyond the Surface Code",
    subtitle: "qLDPC Codes and Lower Overhead",
    hours: 4,
    goal: "Introduce qLDPC codes as the next frontier in QEC.",
    concepts: [
      "Low-density parity-check (LDPC) codes",
      "The connectivity problem",
      "Bivariate bicycle codes, Gross codes",
      "Rate vs distance trade-offs",
      "Decoding qLDPC: BP+OSD",
      "Overhead comparisons with surface code",
    ],
    lab: "qLDPC Structure — verify code parameters and visualise the Tanner graph.",
    challenge: "When Will qLDPC Dominate? — discussion of connectivity limitations.",
    outcomes: [
      "Explain why qLDPC codes have lower overhead",
      "Identify connectivity challenges",
      "Compare surface code and qLDPC trade-offs",
    ],
  },
  {
    id: "10",
    title: "Fault-Tolerant Logic",
    subtitle: "Lattice Surgery and Magic States",
    hours: 5,
    goal: "Close the loop: how to compute fault-tolerantly on encoded qubits.",
    concepts: [
      "Fault distance and hook errors",
      "Transversal gates",
      "The Eastin-Knill theorem",
      "Lattice surgery: merge and split",
      "Magic state injection and distillation",
      "Magic state cultivation",
    ],
    lab: "Lattice Surgery Simulation — implement logical CNOT via merge-split.",
    challenge: "Cost a Computation — estimate resources for a small fault-tolerant circuit.",
    outcomes: [
      "Explain why universal computation requires magic states",
      "Implement logical gates via lattice surgery",
      "Estimate resource costs",
    ],
  },
  {
    id: "CAP",
    title: "Capstone: Ship a Logical Qubit",
    subtitle: "The Logical Qubit Lab, Complete",
    hours: 4,
    goal: "Demonstrate mastery by building a complete, working QEC system.",
    concepts: [
      "Integration of all course components",
      "Engineering trade-offs",
      "Benchmarking methodology",
      "Written defence of design choices",
    ],
    lab: "Given a noise model and qubit budget, achieve a target logical error rate.",
    challenge: "Defence: justify code, distance, and decoder choices.",
    outcomes: [
      "Integrate all components into a working system",
      "Make and defend engineering trade-offs",
      "Benchmark QEC performance systematically",
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
        <span className="ak-mono shrink-0 text-sm text-muted">{unit.hours}h</span>
        <span className="shrink-0 text-muted transition-transform" style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-line px-5 pb-6 pt-5 sm:px-6">
          <p className="text-sm leading-relaxed text-ink">{unit.goal}</p>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div>
              <p className="ak-label mb-2">Concepts</p>
              <ul className="space-y-1">
                {unit.concepts.map((c) => (
                  <li key={c} className="text-sm text-muted">
                    <span className="mr-2 text-cyan-400">›</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div>
                <p className="ak-label mb-2">Lab</p>
                <p className="text-sm text-muted">{unit.lab}</p>
              </div>
              <div>
                <p className="ak-label mb-2">Challenge</p>
                <p className="text-sm text-muted">{unit.challenge}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-line pt-5">
            <p className="ak-label mb-2">Learning Outcomes</p>
            <ul className="space-y-1">
              {unit.outcomes.map((o) => (
                <li key={o} className="text-sm text-muted">
                  <span className="mr-2 text-emerald-400">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function CourseOutline() {
  const [expanded, setExpanded] = useState<string | null>("00");
  const totalHours = units.reduce((sum, u) => sum + u.hours, 0);

  return (
    <section id="outline" className="scroll-mt-8">
      <header className="mb-8">
        <p className="ak-label">Course Structure</p>
        <h2 className="ak-serif mt-3 text-3xl text-ink sm:text-4xl">Full Outline</h2>
        <p className="mt-4 max-w-2xl text-muted">
          11 units plus a capstone project. {totalHours} hours of lab-style learning,
          from classical intuition to below-threshold operation.
        </p>
      </header>

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
          <p className="ak-label">Total</p>
          <p className="ak-serif mt-2 text-3xl text-cyan-400">{totalHours}h</p>
        </div>
        <div className="ak-card p-5">
          <p className="ak-label">Units</p>
          <p className="ak-serif mt-2 text-3xl text-cyan-400">{units.length - 1} + capstone</p>
        </div>
        <div className="ak-card p-5">
          <p className="ak-label">Tools</p>
          <p className="mt-2 text-sm text-muted">Stim, PyMatching, Sinter, Crumble</p>
        </div>
      </div>
    </section>
  );
}
