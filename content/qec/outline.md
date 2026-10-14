# Quantum Error Correction: Diagnosis, Simulation, and Engineering

**Simplified Unit Outline**

Learners work with imperfect systems. They inject errors, look at what goes wrong, and try to fix it. Each unit has five parts:

- **Math prep** — a collection of 20–60 second animated micro-videos per unit that warm learners up to the math and formalism that lesson expects, as an extra mechanism against churn.
- **Formal** — code notebook (Google Colab style). Learners change parameters, run simulations, and measure results.
- **Prompting notebook** — looks like a Google Colab but contains guiding questions, multi-choice prompts, and free-text prompts. Learners explore first-principles questions themselves. No primary code required.
- **Unsys** — TBD
- **Project contribution** — what this unit adds to the shared lab.

---

## Running Project: Decoder Co-Design and Benchmarking Lab

Learners maintain one evolving system throughout the course: a fixed noise model paired with a small stabilizer code. They instrument syndrome extraction, start with a basic decoder, and successively replace or strengthen it while measuring logical error rate against latency and overhead. At each stage they diagnose why a change improves or degrades performance under the given noise. Modest constraints (measurement delay, limited connectivity, or leakage) can be introduced later.

This choice aligns more closely with real QEC engineering work than a purely linear "build a logical qubit from scratch" sequence. In practice, teams spend substantial effort on decoder optimization, co-design with syndrome extraction circuits, and repeated benchmarking of logical performance under realistic noise models and hardware constraints. Resource estimation, noise calibration, and iterative improvement of the classical processing side are ongoing activities; a progressive decoder-focused lab mirrors those loops more directly than a tutorial-style construction of ever-larger codes.

---

## Unit 1: Noise Models
**What kinds of errors actually happen.**

- **Math prep**: short animated warm-ups on probability basics and error rates; qubit states as arrows on the Bloch sphere; X, Z and Y as flips; what 'energy loss' (amplitude damping) does.
- **Formal**: Learners create simple noise (bit flips, phase flips, energy loss). They run circuits and count how often each error appears.
- **Prompting notebook**: exploring which errors matter most and why certain processes dominate.
- **Unsys**: TBD
- **Project contribution**: The noise model everyone will use later.

---

## Unit 2: Simple Repetition
**Protecting a bit by copying it.**

- **Math prep**: short animated warm-ups on binomial counting and majority vote; why errors at rate p combine into ~3p² failure; reading log-scale plots.
- **Formal**: Build a short repetition code, add noise, majority vote, plot how often the logical bit still fails.
- **Prompting notebook**: exploring when adding more copies stops helping and what limits the approach.
- **Unsys**: TBD
- **Project contribution**: First numbers for an unprotected qubit and a simply protected one.

---

## Unit 3: Measuring Errors Without Destroying the State
**Syndrome extraction.**

- **Math prep**: short animated warm-ups on parity and XOR; the Z-Z check in pictures; measuring a question instead of the state; CNOT as a parity copier.
- **Formal**: Build small parity-check circuits, add errors, see whether the circuit reports them correctly.
- **Prompting notebook**: exploring how a check can reveal an error without destroying the protected information.
- **Unsys**: TBD
- **Project contribution**: A working way to extract syndromes for the lab system.

---

## Unit 4: Encoding and Simple Recovery
**Turning physical qubits into one logical qubit and trying to fix it.**

- **Math prep**: short animated warm-ups on stabilisers as 'checks that should read +1'; X and Z anticommute (the one rule you need); logical vs physical qubits; the syndrome lookup table.
- **Formal**: Encode a small code, add noise, read the syndrome, apply a fix, check whether the logical information survived.
- **Prompting notebook**: exploring when a recovery step helps and when it makes the logical qubit worse.
- **Unsys**: TBD
- **Project contribution**: First full loop of encode → noise → syndrome → recover.

---

## Unit 5: Running Correction Many Times
**Why one round is not enough.**

- **Math prep**: short animated warm-ups on repeated measurements over time; detection events as 'changes between rounds'; how small error rates compound across rounds.
- **Formal**: Run the correction cycle repeatedly; track logical error rate vs rounds and imperfect resets.
- **Prompting notebook**: exploring when extra rounds start to hurt and how timing or reset errors accumulate.
- **Unsys**: TBD
- **Project contribution**: Multi-round runs and the ability to watch errors build up.

---

## Unit 6: Surface Codes
**A practical layout that uses nearby qubits.**

- **Math prep**: short animated warm-ups on grids, neighbours and plaquettes; code distance d; why logical error falls like (p/p_th)^((d+1)/2); the threshold idea.
- **Formal**: Place qubits on a grid, define the checks, measure how logical error rate falls as the code gets larger.
- **Prompting notebook**: exploring why local checks matter and how code size interacts with the noise.
- **Unsys**: TBD
- **Project contribution**: Surface-code layouts and distance-dependent results.

---

## Unit 7: qLDPC Codes
**Codes that protect more information with fewer extra qubits.**

- **Math prep**: short animated warm-ups on check matrices (rows = checks, columns = qubits); code rate k/n; sparse vs local connections; Tanner graphs.
- **Formal**: Look at a small qLDPC example; compare rate and check structure with the surface code; run the same noise and measure logical error rate.
- **Prompting notebook**: exploring what is gained and what becomes harder when checks are no longer purely local.
- **Unsys**: TBD
- **Project contribution**: A second code family and its performance numbers under the same noise.

---

## Unit 8: Decoders
**Turning syndromes into corrections.**

- **Math prep**: short animated warm-ups on syndromes as graph puzzles; shortest paths and matching; belief propagation as passing messages; runtime vs accuracy.
- **Formal**: Feed syndromes to simple matching, belief-propagation, and one stronger method; compare logical error rate and runtime on surface code and qLDPC example.
- **Prompting notebook**: exploring why a decoder fails on certain patterns and what a small change might fix.
- **Unsys**: TBD
- **Project contribution**: Stronger decoder versions running on the lab system.

---

## Unit 9: Measuring Performance Fairly
**How to compare designs with numbers you can trust.**

- **Math prep**: short animated warm-ups on sampling and error bars; binomial confidence intervals; how many shots before two curves really differ.
- **Formal**: Collect enough samples to estimate logical error rates with uncertainty; plots comparing surface code, qLDPC, decoders.
- **Prompting notebook**: exploring how many trials are needed before a difference is meaningful.
- **Unsys**: TBD
- **Project contribution**: A clear benchmarking method applied to every version of the system.

---

## Unit 10: Limits and Trade-offs
**What happens when resources or hardware constraints appear.**

- **Math prep**: short animated warm-ups on latency budgets and timing; leakage outside the qubit space; connectivity graphs and what a missing edge costs.
- **Formal**: Add one realistic limit (slower measurements, missing connections, or leakage); re-run benchmark; see how much performance drops.
- **Prompting notebook**: exploring which constraint hurts most and why.
- **Unsys**: TBD
- **Project contribution**: Performance numbers under constraint and a short diagnosis of the bottleneck.

---

## Unit 11: Capstone
**Final improvement and written diagnosis.**

- **Math prep**: short animated warm-ups on recap reel: the key formulas and plots of the course in 60 seconds each, to frame the final claim.
- **Formal**: Pick one or two changes, implement, re-measure the full system.
- **Prompting notebook**: constructing a short explanation of why the final numbers look the way they do.
- **Unsys**: TBD
- **Project contribution**: Final performance claim plus the remaining open problems.

---

*Document version: Draft for review, October 2026*
