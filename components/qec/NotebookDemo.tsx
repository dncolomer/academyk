"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import {
  runNoiseSimulation,
  calculateErrorAccumulation,
  PRESET_NOISE_MODELS,
  formatPercent,
  type NoiseModelParams,
} from "./engine/noise-sim";

type MessageRole = "question" | "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  isSimResult?: boolean;
}

interface CellContext {
  selectedErrors?: string[];
  dominantPick?: string;
  depthConcern?: string;
  biasPick?: string;
  noiseParams?: NoiseModelParams;
}

interface Cell {
  id: string;
  number: number;
  question: string;
  prompts: { label: string; key: string }[];
  messages: Message[];
}

const generateId = () => Math.random().toString(36).slice(2, 9);

function buildInitialCells(): Cell[] {
  return [
    {
      id: "cell-1",
      number: 1,
      question: "What actually happens when a qubit experiences an error? Let's start with the three fundamental error types.",
      prompts: [
        { label: "What is a bit-flip (X) error?", key: "x-error" },
        { label: "What is a phase-flip (Z) error?", key: "z-error" },
        { label: "What about Y errors?", key: "y-error" },
        { label: "Show me all three with numbers", key: "all-errors" },
      ],
      messages: [],
    },
    {
      id: "cell-2",
      number: 2,
      question: "In real hardware, which errors happen most often? This shapes everything we do in QEC.",
      prompts: [
        { label: "Are all error types equally likely?", key: "equal-likely" },
        { label: "What is depolarizing noise?", key: "depolarizing" },
        { label: "Why might Z errors dominate?", key: "z-dominant" },
        { label: "Simulate 10,000 gates and count", key: "sim-count" },
      ],
      messages: [],
    },
    {
      id: "cell-3",
      number: 3,
      question: "Errors accumulate as circuits get deeper. How bad does it get?",
      prompts: [
        { label: "10 gates vs 100 gates vs 1000", key: "depth-compare" },
        { label: "When does computation become useless?", key: "useless-point" },
        { label: "Why can't we just use fewer gates?", key: "fewer-gates" },
      ],
      messages: [],
    },
    {
      id: "cell-4",
      number: 4,
      question: "Phase errors are sneaky. They don't flip bits, so when do they actually matter?",
      prompts: [
        { label: "What does a Z error do to |0⟩?", key: "z-on-zero" },
        { label: "What about superpositions?", key: "z-on-super" },
        { label: "Why are phase errors hard to catch?", key: "phase-hard" },
        { label: "Simulate: Z errors on |+⟩ state", key: "sim-z-plus" },
      ],
      messages: [],
    },
    {
      id: "cell-5",
      number: 5,
      question: "Hardware noise is often biased—one error type dominates. Why should we care?",
      prompts: [
        { label: "What is biased noise?", key: "biased-noise" },
        { label: "How does bias affect QEC?", key: "bias-qec" },
        { label: "Compare: symmetric vs Z-biased", key: "compare-bias" },
      ],
      messages: [],
    },
    {
      id: "cell-6",
      number: 6,
      question: "Project contribution: Define the noise model that everyone will use for the rest of the course.",
      prompts: [
        { label: "Use symmetric noise (0.1% each)", key: "pick-symmetric" },
        { label: "Use Z-biased noise (2:1 ratio)", key: "pick-zbiased" },
        { label: "Use realistic superconducting (0.3%)", key: "pick-realistic" },
        { label: "Show me the final model summary", key: "show-summary" },
      ],
      messages: [],
    },
  ];
}

