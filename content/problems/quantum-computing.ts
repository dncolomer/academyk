import type { Problem } from "../problem-types";

export const quantumComputingProblems: Problem[] = [
  {
    slug: "qubit-state-normalization",
    title: "Qubit State Normalization",
    difficulty: "warm-up",
    type: "derivation",
    topics: ["linear algebra", "qubit states"],
    moduleRef: "Linear algebra and single qubits",
    statement: `A qubit state is written as $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ where $\\alpha$ and $\\beta$ are complex amplitudes.

If $\\alpha = \\frac{1}{2}$ and $\\beta = \\frac{\\sqrt{3}}{2}i$, verify that the state is normalized. What is the probability of measuring $|0\\rangle$?`,
    hints: [
      "A normalized state satisfies $|\\alpha|^2 + |\\beta|^2 = 1$.",
      "For a complex number $z = a + bi$, the modulus squared is $|z|^2 = a^2 + b^2$.",
    ],
    solution: `**Normalization check:**

For the state to be normalized, we need $|\\alpha|^2 + |\\beta|^2 = 1$.

$$|\\alpha|^2 = \\left|\\frac{1}{2}\\right|^2 = \\frac{1}{4}$$

$$|\\beta|^2 = \\left|\\frac{\\sqrt{3}}{2}i\\right|^2 = \\left(\\frac{\\sqrt{3}}{2}\\right)^2 = \\frac{3}{4}$$

$$|\\alpha|^2 + |\\beta|^2 = \\frac{1}{4} + \\frac{3}{4} = 1 \\checkmark$$

**Measurement probability:**

The probability of measuring $|0\\rangle$ is $|\\alpha|^2 = \\frac{1}{4} = 25\\%$.

The probability of measuring $|1\\rangle$ is $|\\beta|^2 = \\frac{3}{4} = 75\\%$.`,
  },
  {
    slug: "pauli-matrix-properties",
    title: "Pauli Matrix Eigenvalues",
    difficulty: "warm-up",
    type: "derivation",
    topics: ["linear algebra", "Pauli matrices"],
    moduleRef: "Linear algebra and single qubits",
    statement: `The Pauli Z matrix is defined as:

$$Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$$

Find the eigenvalues and eigenvectors of $Z$. Show that $Z^2 = I$.`,
    solution: `**Eigenvalues:**

The eigenvalue equation is $\\det(Z - \\lambda I) = 0$.

$$\\det\\begin{pmatrix} 1-\\lambda & 0 \\\\ 0 & -1-\\lambda \\end{pmatrix} = (1-\\lambda)(-1-\\lambda) = 0$$

This gives $\\lambda_1 = 1$ and $\\lambda_2 = -1$.

**Eigenvectors:**

For $\\lambda_1 = 1$: $(Z - I)|v\\rangle = 0$ gives $|v_1\\rangle = |0\\rangle = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$

For $\\lambda_2 = -1$: $(Z + I)|v\\rangle = 0$ gives $|v_2\\rangle = |1\\rangle = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}$

**Showing $Z^2 = I$:**

$$Z^2 = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} = I$$

This is a general property: since $Z$ has eigenvalues $\\pm 1$, we have $Z^2 = I$.`,
  },
  {
    slug: "hadamard-superposition",
    title: "Hadamard Gate Action",
    difficulty: "warm-up",
    type: "conceptual",
    topics: ["quantum gates", "superposition"],
    moduleRef: "Gates and circuits",
    statement: `The Hadamard gate is defined as:

$$H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$$

What states do you get when applying $H$ to $|0\\rangle$ and $|1\\rangle$? Show that applying $H$ twice returns the original state.`,
    solution: `**Action on $|0\\rangle$:**

$$H|0\\rangle = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}} = |+\\rangle$$

**Action on $|1\\rangle$:**

$$H|1\\rangle = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}\\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} = \\frac{|0\\rangle - |1\\rangle}{\\sqrt{2}} = |-\\rangle$$

**$H^2 = I$:**

$$H^2 = \\frac{1}{2}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} = \\frac{1}{2}\\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix} = I$$

The Hadamard gate is its own inverse, which is why it's called a *self-adjoint* or *Hermitian* unitary.`,
  },
  {
    slug: "bell-state-creation",
    title: "Creating a Bell State",
    difficulty: "warm-up",
    type: "derivation",
    topics: ["entanglement", "Bell states", "CNOT"],
    moduleRef: "Gates and circuits",
    statement: `Starting from $|00\\rangle$, show step by step how applying a Hadamard gate on the first qubit followed by a CNOT gate creates the Bell state $|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$.

The CNOT gate flips the second qubit if and only if the first qubit is $|1\\rangle$.`,
    solution: `**Step 1: Initial state**

$$|\\psi_0\\rangle = |00\\rangle = |0\\rangle \\otimes |0\\rangle$$

**Step 2: Apply Hadamard to first qubit**

$$|\\psi_1\\rangle = (H \\otimes I)|00\\rangle = H|0\\rangle \\otimes |0\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}} \\otimes |0\\rangle$$

$$= \\frac{1}{\\sqrt{2}}(|00\\rangle + |10\\rangle)$$

**Step 3: Apply CNOT**

The CNOT gate acts as $|00\\rangle \\to |00\\rangle$, $|01\\rangle \\to |01\\rangle$, $|10\\rangle \\to |11\\rangle$, $|11\\rangle \\to |10\\rangle$.

$$|\\psi_2\\rangle = \\text{CNOT}|\\psi_1\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle) = |\\Phi^+\\rangle$$

This is the maximally entangled Bell state. Measuring either qubit collapses both: if you measure $|0\\rangle$ on the first qubit, the second is guaranteed to be $|0\\rangle$, and likewise for $|1\\rangle$.`,
  },
  {
    slug: "measurement-collapse",
    title: "Measurement and State Collapse",
    difficulty: "warm-up",
    type: "conceptual",
    topics: ["measurement", "Born rule"],
    moduleRef: "Linear algebra and single qubits",
    statement: `A qubit is in state $|\\psi\\rangle = \\frac{1}{\\sqrt{3}}|0\\rangle + \\sqrt{\\frac{2}{3}}|1\\rangle$.

1. What are the probabilities of measuring $|0\\rangle$ and $|1\\rangle$?
2. After measuring and obtaining $|1\\rangle$, what is the new state?
3. If you measure again immediately, what will you get?`,
    solution: `**1. Measurement probabilities:**

By the Born rule, the probability of outcome $|k\\rangle$ is $|\\langle k|\\psi\\rangle|^2$.

$$P(0) = \\left|\\frac{1}{\\sqrt{3}}\\right|^2 = \\frac{1}{3} \\approx 33.3\\%$$

$$P(1) = \\left|\\sqrt{\\frac{2}{3}}\\right|^2 = \\frac{2}{3} \\approx 66.7\\%$$

**2. Post-measurement state:**

After measuring $|1\\rangle$, the state *collapses* to exactly $|1\\rangle$. All superposition is destroyed.

$$|\\psi_{\\text{after}}\\rangle = |1\\rangle$$

**3. Second measurement:**

If you measure immediately again in the same basis, you will get $|1\\rangle$ with probability 1. The state is no longer in superposition, so the outcome is deterministic.

This irreversibility of measurement is fundamental to quantum mechanics and is why quantum information cannot be copied (no-cloning theorem).`,
  },
  {
    slug: "bloch-sphere-rotation",
    title: "Rotations on the Bloch Sphere",
    difficulty: "interview",
    type: "derivation",
    topics: ["Bloch sphere", "rotations", "quantum gates"],
    moduleRef: "Linear algebra and single qubits",
    statement: `Any single-qubit state can be written as $|\\psi\\rangle = \\cos(\\theta/2)|0\\rangle + e^{i\\phi}\\sin(\\theta/2)|1\\rangle$ where $\\theta$ and $\\phi$ are angles on the Bloch sphere.

The rotation gate around the Z-axis by angle $\\gamma$ is $R_Z(\\gamma) = e^{-i\\gamma Z/2}$.

1. Show that $R_Z(\\gamma) = \\begin{pmatrix} e^{-i\\gamma/2} & 0 \\\\ 0 & e^{i\\gamma/2} \\end{pmatrix}$.
2. What happens to a state on the Bloch sphere when you apply $R_Z(\\pi)$?`,
    hints: [
      "Use the Taylor expansion of the exponential, or note that $e^{i\\alpha Z} = \\cos(\\alpha)I + i\\sin(\\alpha)Z$.",
    ],
    solution: `**1. Matrix form of $R_Z(\\gamma)$:**

Using the identity $e^{i\\alpha Z} = \\cos(\\alpha)I + i\\sin(\\alpha)Z$ (since $Z^2 = I$):

$$R_Z(\\gamma) = e^{-i\\gamma Z/2} = \\cos(\\gamma/2)I - i\\sin(\\gamma/2)Z$$

$$= \\cos(\\gamma/2)\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} - i\\sin(\\gamma/2)\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$$

$$= \\begin{pmatrix} \\cos(\\gamma/2) - i\\sin(\\gamma/2) & 0 \\\\ 0 & \\cos(\\gamma/2) + i\\sin(\\gamma/2) \\end{pmatrix} = \\begin{pmatrix} e^{-i\\gamma/2} & 0 \\\\ 0 & e^{i\\gamma/2} \\end{pmatrix}$$

**2. Effect of $R_Z(\\pi)$:**

$$R_Z(\\pi)|\\psi\\rangle = \\begin{pmatrix} e^{-i\\pi/2} & 0 \\\\ 0 & e^{i\\pi/2} \\end{pmatrix}\\begin{pmatrix} \\cos(\\theta/2) \\\\ e^{i\\phi}\\sin(\\theta/2) \\end{pmatrix}$$

$$= \\begin{pmatrix} -i\\cos(\\theta/2) \\\\ ie^{i\\phi}\\sin(\\theta/2) \\end{pmatrix} = -i\\begin{pmatrix} \\cos(\\theta/2) \\\\ e^{i(\\phi+\\pi)}\\sin(\\theta/2) \\end{pmatrix}$$

Up to global phase $-i$, this is equivalent to shifting $\\phi \\to \\phi + \\pi$. On the Bloch sphere, $R_Z(\\pi)$ rotates the state by 180° around the Z-axis. This is a half-rotation in the equatorial plane.`,
  },
  {
    slug: "tensor-product-computation",
    title: "Two-Qubit Tensor Products",
    difficulty: "warm-up",
    type: "derivation",
    topics: ["tensor products", "multi-qubit states"],
    moduleRef: "Linear algebra and single qubits",
    statement: `Compute the tensor product $|+\\rangle \\otimes |-\\rangle$ where:

$$|+\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle), \\quad |-\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle)$$

Write the result in both Dirac notation and as a 4-component column vector.`,
    solution: `**Computation:**

$$|+\\rangle \\otimes |-\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle) \\otimes \\frac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle)$$

Distributing the tensor product:

$$= \\frac{1}{2}(|0\\rangle|0\\rangle - |0\\rangle|1\\rangle + |1\\rangle|0\\rangle - |1\\rangle|1\\rangle)$$

$$= \\frac{1}{2}(|00\\rangle - |01\\rangle + |10\\rangle - |11\\rangle)$$

**As a column vector:**

Using the convention $|00\\rangle = (1,0,0,0)^T$, $|01\\rangle = (0,1,0,0)^T$, $|10\\rangle = (0,0,1,0)^T$, $|11\\rangle = (0,0,0,1)^T$:

$$|+\\rangle \\otimes |-\\rangle = \\frac{1}{2}\\begin{pmatrix} 1 \\\\ -1 \\\\ 1 \\\\ -1 \\end{pmatrix}$$

Note that this state is *separable* (a product state), not entangled. It can be written as a tensor product of single-qubit states.`,
  },
  {
    slug: "cnot-decomposition",
    title: "CNOT Gate in Different Bases",
    difficulty: "interview",
    type: "derivation",
    topics: ["CNOT", "basis change", "Hadamard"],
    moduleRef: "Gates and circuits",
    statement: `Show that $\\text{CNOT}_{12} = (H \\otimes H) \\cdot \\text{CNOT}_{21} \\cdot (H \\otimes H)$ where $\\text{CNOT}_{12}$ has qubit 1 as control and qubit 2 as target, and $\\text{CNOT}_{21}$ has qubit 2 as control and qubit 1 as target.

This shows that the direction of CNOT can be reversed by conjugating with Hadamards.`,
    hints: [
      "In the $|\\pm\\rangle$ basis, the roles of X and Z are swapped.",
      "CNOT can be thought of as 'copy Z information' in the computational basis.",
    ],
    solution: `The CNOT gate can be written as a controlled-X: it applies X to the target when the control is $|1\\rangle$.

$$\\text{CNOT}_{12} = |0\\rangle\\langle 0| \\otimes I + |1\\rangle\\langle 1| \\otimes X$$

The key insight is that Hadamard swaps the X and Z bases:
- $H|0\\rangle = |+\\rangle$, $H|1\\rangle = |-\\rangle$
- $HXH = Z$, $HZH = X$

Applying $(H \\otimes H)$ on both sides transforms:

$$(H \\otimes H) \\cdot \\text{CNOT}_{12} \\cdot (H \\otimes H)$$

The control projectors become $H|0\\rangle\\langle 0|H = |+\\rangle\\langle +|$ and $H|1\\rangle\\langle 1|H = |-\\rangle\\langle -|$.

The target $X$ becomes $HXH = Z$.

This gives a controlled-Z structure in the Hadamard basis, which when further analyzed is equivalent to $\\text{CNOT}_{21}$ in the computational basis.

**Direct verification:** One can verify by computing all matrix elements:

$$\\text{CNOT}_{12} = \\begin{pmatrix} 1&0&0&0\\\\0&1&0&0\\\\0&0&0&1\\\\0&0&1&0 \\end{pmatrix}, \\quad \\text{CNOT}_{21} = \\begin{pmatrix} 1&0&0&0\\\\0&0&0&1\\\\0&0&1&0\\\\0&1&0&0 \\end{pmatrix}$$

Computing $(H\\otimes H)\\text{CNOT}_{21}(H\\otimes H)$ gives $\\text{CNOT}_{12}$.`,
  },
  {
    slug: "deutsch-algorithm",
    title: "Deutsch's Algorithm",
    difficulty: "interview",
    type: "conceptual",
    topics: ["quantum algorithms", "oracles", "interference"],
    moduleRef: "Early algorithms",
    statement: `In Deutsch's algorithm, we have a black-box function $f:\\{0,1\\}\\to\\{0,1\\}$ implemented as a unitary $U_f|x\\rangle|y\\rangle = |x\\rangle|y \\oplus f(x)\\rangle$.

The algorithm determines whether $f$ is constant ($f(0)=f(1)$) or balanced ($f(0)\\neq f(1)$) with a single query.

1. What initial state do we prepare?
2. After applying $U_f$, what interference pattern reveals the answer?
3. Why can't a classical computer do this with one query?`,
    solution: `**1. Initial state:**

Prepare $|\\psi_0\\rangle = |0\\rangle|1\\rangle$, then apply Hadamard to both qubits:

$$|\\psi_1\\rangle = (H|0\\rangle)(H|1\\rangle) = |+\\rangle|-\\rangle = \\frac{1}{2}(|0\\rangle + |1\\rangle)(|0\\rangle - |1\\rangle)$$

**2. After oracle query:**

The key insight is that applying $U_f$ to $|x\\rangle|-\\rangle$ gives:

$$U_f|x\\rangle|-\\rangle = U_f|x\\rangle\\frac{|0\\rangle - |1\\rangle}{\\sqrt{2}} = |x\\rangle\\frac{|f(x)\\rangle - |1\\oplus f(x)\\rangle}{\\sqrt{2}} = (-1)^{f(x)}|x\\rangle|-\\rangle$$

This is *phase kickback*: the function value appears as a phase on the input register.

After the oracle:
$$|\\psi_2\\rangle = \\frac{1}{\\sqrt{2}}((-1)^{f(0)}|0\\rangle + (-1)^{f(1)}|1\\rangle)|-\\rangle$$

If $f$ is constant, $(-1)^{f(0)} = (-1)^{f(1)}$, so the first qubit is $\\pm|+\\rangle$.
If $f$ is balanced, $(-1)^{f(0)} = -(-1)^{f(1)}$, so the first qubit is $\\pm|-\\rangle$.

**3. Classical impossibility:**

Classically, to determine if $f$ is constant or balanced, you must query both $f(0)$ and $f(1)$. With one query, you learn only one bit of information, and both possibilities remain.

Quantum parallelism allows both values to contribute through interference, encoding the global property $f(0) \\oplus f(1)$ in a measurable phase.`,
  },
  {
    slug: "phase-kickback",
    title: "Phase Kickback Mechanism",
    difficulty: "interview",
    type: "derivation",
    topics: ["phase kickback", "controlled gates", "eigenvalues"],
    moduleRef: "Early algorithms",
    statement: `Phase kickback is a key technique in quantum algorithms. Consider a unitary $U$ with eigenvector $|u\\rangle$ and eigenvalue $e^{i\\phi}$: $U|u\\rangle = e^{i\\phi}|u\\rangle$.

Show that applying a controlled-$U$ gate with the control in state $|+\\rangle$ and target in eigenstate $|u\\rangle$ transfers the phase to the control qubit:

$$\\text{C-}U(|+\\rangle|u\\rangle) = \\frac{1}{\\sqrt{2}}(|0\\rangle + e^{i\\phi}|1\\rangle)|u\\rangle$$`,
    solution: `**Controlled-U gate action:**

The controlled-$U$ applies $U$ to the target when the control is $|1\\rangle$:

$$\\text{C-}U = |0\\rangle\\langle 0| \\otimes I + |1\\rangle\\langle 1| \\otimes U$$

**Applying to $|+\\rangle|u\\rangle$:**

$$|+\\rangle|u\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)|u\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle|u\\rangle + |1\\rangle|u\\rangle)$$

Applying C-$U$:

$$\\text{C-}U|+\\rangle|u\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle I|u\\rangle + |1\\rangle U|u\\rangle)$$

Since $|u\\rangle$ is an eigenstate with eigenvalue $e^{i\\phi}$:

$$= \\frac{1}{\\sqrt{2}}(|0\\rangle|u\\rangle + |1\\rangle e^{i\\phi}|u\\rangle)$$

$$= \\frac{1}{\\sqrt{2}}(|0\\rangle + e^{i\\phi}|1\\rangle)|u\\rangle$$

**Interpretation:**

The eigenvalue phase $e^{i\\phi}$ has been *kicked back* from the target to the control qubit. The target remains in $|u\\rangle$ unchanged, while the control now carries the phase information.

This is the foundation of quantum phase estimation: by using multiple controlled-$U^{2^k}$ gates and an inverse QFT, we can extract $\\phi$ to arbitrary precision.`,
  },
  {
    slug: "grover-iteration",
    title: "Grover's Diffusion Operator",
    difficulty: "interview",
    type: "derivation",
    topics: ["Grover's algorithm", "amplitude amplification"],
    moduleRef: "Search and amplitude amplification",
    statement: `In Grover's search, the diffusion operator is $D = 2|s\\rangle\\langle s| - I$ where $|s\\rangle = \\frac{1}{\\sqrt{N}}\\sum_{x=0}^{N-1}|x\\rangle$ is the uniform superposition.

1. Show that $D$ reflects amplitudes about their mean.
2. If before diffusion the marked state has amplitude $a_m$ and unmarked states have amplitude $a_u$, what are the amplitudes after one application of $D$?`,
    hints: [
      "The mean amplitude is $\\bar{a} = \\frac{1}{N}(a_m + (N-1)a_u)$.",
      "Reflection about mean: $a \\to 2\\bar{a} - a$.",
    ],
    solution: `**1. Reflection about mean:**

Let $|\\psi\\rangle = \\sum_x a_x|x\\rangle$ with mean amplitude $\\bar{a} = \\frac{1}{N}\\sum_x a_x$.

We can write: $|s\\rangle\\langle s|\\psi\\rangle = |s\\rangle \\cdot \\frac{1}{N}\\sum_x a_x = |s\\rangle \\cdot \\bar{a} \\cdot \\sqrt{N}$

Actually, $\\langle s|\\psi\\rangle = \\frac{1}{\\sqrt{N}}\\sum_x a_x = \\sqrt{N}\\bar{a}$.

So $|s\\rangle\\langle s|\\psi\\rangle = \\sqrt{N}\\bar{a}|s\\rangle = \\sqrt{N}\\bar{a} \\cdot \\frac{1}{\\sqrt{N}}\\sum_x|x\\rangle = \\bar{a}\\sum_x|x\\rangle$.

Applying $D$:
$$D|\\psi\\rangle = 2|s\\rangle\\langle s|\\psi\\rangle - |\\psi\\rangle = 2\\bar{a}\\sum_x|x\\rangle - \\sum_x a_x|x\\rangle = \\sum_x(2\\bar{a} - a_x)|x\\rangle$$

Each amplitude transforms as $a_x \\to 2\\bar{a} - a_x$, which is reflection about $\\bar{a}$.

**2. After one diffusion:**

Before diffusion (after oracle): marked state has $a_m$, unmarked have $a_u$.

Mean: $\\bar{a} = \\frac{a_m + (N-1)a_u}{N}$

After diffusion:
- Marked: $a_m' = 2\\bar{a} - a_m = \\frac{2(a_m + (N-1)a_u)}{N} - a_m = \\frac{(2-N)a_m + 2(N-1)a_u}{N}$
- Unmarked: $a_u' = 2\\bar{a} - a_u = \\frac{2a_m + (N-3)a_u}{N}$ (for large $N$)

For the standard case where the oracle flips the sign of the marked state ($a_m = -\\frac{1}{\\sqrt{N}}$, $a_u = \\frac{1}{\\sqrt{N}}$), this increases the marked amplitude toward 1.`,
  },
  {
    slug: "grover-optimal-iterations",
    title: "Optimal Number of Grover Iterations",
    difficulty: "interview",
    type: "derivation",
    topics: ["Grover's algorithm", "quantum speedup"],
    moduleRef: "Search and amplitude amplification",
    statement: `In Grover's algorithm searching for one marked item among $N$ items, the success probability after $k$ iterations is approximately $\\sin^2((2k+1)\\theta)$ where $\\sin\\theta = 1/\\sqrt{N}$.

1. For large $N$, what is the optimal number of iterations $k^*$?
2. What is the quantum speedup compared to classical search?
3. Why does the probability decrease if you iterate too many times?`,
    solution: `**1. Optimal iterations:**

Success probability $P(k) = \\sin^2((2k+1)\\theta)$ is maximized when $(2k+1)\\theta = \\pi/2$.

For large $N$, $\\theta \\approx \\sin\\theta = 1/\\sqrt{N}$.

$$(2k^* + 1)\\frac{1}{\\sqrt{N}} = \\frac{\\pi}{2}$$

$$k^* = \\frac{\\pi\\sqrt{N}}{4} - \\frac{1}{2} \\approx \\frac{\\pi}{4}\\sqrt{N}$$

So $k^* = O(\\sqrt{N})$ iterations are needed.

**2. Quantum speedup:**

Classical search requires $O(N)$ queries on average (or $N$ in the worst case) to find the marked item.

Grover's algorithm finds it with $O(\\sqrt{N})$ queries with high probability.

This is a **quadratic speedup**: for $N = 10^6$ items, classical needs ~500,000 queries on average, while Grover needs ~785 queries.

**3. Overshooting:**

Grover's algorithm is a rotation in a 2D subspace spanned by $|\\text{marked}\\rangle$ and $|\\text{unmarked}\\rangle$. Each iteration rotates by angle $2\\theta$.

If you iterate past the optimal point, you rotate past $\\pi/2$ and the amplitude of the marked state starts decreasing. The algorithm is *periodic*: too many iterations rotates you away from the target, eventually back toward the starting state.

This is fundamentally different from classical search, which never gets worse with more queries.`,
  },
  {
    slug: "qft-definition",
    title: "Quantum Fourier Transform",
    difficulty: "interview",
    type: "derivation",
    topics: ["QFT", "Fourier transform"],
    moduleRef: "Fourier transform, phase estimation and factoring",
    statement: `The Quantum Fourier Transform (QFT) on $n$ qubits maps basis states as:

$$\\text{QFT}|j\\rangle = \\frac{1}{\\sqrt{N}}\\sum_{k=0}^{N-1}e^{2\\pi ijk/N}|k\\rangle$$

where $N = 2^n$.

1. Show that the QFT is unitary.
2. For $n=2$ qubits, write out the full matrix.
3. What does QFT do to the state $|0\\rangle^{\\otimes n}$?`,
    hints: [
      "To show unitarity, verify $\\text{QFT}^\\dagger \\text{QFT} = I$.",
      "The $(j,k)$ entry of the matrix is $\\frac{1}{\\sqrt{N}}\\omega^{jk}$ where $\\omega = e^{2\\pi i/N}$.",
    ],
    solution: `**1. Unitarity proof:**

The matrix elements are $(\\text{QFT})_{kj} = \\frac{1}{\\sqrt{N}}e^{2\\pi ijk/N} = \\frac{1}{\\sqrt{N}}\\omega^{jk}$ where $\\omega = e^{2\\pi i/N}$.

For $\\text{QFT}^\\dagger\\text{QFT}$, entry $(j,j')$:

$$(\\text{QFT}^\\dagger\\text{QFT})_{j,j'} = \\sum_k (\\text{QFT}^\\dagger)_{jk}(\\text{QFT})_{kj'} = \\frac{1}{N}\\sum_{k=0}^{N-1}\\omega^{-jk}\\omega^{kj'}$$

$$= \\frac{1}{N}\\sum_{k=0}^{N-1}\\omega^{k(j'-j)}$$

This is a geometric series. If $j = j'$, the sum is $N$, giving 1.
If $j \\neq j'$, $\\omega^{j'-j} \\neq 1$, so $\\sum_k (\\omega^{j'-j})^k = \\frac{1 - \\omega^{N(j'-j)}}{1 - \\omega^{j'-j}} = 0$ since $\\omega^N = 1$.

Thus $\\text{QFT}^\\dagger\\text{QFT} = I$. ✓

**2. QFT for $n=2$ ($N=4$, $\\omega = e^{i\\pi/2} = i$):**

$$\\text{QFT}_4 = \\frac{1}{2}\\begin{pmatrix} 1 & 1 & 1 & 1 \\\\ 1 & i & -1 & -i \\\\ 1 & -1 & 1 & -1 \\\\ 1 & -i & -1 & i \\end{pmatrix}$$

**3. QFT on $|0\\rangle^{\\otimes n}$:**

$$\\text{QFT}|0\\rangle = \\frac{1}{\\sqrt{N}}\\sum_{k=0}^{N-1}e^0|k\\rangle = \\frac{1}{\\sqrt{N}}\\sum_{k=0}^{N-1}|k\\rangle = |+\\rangle^{\\otimes n}$$

The QFT maps the all-zeros state to the uniform superposition.`,
  },
  {
    slug: "phase-estimation-precision",
    title: "Phase Estimation Precision",
    difficulty: "interview",
    type: "conceptual",
    topics: ["phase estimation", "precision", "resource scaling"],
    moduleRef: "Fourier transform, phase estimation and factoring",
    statement: `Quantum phase estimation extracts the eigenvalue phase $\\phi$ of a unitary $U$ (where $U|u\\rangle = e^{2\\pi i\\phi}|u\\rangle$).

1. If we use $n$ qubits in the control register, to what precision can we estimate $\\phi$?
2. How many controlled-$U$ gates are needed?
3. What is the probability of getting the correct answer to $n$ bits if $\\phi$ is exactly representable?`,
    solution: `**1. Precision:**

With $n$ control qubits, the QFT extracts $\\phi$ to $n$ bits of precision.

If $\\phi = 0.\\phi_1\\phi_2\\ldots\\phi_n$ in binary, we can determine each bit.

The precision is $\\frac{1}{2^n}$. With $n=10$ qubits, we get $\\phi$ to accuracy $\\approx 0.001$ (about 3 decimal places).

**2. Gate count:**

The circuit uses controlled-$U^{2^k}$ gates for $k = 0, 1, \\ldots, n-1$.

This requires:
- 1 controlled-$U$ gate
- 1 controlled-$U^2$ gate
- ...
- 1 controlled-$U^{2^{n-1}}$ gate

If each $U^{2^k}$ can be implemented directly, that's $n$ controlled gates.
If $U^{2^k}$ requires $2^k$ applications of $U$, the total is $1 + 2 + ... + 2^{n-1} = 2^n - 1$ applications of controlled-$U$.

**3. Success probability:**

If $\\phi$ is exactly representable in $n$ bits (i.e., $\\phi = j/2^n$ for integer $j$), the QFT will produce state $|j\\rangle$ with probability 1. This is exact, not probabilistic.

If $\\phi$ is *not* exactly representable, the output is a distribution peaked around the best $n$-bit approximation, with probability at least $4/\\pi^2 \\approx 0.405$ for the closest value, and higher probability (~0.81) for one of the two closest values.`,
  },
  {
    slug: "period-finding-structure",
    title: "Period Finding and Factoring",
    difficulty: "hard",
    type: "conceptual",
    topics: ["Shor's algorithm", "period finding", "number theory"],
    moduleRef: "Fourier transform, phase estimation and factoring",
    statement: `Shor's factoring algorithm reduces factoring to period finding. For $N = pq$ (product of two primes), we pick random $a < N$ with $\\gcd(a, N) = 1$ and find the period $r$ such that $a^r \\equiv 1 \\pmod{N}$.

1. If $r$ is even and $a^{r/2} \\not\\equiv -1 \\pmod{N}$, how do we extract a factor of $N$?
2. What is the probability that a random $a$ yields a usable period?
3. For $N = 15$ and $a = 7$, find $r$ and the factors.`,
    hints: [
      "If $a^r \\equiv 1$, then $(a^{r/2} - 1)(a^{r/2} + 1) \\equiv 0 \\pmod{N}$.",
      "$\\gcd(a^{r/2} - 1, N)$ may reveal a factor.",
    ],
    solution: `**1. Extracting factors:**

If $a^r \\equiv 1 \\pmod{N}$ and $r$ is even, then:
$$(a^{r/2})^2 \\equiv 1 \\pmod{N}$$
$$(a^{r/2} - 1)(a^{r/2} + 1) \\equiv 0 \\pmod{N}$$

If $a^{r/2} \\not\\equiv \\pm 1 \\pmod{N}$, then neither factor is divisible by $N$, but their product is. This means each factor shares a non-trivial common factor with $N$.

Compute: $\\gcd(a^{r/2} - 1, N)$ and $\\gcd(a^{r/2} + 1, N)$.

At least one of these gives a non-trivial factor of $N$.

**2. Success probability:**

The probability that a random $a$ gives an even $r$ with $a^{r/2} \\not\\equiv -1 \\pmod{N}$ is at least $1 - 1/2^{k-1}$ where $k$ is the number of distinct prime factors of $N$.

For $N = pq$ (two distinct primes), $k = 2$, so probability $\\geq 1/2$.

We expect $O(1)$ random choices of $a$ before success.

**3. Example: $N = 15$, $a = 7$:**

Compute powers of 7 mod 15:
- $7^1 = 7$
- $7^2 = 49 = 4 \\pmod{15}$
- $7^3 = 28 = 13 \\pmod{15}$
- $7^4 = 91 = 1 \\pmod{15}$

Period $r = 4$ (even ✓).

$a^{r/2} = 7^2 = 4 \\not\\equiv -1 \\pmod{15}$ ✓

Compute GCDs:
- $\\gcd(4 - 1, 15) = \\gcd(3, 15) = 3$
- $\\gcd(4 + 1, 15) = \\gcd(5, 15) = 5$

Factors of 15 are **3** and **5**. ✓`,
  },
  {
    slug: "noise-channels",
    title: "Depolarizing Channel",
    difficulty: "interview",
    type: "derivation",
    topics: ["noise", "quantum channels", "density matrices"],
    moduleRef: "Noise and quantum error correction",
    statement: `The depolarizing channel with parameter $p$ replaces a qubit state $\\rho$ with the maximally mixed state $I/2$ with probability $p$:

$$\\mathcal{E}(\\rho) = (1-p)\\rho + p\\frac{I}{2}$$

1. Rewrite this in Kraus operator form $\\mathcal{E}(\\rho) = \\sum_k E_k \\rho E_k^\\dagger$.
2. What happens to a pure state $|\\psi\\rangle$ under this channel?
3. If $p = 0.1$, what is the fidelity of the output with the input for a pure state?`,
    hints: [
      "$I/2 = \\frac{1}{4}(I\\rho I + X\\rho X + Y\\rho Y + Z\\rho Z)$ for any state $\\rho$.",
    ],
    solution: `**1. Kraus form:**

Using the identity $\\frac{I}{2} = \\frac{1}{4}(\\rho + X\\rho X + Y\\rho Y + Z\\rho Z)$:

$$\\mathcal{E}(\\rho) = (1-p)\\rho + \\frac{p}{4}(\\rho + X\\rho X + Y\\rho Y + Z\\rho Z)$$

$$= (1-\\frac{3p}{4})\\rho + \\frac{p}{4}X\\rho X + \\frac{p}{4}Y\\rho Y + \\frac{p}{4}Z\\rho Z$$

The Kraus operators are:
- $E_0 = \\sqrt{1-\\frac{3p}{4}}I$
- $E_1 = \\sqrt{\\frac{p}{4}}X$
- $E_2 = \\sqrt{\\frac{p}{4}}Y$
- $E_3 = \\sqrt{\\frac{p}{4}}Z$

Verify: $\\sum_k E_k^\\dagger E_k = (1-\\frac{3p}{4})I + \\frac{p}{4}(I+I+I) = I$ ✓

**2. Effect on pure state:**

For pure $\\rho = |\\psi\\rangle\\langle\\psi|$:

$$\\mathcal{E}(|\\psi\\rangle\\langle\\psi|) = (1-p)|\\psi\\rangle\\langle\\psi| + p\\frac{I}{2}$$

The output is a *mixture* of the original pure state (with probability $1-p$) and completely random noise (probability $p$). It's no longer pure unless $p=0$.

**3. Fidelity calculation:**

Fidelity $F = \\langle\\psi|\\mathcal{E}(|\\psi\\rangle\\langle\\psi|)|\\psi\\rangle$

$$F = (1-p)\\langle\\psi|\\psi\\rangle\\langle\\psi|\\psi\\rangle + \\frac{p}{2}\\langle\\psi|\\psi\\rangle = (1-p) + \\frac{p}{2} = 1 - \\frac{p}{2}$$

For $p = 0.1$: $F = 1 - 0.05 = 0.95$ or 95% fidelity.`,
  },
  {
    slug: "bit-flip-code",
    title: "Three-Qubit Bit-Flip Code",
    difficulty: "interview",
    type: "derivation",
    topics: ["error correction", "repetition code"],
    moduleRef: "Noise and quantum error correction",
    statement: `The three-qubit bit-flip code encodes $|0\\rangle \\to |000\\rangle$ and $|1\\rangle \\to |111\\rangle$.

1. If a single bit-flip error occurs on any one qubit, how do you detect and correct it?
2. What is the logical error rate if physical bit-flip rate is $p$ per qubit?
3. Why doesn't this code protect against phase-flip errors?`,
    hints: [
      "Measure parity checks $Z_1Z_2$ and $Z_2Z_3$ without measuring individual qubits.",
      "Logical error requires at least 2 bit flips in the same direction.",
    ],
    solution: `**1. Detection and correction:**

The syndrome measurements are:
- $M_1 = Z_1 Z_2$: measures parity of qubits 1 and 2
- $M_2 = Z_2 Z_3$: measures parity of qubits 2 and 3

For codewords $|000\\rangle$ and $|111\\rangle$, both give $+1$ (even parity).

After an error, the syndrome reveals which qubit flipped:

| Error | State | $M_1$ | $M_2$ | Syndrome |
|-------|-------|-------|-------|----------|
| None | $|000\\rangle$ or $|111\\rangle$ | +1 | +1 | (0,0) |
| $X_1$ | $|100\\rangle$ or $|011\\rangle$ | -1 | +1 | (1,0) |
| $X_2$ | $|010\\rangle$ or $|101\\rangle$ | -1 | -1 | (1,1) |
| $X_3$ | $|001\\rangle$ or $|110\\rangle$ | +1 | -1 | (0,1) |

Apply $X$ to the indicated qubit to correct.

**2. Logical error rate:**

Logical error occurs when 2 or more qubits flip (majority vote fails).

$$P_{\\text{logical}} = \\binom{3}{2}p^2(1-p) + \\binom{3}{3}p^3 = 3p^2 - 2p^3 \\approx 3p^2$$

For $p = 0.01$: physical error 1%, logical error $\\approx 0.03\\%$.

The code provides a quadratic suppression of errors.

**3. No phase-flip protection:**

The code states $|000\\rangle$ and $|111\\rangle$ are eigenstates of $Z$ on each qubit.

A phase flip $Z_i$ acts as: $Z|0\\rangle = |0\\rangle$, $Z|1\\rangle = -|1\\rangle$.

$Z_1|000\\rangle = |000\\rangle$, but $Z_1|111\\rangle = -|111\\rangle$.

For superposition $\\alpha|000\\rangle + \\beta|111\\rangle$:
$$Z_1(\\alpha|000\\rangle + \\beta|111\\rangle) = \\alpha|000\\rangle - \\beta|111\\rangle$$

This is a *logical* phase flip, not a correctable error. The syndrome measurements can't detect it because they only check bit parity.`,
  },
  {
    slug: "stabilizer-formalism",
    title: "Stabilizer Codes",
    difficulty: "hard",
    type: "conceptual",
    topics: ["stabilizers", "error correction", "Pauli group"],
    moduleRef: "Noise and quantum error correction",
    statement: `The stabilizer formalism describes quantum error-correcting codes via their stabilizer group $S$: Pauli operators that leave all codewords invariant.

1. For the 3-qubit bit-flip code, what are the stabilizer generators?
2. What is the relationship between stabilizers and syndrome measurement?
3. For an $[[n,k,d]]$ stabilizer code, how many stabilizer generators are there?`,
    solution: `**1. Stabilizer generators for 3-qubit bit-flip code:**

The code space is spanned by $|000\\rangle$ and $|111\\rangle$. We need operators $S$ such that $S|\\psi_L\\rangle = |\\psi_L\\rangle$ for all logical states.

Generators:
- $S_1 = Z_1 Z_2$ (parity of qubits 1,2)
- $S_2 = Z_2 Z_3$ (parity of qubits 2,3)

Check: $Z_1Z_2|000\\rangle = (+1)(+1)|000\\rangle = |000\\rangle$ ✓
$Z_1Z_2|111\\rangle = (-1)(-1)|111\\rangle = |111\\rangle$ ✓

The full stabilizer group $S = \\{I, Z_1Z_2, Z_2Z_3, Z_1Z_3\\}$ (generated by $S_1, S_2$).

**2. Stabilizers and syndrome:**

The syndrome is the set of eigenvalues when measuring the stabilizer generators.

For codewords, all stabilizers have eigenvalue +1 by definition.

An error $E$ anticommutes with some stabilizers if it takes the state out of the code space:
$$S_i(E|\\psi\\rangle) = -E(S_i|\\psi\\rangle) = -E|\\psi\\rangle$$

The measurement of $S_i$ on the erroneous state gives $-1$ instead of $+1$.

The syndrome pattern identifies which error occurred.

**3. Number of generators:**

An $[[n, k, d]]$ code encodes $k$ logical qubits in $n$ physical qubits with distance $d$.

The code space has dimension $2^k$, which is the $+1$ eigenspace of $n-k$ independent stabilizer generators.

$n - k$ generators define $2^{n-k}$ constraints, leaving $2^n / 2^{n-k} = 2^k$ dimensional code space.

For the 3-qubit bit-flip code $[[3,1,1]]$: $n-k = 3-1 = 2$ generators ($Z_1Z_2$, $Z_2Z_3$).

Actually, the distance should be $d=3$ for single-error correction, so it's an $[[3,1,3]]$ code for bit flips only.`,
  },
  {
    slug: "threshold-theorem",
    title: "Fault-Tolerant Threshold",
    difficulty: "hard",
    type: "conceptual",
    topics: ["fault tolerance", "threshold", "concatenation"],
    moduleRef: "Noise and quantum error correction",
    statement: `The threshold theorem states that arbitrarily long quantum computation is possible if the physical error rate $p$ is below some threshold $p_{th}$.

1. Explain the basic idea of concatenated coding that proves this.
2. If a code corrects single errors and $p < p_{th}$, how does logical error rate scale with concatenation levels?
3. Why is the threshold typically around $10^{-4}$ to $10^{-2}$ depending on the code and noise model?`,
    solution: `**1. Concatenated coding idea:**

Level 0: Use physical qubits with error rate $p$.

Level 1: Encode each logical qubit in a code that corrects single errors. If physical error rate is $p$, logical error rate is $\\sim cp^2$ for some constant $c$ (errors require 2+ faults).

Level 2: Encode each Level-1 logical qubit in another layer of the same code. Logical error rate becomes $\\sim c(cp^2)^2 = c^3p^4$.

Level $k$: Error rate scales as $\\sim c^{2^k-1}p^{2^k} = \\frac{1}{c}(cp)^{2^k}$.

If $cp < 1$ (i.e., $p < p_{th} = 1/c$), error rate decreases doubly exponentially with concatenation levels.

**2. Scaling:**

For $k$ levels of concatenation with physical rate $p < p_{th}$:

$$p_L^{(k)} \\sim \\frac{1}{c}\\left(\\frac{p}{p_{th}}\\right)^{2^k}$$

Each additional level squares the exponent. To achieve error rate $\\epsilon$, need:
$$k \\sim \\log_2\\log(1/\\epsilon)$$

levels, requiring $O(\\text{poly}\\log(1/\\epsilon))$ physical qubits per logical qubit.

**3. Why $p_{th} \\sim 10^{-4}$ to $10^{-2}$:**

The threshold depends on:
- **Code choice**: surface codes have higher thresholds (~1%) than concatenated codes (~$10^{-4}$)
- **Noise model**: depolarizing noise has different threshold than biased noise
- **Fault-tolerant gadgets**: the constant $c$ depends on how carefully syndrome extraction and logical gates are designed

Realistic factors lowering threshold:
- Measurement errors
- Correlated errors
- Limited connectivity
- Leakage outside computational subspace

Current best thresholds: surface code with depolarizing noise ≈ 1%, realistic hardware models ≈ 0.1-0.5%.`,
  },
  {
    slug: "vqe-overview",
    title: "Variational Quantum Eigensolver",
    difficulty: "interview",
    type: "conceptual",
    topics: ["VQE", "variational algorithms", "hybrid"],
    moduleRef: "Variational and hybrid methods",
    statement: `The Variational Quantum Eigensolver (VQE) finds ground state energies of Hamiltonians using a hybrid quantum-classical loop.

1. What is the variational principle that VQE exploits?
2. Describe the quantum and classical components of VQE.
3. What is the barren plateau problem and why does it make VQE hard to scale?`,
    solution: `**1. Variational principle:**

For any Hamiltonian $H$ with ground state energy $E_0$:

$$\\langle\\psi|H|\\psi\\rangle \\geq E_0$$

for all normalized states $|\\psi\\rangle$, with equality iff $|\\psi\\rangle$ is a ground state.

VQE minimizes $\\langle\\psi(\\theta)|H|\\psi(\\theta)\\rangle$ over parameters $\\theta$, guaranteed to upper-bound $E_0$.

**2. Quantum-classical loop:**

**Quantum computer:**
- Prepare parameterized ansatz state $|\\psi(\\theta)\\rangle = U(\\theta)|0\\rangle^{\\otimes n}$
- Measure expectation value $\\langle H \\rangle = \\sum_i c_i \\langle P_i \\rangle$ where $H = \\sum_i c_i P_i$ (Pauli decomposition)

**Classical computer:**
- Receive energy estimate $E(\\theta)$
- Use optimizer (gradient descent, COBYLA, etc.) to suggest new $\\theta'$
- Iterate until convergence

The quantum computer evaluates the cost function; classical computer optimizes it.

**3. Barren plateaus:**

As circuit depth or qubit count grows, the variance of the cost function gradient typically vanishes exponentially:

$$\\text{Var}_{\\theta}[\\partial_i E(\\theta)] \\sim e^{-\\alpha n}$$

This means:
- Gradients are exponentially small
- Finite-sample estimates are dominated by shot noise
- Optimization landscape becomes flat ("barren")

**Causes:**
- Random initialization in high-dimensional space
- Highly entangling ansätze
- Global cost functions

**Mitigations:**
- Structured ansätze (hardware-efficient, problem-inspired)
- Layer-wise training
- Local cost functions
- Good initialization strategies

This is a major challenge for scaling VQE beyond ~20-50 qubits on current hardware.`,
  },
  {
    slug: "qaoa-maxcut",
    title: "QAOA for Max-Cut",
    difficulty: "hard",
    type: "derivation",
    topics: ["QAOA", "optimization", "combinatorial"],
    moduleRef: "Variational and hybrid methods",
    statement: `The Quantum Approximate Optimization Algorithm (QAOA) encodes the Max-Cut problem for a graph $G=(V,E)$ with cost function:

$$C = \\sum_{(i,j)\\in E} \\frac{1-Z_iZ_j}{2}$$

where $Z_i Z_j = +1$ if vertices $i,j$ are in the same partition, $-1$ if different.

1. What is the QAOA circuit structure for depth $p$?
2. For a triangle graph, what is the maximum cut and what state achieves it?
3. Why does QAOA performance improve with depth $p$?`,
    hints: [
      "QAOA alternates between cost unitary $e^{-i\\gamma C}$ and mixer unitary $e^{-i\\beta B}$ where $B = \\sum_i X_i$.",
    ],
    solution: `**1. QAOA circuit:**

The $p$-layer QAOA circuit:

1. Initialize $|+\\rangle^{\\otimes n}$ (uniform superposition over all cuts)
2. For $l = 1, \\ldots, p$:
   - Apply cost unitary: $U_C(\\gamma_l) = e^{-i\\gamma_l C} = \\prod_{(i,j)\\in E} e^{-i\\gamma_l(1-Z_iZ_j)/2}$
   - Apply mixer unitary: $U_B(\\beta_l) = e^{-i\\beta_l B} = \\prod_i e^{-i\\beta_l X_i}$
3. Measure in computational basis

The state is $|\\gamma, \\beta\\rangle = U_B(\\beta_p)U_C(\\gamma_p)\\cdots U_B(\\beta_1)U_C(\\gamma_1)|+\\rangle^{\\otimes n}$.

Optimize $2p$ parameters $(\\gamma_1,\\ldots,\\gamma_p,\\beta_1,\\ldots,\\beta_p)$ to maximize $\\langle C \\rangle$.

**2. Triangle graph:**

Triangle has 3 vertices, 3 edges. Each cut removes some edges.

- Cut 0 vertices from rest: 0 edges cut
- Cut 1 vertex from rest: 2 edges cut (the two edges from that vertex)
- Any partition: at most 2 edges

**Max cut = 2**, achieved by any state $|001\\rangle, |010\\rangle, |100\\rangle, |110\\rangle, |101\\rangle, |011\\rangle$ (one vertex separated from two).

Verify: $C|100\\rangle = \\frac{1}{2}[(1-Z_1Z_2) + (1-Z_2Z_3) + (1-Z_1Z_3)]|100\\rangle$
$= \\frac{1}{2}[(1-(-1)) + (1-(+1)) + (1-(-1))]|100\\rangle = \\frac{1}{2}[2+0+2]|100\\rangle = 2|100\\rangle$ ✓

**3. Why depth helps:**

- $p=1$ QAOA has limited expressibility; can only approximate the optimal solution
- As $p \\to \\infty$, QAOA can prepare any state via Trotterization of adiabatic evolution
- Higher $p$ allows finer interference patterns that concentrate amplitude on optimal cuts
- Theoretically, $p = O(n)$ suffices for exact solution on some graphs

Practically, increasing $p$ helps until noise or optimization difficulty dominates.`,
  },
  {
    slug: "implement-toffoli",
    title: "Decomposing the Toffoli Gate",
    difficulty: "interview",
    type: "coding",
    topics: ["Toffoli", "gate decomposition", "universal gates"],
    moduleRef: "Gates and circuits",
    statement: `The Toffoli (CCNOT) gate flips the third qubit if and only if the first two qubits are both $|1\\rangle$:

$$|a,b,c\\rangle \\to |a,b,c \\oplus (a \\land b)\\rangle$$

It cannot be directly implemented on most hardware. Decompose it into single-qubit gates and CNOTs.

Write pseudocode or a circuit description for the decomposition.`,
    hints: [
      "Use the fact that controlled-$V$ where $V^2 = X$ and controlled-$V^\\dagger$ can help.",
      "The gate $V = \\sqrt{X}$ satisfies $V^2 = X$.",
    ],
    solution: `**Standard decomposition using 6 CNOTs:**

The Toffoli can be decomposed using the controlled-$\\sqrt{X}$ idea:

\`\`\`text
q0: ─────────────●───────────────●───────●───T───●───
                 │               │       │       │
q1: ───●─────────┼───●───────────┼───●───┼───T───┼───
       │         │   │           │   │   │       │
q2: ───X───T†────X───X───T───────X───X───T†──────X───H───T†───H
\`\`\`

Actually, here's a cleaner 6-CNOT decomposition:

\`\`\`python
def toffoli_decomposition():
    # T = pi/8 gate, T† = adjoint
    # H = Hadamard
    
    # On target qubit (q2):
    H(q2)
    
    # Controlled phase accumulation
    CNOT(q1, q2)
    Tdg(q2)      # T†
    CNOT(q0, q2)
    T(q2)
    CNOT(q1, q2)
    Tdg(q2)
    CNOT(q0, q2)
    T(q2)
    T(q1)
    H(q2)
    
    # Phase correction on controls
    CNOT(q0, q1)
    T(q0)
    Tdg(q1)
    CNOT(q0, q1)
\`\`\`

**Why this works:**

The key insight is that Toffoli = controlled-controlled-X can be built by accumulating a controlled-controlled-Z phase and converting via Hadamard:

$\\text{CCX} = (I \\otimes I \\otimes H) \\cdot \\text{CCZ} \\cdot (I \\otimes I \\otimes H)$

The CCZ phase $e^{i\\pi|111\\rangle\\langle 111|}$ is built by carefully combining T and T† gates with CNOTs so only the $|111\\rangle$ state accumulates the full $\\pi$ phase.

**Gate count:** 6 CNOTs, 7 T/T† gates, 2 Hadamards. This is known to be optimal for the CNOT count.`,
  },
  {
    slug: "implement-swap",
    title: "SWAP from CNOTs",
    difficulty: "warm-up",
    type: "coding",
    topics: ["SWAP", "CNOT", "circuit identities"],
    moduleRef: "Gates and circuits",
    statement: `The SWAP gate exchanges two qubits: $|a,b\\rangle \\to |b,a\\rangle$.

1. Show that SWAP = CNOT(1,2) · CNOT(2,1) · CNOT(1,2) where CNOT(i,j) has i as control, j as target.
2. Implement this in Qiskit-style pseudocode.`,
    solution: `**1. Verification:**

Let's trace through the three CNOTs on basis states:

CNOT(1,2): $|a,b\\rangle \\to |a, b \\oplus a\\rangle$
CNOT(2,1): $|a, b \\oplus a\\rangle \\to |a \\oplus (b \\oplus a), b \\oplus a\\rangle = |b, a \\oplus b\\rangle$
CNOT(1,2): $|b, a \\oplus b\\rangle \\to |b, (a \\oplus b) \\oplus b\\rangle = |b, a\\rangle$

Final state: $|b, a\\rangle$ ✓

This is the XOR swap trick from classical computing!

**2. Qiskit-style code:**

\`\`\`python
from qiskit import QuantumCircuit

def swap_from_cnots(qc: QuantumCircuit, q0: int, q1: int):
    """Implement SWAP(q0, q1) using 3 CNOTs."""
    qc.cx(q0, q1)  # CNOT with q0 control, q1 target
    qc.cx(q1, q0)  # CNOT with q1 control, q0 target
    qc.cx(q0, q1)  # CNOT with q0 control, q1 target

# Example usage:
qc = QuantumCircuit(2)
qc.x(0)  # Prepare |10⟩
swap_from_cnots(qc, 0, 1)
# Now in state |01⟩

# Verify:
qc = QuantumCircuit(2)
swap_from_cnots(qc, 0, 1)
print(qc.draw())
# Output:
#      ┌───┐     ┌───┐
# q_0: ┤ X ├──■──┤ X ├
#      └─┬─┘┌─┴─┐└─┬─┘
# q_1: ──■──┤ X ├──■──
#           └───┘
\`\`\`

**Note:** Most quantum hardware doesn't support all-to-all connectivity, so implementing SWAP between non-adjacent qubits may require routing through intermediate qubits. SWAP is a common primitive in circuit compilation.`,
  },
  {
    slug: "quantum-teleportation",
    title: "Quantum Teleportation Protocol",
    difficulty: "interview",
    type: "derivation",
    topics: ["teleportation", "entanglement", "classical communication"],
    moduleRef: "Gates and circuits",
    statement: `In quantum teleportation, Alice wants to send an unknown qubit $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ to Bob. They share a Bell pair.

1. Write out the full protocol with the circuit.
2. Show why Bob needs 2 classical bits from Alice.
3. After teleportation, what happens to Alice's original qubit?`,
    solution: `**1. Protocol:**

**Setup:** Alice has qubit A in state $|\\psi\\rangle$. Alice and Bob share qubits 2 and 3 in Bell state $|\\Phi^+\\rangle_{23} = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$.

**Initial state:**
$$|\\psi\\rangle_A \\otimes |\\Phi^+\\rangle_{23} = (\\alpha|0\\rangle + \\beta|1\\rangle)_A \\otimes \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)_{23}$$

**Alice's operations:**
1. CNOT(A, 2): Alice's qubit controls qubit 2
2. Hadamard on A
3. Measure both A and 2 in computational basis

**After CNOT and H, the state is:**
$$\\frac{1}{2}[|00\\rangle_A(\\alpha|0\\rangle + \\beta|1\\rangle)_3 + |01\\rangle_A(\\alpha|1\\rangle + \\beta|0\\rangle)_3 + |10\\rangle_A(\\alpha|0\\rangle - \\beta|1\\rangle)_3 + |11\\rangle_A(\\alpha|1\\rangle - \\beta|0\\rangle)_3]$$

**Bob's correction based on measurement outcome:**
| Alice measures | Bob's state | Bob applies |
|----------------|-------------|-------------|
| 00 | $\\alpha|0\\rangle + \\beta|1\\rangle$ | I (nothing) |
| 01 | $\\alpha|1\\rangle + \\beta|0\\rangle$ | X |
| 10 | $\\alpha|0\\rangle - \\beta|1\\rangle$ | Z |
| 11 | $\\alpha|1\\rangle - \\beta|0\\rangle$ | ZX |

**2. Why 2 classical bits:**

There are 4 possible outcomes of Alice's two measurements, requiring 2 bits to specify. Each outcome corresponds to a different Pauli correction Bob must apply. Without knowing which, Bob's state is completely mixed.

**3. Alice's qubit after teleportation:**

Alice's measurement collapses her qubits to a computational basis state ($|00\\rangle$, $|01\\rangle$, $|10\\rangle$, or $|11\\rangle$). The original superposition $|\\psi\\rangle$ is *destroyed* at Alice's location.

This is consistent with the no-cloning theorem: the quantum information moved from Alice to Bob, it wasn't copied. No information travels faster than light because Bob can't use his qubit until he receives Alice's classical bits.`,
  },
  {
    slug: "superdense-coding",
    title: "Superdense Coding",
    difficulty: "interview",
    type: "derivation",
    topics: ["superdense coding", "entanglement", "information"],
    moduleRef: "Gates and circuits",
    statement: `Superdense coding allows Alice to send 2 classical bits to Bob using 1 qubit, given they share entanglement.

1. Describe the protocol.
2. How does Alice encode her 2 bits?
3. Why can't Alice send more than 2 bits per qubit?`,
    solution: `**1. Protocol:**

**Setup:** Alice and Bob share the Bell state $|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$. Alice has qubit 1, Bob has qubit 2.

**Encoding (Alice):**
Alice applies one of four operations to her qubit based on the 2 bits she wants to send:

| Bits | Alice's operation | Resulting state |
|------|-------------------|-----------------|
| 00 | I | $\\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle) = |\\Phi^+\\rangle$ |
| 01 | X | $\\frac{1}{\\sqrt{2}}(|10\\rangle + |01\\rangle) = |\\Psi^+\\rangle$ |
| 10 | Z | $\\frac{1}{\\sqrt{2}}(|00\\rangle - |11\\rangle) = |\\Phi^-\\rangle$ |
| 11 | ZX | $\\frac{1}{\\sqrt{2}}(|10\\rangle - |01\\rangle) = |\\Psi^-\\rangle$ |

**Transmission:** Alice sends her qubit to Bob.

**Decoding (Bob):**
Bob now has both qubits. He performs a Bell measurement:
1. CNOT(1,2)
2. Hadamard on qubit 1
3. Measure both qubits

The measurement outcome directly gives Alice's 2 bits.

**2. Encoding mechanism:**

Alice's Pauli operations transform between the four Bell states, which form an orthonormal basis. Each Bell state encodes a different 2-bit message.

**3. Why at most 2 bits:**

Holevo's theorem states that $n$ qubits can communicate at most $n$ classical bits, regardless of entanglement assistance.

The superdense coding scenario:
- Alice sends 1 qubit → at most 1 bit of capacity (Holevo bound)
- But with pre-shared entanglement (Bob's qubit was correlated from the start), the effective dimension available is $2 \\times 2 = 4$

The entanglement was established earlier at the cost of sending 1 qubit. Total resources: 2 qubits sent (1 for entanglement setup, 1 for the message) = 2 bits capacity. No free lunch!`,
  },
  {
    slug: "no-cloning-proof",
    title: "No-Cloning Theorem",
    difficulty: "interview",
    type: "derivation",
    topics: ["no-cloning", "linearity", "unitarity"],
    moduleRef: "Linear algebra and single qubits",
    statement: `Prove that there is no unitary operation $U$ that can clone an arbitrary quantum state:

$$U|\\psi\\rangle|0\\rangle = |\\psi\\rangle|\\psi\\rangle$$

for all $|\\psi\\rangle$.`,
    hints: [
      "Consider what happens when you try to clone two different states and use linearity.",
      "Unitaries preserve inner products.",
    ],
    solution: `**Proof by contradiction:**

Suppose such a unitary $U$ exists. For any state $|\\psi\\rangle$:
$$U|\\psi\\rangle|0\\rangle = |\\psi\\rangle|\\psi\\rangle$$

Consider two non-orthogonal states $|\\psi\\rangle$ and $|\\phi\\rangle$ with $\\langle\\psi|\\phi\\rangle = c \\neq 0, 1$.

By assumption:
- $U|\\psi\\rangle|0\\rangle = |\\psi\\rangle|\\psi\\rangle$
- $U|\\phi\\rangle|0\\rangle = |\\phi\\rangle|\\phi\\rangle$

**Using unitarity (inner product preservation):**

$$\\langle\\psi|\\langle 0|U^\\dagger U|\\phi\\rangle|0\\rangle = \\langle\\psi|\\phi\\rangle\\langle 0|0\\rangle = c$$

But also:
$$\\langle\\psi|\\langle\\psi|\\phi\\rangle|\\phi\\rangle = \\langle\\psi|\\phi\\rangle\\langle\\psi|\\phi\\rangle = c^2$$

So we need $c = c^2$, which means $c(1-c) = 0$, so $c = 0$ or $c = 1$.

This contradicts our assumption that $|\\psi\\rangle$ and $|\\phi\\rangle$ are non-orthogonal and non-identical.

**Conclusion:**

A universal cloning machine cannot exist. You can only clone states from an orthogonal set (which is equivalent to classical copying).

**Physical interpretation:**

If cloning were possible, you could:
1. Clone a qubit many times
2. Measure the copies in different bases
3. Determine the state exactly, violating the uncertainty principle

No-cloning is fundamental to quantum cryptography (eavesdroppers can't copy qubits) and the irreversibility of measurement.`,
  },
  {
    slug: "quantum-parallelism",
    title: "Quantum Parallelism Limitations",
    difficulty: "interview",
    type: "conceptual",
    topics: ["quantum parallelism", "measurement", "speedup"],
    moduleRef: "Early algorithms",
    statement: `A quantum computer can evaluate a function $f$ on all $2^n$ inputs simultaneously:

$$|0\\rangle^{\\otimes n}|0\\rangle \\xrightarrow{H^{\\otimes n}} \\frac{1}{\\sqrt{2^n}}\\sum_{x=0}^{2^n-1}|x\\rangle|0\\rangle \\xrightarrow{U_f} \\frac{1}{\\sqrt{2^n}}\\sum_{x=0}^{2^n-1}|x\\rangle|f(x)\\rangle$$

1. Why can't you just measure to get all $f(x)$ values?
2. What types of problems can still benefit from quantum parallelism?
3. Give an example of a problem that quantum parallelism doesn't help.`,
    solution: `**1. Measurement limitation:**

When you measure the final state $\\frac{1}{\\sqrt{2^n}}\\sum_x |x\\rangle|f(x)\\rangle$, you collapse to a single $|x\\rangle|f(x)\\rangle$ with probability $\\frac{1}{2^n}$ each.

You get ONE random $(x, f(x))$ pair, not all of them!

To get all $2^n$ values, you'd need to repeat $2^n$ times, which is no better than classical.

**2. Problems that benefit:**

Quantum parallelism helps when you want **global properties** of $f$ that can be extracted through **interference**:

- **Structure finding**: period of $f$ (Shor), whether $f$ is constant/balanced (Deutsch-Jozsa)
- **Search with structure**: finding marked items (Grover), though only quadratic speedup
- **Sampling**: generating samples from distributions hard to sample classically (boson sampling)

The key is designing the algorithm so that:
1. Wrong answers interfere destructively
2. Right answers interfere constructively

**3. Problems without quantum speedup:**

**Example: Finding the maximum of an unstructured function**

Given oracle access to $f:\\{0,1\\}^n \\to \\mathbb{R}$, find $\\arg\\max_x f(x)$.

Classically: Need to query all $2^n$ values in worst case.
Quantumly: Grover can find the maximum with $O(\\sqrt{2^n})$ queries, but this requires knowing the maximum value or doing iterative search.

**Example: Counting distinct values**

Quantum parallelism doesn't help count how many distinct values $f$ takes, beyond quadratic improvements.

The lesson: quantum speedup requires exploiting problem structure, not just "trying everything at once."`,
  },
  {
    slug: "implement-grover-oracle",
    title: "Implementing a Grover Oracle",
    difficulty: "interview",
    type: "coding",
    topics: ["Grover's algorithm", "oracle", "circuit design"],
    moduleRef: "Search and amplitude amplification",
    statement: `Design an oracle circuit for Grover's algorithm that marks the state $|101\\rangle$ (i.e., applies a phase of $-1$ to $|101\\rangle$ and $+1$ to all other states) for a 3-qubit system.

Write the circuit using only X, H, and multi-controlled Z (CCZ) gates.`,
    hints: [
      "To mark $|101\\rangle$, you need CCZ to trigger when qubits are in state 1, 0, 1 respectively.",
      "Use X gates to convert the problem to marking $|111\\rangle$.",
    ],
    solution: `**Strategy:**

The CCZ gate applies a $-1$ phase when all three qubits are $|1\\rangle$:
$$\\text{CCZ}|111\\rangle = -|111\\rangle$$

To mark $|101\\rangle$ instead, we:
1. Flip qubit 2 (the middle one that should be 0)
2. Apply CCZ
3. Unflip qubit 2

**Circuit:**

\`\`\`text
q0: ─────●─────
         │
q1: ──X──●──X──
         │
q2: ─────●─────
        CCZ
\`\`\`

**Pseudocode:**

\`\`\`python
def grover_oracle_101(qc, q0, q1, q2):
    """Oracle that marks |101⟩ with phase -1."""
    # Flip q1 so |101⟩ becomes |111⟩
    qc.x(q1)
    
    # CCZ marks |111⟩
    qc.ccz(q0, q1, q2)
    
    # Unflip q1 to restore
    qc.x(q1)

# If CCZ is not native, decompose it:
# CCZ = H(target) · Toffoli · H(target)
def ccz_from_toffoli(qc, q0, q1, q2):
    qc.h(q2)
    qc.ccx(q0, q1, q2)  # Toffoli
    qc.h(q2)
\`\`\`

**Verification:**

Let's check on basis states:
- $|000\\rangle$: X on q1 gives $|010\\rangle$, CCZ does nothing, X gives $|000\\rangle$ ✓
- $|101\\rangle$: X on q1 gives $|111\\rangle$, CCZ gives $-|111\\rangle$, X gives $-|101\\rangle$ ✓
- $|111\\rangle$: X on q1 gives $|101\\rangle$, CCZ does nothing, X gives $|111\\rangle$ ✓

**General pattern:**

To mark arbitrary state $|a_0 a_1 a_2\\rangle$:
- Apply X to qubit $i$ if $a_i = 0$
- Apply CCZ (or multi-controlled Z for more qubits)
- Apply X again to restore

For multiple marked states, use separate oracle calls or more sophisticated constructions.`,
  },
  {
    slug: "implement-qft",
    title: "Implementing the QFT Circuit",
    difficulty: "hard",
    type: "coding",
    topics: ["QFT", "circuit implementation", "controlled rotations"],
    moduleRef: "Fourier transform, phase estimation and factoring",
    statement: `Implement the Quantum Fourier Transform for $n$ qubits using the standard circuit decomposition.

The QFT can be written as a product of Hadamards and controlled phase rotations:

$$\\text{QFT}|j\\rangle = \\frac{1}{\\sqrt{2^n}}\\sum_{k=0}^{2^n-1}e^{2\\pi ijk/2^n}|k\\rangle$$

Write pseudocode for the circuit and explain the gate sequence.`,
    solution: `**Circuit structure:**

The QFT decomposes into a cascade of Hadamard gates and controlled rotations $R_k = \\begin{pmatrix} 1 & 0 \\\\ 0 & e^{2\\pi i/2^k} \\end{pmatrix}$.

**Algorithm:**

For $n$ qubits labeled $0, 1, \\ldots, n-1$ (most significant to least):

\`\`\`python
def qft(qc, n):
    """Apply QFT to first n qubits of circuit qc."""
    
    for j in range(n):
        # Hadamard on qubit j
        qc.h(j)
        
        # Controlled rotations from qubits j+1, j+2, ..., n-1
        for k in range(j + 1, n):
            # Controlled R_{k-j+1} with control=k, target=j
            angle = 2 * pi / (2 ** (k - j + 1))
            qc.cp(angle, k, j)  # controlled phase
    
    # Swap qubits to reverse order (QFT convention)
    for j in range(n // 2):
        qc.swap(j, n - 1 - j)
\`\`\`

**Example for n=3:**

\`\`\`text
q0: ──H──R2──R3────────────×───
              │    │       │
q1: ─────────●────│──H──R2─┼───
                  │     │  │
q2: ──────────────●─────●──×───
\`\`\`

Where R2 = phase($\\pi/2$), R3 = phase($\\pi/4$).

**Gate count:**

- $n$ Hadamard gates
- $\\frac{n(n-1)}{2}$ controlled rotations
- $\\lfloor n/2 \\rfloor$ SWAPs (each = 3 CNOTs)

Total: $O(n^2)$ gates, which is exponentially better than the classical FFT's $O(n \\cdot 2^n)$ operations on the full state vector.

**Why this works:**

The QFT can be written in product form:

$$\\text{QFT}|j_1 j_2 \\ldots j_n\\rangle = \\frac{1}{\\sqrt{2^n}}(|0\\rangle + e^{2\\pi i 0.j_n}|1\\rangle) \\otimes (|0\\rangle + e^{2\\pi i 0.j_{n-1}j_n}|1\\rangle) \\otimes \\cdots$$

Each Hadamard creates the superposition, and the controlled rotations accumulate the correct phases based on the binary representation of the input.`,
  },
  {
    slug: "surface-code-basics",
    title: "Surface Code Structure",
    difficulty: "hard",
    type: "conceptual",
    topics: ["surface code", "topological codes", "error correction"],
    moduleRef: "Noise and quantum error correction",
    statement: `The surface code is a leading candidate for fault-tolerant quantum computing.

1. How are data qubits and syndrome qubits arranged in a distance-$d$ surface code?
2. What stabilizers are measured and what errors do they detect?
3. Why does the surface code have a high threshold (~1%) compared to other codes?`,
    hints: [
      "The surface code is defined on a 2D lattice with two types of plaquettes.",
      "X-type stabilizers detect Z errors; Z-type stabilizers detect X errors.",
    ],
    solution: `**1. Lattice structure:**

A distance-$d$ surface code uses a $(d \\times d)$ grid:
- **Data qubits**: placed on edges of the lattice
- **X stabilizer qubits**: at plaquette centers (measure $X$ products)
- **Z stabilizer qubits**: at vertices (measure $Z$ products)

For distance $d$:
- Number of data qubits: $n = 2d^2 - 2d + 1 \\approx 2d^2$
- Encodes $k = 1$ logical qubit
- Minimum weight of logical operator: $d$

**2. Stabilizers:**

**X-type (plaquette) stabilizers:**
$$A_p = \\prod_{i \\in \\text{plaquette } p} X_i$$

Measures product of $X$ on 4 data qubits around each plaquette. Detects Z errors (phase flips).

**Z-type (vertex) stabilizers:**
$$B_v = \\prod_{i \\in \\text{vertex } v} Z_i$$

Measures product of $Z$ on 4 data qubits touching each vertex. Detects X errors (bit flips).

**Syndrome interpretation:**
- Z error creates pair of $-1$ syndromes on adjacent X stabilizers
- X error creates pair of $-1$ syndromes on adjacent Z stabilizers
- Errors form "strings"; syndromes mark endpoints

**3. High threshold:**

The surface code achieves ~0.5-1% threshold because:

**Locality:**
- Each stabilizer involves only 4 (or 3 at boundaries) data qubits
- Syndrome extraction circuits are shallow
- Errors don't propagate far

**Topological protection:**
- Logical errors require error chains spanning the entire code (length $d$)
- Random errors create small clusters that are unlikely to span
- Minimum Weight Perfect Matching decoding efficiently corrects errors

**Simple measurements:**
- Only weight-4 Pauli measurements needed
- Compatible with nearest-neighbor connectivity (superconducting qubits)
- Measurement errors handled by repeated measurement

**Comparison:**
- Steane code [[7,1,3]]: threshold ~$10^{-4}$ to $10^{-5}$
- Surface code: threshold ~$10^{-2}$
- 100× improvement makes near-term fault tolerance feasible`,
  },
  {
    slug: "decoding-algorithms",
    title: "Minimum Weight Perfect Matching",
    difficulty: "hard",
    type: "conceptual",
    topics: ["decoding", "MWPM", "surface code"],
    moduleRef: "Noise and quantum error correction",
    statement: `Minimum Weight Perfect Matching (MWPM) is the standard decoder for surface codes.

1. How does MWPM convert syndrome data into a correction?
2. What is the time complexity of MWPM?
3. What are the limitations of MWPM and what alternatives exist?`,
    solution: `**1. MWPM algorithm:**

**Problem setup:**
- Syndrome measurement reveals locations with eigenvalue $-1$
- Z (X) errors create pairs of syndromes on X (Z) stabilizers
- Need to infer which pairs are connected by errors

**Graph construction:**
1. Create a node for each $-1$ syndrome
2. Add boundary nodes (errors can terminate at boundaries)
3. Add edges between all pairs with weight = minimum number of physical errors connecting them
4. Weight typically uses $-\\log(p)$ where $p$ is error probability

**Matching:**
1. Find minimum weight perfect matching (every node paired exactly once)
2. The matching implies error chains connecting syndrome pairs
3. Apply correction along these chains

**Example:**
If syndromes appear at positions A and B, and MWPM pairs them, apply corrections along shortest path from A to B.

**2. Time complexity:**

The classic Edmonds' blossom algorithm: $O(V^3)$ where $V$ = number of syndrome defects.

For a distance-$d$ code with error rate $p$:
- Expected defects: $O(pd^2)$
- Worst case: $O(p^3 d^6)$

Practical improvements:
- Union-Find decoder: nearly linear time $O(V \\alpha(V))$
- Sparse blossom: efficient for low error rates

**3. Limitations and alternatives:**

**MWPM limitations:**
- Assumes independent errors (not correlated)
- Optimal only for certain noise models
- Doesn't use full probability information

**Alternatives:**

**Union-Find:** $O(n \\alpha(n))$ time, slightly lower threshold, good for real-time decoding.

**Neural network decoders:** Train to recognize error patterns, can handle correlated noise, but require training data.

**Maximum likelihood:** Optimal but exponentially hard; practical approximations via tensor networks.

**Belief propagation:** Message passing on factor graph, iterative, struggles with short cycles in surface code.

For near-term devices, Union-Find or hardware-accelerated MWPM are likely choices due to strict latency requirements (decode faster than error rate).`,
  },
  {
    slug: "t-gate-magic",
    title: "T Gate and Magic State Distillation",
    difficulty: "hard",
    type: "conceptual",
    topics: ["T gate", "magic states", "fault tolerance"],
    moduleRef: "Noise and quantum error correction",
    statement: `The T gate ($\\pi/8$ rotation) is essential for universal quantum computation but cannot be implemented transversally in CSS codes.

1. Why is the T gate "hard" for fault-tolerant implementation?
2. What is magic state distillation and why is it expensive?
3. What is the overhead for a single fault-tolerant T gate?`,
    solution: `**1. Why T is hard:**

**Eastin-Knill theorem:** No quantum error-correcting code can implement a universal gate set transversally (applying logical gate by applying same gate to each physical qubit).

For CSS codes like the surface code:
- Clifford gates (H, S, CNOT) can be done transversally or via lattice surgery
- T gate is non-Clifford, essential for universality
- Transversal T would propagate errors uncontrollably

The T gate completes the universal set: Clifford + T can approximate any unitary to arbitrary precision (Solovay-Kitaev theorem).

**2. Magic state distillation:**

**Idea:** Prepare "magic states" $|T\\rangle = T|+\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + e^{i\\pi/4}|1\\rangle)$ and use them to implement T gates via Clifford operations + measurement.

**Gate teleportation:**
Given $|T\\rangle$ and target state $|\\psi\\rangle$:
1. Apply CNOT from $|\\psi\\rangle$ to $|T\\rangle$
2. Measure $|T\\rangle$ in X basis
3. Apply S correction based on measurement

This consumes one $|T\\rangle$ per T gate.

**Distillation:**
Noisy magic states can be purified:
- Input: $k$ copies of $|T\\rangle$ with error rate $p$
- Output: 1 copy with error rate $O(p^2)$ or better
- Common: 15-to-1 distillation (15 noisy → 1 clean)

**3. Overhead:**

For a single logical T gate with error rate $\\epsilon$:

**Space (qubits):**
- Need $O(\\log^\\gamma(1/\\epsilon))$ levels of distillation, $\\gamma \\approx 2-3$
- Each level requires $O(d^2)$ physical qubits for surface code
- Total: thousands of physical qubits per logical T gate

**Time:**
- Distillation takes $O(d)$ code cycles per level
- Multiple levels needed for high precision

**Concrete estimates:**
For surface code with physical error rate $10^{-3}$, logical error rate $10^{-15}$:
- ~1000 physical qubits per logical qubit
- ~1000 additional qubits for T-factory
- T gate takes ~100× longer than Clifford gates

This overhead is why T-count (number of T gates) is a key metric for quantum algorithm efficiency.`,
  },
  {
    slug: "quantum-simulation",
    title: "Hamiltonian Simulation",
    difficulty: "hard",
    type: "conceptual",
    topics: ["simulation", "Trotterization", "product formulas"],
    moduleRef: "Variational and hybrid methods",
    statement: `Simulating the time evolution $e^{-iHt}$ of a quantum Hamiltonian is a primary application of quantum computers.

1. For $H = H_1 + H_2$ where $[H_1, H_2] \\neq 0$, explain the Trotter-Suzuki approximation.
2. What is the error of first-order Trotterization?
3. What determines whether quantum simulation provides exponential speedup?`,
    hints: [
      "The BCH formula: $e^A e^B = e^{A+B+[A,B]/2+\\ldots}$",
    ],
    solution: `**1. Trotter-Suzuki approximation:**

For $H = H_1 + H_2$:
$$e^{-i(H_1+H_2)t} \\neq e^{-iH_1 t}e^{-iH_2 t}$$

unless $[H_1, H_2] = 0$.

**First-order Trotter:**
$$e^{-i(H_1+H_2)t} \\approx \\left(e^{-iH_1 t/r}e^{-iH_2 t/r}\\right)^r$$

Divide time into $r$ small steps. Each step has small error.

**Second-order Trotter (symmetric):**
$$e^{-i(H_1+H_2)t} \\approx \\left(e^{-iH_1 t/2r}e^{-iH_2 t/r}e^{-iH_1 t/2r}\\right)^r$$

Symmetric form cancels first-order error.

**2. Error analysis:**

Using Baker-Campbell-Hausdorff:
$$e^{A}e^{B} = e^{A+B+\\frac{1}{2}[A,B]+\\frac{1}{12}([A,[A,B]]+[B,[B,A]])+\\ldots}$$

**First-order error:**
For one Trotter step with $A = -iH_1\\delta t$, $B = -iH_2\\delta t$:
$$\\text{Error} \\sim \\frac{(\\delta t)^2}{2}\\|[H_1, H_2]\\|$$

After $r$ steps with $\\delta t = t/r$:
$$\\text{Total error} \\sim r \\cdot \\frac{(t/r)^2}{2}\\|[H_1, H_2]\\| = \\frac{t^2\\|[H_1, H_2]\\|}{2r}$$

To achieve error $\\epsilon$: need $r = O(t^2\\|[H_1, H_2]\\|/\\epsilon)$ steps.

**Second-order error:** $O(t^3/r^2)$, so $r = O(t^{3/2}/\\sqrt{\\epsilon})$.

**3. Speedup conditions:**

Quantum simulation has exponential speedup when:

**Efficient Hamiltonian decomposition:**
- $H = \\sum_j H_j$ with polynomially many terms
- Each $e^{-iH_j t}$ efficiently implementable

**Examples with speedup:**
- Local Hamiltonians (each $H_j$ acts on few qubits)
- Fermionic systems via Jordan-Wigner
- Sparse Hamiltonians

**No exponential speedup:**
- Hamiltonians requiring exponentially many terms
- Systems where classical simulation is already efficient (e.g., 1D gapped systems via DMRG)

**Key insight:** The quantum computer's advantage comes from representing the $2^n$-dimensional state vector implicitly in $n$ qubits, avoiding the classical exponential blowup.`,
  },
  {
    slug: "quantum-chemistry-encoding",
    title: "Encoding Fermions for VQE",
    difficulty: "hard",
    type: "conceptual",
    topics: ["quantum chemistry", "Jordan-Wigner", "fermion encoding"],
    moduleRef: "Variational and hybrid methods",
    statement: `Quantum chemistry applications require encoding fermionic Hamiltonians on qubits.

1. Why can't you directly map fermion modes to qubits?
2. Explain the Jordan-Wigner transformation.
3. What is the qubit overhead for simulating a molecule with $N$ spin-orbitals?`,
    solution: `**1. The sign problem:**

Fermions obey anticommutation relations:
$$\\{a_i, a_j^\\dagger\\} = \\delta_{ij}, \\quad \\{a_i, a_j\\} = 0$$

Qubits naturally represent bosons (commuting operators).

If you naively map $|1\\rangle$ = occupied, $|0\\rangle$ = empty, the operators $a_i^\\dagger a_j$ don't satisfy the right anticommutation. Swapping two fermions should give a minus sign, but swapping qubits doesn't.

**2. Jordan-Wigner transformation:**

Map each fermionic mode $i$ to qubit $i$ with:

$$a_j^\\dagger = \\left(\\prod_{k<j} Z_k\\right) \\frac{X_j - iY_j}{2} = \\left(\\prod_{k<j} Z_k\\right) \\sigma_j^+$$

$$a_j = \\left(\\prod_{k<j} Z_k\\right) \\frac{X_j + iY_j}{2} = \\left(\\prod_{k<j} Z_k\\right) \\sigma_j^-$$

The "Jordan-Wigner string" $\\prod_{k<j} Z_k$ tracks parity of occupied modes below $j$, ensuring correct anticommutation.

**Verification:**
$$\\{a_i, a_j^\\dagger\\} = \\delta_{ij}$$
works because the Z strings either cancel (when $i \\neq j$) or give the right local anticommutator (when $i = j$).

**3. Qubit overhead:**

**Direct mapping:**
- $N$ spin-orbitals → $N$ qubits
- Molecular Hamiltonian: $H = \\sum_{pq} h_{pq} a_p^\\dagger a_q + \\sum_{pqrs} h_{pqrs} a_p^\\dagger a_q^\\dagger a_r a_s$
- Number of terms: $O(N^4)$
- Each term becomes a Pauli string of length up to $O(N)$ (due to JW strings)

**Circuit depth:**
- Measuring each Pauli term: $O(N)$ gates (for the Z string)
- Total measurements: $O(N^4)$ terms to estimate energy

**Alternative encodings:**
- **Bravyi-Kitaev:** Reduces string length to $O(\\log N)$ but more complex local structure
- **Parity encoding:** Trades off between locality and string length

For a typical small molecule (e.g., water with ~10 orbitals), you need ~10 qubits and can estimate the energy with ~1000s of Pauli measurements.`,
  },
  {
    slug: "query-complexity-lower-bound",
    title: "Query Complexity Lower Bounds",
    difficulty: "hard",
    type: "derivation",
    topics: ["query complexity", "adversary method", "lower bounds"],
    moduleRef: "Search and amplitude amplification",
    statement: `Grover's algorithm finds a marked item among $N$ with $O(\\sqrt{N})$ queries. The BBBV theorem proves this is optimal.

1. State the quantum query complexity model.
2. Why is $\\Omega(\\sqrt{N})$ a lower bound for unstructured search?
3. What does this imply about the power of quantum computers?`,
    hints: [
      "The adversary argument shows that the state doesn't change much per query.",
      "Consider the inner product between states with different marked items.",
    ],
    solution: `**1. Query complexity model:**

In the black-box (oracle) model:
- Input: function $f:\\{0,1\\}^n \\to \\{0,1\\}$ accessed via oracle $O_f$
- Computation: sequence of unitary gates and oracle calls
- Goal: compute some property of $f$ with bounded error

Oracle access: $O_f|x\\rangle|b\\rangle = |x\\rangle|b \\oplus f(x)\\rangle$

**Query complexity** = minimum number of oracle calls needed.

**2. Lower bound proof sketch (polynomial method):**

**Key insight:** A quantum algorithm's success probability is a polynomial in the input bits.

Let $|\\psi_t^x\\rangle$ be the state after $t$ queries for input $x$ (which item is marked).

**Fact 1:** $|\\psi_t^x\\rangle$ can be written as sum over paths that queried specific items.
After $t$ queries, amplitude on any basis state is a degree-$t$ polynomial in the $N$ input bits.

**Fact 2:** For distinguishing a random marked item from no marked item:
- Probability of correct answer is a symmetric polynomial
- Symmetry: all $N$ marked-item cases are equivalent

**Fact 3:** The probability polynomial must:
- Be $\\geq 2/3$ when there's a marked item
- Be $\\leq 1/3$ when there's no marked item
- Have degree $t$

**Result:** No symmetric polynomial of degree $o(\\sqrt{N})$ can approximate such a function.

Therefore $t = \\Omega(\\sqrt{N})$.

**3. Implications:**

**Quadratic is the max speedup for black-box search:**
- No quantum algorithm can search faster than $\\sqrt{N}$
- This is tight: Grover achieves it

**But real problems have structure:**
- NP-complete problems have structure beyond black-box
- Quantum speedup might be less than quadratic (or none) or more
- Lower bounds for specific problems are harder

**P vs BQP vs NP:**
- If NP $\\subseteq$ BQP, we could solve SAT with Grover-like $O(\\sqrt{2^n})$
- But this doesn't beat the $2^{n/2}$ bound if the best classical is $2^n$
- Factoring speedup is exponential, but factoring is likely not NP-complete

The oracle lower bound shows quantum computers aren't magic—they can't brute-force search exponentially faster.`,
  },
  {
    slug: "implement-simon",
    title: "Simon's Algorithm Implementation",
    difficulty: "interview",
    type: "coding",
    topics: ["Simon's algorithm", "hidden subgroup", "linear algebra"],
    moduleRef: "Early algorithms",
    statement: `Simon's algorithm finds a hidden string $s$ such that $f(x) = f(y)$ iff $x \\oplus y \\in \\{0, s\\}$ for a function $f:\\{0,1\\}^n \\to \\{0,1\\}^n$.

1. Describe the quantum circuit.
2. What classical post-processing is needed?
3. Write pseudocode for the full algorithm.`,
    solution: `**1. Quantum circuit:**

\`\`\`text
|0⟩^n ──H^⊗n──┐    ┌──H^⊗n──[Measure]→ y
              │    │
|0⟩^n ────────U_f──┘
\`\`\`

**Steps:**
1. Initialize $|0\\rangle^{\\otimes n}|0\\rangle^{\\otimes n}$
2. Apply $H^{\\otimes n}$ to first register: $\\frac{1}{\\sqrt{2^n}}\\sum_x |x\\rangle|0\\rangle$
3. Apply $U_f$: $\\frac{1}{\\sqrt{2^n}}\\sum_x |x\\rangle|f(x)\\rangle$
4. Apply $H^{\\otimes n}$ to first register
5. Measure first register

**2. Classical post-processing:**

Each measurement gives a string $y$ satisfying $y \\cdot s = 0 \\pmod 2$ (orthogonal to $s$).

Repeat to collect $n-1$ linearly independent equations:
$$y_1 \\cdot s = 0$$
$$y_2 \\cdot s = 0$$
$$\\vdots$$

Solve the linear system over $\\mathbb{F}_2$ to find $s$.

Need $O(n)$ measurements to get $n-1$ independent equations (with high probability).

**3. Pseudocode:**

\`\`\`python
def simon_algorithm(oracle_f, n):
    """
    Find hidden string s where f(x) = f(x ⊕ s).
    
    Args:
        oracle_f: quantum oracle implementing f
        n: input size
    
    Returns:
        s: the hidden string
    """
    equations = []  # List of (y, 0) equations: y · s = 0
    
    while len(independent_equations(equations)) < n - 1:
        # Quantum part
        qc = QuantumCircuit(2 * n, n)
        
        # Hadamard on first register
        for i in range(n):
            qc.h(i)
        
        # Apply oracle
        oracle_f(qc, range(n), range(n, 2*n))
        
        # Hadamard on first register
        for i in range(n):
            qc.h(i)
        
        # Measure first register
        y = measure(qc, range(n))
        
        if y != 0 and is_independent(y, equations):
            equations.append(y)
    
    # Classical: solve y · s = 0 for all y
    s = solve_linear_system_mod2(equations)
    
    # Verify (optional): check f(0) == f(s)
    if oracle_classical_f(0) == oracle_classical_f(s):
        return s
    else:
        return "0" * n  # s = 0 (f is one-to-one)

def independent_equations(equations):
    """Return maximal linearly independent subset."""
    # Gaussian elimination over F_2
    # ...implementation...
\`\`\`

**Complexity:**
- Quantum: $O(n)$ queries to $f$
- Classical: $O(n^3)$ for Gaussian elimination
- Total: exponentially better than classical $O(2^{n/2})$`,
  },
  {
    slug: "density-matrix-basics",
    title: "Density Matrix Formalism",
    difficulty: "interview",
    type: "derivation",
    topics: ["density matrices", "mixed states", "partial trace"],
    moduleRef: "Noise and quantum error correction",
    statement: `The density matrix formalism extends quantum mechanics to mixed states.

1. For a pure state $|\\psi\\rangle$, what is the density matrix? What about a statistical mixture of $|0\\rangle$ with probability $p$ and $|1\\rangle$ with probability $1-p$?
2. How do you compute expectation values using density matrices?
3. What is the density matrix of qubit A after tracing out qubit B from the Bell state $|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$?`,
    solution: `**1. Density matrices:**

**Pure state:**
$$\\rho = |\\psi\\rangle\\langle\\psi|$$

For $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$:
$$\\rho = \\begin{pmatrix} |\\alpha|^2 & \\alpha\\beta^* \\\\ \\alpha^*\\beta & |\\beta|^2 \\end{pmatrix}$$

**Mixed state (classical mixture):**
$$\\rho = p|0\\rangle\\langle 0| + (1-p)|1\\rangle\\langle 1| = \\begin{pmatrix} p & 0 \\\\ 0 & 1-p \\end{pmatrix}$$

Note: no off-diagonal terms (no coherence between $|0\\rangle$ and $|1\\rangle$).

**Properties of valid density matrices:**
- $\\rho^\\dagger = \\rho$ (Hermitian)
- $\\rho \\geq 0$ (positive semidefinite)
- $\\text{Tr}(\\rho) = 1$ (normalized)
- $\\text{Tr}(\\rho^2) \\leq 1$ with equality iff pure

**2. Expectation values:**

$$\\langle O \\rangle = \\text{Tr}(\\rho O)$$

For pure state: $\\text{Tr}(|\\psi\\rangle\\langle\\psi|O) = \\langle\\psi|O|\\psi\\rangle$ ✓

For mixed state $\\rho = \\sum_i p_i |\\psi_i\\rangle\\langle\\psi_i|$:
$$\\langle O \\rangle = \\sum_i p_i \\langle\\psi_i|O|\\psi_i\\rangle$$

Classical average of quantum expectation values.

**3. Partial trace of Bell state:**

$$|\\Phi^+\\rangle\\langle\\Phi^+| = \\frac{1}{2}(|00\\rangle + |11\\rangle)(\\langle 00| + \\langle 11|)$$
$$= \\frac{1}{2}(|00\\rangle\\langle 00| + |00\\rangle\\langle 11| + |11\\rangle\\langle 00| + |11\\rangle\\langle 11|)$$

Tracing out B (second qubit):
$$\\rho_A = \\text{Tr}_B(|\\Phi^+\\rangle\\langle\\Phi^+|) = \\sum_{j \\in \\{0,1\\}} \\langle j|_B \\rho_{AB} |j\\rangle_B$$

$$= \\frac{1}{2}(\\langle 0|00\\rangle\\langle 00|0\\rangle + \\langle 1|11\\rangle\\langle 11|1\\rangle + \\text{cross terms } = 0)$$
$$= \\frac{1}{2}(|0\\rangle\\langle 0| + |1\\rangle\\langle 1|) = \\frac{I}{2}$$

**Result:** Qubit A is in the maximally mixed state $I/2$! This is *maximally entangled*—locally looks completely random, but perfectly correlated with B.`,
  },
  {
    slug: "tomography-basics",
    title: "Quantum State Tomography",
    difficulty: "interview",
    type: "conceptual",
    topics: ["tomography", "measurement", "state reconstruction"],
    moduleRef: "Variational and hybrid methods",
    statement: `Quantum state tomography reconstructs an unknown quantum state from measurements.

1. For a single qubit, what measurements are needed?
2. How many parameters define an $n$-qubit density matrix?
3. Why is tomography exponentially expensive for many qubits?`,
    solution: `**1. Single qubit tomography:**

An arbitrary single-qubit state is:
$$\\rho = \\frac{1}{2}(I + r_x X + r_y Y + r_z Z)$$

where $(r_x, r_y, r_z)$ is the Bloch vector, $|\\vec{r}| \\leq 1$.

**Measurements needed:**
- Measure in Z basis: gives $\\langle Z \\rangle = r_z$
- Measure in X basis ($H$ then Z): gives $\\langle X \\rangle = r_x$
- Measure in Y basis ($S^\\dagger H$ then Z): gives $\\langle Y \\rangle = r_y$

Three expectation values determine the state.

**Shot count:** To estimate each $\\langle P \\rangle$ to precision $\\epsilon$, need $O(1/\\epsilon^2)$ shots (by Hoeffding). Total: $O(3/\\epsilon^2)$.

**2. $n$-qubit parameters:**

A density matrix $\\rho$ on $n$ qubits is a $2^n \\times 2^n$ complex Hermitian matrix with trace 1.

**Counting:**
- Hermitian: $2^n \\times 2^n$ real parameters on diagonal + $(2^n)^2 - 2^n$ complex off-diagonal = $2^{2n}$ real parameters
- Trace 1: subtract 1

Total: $4^n - 1$ real parameters.

**Alternatively:** $\\rho = \\frac{1}{2^n}\\sum_P c_P P$ where $P$ ranges over all $4^n$ Paulis, $c_I = 1$, so $4^n - 1$ free parameters.

**3. Exponential cost:**

**Parameters:** $4^n - 1 = O(4^n)$ expectation values to measure.

**Measurements:** Each Pauli string $P_1 \\otimes \\cdots \\otimes P_n$ requires a separate measurement basis. While some can be batched (commuting operators), you still need exponentially many different bases.

**Shots:** To estimate all $4^n$ parameters to precision $\\epsilon$: $O(4^n/\\epsilon^2)$ total measurements.

**Example:**
- 5 qubits: 1023 parameters, manageable
- 10 qubits: ~1 million parameters, challenging
- 50 qubits: $4^{50} \\approx 10^{30}$ parameters, impossible

**Alternatives:**
- Compressed sensing (if state is nearly pure)
- Shadow tomography (if you only need certain properties)
- Classical simulation of Clifford circuits`,
  },
  {
    slug: "implement-phase-estimation",
    title: "Phase Estimation Circuit",
    difficulty: "hard",
    type: "coding",
    topics: ["phase estimation", "controlled unitaries", "circuit design"],
    moduleRef: "Fourier transform, phase estimation and factoring",
    statement: `Implement the quantum phase estimation circuit that estimates $\\phi$ where $U|u\\rangle = e^{2\\pi i \\phi}|u\\rangle$.

Write pseudocode for the circuit with $n$ bits of precision, assuming you have access to controlled-$U^{2^k}$ gates.`,
    solution: `**Circuit structure:**

\`\`\`text
|0⟩ ──H───────●────────────────────────────────────QFT†[0]──
              │
|0⟩ ──H───────┼──────●─────────────────────────────QFT†[1]──
              │      │
|0⟩ ──H───────┼──────┼────────●────────────────────QFT†[2]──
              │      │        │
...           ...    ...      ...
              │      │        │
|0⟩ ──H───────┼──────┼────────┼─────────●──────────QFT†[n-1]
              │      │        │         │
|u⟩ ─────────U^1────U^2──────U^4───────U^(2^(n-1))──────────
\`\`\`

**Pseudocode:**

\`\`\`python
def phase_estimation(qc, control_qubits, target_qubits, 
                     controlled_U_powers):
    """
    Quantum phase estimation.
    
    Args:
        qc: quantum circuit
        control_qubits: list of n control qubits (for precision)
        target_qubits: qubits holding eigenstate |u⟩
        controlled_U_powers: dict mapping k -> controlled-U^(2^k) gate
    
    The target register must be initialized to eigenstate |u⟩.
    After circuit, measure control_qubits to get binary 
    representation of φ.
    """
    n = len(control_qubits)
    
    # Step 1: Hadamard on all control qubits
    for qubit in control_qubits:
        qc.h(qubit)
    
    # Step 2: Controlled-U^(2^k) gates
    for k, control in enumerate(control_qubits):
        # Apply controlled-U^(2^k) with control qubit k
        # targeting the eigenstate register
        power = 2 ** (n - 1 - k)  # or 2**k depending on convention
        controlled_U_powers[power](qc, control, target_qubits)
    
    # Step 3: Inverse QFT on control register
    inverse_qft(qc, control_qubits)
    
    # Step 4: Measure control register
    # Result is binary representation of φ ≈ 0.φ₁φ₂...φₙ

def inverse_qft(qc, qubits):
    """Inverse QFT on qubit register."""
    n = len(qubits)
    
    # Reverse qubit order for standard QFT convention
    for i in range(n // 2):
        qc.swap(qubits[i], qubits[n - 1 - i])
    
    # Apply inverse QFT gates
    for j in range(n - 1, -1, -1):
        # Inverse controlled rotations
        for k in range(j + 1, n):
            angle = -2 * pi / (2 ** (k - j + 1))
            qc.cp(angle, qubits[k], qubits[j])
        # Hadamard
        qc.h(qubits[j])

# Example usage for factoring (simplified):
def shor_modular_exponentiation(qc, control, targets, a, N):
    """
    Controlled modular exponentiation for Shor's algorithm.
    Implements controlled multiplication by a^(2^k) mod N.
    """
    # This requires reversible classical arithmetic circuits
    # Actual implementation is complex
    pass
\`\`\`

**Analysis:**
- **Qubits:** $n$ control + $m$ target (where $m$ depends on $U$)
- **Gates:** $n$ Hadamards + $n$ controlled-$U$ applications + $O(n^2)$ for inverse QFT
- **Precision:** $n$ bits of $\\phi$ with probability $\\geq 4/\\pi^2 \\approx 0.405$ for closest value`,
  },
  {
    slug: "error-mitigation",
    title: "Zero-Noise Extrapolation",
    difficulty: "hard",
    type: "conceptual",
    topics: ["error mitigation", "noise scaling", "NISQ"],
    moduleRef: "Variational and hybrid methods",
    statement: `Zero-noise extrapolation (ZNE) is an error mitigation technique for NISQ devices that don't have full error correction.

1. What is the basic idea of ZNE?
2. How do you artificially increase the noise level?
3. What are the limitations of this approach?`,
    solution: `**1. Basic idea:**

If the expectation value at noise level $\\lambda$ is $E(\\lambda)$:
- We want $E(0)$ (zero noise, ideal)
- We can measure $E(\\lambda_0)$ (device noise)
- We can measure $E(c\\lambda_0)$ for $c > 1$ (amplified noise)

**Extrapolation:** Fit a model to $\\{E(c\\lambda_0)\\}$ for $c = 1, c_1, c_2, \\ldots$ and extrapolate to $c = 0$.

**Common models:**
- Linear: $E(\\lambda) = E(0) + a\\lambda$
- Exponential: $E(\\lambda) = E(0)e^{-\\lambda/\\tau} + b$
- Polynomial: $E(\\lambda) = E(0) + \\sum_k a_k \\lambda^k$

**2. Noise amplification methods:**

**Identity insertion:**
Replace each gate $G$ with $G(G^\\dagger G)^n$. This applies $G$ then $n$ pairs of $G^\\dagger G = I$, which ideally does nothing but accumulates noise.

**Pulse stretching:**
On physical level, stretch gate pulses in time. Longer pulses → more decoherence.

**Probabilistic error amplification:**
Insert random Pauli errors with known probability, effectively increasing depolarizing rate.

**Example (identity insertion):**
\`\`\`python
def amplify_noise(circuit, scale_factor):
    """Increase effective noise by scale_factor."""
    new_circuit = []
    for gate in circuit:
        new_circuit.append(gate)
        for _ in range(scale_factor - 1):
            new_circuit.append(gate.inverse())
            new_circuit.append(gate)
    return new_circuit
\`\`\`

**3. Limitations:**

**Assumes specific noise model:**
- Linear extrapolation assumes error accumulates linearly
- Real noise may be non-Markovian, correlated, or nonlinear
- Model mismatch leads to biased estimates

**Statistical overhead:**
- Measuring $E(c\\lambda)$ has larger variance for large $c$
- Extrapolation amplifies statistical uncertainty
- Diminishing returns: need exponentially more shots as noise increases

**Doesn't scale:**
- For deep circuits, $E(\\lambda)$ saturates to maximally mixed state
- No useful signal to extrapolate from
- Works best for shallow circuits with moderate error rates

**Not a substitute for error correction:**
- Provides $O(1)$ improvement in error, not exponential suppression
- Cannot achieve fault tolerance

**When it works:**
- Shallow circuits (< 100 error events)
- Coherent, well-characterized noise
- Expectation values (not sampling problems)

ZNE is a valuable tool for near-term devices, bridging the gap until full error correction is available.`,
  },
  {
    slug: "bell-inequality",
    title: "CHSH Inequality Violation",
    difficulty: "hard",
    type: "derivation",
    topics: ["Bell inequality", "entanglement", "nonlocality"],
    moduleRef: "Gates and circuits",
    statement: `The CHSH inequality tests whether correlations can be explained by local hidden variables.

For measurement settings $a, a'$ (Alice) and $b, b'$ (Bob), the CHSH parameter is:
$$S = E(a,b) - E(a,b') + E(a',b) + E(a',b')$$

where $E(a,b) = P(\\text{same}) - P(\\text{different})$.

1. What is the classical bound on $|S|$?
2. What is the maximum quantum violation?
3. For the Bell state $|\\Phi^+\\rangle$, what measurement angles achieve maximal violation?`,
    solution: `**1. Classical (local hidden variable) bound:**

If outcomes are determined by shared hidden variables $\\lambda$:
- Alice's outcome: $A(a, \\lambda) = \\pm 1$
- Bob's outcome: $B(b, \\lambda) = \\pm 1$

For any fixed $\\lambda$:
$$S_\\lambda = A(a)B(b) - A(a)B(b') + A(a')B(b) + A(a')B(b')$$
$$= A(a)[B(b) - B(b')] + A(a')[B(b) + B(b')]$$

Since $B(b), B(b') \\in \\{\\pm 1\\}$:
- Either $B(b) = B(b')$ so $|B(b) + B(b')| = 2$ and $B(b) - B(b') = 0$
- Or $B(b) = -B(b')$ so $B(b) + B(b') = 0$ and $|B(b) - B(b')| = 2$

Either way, $|S_\\lambda| \\leq 2$.

Averaging over $\\lambda$: $|S| \\leq 2$ classically.

**2. Quantum maximum (Tsirelson bound):**

The maximum quantum value is $|S| = 2\\sqrt{2} \\approx 2.828$.

**Proof sketch:**
Using operator formalism with observables $A, A', B, B'$ having eigenvalues $\\pm 1$:
$$S = AB - AB' + A'B + A'B' = A(B-B') + A'(B+B')$$

Since $[A, A'] = 0$ etc. for local measurements:
$$S^2 = 4I + [A,A'][B,B']$$

For operators with $\\|O\\| \\leq 1$: $\\|S\\| \\leq 2\\sqrt{2}$.

**3. Optimal measurements for $|\\Phi^+\\rangle$:**

The Bell state: $|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$

**Optimal angles:**
- Alice: $a = 0°$, $a' = 90°$ (measure Z and X)
- Bob: $b = 45°$, $b' = -45°$ (measure $(Z+X)/\\sqrt{2}$ and $(Z-X)/\\sqrt{2}$)

Actually, more precisely:
- $a = 0$, $a' = \\pi/2$ (angles of measurement axis)
- $b = \\pi/4$, $b' = -\\pi/4$

**Calculating correlations:**

For measurement angle $\\theta$, the observable is $\\cos\\theta \\cdot Z + \\sin\\theta \\cdot X$.

The correlation for $|\\Phi^+\\rangle$ is:
$$E(\\theta_A, \\theta_B) = \\cos(\\theta_A - \\theta_B)$$

Plugging in:
- $E(0, \\pi/4) = \\cos(\\pi/4) = 1/\\sqrt{2}$
- $E(0, -\\pi/4) = \\cos(-\\pi/4) = 1/\\sqrt{2}$
- $E(\\pi/2, \\pi/4) = \\cos(\\pi/4) = 1/\\sqrt{2}$
- $E(\\pi/2, -\\pi/4) = \\cos(3\\pi/4) = -1/\\sqrt{2}$

$$S = \\frac{1}{\\sqrt{2}} - (-\\frac{1}{\\sqrt{2}}) + \\frac{1}{\\sqrt{2}} + \\frac{1}{\\sqrt{2}} = \\frac{4}{\\sqrt{2}} = 2\\sqrt{2}$$

This achieves the Tsirelson bound! ✓`,
  },
  {
    slug: "quantum-random-number",
    title: "Quantum Random Number Generation",
    difficulty: "warm-up",
    type: "coding",
    topics: ["randomness", "measurement", "applications"],
    moduleRef: "Linear algebra and single qubits",
    statement: `Design a quantum circuit that generates truly random bits.

1. What is the simplest circuit for one random bit?
2. How would you generate $n$ random bits?
3. Why is this "better" than a classical pseudo-random generator?`,
    solution: `**1. Single random bit:**

\`\`\`text
|0⟩ ──H──[Measure]→ 0 or 1 with probability 1/2 each
\`\`\`

**Circuit:**
\`\`\`python
from qiskit import QuantumCircuit

def random_bit():
    qc = QuantumCircuit(1, 1)
    qc.h(0)        # Create superposition
    qc.measure(0, 0)
    return qc
\`\`\`

After Hadamard: $|+\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)$

Measurement gives $|0\\rangle$ or $|1\\rangle$ with exactly 50% probability each.

**2. Multiple random bits:**

**Option A: Sequential (1 qubit, $n$ measurements)**
\`\`\`python
def random_bits_sequential(n):
    bits = []
    for _ in range(n):
        qc = QuantumCircuit(1, 1)
        qc.h(0)
        qc.measure(0, 0)
        result = execute(qc).result().get_counts()
        bits.append(list(result.keys())[0])
    return ''.join(bits)
\`\`\`

**Option B: Parallel ($n$ qubits, 1 measurement)**
\`\`\`python
def random_bits_parallel(n):
    qc = QuantumCircuit(n, n)
    for i in range(n):
        qc.h(i)
    qc.measure(range(n), range(n))
    result = execute(qc, shots=1).result().get_counts()
    return list(result.keys())[0]
\`\`\`

The parallel version generates all $n$ bits in one shot, with the state being:
$$|+\\rangle^{\\otimes n} = \\frac{1}{\\sqrt{2^n}}\\sum_{x \\in \\{0,1\\}^n}|x\\rangle$$

Measurement collapses to any $n$-bit string with uniform probability $1/2^n$.

**3. Quantum vs classical randomness:**

**Classical PRNGs:**
- Deterministic algorithms (seed → sequence)
- Output is predictable if seed is known
- Not truly random, only "random-looking"
- Fail cryptographic tests if algorithm is known

**Quantum randomness:**
- Fundamentally unpredictable by laws of physics
- No hidden variables (Bell inequality violations)
- Even with complete knowledge of the system, outcome is undetermined
- "Certified" randomness: can verify no one could predict the bits

**Applications:**
- Cryptographic key generation
- Monte Carlo simulations
- Gambling/lotteries requiring provable fairness
- Random sampling for surveys/experiments

**Practical note:** Real quantum random number generators must handle:
- Detector bias (not exactly 50/50)
- Classical noise (not purely quantum)
- Adversarial scenarios (device independence)

Companies like ID Quantique and Quantinuum sell certified quantum random number generators.`,
  },
];

export default quantumComputingProblems;
