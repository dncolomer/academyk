"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";

type CellType = "markdown" | "code";
type CellStatus = "idle" | "running" | "success" | "error";

interface Cell {
  id: string;
  type: CellType;
  content: string;
  output?: string;
  status: CellStatus;
  editable: boolean;
}

const INITIAL_CELLS: Cell[] = [
  {
    id: "md-1",
    type: "markdown",
    content: `# Unit 1: Noise Models
## What kinds of errors actually happen?

In this notebook, we'll explore the fundamental noise processes that affect qubits. Understanding these errors is the first step toward correcting them.

**Learning Goals:**
- Create and simulate different noise types (bit flips, phase flips, depolarizing)
- Measure error rates by running many trials
- Understand which errors dominate in different scenarios`,
    status: "idle",
    editable: false,
  },
  {
    id: "code-1",
    type: "code",
    content: `import numpy as np
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
from qiskit_aer.noise import NoiseModel, pauli_error

# Create a simple qubit initialized to |0⟩
qc = QuantumCircuit(1, 1)
qc.measure(0, 0)

# Run without noise (baseline)
simulator = AerSimulator()
shots = 1000
result = simulator.run(qc, shots=shots).result()
counts = result.get_counts()
print(f"Baseline (no noise): {counts}")`,
    output: `Baseline (no noise): {'0': 1000}`,
    status: "success",
    editable: true,
  },
  {
    id: "md-2",
    type: "markdown",
    content: `## Bit-Flip Errors (X errors)

A bit-flip error flips |0⟩ → |1⟩ and |1⟩ → |0⟩. This is analogous to a classical bit flip.

**Try it:** Change the \`p_bitflip\` parameter below and observe how the error rate changes.`,
    status: "idle",
    editable: false,
  },
  {
    id: "code-2",
    type: "code",
    content: `# Bit-flip noise model
p_bitflip = 0.1  # 10% chance of X error

# Create noise model
bit_flip = pauli_error([('X', p_bitflip), ('I', 1 - p_bitflip)])
noise_model = NoiseModel()
noise_model.add_all_qubit_quantum_error(bit_flip, ['measure'])

# Run with bit-flip noise
result = simulator.run(qc, shots=shots, noise_model=noise_model).result()
counts = result.get_counts()
error_rate = counts.get('1', 0) / shots
print(f"Bit-flip noise (p={p_bitflip}): {counts}")
print(f"Measured error rate: {error_rate:.1%}")`,
    output: `Bit-flip noise (p=0.1): {'0': 901, '1': 99}
Measured error rate: 9.9%`,
    status: "success",
    editable: true,
  },
  {
    id: "md-3",
    type: "markdown",
    content: `## Phase-Flip Errors (Z errors)

A phase-flip error adds a minus sign to |1⟩: |1⟩ → -|1⟩. This doesn't change measurement outcomes in the computational basis, but destroys superposition states.

Let's prepare a superposition and measure in the X basis to see phase errors.`,
    status: "idle",
    editable: false,
  },
  {
    id: "code-3",
    type: "code",
    content: `# Create |+⟩ state and measure in X basis
qc_phase = QuantumCircuit(1, 1)
qc_phase.h(0)  # |+⟩ = (|0⟩ + |1⟩)/√2
# A Z error turns |+⟩ into |-⟩
qc_phase.h(0)  # Rotate back: |+⟩ → |0⟩, |-⟩ → |1⟩
qc_phase.measure(0, 0)

# Phase-flip noise
p_phaseflip = 0.15
phase_flip = pauli_error([('Z', p_phaseflip), ('I', 1 - p_phaseflip)])
noise_model_z = NoiseModel()
noise_model_z.add_all_qubit_quantum_error(phase_flip, ['h'])

result = simulator.run(qc_phase, shots=shots, noise_model=noise_model_z).result()
counts = result.get_counts()
error_rate = counts.get('1', 0) / shots
print(f"Phase-flip noise (p={p_phaseflip}): {counts}")
print(f"Measured error rate: {error_rate:.1%}")`,
    output: `Phase-flip noise (p=0.15): {'0': 849, '1': 151}
Measured error rate: 15.1%`,
    status: "success",
    editable: true,
  },
  {
    id: "md-4",
    type: "markdown",
    content: `## Depolarizing Noise

Real quantum hardware experiences a mix of X, Y, and Z errors. **Depolarizing noise** models this by applying each Pauli operator with equal probability.

This is the noise model we'll use throughout the course for our Decoder Co-Design Lab.`,
    status: "idle",
    editable: false,
  },
  {
    id: "code-4",
    type: "code",
    content: `# Depolarizing noise: equal probability of X, Y, Z
p_depol = 0.05  # 5% total error rate

# Each Pauli gets p/3 probability
depol_error = pauli_error([
    ('X', p_depol/3),
    ('Y', p_depol/3),
    ('Z', p_depol/3),
    ('I', 1 - p_depol)
])

noise_model_depol = NoiseModel()
noise_model_depol.add_all_qubit_quantum_error(depol_error, ['measure'])

# Test on computational basis
result = simulator.run(qc, shots=shots, noise_model=noise_model_depol).result()
counts_comp = result.get_counts()

# Test on superposition (sensitive to all error types)
result_sup = simulator.run(qc_phase, shots=shots, noise_model=noise_model_depol).result()
counts_sup = result_sup.get_counts()

print(f"Depolarizing (p={p_depol}) on |0⟩: {counts_comp}")
print(f"Depolarizing (p={p_depol}) on |+⟩: {counts_sup}")`,
    output: `Depolarizing (p=0.05) on |0⟩: {'0': 966, '1': 34}
Depolarizing (p=0.05) on |+⟩: {'0': 951, '1': 49}`,
    status: "success",
    editable: true,
  },
  {
    id: "md-5",
    type: "markdown",
    content: `## Project Contribution: Your Noise Model

**Your task:** Choose parameters for the noise model that will be used throughout the course.

The cell below defines the shared noise model. Experiment with different values and think about:
- What error rate is realistic for current hardware? (Hint: ~0.1% to 1%)
- Should all error types have equal probability?

This noise model becomes the foundation for all subsequent units.`,
    status: "idle",
    editable: false,
  },
  {
    id: "code-5",
    type: "code",
    content: `# PROJECT: Define the shared noise model
# These parameters will be used for the entire Decoder Co-Design Lab

PHYSICAL_ERROR_RATE = 0.003  # 0.3% - typical for good superconducting qubits

# You can adjust the bias if you want more Z errors than X/Y
Z_BIAS = 1.0  # 1.0 = symmetric, >1 = more Z errors

# Calculate individual error probabilities
p_x = PHYSICAL_ERROR_RATE / (2 + Z_BIAS)
p_y = p_x
p_z = p_x * Z_BIAS
p_i = 1 - (p_x + p_y + p_z)

print("=== Shared Noise Model for Decoder Co-Design Lab ===")
print(f"Total physical error rate: {PHYSICAL_ERROR_RATE:.2%}")
print(f"P(X error) = {p_x:.4%}")
print(f"P(Y error) = {p_y:.4%}")
print(f"P(Z error) = {p_z:.4%}")
print(f"P(no error) = {p_i:.4%}")
print(f"\\nZ bias factor: {Z_BIAS}")`,
    output: `=== Shared Noise Model for Decoder Co-Design Lab ===
Total physical error rate: 0.30%
P(X error) = 0.1000%
P(Y error) = 0.1000%
P(Z error) = 0.1000%
P(no error) = 99.7000%

Z bias factor: 1.0`,
    status: "success",
    editable: true,
  },
];