function getScriptedReply(
  promptKey: string,
  context: CellContext,
  cellNumber: number
): { content: string; contextUpdate?: Partial<CellContext> } {
  const sim = runNoiseSimulation(PRESET_NOISE_MODELS.symmetric, 100);
  const simZBias = runNoiseSimulation(PRESET_NOISE_MODELS.zBiased, 100);
  const depthResults = calculateErrorAccumulation(0.003, [10, 100, 1000]);

  const replies: Record<string, { content: string; contextUpdate?: Partial<CellContext> }> = {
    "x-error": {
      content: `**Bit-flip (X) error:** Flips |0⟩ → |1⟩ and |1⟩ → |0⟩. This is the quantum version of a classical bit flip.

In the Pauli matrix form: X = [[0,1],[1,0]]. When applied to a qubit, it swaps the amplitudes of |0⟩ and |1⟩.

*Simulation:* At 0.1% X error rate per gate, running 100 gates produces an X error ~${formatPercent(1 - Math.pow(0.999, 100))} of the time.`,
      contextUpdate: { selectedErrors: [...(context.selectedErrors || []), "X"] },
    },
    "z-error": {
      content: `**Phase-flip (Z) error:** Leaves |0⟩ unchanged but flips |1⟩ → -|1⟩. This changes the *phase* of the quantum state.

In matrix form: Z = [[1,0],[0,-1]]. It looks invisible if you only measure in the computational basis!

*Simulation:* A Z error on |0⟩ does nothing observable. But on |+⟩ = (|0⟩+|1⟩)/√2, it flips it to |-⟩ = (|0⟩-|1⟩)/√2.`,
      contextUpdate: { selectedErrors: [...(context.selectedErrors || []), "Z"] },
    },
    "y-error": {
      content: `**Y error:** A combination of both X and Z (up to a phase). Y = iXZ.

It both flips the bit AND flips the phase. In matrix form: Y = [[0,-i],[i,0]].

*Simulation:* Y errors are detected by BOTH X-type and Z-type stabilizers in CSS codes. This makes them easier to catch but also more destructive.`,
      contextUpdate: { selectedErrors: [...(context.selectedErrors || []), "Y"] },
    },
    "all-errors": {
      content: `**All three error types at a glance:**

| Error | Effect on |0⟩ | Effect on |1⟩ | Effect on |+⟩ |
|-------|-----------|-----------|-----------|
| X | → |1⟩ | → |0⟩ | → |+⟩ (no change) |
| Z | → |0⟩ (no change) | → -|1⟩ | → |-⟩ |
| Y | → i|1⟩ | → -i|0⟩ | → i|-⟩ |

*Simulation with symmetric 0.1% per gate:*
After 100 gates: ${sim.errorCounts.X} X errors, ${sim.errorCounts.Y} Y errors, ${sim.errorCounts.Z} Z errors observed across 10,000 trials.`,
      contextUpdate: { selectedErrors: ["X", "Y", "Z"] },
    },
    "equal-likely": {
      content: `Not always! In **depolarizing noise**, yes—X, Y, Z each occur with probability p/3.

But real hardware often has **biased noise**. Superconducting qubits typically see more Z (dephasing) errors than X (bit-flip) errors, sometimes by a factor of 10-100×.

*Simulation:* With symmetric noise at 0.3% total: X=${formatPercent(0.001)}, Y=${formatPercent(0.001)}, Z=${formatPercent(0.001)} per gate.`,
    },
    "depolarizing": {
      content: `**Depolarizing noise** is the "democratic" error model: each Pauli error (X, Y, Z) has equal probability.

If total error rate is p, then:
- P(X) = p/3
- P(Y) = p/3  
- P(Z) = p/3
- P(no error) = 1-p

*Simulation (p=0.3%):* After 100 gates on 10,000 trials, we see roughly equal counts: X≈${Math.round(sim.errorCounts.X)}, Y≈${Math.round(sim.errorCounts.Y)}, Z≈${Math.round(sim.errorCounts.Z)}.

This is a common benchmark model, but real hardware is usually biased.`,
    },
    "z-dominant": {
      content: `Z errors (dephasing) often dominate because of how physical qubits work.

**In superconducting qubits:** The energy levels that encode |0⟩ and |1⟩ fluctuate due to noise in the environment. This causes the *phase* to drift (T2 decay) faster than the *population* flips (T1 decay).

Typical ratio: T1/T2 ≈ 2, meaning dephasing is twice as fast as bit-flips.

*Simulation (Z-biased, 4:1 ratio):* After 100 gates: X=${simZBias.errorCounts.X}, Z=${simZBias.errorCounts.Z}. Z errors clearly dominate.`,
      contextUpdate: { dominantPick: "Z" },
    },
    "sim-count": {
      content: `**Simulation: 10,000 circuits × 100 gates each**

With symmetric noise (0.1% per Pauli per gate):
- X errors: ${sim.errorCounts.X} total (${formatPercent(sim.errorCounts.X / (sim.errorCounts.X + sim.errorCounts.Y + sim.errorCounts.Z + sim.errorCounts.I))} of all events)
- Y errors: ${sim.errorCounts.Y} total
- Z errors: ${sim.errorCounts.Z} total
- No error: ${sim.errorCounts.I} slots

Logical error rate (unprotected): ${formatPercent(sim.pLogicalError)}

*The simulator shows:* Even at 0.3% physical error rate, an unprotected 100-gate circuit fails about ${formatPercent(sim.pLogicalError)} of the time.`,
    },
    "depth-compare": {
      content: `**How errors accumulate with circuit depth:**

At 0.3% error rate per gate:
| Depth | P(at least one error) |
|-------|----------------------|
| 10 gates | ${formatPercent(depthResults[0])} |
| 100 gates | ${formatPercent(depthResults[1])} |
| 1000 gates | ${formatPercent(depthResults[2])} |

${context.selectedErrors?.includes("Z") ? "Earlier you explored Z errors—imagine those accumulating with depth!" : ""}

*The simulator shows:* By 1000 gates, you're almost certain to have errors. This is why we need QEC.`,
      contextUpdate: { depthConcern: "1000" },
    },
    "useless-point": {
      content: `Computation becomes useless when P(logical error) ≈ 50%—you're just guessing at that point.

**Rule of thumb:** If physical error rate is p, after ~1/p gates you're likely to have at least one error.

At p = 0.3%: ~300 gates before you expect an error.
At p = 1%: ~100 gates before you expect an error.

${context.depthConcern ? `You saw earlier that at 1000 gates, error probability is ${formatPercent(depthResults[2])}.` : ""}

*This is the core problem QEC solves:* We need thousands or millions of gates for useful algorithms.`,
    },
    "fewer-gates": {
      content: `We can't just use fewer gates because useful quantum algorithms *require* deep circuits:

- **Shor's factoring:** ~O(n³) gates for n-bit numbers → millions of gates
- **Chemistry simulation:** Thousands of Trotter steps → millions of gates
- **Grover search:** √N iterations → thousands of gates for large N

${context.depthConcern ? "Earlier you saw that 1000 gates already gives near-certain errors. Algorithms need 10,000× more." : ""}

*The only solution:* Error correction that can run indefinitely without accumulating errors.`,
    },
    "z-on-zero": {
      content: `Z|0⟩ = |0⟩. **Nothing happens!**

This is why phase errors are sneaky. If you measure in the computational basis {|0⟩, |1⟩}, you can't tell if a Z error occurred on |0⟩.

Similarly: Z|1⟩ = -|1⟩. The minus sign is a "global phase" that's also unobservable in a single measurement.

*Simulation:* Applying Z errors to |0⟩ states, 0% are detected by computational basis measurement.`,
    },
    "z-on-super": {
      content: `On superpositions, Z errors are devastating:

- Z|+⟩ = |-⟩ (completely orthogonal!)
- Z|-⟩ = |+⟩

The |+⟩ and |-⟩ states differ by a relative phase, and Z flips that phase.

*Simulation:* Measuring |+⟩ in the X basis: P(+)=100%, P(-)=0%
After Z error: P(+)=0%, P(-)=100%

${context.selectedErrors?.includes("X") ? "Compare this to X errors, which flip |0⟩↔|1⟩ directly." : ""}

This matters for any algorithm using superposition—which is all of them.`,
    },
    "phase-hard": {
      content: `Phase errors are hard to catch because they're **invisible in the wrong basis.**

- If you only measure in {|0⟩,|1⟩}: Z errors on |0⟩ or |1⟩ are undetectable
- You need X-type stabilizers (measured in a rotated basis) to detect Z errors

*This is why QEC codes have BOTH X and Z stabilizers:*
- Z stabilizers catch X errors
- X stabilizers catch Z errors

${context.dominantPick === "Z" ? "Earlier you noted Z errors often dominate in hardware—this means X stabilizers are crucial!" : ""}`,
    },
    "sim-z-plus": {
      content: `**Simulation: Z errors on |+⟩ states**

Setup: Prepare |+⟩, apply Z error with probability p, measure in X basis.

| Error Rate | P(correct |+⟩) | P(flipped to |-⟩) |
|-----------|----------------|-------------------|
| 0.1% | 99.9% | 0.1% |
| 1% | 99% | 1% |
| 10% | 90% | 10% |

*The simulator shows:* Z errors directly flip the measurement outcome in the X basis. This is exactly what an X-type stabilizer would detect!`,
    },
    "biased-noise": {
      content: `**Biased noise** means one error type occurs more often than others.

Common in real hardware:
- **Superconducting qubits:** Z errors dominate (T2 < T1)
- **Cat qubits:** Exponentially suppressed X errors (designed bias)
- **Spin qubits:** Often X-biased (environmental magnetic noise)

A bias ratio η = P(Z)/P(X) can range from 2 to 1000+ depending on the platform.

${context.selectedErrors?.length ? `You've explored ${context.selectedErrors.join(", ")} errors—bias determines which you'll see most.` : ""}`,
    },
    "bias-qec": {
      content: `Bias fundamentally changes QEC strategy:

**If Z errors dominate (η >> 1):**
- Use fewer X stabilizers (they detect Z errors)
- Or use specialized "bias-preserving" codes like XZZX
- Can achieve higher thresholds by tailoring to the bias

**If errors are symmetric (η ≈ 1):**
- Standard surface code works well
- Need equal resources for X and Z detection

*Simulation (Z-biased, η=4):* Logical error rate is ${formatPercent(simZBias.pLogicalError)} vs ${formatPercent(sim.pLogicalError)} for symmetric noise at same total rate.`,
      contextUpdate: { biasPick: "aware" },
    },
    "compare-bias": {
      content: `**Comparison: Symmetric vs Z-biased noise**

Both at 0.3% total error rate, 100 gates, 10,000 trials:

| Model | X errors | Y errors | Z errors | P(logical) |
|-------|----------|----------|----------|------------|
| Symmetric | ${sim.errorCounts.X} | ${sim.errorCounts.Y} | ${sim.errorCounts.Z} | ${formatPercent(sim.pLogicalError)} |
| Z-biased (4:1) | ${simZBias.errorCounts.X} | ${simZBias.errorCounts.Y} | ${simZBias.errorCounts.Z} | ${formatPercent(simZBias.pLogicalError)} |

${context.dominantPick === "Z" ? "This confirms what you suspected earlier—Z errors really do dominate in biased systems!" : ""}

*The simulator shows:* Same total rate, different distribution. QEC codes can exploit this!`,
    },
    "pick-symmetric": {
      content: `**Noise Model Selected: Symmetric Depolarizing**

\`\`\`
SHARED_NOISE_MODEL = {
  p_X: 0.001,  // 0.1% per gate
  p_Y: 0.001,  // 0.1% per gate
  p_Z: 0.001,  // 0.1% per gate
  total: 0.003 // 0.3% total
  bias: "symmetric"
}
\`\`\`

This model treats all error types equally—a good baseline for comparing codes.

${context.depthConcern ? `At your earlier depth of ${context.depthConcern} gates, expect ~${formatPercent(1 - Math.pow(0.997, parseInt(context.depthConcern)))} probability of error.` : ""}

*Project contribution locked in. Everyone will use this noise model.*`,
      contextUpdate: { noiseParams: { pX: 0.001, pY: 0.001, pZ: 0.001 } },
    },
    "pick-zbiased": {
      content: `**Noise Model Selected: Z-Biased (2:1 ratio)**

\`\`\`
SHARED_NOISE_MODEL = {
  p_X: 0.00075,  // 0.075% per gate
  p_Y: 0.00075,  // 0.075% per gate
  p_Z: 0.0015,   // 0.15% per gate
  total: 0.003   // 0.3% total
  bias: "Z-dominant (η=2)"
}
\`\`\`

${context.biasPick === "aware" ? "Earlier you learned that bias affects QEC strategy—this model lets us explore that!" : ""}

This matches typical superconducting hardware where dephasing exceeds bit-flip.

*Project contribution locked in. Everyone will use this noise model.*`,
      contextUpdate: { noiseParams: { pX: 0.00075, pY: 0.00075, pZ: 0.0015 } },
    },
    "pick-realistic": {
      content: `**Noise Model Selected: Realistic Superconducting**

\`\`\`
SHARED_NOISE_MODEL = {
  p_X: 0.0005,  // 0.05% per gate
  p_Y: 0.0005,  // 0.05% per gate  
  p_Z: 0.002,   // 0.2% per gate
  total: 0.003  // 0.3% total
  bias: "Z-dominant (η=4)"
}
\`\`\`

Based on published Google/IBM device parameters (2024).

${context.dominantPick === "Z" ? "This confirms your earlier intuition—Z errors dominate at 4:1!" : ""}

*Project contribution locked in. Everyone will use this noise model.*`,
      contextUpdate: { noiseParams: { pX: 0.0005, pY: 0.0005, pZ: 0.002 } },
    },
    "show-summary": {
      content: context.noiseParams
        ? `**Project Contribution Complete: Shared Noise Model**

Throughout this notebook, you explored:
${context.selectedErrors?.length ? `- Error types: ${context.selectedErrors.join(", ")}` : "- The three fundamental error types (X, Y, Z)"}
${context.depthConcern ? `- Depth effects: saw errors reach ${formatPercent(1 - Math.pow(0.997, parseInt(context.depthConcern)))} at ${context.depthConcern} gates` : "- How errors accumulate with circuit depth"}
${context.dominantPick ? `- Dominant error: you identified ${context.dominantPick} as often dominant` : "- Which errors dominate in real hardware"}
${context.biasPick ? `- Bias implications for QEC strategy` : "- Why noise bias matters for code design"}

**Your chosen noise model:**
\`\`\`
p_X = ${formatPercent(context.noiseParams.pX)} per gate
p_Y = ${formatPercent(context.noiseParams.pY)} per gate
p_Z = ${formatPercent(context.noiseParams.pZ)} per gate
\`\`\`

*This model will be used for all simulations in Units 2-11.*`
        : `You haven't selected a noise model yet. Choose one of the options above to complete your project contribution.

Options:
- Symmetric (equal X, Y, Z)
- Z-biased (2:1 ratio)
- Realistic superconducting (4:1 ratio)`,
    },
  };

  return replies[promptKey] || {
    content: `I don't have a specific response for that. Try one of the suggested prompts, or ask about error types, accumulation, or bias.`,
  };
}

