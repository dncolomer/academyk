# Quantum Error Correction Engineering

**Course Development Outline — Draft for Review**

A lab-style course that prepares learners to work with the tools, concepts, and workflows used in QEC research and engineering. Approximately 45–50 hours.

---

## Course Goal

Develop a technically rigorous, hands-on course that moves beyond explaining quantum error correction to doing it: through simulations, experiments, debugging activities, decoding exercises, and engineering challenges.

By the end, learners should be able to:

- Build and benchmark QEC pipelines using industry-standard tools (Stim, PyMatching, Sinter)
- Diagnose broken systems and identify root causes in syndrome data
- Make informed engineering trade-offs between code distance, decoder choice, and hardware constraints
- Understand the current frontier: qLDPC codes, lattice surgery, magic states, and below-threshold operation

The course should feel like progressing through a **Quantum Error Correction Lab**, not completing a sequence of lectures.

---

## Positioning and Prerequisites

### Assumed Prior Knowledge

This course assumes learners have completed:

1. **Quantum 102: Units 3 and 4** (or equivalent):
   - **Unit 3** covers algorithm families (Grover, Hamiltonian simulation with Pauli-string Hamiltonians and Trotterisation, VQE/QAOA, HHL)
   - **Unit 4** covers benchmarking and evaluating quantum claims (advantage definitions, fair baselines, hidden costs including error-correction overhead, a Sycamore case study, and a capstone auditing IBM's 2023 utility claim)
   - Neither unit teaches noise/decoherence, stabilisers, CSS codes, surface codes, decoding, or how fault tolerance works—that is what this course provides

2. **General prerequisites:**
   - Qubits, superposition, measurement, basic quantum gates, and quantum circuits (assumed from earlier Quantum 102 units or equivalent)
   - Python proficiency (comfortable writing functions, using NumPy)
   - Linear algebra: vectors, matrices, tensor products, eigenvalues
   - Basic probability and statistics

### What This Course Does NOT Cover

The following topics are proposed for companion courses:

| Topic | Proposed Course |
|-------|-----------------|
| Fault-tolerant quantum algorithms (Shor, Grover with FT compilation) | Fault-Tolerant Algorithms (~40h, proposed) |
| Resource estimation for specific algorithms | Fault-Tolerant Algorithms (~40h, proposed) |
| Quantum algorithm design and analysis | Quantum 102 Unit 3 |
| Hardware implementation details (fabrication, control systems) | Hardware-specific courses |

### Where This Course Fits

```
Quantum 102 (Units 1-4)
        ↓
   [Units 3-4 assumed]
        ↓
┌───────────────────────────────────────────┐
│   QEC Engineering (this course, ~50h)    │
│   Focus: Building and operating QEC      │
│   systems from repetition codes to       │
│   below-threshold operation              │
└───────────────────────────────────────────┘
        ↓
Fault-Tolerant Algorithms (~40h, proposed)
   Focus: Compiling and running algorithms
   on fault-tolerant hardware
```

This course provides the QEC foundation that a future Fault-Tolerant Algorithms course would build on. It teaches learners how error correction works at the engineering level; that course would teach how to use a fault-tolerant computer to run algorithms. The boundary between the two courses is proposed, not fixed.

---

## Course Design Approach

### Guiding Principles

Each major concept answers three questions:
1. What problem are we trying to solve?
2. How does quantum error correction solve it?
3. What happens when the solution fails?

Learners regularly encounter **imperfect or broken systems** and are asked to diagnose them.

### What Learners Do

- Modify parameters and observe effects
- Inject errors and interpret syndromes
- Compare decoding approaches
- Debug faulty circuits and misconfigured systems
- Benchmark performance and make engineering decisions

### What Learners Do NOT Do

- Sit through long mathematical derivations
- Memorise vocabulary without application
- Copy code without understanding it
- Complete primarily multiple-choice assessments

---

## Running Project: The Logical Qubit Lab

A single continuing project that learners build throughout the course, evolving from an unreliable physical qubit to a below-threshold logical qubit:

```
Raw physical qubit
       ↓
Noise introduced
       ↓
Simple redundancy (classical intuition)
       ↓
Syndrome detection
       ↓
Encoded logical qubit (repetition code)
       ↓
Repeated QEC cycles
       ↓
Surface code implementation
       ↓
Decoder integration
       ↓
Logical error benchmarking
       ↓
Below-threshold operation
```

Each unit contributes a component. Learners see a running metric (logical error rate per round) improve as they progress.

---

## Unit Structure

### UNIT 0: Welcome to the QEC Lab
**Why Quantum Computers Fail**

| | |
|---|---|
| **Length** | 2 hours |
| **Goal** | Create an immediate reason to care about QEC by watching computation fail |
| **Prerequisite link** | Builds on Quantum 102 Unit 4's view of error-correction overhead as a hidden cost; this course explains where that overhead comes from |

#### Concepts

- Physical vs logical qubits
- Brief review: entanglement and Bell states (assumed familiar, but set up notation)
- Quantum noise taxonomy: bit-flip, phase-flip, depolarising, coherent errors
- Decoherence and T1/T2 times
- Gate errors, measurement errors, correlated errors
- The no-cloning theorem and why classical redundancy fails
- Error mitigation vs error correction (brief comparison)
- The concept of fault tolerance

#### Required Demo: Watch It Fail

Run a simple quantum circuit (e.g., GHZ state preparation) under increasing noise:
- No noise → perfect fidelity
- 0.1% error per gate → slight degradation
- 1% error → noticeable errors
- 5% error → output is noise

#### Lab: How Long Can Your Qubit Survive?

Learners vary circuit depth on a noisy qubit and plot **circuit depth vs probability of correct output**. They identify the depth at which computation becomes unreliable.

#### Learning Outcome

> Quantum errors accumulate quickly enough that useful large-scale quantum computing requires active error correction.

---

### UNIT 1: Think Like an Error-Correction Engineer
**Learning Through Classical Error Correction**

| | |
|---|---|
| **Length** | 4 hours |
| **Goal** | Build intuition with classical codes before quantum complications |
| **Prerequisite link** | Standalone; provides foundation for all subsequent units |

#### Concepts

- Redundancy and why it works
- Classical repetition codes (3-bit, 5-bit)
- Parity checks and syndrome extraction
- Majority voting
- Hamming distance and code distance
- Error detection vs error correction
- Parity-check matrices (H matrix)
- Why quantum is harder: measurement disturbs, no cloning

#### Pauli Operators (Taught Here)

- The Pauli operators I, X, Y, Z as matrices
- The commutation rule: XZ = −ZX (and why it matters for error detection)
- Pauli strings as tensor products (brief intro; full treatment in Unit 3)

#### Bridge to Quantum

- Quantum repetition code (bit-flip code)
- Phase-flip code
- Logical states |0⟩_L, |1⟩_L
- Logical operators X_L, Z_L

#### Lab: Classical Noisy Channel

Build a noisy classical communication system:
1. Transmit bits through a noisy channel (configurable error rate)
2. Observe errors
3. Add 3-bit redundancy and majority voting
4. Compare error rates before and after
5. Then implement the same logic as a quantum bit-flip code

#### Challenge: Error Detection Puzzles

Given ~15 syndrome patterns, learners determine:
- Did an error occur?
- What type?
- Which qubit(s)?
- Can it be corrected?
- Did the logical information survive?

Format: case-file puzzles, not worksheets.

#### Learning Outcomes

- Explain how parity checks detect errors without revealing data
- Calculate code distance from a parity-check matrix
- State the Pauli commutation rule and explain why X and Z errors behave differently
- Implement a quantum repetition code and extract syndromes

---

### UNIT 2: The Syndrome Is the Clue
**Detecting Errors Without Measuring Quantum Information**

| | |
|---|---|
| **Length** | 4 hours |
| **Goal** | Master syndrome extraction—the core mechanic of all QEC |
| **Prerequisite link** | Builds on Unit 1 syndrome concepts and Pauli commutation; required for Units 3–9 |

#### Concepts

- Data qubits vs ancilla qubits
- Parity measurements via ancilla
- Syndrome extraction circuits
- The odd-overlap rule: why X errors light up Z checks (and vice versa)
- Repeated syndrome measurements
- Detection events (syndrome changes between rounds)
- Logical observables
- Measurement errors and their signatures
- Ambiguous syndromes

#### Required Visual: The Syndrome Flow

Interactive animation showing:
```
Error occurs on data qubit
        ↓
Stabiliser measurement affected
        ↓
Detection event appears in syndrome
        ↓
Information passed to decoder
```

#### Lab: Build Syndrome Extraction Circuits

Learners create syndrome extraction circuits for:
- Bit-flip errors on 3-qubit repetition code
- Phase-flip errors on 3-qubit code
- Combined (9-qubit Shor code, optional)

Inject different single-qubit errors and observe syndrome patterns.

#### Challenge: Syndrome Case Files

~20 syndrome histories including:
- Single data errors
- Measurement errors (syndrome flips then flips back)
- Multiple errors
- No error (all-zeros syndrome)
- Ambiguous situations (multiple errors consistent with syndrome)

Learners diagnose what most likely happened.

#### Learning Outcomes

- Design and implement syndrome extraction circuits
- Distinguish data errors from measurement errors in syndrome histories
- Explain why repeated measurements are necessary

---

### UNIT 3: Stabilisers and CSS Codes
**The Language of Modern QEC**

| | |
|---|---|
| **Length** | 6 hours |
| **Goal** | Teach stabiliser formalism as a useful tool, not abstract maths |
| **Prerequisite link** | Uses Pauli operators introduced in Unit 1; extends to the full stabiliser framework |
| **Boundary** | Teaches framework only; surface code application is Unit 4 |

#### Approach

Do NOT begin with pages of mathematical definitions. Start with the problem:

> "How can we describe all the conditions a protected quantum state must satisfy, without describing the entire state?"

Then introduce stabilisers as the tool.

#### Concepts (Stabilisers)

- Review: Pauli operators I, X, Y, Z and commutation (from Unit 1)
- The Pauli group (products, phases, n-qubit extension)
- Pauli strings and tensor products
- Commutation and anticommutation (full treatment)
- Stabiliser generators
- The codespace as the +1 eigenspace
- Logical operators (commute with stabilisers, not in stabiliser group)
- The normaliser
- Code parameters [[n, k, d]]

#### Codes to Study

| Code | n | k | d | Purpose |
|------|---|---|---|---------|
| 3-qubit repetition | 3 | 1 | 1 (for Z) | Warm-up |
| 5-qubit code | 5 | 1 | 3 | Smallest distance-3 |
| Steane [[7,1,3]] | 7 | 1 | 3 | CSS construction |
| Shor [[9,1,3]] | 9 | 1 | 3 | Historical, concatenation |

Focus on Steane code as the main example.

#### Concepts (CSS Codes)

- CSS construction from classical codes
- X-type and Z-type stabilisers
- The dual code condition (H_X · H_Z^T = 0)
- Why CSS codes have nice transversal gates (preview for Unit 9)
- Encoding circuits

#### Interactive: Build-a-Code

Given a set of stabiliser generators, learners determine:
- Number of physical qubits n
- Number of logical qubits k
- Which errors are detectable
- Possible logical operators
- Approximate code distance

Then reverse: given desired error-detection behaviour, propose stabilisers.

#### Lab: Construct the Steane Code

Using two classical [7,4,3] Hamming codes:
1. Write the parity-check matrices H_X, H_Z
2. Verify the dual condition
3. Build the stabiliser generators
4. Identify logical X and Z
5. Verify with `stim.Tableau.from_stabilizers()`

#### Challenge: Code Inspector

Several proposed CSS codes. Some valid, some broken:
- Non-commuting stabilisers
- Dependent generators
- Wrong code distance claimed
- Missing logical operator

Learners identify which are valid and explain the faults.

#### Learning Outcomes

- Read and write stabiliser code specifications
- Verify a code's parameters computationally
- Construct a CSS code from classical parity-check matrices
- Identify whether two Pauli strings commute

---

### UNIT 4: Welcome to the Surface Code
**Operating a Real QEC Architecture**

| | |
|---|---|
| **Length** | 6 hours |
| **Goal** | This is the most important unit. Learners simulate and operate a surface code. |
| **Prerequisite link** | Applies Unit 3 stabilisers; feeds Units 5–9 |
| **Tool** | Stim (required) |

#### Why Surface Code?

- 2D nearest-neighbour connectivity (hardware-friendly)
- High threshold (~1% for depolarising noise)
- Well-understood decoders
- Current experimental target (Google, IBM)

#### Concepts

- Topology in QEC (torus vs planar boundaries)
- Toric code intuition (wrap-around, homology)
- Rotated surface code (the practical version)
- Data qubits and measurement qubits
- X stabilisers (detect Z errors) and Z stabilisers (detect X errors)
- Plaquettes and vertices
- Boundary conditions (rough and smooth edges)
- Logical operators as strings across the lattice
- Code distance from lattice size
- Error chains
- Repeated QEC cycles (syndrome rounds)
- Detection events as syndrome differences

#### Required Visualisation

Interactive surface-code lattice showing:
- Data qubit positions
- Stabiliser measurement locations
- An injected error
- Resulting syndrome pattern
- Error chains and their endpoints

#### Lab: Operate a Surface Code (Stim)

Using `stim.Circuit.generated("surface_code:rotated_memory_z", ...)`:
1. Generate circuits for distance 3, 5, 7
2. Simulate with noise
3. Extract syndromes
4. Observe how logical error rate changes with distance

Compare results at the same physical error rate.

#### Challenge: Save the Logical Qubit

Given:
- Physical error rate (e.g., 0.3%)
- Several code distances (3, 5, 7, 9)
- Target logical error rate (e.g., 10^-6 per round)

Determine what code distance is needed. Estimate rounds and qubit count.

#### Learning Outcomes

- Explain why the surface code needs only nearest-neighbour interactions
- Generate and simulate surface-code circuits with Stim
- Predict logical error scaling with code distance (below threshold)
- Identify logical operators on a surface-code patch

---

### UNIT 5: Decoding
**Turning Syndrome Clues Into Corrections**

| | |
|---|---|
| **Length** | 6 hours |
| **Goal** | Make decoding a major differentiator—this is where engineering matters |
| **Tools** | Stim, PyMatching, a union-find decoder we provide |
| **Prerequisite link** | Requires Unit 4 surface code |

#### Concepts

- What a decoder does (syndrome → recovery operation)
- Why decoding is a graph problem
- Decoding graphs (detector error model)
- Error chains and their likelihoods
- Maximum-likelihood decoding (ideal but slow)
- Minimum-weight perfect matching (MWPM)
- Union-find decoding (faster, slightly worse)
- Lookup decoders (small codes only)
- Neural decoders (brief mention, current research)
- Decoder metrics:
  - Accuracy (logical error rate)
  - Latency (time per round)
  - Throughput (syndromes per second)
  - Scalability with code distance

#### Lab: Build the QEC Pipeline

Construct a complete workflow:
```
Noise model
    ↓
Quantum circuit (Stim)
    ↓
Syndrome measurements
    ↓
Detection events
    ↓
Decoder (PyMatching)
    ↓
Predicted corrections
    ↓
Logical result (success/fail)
```

Learners should trace where each step occurs in code.

#### Experiment: Decoder Benchmarking

Vary:
- Physical error rate (0.1% to 2%)
- Code distance (3, 5, 7)
- Number of QEC rounds (1, 3, 5, 10)

Measure logical error rate. Plot and analyse.

#### Challenge: Decoder Showdown

Compare MWPM (PyMatching) vs a union-find decoder we provide:
- Accuracy at various error rates
- Decoding time
- Scaling with distance

Recommend which decoder for different scenarios:
- Real-time feedback (latency-critical)
- Highest accuracy (offline analysis)
- Large distance (scalability)

#### Learning Outcomes

- Implement a complete decode-and-correct pipeline
- Benchmark decoder performance systematically
- Choose an appropriate decoder for given constraints

---

### UNIT 6: Find the Threshold
**When Error Correction Actually Works**

| | |
|---|---|
| **Length** | 4 hours |
| **Goal** | Understand the threshold—the most important number in QEC |
| **Tools** | Stim, Sinter |
| **Prerequisite link** | Requires Units 4–5 |

#### Concepts

- Physical error rate p
- Logical error rate p_L
- The threshold p_th
- Below-threshold behaviour: p_L ~ (p/p_th)^(d/2)
- Above-threshold behaviour: bigger codes are worse
- Pseudo-threshold (finite-size effects)
- Circuit-level noise vs code-capacity noise
- Why circuit-level thresholds are lower
- Statistical uncertainty in threshold estimates
- Monte Carlo sampling and confidence intervals

#### Lab: Threshold Experiment

Using Sinter for efficient sampling:
1. Run simulations at p = 0.1%, 0.3%, 0.5%, 0.8%, 1.0%, 1.5%
2. For distances 3, 5, 7, 9
3. Collect enough samples for statistical significance
4. Plot p vs p_L for each distance
5. Identify the crossing point

#### Challenge: Something Is Wrong

Provide experimental results where increasing code distance makes p_L worse. Possible causes:
- Physical error rate above threshold
- Decoder misconfigured
- Wrong noise model assumed
- Hook errors in syndrome extraction
- Correlated errors not modelled

Learners diagnose the root cause.

#### Learning Outcomes

- Estimate a threshold from simulation data
- Explain why bigger codes can be worse above threshold
- Identify when a QEC setup is below threshold

---

### UNIT 7: Real QEC Is Messy
**Noise Models and Hardware**

| | |
|---|---|
| **Length** | 4 hours |
| **Goal** | Show why the best QEC strategy depends on the physical hardware |
| **Prerequisite link** | Builds on threshold understanding from Unit 6 |

#### Approach: Case Studies

Rather than abstract noise models, study real experiments:

| Platform | Experiment | Key Noise Features |
|----------|------------|-------------------|
| Superconducting | Google below-threshold (2023-2024) | Depolarising, leakage, cosmic rays |
| Neutral atoms | Erasure conversion (Lukin group) | Erasure errors (known locations) |
| Trapped ions | Transversal gates | Crosstalk, slow gates |
| IBM | Heavy-hex / qLDPC path | Connectivity constraints |

#### Concepts

- Depolarising noise (equal probability X, Y, Z)
- Dephasing (phase errors dominate)
- Amplitude damping (T1 decay)
- Biased noise (Z errors >> X errors)
- Leakage (qubit leaves computational subspace)
- Erasure errors (error location known)
- Correlated errors (cosmic rays, TLS defects)
- Measurement errors (distinct from gate errors)
- Real-time decoding requirements

#### Lab: Same Code, Three Noise Models

Take the distance-5 surface code and simulate under:
1. Depolarising noise (symmetric)
2. Biased noise (Z errors 10× more likely)
3. Erasure noise (20% of errors are flagged)

Compare logical error rates. Discuss how the decoder could be adapted.

#### Challenge: Diagnose the Hardware

Given syndrome data from a "real" device (simulated with realistic noise), identify:
- Dominant error type
- Any qubits with elevated error rates
- Evidence of correlated errors

Recommend a QEC strategy.

#### Learning Outcomes

- Match noise models to hardware platforms
- Explain why erasure errors are easier than depolarising errors
- Adapt QEC strategies to noise structure

---

### UNIT 8: Beyond the Surface Code
**qLDPC Codes and the Path to Lower Overhead**

| | |
|---|---|
| **Length** | 4 hours |
| **Goal** | Introduce qLDPC codes as the next frontier |
| **Prerequisite link** | Requires surface code understanding (Unit 4) |
| **Boundary** | Teaches concepts and trade-offs, not full implementations |

#### Why qLDPC?

Surface code overhead is high: ~1,000 physical qubits per logical qubit for useful distances. qLDPC codes can achieve the same logical error rate with fewer physical qubits—if we can connect them.

#### Concepts

- Low-density parity-check (LDPC) codes (classical)
- Quantum LDPC: sparse stabilisers
- The connectivity problem (not 2D nearest-neighbour)
- Bivariate bicycle codes (including the [[144,12,12]] Gross code)
- Tanner codes (asymptotically good)
- Rate vs distance trade-offs
- Decoding qLDPC: BP+OSD, sliding-window decoders
- Overhead comparisons

#### Comparison Table

| Code | n (physical) | k (logical) | d | Rate k/n | Connectivity |
|------|--------------|-------------|---|----------|--------------|
| Surface d=7 | 97 | 1 | 7 | 1% | 2D planar |
| Bivariate bicycle [[144,12,12]] | 144 | 12 | 12 | 8% | Long-range |
| Bivariate bicycle [[72,12,6]] | 72 | 12 | 6 | 17% | Long-range |

#### Lab: qLDPC Structure

Using provided code specifications:
1. Count stabiliser weights (show they're sparse)
2. Verify the code parameters
3. Visualise the Tanner graph
4. Identify the connectivity requirements

#### Discussion: When Will qLDPC Dominate?

- Current hardware connectivity limitations
- Ion shuttling and atom rearrangement
- Modular architectures
- The breakeven point

#### Learning Outcomes

- Explain why qLDPC codes have lower overhead
- Identify the connectivity challenges for qLDPC
- Compare surface code and qLDPC trade-offs for a given scenario

---

### UNIT 9: Fault-Tolerant Logic
**Lattice Surgery and Magic States**

| | |
|---|---|
| **Length** | 5 hours |
| **Goal** | Close the loop: how to compute fault-tolerantly |
| **Prerequisite link** | Requires surface code (Unit 4), feeds Capstone |
| **Boundary** | Teaches mechanics; a proposed Fault-Tolerant Algorithms course would handle compilation and resource estimation |

#### The Problem

Encoding qubits protects stored information. But computation requires gates, and most gates can spread errors. Fault tolerance means errors don't accumulate faster than correction can remove them.

#### Concepts

- Fault distance and hook errors
- Transversal gates (errors don't spread)
- The Eastin-Knill theorem (no universal transversal gate set)
- Clifford gates on surface codes (easy via transversal or lattice surgery)
- The T gate problem (non-Clifford, required for universality)

#### Lattice Surgery

- Merge and split operations
- Logical measurements via surgery
- CNOT via surgery
- Time-space trade-offs
- Compilation to surgery operations

#### Magic States

- Magic state injection
- Distillation (many noisy → few clean)
- Distillation overhead (why T gates are expensive)
- Magic state cultivation (recent: grow states over QEC cycles)

#### Lab: Lattice Surgery Simulation

Using Stim or provided scaffolding:
1. Implement a logical CNOT via merge-split
2. Verify it applies the correct logical operation
3. Measure the failure probability
4. Compare to transversal CNOT (in codes that support it)

#### Challenge: Count the Magic States

Given a small circuit (e.g., 10 Clifford gates + 2 T gates):
1. Identify which gates require magic states
2. Count the total magic states needed
3. Estimate how many noisy magic states must be distilled to produce them

#### Learning Outcomes

- Explain why universal fault-tolerant computation requires magic states
- Implement a logical gate via lattice surgery
- Count the magic states required for a given circuit

---

### CAPSTONE: Ship a Logical Qubit
**The Logical Qubit Lab, Complete**

| | |
|---|---|
| **Length** | 4 hours |
| **Goal** | Learners demonstrate mastery by building a complete, working QEC system |
| **Deliverable** | Reproducible notebook + written defence |

#### The Brief

You are given:
- A hardware noise model (specific error rates and types)
- A qubit budget (e.g., 200 physical qubits)
- A target: logical error rate < 10^-4 per round

Design and implement a QEC system that meets the target.

#### Required Deliverables

1. **Working pipeline**: noise → circuit → syndrome → decoder → result
2. **Benchmark**: measured logical error rate with error bars
3. **Defence**: written justification of choices:
   - Why this code?
   - Why this distance?
   - Why this decoder?
   - What would you change with more qubits?

#### Rubric

| Criterion | Points |
|-----------|--------|
| Pipeline runs and produces correct output | 25 |
| Benchmark methodology (sufficient samples, error bars) | 20 |
| Target achieved (or clear explanation if not) | 20 |
| Defence: code choice justified | 15 |
| Defence: trade-offs discussed | 10 |
| Code quality and reproducibility | 10 |

#### Stretch Goals (Optional)

- Compare two codes (e.g., surface vs colour code)
- Implement a custom decoder modification

#### Learning Outcomes

- Integrate all course components into a working system
- Make and defend engineering trade-offs
- Benchmark QEC performance systematically

---

## Total Hours

| Unit | Title | Hours |
|------|-------|-------|
| 0 | Welcome to the QEC Lab | 2 |
| 1 | Think Like an Error-Correction Engineer | 4 |
| 2 | The Syndrome Is the Clue | 4 |
| 3 | Stabilisers and CSS Codes | 6 |
| 4 | Welcome to the Surface Code | 6 |
| 5 | Decoding | 6 |
| 6 | Find the Threshold | 4 |
| 7 | Real QEC Is Messy | 4 |
| 8 | Beyond the Surface Code | 4 |
| 9 | Fault-Tolerant Logic | 5 |
| — | Capstone | 4 |
| | **Total** | **49** |

---

## Tooling

All notebooks run in Google Colab without local installation:

- **Stim** (circuit simulation, syndrome extraction)
- **PyMatching** (MWPM decoder)
- **Sinter** (efficient Monte Carlo sampling)
- **Crumble** (browser-based visualisation, for Units 2 and 4)

Setup cell: `!pip install -q stim pymatching sinter`

---

## Deliverables

- Complete course outline (this document)
- Lesson plans for every section
- Presentation slides with speaker notes
- Coding notebooks with answer keys
- Learner activities and challenges
- Instructor versions of all technical content
- Knowledge checks per unit
- Glossary of QEC terminology
- Capstone project with rubric
- Instructor/facilitator guide

---

*Document version: Draft for review, October 2026*