function MarkdownCell({ content }: { content: string }) {
  const lines = content.split("\n");
  
  return (
    <div className="prose prose-invert max-w-none px-4 py-3">
      {lines.map((line, i) => {
        if (line.startsWith("# ")) {
          return <h1 key={i} className="ak-serif mb-2 mt-0 text-2xl text-ink">{line.slice(2)}</h1>;
        }
        if (line.startsWith("## ")) {
          return <h2 key={i} className="ak-serif mb-2 mt-4 text-xl text-ink">{line.slice(3)}</h2>;
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="mb-2 font-semibold text-ink">{line.slice(2, -2)}</p>;
        }
        if (line.startsWith("- ")) {
          return <li key={i} className="ml-4 text-sm text-muted">{line.slice(2)}</li>;
        }
        if (line.trim() === "") {
          return <br key={i} />;
        }
        const formatted = line
          .replace(/\*\*(.+?)\*\*/g, '<strong class="text-ink">$1</strong>')
          .replace(/`(.+?)`/g, '<code class="rounded bg-ink/10 px-1 py-0.5 text-cyan-400">$1</code>');
        return <p key={i} className="mb-2 text-sm text-muted" dangerouslySetInnerHTML={{ __html: formatted }} />;
      })}
    </div>
  );
}

function CodeCell({ 
  cell, 
  onRun, 
  onEdit,
  cellNumber 
}: { 
  cell: Cell; 
  onRun: () => void;
  onEdit: (content: string) => void;
  cellNumber: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(cell.content);

  const handleSave = () => {
    onEdit(editContent);
    setIsEditing(false);
  };

  return (
    <div className="border-l-2 border-cyan-400/50">
      <div className="flex items-center gap-2 bg-ink/5 px-3 py-1.5">
        <span className="ak-mono text-xs text-muted">In [{cellNumber}]:</span>
        <div className="flex-1" />
        {cell.editable && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded px-2 py-0.5 text-xs text-muted hover:bg-ink/10 hover:text-ink"
          >
            Edit
          </button>
        )}
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="rounded bg-cyan-400/20 px-2 py-0.5 text-xs text-cyan-400 hover:bg-cyan-400/30"
            >
              Save
            </button>
            <button
              onClick={() => { setIsEditing(false); setEditContent(cell.content); }}
              className="rounded px-2 py-0.5 text-xs text-muted hover:bg-ink/10 hover:text-ink"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={onRun}
            disabled={cell.status === "running"}
            className={cn(
              "flex items-center gap-1 rounded px-2 py-0.5 text-xs",
              cell.status === "running"
                ? "cursor-not-allowed text-muted"
                : "text-emerald-400 hover:bg-emerald-400/10"
            )}
          >
            {cell.status === "running" ? (
              <>
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Running...
              </>
            ) : (
              <>▶ Run</>
            )}
          </button>
        )}
      </div>
      
      {isEditing ? (
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="ak-mono w-full resize-none bg-[#0a0a0f] p-3 text-sm text-ink focus:outline-none"
          rows={editContent.split("\n").length + 1}
          spellCheck={false}
        />
      ) : (
        <pre className="ak-mono overflow-x-auto bg-[#0a0a0f] p-3 text-sm">
          <code className="text-ink/90">{cell.content}</code>
        </pre>
      )}

      {cell.output && (
        <div className="border-t border-line/30">
          <div className="flex items-center gap-2 bg-ink/5 px-3 py-1.5">
            <span className="ak-mono text-xs text-muted">Out [{cellNumber}]:</span>
          </div>
          <pre className="ak-mono overflow-x-auto bg-[#0d0d12] p-3 text-sm">
            <code className={cn(
              cell.status === "error" ? "text-red-400" : "text-emerald-400/80"
            )}>{cell.output}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export function NotebookDemo() {
  const [cells, setCells] = useState<Cell[]>(INITIAL_CELLS);

  const runCell = useCallback((cellId: string) => {
    setCells(prev => prev.map(c => 
      c.id === cellId ? { ...c, status: "running" as CellStatus } : c
    ));

    setTimeout(() => {
      setCells(prev => prev.map(c => 
        c.id === cellId ? { ...c, status: "success" as CellStatus } : c
      ));
    }, 800 + Math.random() * 400);
  }, []);

  const editCell = useCallback((cellId: string, content: string) => {
    setCells(prev => prev.map(c => 
      c.id === cellId ? { ...c, content } : c
    ));
  }, []);

  let codeCount = 0;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="ak-label">Interactive Demo</p>
          <h2 className="ak-serif mt-2 text-2xl text-ink">Unit 1: Noise Models</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="ak-mono text-xs text-muted">Colab-style notebook</span>
          <div className="flex h-6 items-center gap-1 rounded-full bg-ink/10 px-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-muted">Connected</span>
          </div>
        </div>
      </div>

      <div className="ak-card overflow-hidden">
        <div className="flex items-center gap-2 border-b border-line bg-ink/5 px-4 py-2">
          <button className="rounded px-2 py-1 text-xs text-muted hover:bg-ink/10 hover:text-ink">
            File
          </button>
          <button className="rounded px-2 py-1 text-xs text-muted hover:bg-ink/10 hover:text-ink">
            Edit
          </button>
          <button className="rounded px-2 py-1 text-xs text-muted hover:bg-ink/10 hover:text-ink">
            View
          </button>
          <button className="rounded px-2 py-1 text-xs text-muted hover:bg-ink/10 hover:text-ink">
            Runtime
          </button>
          <div className="flex-1" />
          <button 
            onClick={() => cells.filter(c => c.type === "code").forEach(c => runCell(c.id))}
            className="rounded bg-cyan-400/20 px-3 py-1 text-xs text-cyan-400 hover:bg-cyan-400/30"
          >
            Run All
          </button>
        </div>

        <div className="divide-y divide-line/30">
          {cells.map((cell) => {
            if (cell.type === "markdown") {
              return (
                <div key={cell.id} className="bg-[#0a0a0f]">
                  <MarkdownCell content={cell.content} />
                </div>
              );
            }
            codeCount++;
            return (
              <div key={cell.id} className="bg-[#0a0a0f]">
                <CodeCell
                  cell={cell}
                  cellNumber={codeCount}
                  onRun={() => runCell(cell.id)}
                  onEdit={(content) => editCell(cell.id, content)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-muted">
        This is a demonstration of the Formal notebook interface. 
        In the full course, notebooks run on Google Colab with real quantum simulators.
      </p>
    </div>
  );
}