function getFreeTextReply(text: string, context: CellContext, cellNumber: number): string {
  const lower = text.toLowerCase();
  
  if (lower.includes("x error") || lower.includes("bit flip") || lower.includes("bit-flip")) {
    return getScriptedReply("x-error", context, cellNumber).content;
  }
  if (lower.includes("z error") || lower.includes("phase flip") || lower.includes("phase-flip") || lower.includes("dephasing")) {
    return getScriptedReply("z-error", context, cellNumber).content;
  }
  if (lower.includes("y error")) {
    return getScriptedReply("y-error", context, cellNumber).content;
  }
  if (lower.includes("depolariz")) {
    return getScriptedReply("depolarizing", context, cellNumber).content;
  }
  if (lower.includes("bias")) {
    return getScriptedReply("biased-noise", context, cellNumber).content;
  }
  if (lower.includes("accumul") || lower.includes("depth") || lower.includes("how many gate")) {
    return getScriptedReply("depth-compare", context, cellNumber).content;
  }
  if (lower.includes("superposition") || lower.includes("|+")) {
    return getScriptedReply("z-on-super", context, cellNumber).content;
  }
  if (lower.includes("threshold") || lower.includes("useless") || lower.includes("fail")) {
    return getScriptedReply("useless-point", context, cellNumber).content;
  }
  
  const contextHints: string[] = [];
  if (context.selectedErrors?.length) {
    contextHints.push(`You've explored ${context.selectedErrors.join(", ")} errors`);
  }
  if (context.dominantPick) {
    contextHints.push(`earlier you identified ${context.dominantPick} as often dominant`);
  }
  if (context.noiseParams) {
    contextHints.push(`your selected noise model has P(X)=${formatPercent(context.noiseParams.pX)}, P(Z)=${formatPercent(context.noiseParams.pZ)}`);
  }
  
  return `I can help with questions about quantum error types (X, Y, Z), how errors accumulate with circuit depth, phase errors on superpositions, or biased noise models.

${contextHints.length ? `Context from your exploration: ${contextHints.join("; ")}.` : ""}

Try asking about one of these topics, or use the suggested prompts above.

*Remember: All numbers come from the simulator—it's the source of truth.*`;
}

