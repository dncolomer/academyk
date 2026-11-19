import type { Problem } from "../problem-types";

export const thermodynamicComputingProblems: Problem[] = [
  {
    slug: "boltzmann-distribution",
    title: "Boltzmann Distribution Basics",
    difficulty: "warm-up",
    type: "derivation",
    topics: ["Boltzmann distribution", "statistical mechanics"],
    moduleRef: "Entropy, information and heat",
    statement: `The Boltzmann distribution gives the probability of a system being in state $i$ with energy $E_i$ at temperature $T$:

$$P(i) = \\frac{e^{-E_i/k_BT}}{Z}$$

where $Z = \\sum_j e^{-E_j/k_BT}$ is the partition function.

1. Show that lower energy states are more probable.
2. What happens as $T \\to 0$ and $T \\to \\infty$?
3. For a two-state system with $E_0 = 0$ and $E_1 = \\epsilon$, find $P(0)$ and $P(1)$.`,
    solution: `**1. Lower energy states are more probable:**

Compare two states with $E_i < E_j$:
$$\\frac{P(i)}{P(j)} = \\frac{e^{-E_i/k_BT}}{e^{-E_j/k_BT}} = e^{(E_j - E_i)/k_BT}$$

Since $E_j - E_i > 0$ and $k_BT > 0$:
$$\\frac{P(i)}{P(j)} = e^{\\text{positive}} > 1$$

Therefore $P(i) > P(j)$. ✓

**Physical intuition:** Systems tend toward lower energy configurations; thermal fluctuations allow higher energy states, but less often.

**2. Temperature limits:**

**$T \\to 0$ (cold):**
$$\\lim_{T \\to 0} P(i) = \\begin{cases} 1 & \\text{if } E_i = E_{\\text{min}} \\\\ 0 & \\text{otherwise} \\end{cases}$$

The system "freezes" into the ground state(s).

**$T \\to \\infty$ (hot):**
All exponents $-E_i/k_BT \\to 0$, so $e^{-E_i/k_BT} \\to 1$.
$$\\lim_{T \\to \\infty} P(i) = \\frac{1}{N}$$

where $N$ is the number of states. All states become equally likely (maximum entropy).

**3. Two-state system:**

Partition function:
$$Z = e^{-0/k_BT} + e^{-\\epsilon/k_BT} = 1 + e^{-\\epsilon/k_BT}$$

Probabilities:
$$P(0) = \\frac{1}{1 + e^{-\\epsilon/k_BT}} = \\frac{1}{1 + e^{-\\beta\\epsilon}}$$

$$P(1) = \\frac{e^{-\\epsilon/k_BT}}{1 + e^{-\\epsilon/k_BT}} = \\frac{1}{1 + e^{\\beta\\epsilon}}$$

where $\\beta = 1/k_BT$.

This is exactly the **sigmoid function**: $P(1) = \\sigma(-\\beta\\epsilon)$.

At room temperature ($k_BT \\approx 26$ meV), if $\\epsilon = 100$ meV:
$$P(1) = \\frac{1}{1 + e^{100/26}} \\approx \\frac{1}{1 + 47} \\approx 2\\%$$`,
  },
  {
    slug: "entropy-definition",
    title: "Entropy as Information",
    difficulty: "warm-up",
    type: "derivation",
    topics: ["entropy", "information theory"],
    moduleRef: "Entropy, information and heat",
    statement: `The Gibbs entropy is defined as:

$$S = -k_B \\sum_i P_i \\ln P_i$$

1. Show that for a uniform distribution over $N$ states, $S = k_B \\ln N$.
2. What is the entropy of a system in a pure state (one specific microstate)?
3. Why is entropy maximized for uniform distributions?`,
    solution: `**1. Entropy of uniform distribution:**

For uniform distribution: $P_i = 1/N$ for all $i$.

$$S = -k_B \\sum_{i=1}^{N} \\frac{1}{N} \\ln \\frac{1}{N} = -k_B \\cdot N \\cdot \\frac{1}{N} \\cdot \\ln \\frac{1}{N}$$

$$= -k_B \\ln \\frac{1}{N} = k_B \\ln N$$

**Connection to Boltzmann's formula:** $S = k_B \\ln W$ where $W = N$ is the number of microstates.

**2. Pure state entropy:**

For a pure state: $P_i = 1$ for one state, $P_j = 0$ for all others.

$$S = -k_B [1 \\cdot \\ln 1 + 0 \\cdot \\ln 0 + \\ldots] = -k_B \\cdot 0 = 0$$

(Using $\\lim_{x \\to 0} x \\ln x = 0$)

**Physical meaning:** Complete certainty = zero entropy. Knowing the exact microstate leaves no missing information.

**3. Why uniform maximizes entropy:**

**Variational argument:**
Maximize $S = -k_B \\sum_i P_i \\ln P_i$ subject to $\\sum_i P_i = 1$.

Using Lagrange multipliers:
$$\\mathcal{L} = -k_B \\sum_i P_i \\ln P_i - \\lambda(\\sum_i P_i - 1)$$

$$\\frac{\\partial \\mathcal{L}}{\\partial P_i} = -k_B(\\ln P_i + 1) - \\lambda = 0$$

$$\\ln P_i = -1 - \\frac{\\lambda}{k_B} = \\text{constant}$$

So $P_i = \\text{constant} = 1/N$.

**Information-theoretic intuition:**
- Entropy = average surprise
- Uniform = maximum uncertainty about which state
- Any bias toward certain states reduces uncertainty`,
  },
  {
    slug: "free-energy-minimum",
    title: "Free Energy and Equilibrium",
    difficulty: "interview",
    type: "derivation",
    topics: ["free energy", "equilibrium", "variational"],
    moduleRef: "Entropy, information and heat",
    statement: `The Helmholtz free energy is $F = E - TS$ where $E$ is average energy and $S$ is entropy.

1. Show that the Boltzmann distribution minimizes free energy.
2. Write the free energy for a general distribution $Q$ and show $F[Q] \\geq F_{\\text{eq}}$.
3. How does this relate to variational inference in machine learning?`,
    hints: [
      "Compare $F[Q]$ to $F[P_{\\text{Boltz}}]$ using the KL divergence.",
    ],
    solution: `**1. Boltzmann minimizes free energy:**

For distribution $Q$ with $Q_i = $ probability of state $i$:
$$E[Q] = \\sum_i Q_i E_i$$
$$S[Q] = -k_B \\sum_i Q_i \\ln Q_i$$
$$F[Q] = \\sum_i Q_i E_i + k_BT \\sum_i Q_i \\ln Q_i$$

Minimize $F[Q]$ subject to $\\sum_i Q_i = 1$:
$$\\frac{\\partial}{\\partial Q_i}[F + \\lambda(\\sum_j Q_j - 1)] = E_i + k_BT(\\ln Q_i + 1) + \\lambda = 0$$

$$Q_i = e^{-(E_i + \\lambda + k_BT)/k_BT} \\propto e^{-E_i/k_BT}$$

Normalizing gives the Boltzmann distribution. ✓

**2. Free energy bound:**

For any distribution $Q$:
$$F[Q] = \\sum_i Q_i E_i + k_BT \\sum_i Q_i \\ln Q_i$$

Add and subtract $k_BT \\sum_i Q_i \\ln P_i$ where $P_i = e^{-E_i/k_BT}/Z$:

$$F[Q] = k_BT \\sum_i Q_i \\ln \\frac{Q_i}{P_i} + \\sum_i Q_i(E_i + k_BT \\ln P_i)$$

Since $\\ln P_i = -E_i/k_BT - \\ln Z$:
$$\\sum_i Q_i(E_i + k_BT \\ln P_i) = \\sum_i Q_i(E_i - E_i - k_BT\\ln Z) = -k_BT \\ln Z = F_{\\text{eq}}$$

Therefore:
$$F[Q] = k_BT \\cdot D_{KL}(Q || P) + F_{\\text{eq}}$$

Since $D_{KL} \\geq 0$ with equality iff $Q = P$:
$$F[Q] \\geq F_{\\text{eq}}$$

**3. Connection to variational inference:**

In machine learning, we often want to compute $P(z|x) = \\frac{P(x|z)P(z)}{P(x)}$ but $P(x) = \\int P(x|z)P(z)dz$ is intractable.

**Evidence Lower Bound (ELBO):**
$$\\ln P(x) = \\underbrace{\\mathbb{E}_Q[\\ln P(x|z)] - D_{KL}(Q(z) || P(z))}_{\\text{ELBO}} + D_{KL}(Q(z) || P(z|x))$$

Since $D_{KL} \\geq 0$:
$$\\text{ELBO} \\leq \\ln P(x)$$

Maximizing ELBO = minimizing $D_{KL}(Q || P_{\\text{posterior}})$ = minimizing a "free energy."

**Same structure:**
- Physics: minimize $F = E - TS$
- ML: maximize $\\text{ELBO} = \\mathbb{E}_Q[\\ln P(x,z)] - \\mathbb{E}_Q[\\ln Q]$
- Both: variational principle with KL divergence gap`,
  },
  {
    slug: "landauer-limit",
    title: "Landauer's Principle",
    difficulty: "interview",
    type: "derivation",
    topics: ["Landauer", "irreversible computing", "heat"],
    moduleRef: "Landauer's principle and the cost of computation",
    statement: `Landauer's principle states that erasing one bit of information requires dissipating at least $k_BT \\ln 2$ of heat.

1. Derive this limit from thermodynamic arguments.
2. At room temperature (300K), what is the minimum energy per bit erasure?
3. How much more energy does a modern transistor actually use per switch?`,
    solution: `**1. Derivation:**

**Setup:** "Erasing" means resetting a bit to a known state (say 0), regardless of its initial value.

**Before erasure:** Bit could be 0 or 1 with equal probability (1 bit of entropy).
$$S_{\\text{before}} = k_B \\ln 2$$

**After erasure:** Bit is definitely 0 (no uncertainty).
$$S_{\\text{after}} = 0$$

**Entropy change of the bit:**
$$\\Delta S_{\\text{bit}} = 0 - k_B \\ln 2 = -k_B \\ln 2$$

**Second law:** Total entropy cannot decrease.
$$\\Delta S_{\\text{total}} = \\Delta S_{\\text{bit}} + \\Delta S_{\\text{env}} \\geq 0$$

$$\\Delta S_{\\text{env}} \\geq k_B \\ln 2$$

**Heat to environment:**
If environment is at temperature $T$:
$$Q = T \\cdot \\Delta S_{\\text{env}} \\geq k_B T \\ln 2$$

This is the **Landauer limit**: minimum heat dissipation per bit erasure.

**2. Room temperature calculation:**

At $T = 300$K:
$$E_{\\text{min}} = k_B T \\ln 2 = (1.38 \\times 10^{-23} \\text{ J/K}) \\times 300 \\text{ K} \\times 0.693$$

$$= 2.87 \\times 10^{-21} \\text{ J} \\approx 0.018 \\text{ eV} \\approx 18 \\text{ meV}$$

**3. Real transistor comparison:**

**Modern CPU transistor (2023):**
~10-100 aJ (attojoules) per switch = $10^{-17}$ to $10^{-16}$ J

**Ratio to Landauer:**
$$\\frac{E_{\\text{real}}}{E_{\\text{Landauer}}} \\approx \\frac{10^{-17}}{3 \\times 10^{-21}} \\approx 3000\\text{-}30000\\times$$

**We're ~3,000-30,000× above the fundamental limit!**

**Where does the extra energy go?**
- Charging/discharging parasitic capacitances
- Leakage currents
- Non-adiabatic switching
- Signal transmission

**Implications:**
- Huge room for efficiency improvement in principle
- But many practical barriers (noise margins, speed requirements)
- Getting close to Landauer requires very slow, reversible operations`,
  },
  {
    slug: "reversible-computing",
    title: "Reversible Logic Gates",
    difficulty: "interview",
    type: "conceptual",
    topics: ["reversible computing", "Toffoli", "Landauer"],
    moduleRef: "Landauer's principle and the cost of computation",
    statement: `Reversible computing avoids the Landauer limit by using only logically reversible operations.

1. Why are standard AND and OR gates irreversible?
2. Show that the Toffoli gate (CCNOT) is reversible and universal.
3. What is the practical challenge with reversible computing?`,
    solution: `**1. Why AND/OR are irreversible:**

**AND gate:** $f(a,b) = a \\land b$

| Input | Output |
|-------|--------|
| 00 | 0 |
| 01 | 0 |
| 10 | 0 |
| 11 | 1 |

If output is 0, input could be 00, 01, or 10 — we can't tell which.
**Information lost:** 2 bits in → 1 bit out → 1 bit erased.

**OR gate:** Similar problem. Output 1 could come from 01, 10, or 11.

**Information-theoretic view:**
- 2 input bits = 4 possible states
- 1 output bit = 2 possible states
- Must map 4 → 2 = lose 1 bit per operation
- By Landauer: $k_BT \\ln 2$ heat per operation

**2. Toffoli gate reversibility:**

**Definition:** CCNOT(a, b, c) = (a, b, c ⊕ (a ∧ b))

| a | b | c | a' | b' | c' |
|---|---|---|----|----|-----|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 1 | 0 | 1 |
| 1 | 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 | 0 |

**Key observations:**
- 3 bits in → 3 bits out (no information loss)
- Each output row is unique → invertible
- **Self-inverse:** CCNOT(CCNOT(a,b,c)) = (a,b,c)

**Universality:**
- Set c=1: CCNOT(a,b,1) = (a, b, ¬(a ∧ b)) = (a, b, NAND(a,b))
- NAND is universal for classical logic
- Therefore Toffoli is universal

**3. Practical challenges:**

**Garbage bits:**
To simulate irreversible computation reversibly, need "garbage" output bits to hold discarded information.
- Simple circuit: N gates → N garbage bits
- Must clean up garbage (which costs energy) or store forever

**Speed:**
Reversible gates must be quasi-static (slow) to avoid dissipation.
- Fast switching → non-equilibrium → heat
- Clock speeds limited

**Error accumulation:**
No "refreshing" of signals (that would erase errors but also erase information).
Errors propagate and compound.

**Hardware complexity:**
- More transistors per logic operation
- More complex routing
- Specialized fabrication

**Current status:**
Reversible computing remains largely theoretical; some experimental demonstrations but no practical computers.`,
  },
  {
    slug: "stochastic-bit",
    title: "Stochastic Computing Basics",
    difficulty: "warm-up",
    type: "conceptual",
    topics: ["stochastic computing", "probability encoding"],
    moduleRef: "Stochastic computing and sampling",
    statement: `In stochastic computing, numbers are represented as probabilities in bit streams.

A value $p \\in [0,1]$ is encoded as a stream where each bit is 1 with probability $p$.

1. How do you multiply two stochastic numbers?
2. What is the variance of an N-bit stochastic representation?
3. What operations are easy/hard in stochastic computing?`,
    solution: `**1. Stochastic multiplication:**

Given bit streams $X$ and $Y$ representing $p_X$ and $p_Y$:

**Operation:** AND gate

$$Z_i = X_i \\land Y_i$$

**Probability:**
$$P(Z_i = 1) = P(X_i = 1) \\cdot P(Y_i = 1) = p_X \\cdot p_Y$$

**Result:** $Z$ represents $p_X \\cdot p_Y$ ✓

**Simple circuit:** Just an AND gate computes multiplication!

**2. Variance analysis:**

For N-bit stream representing $p$, the count of 1s is:
$$C = \\sum_{i=1}^{N} X_i, \\quad X_i \\sim \\text{Bernoulli}(p)$$

$$\\mathbb{E}[C] = Np, \\quad \\text{Var}(C) = Np(1-p)$$

**Estimated value:** $\\hat{p} = C/N$

$$\\text{Var}(\\hat{p}) = \\frac{p(1-p)}{N}$$

**Standard error:** $\\sigma_{\\hat{p}} = \\sqrt{\\frac{p(1-p)}{N}} \\leq \\frac{1}{2\\sqrt{N}}$

**For 1% precision:** Need $\\sigma < 0.01$, so $N > 2500$ bits.

**Trade-off:** Precision requires long bit streams (high latency).

**3. Easy vs hard operations:**

**Easy (simple gates):**
- **Multiplication:** AND gate
- **Complement:** NOT gate gives $1-p$
- **Averaging:** MUX gives $(p_1 + p_2)/2$
- **Min/max:** OR for max$(p_1, p_2)$ approx, AND for min

**Medium:**
- **Addition:** Requires scaled addition or multi-stream encoding
- **Division:** More complex circuits

**Hard:**
- **Exact arithmetic:** Variance limits precision
- **Comparison:** Which of two streams is larger?
- **Non-monotonic functions:** Need creative encodings

**Advantages of stochastic computing:**
- Fault tolerant (bit flips = small errors)
- Low power (simple gates)
- Compact circuits for some operations

**Disadvantages:**
- Slow (many bits for precision)
- Random number generation required
- Correlation issues (same stream can't be multiplied by itself naively)`,
  },
  {
    slug: "metropolis-algorithm",
    title: "Metropolis-Hastings Algorithm",
    difficulty: "interview",
    type: "derivation",
    topics: ["MCMC", "Metropolis", "sampling"],
    moduleRef: "Stochastic computing and sampling",
    statement: `The Metropolis-Hastings algorithm samples from a target distribution $P(x)$ using a proposal distribution $Q(x'|x)$.

1. State the Metropolis-Hastings acceptance probability.
2. Prove that this satisfies detailed balance with $P(x)$.
3. For symmetric proposals ($Q(x'|x) = Q(x|x')$), simplify the acceptance rule.`,
    hints: [
      "Detailed balance: $P(x)T(x \\to x') = P(x')T(x' \\to x)$ where $T$ is the transition probability.",
    ],
    solution: `**1. Acceptance probability:**

Propose move $x \\to x'$ from $Q(x'|x)$.

Accept with probability:
$$A(x \\to x') = \\min\\left(1, \\frac{P(x')Q(x|x')}{P(x)Q(x'|x)}\\right)$$

**2. Detailed balance proof:**

The transition probability is:
$$T(x \\to x') = Q(x'|x) \\cdot A(x \\to x')$$

**To show:** $P(x)T(x \\to x') = P(x')T(x' \\to x)$

**Case 1:** $\\frac{P(x')Q(x|x')}{P(x)Q(x'|x)} \\leq 1$

Then $A(x \\to x') = \\frac{P(x')Q(x|x')}{P(x)Q(x'|x)}$ and $A(x' \\to x) = 1$.

LHS: $P(x) \\cdot Q(x'|x) \\cdot \\frac{P(x')Q(x|x')}{P(x)Q(x'|x)} = P(x')Q(x|x')$

RHS: $P(x') \\cdot Q(x|x') \\cdot 1 = P(x')Q(x|x')$

LHS = RHS ✓

**Case 2:** $\\frac{P(x')Q(x|x')}{P(x)Q(x'|x)} > 1$

By symmetry with Case 1, detailed balance holds.

**Therefore:** The Markov chain converges to stationary distribution $P(x)$.

**3. Symmetric proposals:**

If $Q(x'|x) = Q(x|x')$ (e.g., Gaussian centered at current state):

$$A(x \\to x') = \\min\\left(1, \\frac{P(x')}{P(x)}\\right)$$

**Simplification:**
- If $P(x') > P(x)$: always accept (move to higher probability)
- If $P(x') < P(x)$: accept with probability $P(x')/P(x)$

**Algorithm (original Metropolis):**
1. Propose $x' \\sim Q(\\cdot|x)$
2. Compute $r = P(x')/P(x)$
3. If $r \\geq 1$: accept $x'$
4. Else: accept $x'$ with probability $r$; otherwise stay at $x$

**Note:** Only need $P(x)$ up to normalization constant, since:
$$\\frac{P(x')}{P(x)} = \\frac{\\tilde{P}(x')/Z}{\\tilde{P}(x)/Z} = \\frac{\\tilde{P}(x')}{\\tilde{P}(x)}$$`,
  },
  {
    slug: "gibbs-sampling",
    title: "Gibbs Sampling",
    difficulty: "interview",
    type: "derivation",
    topics: ["Gibbs sampling", "MCMC", "conditionals"],
    moduleRef: "Stochastic computing and sampling",
    statement: `Gibbs sampling updates one variable at a time from its conditional distribution.

For a joint distribution $P(x_1, \\ldots, x_n)$:

1. Describe the Gibbs sampling algorithm.
2. Show that Gibbs sampling satisfies detailed balance.
3. When does Gibbs sampling work well vs. poorly?`,
    solution: `**1. Algorithm:**

**Input:** Joint distribution $P(x_1, \\ldots, x_n)$, initial state $x^{(0)}$

**Iteration:** For $t = 1, 2, \\ldots$:

For each variable $i = 1, \\ldots, n$:
$$x_i^{(t)} \\sim P(x_i | x_1^{(t)}, \\ldots, x_{i-1}^{(t)}, x_{i+1}^{(t-1)}, \\ldots, x_n^{(t-1)})$$

Sample each variable conditioned on the current values of all others.

**Systematic vs Random scan:**
- Systematic: cycle through variables 1, 2, ..., n
- Random scan: pick variable uniformly at random each step

**2. Detailed balance:**

For the transition $x \\to x'$ where only $x_i$ changes:

$$T(x \\to x') = P(x_i' | x_{-i})$$

where $x_{-i}$ denotes all variables except $i$.

**Check detailed balance:**
$$P(x)T(x \\to x') = P(x)P(x_i'|x_{-i})$$

Using $P(x) = P(x_i|x_{-i})P(x_{-i})$:
$$= P(x_i|x_{-i})P(x_{-i})P(x_i'|x_{-i})$$

Similarly:
$$P(x')T(x' \\to x) = P(x_i'|x_{-i})P(x_{-i})P(x_i|x_{-i})$$

These are equal! ✓

**Note:** This proves detailed balance for single-variable updates. Full Gibbs (cycling through all variables) also converges to $P$ under mild conditions.

**3. When Gibbs works well/poorly:**

**Works well:**
- **Conditionals are tractable:** Can sample from $P(x_i|x_{-i})$ efficiently
- **Low correlation:** Variables are relatively independent
- **Discrete or conjugate:** Closed-form conditionals

**Works poorly:**

**Strong correlations:**
If $x_1$ and $x_2$ are highly correlated, Gibbs moves slowly along the correlation direction.
Example: $P(x_1, x_2) \\propto e^{-10(x_1-x_2)^2 - 0.1(x_1^2+x_2^2)}$

**Multimodal distributions:**
Gibbs can get stuck in one mode; hard to jump between modes when each variable alone must cross low-probability regions.

**Funnel geometries:**
Hierarchical models with varying scales: difficult to tune step sizes.

**Comparison to Metropolis-Hastings:**
- Gibbs: no tuning (uses exact conditionals), but can be slow
- MH: requires proposal tuning, but can make larger moves`,
  },
  {
    slug: "mixing-time",
    title: "Markov Chain Mixing Time",
    difficulty: "interview",
    type: "conceptual",
    topics: ["mixing time", "MCMC", "convergence"],
    moduleRef: "Stochastic computing and sampling",
    statement: `The mixing time of a Markov chain measures how quickly it converges to its stationary distribution.

1. Define mixing time in terms of total variation distance.
2. What factors affect mixing time?
3. For a random walk on a cycle of $n$ nodes, what is the mixing time?`,
    solution: `**1. Definition:**

**Total variation distance:**
$$d_{TV}(\\mu, \\nu) = \\max_A |\\mu(A) - \\nu(A)| = \\frac{1}{2}\\sum_x |\\mu(x) - \\nu(x)|$$

**Mixing time:**
$$t_{mix}(\\epsilon) = \\min\\{t : \\max_{x_0} d_{TV}(P^t(x_0, \\cdot), \\pi) \\leq \\epsilon\\}$$

Minimum time until chain is within $\\epsilon$ of stationary $\\pi$ from any start.

Often quoted: $t_{mix} = t_{mix}(1/4)$ (by convention).

**2. Factors affecting mixing:**

**Spectral gap:**
Let $\\lambda_1 \\geq \\lambda_2 \\geq \\ldots$ be eigenvalues of transition matrix.
- $\\lambda_1 = 1$ (stationary distribution)
- Spectral gap: $\\gamma = 1 - \\max(\\lambda_2, |\\lambda_n|)$

$$t_{mix} = \\Theta\\left(\\frac{1}{\\gamma}\\log\\frac{1}{\\epsilon}\\right)$$

Large gap = fast mixing.

**Conductance (bottlenecks):**
$$\\Phi = \\min_{\\pi(S) \\leq 1/2} \\frac{\\sum_{x \\in S, y \\notin S} \\pi(x)P(x,y)}{\\pi(S)}$$

Measures worst "bottleneck" between parts of state space.

Cheeger inequality: $\\frac{\\Phi^2}{2} \\leq \\gamma \\leq 2\\Phi$

**State space structure:**
- High-dimensional → potentially slow
- Multimodal → bottlenecks between modes
- Well-connected → fast mixing

**3. Random walk on cycle:**

**Setup:** $n$ nodes in a cycle, move left or right with probability 1/2 each.

**Stationary distribution:** Uniform (by symmetry).

**Mixing time analysis:**

The position after $t$ steps is approximately $\\sum_{i=1}^t X_i$ where $X_i = \\pm 1$.

Variance: $\\text{Var}(\\text{position}) = t$

To "spread" over the cycle (circumference $n$), need:
$$\\sqrt{t} \\sim n \\implies t \\sim n^2$$

**Result:** $t_{mix} = \\Theta(n^2)$

**Intuition:** Random walk diffuses with standard deviation $\\sqrt{t}$; to cover distance $n$ requires time $n^2$ (diffusive scaling).

**Comparison:**
- Complete graph: $t_{mix} = O(\\log n)$ (highly connected)
- Line segment: $t_{mix} = \\Theta(n^2)$ (similar to cycle)
- Hypercube $(\\{0,1\\}^n)$: $t_{mix} = \\Theta(n \\log n)$`,
  },
  {
    slug: "simulated-annealing",
    title: "Simulated Annealing",
    difficulty: "interview",
    type: "conceptual",
    topics: ["annealing", "optimization", "temperature"],
    moduleRef: "Stochastic computing and sampling",
    statement: `Simulated annealing adapts MCMC for optimization by gradually lowering the temperature.

1. How does simulated annealing work?
2. What is the relationship between annealing schedule and solution quality?
3. Compare simulated annealing to gradient descent for non-convex optimization.`,
    solution: `**1. Algorithm:**

**Goal:** Find $x^* = \\arg\\min_x E(x)$ (minimize energy/cost).

**Idea:** Sample from Boltzmann distribution $P(x) \\propto e^{-E(x)/T}$ while gradually decreasing $T$.

**Algorithm:**
1. Initialize $x$, set high temperature $T_0$
2. For $k = 1, 2, \\ldots, K$:
   a. Propose move $x' \\sim Q(\\cdot|x)$
   b. Accept with probability $\\min(1, e^{-(E(x') - E(x))/T_k})$
   c. Decrease temperature: $T_{k+1} = \\alpha T_k$ (geometric) or other schedule
3. Return best $x$ found

**Key insight:** At high $T$, accepts many moves (explores broadly). At low $T$, mostly downhill (exploits).

**2. Annealing schedule:**

**Logarithmic (theoretical optimal):**
$$T_k = \\frac{T_0}{\\log(1 + k)}$$

Guarantees convergence to global optimum, but extremely slow.

**Geometric (practical):**
$$T_k = \\alpha^k T_0, \\quad \\alpha \\in [0.9, 0.99]$$

Faster but no convergence guarantee.

**Adaptive:**
Adjust based on acceptance rate; slow down when acceptance drops.

**Trade-off:**
- Cool too fast → get stuck in local minimum
- Cool too slow → waste computation
- "Sweet spot" depends on energy landscape

**Quality vs Time:**
Roughly, solution quality improves logarithmically with time for hard problems.

**3. SA vs Gradient Descent:**

| Aspect | Gradient Descent | Simulated Annealing |
|--------|------------------|---------------------|
| Information | Uses gradients | Only uses function values |
| Escaping local minima | Cannot (without restarts) | Can (via thermal fluctuations) |
| Deterministic | Yes | No |
| Convergence speed | Fast near minimum | Slow (random walk) |
| Hyperparameters | Learning rate | Schedule, $T_0$, $\\alpha$ |
| Best for | Smooth, convex-ish | Discrete, rugged landscapes |

**When to use SA:**
- Discrete optimization (TSP, scheduling)
- Many local minima
- Gradient not available or meaningful

**When to use GD:**
- Continuous, differentiable
- Well-behaved landscape
- Large-scale (gradient is efficient)

**Hybrid approaches:**
- Basin-hopping: local optimization + random jumps
- Parallel tempering: run multiple chains at different temperatures`,
  },
  {
    slug: "energy-based-model",
    title: "Energy-Based Model Definition",
    difficulty: "warm-up",
    type: "conceptual",
    topics: ["energy-based models", "partition function"],
    moduleRef: "Energy-based models",
    statement: `An Energy-Based Model (EBM) defines a probability distribution via an energy function $E(x)$:

$$P(x) = \\frac{e^{-E(x)}}{Z}$$

where $Z = \\int e^{-E(x)}dx$ is the partition function.

1. What is the relationship between energy and probability?
2. Why is the partition function problematic?
3. Give an example of an EBM you've seen before.`,
    solution: `**1. Energy-probability relationship:**

$$P(x) = \\frac{1}{Z}e^{-E(x)}$$

Taking logs:
$$\\log P(x) = -E(x) - \\log Z$$

**Key properties:**
- Lower energy = higher probability
- Energy differences determine probability ratios:
$$\\frac{P(x_1)}{P(x_2)} = e^{-(E(x_1) - E(x_2))}$$

**Interpretation:**
- Energy = "badness" or "implausibility" of configuration
- EBM learns which configurations are good (low energy)
- No explicit normalization in energy

**2. Partition function problems:**

$$Z = \\int e^{-E(x)}dx \\quad \\text{or} \\quad Z = \\sum_x e^{-E(x)}$$

**Intractability:**
- Integral/sum over all possible configurations
- Exponentially many states for discrete $x$
- High-dimensional integral for continuous $x$

**Why it matters:**
- Needed for exact probability: $P(x) = e^{-E(x)}/Z$
- Needed for likelihood: $\\log P(x) = -E(x) - \\log Z$
- Maximum likelihood requires $\\nabla_\\theta \\log Z$

**Workarounds:**
- Contrastive learning (avoid computing $Z$ directly)
- MCMC sampling (sample from $P$ without knowing $Z$)
- Variational bounds
- Score matching (learn $\\nabla_x \\log P$, which doesn't involve $Z$)

**3. Examples of EBMs:**

**Boltzmann machine:**
$$E(x) = -\\sum_{i<j} w_{ij}x_ix_j - \\sum_i b_ix_i$$

**Gaussian distribution:**
$$E(x) = \\frac{1}{2}(x - \\mu)^T\\Sigma^{-1}(x - \\mu)$$

Then $P(x) \\propto e^{-E(x)} = $ Gaussian.

**Ising model:**
$$E(\\sigma) = -J\\sum_{\\langle i,j\\rangle}\\sigma_i\\sigma_j - h\\sum_i\\sigma_i$$

Spins $\\sigma_i = \\pm 1$ on a lattice.

**Modern deep EBMs:**
$$E_\\theta(x) = f_\\theta(x)$$

where $f_\\theta$ is a neural network. Flexible but hard to train.`,
  },
  {
    slug: "contrastive-divergence",
    title: "Contrastive Divergence Training",
    difficulty: "interview",
    type: "derivation",
    topics: ["contrastive divergence", "training", "RBM"],
    moduleRef: "Energy-based models",
    statement: `Contrastive Divergence (CD) is an approximate algorithm for training energy-based models.

1. Derive the gradient of the log-likelihood for an EBM.
2. Why is this gradient intractable?
3. How does CD-k approximate this gradient?`,
    solution: `**1. Log-likelihood gradient:**

For EBM: $P_\\theta(x) = \\frac{e^{-E_\\theta(x)}}{Z_\\theta}$

Log-likelihood of data point $x$:
$$\\log P_\\theta(x) = -E_\\theta(x) - \\log Z_\\theta$$

Gradient:
$$\\nabla_\\theta \\log P_\\theta(x) = -\\nabla_\\theta E_\\theta(x) - \\nabla_\\theta \\log Z_\\theta$$

For the partition function gradient:
$$\\nabla_\\theta \\log Z_\\theta = \\frac{1}{Z_\\theta}\\nabla_\\theta Z_\\theta = \\frac{1}{Z_\\theta}\\nabla_\\theta \\sum_{x'} e^{-E_\\theta(x')}$$

$$= \\frac{1}{Z_\\theta}\\sum_{x'} e^{-E_\\theta(x')}(-\\nabla_\\theta E_\\theta(x'))$$

$$= -\\sum_{x'} P_\\theta(x') \\nabla_\\theta E_\\theta(x') = -\\mathbb{E}_{P_\\theta}[\\nabla_\\theta E_\\theta(x')]$$

**Final gradient:**
$$\\nabla_\\theta \\log P_\\theta(x) = -\\nabla_\\theta E_\\theta(x) + \\mathbb{E}_{P_\\theta}[\\nabla_\\theta E_\\theta(x')]$$

$$= \\mathbb{E}_{P_\\theta}[\\nabla_\\theta E_\\theta] - \\nabla_\\theta E_\\theta(x_{\\text{data}})$$

**Interpretation:** Push down energy of data, push up energy of model samples.

**2. Why intractable:**

The expectation $\\mathbb{E}_{P_\\theta}[\\nabla_\\theta E_\\theta]$ requires:
- Sampling from the model distribution $P_\\theta$
- This requires MCMC which needs many steps to converge
- Must be done for every gradient update

**Problem:** Exact sampling is too slow for training.

**3. Contrastive Divergence (CD-k):**

**Idea:** Instead of sampling from equilibrium $P_\\theta$, run only $k$ steps of MCMC starting from data.

**CD-k algorithm:**
1. Start at data point $x^{(0)} = x_{\\text{data}}$
2. Run $k$ Gibbs sampling steps to get $x^{(k)}$
3. Approximate gradient:
$$\\nabla_\\theta \\mathcal{L} \\approx \\nabla_\\theta E_\\theta(x^{(k)}) - \\nabla_\\theta E_\\theta(x^{(0)})$$

**CD-1:** Just one Gibbs step (most common for RBMs).

**Why it works:**
- $x^{(k)}$ is biased toward data but pushed toward model
- Energy of $x^{(k)}$ is raised (pushed away from data)
- Energy of data is lowered
- Approximate positive/negative phase

**Limitations:**
- Biased estimator (doesn't converge to true gradient)
- Can lead to spurious modes
- Works well for RBMs, less reliable for deeper models

**Improvements:**
- Persistent CD: maintain persistent chains across updates
- Parallel tempering: mix fast and slow chains`,
  },
  {
    slug: "rbm-structure",
    title: "Restricted Boltzmann Machine",
    difficulty: "interview",
    type: "derivation",
    topics: ["RBM", "Boltzmann machines", "bipartite"],
    moduleRef: "Ising models and Boltzmann machines",
    statement: `A Restricted Boltzmann Machine (RBM) has visible units $v$ and hidden units $h$ with no within-layer connections.

The energy is:
$$E(v, h) = -v^TWh - b^Tv - c^Th$$

1. Show that the conditional distributions $P(h|v)$ and $P(v|h)$ factor.
2. Derive the form of $P(h_j = 1 | v)$ for binary units.
3. Why does the restricted structure make inference tractable?`,
    hints: [
      "In an RBM, each hidden unit is conditionally independent given the visible units.",
    ],
    solution: `**1. Conditional factorization:**

**Joint distribution:**
$$P(v, h) = \\frac{1}{Z}e^{-E(v,h)} = \\frac{1}{Z}\\exp(v^TWh + b^Tv + c^Th)$$

**Conditional on $v$:**
$$P(h|v) = \\frac{P(v,h)}{P(v)} \\propto \\exp(v^TWh + c^Th)$$
$$= \\exp\\left(\\sum_j (W^Tv)_j h_j + c_jh_j\\right)$$
$$= \\exp\\left(\\sum_j (W_j^Tv + c_j)h_j\\right)$$
$$= \\prod_j \\exp((W_j^Tv + c_j)h_j)$$

**Key observation:** No $h_ih_j$ terms (no hidden-hidden connections), so:
$$P(h|v) = \\prod_j P(h_j|v)$$

Hidden units are **conditionally independent** given visible.

Similarly, $P(v|h) = \\prod_i P(v_i|h)$ (visible units independent given hidden).

**2. Single hidden unit conditional:**

For binary $h_j \\in \\{0, 1\\}$:
$$P(h_j = 1|v) = \\frac{e^{(W_j^Tv + c_j) \\cdot 1}}{e^{(W_j^Tv + c_j) \\cdot 0} + e^{(W_j^Tv + c_j) \\cdot 1}}$$

$$= \\frac{e^{W_j^Tv + c_j}}{1 + e^{W_j^Tv + c_j}} = \\sigma(W_j^Tv + c_j)$$

**Result:** $P(h_j = 1|v) = \\sigma(W_j^Tv + c_j)$ — the sigmoid function!

Similarly: $P(v_i = 1|h) = \\sigma(W_i h + b_i)$

**3. Why tractable:**

**General Boltzmann machine:**
- Full connectivity: $E = -\\sum_{i<j} w_{ij}s_is_j - \\sum_i b_is_i$
- Computing $P(h|v)$ requires summing over all $2^{|h|}$ hidden configurations
- Intractable for large networks

**RBM structure:**
- No within-layer connections
- Conditionals factor into independent terms
- Computing $P(h|v)$ is $O(|v| \\cdot |h|)$ — just matrix multiply + sigmoid
- Can do efficient Gibbs sampling: sample all $h$ in parallel given $v$, then all $v$ given $h$

**Sampling procedure:**
\`\`\`
Given v:
  For each j: h_j ~ Bernoulli(σ(W_j^T v + c_j))  [parallel]
Given h:
  For each i: v_i ~ Bernoulli(σ(W_i h + b_i))  [parallel]
\`\`\`

**Trade-off:**
- RBM: tractable inference, limited expressiveness
- Deep Boltzmann Machine: more expressive, intractable
- Deep Belief Net: greedy layer-wise training with RBMs`,
  },
  {
    slug: "ising-phase-transition",
    title: "Ising Model Phase Transition",
    difficulty: "hard",
    type: "conceptual",
    topics: ["Ising model", "phase transition", "critical temperature"],
    moduleRef: "Ising models and Boltzmann machines",
    statement: `The 2D Ising model undergoes a phase transition at the critical temperature $T_c$.

$$E = -J\\sum_{\\langle i,j \\rangle} \\sigma_i \\sigma_j$$

where $\\sigma_i = \\pm 1$ and the sum is over nearest neighbors.

1. What are the two phases and what distinguishes them?
2. What happens to correlations and fluctuations near $T_c$?
3. Why is the 2D Ising model solvable but the 3D is not?`,
    solution: `**1. The two phases:**

**Low temperature ($T < T_c$): Ordered/Ferromagnetic**
- Spins align: mostly all $+1$ or all $-1$
- Spontaneous magnetization: $m = \\langle \\sigma \\rangle \\neq 0$
- Long-range order: distant spins correlated
- Two degenerate ground states (up/down symmetry)

**High temperature ($T > T_c$): Disordered/Paramagnetic**
- Spins random: approximately equal $+1$ and $-1$
- No magnetization: $m = 0$
- Short-range correlations only
- Entropy dominates over energy

**Critical temperature (2D square lattice):**
$$T_c = \\frac{2J}{k_B \\ln(1 + \\sqrt{2})} \\approx 2.27 J/k_B$$

Onsager's exact solution (1944).

**2. Near $T_c$:**

**Correlation length:**
$$\\xi \\sim |T - T_c|^{-\\nu}$$

$\\xi$ = typical size of correlated regions. Diverges at $T_c$!

**Fluctuations:**
- Near $T_c$: domains of all sizes exist
- Scale-invariance: no characteristic length scale
- Critical fluctuations: system "can't decide" which phase

**Susceptibility:**
$$\\chi = \\frac{\\partial m}{\\partial h}\\bigg|_{h=0} \\sim |T - T_c|^{-\\gamma}$$

Diverges at $T_c$: system is infinitely sensitive to perturbation.

**Critical exponents (2D Ising):**
- $\\nu = 1$ (correlation length)
- $\\gamma = 7/4$ (susceptibility)
- $\\beta = 1/8$ (magnetization: $m \\sim |T_c - T|^\\beta$ for $T < T_c$)

**3. 2D vs 3D solvability:**

**2D Ising: Exactly solvable**
- Onsager (1944): Transfer matrix method
- Combinatorial structure maps to free fermions
- Exact partition function in closed form

**3D Ising: Not exactly solvable**
- No known closed-form solution
- Transfer matrix doesn't simplify
- Requires numerical methods (Monte Carlo, series expansions)
- Critical exponents known only numerically

**Why the difference:**

The 2D model has special mathematical structure:
- Duality: maps high-$T$ to low-$T$
- Self-duality at $T_c$ (determines critical point)
- Pfaffian structure in partition function

3D lacks these simplifications. The integrability "breaks" in higher dimensions.

**General lesson:**
Most statistical physics models are not exactly solvable. 2D Ising is a rare, beautiful exception that teaches us about universality and phase transitions.`,
  },
  {
    slug: "hopfield-network",
    title: "Hopfield Network as Energy Model",
    difficulty: "interview",
    type: "derivation",
    topics: ["Hopfield network", "associative memory", "energy"],
    moduleRef: "Ising models and Boltzmann machines",
    statement: `A Hopfield network stores patterns as attractors of an energy landscape.

For neurons $s_i \\in \\{-1, +1\\}$ and symmetric weights $w_{ij} = w_{ji}$:

$$E = -\\frac{1}{2}\\sum_{i \\neq j} w_{ij}s_is_j$$

1. Show that asynchronous updates $s_i \\to \\text{sign}(\\sum_j w_{ij}s_j)$ decrease energy.
2. How do you store a pattern $\\xi^\\mu$ using Hebbian learning?
3. What is the storage capacity of a Hopfield network?`,
    solution: `**1. Energy decrease proof:**

Consider updating neuron $i$:
$$s_i^{\\text{new}} = \\text{sign}\\left(\\sum_j w_{ij}s_j\\right) = \\text{sign}(h_i)$$

where $h_i = \\sum_j w_{ij}s_j$ is the local field.

**Energy change:**
$$\\Delta E = E^{\\text{new}} - E^{\\text{old}} = -\\frac{1}{2}\\sum_{j \\neq i}w_{ij}s_i^{\\text{new}}s_j + \\frac{1}{2}\\sum_{j \\neq i}w_{ij}s_i^{\\text{old}}s_j$$

Since only $s_i$ changes:
$$\\Delta E = -\\frac{1}{2}(s_i^{\\text{new}} - s_i^{\\text{old}})\\sum_j w_{ij}s_j = -\\frac{1}{2}(s_i^{\\text{new}} - s_i^{\\text{old}})h_i$$

**Case analysis:**
- If $s_i^{\\text{new}} = s_i^{\\text{old}}$: $\\Delta E = 0$
- If $s_i^{\\text{new}} \\neq s_i^{\\text{old}}$: sign changed, so $s_i^{\\text{new}}h_i > 0$ and $s_i^{\\text{old}}h_i < 0$
  - $\\Delta E = -\\frac{1}{2}(s_i^{\\text{new}} - s_i^{\\text{old}})h_i < 0$

**Result:** Energy never increases. ✓ Network converges to local minimum.

**2. Hebbian learning:**

**Goal:** Store patterns $\\xi^1, \\xi^2, \\ldots, \\xi^p$ as fixed points.

**Hebb rule:**
$$w_{ij} = \\frac{1}{N}\\sum_{\\mu=1}^{p}\\xi_i^\\mu \\xi_j^\\mu$$

"Neurons that fire together wire together."

**Why it works:**
Local field when in pattern $\\xi^\\mu$:
$$h_i = \\sum_j w_{ij}\\xi_j^\\mu = \\frac{1}{N}\\sum_j\\sum_{\\nu}\\xi_i^\\nu\\xi_j^\\nu\\xi_j^\\mu$$

$$= \\frac{1}{N}\\sum_\\nu \\xi_i^\\nu \\underbrace{\\sum_j \\xi_j^\\nu\\xi_j^\\mu}_{\\approx N\\delta_{\\mu\\nu}}$$

If patterns are orthogonal: $h_i \\approx \\xi_i^\\mu$ ✓

The pattern is a fixed point: $\\text{sign}(h_i) = \\xi_i^\\mu$.

**3. Storage capacity:**

**Critical capacity:**
$$p_c \\approx 0.14N$$

For random patterns, Hopfield network can reliably store about 14% of $N$ patterns.

**Above capacity:**
- Patterns interfere (crosstalk)
- Spurious attractors appear
- Retrieval errors increase

**More precise (Gardner, 1988):**
$$p \\leq \\frac{N}{2\\ln N}$$ for perfect retrieval.

**Modern Hopfield networks:**
- Replace quadratic energy with higher-order interactions
- Exponential capacity: $p \\sim e^{cN}$
- Connection to attention mechanisms in transformers`,
  },
  {
    slug: "p-bit-device",
    title: "Probabilistic Bits (p-bits)",
    difficulty: "interview",
    type: "conceptual",
    topics: ["p-bit", "probabilistic hardware", "noise"],
    moduleRef: "Sampling hardware",
    statement: `A probabilistic bit (p-bit) is a hardware device that fluctuates between 0 and 1 with controllable probability.

1. How could a p-bit be physically implemented?
2. What computation can a network of p-bits perform?
3. Compare p-bits to quantum bits (qubits) for sampling tasks.`,
    solution: `**1. Physical implementations:**

**Magnetic tunnel junction (MTJ):**
- Two magnetic layers separated by insulator
- One layer fixed, one "free" (fluctuates)
- Resistance depends on relative magnetization
- Low energy barrier → thermal fluctuations flip state
- Bias current shifts probability

**Key parameters:**
- Energy barrier $E_b$ vs thermal energy $k_BT$
- $E_b \\ll k_BT$: fast fluctuations (GHz)
- $E_b \\gg k_BT$: stable bit (normal memory)
- "Sweet spot": $E_b \\sim k_BT$ for p-bit operation

**Other approaches:**
- Stochastic CMOS: exploit transistor noise
- Memristive devices: conductive filament fluctuations
- Optical: noisy photonic systems

**2. P-bit computation:**

**Probabilistic Spin Logic (PSL):**
Network of p-bits coupled through "synapse" connections.

Energy function:
$$E = -\\sum_{i<j}J_{ij}m_im_j - \\sum_i h_im_i$$

where $m_i \\in \\{+1, -1\\}$ is p-bit state.

**Dynamics:** Each p-bit samples from:
$$P(m_i = +1) = \\sigma\\left(\\sum_j J_{ij}m_j + h_i\\right)$$

**Implements:** Hardware Boltzmann machine!

**Applications:**
- Combinatorial optimization (Ising solvers)
- Bayesian inference
- Machine learning training
- Sampling from complex distributions

**Advantage:** Natural parallelism, no algorithmic overhead for randomness.

**3. P-bits vs qubits:**

| Aspect | P-bit | Qubit |
|--------|-------|-------|
| State space | $\\{0, 1\\}$ classically | $\\alpha|0\\rangle + \\beta|1\\rangle$ |
| Superposition | No (probabilistic mixture) | Yes (coherent) |
| Entanglement | No | Yes |
| Temperature | Room temperature | Near absolute zero |
| Coherence time | N/A (incoherent) | μs to ms |
| Error rates | High but tolerable | Must be very low |
| Fabrication | CMOS compatible | Specialized |

**For sampling:**

P-bits: 
- Good for thermal/Boltzmann sampling
- Fast, cheap, scalable
- Limited to classical distributions

Qubits:
- Can sample from quantum distributions
- Potential exponential speedup for some problems
- Fragile, expensive, limited scale

**Hybrid approaches:**
- P-bits for most sampling
- Qubits for genuinely quantum tasks
- Together: "probabilistic computing" ecosystem`,
  },
  {
    slug: "analog-noise-computing",
    title: "Computing with Noise",
    difficulty: "hard",
    type: "conceptual",
    topics: ["analog computing", "noise", "computation"],
    moduleRef: "Sampling hardware",
    statement: `Conventional digital computing fights noise, but thermodynamic computing uses it.

1. What is the fundamental difference in philosophy?
2. How can noise be a computational resource?
3. What are the energy implications of noise-based computing?`,
    solution: `**1. Philosophical difference:**

**Digital computing:**
- Noise = error, must be suppressed
- Sharp logic levels (0V = 0, 5V = 1)
- Error correction to fix bit flips
- Deterministic computation
- Energy spent maintaining signal integrity

**Thermodynamic/analog computing:**
- Noise = randomness resource
- Continuous or probabilistic states
- Noise enables exploration/sampling
- Stochastic computation
- Noise is "free" (thermal fluctuations)

**Mindset shift:**
Instead of: "How do we compute despite noise?"
Ask: "How do we compute using noise?"

**2. Noise as computational resource:**

**Random number generation:**
- Digital: Pseudo-random (deterministic algorithm)
- Noisy analog: True random (physical entropy)
- Saves energy and silicon for RNG

**Optimization:**
- Simulated annealing needs random perturbations
- Noisy hardware provides this naturally
- Escaping local minima via thermal kicks

**Bayesian inference:**
- MCMC requires random samples
- Noisy dynamics = natural sampling
- Hardware does the "compute" for free

**Machine learning:**
- Dropout regularization: randomly zero neurons
- Noisy weights: natural exploration
- Stochastic gradient descent: inherent

**Energy-based models:**
- Boltzmann machines sample via noise
- Hardware noise → hardware sampling
- Perfect fit for training/inference

**3. Energy implications:**

**Digital cost of randomness:**
Generating good random numbers requires:
- Linear feedback shift registers: ~100 gates/bit
- Cryptographic PRNGs: ~1000 operations/bit
- Each operation costs energy

**Thermodynamic cost:**
- Thermal noise is free (environment provides)
- Reading noise costs $\\sim k_BT$ per bit (Landauer-ish)
- Much less than algorithmic generation

**But there are trade-offs:**

**Speed:**
- Thermal fluctuations have natural timescales
- Cannot be arbitrarily accelerated
- May be slower than digital for some tasks

**Precision:**
- Noisy systems have inherent variance
- Multiple samples needed for precision
- Trade-off: speed vs accuracy

**Control:**
- Must bias/tune noise to get desired distribution
- Control circuitry adds overhead

**Overall:**
For sampling-heavy workloads (ML, optimization, Bayesian), noise-based computing can be much more energy efficient. For exact arithmetic, digital wins.

**Potential:** 1000× energy savings for appropriate tasks (but we don't yet have the hardware at scale).`,
  },
  {
    slug: "energy-per-inference",
    title: "Energy Cost of Neural Network Inference",
    difficulty: "interview",
    type: "derivation",
    topics: ["energy", "inference", "efficiency"],
    moduleRef: "Connections to AI efficiency",
    statement: `Estimate the energy cost of running inference on a large language model.

For a model with $N$ parameters, context length $L$, and generating $T$ output tokens:

1. How many floating-point operations (FLOPs) are required?
2. For a GPU at efficiency $\\eta$ TFLOPs/Watt, what is the energy per token?
3. Compare to the theoretical Landauer limit.`,
    hints: [
      "Transformer inference is dominated by matrix multiplications.",
      "Each token generation requires ~2N FLOPs for a dense model.",
    ],
    solution: `**1. FLOP count:**

**Per token (decoder):**
Each token requires:
- Attention: $O(L \\cdot d_{model})$ FLOPs (with KV cache)
- FFN: $O(d_{model} \\cdot d_{ff})$ FLOPs (typically $d_{ff} = 4d_{model}$)
- Total per layer: $O(d_{model}^2)$
- For $L_{layers}$ layers: $O(L_{layers} \\cdot d_{model}^2)$

**Approximate formula:**
FLOPs per token $\\approx 2N$ (2 FLOPs per parameter: multiply + add)

For LLaMA-70B: $2 \\times 70 \\times 10^9 = 140 \\times 10^9$ FLOPs/token = 140 GFLOPs/token

**Total for $T$ tokens:**
FLOPs $\\approx 2NT$

**2. Energy per token:**

Modern GPUs:
- A100: ~300 TFLOPs peak, ~400W → ~0.75 TFLOPs/W
- Actual efficiency (utilization ~50%): ~0.4 TFLOPs/W

**Calculation for LLaMA-70B:**
$$E_{\\text{token}} = \\frac{140 \\times 10^9 \\text{ FLOPs}}{0.4 \\times 10^{12} \\text{ FLOPs/W}} \\cdot 1 \\text{ second}$$

Wait, need to account for time:
$$\\text{Time} = \\frac{140 \\times 10^9}{300 \\times 10^{12}} \\text{ s} \\approx 0.47 \\text{ ms}$$

$$E_{\\text{token}} = 400 \\text{ W} \\times 0.47 \\times 10^{-3} \\text{ s} \\approx 0.19 \\text{ J}$$

**More direct:** At 0.4 TFLOPs/W:
$$E = \\frac{140 \\times 10^9}{0.4 \\times 10^{12}} \\text{ J} = 0.35 \\text{ J/token}$$

**Typical range:** 0.1-1 J/token for large models.

**3. Comparison to Landauer:**

**Landauer limit:** $k_BT\\ln 2 \\approx 3 \\times 10^{-21}$ J per bit erasure.

**Operations per token:** ~$2N$ FLOPs. Each FLOP involves multiple bit operations, say ~100 bits.

**Minimum energy:**
$$E_{\\text{Landauer}} = 2N \\times 100 \\times 3 \\times 10^{-21} \\text{ J}$$
$$= 70 \\times 10^9 \\times 200 \\times 3 \\times 10^{-21} = 4.2 \\times 10^{-8} \\text{ J}$$

**Ratio:**
$$\\frac{E_{\\text{actual}}}{E_{\\text{Landauer}}} = \\frac{0.35}{4.2 \\times 10^{-8}} \\approx 10^7$$

**We're 10 million times above the Landauer limit!**

**Where's the gap?**
- Non-adiabatic switching (most of it)
- Memory access (often dominates actual energy)
- Cooling overhead
- Leakage currents
- Communication/data movement

**Implication:** Enormous headroom for efficiency improvements in principle, though practical gains will be incremental.`,
  },
  {
    slug: "boltzmann-machine-learning",
    title: "Learning in Boltzmann Machines",
    difficulty: "hard",
    type: "derivation",
    topics: ["Boltzmann machine", "learning rule", "gradient"],
    moduleRef: "Ising models and Boltzmann machines",
    statement: `A Boltzmann machine with visible units $v$ and hidden units $h$ has energy:

$$E(v, h) = -\\sum_{i<j}w_{ij}s_is_j - \\sum_i b_is_i$$

where $s = (v, h)$ are all units.

1. Derive the gradient of the log-likelihood with respect to $w_{ij}$.
2. What are the "positive" and "negative" phases of learning?
3. Why is training general Boltzmann machines hard?`,
    solution: `**1. Gradient derivation:**

**Log-likelihood:**
$$\\log P(v) = \\log \\sum_h e^{-E(v,h)} - \\log Z$$

where $Z = \\sum_{v,h} e^{-E(v,h)}$.

**Gradient with respect to $w_{ij}$:**

For the first term (data-dependent):
$$\\frac{\\partial}{\\partial w_{ij}}\\log \\sum_h e^{-E(v,h)} = \\frac{\\sum_h e^{-E(v,h)}s_is_j}{\\sum_h e^{-E(v,h)}}$$
$$= \\mathbb{E}_{P(h|v)}[s_is_j] = \\langle s_is_j \\rangle_{\\text{data}}$$

This is the expected correlation when hidden units are sampled given visible (data).

For the partition function term:
$$\\frac{\\partial}{\\partial w_{ij}}\\log Z = \\frac{\\sum_{v,h}e^{-E(v,h)}s_is_j}{Z} = \\mathbb{E}_{P(v,h)}[s_is_j] = \\langle s_is_j \\rangle_{\\text{model}}$$

**Final gradient:**
$$\\frac{\\partial \\log P(v)}{\\partial w_{ij}} = \\langle s_is_j \\rangle_{\\text{data}} - \\langle s_is_j \\rangle_{\\text{model}}$$

**Learning rule:**
$$\\Delta w_{ij} = \\epsilon(\\langle s_is_j \\rangle_{\\text{data}} - \\langle s_is_j \\rangle_{\\text{model}})$$

**2. Two phases:**

**Positive phase (clamped/wake):**
- Clamp visible units to data
- Sample hidden units given visible
- Compute $\\langle s_is_j \\rangle_{\\text{data}}$
- Strengthens correlations present in data

**Negative phase (free/sleep):**
- Let network run freely (sample from model)
- Compute $\\langle s_is_j \\rangle_{\\text{model}}$
- Weakens correlations the model hallucinates

**Intuition:**
- Positive phase: "What correlations does the data have?"
- Negative phase: "What correlations does the model imagine?"
- Learning: Make model's fantasies match reality

**3. Why training is hard:**

**Computing $\\langle \\cdot \\rangle_{\\text{model}}$ requires sampling from $P(v,h)$:**
- General Boltzmann machine: $P(h|v)$ doesn't factor
- Cannot efficiently sample hidden units given visible
- Cannot efficiently sample visible units given hidden
- Must run MCMC to equilibrium

**MCMC challenges:**
- Mixing time can be exponential for multi-modal distributions
- Need many steps per gradient update
- Gradient estimates are noisy

**Comparison to RBMs:**
- RBM: $P(h|v)$ factors → efficient sampling
- General BM: no such factorization
- CD works for RBM, not for general BM

**Approaches:**
- Mean-field approximation (biased but tractable)
- Persistent chains (keep state between updates)
- Variational inference (approximate posterior)
- Restrict to tractable architectures (RBM, DBN)`,
  },
  {
    slug: "score-matching",
    title: "Score Matching for EBMs",
    difficulty: "hard",
    type: "derivation",
    topics: ["score matching", "energy-based models", "training"],
    moduleRef: "Energy-based models",
    statement: `Score matching trains energy-based models without computing the partition function.

The score is $s_\\theta(x) = \\nabla_x \\log p_\\theta(x) = -\\nabla_x E_\\theta(x)$.

1. What is the score matching objective?
2. Derive the implicit score matching loss that doesn't require knowing $\\nabla_x \\log p_{data}$.
3. What is denoising score matching?`,
    hints: [
      "Score matching minimizes $\\mathbb{E}_{p_{data}}[\\|s_\\theta(x) - \\nabla_x \\log p_{data}(x)\\|^2]$.",
      "Integration by parts eliminates the unknown data score.",
    ],
    solution: `**1. Score matching objective:**

**Goal:** Match the model's score to the data's score.

$$\\mathcal{L}_{SM} = \\frac{1}{2}\\mathbb{E}_{p_{data}}\\left[\\|s_\\theta(x) - s_{data}(x)\\|^2\\right]$$

where $s_{data}(x) = \\nabla_x \\log p_{data}(x)$.

**Problem:** We don't know $p_{data}(x)$ analytically, so can't compute $s_{data}$.

**Key insight:** For EBM, $s_\\theta(x) = -\\nabla_x E_\\theta(x)$ doesn't involve $Z$!

**2. Implicit score matching:**

Expand the objective:
$$\\mathcal{L} = \\frac{1}{2}\\mathbb{E}\\left[\\|s_\\theta\\|^2 - 2s_\\theta \\cdot s_{data} + \\|s_{data}\\|^2\\right]$$

The last term doesn't depend on $\\theta$, so:
$$\\mathcal{L} \\propto \\mathbb{E}\\left[\\frac{1}{2}\\|s_\\theta\\|^2 - s_\\theta \\cdot s_{data}\\right]$$

**Integration by parts trick:**
$$\\mathbb{E}_{p_{data}}[s_\\theta(x) \\cdot \\nabla_x \\log p_{data}(x)] = \\mathbb{E}_{p_{data}}[s_\\theta(x) \\cdot \\frac{\\nabla_x p_{data}(x)}{p_{data}(x)}]$$

Using $\\int f(x)\\nabla p(x)dx = -\\int p(x)\\nabla f(x)dx$ (assuming boundary terms vanish):
$$= -\\mathbb{E}_{p_{data}}[\\nabla_x \\cdot s_\\theta(x)] = -\\mathbb{E}[\\text{tr}(\\nabla_x s_\\theta)]$$

**Implicit score matching loss:**
$$\\mathcal{L}_{ISM} = \\mathbb{E}_{p_{data}}\\left[\\frac{1}{2}\\|s_\\theta(x)\\|^2 + \\text{tr}(\\nabla_x s_\\theta(x))\\right]$$

No data score needed! Just derivatives of model score.

**3. Denoising score matching (DSM):**

**Idea:** Instead of matching score of $p_{data}$, match score of noisy data.

**Corrupt data:** $\\tilde{x} = x + \\sigma\\epsilon$, $\\epsilon \\sim \\mathcal{N}(0, I)$

**Noisy distribution:** $q_\\sigma(\\tilde{x}|x) = \\mathcal{N}(\\tilde{x}; x, \\sigma^2 I)$

**Score of conditional:**
$$\\nabla_{\\tilde{x}} \\log q_\\sigma(\\tilde{x}|x) = -\\frac{\\tilde{x} - x}{\\sigma^2}$$

**DSM objective:**
$$\\mathcal{L}_{DSM} = \\mathbb{E}_{x \\sim p_{data}, \\epsilon \\sim \\mathcal{N}}\\left[\\left\\|s_\\theta(x + \\sigma\\epsilon) + \\frac{\\epsilon}{\\sigma}\\right\\|^2\\right]$$

**Why it works:**
- Equivalent to score matching on smoothed distribution $q_\\sigma(\\tilde{x})$
- As $\\sigma \\to 0$, converges to true score matching
- Much simpler to implement (just denoise!)

**Connection to diffusion models:**
Diffusion models use multi-scale DSM: train score at many noise levels, then use score for reverse diffusion.`,
  },
  {
    slug: "diffusion-model-physics",
    title: "Diffusion Models as Physics",
    difficulty: "hard",
    type: "conceptual",
    topics: ["diffusion models", "SDE", "thermodynamics"],
    moduleRef: "Energy-based models",
    statement: `Diffusion models can be understood through the lens of statistical physics.

1. How does the forward diffusion process relate to thermodynamic relaxation?
2. What is the reverse-time SDE and why does it exist?
3. What is the connection between diffusion models and Boltzmann machines?`,
    solution: `**1. Forward diffusion as relaxation:**

**Forward SDE:**
$$dx = -\\frac{1}{2}\\beta(t)x \\, dt + \\sqrt{\\beta(t)} \\, dW$$

This is an Ornstein-Uhlenbeck process with time-varying coefficients.

**Physical interpretation:**
- $-\\frac{1}{2}\\beta(t)x$: friction/damping (pulls toward origin)
- $\\sqrt{\\beta(t)} dW$: thermal noise (random kicks)

**Equilibrium:** As $t \\to \\infty$, distribution converges to $\\mathcal{N}(0, I)$.

**Thermodynamic analogy:**
- Initial data = structured, low entropy state
- Noise addition = heating / entropy increase  
- Final state = maximum entropy (Gaussian)
- Forward process = relaxation to thermal equilibrium

**Information perspective:**
Information about data is gradually destroyed, replaced by noise. At the end, only "thermal" (random) information remains.

**2. Reverse-time SDE:**

**Anderson's result (1982):** Any forward SDE has a reverse-time SDE:

If forward: $dx = f(x,t)dt + g(t)dW$

Then reverse: $dx = [f(x,t) - g(t)^2 \\nabla_x \\log p_t(x)]dt + g(t)d\\bar{W}$

where $d\\bar{W}$ is reverse Brownian motion.

**For diffusion models:**
$$dx = \\left[-\\frac{1}{2}\\beta(t)x - \\beta(t)\\nabla_x \\log p_t(x)\\right]dt + \\sqrt{\\beta(t)}d\\bar{W}$$

**Key ingredient:** $\\nabla_x \\log p_t(x) = s_t(x)$, the score function.

This is what the neural network learns!

**Why it exists:**
Time-reversal symmetry of the underlying physics. The noise process is statistically reversible; we just need to know the probability current.

**3. Connection to Boltzmann machines:**

**Discrete-time perspective:**
Forward: $x_{t+1} = \\sqrt{1-\\beta}x_t + \\sqrt{\\beta}\\epsilon$
Reverse: requires knowing $P(x_t|x_{t+1})$

**Energy interpretation:**
At each time $t$, the marginal $p_t(x)$ can be written as:
$$p_t(x) \\propto e^{-E_t(x)}$$

for some time-dependent energy $E_t$.

The score is: $\\nabla_x \\log p_t(x) = -\\nabla_x E_t(x)$

**Like Boltzmann machine:**
- Distribution defined by energy function
- Learning involves modeling the energy landscape
- Sampling involves MCMC-like dynamics

**Differences:**
- Diffusion: continuous-time, continuous-state
- BM: discrete-time, often discrete-state
- Diffusion: learns score (gradient of energy)
- BM: learns energy directly

**Deep connection:**
Both are instances of learning energy-based models. Diffusion uses a clever multi-scale approach (varying noise levels) that makes training easier than direct EBM training.`,
  },
  {
    slug: "thermodynamic-ai-bound",
    title: "Thermodynamic Limits on AI",
    difficulty: "hard",
    type: "derivation",
    topics: ["thermodynamics", "AI", "fundamental limits"],
    moduleRef: "Connections to AI efficiency",
    statement: `Consider the fundamental thermodynamic limits on AI computation.

1. If an AI performs $N$ operations, what is the minimum energy by Landauer's principle?
2. What is the maximum computation achievable at power $P$ for time $t$?
3. What does this imply about the physical limits of superintelligent AI?`,
    solution: `**1. Minimum energy:**

**Landauer's principle:** Each irreversible bit operation dissipates at least $k_BT\\ln 2$.

For $N$ bit operations:
$$E_{min} = N \\cdot k_BT\\ln 2$$

At room temperature ($T = 300$K):
$$E_{min} = N \\times 2.87 \\times 10^{-21} \\text{ J}$$

**For 1 exaFLOP ($10^{18}$ FLOPs):**
Assuming ~100 bit ops per FLOP:
$$E_{min} \\approx 10^{20} \\times 3 \\times 10^{-21} \\text{ J} \\approx 0.3 \\text{ J}$$

Actual supercomputers use ~$10^7$ J for 1 exaFLOP, so we're $10^7\\times$ above Landauer.

**2. Maximum computation:**

**Energy budget:** $E = P \\cdot t$

**Operations:** $N = \\frac{E}{k_BT\\ln 2} = \\frac{Pt}{k_BT\\ln 2}$

**At room temperature:**
$$N_{max} = \\frac{P \\cdot t}{3 \\times 10^{-21}} \\text{ operations}$$

**Example: 1 MW for 1 year:**
$$N_{max} = \\frac{10^6 \\times 3.15 \\times 10^7}{3 \\times 10^{-21}} \\approx 10^{34} \\text{ operations}$$

This is about $10^{14}$ exaFLOPs—more than all human-made computation in history.

**Bremermann's limit (quantum):**
$$\\frac{dI}{dt} \\leq \\frac{2mc^2}{\\pi\\hbar} \\approx 2 \\times 10^{47} \\text{ bits/s/kg}$$

Even tighter constraint on computation rate per unit mass.

**3. Implications for superintelligence:**

**Computation is bounded by physics:**
- Finite energy → finite operations
- Finite matter → finite memory
- Speed of light → finite communication

**What this means:**
Even a superintelligent AI is subject to thermodynamic constraints:
- Cannot think infinitely fast
- Cannot store infinite information
- Cannot be infinitely efficient

**But the bounds are very loose:**
Current AI is $\\sim 10^7\\times$ above Landauer limit.
Potential improvement of $10^7$ in efficiency!

**Scenario:**
An AI optimized to Landauer limit could run $10^7$ times longer on same energy, or think $10^7$ times more per second.

This is a lot but still finite.

**Unknown:**
- How much computation is "enough" for various tasks?
- Is there an "intelligence per FLOP" limit?
- Can reversible computing push below Landauer?

**Philosophical:**
Physics doesn't prevent superintelligence, but it does prevent infinite intelligence. Any bounded system has bounded capabilities.

The race to superintelligence is ultimately a race to maximize useful computation per joule—a problem in thermodynamics as much as computer science.`,
  },
  {
    slug: "implement-gibbs-sampler",
    title: "Implementing Gibbs Sampling",
    difficulty: "interview",
    type: "coding",
    topics: ["Gibbs sampling", "implementation", "Ising model"],
    moduleRef: "Stochastic computing and sampling",
    statement: `Implement Gibbs sampling for the 2D Ising model:

$$E = -J\\sum_{\\langle i,j\\rangle}\\sigma_i\\sigma_j - h\\sum_i\\sigma_i$$

where the sum is over nearest-neighbor pairs on a square lattice.

Write code to:
1. Update a single spin given its neighbors.
2. Perform one sweep of Gibbs sampling.
3. Measure the magnetization.`,
    solution: `\`\`\`python
import numpy as np

class IsingModel:
    def __init__(self, L: int, J: float = 1.0, h: float = 0.0, T: float = 1.0):
        """
        2D Ising model on L x L square lattice.
        
        Args:
            L: Lattice size
            J: Coupling strength (J > 0 is ferromagnetic)
            h: External field
            T: Temperature (in units where k_B = 1)
        """
        self.L = L
        self.J = J
        self.h = h
        self.T = T
        self.beta = 1.0 / T
        
        self.spins = np.random.choice([-1, 1], size=(L, L))
    
    def get_neighbors(self, i: int, j: int) -> list:
        """Get indices of neighboring spins with periodic boundary."""
        L = self.L
        return [
            ((i + 1) % L, j),
            ((i - 1) % L, j),
            (i, (j + 1) % L),
            (i, (j - 1) % L)
        ]
    
    def local_field(self, i: int, j: int) -> float:
        """Compute effective field on spin (i, j)."""
        neighbor_sum = sum(
            self.spins[ni, nj] 
            for ni, nj in self.get_neighbors(i, j)
        )
        return self.J * neighbor_sum + self.h
    
    def update_spin(self, i: int, j: int):
        """
        Gibbs sampling update for single spin.
        P(σ = +1) = σ(2β * local_field)
        """
        field = self.local_field(i, j)
        
        prob_up = 1.0 / (1.0 + np.exp(-2 * self.beta * field))
        
        self.spins[i, j] = 1 if np.random.random() < prob_up else -1
    
    def sweep(self):
        """One sweep = update each spin once (random order)."""
        indices = [(i, j) for i in range(self.L) for j in range(self.L)]
        np.random.shuffle(indices)
        
        for i, j in indices:
            self.update_spin(i, j)
    
    def magnetization(self) -> float:
        """Average magnetization per spin."""
        return np.mean(self.spins)
    
    def energy(self) -> float:
        """Total energy of configuration."""
        E = 0.0
        for i in range(self.L):
            for j in range(self.L):
                E -= self.J * self.spins[i, j] * (
                    self.spins[(i + 1) % self.L, j] +
                    self.spins[i, (j + 1) % self.L]
                )
                E -= self.h * self.spins[i, j]
        return E


def run_simulation(L=20, T=2.0, n_equilibrate=1000, n_sample=5000):
    """Run Gibbs sampling and measure observables."""
    model = IsingModel(L=L, J=1.0, h=0.0, T=T)
    
    for _ in range(n_equilibrate):
        model.sweep()
    
    magnetizations = []
    energies = []
    
    for _ in range(n_sample):
        model.sweep()
        magnetizations.append(model.magnetization())
        energies.append(model.energy())
    
    m_avg = np.mean(np.abs(magnetizations))
    m_std = np.std(magnetizations)
    e_avg = np.mean(energies) / (L * L)
    
    print(f"T = {T:.2f}")
    print(f"  <|m|> = {m_avg:.3f} ± {m_std:.3f}")
    print(f"  <e> = {e_avg:.3f} per spin")
    
    return magnetizations, energies


if __name__ == "__main__":
    print("Below critical temperature (ordered):")
    run_simulation(L=20, T=1.5)
    
    print("\\nNear critical temperature:")
    run_simulation(L=20, T=2.27)
    
    print("\\nAbove critical temperature (disordered):")
    run_simulation(L=20, T=3.0)
\`\`\`

**Key implementation details:**

1. **Conditional probability:** $P(\\sigma_i = +1 | \\text{neighbors}) = \\sigma(2\\beta h_i)$ where $h_i$ is local field.

2. **Random order updates:** Shuffle indices to avoid systematic correlations.

3. **Periodic boundaries:** Spins on edge wrap around (toroidal topology).

4. **Equilibration:** Discard early samples before system reaches equilibrium.`,
  },
  {
    slug: "implement-rbm",
    title: "Implementing an RBM",
    difficulty: "hard",
    type: "coding",
    topics: ["RBM", "implementation", "CD"],
    moduleRef: "Ising models and Boltzmann machines",
    statement: `Implement a Restricted Boltzmann Machine with:
- Binary visible and hidden units
- Contrastive Divergence training (CD-1)
- Generation via Gibbs sampling

Include methods for training on data and generating new samples.`,
    solution: `\`\`\`python
import numpy as np

class RBM:
    def __init__(self, n_visible: int, n_hidden: int, learning_rate: float = 0.01):
        """
        Restricted Boltzmann Machine.
        
        Args:
            n_visible: Number of visible units
            n_hidden: Number of hidden units
            learning_rate: Learning rate for CD training
        """
        self.n_visible = n_visible
        self.n_hidden = n_hidden
        self.lr = learning_rate
        
        self.W = np.random.randn(n_visible, n_hidden) * 0.01
        self.b_visible = np.zeros(n_visible)
        self.b_hidden = np.zeros(n_hidden)
    
    def sigmoid(self, x: np.ndarray) -> np.ndarray:
        return 1.0 / (1.0 + np.exp(-np.clip(x, -500, 500)))
    
    def sample_hidden(self, v: np.ndarray) -> tuple:
        """
        Sample hidden units given visible.
        P(h_j = 1 | v) = σ(W_j^T v + c_j)
        """
        h_prob = self.sigmoid(v @ self.W + self.b_hidden)
        h_sample = (np.random.random(h_prob.shape) < h_prob).astype(float)
        return h_prob, h_sample
    
    def sample_visible(self, h: np.ndarray) -> tuple:
        """
        Sample visible units given hidden.
        P(v_i = 1 | h) = σ(W_i h + b_i)
        """
        v_prob = self.sigmoid(h @ self.W.T + self.b_visible)
        v_sample = (np.random.random(v_prob.shape) < v_prob).astype(float)
        return v_prob, v_sample
    
    def contrastive_divergence(self, v_data: np.ndarray, k: int = 1):
        """
        One step of CD-k training.
        
        Args:
            v_data: Batch of visible data [batch_size, n_visible]
            k: Number of Gibbs steps
        """
        batch_size = v_data.shape[0]
        
        h_prob_data, h_sample = self.sample_hidden(v_data)
        
        v_sample = v_data.copy()
        for _ in range(k):
            _, h_sample = self.sample_hidden(v_sample)
            v_prob_model, v_sample = self.sample_visible(h_sample)
        
        h_prob_model, _ = self.sample_hidden(v_sample)
        
        positive_grad = v_data.T @ h_prob_data / batch_size
        negative_grad = v_sample.T @ h_prob_model / batch_size
        
        self.W += self.lr * (positive_grad - negative_grad)
        self.b_visible += self.lr * np.mean(v_data - v_sample, axis=0)
        self.b_hidden += self.lr * np.mean(h_prob_data - h_prob_model, axis=0)
    
    def train(self, data: np.ndarray, epochs: int = 100, batch_size: int = 32, k: int = 1):
        """Train RBM on data using CD-k."""
        n_samples = data.shape[0]
        n_batches = n_samples // batch_size
        
        for epoch in range(epochs):
            indices = np.random.permutation(n_samples)
            
            total_error = 0.0
            for batch_idx in range(n_batches):
                batch = data[indices[batch_idx * batch_size:(batch_idx + 1) * batch_size]]
                self.contrastive_divergence(batch, k=k)
                
                _, h = self.sample_hidden(batch)
                v_recon, _ = self.sample_visible(h)
                total_error += np.mean((batch - v_recon) ** 2)
            
            if (epoch + 1) % 10 == 0:
                print(f"Epoch {epoch + 1}, Recon Error: {total_error / n_batches:.4f}")
    
    def generate(self, n_samples: int = 1, n_gibbs: int = 1000) -> np.ndarray:
        """Generate samples via Gibbs sampling."""
        v = np.random.binomial(1, 0.5, size=(n_samples, self.n_visible)).astype(float)
        
        for _ in range(n_gibbs):
            _, h = self.sample_hidden(v)
            _, v = self.sample_visible(h)
        
        return v
    
    def free_energy(self, v: np.ndarray) -> np.ndarray:
        """Compute free energy F(v) = -b^T v - Σ_j log(1 + exp(W_j^T v + c_j))"""
        wx_b = v @ self.W + self.b_hidden
        return -v @ self.b_visible - np.sum(np.log(1 + np.exp(wx_b)), axis=1)


if __name__ == "__main__":
    np.random.seed(42)
    
    n_patterns = 500
    n_visible = 16
    patterns = np.array([
        [1,1,1,1, 0,0,0,0, 0,0,0,0, 0,0,0,0],
        [0,0,0,0, 1,1,1,1, 0,0,0,0, 0,0,0,0],
        [0,0,0,0, 0,0,0,0, 1,1,1,1, 0,0,0,0],
        [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,1,1,1],
    ], dtype=float)
    
    data = patterns[np.random.choice(len(patterns), n_patterns)]
    noise = (np.random.random(data.shape) < 0.1).astype(float)
    data = np.abs(data - noise)
    
    rbm = RBM(n_visible=n_visible, n_hidden=8, learning_rate=0.1)
    rbm.train(data, epochs=50, batch_size=32, k=1)
    
    samples = rbm.generate(n_samples=4, n_gibbs=100)
    print("\\nGenerated samples:")
    print(samples.reshape(4, 4, 4).astype(int))
\`\`\`

**Key implementation notes:**

1. **CD-k:** Use $k$ Gibbs steps (CD-1 is most common, uses $k=1$).

2. **Use probabilities for positive phase:** $h_{\\text{prob}}$ not samples, reduces variance.

3. **Free energy:** Useful for model comparison and anomaly detection.`,
  },
  {
    slug: "implement-langevin",
    title: "Langevin Dynamics Sampling",
    difficulty: "interview",
    type: "coding",
    topics: ["Langevin dynamics", "sampling", "gradient"],
    moduleRef: "Stochastic computing and sampling",
    statement: `Implement Langevin dynamics for sampling from an energy-based model.

The update rule is:
$$x_{t+1} = x_t - \\frac{\\epsilon}{2}\\nabla_x E(x_t) + \\sqrt{\\epsilon}\\eta_t$$

where $\\eta_t \\sim \\mathcal{N}(0, I)$.

Implement sampling from a Gaussian mixture model using Langevin dynamics.`,
    solution: `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def gaussian_mixture_energy(x: np.ndarray, 
                           means: np.ndarray, 
                           stds: np.ndarray,
                           weights: np.ndarray) -> np.ndarray:
    """
    Energy for Gaussian mixture model.
    E(x) = -log(Σ_k w_k * N(x; μ_k, σ_k))
    """
    log_probs = []
    for mu, sigma, w in zip(means, stds, weights):
        log_p = -0.5 * np.sum((x - mu)**2 / sigma**2, axis=-1)
        log_p -= 0.5 * x.shape[-1] * np.log(2 * np.pi * sigma**2)
        log_p += np.log(w)
        log_probs.append(log_p)
    
    log_probs = np.stack(log_probs, axis=0)
    max_log = np.max(log_probs, axis=0, keepdims=True)
    return -(max_log.squeeze() + np.log(np.sum(np.exp(log_probs - max_log), axis=0)))


def gaussian_mixture_gradient(x: np.ndarray,
                             means: np.ndarray,
                             stds: np.ndarray,
                             weights: np.ndarray) -> np.ndarray:
    """
    Gradient of energy: ∇E(x) = -∇log p(x)
    """
    probs = []
    grads = []
    
    for mu, sigma, w in zip(means, stds, weights):
        diff = x - mu
        log_p = -0.5 * np.sum(diff**2 / sigma**2, axis=-1)
        p = w * np.exp(log_p)
        
        grad = diff / sigma**2
        
        probs.append(p)
        grads.append(grad)
    
    probs = np.stack(probs, axis=0)
    grads = np.stack(grads, axis=0)
    
    total_prob = np.sum(probs, axis=0, keepdims=True) + 1e-10
    weights = probs / total_prob
    
    weighted_grad = np.sum(weights[..., None] * grads, axis=0)
    return weighted_grad


def langevin_dynamics(x_init: np.ndarray,
                     energy_fn,
                     grad_fn,
                     epsilon: float = 0.01,
                     n_steps: int = 1000,
                     n_burn: int = 100) -> np.ndarray:
    """
    Sample using Langevin dynamics.
    
    Args:
        x_init: Initial position [n_samples, dim]
        energy_fn: Energy function
        grad_fn: Gradient of energy
        epsilon: Step size
        n_steps: Total steps
        n_burn: Burn-in steps to discard
    
    Returns:
        samples: Array of samples after burn-in
    """
    x = x_init.copy()
    samples = []
    
    for step in range(n_steps):
        noise = np.random.randn(*x.shape)
        
        grad = grad_fn(x)
        
        x = x - (epsilon / 2) * grad + np.sqrt(epsilon) * noise
        
        if step >= n_burn:
            samples.append(x.copy())
    
    return np.array(samples)


if __name__ == "__main__":
    means = np.array([[-2, 0], [2, 0], [0, 2]])
    stds = np.array([0.5, 0.5, 0.5])
    weights = np.array([0.33, 0.33, 0.34])
    
    n_chains = 100
    dim = 2
    x_init = np.random.randn(n_chains, dim) * 3
    
    energy_fn = lambda x: gaussian_mixture_energy(x, means, stds, weights)
    grad_fn = lambda x: gaussian_mixture_gradient(x, means, stds, weights)
    
    samples = langevin_dynamics(
        x_init,
        energy_fn,
        grad_fn,
        epsilon=0.1,
        n_steps=2000,
        n_burn=500
    )
    
    all_samples = samples.reshape(-1, dim)
    
    print(f"Number of samples: {len(all_samples)}")
    print(f"Sample mean: {all_samples.mean(axis=0)}")
    print(f"Sample std: {all_samples.std(axis=0)}")
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
    
    ax1.scatter(all_samples[::10, 0], all_samples[::10, 1], alpha=0.3, s=1)
    ax1.scatter(means[:, 0], means[:, 1], c='red', s=100, marker='x', label='True means')
    ax1.set_xlabel('x')
    ax1.set_ylabel('y')
    ax1.set_title('Langevin Samples')
    ax1.legend()
    
    xx, yy = np.meshgrid(np.linspace(-5, 5, 100), np.linspace(-3, 5, 100))
    grid = np.stack([xx.ravel(), yy.ravel()], axis=-1)
    energy = energy_fn(grid).reshape(xx.shape)
    
    ax2.contour(xx, yy, np.exp(-energy), levels=20)
    ax2.scatter(means[:, 0], means[:, 1], c='red', s=100, marker='x')
    ax2.set_xlabel('x')
    ax2.set_ylabel('y')
    ax2.set_title('True Distribution')
    
    plt.tight_layout()
    plt.savefig('langevin_samples.png', dpi=150)
    print("Saved figure to langevin_samples.png")
\`\`\`

**Key points:**

1. **Step size $\\epsilon$:** Too large → unstable, too small → slow mixing.

2. **Gradient is the score:** $\\nabla_x E(x) = -\\nabla_x \\log p(x) = -s(x)$

3. **Burn-in:** Initial samples are biased; discard them.

4. **Connection to diffusion:** Langevin is the continuous-time limit of SGLD (stochastic gradient Langevin dynamics).`,
  },
  {
    slug: "analog-matmul",
    title: "Analog Matrix Multiplication",
    difficulty: "hard",
    type: "conceptual",
    topics: ["analog computing", "crossbar", "efficiency"],
    moduleRef: "Sampling hardware",
    statement: `Analog crossbar arrays can perform matrix-vector multiplication in $O(1)$ time.

1. How does a resistive crossbar compute $y = Wx$?
2. What are the sources of error in analog computation?
3. Compare the energy efficiency to digital matrix multiplication.`,
    solution: `**1. Crossbar operation:**

**Structure:**
- 2D array of resistive elements (memristors)
- Rows = inputs, columns = outputs
- Resistance $G_{ij}$ encodes weight $W_{ij}$

**Operation (Ohm's law + Kirchhoff):**
Apply voltage $V_i = x_i$ to row $i$.

Current through element $(i,j)$: $I_{ij} = G_{ij} \\cdot V_i$

Total current in column $j$:
$$I_j = \\sum_i G_{ij} V_i = \\sum_i W_{ij} x_i = (Wx)_j$$

**Result:** $y = Wx$ computed in one analog "operation."

**Time complexity:**
- Digital: $O(nm)$ multiply-accumulates for $n \\times m$ matrix
- Analog crossbar: $O(1)$ (parallel current summation)

**2. Sources of error:**

**Device variation:**
- Memristor resistance varies from target $W_{ij}$
- Manufacturing defects
- Stochastic switching (write noise)

**Read noise:**
- Thermal noise in resistors
- Sense amplifier noise
- Quantization in ADC (analog-to-digital conversion)

**Write noise:**
- Programming memristors is imprecise
- Drift over time (resistance changes)

**Nonlinearity:**
- Devices aren't perfectly linear
- Sneak paths in crossbar (current leakage through unintended paths)

**IR drop:**
- Wire resistance causes voltage drop along rows/columns
- Larger arrays → more error

**Typical accuracy:**
- 4-8 bit effective precision common
- Matching FP32 digital accuracy is challenging

**3. Energy efficiency comparison:**

**Digital MAC (multiply-accumulate):**
- Modern GPU: ~1 pJ per 8-bit MAC
- CPU: ~10 pJ per MAC
- Specialized accelerator: ~0.1 pJ per MAC

**Analog crossbar:**
- Energy = power × time
- Mostly capacitive charging: $E \\sim CV^2$
- Estimates: 0.01-0.1 pJ per effective MAC
- 10-100× better than digital (in theory)

**But consider overheads:**
- ADC/DAC conversion: often dominates energy
- Peripheral circuits
- Retraining/calibration for drift

**Net efficiency:**
- Best reported: 10-100 TOPS/W (tera-ops per watt)
- Digital GPUs: 1-10 TOPS/W
- Potential 10× advantage for inference

**Use cases:**
- Inference (not training): weights fixed
- Low-precision tasks: 4-8 bit sufficient
- Edge devices: power-constrained

**Challenges for adoption:**
- Integration with digital systems
- Programming/updating weights
- Variability management
- Design tools and ecosystem

**Current state:**
Research demos show promise, but commercial deployment is limited. Hybrid analog-digital approaches may be most practical.`,
  },
  {
    slug: "neuromorphic-computing",
    title: "Neuromorphic vs Thermodynamic Computing",
    difficulty: "hard",
    type: "conceptual",
    topics: ["neuromorphic", "thermodynamic", "comparison"],
    moduleRef: "Connections to AI efficiency",
    statement: `Neuromorphic computing mimics biological neural networks, while thermodynamic computing uses physical dynamics for computation.

1. What are the key principles of each approach?
2. Where do they overlap and differ?
3. What problems is each best suited for?`,
    solution: `**1. Key principles:**

**Neuromorphic computing:**
- **Inspiration:** Biological brains
- **Core idea:** Spike-based, event-driven computation
- **Key features:**
  - Spiking neurons (communicate via discrete spikes)
  - Sparse, local connectivity
  - Temporal dynamics (timing carries information)
  - Co-located memory and compute
  - Low power per neuron

**Thermodynamic computing:**
- **Inspiration:** Statistical physics
- **Core idea:** Use noise/thermal fluctuations for computation
- **Key features:**
  - Probabilistic states (not deterministic)
  - Energy landscape defines computation
  - Sampling as primitive operation
  - Exploits equilibrium distributions
  - Minimum energy operation

**2. Overlaps and differences:**

**Overlaps:**
- Both are non-von Neumann architectures
- Both aim for energy efficiency
- Both can implement neural network-like computations
- Both use analog or mixed-signal processing
- Both challenge the digital computing paradigm

| Aspect | Neuromorphic | Thermodynamic |
|--------|--------------|---------------|
| **Information** | Spikes (discrete events) | Probabilities (continuous) |
| **Computation** | Integrate-and-fire | Relaxation to equilibrium |
| **Noise** | Tolerated/exploited | Essential resource |
| **Energy source** | External power | Thermal bath |
| **Timing** | Asynchronous, event-driven | Continuous dynamics |
| **Learning** | STDP, local rules | Contrastive learning |

**Differences:**
- Neuromorphic: deterministic (mostly), inspired by neurons
- Thermodynamic: fundamentally stochastic, inspired by physics

**3. Best-suited problems:**

**Neuromorphic:**
- **Sensory processing:** Visual, auditory (event cameras)
- **Real-time control:** Robotics, drones
- **Pattern recognition:** Classification, detection
- **Low-latency inference:** Edge AI
- **Always-on monitoring:** Anomaly detection

*Why:* Event-driven → low power when input is sparse, fast response.

**Thermodynamic:**
- **Optimization:** Combinatorial problems (TSP, scheduling)
- **Sampling:** MCMC, Bayesian inference
- **Probabilistic models:** Boltzmann machines, EBMs
- **Machine learning training:** Where sampling is core
- **Uncertainty quantification:** Naturally probabilistic output

*Why:* Physical sampling → efficient for stochastic algorithms.

**Hybrid opportunities:**
- Neuromorphic front-end (sensing) + thermodynamic back-end (inference)
- Spiking Boltzmann machines (combine both)
- Stochastic neurons in spiking networks

**Current state:**
- Neuromorphic: More mature (Intel Loihi, IBM TrueNorth, BrainChip)
- Thermodynamic: Earlier stage (academic prototypes, D-Wave adjacent)

Both represent departures from conventional computing toward physics-inspired paradigms. The future may blend ideas from each.`,
  },
  {
    slug: "efficiency-frontier",
    title: "The Energy-Performance Frontier",
    difficulty: "hard",
    type: "conceptual",
    topics: ["efficiency", "scaling", "trade-offs"],
    moduleRef: "Connections to AI efficiency",
    statement: `There are fundamental trade-offs between computational power, energy, and accuracy.

1. What is Dennard scaling and why did it end?
2. What is the relationship between energy and accuracy in computation?
3. How might thermodynamic computing push the efficiency frontier?`,
    solution: `**1. Dennard scaling:**

**The rule (1974-2006):**
As transistors shrink by factor $k$:
- Voltage scales as $1/k$
- Current scales as $1/k$
- Capacitance scales as $1/k$
- Frequency scales as $k$
- Power density stays constant: $P \\propto CV^2f \\propto k^{-1} \\cdot k^{-2} \\cdot k = k^{-2}$

**Why it ended (~2006):**
- **Leakage current:** Thin gate oxides → quantum tunneling
- **Threshold voltage floor:** Can't reduce $V_{th}$ below noise
- **Heat density:** Already at cooling limits
- **Reliability:** Smaller transistors more variable

**Post-Dennard era:**
- Frequency plateaued at ~3-4 GHz
- Multi-core (parallelize instead of speedup)
- Specialized accelerators (GPUs, TPUs)
- Architecture innovation over process scaling

**2. Energy-accuracy trade-off:**

**Sources of error:**
- **Quantization:** Fewer bits → less energy but more error
- **Approximate computing:** Skip some operations, tolerate mistakes
- **Voltage scaling:** Lower $V$ → less energy but more bit flips
- **Analog:** Continuous signals → no perfect precision

**Relationship:**
Roughly: $E \\propto b^2$ where $b$ is bits of precision.

For neural networks:
- FP32: Full precision, highest energy
- INT8: 4× less energy, minor accuracy loss
- INT4: 16× less, moderate loss
- Binary: 64× less, significant loss

**Energy-delay product:**
$$EDP = E \\times t = P \\times t^2$$

Optimal operation minimizes EDP, not just E or t alone.

**3. Thermodynamic computing advantages:**

**Natural probabilistic computation:**
- Sampling costs $\\sim k_BT \\ln 2$ per bit (thermal)
- vs. digital: 1000× more for algorithmic sampling
- For ML: much of "computation" is sampling

**Minimum energy operation:**
- Operate near Landauer limit
- Reversible operations avoid heat dissipation
- Noise is feature, not bug

**Potential gains:**
| Task | Digital | Thermodynamic (potential) |
|------|---------|---------------------------|
| Random number | 100 pJ/bit | 0.01 pJ/bit |
| Sampling | 1000s ops | 1 relaxation |
| Optimization | Heuristic | Natural annealing |

**Pushing the frontier:**
- Digital hit a wall (Dennard end, memory wall)
- Thermodynamic: different scaling relationships
- Trade determinism for efficiency
- Match algorithm to physics

**Challenges:**
- Control and programming
- Interface with digital systems
- Reliability and reproducibility
- Error analysis and bounds

**Vision:**
Thermodynamic accelerators handle probabilistic/sampling workloads at 100-1000× better efficiency, while digital handles deterministic logic. Hybrid systems optimize the efficiency frontier.`,
  },
  {
    slug: "entropy-production-bound",
    title: "Entropy Production Bounds",
    difficulty: "warm-up",
    type: "derivation",
    topics: ["entropy production", "second law", "irreversibility"],
    moduleRef: "Thermodynamic foundations",
    statement: `Entropy production quantifies irreversibility in a process.

1. Define entropy production for a system coupled to a heat bath at temperature $T$.
2. For a process that dissipates 100 pJ at $T = 300$ K, what is the minimum entropy production?
3. Why is entropy production always non-negative?`,
    solution: `**1. Entropy production definition:**

For a system coupled to a heat bath at temperature $T$:

$$\\Delta S_{\\text{tot}} = \\Delta S_{\\text{sys}} + \\Delta S_{\\text{bath}}$$

The bath entropy change is:
$$\\Delta S_{\\text{bath}} = \\frac{Q_{\\text{to bath}}}{T} = -\\frac{Q_{\\text{absorbed}}}{T}$$

**Entropy production:**
$$\\sigma = \\Delta S_{\\text{tot}} = \\Delta S_{\\text{sys}} - \\frac{Q}{T} \\geq 0$$

For a cyclic process (system returns to initial state, $\\Delta S_{\\text{sys}} = 0$):
$$\\sigma = -\\frac{Q}{T} = \\frac{W_{\\text{diss}}}{T}$$

**2. Numerical calculation:**

Dissipated energy: $W_{\\text{diss}} = 100$ pJ $= 10^{-10}$ J
Temperature: $T = 300$ K

$$\\sigma = \\frac{W_{\\text{diss}}}{T} = \\frac{10^{-10}}{300} \\approx 3.33 \\times 10^{-13} \\text{ J/K}$$

In units of $k_B$:
$$\\sigma = \\frac{10^{-10}}{1.38 \\times 10^{-23} \\times 300} \\approx 24,000 \\ k_B$$

That's a lot of entropy! Modern computing is very far from reversible.

**3. Non-negativity (Second Law):**

**Statistical mechanics perspective:**
- Forward process: probability $P_F$ of trajectory
- Reverse process: probability $P_R$ of time-reversed trajectory
- Detailed fluctuation theorem: $\\langle e^{-\\sigma}\\rangle = 1$

By Jensen's inequality: $\\langle \\sigma \\rangle \\geq 0$.

**Information perspective:**
- Entropy production = information lost about which microstate
- Can't gain information about past without expending resources
- Forgetting is irreversible

**Physical perspective:**
- Heat flows from hot to cold
- Systems equilibrate
- These are entropy-increasing processes`,
  },
  {
    slug: "boltzmann-machine-energy",
    title: "Boltzmann Machine Energy Functions",
    difficulty: "warm-up",
    type: "derivation",
    topics: ["Boltzmann machine", "energy function", "probability"],
    moduleRef: "Thermodynamic computing models",
    statement: `A Boltzmann machine has binary units $s_i \\in \\{0, 1\\}$ with energy:

$$E(s) = -\\sum_{i<j} w_{ij} s_i s_j - \\sum_i b_i s_i$$

1. Write the probability distribution over states.
2. For a 2-unit system with $w_{12} = 2$, $b_1 = -1$, $b_2 = 0.5$, compute all state energies at $T = 1$.
3. Which state is most probable?`,
    solution: `**1. Boltzmann distribution:**

$$P(s) = \\frac{e^{-E(s)/T}}{Z}$$

where the partition function is:
$$Z = \\sum_{s'} e^{-E(s')/T}$$

At $T = 1$ (units where $k_B T = 1$):
$$P(s) = \\frac{e^{-E(s)}}{Z}$$

**2. State energies:**

For 2 units, states are: $(s_1, s_2) \\in \\{(0,0), (0,1), (1,0), (1,1)\\}$

$E(s) = -w_{12} s_1 s_2 - b_1 s_1 - b_2 s_2$

**State (0,0):**
$$E(0,0) = -2(0)(0) - (-1)(0) - (0.5)(0) = 0$$

**State (0,1):**
$$E(0,1) = -2(0)(1) - (-1)(0) - (0.5)(1) = -0.5$$

**State (1,0):**
$$E(1,0) = -2(1)(0) - (-1)(1) - (0.5)(0) = 1$$

**State (1,1):**
$$E(1,1) = -2(1)(1) - (-1)(1) - (0.5)(1) = -2 + 1 - 0.5 = -1.5$$

**3. Probabilities:**

$$Z = e^{0} + e^{0.5} + e^{-1} + e^{1.5} = 1 + 1.65 + 0.37 + 4.48 = 7.5$$

$$P(0,0) = 1/7.5 = 0.133$$
$$P(0,1) = 1.65/7.5 = 0.220$$
$$P(1,0) = 0.37/7.5 = 0.049$$
$$P(1,1) = 4.48/7.5 = 0.597$$

**Most probable:** State $(1,1)$ with probability 59.7%.

This makes sense: the strong positive coupling ($w_{12} = 2$) favors both units being on, and $b_2 > 0$ also favors $s_2 = 1$.`,
  },
  {
    slug: "fokker-planck",
    title: "Fokker-Planck Equation for Probability Evolution",
    difficulty: "interview",
    type: "derivation",
    topics: ["Fokker-Planck", "diffusion", "probability"],
    moduleRef: "Thermodynamic foundations",
    statement: `The Fokker-Planck equation describes probability density evolution for a particle in a potential.

1. Write the Fokker-Planck equation for overdamped motion in potential $U(x)$.
2. What is the stationary solution?
3. What is the relaxation time scale to equilibrium?`,
    solution: `**1. Fokker-Planck equation:**

For overdamped Langevin dynamics:
$$\\gamma \\dot{x} = -U'(x) + \\sqrt{2\\gamma k_B T}\\, \\xi(t)$$

where $\\gamma$ is friction, $\\xi(t)$ is white noise.

The probability density $P(x,t)$ evolves according to:

$$\\frac{\\partial P}{\\partial t} = \\frac{1}{\\gamma}\\frac{\\partial}{\\partial x}\\left[U'(x) P + k_B T \\frac{\\partial P}{\\partial x}\\right]$$

**Standard form:**
$$\\frac{\\partial P}{\\partial t} = -\\frac{\\partial J}{\\partial x}$$

where probability current:
$$J = -\\frac{1}{\\gamma}\\left[U'(x) P + k_B T \\frac{\\partial P}{\\partial x}\\right]$$

**2. Stationary solution:**

At equilibrium, $\\partial P/\\partial t = 0$ and $J = 0$:

$$U'(x) P_{\\text{eq}} + k_B T \\frac{\\partial P_{\\text{eq}}}{\\partial x} = 0$$

Solving:
$$\\frac{\\partial \\ln P_{\\text{eq}}}{\\partial x} = -\\frac{U'(x)}{k_B T}$$

$$P_{\\text{eq}}(x) = \\frac{1}{Z} e^{-U(x)/k_B T}$$

This is the **Boltzmann distribution** — confirming consistency.

**3. Relaxation time scale:**

For a harmonic potential $U(x) = \\frac{1}{2}\\kappa x^2$:

The Fokker-Planck becomes:
$$\\frac{\\partial P}{\\partial t} = \\frac{\\kappa}{\\gamma}\\frac{\\partial (xP)}{\\partial x} + \\frac{k_B T}{\\gamma}\\frac{\\partial^2 P}{\\partial x^2}$$

**Relaxation time:**
$$\\tau = \\frac{\\gamma}{\\kappa}$$

For general potentials near a minimum, $\\kappa = U''(x_0)$:
$$\\tau \\sim \\frac{\\gamma}{U''(x_0)}$$

**Physical interpretation:**
- Higher friction → slower relaxation
- Steeper potential → faster relaxation
- Temperature only affects equilibrium distribution, not relaxation rate (in overdamped limit)`,
  },
  {
    slug: "kramers-rate",
    title: "Kramers Escape Rate",
    difficulty: "interview",
    type: "derivation",
    topics: ["Kramers rate", "barrier crossing", "metastability"],
    moduleRef: "Thermodynamic computing models",
    statement: `Kramers theory describes thermal escape over energy barriers.

1. State the Kramers escape rate formula.
2. For a barrier height of $10 k_B T$, estimate the escape rate relative to the attempt frequency.
3. How is Kramers rate used in thermodynamic computing?`,
    solution: `**1. Kramers escape rate:**

For escape from a metastable well over a barrier:

$$r = \\frac{\\omega_0 \\omega_b}{2\\pi\\gamma} e^{-\\Delta U/k_B T}$$

**High friction limit:**
$$r = \\frac{\\omega_0^2}{2\\pi\\gamma/m} e^{-\\Delta U/k_B T}$$

**Where:**
- $\\omega_0 = \\sqrt{U''(x_0)/m}$: frequency at well bottom
- $\\omega_b = \\sqrt{|U''(x_b)|/m}$: curvature at barrier top
- $\\Delta U$: barrier height
- $\\gamma$: friction coefficient

**Simple form (attempt frequency × Arrhenius):**
$$r \\approx f_0 \\cdot e^{-\\Delta U/k_B T}$$

where $f_0 \\sim \\omega_0/(2\\pi)$ is the attempt frequency.

**2. Numerical estimate:**

For $\\Delta U = 10 k_B T$:

$$\\frac{r}{f_0} = e^{-10} \\approx 4.5 \\times 10^{-5}$$

**Interpretation:**
- Particle "attempts" escape $f_0$ times per second
- Each attempt succeeds with probability $\\sim e^{-10}$
- Average escape time: $\\tau_{\\text{escape}} \\sim 22,000 / f_0$

If $f_0 \\sim 10^{12}$ Hz (typical molecular vibration):
$$\\tau_{\\text{escape}} \\sim 22 \\text{ ns}$$

**3. Use in thermodynamic computing:**

**Bit flip rates:**
- Memory states separated by barrier
- Kramers rate gives spontaneous flip probability
- Design barriers for desired error rates

**Sampling dynamics:**
- Barrier heights control transition rates between states
- Engineering barriers shapes the sampling distribution
- Low barriers → fast mixing, high barriers → metastability

**Optimization (simulated annealing):**
- High $T$: easy barrier crossing, explore broadly
- Low $T$: suppressed crossing, refine solution
- Kramers rate quantifies this transition

**Energy-time trade-offs:**
- Higher barriers → more reliable but slower
- Lower barriers → faster but noisier
- Kramers rate makes this quantitative`,
  },
  {
    slug: "stochastic-resonance",
    title: "Stochastic Resonance",
    difficulty: "interview",
    type: "conceptual",
    topics: ["stochastic resonance", "noise", "signal detection"],
    moduleRef: "Noise and fluctuations",
    statement: `Stochastic resonance is the phenomenon where noise can improve signal detection.

1. Describe the mechanism of stochastic resonance in a bistable system.
2. Under what conditions does adding noise improve performance?
3. How might stochastic resonance be exploited in thermodynamic computing?`,
    solution: `**1. Mechanism in bistable system:**

**Setup:**
- Double-well potential with barrier $\\Delta U$
- Weak periodic signal: $A \\sin(\\omega t)$ modulates potential
- Signal alone too weak to cause transitions

**Without noise:**
- System stays in one well
- Signal cannot be detected

**With noise:**
- Thermal fluctuations enable barrier crossing
- Signal modulates which direction is favored
- Transitions become synchronized with signal

**Optimal noise:**
- Too little noise: Rare transitions, poor synchronization
- Too much noise: Random transitions, signal washed out
- Optimal: Kramers rate $\\sim$ signal frequency

**Signal-to-noise ratio** peaks at intermediate noise level!

**2. Conditions for improvement:**

**Threshold nonlinearity:**
- System must have threshold or barrier
- Signal subthreshold on its own
- Noise provides activation energy

**Matching time scales:**
$$\\tau_{\\text{Kramers}} \\sim \\frac{1}{\\omega}$$

Noise-induced hopping rate should match signal period.

**Weak signal regime:**
- Signal strong enough: Don't need noise
- Signal absent: Noise just adds noise
- Weak signal: Noise can amplify it

**Cooperative effect:**
- Noise and signal combine nonlinearly
- Neither alone produces output
- Together, produce detectable response

**3. Applications in thermodynamic computing:**

**Low-power sensing:**
- Use thermal noise as free resource
- Detect signals below deterministic threshold
- Biological neurons may use this

**Sampling enhancement:**
- Noise helps escape local minima
- Stochastic resonance could enhance transitions
- Tune noise to match target distribution

**Analog signal processing:**
- Encode information in switching times
- Noise enables operation at lower power
- Match noise level to signal bandwidth

**Limitations:**
- Only works for specific signal types
- Requires careful tuning
- Not universal amplifier (frequency-dependent)`,
  },
  {
    slug: "jarzynski-derivation",
    title: "Jarzynski Equality: Derivation and Application",
    difficulty: "interview",
    type: "derivation",
    topics: ["Jarzynski equality", "free energy", "work"],
    moduleRef: "Nonequilibrium thermodynamics",
    statement: `The Jarzynski equality relates nonequilibrium work to equilibrium free energy differences.

1. State the Jarzynski equality.
2. Sketch a derivation using path integral methods.
3. How can Jarzynski equality be used experimentally to measure free energies?`,
    solution: `**1. Jarzynski equality:**

$$\\langle e^{-W/k_B T}\\rangle = e^{-\\Delta F/k_B T}$$

**Where:**
- $W$: Work done on the system in a nonequilibrium process
- $\\Delta F = F_B - F_A$: Free energy difference between final and initial equilibrium states
- Average $\\langle \\cdot \\rangle$ is over many realizations of the protocol

**Remarkable feature:** Connects nonequilibrium measurements to equilibrium quantity.

**2. Derivation sketch:**

**Setup:**
- System starts in equilibrium with $H_A$ at temperature $T$
- Protocol changes Hamiltonian from $H_A$ to $H_B$
- System may not equilibrate during process

**Path integral formulation:**

Initial distribution: $P_A(x_0) = \\frac{e^{-H_A(x_0)/k_B T}}{Z_A}$

For trajectory $\\Gamma = \\{x(t)\\}$:
$$W[\\Gamma] = \\int_0^\\tau dt\\, \\frac{\\partial H(x(t), \\lambda(t))}{\\partial \\lambda}\\dot{\\lambda}$$

**Key identity:**
$$\\langle e^{-W/k_B T}\\rangle = \\int dx_0\\, P_A(x_0) \\int \\mathcal{D}\\Gamma\\, P[\\Gamma|x_0]\\, e^{-W[\\Gamma]/k_B T}$$

Using stochastic trajectory measure and energy conservation:
$$\\langle e^{-W/k_B T}\\rangle = \\frac{1}{Z_A}\\int dx_0\\, e^{-H_A(x_0)/k_B T} \\cdot \\int dx_\\tau\\, \\delta(x_\\tau - x_\\tau[\\Gamma])\\, e^{(H_A(x_0) - H_B(x_\\tau))/k_B T}$$

After careful analysis (using $W = H_B(x_\\tau) - H_A(x_0) + Q$):
$$= \\frac{Z_B}{Z_A} = e^{-\\Delta F/k_B T}$$ ✓

**3. Experimental application:**

**Protocol:**
1. Prepare system in equilibrium with $H_A$
2. Apply nonequilibrium process (can be fast!)
3. Measure work $W$ done
4. Repeat many times
5. Compute $\\langle e^{-W/k_B T}\\rangle$
6. Extract $\\Delta F = -k_B T \\ln\\langle e^{-W/k_B T}\\rangle$

**Advantages:**
- Don't need quasi-static (slow) process
- Works arbitrarily far from equilibrium
- Gives exact $\\Delta F$, not just bound

**Challenges:**
- Exponential average dominated by rare events
- Need many samples for convergence
- Numerical precision issues

**Example: RNA unfolding**
- Pull RNA with optical tweezers
- Measure work done in many pulls
- Compute free energy of folding
- Compare with equilibrium measurements`,
  },
  {
    slug: "crooks-fluctuation-theorem",
    title: "Crooks Fluctuation Theorem",
    difficulty: "hard",
    type: "derivation",
    topics: ["Crooks theorem", "fluctuation theorem", "time reversal"],
    moduleRef: "Nonequilibrium thermodynamics",
    statement: `The Crooks fluctuation theorem relates forward and reverse process statistics.

1. State the Crooks fluctuation theorem.
2. Show how Jarzynski equality follows from Crooks theorem.
3. What experimental signatures can verify Crooks theorem?`,
    solution: `**1. Crooks fluctuation theorem:**

$$\\frac{P_F(W)}{P_R(-W)} = e^{(W - \\Delta F)/k_B T}$$

**Where:**
- $P_F(W)$: Probability of work $W$ in forward process (A → B)
- $P_R(-W)$: Probability of work $-W$ in reverse process (B → A)
- $\\Delta F$: Free energy difference $F_B - F_A$

**Interpretation:**
- When $W > \\Delta F$: $P_F(W) > P_R(-W)$ — forward more likely
- When $W < \\Delta F$: $P_F(W) < P_R(-W)$ — reverse more likely
- At $W = \\Delta F$: Equal probabilities (special point)

**2. Deriving Jarzynski from Crooks:**

Multiply both sides by $P_R(-W)$ and integrate:

$$\\int dW\\, P_F(W)\\, e^{-(W - \\Delta F)/k_B T} = \\int dW\\, P_R(-W)$$

Left side:
$$e^{\\Delta F/k_B T} \\int dW\\, P_F(W)\\, e^{-W/k_B T} = e^{\\Delta F/k_B T}\\langle e^{-W/k_B T}\\rangle_F$$

Right side:
$$\\int dW\\, P_R(-W) = 1$$ (normalization)

**Therefore:**
$$\\langle e^{-W/k_B T}\\rangle_F = e^{-\\Delta F/k_B T}$$

This is the Jarzynski equality! ✓

**3. Experimental verification:**

**Crossing point:**
Plot $P_F(W)$ and $P_R(-W)$ on same axes.
They should cross at $W = \\Delta F$.

This provides a direct measurement of $\\Delta F$.

**Ratio test:**
Measure the ratio $P_F(W)/P_R(-W)$ as function of $W$.
Should be linear on a log scale with slope $1/k_B T$.
Intercept gives $-\\Delta F/k_B T$.

**Symmetry relation:**
Define $\\Sigma(W) = \\ln[P_F(W)/P_R(-W)]$.
Crooks predicts: $\\Sigma(W) = (W - \\Delta F)/k_B T$.

**Experimental systems:**
- RNA/DNA pulling (optical tweezers)
- Colloidal particles (optical traps)
- Molecular motors
- Electronic systems

**Verification quality:**
- Must have good statistics at both tails
- Need to measure reverse process
- Confirms microscopic reversibility + thermodynamics`,
  },
  {
    slug: "information-engine",
    title: "Information Engine Design",
    difficulty: "hard",
    type: "system-design",
    topics: ["information engine", "feedback control", "Maxwell demon"],
    moduleRef: "Thermodynamic computing models",
    statement: `An information engine converts information into work.

1. Describe the Szilard engine and its thermodynamic cycle.
2. How much work can be extracted per bit of information?
3. Design an information engine that uses memory readout to perform work.`,
    solution: `**1. Szilard engine:**

**Setup:**
- One-molecule gas in a box at temperature $T$
- Piston can be inserted in the middle

**Cycle:**

**Step 1: Measurement**
- Insert partition
- Measure which side molecule is on (1 bit)

**Step 2: Work extraction**
- Insert piston against opposite wall
- Let molecule push piston back (isothermal expansion)
- Extract work: $W = k_B T \\ln 2$

**Step 3: Reset**
- Remove partition
- System returns to initial state (single-compartment)

**Apparent paradox:** Extracted work from single heat bath, violating 2nd law?

**Resolution:** Measurement generates entropy. Erasing demon's memory costs at least $k_B T \\ln 2$ work (Landauer).

**2. Work per bit:**

**Landauer-Szilard bound:**
$$W_{\\text{max}} = k_B T \\ln 2 \\text{ per bit}$$

At room temperature ($T = 300$ K):
$$W_{\\text{max}} = 1.38 \\times 10^{-23} \\times 300 \\times 0.693 = 2.87 \\times 10^{-21} \\text{ J}$$
$$\\approx 18 \\text{ meV} \\approx 0.017 \\text{ eV}$$

**Key insight:** Information has thermodynamic value. 1 bit = $k_B T \\ln 2$ free energy.

**3. Memory-based information engine design:**

**System components:**
- Memory register: $n$ bits in thermal equilibrium
- Probe: Can measure bit values
- Work extraction: Piston/capacitor coupled to bit

**Operation cycle:**

**Phase 1: Measure**
- Read bit value: $s \\in \\{0, 1\\}$
- Record in controller memory

**Phase 2: Conditional operation**
- If $s = 0$: Couple to left extraction mechanism
- If $s = 1$: Couple to right extraction mechanism
- Extract work: $W = k_B T \\ln 2$

**Phase 3: Reset memory**
- Bit returns to equilibrium (50/50)
- Ready for next cycle

**Information accounting:**
- Measurement generates 1 bit of correlation
- Feedback uses correlation to extract work
- Controller's memory must be erased (or grows unboundedly)

**Practical implementation (electronic):**
- Bit: Charge on capacitor (fluctuating at $k_B T$)
- Measurement: Low-energy sensing circuit
- Feedback: Conditional switching of load
- Work: Energy transferred to load exceeds sensing cost

**Efficiency:**
$$\\eta = \\frac{W_{\\text{extracted}}}{k_B T \\ln 2}$$

Achieving $\\eta \\to 1$ requires:
- Reversible measurement
- Reversible feedback
- Slow (quasi-static) operation`,
  },
  {
    slug: "thermodynamic-neural-network",
    title: "Thermodynamic Neural Networks",
    difficulty: "hard",
    type: "system-design",
    topics: ["neural networks", "analog computing", "energy-based models"],
    moduleRef: "Thermodynamic computing models",
    statement: `Thermodynamic computing can implement neural network computations using physical dynamics.

1. How can equilibrium thermodynamics compute an inference pass?
2. Design a physical system that computes matrix-vector multiplication.
3. What are the energy advantages over digital implementation?`,
    solution: `**1. Equilibrium inference:**

**Energy-based model:**
Define network energy:
$$E(v, h) = -v^T W h - b^T v - c^T h$$

where $v$ = visible units, $h$ = hidden units.

**Inference:** Given input $v$, find optimal $h$.

**Thermodynamic implementation:**
- Physical system with energy $E(v, h)$
- Clamp visible units to input values
- Let system relax to equilibrium
- Read out hidden unit states

**Equilibrium solution:**
$$h^* = \\arg\\min_h E(v, h) = \\sigma(W^T v + c)$$

for appropriate nonlinearity $\\sigma$.

**Physics does the computation:** System finds minimum energy = network output.

**2. Matrix-vector multiplication:**

**Target:** Compute $y = Wx$ for input $x$.

**Resistor network implementation:**

**Setup:**
- Input voltages $V_i = x_i$ applied to left nodes
- Conductance $G_{ij} = |W_{ij}|$ between nodes $i$ and $j$
- Output currents $I_j$ measured at right nodes

**Kirchhoff's law:**
$$I_j = \\sum_i G_{ij}(V_i - V_j^{\\text{out}})$$

For grounded output nodes ($V_j^{\\text{out}} = 0$):
$$I_j = \\sum_i G_{ij} V_i = (Gx)_j$$

**Handling signs:**
- Use differential pairs for negative weights
- Or use separate positive/negative networks

**Scaling:**
- Energy dissipated: $P = \\sum_{ij} G_{ij} V_i^2 \\sim O(n^2)$
- But computation is instantaneous (settling time)
- Can pipeline continuous inputs

**3. Energy advantages:**

**Digital matrix-vector multiply:**
- $n^2$ multiply-accumulate (MAC) operations
- Each MAC: $\\sim 1$ pJ in modern hardware
- Total: $\\sim n^2$ pJ
- For $n = 1000$: $\\sim 1$ μJ

**Thermodynamic implementation:**
- Energy set by precision, not operation count
- For 8-bit precision at $T = 300$ K: $\\sim 8 k_B T \\ln 2 \\sim 10^{-20}$ J per value
- Total for $n = 1000$ outputs: $\\sim 10^{-17}$ J

**Potential advantage:** 7-8 orders of magnitude!

**Caveats:**
- Precision limited by noise
- Interface costs (ADC/DAC)
- Fabrication challenges
- May not match digital flexibility

**Realistic assessment:**
- Thermodynamic advantage: 10-1000× for specific operations
- Interface overhead often dominates
- Best for dedicated accelerators, not general computation`,
  },
  {
    slug: "noise-limit-precision",
    title: "Noise-Limited Computation Precision",
    difficulty: "interview",
    type: "derivation",
    topics: ["noise", "precision", "analog computing"],
    moduleRef: "Noise and fluctuations",
    statement: `Thermal noise limits the precision of analog thermodynamic computations.

1. For a voltage stored on capacitor $C$ at temperature $T$, what is the noise level?
2. How many bits of precision can be represented?
3. How does this compare to the Landauer limit for the same information content?`,
    solution: `**1. Capacitor noise:**

**Equipartition theorem:**
$$\\frac{1}{2}C\\langle V^2\\rangle = \\frac{1}{2}k_B T$$

**Noise variance:**
$$\\langle V^2\\rangle = \\frac{k_B T}{C}$$

**RMS noise voltage:**
$$V_{\\text{noise}} = \\sqrt{\\frac{k_B T}{C}}$$

**Example:** $C = 1$ fF, $T = 300$ K:
$$V_{\\text{noise}} = \\sqrt{\\frac{1.38 \\times 10^{-23} \\times 300}{10^{-15}}} = \\sqrt{4.14 \\times 10^{-6}} \\approx 2 \\text{ mV}$$

**2. Bits of precision:**

For signal range $V_{\\text{max}}$:

$$\\text{SNR} = \\frac{V_{\\text{max}}}{V_{\\text{noise}}} = V_{\\text{max}}\\sqrt{\\frac{C}{k_B T}}$$

**Bits of precision:**
$$n = \\log_2(\\text{SNR}) = \\frac{1}{2}\\log_2\\left(\\frac{CV_{\\text{max}}^2}{k_B T}\\right)$$

**Example:** $V_{\\text{max}} = 1$ V, $C = 1$ fF, $T = 300$ K:
$$\\text{SNR} = \\frac{1}{0.002} = 500$$
$$n = \\log_2(500) \\approx 9 \\text{ bits}$$

**3. Comparison to Landauer limit:**

**Energy stored in capacitor:**
$$E_{\\text{stored}} = \\frac{1}{2}CV_{\\text{max}}^2 = \\frac{1}{2}(10^{-15})(1)^2 = 0.5 \\text{ fJ}$$

**Landauer cost for $n$ bits:**
$$E_{\\text{Landauer}} = n \\cdot k_B T \\ln 2 = 9 \\times 2.87 \\times 10^{-21} \\approx 2.6 \\times 10^{-20} \\text{ J}$$

**Ratio:**
$$\\frac{E_{\\text{stored}}}{E_{\\text{Landauer}}} = \\frac{5 \\times 10^{-16}}{2.6 \\times 10^{-20}} \\approx 20,000$$

**Interpretation:**
- Stored energy is $\\sim 20,000\\times$ Landauer minimum
- Room for $\\sim 15,000\\times$ improvement in energy efficiency
- Current analog computing is far from fundamental limits

**Trade-off:**
$$n = \\frac{1}{2}\\log_2\\left(\\frac{E_{\\text{stored}}}{k_B T/2}\\right)$$

More energy → more precision, but only logarithmically.`,
  },
  {
    slug: "boltzmann-sampling-implementation",
    title: "Implementing Boltzmann Sampling",
    difficulty: "interview",
    type: "system-design",
    topics: ["Boltzmann sampling", "MCMC", "physical implementation"],
    moduleRef: "Thermodynamic computing models",
    statement: `Thermodynamic systems can directly sample from Boltzmann distributions.

1. Compare MCMC sampling to physical Boltzmann sampling.
2. Design a system to sample from an Ising model distribution.
3. What determines the sampling rate and quality?`,
    solution: `**1. MCMC vs physical sampling:**

**MCMC (Markov Chain Monte Carlo):**
- Digital algorithm simulating Boltzmann distribution
- Metropolis-Hastings: Propose, accept/reject based on $e^{-\\Delta E/T}$
- One step requires: Random number, energy computation, comparison
- Sequential: Each sample depends on previous

**Physical Boltzmann sampling:**
- System at temperature $T$ naturally samples $P \\propto e^{-E/k_B T}$
- Physics does the work
- Parallel: All variables update simultaneously
- Continuous-time dynamics

**Comparison:**

| Aspect | MCMC | Physical |
|--------|------|----------|
| Energy/sample | $O(n)$ digital ops | $k_B T \\ln 2$ per DoF |
| Parallelism | Sequential | Fully parallel |
| Precision | Arbitrary | Noise-limited |
| Flexibility | Any distribution | Fixed by physics |

**2. Ising model sampler:**

**Target distribution:**
$$P(s) \\propto \\exp\\left(\\frac{1}{T}\\sum_{\\langle i,j\\rangle} J_{ij} s_i s_j + \\frac{1}{T}\\sum_i h_i s_i\\right)$$

**Physical implementation:**

**Hardware:**
- Spin variable: Bistable element (MTJ, superconducting flux qubit, LC oscillator)
- Coupling $J_{ij}$: Tunable coupling element (resistor, inductor, capacitor)
- Field $h_i$: Bias current/voltage
- Temperature: Actual thermal bath or noise injection

**Magnetic tunnel junction (MTJ) array:**
- Each MTJ: Two stable magnetization states ($s_i = \\pm 1$)
- Coupling: Magnetic field from neighbors, or resistive network
- Read-out: Measure resistance (depends on state)

**Operation:**
1. Set couplings $J_{ij}$ and fields $h_i$
2. Apply thermal noise (or use ambient temperature)
3. Wait for equilibration
4. Read out spin states
5. Repeat for more samples

**3. Sampling rate and quality:**

**Equilibration time:**
$$\\tau_{\\text{eq}} = \\max(\\tau_{\\text{Kramers}}, \\tau_{\\text{correlation}})$$

- $\\tau_{\\text{Kramers}} \\sim \\tau_0 e^{\\Delta E/k_B T}$: Barrier crossing time
- $\\tau_{\\text{correlation}}$: Time for correlations to decay

**Sampling rate:**
$$r_{\\text{sample}} \\lesssim \\frac{1}{\\tau_{\\text{eq}}}$$

**Quality factors:**

**Accuracy:**
- System must actually be at target temperature
- Couplings must match desired $J_{ij}$
- Stray fields/couplings degrade fidelity

**Independence:**
- Wait $\\gg \\tau_{\\text{correlation}}$ between samples
- Or use multiple parallel systems

**Ergodicity:**
- System must explore all states
- Avoid being stuck in metastable states
- May need annealing for frustrated systems`,
  },
  {
    slug: "erasure-lower-bound",
    title: "Optimal Erasure Protocols",
    difficulty: "hard",
    type: "derivation",
    topics: ["Landauer", "erasure", "optimal protocols"],
    moduleRef: "Thermodynamic foundations",
    statement: `The minimum energy cost for erasing a bit is $k_B T \\ln 2$ (Landauer bound).

1. Describe an optimal protocol that achieves the Landauer bound.
2. What is the trade-off between speed and energy cost?
3. For erasure in time $\\tau$, derive the energy dissipation scaling.`,
    solution: `**1. Optimal erasure protocol:**

**Setup:**
- Double-well potential, states L and R
- Initial: 50% in each well (1 bit of entropy)
- Target: 100% in state L (erased)

**Quasi-static protocol:**
1. Very slowly raise the barrier between wells (trap particles)
2. Very slowly tilt potential (favor L)
3. Very slowly lower barrier while keeping tilt
4. Very slowly remove tilt
5. All particles now in L

**Key features:**
- Each step is infinitesimally slow (quasi-static)
- System always in equilibrium
- Work done = free energy change = $k_B T \\ln 2$
- Heat dissipated = $k_B T \\ln 2$
- Takes infinite time!

**Why it works:**
- Reversible compression of phase space
- No entropy production in environment
- All energy goes to heat bath, comes back as work (minus $\\Delta F$)

**2. Speed-energy trade-off:**

**Fast erasure:**
- System out of equilibrium
- Entropy production: $\\sigma > 0$
- Extra dissipation: $W - \\Delta F = T\\sigma > 0$

**Finite-time thermodynamics:**
Optimal protocol minimizes dissipation for given time $\\tau$.

**Linear response regime:**
$$W - \\Delta F \\approx \\frac{\\gamma}{2}\\int_0^\\tau \\dot{\\lambda}^2 dt$$

where $\\lambda$ is the control parameter and $\\gamma$ is a friction coefficient.

**3. Dissipation scaling:**

**Optimal protocol:** Constant $\\dot{\\lambda} = \\Delta\\lambda/\\tau$

$$W_{\\text{diss}} = W - \\Delta F = \\frac{\\gamma (\\Delta\\lambda)^2}{2\\tau}$$

**Scaling:**
$$W_{\\text{diss}} \\propto \\frac{1}{\\tau}$$

**Total energy cost:**
$$W = k_B T \\ln 2 + \\frac{\\alpha}{\\tau}$$

where $\\alpha$ depends on the specific protocol and system.

**General result (finite-time thermodynamics):**
$$\\sigma = \\frac{\\Gamma}{\\tau} + O(1/\\tau^2)$$

**Implications:**
- Fast erasure costs more energy
- Energy-time product is bounded below
- For fixed error rate, minimum product determined by $\\Gamma$

**Example:** To erase in $\\tau = 1$ ns with $\\alpha = 10^{-21}$ J·s:
$$W_{\\text{diss}} = \\frac{10^{-21}}{10^{-9}} = 10^{-12} \\text{ J} = 1 \\text{ pJ}$$

This is $\\sim 10^8$ times the Landauer limit — typical for today's computers!`,
  },
  {
    slug: "metropolis-algorithm-analysis",
    title: "Metropolis Algorithm Thermodynamics",
    difficulty: "interview",
    type: "derivation",
    topics: ["Metropolis", "detailed balance", "MCMC"],
    moduleRef: "Algorithmic primitives",
    statement: `The Metropolis algorithm samples from the Boltzmann distribution.

1. Write the Metropolis acceptance probability and show it satisfies detailed balance.
2. What determines the mixing time of Metropolis sampling?
3. How does Metropolis compare to physical dynamics thermodynamically?`,
    solution: `**1. Metropolis acceptance and detailed balance:**

**Metropolis acceptance probability:**

For transition from state $i$ to state $j$:
$$A(i \\to j) = \\min\\left(1, e^{-(E_j - E_i)/k_B T}\\right)$$

**Detailed balance check:**

$$\\pi_i P(i \\to j) = \\pi_j P(j \\to i)$$

where $\\pi_i = e^{-E_i/T}/Z$ and $P(i \\to j) = q(i \\to j) A(i \\to j)$ with symmetric proposal $q(i \\to j) = q(j \\to i)$.

**Case 1:** $E_j < E_i$ (downhill move)
- $A(i \\to j) = 1$
- $A(j \\to i) = e^{-(E_i - E_j)/T}$

$$\\frac{\\pi_i A(i \\to j)}{\\pi_j A(j \\to i)} = \\frac{e^{-E_i/T} \\cdot 1}{e^{-E_j/T} \\cdot e^{(E_j-E_i)/T}} = 1$$ ✓

**Case 2:** $E_j > E_i$ (uphill move)
- $A(i \\to j) = e^{-(E_j - E_i)/T}$
- $A(j \\to i) = 1$

Same calculation confirms detailed balance. ✓

**2. Mixing time:**

**Definition:** Time to get within $\\epsilon$ of equilibrium from worst initial state.

**Depends on:**

**Energy barriers:**
$$\\tau_{\\text{mix}} \\gtrsim e^{\\Delta E_{\\max}/k_B T}$$

Highest barrier in energy landscape sets lower bound.

**State space connectivity:**
- More neighbors → faster mixing
- Graph structure matters

**Temperature:**
- Higher $T$ → easier barrier crossing → faster mixing
- Lower $T$ → slower exploration

**Problem structure:**
- Random fields: $\\tau \\sim n^2$
- Ferromagnetic Ising: $\\tau \\sim n^2$ (above $T_c$), exponential (below $T_c$)
- Spin glasses: Exponential in system size

**3. Comparison to physical dynamics:**

**Metropolis:**
- Single-spin flip updates (or small changes)
- Energy computed discretely per step
- Steps take fixed compute time

**Physical Langevin dynamics:**
- All variables update continuously
- Energy minimized by gradient descent + noise
- Steps take physical time $\\sim \\gamma/\\kappa$

**Thermodynamic efficiency:**

**Metropolis energy cost:**
- Random number: $\\sim k_B T \\ln 2$ per bit
- Energy comparison: $\\sim k_B T \\ln 2$ per bit of precision
- Per step: $\\sim n k_B T \\ln 2$ for $n$-bit energy

**Physical sampling energy cost:**
- Dissipation: $\\sim k_B T$ per relaxation time
- For same effective temperature
- But fully parallel!

**Key difference:**
- Metropolis: Sequential, digital, flexible
- Physical: Parallel, analog, constrained by hardware

**Hybrid approach:**
Use physical system for fast, low-precision sampling.
Metropolis for precise, slow sampling when needed.`,
  },
  {
    slug: "analog-gradient-descent",
    title: "Analog Gradient Descent",
    difficulty: "hard",
    type: "system-design",
    topics: ["gradient descent", "analog computing", "optimization"],
    moduleRef: "Algorithmic primitives",
    statement: `Physical systems can implement gradient descent through natural dynamics.

1. How does overdamped dynamics relate to gradient descent?
2. Design a physical system that minimizes a quadratic loss function.
3. What limits the precision and convergence of analog gradient descent?`,
    solution: `**1. Overdamped dynamics as gradient descent:**

**Overdamped Langevin equation:**
$$\\gamma \\dot{x} = -\\nabla U(x) + \\sqrt{2\\gamma k_B T}\\, \\xi(t)$$

**Zero-temperature limit ($T \\to 0$):**
$$\\dot{x} = -\\frac{1}{\\gamma}\\nabla U(x)$$

This is exactly gradient descent with learning rate $\\eta = 1/\\gamma$!

**With noise (finite $T$):**
- Stochastic gradient descent (SGD)
- Noise magnitude $\\sim \\sqrt{T}$
- Helps escape local minima (like annealing)

**Key insight:** Physical relaxation ≡ optimization.

**2. Quadratic loss minimizer:**

**Target:** Minimize $L(x) = \\frac{1}{2}x^T A x - b^T x$

**Gradient:** $\\nabla L = Ax - b$

**Solution:** $x^* = A^{-1}b$

**Physical implementation: RC network**

**Setup:**
- Variables: Voltages $V_i$ at nodes
- Matrix $A$: Conductance matrix $G_{ij}$
- Vector $b$: Current sources $I_i$

**Kirchhoff's current law:**
$$C_i \\frac{dV_i}{dt} = I_i - \\sum_j G_{ij}(V_i - V_j)$$

In matrix form:
$$C\\frac{dV}{dt} = I - GV$$

At equilibrium: $GV = I \\implies V = G^{-1}I$

This is exactly $x = A^{-1}b$!

**Energy function:**
$$U(V) = \\frac{1}{2}V^T G V - I^T V$$

Network minimizes this energy by Ohmic dissipation.

**3. Precision and convergence limits:**

**Precision limits:**

**Thermal noise:**
$$\\delta x \\sim \\sqrt{\\frac{k_B T}{\\kappa}}$$

where $\\kappa = $ curvature (second derivative) of loss.

**Component tolerance:**
- Resistor values have $\\sim 1\\%$ tolerance
- Limits effective matrix precision
- Errors in $A$ → errors in $A^{-1}b$

**Convergence limits:**

**Time constant:**
$$\\tau = \\frac{\\gamma}{\\min(\\text{eigenvalues of } A)}$$

Ill-conditioned $A$ → slow convergence.

**Condition number:**
$$\\kappa(A) = \\frac{\\lambda_{\\max}}{\\lambda_{\\min}}$$

Convergence time $\\propto \\kappa(A)$.

**Stability:**
- If eigenvalues have wrong sign → unstable
- Must ensure $A$ is positive definite for minimization

**Practical considerations:**

**Interface overhead:**
- Setting up $A$ requires DACs
- Reading $x^*$ requires ADCs
- For small problems, overhead dominates

**Non-convexity:**
- Multiple local minima → may get stuck
- Need annealing or multiple starts
- Physical system finds local minimum only

**Power consumption:**
- Continuous dissipation while solving
- Trade-off: Faster convergence → more power`,
  },
  {
    slug: "thermal-fluctuation-theorem",
    title: "Fluctuation Theorems for Computing",
    difficulty: "hard",
    type: "derivation",
    topics: ["fluctuation theorem", "computing", "entropy"],
    moduleRef: "Nonequilibrium thermodynamics",
    statement: `Fluctuation theorems constrain the thermodynamics of computation.

1. State the integral fluctuation theorem.
2. How does it apply to a bit erasure process?
3. What does it imply about the possibility of "beating" the Landauer bound?`,
    solution: `**1. Integral fluctuation theorem:**

**General form:**
$$\\langle e^{-\\sigma}\\rangle = 1$$

where $\\sigma$ is the total entropy production.

**For work processes:**
$$\\langle e^{-(W - \\Delta F)/k_B T}\\rangle = 1$$

**Consequence (by Jensen's inequality):**
$$\\langle W\\rangle \\geq \\Delta F$$

Equality only for quasi-static processes.

**Detailed fluctuation theorem:**
$$P(\\sigma) = e^{\\sigma} P(-\\sigma)$$

Probability of entropy-decreasing trajectories is exponentially suppressed.

**2. Application to bit erasure:**

**Setup:**
- Initial: Random bit (1 bit entropy)
- Final: Known state 0 (0 entropy)
- System entropy change: $\\Delta S_{\\text{sys}} = -k_B \\ln 2$

**Free energy change:**
$$\\Delta F = -T \\Delta S_{\\text{sys}} = k_B T \\ln 2$$

**Applying fluctuation theorem:**
$$\\langle e^{-W/k_B T}\\rangle = e^{-\\Delta F/k_B T} = e^{-\\ln 2} = \\frac{1}{2}$$

**Interpretation:**
- Not all trajectories dissipate $k_B T \\ln 2$
- Some dissipate less, some more
- Average must satisfy $\\langle W \\rangle \\geq k_B T \\ln 2$

**Work distribution:**
$$P(W) \\cdot e^{-W/k_B T}$$ integrates to $1/2$.

**3. Can we "beat" Landauer?**

**On average: No**

The Jarzynski equality implies:
$$\\langle W \\rangle \\geq \\Delta F = k_B T \\ln 2$$

This is an exact result, not an approximation.

**For individual trajectories: Sometimes**

The fluctuation theorem allows:
- Some trajectories with $W < k_B T \\ln 2$
- These are balanced by others with $W > k_B T \\ln 2$

**Probability of "winning":**
$$P(W < k_B T \\ln 2) < e^{-\\ln 2} = \\frac{1}{2}$$

Actually, it's typically much smaller and decreases with system size.

**Could we exploit fluctuations?**

No, because:
- Need to detect favorable fluctuations → requires measurement
- Measurement costs at least $k_B T \\ln 2$ (demon's memory)
- Net balance is non-negative

**Deep insight:**
Fluctuation theorems show that the Landauer bound is not just average but enforced by the detailed structure of fluctuations. Any attempt to circumvent it must pay the information cost somewhere.`,
  },
  {
    slug: "boltzmann-machine-learning",
    title: "Learning in Boltzmann Machines",
    difficulty: "hard",
    type: "derivation",
    topics: ["Boltzmann machine", "learning", "contrastive divergence"],
    moduleRef: "Thermodynamic computing models",
    statement: `Boltzmann machines learn by adjusting weights to match data statistics.

1. Write the gradient of the log-likelihood for a Boltzmann machine.
2. Why is this gradient computation hard, and how does contrastive divergence approximate it?
3. How could thermodynamic hardware accelerate Boltzmann machine training?`,
    solution: `**1. Log-likelihood gradient:**

**Boltzmann machine:**
$$P(v) = \\frac{1}{Z}\\sum_h e^{-E(v,h)/T}$$

where $E(v,h) = -\\sum_{ij} w_{ij}v_i h_j - \\sum_i a_i v_i - \\sum_j b_j h_j$

**Log-likelihood:**
$$\\mathcal{L} = \\sum_{v \\in \\text{data}} \\log P(v)$$

**Gradient w.r.t. weights:**
$$\\frac{\\partial \\mathcal{L}}{\\partial w_{ij}} = \\langle v_i h_j\\rangle_{\\text{data}} - \\langle v_i h_j\\rangle_{\\text{model}}$$

**Where:**
- $\\langle \\cdot\\rangle_{\\text{data}}$: Average over data, with $h$ sampled given $v$
- $\\langle \\cdot\\rangle_{\\text{model}}$: Average over model's equilibrium distribution

**Learning rule:** Increase weight if data has correlation, decrease if model has correlation.

**2. Computational difficulty:**

**Problem:** Computing $\\langle v_i h_j\\rangle_{\\text{model}}$ requires:
- Sampling from $P(v, h)$
- Running to equilibrium
- For each weight update!

Equilibrium sampling is expensive (exponential mixing time for hard problems).

**Contrastive Divergence (CD-k):**

Instead of equilibrium, run only $k$ steps of MCMC:
1. Start with data sample $v^{(0)}$
2. Sample $h^{(0)} \\sim P(h|v^{(0)})$
3. Sample $v^{(1)} \\sim P(v|h^{(0)})$
4. Repeat $k$ times
5. Use $v^{(k)}, h^{(k)}$ as model sample

**CD-1 gradient:**
$$\\Delta w_{ij} \\propto \\langle v_i h_j\\rangle_{\\text{data}} - \\langle v_i h_j\\rangle_{\\text{recon}}$$

**Why it works:**
- Reconstruction is "close" to data
- Gradient points toward data, away from model samples
- Biased but effective in practice

**3. Thermodynamic hardware acceleration:**

**Natural sampling:**
- Physical system samples from $P(v,h) \\propto e^{-E/k_B T}$
- No MCMC iteration needed
- Sampling happens at physical time scale (ns to μs)

**Hardware implementation:**
- Visible/hidden units: Physical bistable elements
- Weights $w_{ij}$: Tunable couplings
- Biases $a_i, b_j$: External fields
- Temperature: Actual thermal bath

**Training loop:**
1. Clamp visible units to data, let hidden relax → data statistics
2. Release visible units, let full system relax → model statistics
3. Update weights based on difference
4. Repeat

**Advantages:**
- Parallel sampling (all units update simultaneously)
- Energy-efficient (no digital computation)
- Natural exploration of state space

**Challenges:**
- Weight precision limited by hardware
- Read-out bandwidth limits batch size
- May need careful temperature control
- Mapping to physical constraints`,
  },
  {
    slug: "thermodynamic-annealing",
    title: "Optimal Annealing Schedules",
    difficulty: "hard",
    type: "derivation",
    topics: ["annealing", "optimization", "thermodynamics"],
    moduleRef: "Algorithmic primitives",
    statement: `Simulated annealing uses temperature schedules to find global optima.

1. What conditions guarantee that simulated annealing finds the global optimum?
2. Derive the optimal annealing schedule for minimizing computation time.
3. How do physical thermodynamic constraints affect realizable schedules?`,
    solution: `**1. Convergence conditions:**

**Geman-Geman condition (1984):**
Simulated annealing converges to global optimum if:

$$T(t) \\geq \\frac{\\Delta E_{\\max}}{\\ln(t + t_0)}$$

where $\\Delta E_{\\max}$ is the depth of the deepest local minimum.

**Interpretation:**
- Must cool slower than logarithmic
- Higher barriers require slower cooling
- Logarithmic schedule is optimal for worst-case guarantees

**Limitation:** Logarithmic cooling is very slow in practice.

**2. Optimal schedule derivation:**

**Finite-time thermodynamics approach:**

**Objective:** Minimize time to reach temperature $T_f$ from $T_i$ while maintaining quasi-equilibrium.

**Constraint:** System can equilibrate at rate $\\Gamma(T)$.

**Optimization problem:**
$$\\min \\int_{T_i}^{T_f} \\frac{dT}{\\Gamma(T) \\cdot f(T)}$$

where $f(T)$ is the cooling rate.

**For diffusive dynamics** ($\\Gamma \\propto T$):

Optimal schedule: $T(t) = T_i e^{-t/\\tau}$ (exponential cooling)

**For activated dynamics** ($\\Gamma \\propto e^{-\\Delta/T}$):

Optimal schedule depends on barrier structure. For uniform barriers:
$$T(t) = \\frac{T_i}{1 + \\alpha t}$$

**Practical schedules:**

**Geometric:** $T_{n+1} = \\alpha T_n$ with $\\alpha < 1$

**Linear:** $T(t) = T_i - \\beta t$

**Adaptive:** Adjust based on acceptance rate

**3. Physical constraints:**

**Heat capacity:**
$$C = \\frac{dQ}{dT}$$

Extracting heat takes time: $\\tau_{\\text{cool}} \\sim C/\\kappa$ where $\\kappa$ is thermal conductance.

**Minimum cooling time:**
$$\\tau_{\\min} = \\int_{T_f}^{T_i} \\frac{C(T)}{\\kappa_{\\max}} dT$$

**Equilibration time:**
At each temperature, need time $\\tau_{\\text{eq}}(T)$ to equilibrate.

Total time: $\\tau_{\\text{total}} = \\int \\max(\\tau_{\\text{cool}}, \\tau_{\\text{eq}}) \\, dT$

**Non-equilibrium effects:**
- Too-fast cooling creates defects
- System may get "stuck" in metastable states
- Kibble-Zurek mechanism: Defect density $\\propto$ cooling rate

**Optimal physical schedule:**

Balance:
- Thermal conduction rate
- Equilibration rate at each $T$
- Required precision at $T_f$

**Result:** Physical constraints typically make exponential or linear schedules practical choices, with rate tuned to thermal conductivity and system size.`,
  },
  {
    slug: "stochastic-computing",
    title: "Stochastic Computing Fundamentals",
    difficulty: "interview",
    type: "derivation",
    topics: ["stochastic computing", "noise", "multiplication"],
    moduleRef: "Thermodynamic computing models",
    statement: `Stochastic computing represents numbers as random bit streams.

1. Explain how stochastic computing represents a value $p \\in [0,1]$.
2. Show how an AND gate computes multiplication of two stochastic numbers.
3. What is the precision-time trade-off in stochastic computing?`,
    solution: `**1. Stochastic representation:**

**Value encoding:**
A number $p \\in [0,1]$ is represented by a bit stream where each bit is 1 with probability $p$.

**Example:** $p = 0.7$ might generate:
Stream: 1, 0, 1, 1, 1, 0, 1, 1, 0, 1 (7 ones out of 10)

**Key property:** Information is in the statistics, not individual bits.

**Advantages:**
- Tolerant to bit errors (changes one sample, not value)
- Simple operations (gates implement arithmetic)
- Low precision per wire, high precision over time

**2. Multiplication with AND:**

**Setup:**
- Input A: stream with $P(A_i = 1) = a$
- Input B: stream with $P(B_i = 1) = b$
- Streams are independent

**AND gate output:**
$$P(A_i \\land B_i = 1) = P(A_i = 1) \\cdot P(B_i = 1) = a \\cdot b$$

**Therefore:** AND gate output stream represents $a \\cdot b$!

**Example:** $a = 0.6$, $b = 0.5$
- A stream: 1,1,0,1,1,0,1,0,0,1 (6/10)
- B stream: 1,0,1,0,1,0,0,1,1,0 (5/10)
- AND output: 1,0,0,0,1,0,0,0,0,0 (2/10 ≈ 0.3)

Expected: $0.6 \\times 0.5 = 0.3$ ✓

**Other operations:**
- OR ≈ $a + b - ab$ (probability union)
- NOT = $1 - a$ (flip bits)
- Scaled addition: MUX with select probability gives $sa + (1-s)b$

**3. Precision-time trade-off:**

**Standard deviation of estimate:**
After $N$ samples, estimate $\\hat{p} = (\\text{sum})/N$.

$$\\text{Var}(\\hat{p}) = \\frac{p(1-p)}{N}$$
$$\\sigma(\\hat{p}) = \\sqrt{\\frac{p(1-p)}{N}} \\approx \\frac{1}{2\\sqrt{N}}$$

**Precision (bits):**
$$n \\approx \\log_2\\left(\\frac{1}{\\sigma}\\right) = \\frac{1}{2}\\log_2(N)$$

**To achieve $n$ bits of precision:**
$$N \\sim 4^n$$

**Comparison to conventional:**
- Conventional: $n$-bit multiply in $O(n^2)$ gate-delays
- Stochastic: $4^n$ samples, but each is 1 gate-delay

**Trade-off:**
- Low precision (4-8 bits): Stochastic competitive
- High precision (16+ bits): Conventional wins
- Energy: Stochastic may be lower for tolerance to noise

**Thermodynamic perspective:**
Stochastic computing trades temporal precision for spatial precision. Thermal noise provides "free" randomness, reducing energy for random number generation.`,
  },
  {
    slug: "physical-ising-solver",
    title: "Physical Ising Solvers",
    difficulty: "hard",
    type: "system-design",
    topics: ["Ising machines", "optimization", "hardware"],
    moduleRef: "Thermodynamic computing models",
    statement: `Physical systems can solve combinatorial optimization problems mapped to Ising models.

1. How is a Max-Cut problem mapped to an Ising model?
2. Compare three physical implementations of Ising solvers.
3. What are the fundamental limits on speedup from physical Ising solvers?`,
    solution: `**1. Max-Cut to Ising mapping:**

**Max-Cut problem:**
Given graph $G = (V, E)$ with edge weights $w_{ij}$, partition vertices into two sets to maximize weight of cut edges.

**Ising formulation:**
Assign spin $s_i \\in \\{-1, +1\\}$ to each vertex.

**Edge contribution:**
- Same partition: $s_i s_j = +1$ → not cut
- Different partition: $s_i s_j = -1$ → cut

**Cost function:**
$$H = -\\sum_{(i,j) \\in E} w_{ij} s_i s_j$$

Minimizing $H$ ⟺ Maximizing cut (since cut edges contribute $-w_{ij} \\cdot (-1) = w_{ij}$).

**Max-Cut value:**
$$\\text{Cut} = \\frac{1}{2}\\left(\\sum_{ij} w_{ij} - H_{\\min}\\right)$$

**2. Physical implementations:**

**Coherent Ising Machine (CIM):**
- **Hardware:** Network of optical parametric oscillators (OPOs)
- **Spins:** Phase of optical field (0 or $\\pi$)
- **Coupling:** Optical delay lines + measurement feedback
- **Advantages:** High connectivity, fast dynamics
- **Challenges:** Requires cryogenics, complex optics

**Superconducting quantum annealer (D-Wave):**
- **Hardware:** Superconducting flux qubits
- **Spins:** Circulating current direction
- **Coupling:** Mutual inductance between qubits
- **Advantages:** True quantum tunneling, scalable
- **Challenges:** Sparse connectivity, small couplings, noise

**CMOS Ising chip:**
- **Hardware:** Digital/mixed-signal CMOS circuits
- **Spins:** Bistable SRAM cells or oscillators
- **Coupling:** Programmed in digital memory
- **Advantages:** Mature technology, room temperature
- **Challenges:** Power consumption, digital overhead

**Comparison:**

| Aspect | CIM | D-Wave | CMOS |
|--------|-----|--------|------|
| Temperature | Room/cryo | 15 mK | Room |
| Speed | ns | μs | ns-μs |
| Connectivity | All-to-all | Sparse | Programmable |
| Scale | ~100k spins | ~5k qubits | ~1M spins |

**3. Fundamental limits:**

**No guaranteed speedup:**
- NP-hard problems remain NP-hard on physical hardware
- Worst-case exponential time is unavoidable
- Physics doesn't solve computational complexity

**What physics provides:**
- Parallelism: All spins update simultaneously
- Natural dynamics: No simulation overhead
- Potential constant-factor speedups

**Specific limitations:**

**Metastability:**
- System can get stuck in local minima
- Escape time exponential in barrier height
- Annealing helps but doesn't eliminate

**Temperature vs. precision:**
- Lower $T$ → better ground state probability
- Lower $T$ → slower dynamics
- Trade-off limits practical performance

**Connectivity constraints:**
- Full connectivity hard to implement physically
- Sparse graphs require embedding (blows up size)
- Embedding overhead can be large

**Practical niche:**
- Best for sampling, not optimization
- Good for approximate solutions
- Competitive for specific problem classes (dense, low-precision)

**Honest assessment:**
Physical Ising solvers offer constant-factor advantages for some problems but don't fundamentally change computational complexity. Their value is in energy efficiency and speed for suitable applications, not in solving previously intractable problems.`,
  },
  {
    slug: "thermal-ratchet",
    title: "Thermal Ratchets and Directed Motion",
    difficulty: "interview",
    type: "conceptual",
    topics: ["ratchet", "nonequilibrium", "molecular motors"],
    moduleRef: "Thermodynamic computing models",
    statement: `A thermal ratchet converts fluctuations into directed motion using asymmetry.

1. Describe the flashing ratchet mechanism.
2. Why doesn't a thermal ratchet violate the second law?
3. How might ratchet principles be used in thermodynamic computing?`,
    solution: `**1. Flashing ratchet mechanism:**

**Setup:**
- Particle in asymmetric (sawtooth) periodic potential
- Potential can be switched on and off

**Cycle:**

**Phase 1 - Potential off:**
- Particle diffuses freely (Brownian motion)
- Spreads out symmetrically from initial position

**Phase 2 - Potential on:**
- Asymmetric potential is restored
- Particle slides to nearest minimum
- Due to asymmetry, more likely to have diffused to minimum on one side

**Net result:** Particle tends to move in one direction!

**Key insight:** Asymmetry breaks spatial symmetry, fluctuations provide energy, switching provides nonequilibrium drive.

**2. Second law compatibility:**

**Apparent paradox:**
Particle moves in one direction using only thermal fluctuations. Perpetual motion?

**Resolution:**

**Energy source:**
- Switching the potential requires work
- This is the actual energy input
- Not extracting work from single heat bath

**Entropy accounting:**
- Switching is an external nonequilibrium drive
- System + drive has positive total entropy production
- Drive does work → heat to bath

**Equilibrium analysis:**
If potential never switches:
- Particle settles to Boltzmann distribution
- No net current (detailed balance)
- Asymmetry alone is not enough

**Nonequilibrium is essential:** The ratchet works because switching keeps system out of equilibrium.

**3. Computing applications:**

**Signal rectification:**
- Convert noisy bidirectional signals to unidirectional
- Use asymmetry to bias transmission direction
- Useful for information flow control

**Bit transport:**
- Move information-carrying particles along a channel
- Ratchet mechanism provides directed transport
- Energy cost can be low if well-designed

**Error correction analog:**
- Asymmetric energy landscape can bias toward correct state
- Errors (fluctuations to wrong state) are more easily corrected
- Implements a "one-way" preference

**Molecular computing:**
- DNA computing uses molecular ratchets
- Strand displacement is thermodynamically driven
- Ratchet-like cascades compute Boolean functions`,
  },
  {
    slug: "work-extraction-information",
    title: "Work Extraction from Correlated Systems",
    difficulty: "hard",
    type: "derivation",
    topics: ["work extraction", "correlations", "information"],
    moduleRef: "Nonequilibrium thermodynamics",
    statement: `Correlations between systems contain extractable work.

1. For two systems with mutual information $I(A:B)$, how much extra work can be extracted compared to treating them independently?
2. Derive this result using the second law.
3. Design a protocol to extract work from correlations between two bits.`,
    solution: `**1. Work from correlations:**

**Independent extraction:**
Maximum work from A alone: $W_A = k_B T \\cdot S(A)$
Maximum work from B alone: $W_B = k_B T \\cdot S(B)$

**Joint extraction:**
Maximum work from AB together: $W_{AB} = k_B T \\cdot S(A,B)$

**Extra work from correlations:**
$$\\Delta W = W_A + W_B - W_{AB} = k_B T \\cdot [S(A) + S(B) - S(A,B)]$$
$$= k_B T \\cdot I(A:B)$$

**2. Second law derivation:**

**Setup:**
- System AB in joint state $\\rho_{AB}$
- Heat bath at temperature $T$
- Final state: Both systems in standard state (entropy 0)

**Entropy change of system:**
$$\\Delta S_{\\text{sys}} = 0 - S(A,B) = -S(A,B)$$

**Work extracted:**
$$W = -\\Delta F = T \\Delta S_{\\text{sys}} + Q = -T \\cdot (-S(A,B)) + Q = k_B T \\cdot S(A,B) + Q$$

For reversible process, $Q = 0$, so $W = k_B T \\cdot S(A,B)$.

**If treated independently:**
$$W_{\\text{ind}} = k_B T \\cdot S(A) + k_B T \\cdot S(B)$$

**Difference:**
$$W_{\\text{ind}} - W_{\\text{joint}} = k_B T \\cdot I(A:B)$$

This is "wasted" if correlations are ignored — correlations contain free energy!

**3. Work extraction protocol:**

**Setup:** Two correlated bits $A, B$ with joint distribution:
- $P(00) = P(11) = 1/2$ (perfectly correlated)
- $P(01) = P(10) = 0$

**Mutual information:** $I(A:B) = 1$ bit (knowing A tells you B).

**Protocol:**

**Step 1: Measure A**
- If $A = 0$: Know $B = 0$
- If $A = 1$: Know $B = 1$
- No energy cost (reversible measurement)

**Step 2: Conditional erasure of B**
- Because we know B's state, erasure is "free" — no information lost
- Actually: We can extract $k_B T \\ln 2$ from B by conditional expansion!

**Detailed work extraction from B:**
- B is in known state (say 0)
- Insert piston at empty side (position 1)
- Let B expand isothermally to fill both sides
- Extract work: $W = k_B T \\ln 2$

**Step 3: Erase A**
- A still has 1 bit of entropy
- Costs $k_B T \\ln 2$ to erase

**Net work:**
$$W_{\\text{net}} = k_B T \\ln 2 - k_B T \\ln 2 = 0$$

**But wait!** If we had erased A and B independently (without using correlation):
$$W_{\\text{cost}} = 2 \\cdot k_B T \\ln 2$$

**Savings:** $k_B T \\ln 2 = k_B T \\cdot I(A:B)$ ✓

The correlation reduced erasure cost by exactly the mutual information.`,
  },
  {
    slug: "thermodynamic-depth",
    title: "Thermodynamic Depth and Complexity",
    difficulty: "hard",
    type: "conceptual",
    topics: ["complexity", "entropy", "computation"],
    moduleRef: "Thermodynamic foundations",
    statement: `Thermodynamic depth measures the computational history embodied in a physical state.

1. Define thermodynamic depth and explain its relationship to computation.
2. How does thermodynamic depth differ from entropy?
3. What implications does thermodynamic depth have for the origin of complexity?`,
    solution: `**1. Thermodynamic depth definition:**

**Intuition:**
Thermodynamic depth measures how much computation (irreversible process) was required to produce a state from equilibrium.

**Formal definition:**
$$D = \\langle \\sigma \\rangle_{\\text{path}}$$

Average entropy production over all paths that could have produced the state from equilibrium.

**Alternative (Bennett):**
Logical depth = number of steps in shortest program producing the state.
Thermodynamic depth ≈ minimum entropy production to produce state.

**Relationship to computation:**
- Low depth: Easily produced (random, ordered)
- High depth: Required extensive computation
- Complex structures have high depth

**2. Depth vs entropy:**

**Entropy:**
- Measures disorder/uncertainty
- Maximum for random states
- Minimum for ordered states
- Doesn't distinguish random from complex

**Thermodynamic depth:**
- Measures computational history
- Low for both random and simple ordered states
- High for complex organized states

**Examples:**

**Random string:** 
- High entropy (unpredictable)
- Low depth (easy to produce — just randomize)

**Repetitive string (000...0):**
- Low entropy (predictable)
- Low depth (easy to produce — just set all to 0)

**Prime number list:**
- Moderate entropy
- High depth (must compute to find primes)

**3. Implications for complexity:**

**Origin of biological complexity:**
- Life has high thermodynamic depth
- Required billions of years of computation (evolution)
- Not just ordered or just random — deeply computed

**Arrow of complexity:**
- Universe started simple (low depth)
- Irreversible processes increase depth
- Complexity emerges through computation over time

**Relationship to free energy:**
- Producing high-depth states requires free energy dissipation
- Complexity is "paid for" by entropy production elsewhere
- Sun provides free energy, biosphere computes with it

**Computational interpretation:**
- Physical systems perform computation
- Thermodynamic depth measures total computation done
- Complex structures are "fossils" of past computation

**Limitations:**
- Hard to measure in practice
- Path-dependent definition has ambiguities
- Not a fully developed theory yet

**Deep insight:** Complexity requires not just energy, but computation — which shows up as entropy production over time.`,
  },
];

export default thermodynamicComputingProblems;