function CellComponent({
  cell,
  context,
  onSendPrompt,
  onSendFreeText,
}: {
  cell: Cell;
  context: CellContext;
  onSendPrompt: (cellId: string, promptKey: string) => void;
  onSendFreeText: (cellId: string, text: string) => void;
}) {
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [cell.messages.length]);

  const handlePromptClick = (key: string) => {
    setIsThinking(true);
    setTimeout(() => {
      onSendPrompt(cell.id, key);
      setIsThinking(false);
    }, 300 + Math.random() * 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;
    setIsThinking(true);
    const text = input;
    setInput("");
    setTimeout(() => {
      onSendFreeText(cell.id, text);
      setIsThinking(false);
    }, 400 + Math.random() * 300);
  };

  return (
    <div className="border-l-2 border-cyan-400/50">
      <div className="flex items-start gap-3 bg-ink/5 px-3 py-3 sm:px-4">
        <span className="ak-mono shrink-0 text-sm text-cyan-400">[{cell.number}]</span>
        <p className="flex-1 text-sm leading-relaxed text-ink sm:text-base">{cell.question}</p>
      </div>

      <div className="space-y-2 px-3 py-3 sm:px-4">
        <div className="flex flex-wrap gap-2">
          {cell.prompts.map((p) => (
            <button
              key={p.key}
              onClick={() => handlePromptClick(p.key)}
              disabled={isThinking}
              className={cn(
                "rounded-full border border-line px-3 py-1.5 text-xs transition-colors sm:text-sm",
                isThinking
                  ? "cursor-not-allowed opacity-50"
                  : "hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-400"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Or type your own question..."
            disabled={isThinking}
            className="flex-1 rounded border border-line bg-transparent px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-cyan-400/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className={cn(
              "rounded px-3 py-2 text-sm transition-colors",
              input.trim() && !isThinking
                ? "bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30"
                : "cursor-not-allowed bg-ink/10 text-muted"
            )}
          >
            Ask
          </button>
        </form>
      </div>

      {cell.messages.length > 0 && (
        <div className="border-t border-line/30">
          {cell.messages.map((msg, idx) => (
            <div
              key={msg.id}
              className={cn(
                "px-3 py-3 sm:px-4",
                msg.role === "user" ? "bg-ink/5" : "bg-[#0a0a0f]"
              )}
            >
              <div className="flex items-start gap-3">
                <span className="ak-mono shrink-0 text-xs text-muted">
                  {msg.role === "user" ? "In" : "Out"}[{cell.number}.{idx + 1}]:
                </span>
                <div className="min-w-0 flex-1">
                  {msg.role === "user" ? (
                    <p className="text-sm text-ink">{msg.content}</p>
                  ) : (
                    <div className="prose prose-invert prose-sm max-w-none">
                      <FormattedContent content={msg.content} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {isThinking && (
        <div className="flex items-center gap-2 border-t border-line/30 bg-[#0a0a0f] px-3 py-3 sm:px-4">
          <span className="ak-mono text-xs text-muted">Out[{cell.number}.{cell.messages.length + 1}]:</span>
          <span className="flex items-center gap-1 text-sm text-muted">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400" style={{ animationDelay: "0.2s" }} />
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400" style={{ animationDelay: "0.4s" }} />
          </span>
        </div>
      )}
    </div>
  );
}

function FormattedContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let tableLines: string[] = [];
  let codeLines: string[] = [];
  let inCode = false;

  const flushTable = () => {
    if (tableLines.length > 0) {
      const headers = tableLines[0].split("|").filter(Boolean).map(s => s.trim());
      const rows = tableLines.slice(2).map(line => 
        line.split("|").filter(Boolean).map(s => s.trim())
      );
      elements.push(
        <div key={elements.length} className="my-2 overflow-x-auto text-xs">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-line">
                {headers.map((h, i) => (
                  <th key={i} className="px-2 py-1 text-left text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-line/30">
                  {row.map((cell, j) => (
                    <td key={j} className="px-2 py-1 text-ink">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableLines = [];
    }
  };

  const flushCode = () => {
    if (codeLines.length > 0) {
      elements.push(
        <pre key={elements.length} className="my-2 overflow-x-auto rounded bg-[#0d0d15] p-2 text-xs">
          <code className="text-cyan-400">{codeLines.join("\n")}</code>
        </pre>
      );
      codeLines = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (line.startsWith("|") && line.includes("|")) {
      tableLines.push(line);
      continue;
    }

    if (tableLines.length > 0) {
      flushTable();
    }

    if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={elements.length} className="mt-2 font-semibold text-ink">{line.slice(2, -2)}</p>);
    } else if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      elements.push(<p key={elements.length} className="mt-1 text-xs italic text-muted">{line.slice(1, -1)}</p>);
    } else if (line.startsWith("- ")) {
      elements.push(<li key={elements.length} className="ml-4 text-sm text-ink">{formatInline(line.slice(2))}</li>);
    } else if (line.trim() === "") {
      elements.push(<br key={elements.length} />);
    } else {
      elements.push(<p key={elements.length} className="mt-1 text-sm text-ink">{formatInline(line)}</p>);
    }
  }

  flushTable();
  flushCode();

  return <>{elements}</>;
}

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\|[^|]+\||→|↔)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-ink">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="rounded bg-ink/10 px-1 text-cyan-400">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("|") && part.endsWith("|")) {
      return <code key={i} className="text-cyan-400">{part}</code>;
    }
    return part;
  });
}

export function NotebookDemo() {
  const [cells, setCells] = useState<Cell[]>(buildInitialCells);
  const [context, setContext] = useState<CellContext>({});

  const handleSendPrompt = useCallback((cellId: string, promptKey: string) => {
    const cell = cells.find(c => c.id === cellId);
    if (!cell) return;

    const prompt = cell.prompts.find(p => p.key === promptKey);
    const { content, contextUpdate } = getScriptedReply(promptKey, context, cell.number);

    setCells(prev => prev.map(c => {
      if (c.id !== cellId) return c;
      return {
        ...c,
        messages: [
          ...c.messages,
          { id: generateId(), role: "user" as const, content: prompt?.label || promptKey },
          { id: generateId(), role: "assistant" as const, content },
        ],
      };
    }));

    if (contextUpdate) {
      setContext(prev => ({ ...prev, ...contextUpdate }));
    }
  }, [cells, context]);

  const handleSendFreeText = useCallback((cellId: string, text: string) => {
    const cell = cells.find(c => c.id === cellId);
    if (!cell) return;

    const reply = getFreeTextReply(text, context, cell.number);

    setCells(prev => prev.map(c => {
      if (c.id !== cellId) return c;
      return {
        ...c,
        messages: [
          ...c.messages,
          { id: generateId(), role: "user" as const, content: text },
          { id: generateId(), role: "assistant" as const, content: reply },
        ],
      };
    }));
  }, [cells, context]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="ak-label">Prompting Notebook</p>
          <h2 className="ak-serif mt-2 text-2xl text-ink">Unit 1: Noise Models</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-6 items-center gap-1 rounded-full bg-ink/10 px-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-muted">Simulator ready</span>
          </div>
        </div>
      </div>

      <div className="ak-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-line bg-ink/5 px-3 py-2 sm:px-4">
          <span className="ak-mono text-xs text-muted">noise_models.ipynb</span>
          <span className="text-muted">|</span>
          <span className="text-xs text-muted">6 cells</span>
          <span className="text-muted">|</span>
          <span className="text-xs text-muted">Unit 1 of 11</span>
          <div className="flex-1" />
          <span className="text-xs text-emerald-400">All numbers from simulator</span>
        </div>

        <div className="divide-y divide-line/30">
          {cells.map((cell) => (
            <CellComponent
              key={cell.id}
              cell={cell}
              context={context}
              onSendPrompt={handleSendPrompt}
              onSendFreeText={handleSendFreeText}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-muted">
        Prompting notebook: explore questions, not code. All simulation numbers are deterministic.
      </p>
    </div>
  );
}
