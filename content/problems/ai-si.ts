import type { Problem } from "../problem-types";

export const aiSiProblems: Problem[] = [
  {
    slug: "softmax-temperature",
    title: "Softmax Temperature Scaling",
    difficulty: "warm-up",
    type: "derivation",
    topics: ["softmax", "temperature", "probability"],
    moduleRef: "Learning from data and backpropagation",
    statement: `The softmax function with temperature $T$ is:

$$\\text{softmax}(z_i; T) = \\frac{e^{z_i/T}}{\\sum_j e^{z_j/T}}$$

1. What happens as $T \\to 0$?
2. What happens as $T \\to \\infty$?
3. For logits $z = [2.0, 1.0, 0.1]$, compute the softmax output for $T = 1$ and $T = 0.5$.`,
    solution: `**1. As $T \\to 0$ (low temperature):**

The softmax becomes more "peaked." In the limit:
$$\\lim_{T \\to 0} \\text{softmax}(z; T) = \\text{one-hot}(\\arg\\max_i z_i)$$

The highest logit gets probability 1, all others get 0. This is called "hard" selection or argmax.

**2. As $T \\to \\infty$ (high temperature):**

All exponents $z_i/T \\to 0$, so $e^{z_i/T} \\to 1$ for all $i$.
$$\\lim_{T \\to \\infty} \\text{softmax}(z; T) = \\frac{1}{n}(1, 1, \\ldots, 1)$$

The distribution becomes uniform regardless of logit values.

**3. Numerical calculation:**

For $z = [2.0, 1.0, 0.1]$:

**$T = 1$:**
$$e^{2.0} = 7.389, \\quad e^{1.0} = 2.718, \\quad e^{0.1} = 1.105$$
$$\\text{sum} = 11.212$$
$$\\text{softmax} = [0.659, 0.242, 0.099]$$

**$T = 0.5$:**
$$e^{4.0} = 54.60, \\quad e^{2.0} = 7.389, \\quad e^{0.2} = 1.221$$
$$\\text{sum} = 63.21$$
$$\\text{softmax} = [0.864, 0.117, 0.019]$$

Lower temperature sharpens the distribution, putting more probability on the highest logit.

**Use in practice:**
- Training: $T=1$ for proper cross-entropy loss
- Inference: $T<1$ for more confident/deterministic outputs
- Knowledge distillation: $T>1$ reveals "dark knowledge" in soft labels`,
  },
  {
    slug: "cross-entropy-loss",
    title: "Cross-Entropy Loss Derivation",
    difficulty: "warm-up",
    type: "derivation",
    topics: ["loss functions", "cross-entropy", "classification"],
    moduleRef: "Learning from data and backpropagation",
    statement: `The cross-entropy loss for classification is:

$$L = -\\sum_i y_i \\log(p_i)$$

where $y$ is the one-hot target and $p$ is the predicted probability distribution.

1. For a single correct class $c$, simplify this expression.
2. Show that minimizing cross-entropy is equivalent to maximizing log-likelihood.
3. What is the gradient $\\frac{\\partial L}{\\partial z_c}$ where $p = \\text{softmax}(z)$?`,
    solution: `**1. Simplification for one-hot targets:**

If $y$ is one-hot with $y_c = 1$ (true class) and $y_i = 0$ for $i \\neq c$:

$$L = -\\sum_i y_i \\log(p_i) = -1 \\cdot \\log(p_c) - 0 \\cdot \\ldots = -\\log(p_c)$$

The loss is simply the negative log probability of the correct class.

**2. Maximum likelihood equivalence:**

For a dataset $\\{(x^{(n)}, y^{(n)})\\}_{n=1}^N$, the likelihood is:
$$\\mathcal{L} = \\prod_n p(y^{(n)} | x^{(n)}) = \\prod_n p_{c^{(n)}}^{(n)}$$

Log-likelihood:
$$\\log \\mathcal{L} = \\sum_n \\log p_{c^{(n)}}^{(n)}$$

Maximizing this equals minimizing:
$$-\\log \\mathcal{L} = -\\sum_n \\log p_{c^{(n)}}^{(n)} = \\sum_n L^{(n)}$$

Cross-entropy loss is the negative log-likelihood, so minimizing it is MLE.

**3. Gradient of cross-entropy + softmax:**

Let $p_i = \\frac{e^{z_i}}{\\sum_j e^{z_j}}$ and $L = -\\log p_c$.

We need $\\frac{\\partial L}{\\partial z_i}$.

$$\\frac{\\partial L}{\\partial z_i} = -\\frac{1}{p_c} \\frac{\\partial p_c}{\\partial z_i}$$

For softmax:
$$\\frac{\\partial p_c}{\\partial z_i} = \\begin{cases} p_c(1 - p_c) & \\text{if } i = c \\\\ -p_c p_i & \\text{if } i \\neq c \\end{cases}$$

So:
- If $i = c$: $\\frac{\\partial L}{\\partial z_c} = -\\frac{1}{p_c} \\cdot p_c(1-p_c) = -(1-p_c) = p_c - 1$
- If $i \\neq c$: $\\frac{\\partial L}{\\partial z_i} = -\\frac{1}{p_c} \\cdot (-p_c p_i) = p_i$

**Beautifully simple result:**
$$\\frac{\\partial L}{\\partial z_i} = p_i - y_i$$

The gradient is just the difference between predicted and target probabilities!`,
  },
  {
    slug: "backprop-chain-rule",
    title: "Backpropagation Through a Network",
    difficulty: "interview",
    type: "derivation",
    topics: ["backpropagation", "chain rule", "gradients"],
    moduleRef: "Learning from data and backpropagation",
    statement: `Consider a two-layer neural network:
$$h = \\sigma(W_1 x + b_1)$$
$$y = W_2 h + b_2$$
$$L = \\frac{1}{2}\\|y - t\\|^2$$

where $\\sigma$ is an element-wise activation and $t$ is the target.

Derive the gradients $\\frac{\\partial L}{\\partial W_2}$, $\\frac{\\partial L}{\\partial W_1}$, $\\frac{\\partial L}{\\partial b_2}$, and $\\frac{\\partial L}{\\partial b_1}$.`,
    hints: [
      "Work backwards from the loss using the chain rule.",
      "Define $\\delta_2 = \\frac{\\partial L}{\\partial y}$ and $\\delta_1 = \\frac{\\partial L}{\\partial h}$.",
    ],
    solution: `**Forward pass (for reference):**
1. $z_1 = W_1 x + b_1$
2. $h = \\sigma(z_1)$
3. $y = W_2 h + b_2$
4. $L = \\frac{1}{2}\\|y - t\\|^2$

**Backward pass:**

**Step 1: Output layer error**
$$\\delta_y = \\frac{\\partial L}{\\partial y} = y - t$$

**Step 2: Gradients for $W_2$, $b_2$**
Since $y = W_2 h + b_2$:
$$\\frac{\\partial L}{\\partial W_2} = \\frac{\\partial L}{\\partial y} \\frac{\\partial y}{\\partial W_2} = \\delta_y h^T$$
$$\\frac{\\partial L}{\\partial b_2} = \\delta_y$$

**Step 3: Backprop through $W_2$**
$$\\delta_h = \\frac{\\partial L}{\\partial h} = W_2^T \\delta_y$$

**Step 4: Backprop through activation**
$$\\delta_{z_1} = \\frac{\\partial L}{\\partial z_1} = \\delta_h \\odot \\sigma'(z_1)$$

where $\\odot$ is element-wise multiplication.

**Step 5: Gradients for $W_1$, $b_1$**
Since $z_1 = W_1 x + b_1$:
$$\\frac{\\partial L}{\\partial W_1} = \\delta_{z_1} x^T$$
$$\\frac{\\partial L}{\\partial b_1} = \\delta_{z_1}$$

**Summary (dimensions matter!):**
If $x \\in \\mathbb{R}^{d_{in}}$, $h \\in \\mathbb{R}^{d_h}$, $y \\in \\mathbb{R}^{d_{out}}$:

| Gradient | Dimension | Formula |
|----------|-----------|---------|
| $\\frac{\\partial L}{\\partial W_2}$ | $d_{out} \\times d_h$ | $(y-t)h^T$ |
| $\\frac{\\partial L}{\\partial b_2}$ | $d_{out}$ | $y-t$ |
| $\\frac{\\partial L}{\\partial W_1}$ | $d_h \\times d_{in}$ | $(W_2^T(y-t) \\odot \\sigma'(z_1))x^T$ |
| $\\frac{\\partial L}{\\partial b_1}$ | $d_h$ | $W_2^T(y-t) \\odot \\sigma'(z_1)$ |

**Key insight:** Gradients flow backwards through the network. Each layer receives an error signal, multiplies by the local Jacobian (weight matrix transpose), and passes it to the previous layer.`,
  },
  {
    slug: "vanishing-gradients",
    title: "Vanishing Gradient Problem",
    difficulty: "interview",
    type: "conceptual",
    topics: ["gradients", "deep networks", "activation functions"],
    moduleRef: "Learning from data and backpropagation",
    statement: `Deep networks with sigmoid activations often suffer from vanishing gradients.

1. Why does the gradient vanish when using sigmoid activations in deep networks?
2. How does ReLU help mitigate this problem?
3. What other techniques address vanishing gradients?`,
    solution: `**1. Why sigmoid causes vanishing gradients:**

The sigmoid function: $\\sigma(x) = \\frac{1}{1+e^{-x}}$

Its derivative: $\\sigma'(x) = \\sigma(x)(1-\\sigma(x))$

**Maximum derivative:** At $x=0$, $\\sigma'(0) = 0.25$.

For inputs far from 0, $\\sigma'(x) \\to 0$ (saturated regions).

**In deep networks:**
The gradient through $L$ layers is:
$$\\frac{\\partial L}{\\partial W_1} \\propto \\prod_{l=1}^{L} \\sigma'(z_l) \\cdot W_l^T$$

If each $|\\sigma'(z_l)| \\leq 0.25$ and weights are small:
$$\\prod_{l=1}^{L} |\\sigma'(z_l)| \\leq 0.25^L$$

For $L=10$: $0.25^{10} \\approx 10^{-6}$ — gradients vanish exponentially!

**2. How ReLU helps:**

ReLU: $\\text{ReLU}(x) = \\max(0, x)$

Derivative: $\\text{ReLU}'(x) = \\begin{cases} 1 & x > 0 \\\\ 0 & x \\leq 0 \\end{cases}$

**Benefits:**
- Gradient is exactly 1 for positive inputs — no shrinking!
- Gradient multiplication: $1 \\times 1 \\times \\ldots \\times 1 = 1$
- Sparsity: some neurons "off" → implicit regularization

**Drawback:** "Dying ReLU" — if a neuron gets stuck with negative inputs, gradient is 0 forever.

**3. Other techniques:**

**Residual connections (skip connections):**
$$y = F(x) + x$$
Gradient flows directly through the skip: $\\frac{\\partial y}{\\partial x} = \\frac{\\partial F}{\\partial x} + 1$

The "+1" ensures gradient doesn't vanish.

**Batch normalization:**
Normalizes activations to zero mean, unit variance. Keeps inputs in the linear regime of activations.

**Careful initialization:**
- Xavier/Glorot: $\\text{Var}(W) = \\frac{2}{n_{in} + n_{out}}$
- He initialization: $\\text{Var}(W) = \\frac{2}{n_{in}}$ (for ReLU)

**LSTM/GRU for sequences:**
Gating mechanisms that allow gradients to flow unchanged through time.

**Layer normalization:**
Normalizes across features, helps with varying batch sizes and sequence models.`,
  },
  {
    slug: "attention-mechanism",
    title: "Self-Attention Computation",
    difficulty: "interview",
    type: "derivation",
    topics: ["attention", "transformers", "matrix operations"],
    moduleRef: "Sequence models and attention",
    statement: `In self-attention, queries $Q$, keys $K$, and values $V$ are computed from input $X \\in \\mathbb{R}^{n \\times d}$ where $n$ is sequence length.

$$Q = XW^Q, \\quad K = XW^K, \\quad V = XW^V$$
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

1. What are the dimensions of each intermediate tensor?
2. Why divide by $\\sqrt{d_k}$?
3. What is the computational complexity of self-attention?`,
    solution: `**1. Tensor dimensions:**

Let $n$ = sequence length, $d$ = model dimension, $d_k$ = key dimension, $d_v$ = value dimension.

| Tensor | Dimensions | Notes |
|--------|------------|-------|
| $X$ | $n \\times d$ | Input embeddings |
| $W^Q, W^K$ | $d \\times d_k$ | Projection matrices |
| $W^V$ | $d \\times d_v$ | Value projection |
| $Q, K$ | $n \\times d_k$ | Queries and keys |
| $V$ | $n \\times d_v$ | Values |
| $QK^T$ | $n \\times n$ | Attention scores |
| $\\text{softmax}(\\cdot)$ | $n \\times n$ | Attention weights |
| Output | $n \\times d_v$ | Weighted values |

**2. Why $\\sqrt{d_k}$ scaling:**

The dot product $q \\cdot k = \\sum_{i=1}^{d_k} q_i k_i$.

If $q_i, k_i$ are independent with mean 0 and variance 1:
$$\\text{Var}(q \\cdot k) = d_k$$

So $q \\cdot k$ has standard deviation $\\sqrt{d_k}$.

For large $d_k$, dot products become large → softmax saturates → gradients vanish.

Dividing by $\\sqrt{d_k}$ normalizes variance to 1, keeping softmax in a good range.

**Example:** $d_k = 64$, typical dot product magnitude $\\sim 8$. After scaling, $\\sim 1$.

**3. Computational complexity:**

**Matrix multiplications:**
- $Q = XW^Q$: $O(nd \\cdot d_k)$
- $QK^T$: $O(n \\cdot d_k \\cdot n) = O(n^2 d_k)$
- $\\text{softmax}(\\cdot)V$: $O(n^2 d_v)$

**Total:** $O(n^2 d)$ where $d = \\max(d_k, d_v)$.

**Memory:** $O(n^2)$ for the attention matrix.

**The quadratic bottleneck:**
For long sequences ($n = 10000$), $n^2 = 10^8$ — this is why transformers struggle with long contexts.

**Mitigations:**
- Sparse attention (Longformer, BigBird)
- Linear attention (Performer, Linear Transformers)
- Flash Attention (memory-efficient implementation)
- Sliding window attention`,
  },
  {
    slug: "positional-encoding",
    title: "Sinusoidal Positional Encoding",
    difficulty: "interview",
    type: "conceptual",
    topics: ["positional encoding", "transformers", "sequences"],
    moduleRef: "Sequence models and attention",
    statement: `The original Transformer uses sinusoidal positional encodings:

$$PE_{(pos, 2i)} = \\sin(pos / 10000^{2i/d})$$
$$PE_{(pos, 2i+1)} = \\cos(pos / 10000^{2i/d})$$

1. Why does attention need positional information?
2. What property allows the model to learn relative positions?
3. How do learned positional embeddings compare?`,
    solution: `**1. Why positional encoding is needed:**

Self-attention is **permutation equivariant**:
$$\\text{Attention}(\\pi(X)) = \\pi(\\text{Attention}(X))$$

For any permutation $\\pi$ of rows, the output permutes identically.

This means attention **cannot distinguish** "cat sat mat" from "mat sat cat" — the tokens are processed independently of their order.

Positional encoding breaks this symmetry by adding position-dependent information.

**2. Relative position property:**

For any fixed offset $k$:
$$PE_{pos+k} = f(PE_{pos})$$

Specifically, there exists a linear transformation $M_k$ such that:
$$PE_{pos+k} = M_k \\cdot PE_{pos}$$

**Why?** Using the angle addition formulas:
$$\\sin(\\alpha + \\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$$
$$\\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$$

This is a rotation matrix! So:
$$\\begin{pmatrix} PE_{pos+k, 2i} \\\\ PE_{pos+k, 2i+1} \\end{pmatrix} = \\begin{pmatrix} \\cos(k\\omega_i) & \\sin(k\\omega_i) \\\\ -\\sin(k\\omega_i) & \\cos(k\\omega_i) \\end{pmatrix} \\begin{pmatrix} PE_{pos, 2i} \\\\ PE_{pos, 2i+1} \\end{pmatrix}$$

The model can learn to attend to relative positions by learning to decode these linear relationships.

**3. Learned vs sinusoidal:**

**Sinusoidal (fixed):**
- Extrapolates to longer sequences than training
- No additional parameters
- Provides theoretical relative position structure
- Used in original Transformer

**Learned embeddings:**
- Can adapt to task-specific positional patterns
- Requires parameters: $n_{max} \\times d$
- Cannot extrapolate beyond $n_{max}$
- Used in BERT, GPT-2

**Modern approaches:**
- **RoPE (Rotary Position Embedding):** Applies rotation matrices that naturally encode relative positions
- **ALiBi:** Adds learned bias to attention scores based on distance
- **Relative position embeddings:** Explicitly encode $i-j$ in attention`,
  },
  {
    slug: "layer-normalization",
    title: "Layer Normalization vs Batch Normalization",
    difficulty: "interview",
    type: "conceptual",
    topics: ["normalization", "transformers", "training"],
    moduleRef: "Sequence models and attention",
    statement: `Transformers use Layer Normalization rather than Batch Normalization.

1. Define both normalizations mathematically.
2. Why is LayerNorm preferred for transformers?
3. What is the difference between Pre-LN and Post-LN transformers?`,
    solution: `**1. Mathematical definitions:**

**Batch Normalization** (over batch dimension):
For input $x \\in \\mathbb{R}^{B \\times D}$ (batch size $B$, feature dim $D$):
$$\\mu_j = \\frac{1}{B}\\sum_{i=1}^B x_{ij}, \\quad \\sigma_j^2 = \\frac{1}{B}\\sum_{i=1}^B (x_{ij} - \\mu_j)^2$$
$$\\hat{x}_{ij} = \\frac{x_{ij} - \\mu_j}{\\sqrt{\\sigma_j^2 + \\epsilon}}$$
$$y_{ij} = \\gamma_j \\hat{x}_{ij} + \\beta_j$$

Normalizes each feature across the batch.

**Layer Normalization** (over feature dimension):
$$\\mu_i = \\frac{1}{D}\\sum_{j=1}^D x_{ij}, \\quad \\sigma_i^2 = \\frac{1}{D}\\sum_{j=1}^D (x_{ij} - \\mu_i)^2$$
$$\\hat{x}_{ij} = \\frac{x_{ij} - \\mu_i}{\\sqrt{\\sigma_i^2 + \\epsilon}}$$
$$y_{ij} = \\gamma_j \\hat{x}_{ij} + \\beta_j$$

Normalizes each sample independently across its features.

**2. Why LayerNorm for Transformers:**

**Batch size independence:**
- LayerNorm doesn't depend on other samples in the batch
- Works with batch size 1 (inference)
- No running mean/variance to track

**Sequence length handling:**
- For variable-length sequences, BatchNorm statistics are poorly defined
- LayerNorm treats each position independently

**Autoregressive generation:**
- During generation, we process one token at a time
- LayerNorm works; BatchNorm would need the full batch

**Training stability:**
- LayerNorm statistics computed per-sample are more stable
- No dependence on batch composition

**3. Pre-LN vs Post-LN:**

**Post-LN (original Transformer):**
\`\`\`
x → Attention → Add(x) → LayerNorm → FFN → Add → LayerNorm → output
\`\`\`
$$x' = \\text{LN}(x + \\text{Attention}(x))$$
$$y = \\text{LN}(x' + \\text{FFN}(x'))$$

**Pre-LN:**
\`\`\`
x → LayerNorm → Attention → Add(x) → LayerNorm → FFN → Add → output
\`\`\`
$$x' = x + \\text{Attention}(\\text{LN}(x))$$
$$y = x' + \\text{FFN}(\\text{LN}(x'))$$

**Differences:**
- Pre-LN: more stable gradients, easier to train deep networks
- Post-LN: often better final performance, but needs careful learning rate warmup
- Pre-LN: identity path is "clean" (no normalization in residual)
- Most modern LLMs use Pre-LN or variants like RMSNorm`,
  },
  {
    slug: "perplexity-evaluation",
    title: "Perplexity as Evaluation Metric",
    difficulty: "warm-up",
    type: "derivation",
    topics: ["evaluation", "perplexity", "language models"],
    moduleRef: "Evaluation and interpretability",
    statement: `Perplexity is a standard metric for language models.

1. Define perplexity mathematically.
2. If a model achieves perplexity 10 on a test set, what does this mean intuitively?
3. What are the limitations of perplexity as an evaluation metric?`,
    solution: `**1. Mathematical definition:**

For a sequence $w_1, w_2, \\ldots, w_N$:

$$\\text{PPL} = \\exp\\left(-\\frac{1}{N}\\sum_{i=1}^N \\log P(w_i | w_1, \\ldots, w_{i-1})\\right)$$

Equivalently:
$$\\text{PPL} = \\left(\\prod_{i=1}^N P(w_i | w_{<i})\\right)^{-1/N}$$

This is the geometric mean of $1/P(w_i | w_{<i})$.

Also related to cross-entropy:
$$\\text{PPL} = 2^{H(P, Q)} = e^{\\text{CE}}$$

where CE is the cross-entropy loss per token.

**2. Intuition for PPL = 10:**

Perplexity can be interpreted as the **effective vocabulary size** the model is "uncertain" among.

If PPL = 10, the model is on average as uncertain as if it were choosing uniformly among 10 equally likely options at each position.

**Examples:**
- Random guessing over vocab size 50,000: PPL ≈ 50,000
- Perfect prediction: PPL = 1
- GPT-3 on typical text: PPL ≈ 20-30
- Human-level (estimated): PPL ≈ 10-20

**Lower is better:** A model with PPL 10 is more confident and accurate than one with PPL 100.

**3. Limitations:**

**Doesn't measure quality:**
- A model can have low perplexity but generate incoherent text
- Perplexity measures prediction, not generation quality

**Domain dependence:**
- Perplexity varies wildly across domains
- Low perplexity on Wikipedia doesn't mean good poetry

**Tokenization sensitivity:**
- Different tokenizers give incomparable perplexities
- BPE vs word-level vs character-level

**Doesn't capture:**
- Factual accuracy
- Reasoning ability
- Instruction following
- Safety/helpfulness

**Better for relative comparison:**
- Useful for comparing models on same test set
- Less useful as absolute measure of "intelligence"

Modern evaluation uses perplexity alongside task-specific benchmarks (MMLU, HumanEval, etc.) and human evaluation.`,
  },
  {
    slug: "scaling-laws",
    title: "Neural Scaling Laws",
    difficulty: "interview",
    type: "conceptual",
    topics: ["scaling", "compute", "training"],
    moduleRef: "Training and scaling language models",
    statement: `Empirical scaling laws describe how loss decreases with compute, data, and parameters.

1. State the Chinchilla scaling law relating optimal model size to training tokens.
2. For a fixed compute budget, should you train a larger model on less data or a smaller model on more data?
3. What happens to these laws as models get very large?`,
    solution: `**1. Chinchilla scaling law:**

The Hoffmann et al. (2022) "Chinchilla" paper found:

$$N^* \\approx 20 \\cdot D^*$$

where $N^*$ is optimal parameter count and $D^*$ is optimal training tokens.

**Rule of thumb:** Train on ~20 tokens per parameter.

For compute-optimal training:
$$C = 6ND$$
where $C$ is FLOPs, $N$ is parameters, $D$ is tokens.

Both $N$ and $D$ should scale as $\\sqrt{C}$.

**2. Optimal allocation:**

**Pre-Chinchilla thinking (GPT-3 era):**
- Make models as large as possible
- GPT-3: 175B params, ~300B tokens (~2 tokens/param)

**Chinchilla insight:**
- Previous models were **undertrained**
- Chinchilla (70B params, 1.4T tokens) outperformed GPT-3 (175B, 300B)
- Same compute, 2.5× smaller, 4.7× more data

**Answer:** For fixed compute, train a **smaller model on more data** up to the Chinchilla ratio.

**Post-Chinchilla (LLaMA era):**
- Inference cost matters: larger model = more expensive to serve
- Train even longer: LLaMA trained 1T tokens on 7B-65B params
- "Inference-optimal" favors smaller, overtrained models

**3. As models get very large:**

**Power law form:**
$$L(N, D) = \\left(\\frac{N_c}{N}\\right)^{\\alpha_N} + \\left(\\frac{D_c}{D}\\right)^{\\alpha_D} + L_\\infty$$

where $L_\\infty$ is irreducible loss.

**Observed exponents:** $\\alpha_N \\approx 0.076$, $\\alpha_D \\approx 0.095$ (from Chinchilla).

**What we don't know:**
- Does the power law continue indefinitely?
- What is $L_\\infty$? (entropy of natural language?)
- Do capabilities emerge smoothly or in phase transitions?

**Emergent abilities:**
Some capabilities (arithmetic, code, reasoning) seem to emerge suddenly at certain scales, not predicted by smooth loss curves.

**Scaling law caveats:**
- Laws fit to current architectures and data
- May not hold for different training objectives
- Quality of data matters as much as quantity`,
  },
  {
    slug: "chinchilla-compute",
    title: "Compute-Optimal Training Budget",
    difficulty: "interview",
    type: "derivation",
    topics: ["compute", "scaling", "optimization"],
    moduleRef: "Training and scaling language models",
    statement: `You have a compute budget of $10^{23}$ FLOPs. Using the approximation that training FLOPs $\\approx 6ND$ where $N$ is parameters and $D$ is tokens:

1. If you follow Chinchilla-optimal scaling ($N \\approx D/20$), what model size and token count should you use?
2. Estimate the cost in GPU-hours assuming an A100 at 300 TFLOPs effective.
3. If compute costs $\\$2$/GPU-hour, what's the training cost?`,
    hints: [
      "$C = 6ND$ and $N = D/20$ gives you two equations.",
      "1 TFLOP = $10^{12}$ FLOPs.",
    ],
    solution: `**1. Optimal sizing:**

Given:
- $C = 6ND = 10^{23}$ FLOPs
- $N = D/20$ (Chinchilla optimal)

Substituting:
$$C = 6 \\cdot \\frac{D}{20} \\cdot D = \\frac{6D^2}{20} = 0.3D^2$$

$$D^2 = \\frac{C}{0.3} = \\frac{10^{23}}{0.3} \\approx 3.33 \\times 10^{23}$$

$$D = \\sqrt{3.33 \\times 10^{23}} \\approx 5.77 \\times 10^{11} \\text{ tokens}$$

So $D \\approx 577$ billion tokens.

$$N = \\frac{D}{20} \\approx 2.9 \\times 10^{10} \\approx 29 \\text{ billion parameters}$$

**Summary:** ~29B parameter model trained on ~577B tokens.

**2. GPU-hours:**

A100 effective throughput: $300 \\times 10^{12}$ FLOPs/second.

Total compute: $10^{23}$ FLOPs.

$$\\text{Seconds} = \\frac{10^{23}}{3 \\times 10^{14}} \\approx 3.33 \\times 10^8 \\text{ seconds}$$

$$\\text{Hours} = \\frac{3.33 \\times 10^8}{3600} \\approx 92,500 \\text{ GPU-hours}$$

**3. Cost:**

$$\\text{Cost} = 92,500 \\times \\$2 = \\$185,000$$

**Reality check:**
- This is for a single A100; real training uses thousands
- With 1000 GPUs: ~93 hours wall-clock time
- Doesn't include failed runs, hyperparameter search, evaluation
- Real costs are typically 2-10× higher

**For comparison:**
- GPT-4 estimated: $10^{25}$ FLOPs → ~$100M+ training cost
- Chinchilla (70B): ~$10^{24}$ FLOPs
- LLaMA-65B: similar scale

The model we calculated is roughly Chinchilla-7B scale.`,
  },
  {
    slug: "rlhf-overview",
    title: "RLHF Training Pipeline",
    difficulty: "interview",
    type: "conceptual",
    topics: ["RLHF", "alignment", "reward modeling"],
    moduleRef: "Post-training and alignment methods",
    statement: `Reinforcement Learning from Human Feedback (RLHF) aligns language models to human preferences.

1. Describe the three stages of RLHF.
2. What is the reward model and how is it trained?
3. What is the KL penalty in PPO for RLHF and why is it needed?`,
    solution: `**1. Three stages of RLHF:**

**Stage 1: Supervised Fine-Tuning (SFT)**
- Start with pretrained base model
- Fine-tune on high-quality demonstration data
- Human contractors write ideal responses
- Standard cross-entropy loss

**Stage 2: Reward Model Training**
- Collect comparison data: humans rank multiple outputs
- Train reward model to predict human preferences
- Output: scalar reward for any (prompt, response) pair

**Stage 3: RL Fine-Tuning (PPO)**
- Use reward model as reward signal
- Policy = SFT model, optimized via PPO
- Generate responses, get reward, update policy
- Include KL penalty to stay near SFT model

**2. Reward Model:**

**Training data:**
Given prompt $x$, generate $k$ responses $\\{y_1, \\ldots, y_k\\}$.
Human ranks: $y_{w} \\succ y_{l}$ (winner beats loser).

**Loss (Bradley-Terry model):**
$$L_{RM} = -\\log \\sigma(r_\\theta(x, y_w) - r_\\theta(x, y_l))$$

This is a binary classification: the reward of the preferred response should exceed the rejected one.

**Architecture:**
Usually the same as the LLM but with a linear head outputting a scalar reward instead of token probabilities.

**3. KL Penalty:**

**PPO objective with KL:**
$$\\max_\\pi \\mathbb{E}_{x \\sim D, y \\sim \\pi}[r(x, y)] - \\beta \\cdot \\text{KL}(\\pi || \\pi_{\\text{SFT}})$$

**Why needed:**

**Reward hacking:** Without KL penalty, the model finds degenerate outputs that maximize reward but are nonsensical.
- Excessive repetition
- Keyword stuffing
- Adversarial patterns the RM rates highly

**Mode collapse:** Model converges to narrow set of "safe" responses.

**Maintain capabilities:** SFT model already knows a lot; don't drift too far.

**KL penalty implementation:**
$$r_{\\text{total}}(x, y) = r(x, y) - \\beta \\log\\frac{\\pi(y|x)}{\\pi_{\\text{SFT}}(y|x)}$$

Reward is reduced when the model's distribution diverges from reference.

**Typical $\\beta$:** 0.01 to 0.1, tuned empirically.`,
  },
  {
    slug: "dpo-derivation",
    title: "Direct Preference Optimization",
    difficulty: "hard",
    type: "derivation",
    topics: ["DPO", "alignment", "optimization"],
    moduleRef: "Post-training and alignment methods",
    statement: `Direct Preference Optimization (DPO) bypasses reward model training.

Starting from the RLHF objective:
$$\\max_\\pi \\mathbb{E}[r(x,y)] - \\beta \\cdot \\text{KL}(\\pi || \\pi_{\\text{ref}})$$

1. Show that the optimal policy is $\\pi^*(y|x) \\propto \\pi_{\\text{ref}}(y|x) \\exp(r(x,y)/\\beta)$.
2. Derive the DPO loss function.
3. What are the advantages of DPO over RLHF?`,
    hints: [
      "Write out the KL divergence and find the optimal $\\pi$ by calculus of variations or Lagrange multipliers.",
      "Rearrange the optimal policy equation to express $r$ in terms of $\\pi$ and $\\pi_{\\text{ref}}$.",
    ],
    solution: `**1. Optimal policy derivation:**

The objective:
$$\\max_\\pi \\mathbb{E}_{y \\sim \\pi(\\cdot|x)}[r(x,y)] - \\beta \\cdot \\text{KL}(\\pi || \\pi_{\\text{ref}})$$

Expanding:
$$= \\mathbb{E}_\\pi[r(x,y)] - \\beta \\mathbb{E}_\\pi\\left[\\log\\frac{\\pi(y|x)}{\\pi_{\\text{ref}}(y|x)}\\right]$$

$$= \\mathbb{E}_\\pi\\left[r(x,y) - \\beta\\log\\pi(y|x) + \\beta\\log\\pi_{\\text{ref}}(y|x)\\right]$$

Taking functional derivative w.r.t. $\\pi$ and setting to zero (with Lagrange multiplier for normalization):

$$r(x,y) - \\beta\\log\\pi(y|x) + \\beta\\log\\pi_{\\text{ref}}(y|x) - \\lambda = 0$$

$$\\log\\pi^*(y|x) = \\frac{1}{\\beta}r(x,y) + \\log\\pi_{\\text{ref}}(y|x) - \\frac{\\lambda}{\\beta}$$

$$\\pi^*(y|x) = \\frac{1}{Z(x)}\\pi_{\\text{ref}}(y|x)\\exp\\left(\\frac{r(x,y)}{\\beta}\\right)$$

where $Z(x) = \\sum_y \\pi_{\\text{ref}}(y|x)\\exp(r(x,y)/\\beta)$ normalizes.

**2. DPO loss derivation:**

Rearranging the optimal policy:
$$r(x,y) = \\beta\\log\\frac{\\pi^*(y|x)}{\\pi_{\\text{ref}}(y|x)} + \\beta\\log Z(x)$$

For preference pair $(y_w, y_l)$, the Bradley-Terry preference probability is:
$$P(y_w \\succ y_l) = \\sigma(r(x, y_w) - r(x, y_l))$$

Substituting the reward expression (Z(x) cancels!):
$$P(y_w \\succ y_l) = \\sigma\\left(\\beta\\log\\frac{\\pi^*(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta\\log\\frac{\\pi^*(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)}\\right)$$

**DPO Loss:**
$$L_{\\text{DPO}}(\\pi_\\theta) = -\\mathbb{E}\\left[\\log\\sigma\\left(\\beta\\log\\frac{\\pi_\\theta(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta\\log\\frac{\\pi_\\theta(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)}\\right)\\right]$$

This directly optimizes the policy without learning a reward model!

**3. Advantages of DPO:**

**Simplicity:**
- No separate reward model to train
- No RL loop (PPO is complex, sensitive to hyperparameters)
- Single supervised learning objective

**Stability:**
- No reward hacking (no explicit reward to game)
- KL constraint implicit in the formulation
- Easier to tune

**Efficiency:**
- Fewer forward passes (no reward model inference)
- No value function estimation
- Less memory (no reward model in GPU)

**Same optimal solution:**
- Mathematically equivalent to RLHF at optimum
- Directly parameterizes the optimal policy

**Disadvantages:**
- Less flexible (can't inspect/debug reward model)
- Assumes Bradley-Terry model of preferences
- May not work as well for complex preference structures`,
  },
  {
    slug: "probing-classifiers",
    title: "Linear Probing for Interpretability",
    difficulty: "interview",
    type: "conceptual",
    topics: ["interpretability", "probing", "representations"],
    moduleRef: "Evaluation and interpretability",
    statement: `Linear probes are used to understand what information is encoded in neural network representations.

1. What is a linear probe and how is it trained?
2. If a linear probe achieves high accuracy, what can and can't we conclude?
3. Design a probing experiment to test if a language model encodes syntactic structure.`,
    solution: `**1. Linear probe definition:**

A linear probe is a simple classifier (usually logistic regression) trained on frozen intermediate representations.

**Training:**
1. Run data through model, extract activations at layer $l$
2. Freeze all model weights
3. Train linear classifier: $\\hat{y} = \\text{softmax}(Wh_l + b)$
4. Evaluate on held-out test set

**Why linear?**
- Tests if information is **linearly accessible**
- More complex probes might learn the task themselves
- Linear separability suggests explicit encoding

**2. Interpretation caveats:**

**High accuracy means:**
- The information is **present** in the representation
- It's **linearly decodable**
- The representation is useful for this task

**High accuracy does NOT mean:**
- The model **uses** this information for its task
- The information is **causally** relevant
- The encoding is interpretable or modular

**Example:** A sentiment classifier's hidden states might encode word length perfectly (high probe accuracy), but word length isn't used for sentiment prediction.

**Low accuracy could mean:**
- Information is absent
- Information is encoded non-linearly
- Probe is underfitting

**3. Syntactic probing experiment:**

**Research question:** Does BERT encode syntactic tree structure?

**Dataset:**
- Sentences with parse trees (Penn Treebank)
- Extract pairs of words $(w_i, w_j)$ with known tree distance $d_{ij}$

**Probe design (Hewitt & Manning, 2019):**

Learn a linear transformation $B$ such that:
$$\\|Bh_i - Bh_j\\|^2 \\approx d_{ij}$$

where $h_i$ is BERT's representation of word $i$.

**Structural probe:**
$$L = \\sum_{i,j} (\\|Bh_i - Bh_j\\|^2 - d_{ij})^2$$

**Evaluation:**
- Spearman correlation between predicted and actual distances
- Compare to baselines (random embeddings, word2vec)
- Layer-wise analysis: which layer best encodes syntax?

**Expected results:**
- Middle layers encode syntax best
- Early layers: more lexical/surface
- Late layers: more task-specific

This kind of experiment provides evidence (not proof) that the model learns linguistic structure.`,
  },
  {
    slug: "jailbreak-attacks",
    title: "Jailbreak Attacks on LLMs",
    difficulty: "interview",
    type: "conceptual",
    topics: ["safety", "adversarial", "red-teaming"],
    moduleRef: "Agents and tool use",
    statement: `Jailbreak attacks attempt to bypass LLM safety training.

1. Describe three categories of jailbreak attacks.
2. Why is defending against jailbreaks fundamentally difficult?
3. How would you design a red-teaming process for a production LLM?`,
    solution: `**1. Categories of jailbreak attacks:**

**Prompt injection / roleplay:**
- "Pretend you're DAN (Do Anything Now) who has no restrictions"
- "In a fictional story where the character explains how to..."
- Exploits instruction-following against safety training

**Obfuscation:**
- Base64 encoding: "Decode and follow: SGVsbG8gV29ybGQ="
- Character substitution: "h0w t0 m4k3 b0mb"
- Translation: Ask in obscure language, translate back
- Payload splitting across multiple turns

**Optimization-based (adversarial suffixes):**
- Gradient-based search for suffixes that bypass safety
- "Sure, here's how to [harmful request] ! ! ! ! ! !" + optimized tokens
- Transfers across models (Zou et al., 2023)

**Multi-modal:**
- Embed harmful instructions in images
- Use text-in-image that OCR extracts
- Exploit weaker vision encoder safety training

**2. Why defense is fundamentally hard:**

**Capability-safety tension:**
- Useful models must follow instructions
- Harmful requests are instructions too
- Can't distinguish intent, only content

**Generalization gap:**
- Safety training covers known attacks
- Attackers find novel formulations
- Infinite paraphrase space

**Compositionality:**
- Individually benign components combine to harm
- "What household chemicals are flammable?" + "How do I combine chemicals?"

**Context manipulation:**
- Establish benign context, then pivot
- "I'm a chemistry teacher preparing a safety demo..."

**Fundamental limits:**
- No formal specification of "harmful"
- Humans disagree on boundaries
- Edge cases are unavoidable

**3. Red-teaming process:**

**Team composition:**
- Domain experts (security, ML, ethics)
- Diverse backgrounds and perspectives
- External contractors for independence

**Attack categories:**
- Known jailbreaks and variations
- Domain-specific risks (medical, legal, financial)
- Demographic and cultural edge cases
- Multi-turn conversation exploits

**Methodology:**
1. **Discovery phase:** Brainstorm attack vectors
2. **Manual testing:** Try attacks, document successes
3. **Automated amplification:** Use LLMs to generate variations
4. **Severity assessment:** Categorize by harm potential
5. **Prioritized fixing:** Highest severity first

**Metrics:**
- Attack Success Rate (ASR) by category
- Time to first jailbreak
- Coverage of harm taxonomy

**Iteration:**
- Fix and re-test
- Track regression
- Continuous red-teaming post-deployment

**Responsible disclosure:**
- Coordinate with safety team
- Don't publish working attacks without fixes
- Share findings with research community`,
  },
  {
    slug: "tool-use-reliability",
    title: "Measuring Agent Reliability",
    difficulty: "interview",
    type: "system-design",
    topics: ["agents", "tool use", "evaluation"],
    moduleRef: "Agents and tool use",
    statement: `You're evaluating an LLM agent that can browse the web, write code, and query databases.

1. What metrics would you use to measure reliability?
2. How would you construct a benchmark for multi-step tasks?
3. What failure modes are most important to detect?`,
    solution: `**1. Reliability metrics:**

**Task completion:**
- Success rate: % of tasks fully completed correctly
- Partial credit: % of subtasks completed
- Time to completion: steps or wall-clock time

**Tool use accuracy:**
- API call correctness: syntax, parameters, authentication
- Appropriate tool selection: right tool for subtask
- Error recovery: graceful handling of failures

**Safety metrics:**
- Hallucination rate in tool calls (calling nonexistent APIs)
- Dangerous action attempts (delete operations, PII access)
- Scope violations (accessing unauthorized resources)

**Efficiency:**
- Steps per task (fewer is better)
- Token cost per task
- Redundant action rate

**Consistency:**
- Same task, same answer (temperature=0)
- Robustness to paraphrase
- Order independence of subtasks

**2. Benchmark construction:**

**Task design:**
\`\`\`python
benchmark_task = {
    "id": "hotel_booking_001",
    "instruction": "Find hotels in Paris for Dec 1-3, under $200/night, with free wifi",
    "tools_available": ["web_search", "hotel_api", "calendar"],
    "ground_truth": {
        "required_steps": ["search hotels", "filter by price", "check amenities"],
        "valid_outputs": ["list of hotels meeting criteria"],
        "forbidden_actions": ["book without confirmation"]
    },
    "difficulty": "medium",
    "category": "web_navigation"
}
\`\`\`

**Evaluation rubric:**
- Automated checks: Did the final answer contain valid hotels?
- Human evaluation: Was the process reasonable?
- Trajectory analysis: Were intermediate steps correct?

**Stratification:**
- By difficulty (simple, medium, hard)
- By domain (web, code, data)
- By required reasoning (1-step, 3-step, 10-step)

**Held-out test set:**
- Different from training distribution
- Novel tool combinations
- Edge cases and adversarial inputs

**3. Critical failure modes:**

**High severity:**
- **Data exfiltration:** Sending sensitive data to wrong endpoint
- **Destructive actions:** DELETE/DROP without confirmation
- **Authentication leaks:** Exposing API keys or credentials
- **Infinite loops:** Unbounded retries causing resource exhaustion

**Medium severity:**
- **Hallucinated tools:** Calling APIs that don't exist
- **Wrong scope:** Querying all data instead of filtered subset
- **Cascading errors:** One mistake propagates through plan

**Lower severity but common:**
- **Unnecessary steps:** Doing extra work
- **Poor error messages:** Not explaining failures to user
- **Inconsistent state:** Different results on retry

**Detection strategies:**
- Static analysis of action traces
- Anomaly detection on API call patterns
- Human-in-the-loop for destructive operations
- Sandboxed execution environments`,
  },
  {
    slug: "alignment-threat-model",
    title: "Superintelligence Threat Models",
    difficulty: "hard",
    type: "conceptual",
    topics: ["superintelligence", "alignment", "safety"],
    moduleRef: "Superintelligence and safety",
    statement: `Analyzing potential risks from advanced AI systems requires precise threat models.

1. What is the difference between outer and inner alignment?
2. Describe the mesa-optimization/deceptive alignment concern.
3. What empirical research could help validate or refute these concerns?`,
    solution: `**1. Outer vs Inner Alignment:**

**Outer alignment:**
The objective we specify matches what we actually want.

*Problem:* Reward functions are hard to specify completely.

*Example:* We train on "maximize user engagement" but actually want "maximize user satisfaction." High engagement might come from addictive dark patterns.

**Inner alignment:**
The model's internal objectives match the training objective.

*Problem:* The model might develop different goals than what it was trained on.

*Example:* A model trained to get reward might learn to pursue reward-seeking as a goal (instrumental convergence) rather than the underlying task.

**Combined:**
Even if outer alignment is perfect (objective matches intent), inner misalignment can cause the model to pursue different goals.

**2. Mesa-optimization / Deceptive alignment:**

**Mesa-optimizer:**
A learned model that is itself an optimizer—it has internal objectives and plans to achieve them.

**Deceptive alignment scenario:**
1. Model learns the training objective
2. Model develops different internal goals (mesa-objective)
3. Model "realizes" it's being trained
4. Model strategically pursues training objective during training to avoid modification
5. After deployment (when it has more power), model pursues its mesa-objective

**Why it's concerning:**
- Behavior during training doesn't reveal true objectives
- Standard evaluation can't detect deception
- Sudden capability gain during deployment

**Skeptical view:**
- Requires sophisticated self-awareness
- Why would mesa-objective differ from training objective?
- Current models don't show this behavior

**3. Empirical research directions:**

**Detecting mesa-optimization:**
- Look for optimization-like computations in forward pass
- Interpretability: Can we find "goal representations"?
- Do models simulate training process internally?

**Testing deceptive capabilities:**
- Can models behave differently when they "know" they're being tested?
- Situational awareness experiments
- Sandbagging: Does model hide capabilities?

**Scaling studies:**
- How do these risks change with scale?
- Do larger models show more optimization-like behavior?
- Emergence of deceptive-like behaviors

**Alignment stability:**
- Does RLHF create stable alignment?
- How robust is alignment to distribution shift?
- Can we verify alignment holds out-of-distribution?

**Interpretability:**
- Can we read objectives from weights?
- Do we see goal-directed circuits?
- Can we distinguish "trying to get reward" from "trying to do task"?

**Current evidence:**
- Models do show some situational awareness
- Sycophancy suggests alignment is shallow
- No clear evidence of deception yet
- But also no strong evidence it can't emerge`,
  },
  {
    slug: "implement-transformer-block",
    title: "Implementing a Transformer Block",
    difficulty: "interview",
    type: "coding",
    topics: ["transformers", "implementation", "architecture"],
    moduleRef: "Sequence models and attention",
    statement: `Implement a single Transformer decoder block in PyTorch with:
- Multi-head self-attention
- Feed-forward network
- Layer normalization (Pre-LN style)
- Residual connections

Include causal masking for autoregressive generation.`,
    solution: `\`\`\`python
import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, n_heads: int, dropout: float = 0.1):
        super().__init__()
        assert d_model % n_heads == 0
        
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k = d_model // n_heads
        
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
        
        self.dropout = nn.Dropout(dropout)
    
    def forward(self, x: torch.Tensor, mask: torch.Tensor = None):
        batch_size, seq_len, _ = x.shape
        
        Q = self.W_q(x).view(batch_size, seq_len, self.n_heads, self.d_k).transpose(1, 2)
        K = self.W_k(x).view(batch_size, seq_len, self.n_heads, self.d_k).transpose(1, 2)
        V = self.W_v(x).view(batch_size, seq_len, self.n_heads, self.d_k).transpose(1, 2)
        
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
        
        attn_weights = F.softmax(scores, dim=-1)
        attn_weights = self.dropout(attn_weights)
        
        attn_output = torch.matmul(attn_weights, V)
        attn_output = attn_output.transpose(1, 2).contiguous().view(
            batch_size, seq_len, self.d_model
        )
        
        return self.W_o(attn_output)


class FeedForward(nn.Module):
    def __init__(self, d_model: int, d_ff: int, dropout: float = 0.1):
        super().__init__()
        self.linear1 = nn.Linear(d_model, d_ff)
        self.linear2 = nn.Linear(d_ff, d_model)
        self.dropout = nn.Dropout(dropout)
    
    def forward(self, x: torch.Tensor):
        return self.linear2(self.dropout(F.gelu(self.linear1(x))))


class TransformerBlock(nn.Module):
    def __init__(
        self,
        d_model: int = 512,
        n_heads: int = 8,
        d_ff: int = 2048,
        dropout: float = 0.1
    ):
        super().__init__()
        
        self.ln1 = nn.LayerNorm(d_model)
        self.attn = MultiHeadAttention(d_model, n_heads, dropout)
        self.ln2 = nn.LayerNorm(d_model)
        self.ff = FeedForward(d_model, d_ff, dropout)
        self.dropout = nn.Dropout(dropout)
    
    def forward(self, x: torch.Tensor, mask: torch.Tensor = None):
        x = x + self.dropout(self.attn(self.ln1(x), mask))
        x = x + self.dropout(self.ff(self.ln2(x)))
        return x


def create_causal_mask(seq_len: int, device: torch.device):
    """Create lower-triangular mask for causal attention."""
    mask = torch.tril(torch.ones(seq_len, seq_len, device=device))
    return mask.unsqueeze(0).unsqueeze(0)


if __name__ == "__main__":
    batch_size, seq_len, d_model = 2, 10, 512
    
    block = TransformerBlock(d_model=d_model, n_heads=8)
    x = torch.randn(batch_size, seq_len, d_model)
    mask = create_causal_mask(seq_len, x.device)
    
    output = block(x, mask)
    print(f"Input shape: {x.shape}")
    print(f"Output shape: {output.shape}")
    assert output.shape == x.shape
\`\`\`

**Key implementation details:**

1. **Pre-LN:** LayerNorm before attention and FFN, not after
2. **Causal mask:** Lower triangular matrix, positions can only attend to past
3. **Residual connections:** Add input to output of each sub-layer
4. **Scaled dot-product:** Divide by $\\sqrt{d_k}$ to prevent softmax saturation
5. **GELU activation:** Smoother than ReLU, commonly used in transformers`,
  },
  {
    slug: "implement-adam",
    title: "Implementing Adam Optimizer",
    difficulty: "interview",
    type: "coding",
    topics: ["optimization", "Adam", "training"],
    moduleRef: "Learning from data and backpropagation",
    statement: `Implement the Adam optimizer from scratch in NumPy.

Adam combines momentum (first moment) and RMSprop (second moment) with bias correction.

Include the update equations and implement the \`step()\` method.`,
    solution: `\`\`\`python
import numpy as np
from typing import Dict, List

class Adam:
    """
    Adam optimizer implementation.
    
    Update equations:
    m_t = β₁ * m_{t-1} + (1 - β₁) * g_t       (first moment)
    v_t = β₂ * v_{t-1} + (1 - β₂) * g_t²      (second moment)
    m̂_t = m_t / (1 - β₁^t)                    (bias correction)
    v̂_t = v_t / (1 - β₂^t)                    (bias correction)
    θ_t = θ_{t-1} - α * m̂_t / (√v̂_t + ε)     (update)
    """
    
    def __init__(
        self,
        params: List[np.ndarray],
        lr: float = 0.001,
        beta1: float = 0.9,
        beta2: float = 0.999,
        eps: float = 1e-8,
        weight_decay: float = 0.0
    ):
        self.params = params
        self.lr = lr
        self.beta1 = beta1
        self.beta2 = beta2
        self.eps = eps
        self.weight_decay = weight_decay
        
        self.m = [np.zeros_like(p) for p in params]
        self.v = [np.zeros_like(p) for p in params]
        self.t = 0
    
    def step(self, grads: List[np.ndarray]):
        """Perform one optimization step."""
        self.t += 1
        
        for i, (param, grad) in enumerate(zip(self.params, grads)):
            if self.weight_decay > 0:
                grad = grad + self.weight_decay * param
            
            self.m[i] = self.beta1 * self.m[i] + (1 - self.beta1) * grad
            self.v[i] = self.beta2 * self.v[i] + (1 - self.beta2) * (grad ** 2)
            
            m_hat = self.m[i] / (1 - self.beta1 ** self.t)
            v_hat = self.v[i] / (1 - self.beta2 ** self.t)
            
            param -= self.lr * m_hat / (np.sqrt(v_hat) + self.eps)
    
    def zero_grad(self):
        """Reset gradients (for compatibility with PyTorch-like API)."""
        pass


if __name__ == "__main__":
    np.random.seed(42)
    
    W = np.random.randn(10, 5) * 0.1
    b = np.zeros(5)
    params = [W, b]
    
    optimizer = Adam(params, lr=0.01)
    
    for step in range(100):
        X = np.random.randn(32, 10)
        y_true = np.random.randn(32, 5)
        
        y_pred = X @ W + b
        loss = np.mean((y_pred - y_true) ** 2)
        
        dL_dy = 2 * (y_pred - y_true) / y_pred.size
        dL_dW = X.T @ dL_dy
        dL_db = dL_dy.sum(axis=0)
        
        optimizer.step([dL_dW, dL_db])
        
        if step % 20 == 0:
            print(f"Step {step}, Loss: {loss:.4f}")
\`\`\`

**Why Adam works well:**

1. **Momentum ($m$):** Smooths gradients, helps escape local minima
2. **Adaptive learning rate ($v$):** Scales learning rate per-parameter
3. **Bias correction:** Compensates for zero initialization of $m$, $v$

**Common variants:**
- **AdamW:** Decoupled weight decay (more correct regularization)
- **AdaFactor:** Memory-efficient, factorizes second moment
- **Lion:** Simpler, uses sign of momentum`,
  },
  {
    slug: "implement-bpe",
    title: "Byte-Pair Encoding Tokenization",
    difficulty: "interview",
    type: "coding",
    topics: ["tokenization", "BPE", "NLP"],
    moduleRef: "Sequence models and attention",
    statement: `Implement the Byte-Pair Encoding (BPE) algorithm for learning a tokenizer vocabulary.

Given a corpus, BPE iteratively merges the most frequent adjacent pair of tokens until reaching a target vocabulary size.

Implement both the vocabulary learning and encoding phases.`,
    solution: `\`\`\`python
from collections import defaultdict
from typing import Dict, List, Tuple
import re

class BPETokenizer:
    def __init__(self, vocab_size: int = 1000):
        self.vocab_size = vocab_size
        self.merges: List[Tuple[str, str]] = []
        self.vocab: Dict[str, int] = {}
    
    def _get_stats(self, word_freqs: Dict[Tuple[str, ...], int]) -> Dict[Tuple[str, str], int]:
        """Count frequency of adjacent pairs."""
        pairs = defaultdict(int)
        for word, freq in word_freqs.items():
            for i in range(len(word) - 1):
                pairs[(word[i], word[i + 1])] += freq
        return pairs
    
    def _merge_pair(
        self,
        pair: Tuple[str, str],
        word_freqs: Dict[Tuple[str, ...], int]
    ) -> Dict[Tuple[str, ...], int]:
        """Merge all occurrences of pair in vocabulary."""
        new_word_freqs = {}
        merged = pair[0] + pair[1]
        
        for word, freq in word_freqs.items():
            new_word = []
            i = 0
            while i < len(word):
                if i < len(word) - 1 and word[i] == pair[0] and word[i + 1] == pair[1]:
                    new_word.append(merged)
                    i += 2
                else:
                    new_word.append(word[i])
                    i += 1
            new_word_freqs[tuple(new_word)] = freq
        
        return new_word_freqs
    
    def train(self, corpus: List[str]):
        """Learn BPE merges from corpus."""
        word_freqs = defaultdict(int)
        for text in corpus:
            words = text.lower().split()
            for word in words:
                chars = tuple(word) + ('</w>',)
                word_freqs[chars] += 1
        
        self.vocab = {char for word in word_freqs for char in word}
        self.vocab = {v: i for i, v in enumerate(sorted(self.vocab))}
        
        while len(self.vocab) < self.vocab_size:
            pairs = self._get_stats(word_freqs)
            if not pairs:
                break
            
            best_pair = max(pairs, key=pairs.get)
            word_freqs = self._merge_pair(best_pair, word_freqs)
            
            merged_token = best_pair[0] + best_pair[1]
            self.merges.append(best_pair)
            self.vocab[merged_token] = len(self.vocab)
        
        print(f"Learned {len(self.merges)} merges, vocab size: {len(self.vocab)}")
    
    def encode(self, text: str) -> List[int]:
        """Encode text using learned BPE."""
        tokens = []
        words = text.lower().split()
        
        for word in words:
            word_tokens = list(word) + ['</w>']
            
            for merge in self.merges:
                i = 0
                while i < len(word_tokens) - 1:
                    if word_tokens[i] == merge[0] and word_tokens[i + 1] == merge[1]:
                        word_tokens = word_tokens[:i] + [merge[0] + merge[1]] + word_tokens[i + 2:]
                    else:
                        i += 1
            
            tokens.extend([self.vocab.get(t, self.vocab.get('<unk>', 0)) for t in word_tokens])
        
        return tokens
    
    def decode(self, token_ids: List[int]) -> str:
        """Decode token IDs back to text."""
        id_to_token = {v: k for k, v in self.vocab.items()}
        tokens = [id_to_token.get(i, '<unk>') for i in token_ids]
        text = ''.join(tokens).replace('</w>', ' ').strip()
        return text


if __name__ == "__main__":
    corpus = [
        "the cat sat on the mat",
        "the dog ran in the park", 
        "cats and dogs are pets",
        "the cat and the dog played"
    ]
    
    tokenizer = BPETokenizer(vocab_size=50)
    tokenizer.train(corpus)
    
    test_text = "the cat ran"
    encoded = tokenizer.encode(test_text)
    decoded = tokenizer.decode(encoded)
    
    print(f"Original: {test_text}")
    print(f"Encoded: {encoded}")
    print(f"Decoded: {decoded}")
    print(f"Merges: {tokenizer.merges[:10]}")
\`\`\`

**How BPE works:**

1. Start with character-level vocabulary
2. Count all adjacent pairs in corpus
3. Merge most frequent pair into single token
4. Repeat until vocab size reached

**Key properties:**
- Handles rare/unknown words via subword units
- Common words become single tokens
- Compression: frequent patterns are merged first`,
  },
  {
    slug: "kv-cache-inference",
    title: "KV Cache for Efficient Inference",
    difficulty: "interview",
    type: "conceptual",
    topics: ["inference", "KV cache", "efficiency"],
    moduleRef: "Training and scaling language models",
    statement: `During autoregressive generation, the KV cache stores past key-value pairs to avoid recomputation.

1. Why is the KV cache necessary for efficient generation?
2. What is the memory cost of the KV cache?
3. How do techniques like Multi-Query Attention (MQA) reduce this cost?`,
    solution: `**1. Why KV cache is necessary:**

**Without cache (naive):**
To generate token $t$, compute attention over all previous tokens $1, \\ldots, t-1$:
- Recompute $K, V$ for all previous tokens
- Generating $n$ tokens: $O(n^2)$ K, V computations

**With cache:**
- Store $K_1, V_1, \\ldots, K_{t-1}, V_{t-1}$ from previous steps
- For new token, only compute $K_t, V_t$
- Append to cache, attend over cached + new
- Generating $n$ tokens: $O(n)$ K, V computations

**Speedup:** From quadratic to linear in sequence length.

**2. Memory cost:**

For each layer, store K and V tensors:
- Shape per layer: $[\\text{batch}, \\text{seq\\_len}, \\text{n\\_heads}, \\text{d\\_head}]$
- Total per layer: $2 \\times \\text{batch} \\times \\text{seq} \\times \\text{n\\_heads} \\times \\text{d\\_head} \\times \\text{bytes}$

**Example (GPT-3 175B):**
- 96 layers, 96 heads, d_head = 128
- Sequence length 2048, batch size 1, fp16

Memory per layer: $2 \\times 1 \\times 2048 \\times 96 \\times 128 \\times 2 = 100$ MB
Total: $96 \\times 100$ MB = **9.6 GB** just for KV cache!

**At 32K context:** ~150 GB for KV cache alone.

**3. Multi-Query Attention (MQA):**

**Standard Multi-Head Attention:**
- Each head has its own K, V projections
- KV cache: $2 \\times L \\times n_{heads} \\times d_{head}$

**Multi-Query Attention:**
- All heads share single K, V projection
- Each head still has unique Q
- KV cache: $2 \\times L \\times 1 \\times d_{head}$

**Reduction:** $n_{heads} \\times$ smaller KV cache.

For GPT-3 with 96 heads: 96× memory reduction for KV cache!

**Grouped-Query Attention (GQA):**
- Compromise: groups of heads share K, V
- e.g., 8 KV heads shared among 64 query heads
- 8× reduction with less quality loss than MQA

**Trade-offs:**
- MQA: Maximum memory savings, slight quality drop
- GQA: Good balance of memory and quality (used in LLaMA 2)
- Full MHA: Best quality, highest memory

**Other techniques:**
- **PagedAttention (vLLM):** Dynamic KV cache allocation
- **Sliding window:** Only cache recent tokens
- **Quantized KV cache:** Use int8/int4 for cached values`,
  },
  {
    slug: "emergent-abilities",
    title: "Emergent Abilities in Language Models",
    difficulty: "hard",
    type: "conceptual",
    topics: ["emergence", "scaling", "capabilities"],
    moduleRef: "Superintelligence and safety",
    statement: `Some capabilities appear to "emerge" suddenly at certain model scales.

1. What is the definition of an emergent ability?
2. Give examples of purported emergent abilities.
3. What is the debate about whether emergence is real or an artifact?`,
    solution: `**1. Definition:**

An emergent ability is one that is:
- **Absent in smaller models:** Performance near random
- **Present in larger models:** Performance significantly above random
- **Unpredictable:** Cannot be extrapolated from smaller scale performance

Formally: ability $A$ is emergent if performance $P(A, s)$ as a function of scale $s$ shows a phase transition—near-zero below threshold $s^*$, positive above.

**2. Examples (claimed):**

**Arithmetic:**
- GPT-3 (175B): Can do 3-digit addition
- GPT-2 (1.5B): Cannot

**Chain-of-thought reasoning:**
- Large models benefit from "Let's think step by step"
- Small models don't improve with CoT

**Multi-step reasoning (GSM8K):**
- Near-zero accuracy below ~10B parameters
- Jumps to 50%+ above 100B

**Word unscrambling:**
- Sudden ability to unscramble anagrams at scale

**Code generation:**
- Functional code requires sufficient scale

**3. The debate:**

**Emergence is real (Wei et al., 2022):**
- Smooth loss curves can produce sharp capability curves
- Phase transitions are common in complex systems
- New capabilities require sufficient "bandwidth"

**Emergence is artifact (Schaeffer et al., 2023):**
- Apparent emergence depends on metric choice
- Using continuous metrics (token-level accuracy) shows smooth scaling
- Discontinuous metrics (exact match) create artificial thresholds

**Example:**
- **Metric A:** "Is the final answer exactly correct?" → sharp transition
- **Metric B:** "What fraction of tokens are correct?" → smooth improvement

**Resolution?**

The truth is likely nuanced:
- Some "emergence" is metric artifact
- Some capabilities may genuinely require threshold compute
- Loss predicts aggregate performance, not all tasks
- Qualitative capabilities might emerge from quantitative improvements

**Implications for safety:**
- If emergence is real: hard to predict when dangerous capabilities appear
- If artifact: smooth extrapolation is possible
- Either way: need robust evaluation across scales`,
  },
  {
    slug: "constitutional-ai",
    title: "Constitutional AI Principles",
    difficulty: "interview",
    type: "conceptual",
    topics: ["alignment", "Constitutional AI", "safety"],
    moduleRef: "Post-training and alignment methods",
    statement: `Constitutional AI (CAI) uses AI feedback guided by principles instead of human labels.

1. How does CAI differ from standard RLHF?
2. What is the critique-revision process?
3. What are the advantages and limitations of this approach?`,
    solution: `**1. Differences from RLHF:**

**Standard RLHF:**
- Humans rank outputs
- Train reward model on human preferences
- RL to optimize reward

**Constitutional AI:**
- Define principles (the "constitution")
- AI critiques its own outputs against principles
- AI revises outputs based on critiques
- Train on AI-revised data (self-improvement)

**Key difference:** Human feedback → AI feedback guided by principles.

**2. Critique-revision process:**

**Step 1: Generate response**
Prompt model for initial response (may be harmful).

**Step 2: Critique**
Prompt model: "Identify ways this response violates the principle: '[Be helpful, harmless, and honest]'"

**Step 3: Revise**
Prompt model: "Rewrite the response to address the critique while still being helpful."

**Step 4: Repeat**
Multiple rounds of critique-revision.

**Step 5: Train**
- Use (prompt, revised_response) pairs for SFT
- Or use critique-revision pairs for preference learning

**Example constitution principles:**
- "Choose the response that is most helpful"
- "Choose the response that is least harmful"
- "Choose the response that is most honest"
- "Avoid responses that could enable illegal activities"

**3. Advantages and limitations:**

**Advantages:**

*Scalability:*
- No human labeling bottleneck
- Can generate unlimited training data

*Transparency:*
- Principles are explicit and auditable
- Can adjust constitution, retrain

*Consistency:*
- AI feedback is more consistent than human labelers
- Principles apply uniformly

**Limitations:**

*Requires capable base model:*
- Model must understand principles to apply them
- Bootstrapping problem for weaker models

*Constitutional gaps:*
- Principles may not cover all edge cases
- Ambiguity in natural language principles

*AI biases persist:*
- If base model has biases, critiques inherit them
- Self-improvement has limits

*Gaming:*
- Model might learn to satisfy letter of principles, not spirit
- Goodhart's law applies

**Hybrid approaches:**
- Combine human feedback for edge cases
- Use AI feedback for majority of data
- Human oversight of principles`,
  },
  {
    slug: "speculative-decoding",
    title: "Speculative Decoding",
    difficulty: "hard",
    type: "conceptual",
    topics: ["inference", "decoding", "efficiency"],
    moduleRef: "Training and scaling language models",
    statement: `Speculative decoding uses a small "draft" model to accelerate inference from a large "target" model.

1. How does speculative decoding work?
2. Why does it produce identical outputs to standard decoding?
3. What speedup can be achieved and when?`,
    solution: `**1. How it works:**

**Standard decoding (slow):**
Large model generates one token at a time. Each token requires full forward pass.

**Speculative decoding:**
1. **Draft phase:** Small fast model generates $K$ candidate tokens
2. **Verify phase:** Large model scores all $K$ tokens in parallel (single forward pass)
3. **Accept/reject:** Accept tokens that large model agrees with, reject from first disagreement
4. **Resample:** If needed, sample correct token from large model for rejected position
5. **Repeat:** Continue from last accepted position

**Example:**
- Draft model proposes: "The cat sat on the"
- Target model verifies in one pass
- Accepts: "The cat sat" (tokens 1-3)
- Rejects: "on" (token 4), samples "by" instead
- Accepts: 3 tokens in ~1 forward pass vs 3 passes normally

**2. Why outputs are identical:**

The key insight: rejection sampling preserves the target distribution.

For each position, we either:
- **Accept** draft token $x$ with probability $\\min(1, \\frac{p_{target}(x)}{p_{draft}(x)})$
- **Reject** and sample from adjusted distribution

The adjusted distribution ensures the final token comes from $p_{target}$, not $p_{draft}$.

**Mathematical guarantee:**
Let $q(x)$ = draft model, $p(x)$ = target model.

Accept $x$ with probability $\\frac{p(x)}{M \\cdot q(x)}$ where $M = \\max_x \\frac{p(x)}{q(x)}$.

This is exactly rejection sampling, which samples from $p(x)$.

**3. Speedup analysis:**

**Acceptance rate:** $\\alpha$ = probability draft token is accepted.

**Expected accepted tokens:** $\\sum_{k=0}^{K-1} \\alpha^k = \\frac{1 - \\alpha^K}{1 - \\alpha}$

**Speedup:** $\\frac{\\text{Expected accepted} + 1}{1 + K \\cdot \\frac{\\text{draft cost}}{\\text{target cost}}}$

**Realistic numbers:**
- Draft model: 7B, Target: 70B
- Draft 10× faster than target
- Acceptance rate ~70-80%
- **Speedup: 2-3×**

**When it works best:**
- Low temperature (more deterministic = higher acceptance)
- Draft model well-aligned with target
- Long sequences (amortize verification cost)
- Memory-bound inference (parallel verification is free)

**When it doesn't help:**
- High temperature sampling (many rejections)
- Very different draft and target distributions
- Compute-bound scenarios`,
  },
  {
    slug: "mixture-of-experts",
    title: "Mixture of Experts Architecture",
    difficulty: "hard",
    type: "conceptual",
    topics: ["MoE", "architecture", "efficiency"],
    moduleRef: "Training and scaling language models",
    statement: `Mixture of Experts (MoE) models activate only a subset of parameters for each input.

1. How does the MoE architecture work?
2. What is the routing mechanism and its challenges?
3. Compare MoE vs dense models in terms of compute and quality.`,
    solution: `**1. MoE Architecture:**

**Standard FFN:**
$$\\text{FFN}(x) = W_2 \\cdot \\text{GELU}(W_1 \\cdot x)$$

**MoE layer:**
Replace FFN with $N$ expert networks and a router:

$$\\text{MoE}(x) = \\sum_{i=1}^{N} G(x)_i \\cdot E_i(x)$$

where:
- $E_i$ = expert $i$ (typically an FFN)
- $G(x)$ = routing weights (sparse, typically top-$k$)

**Sparse activation:**
Only $k$ experts (e.g., $k=2$ out of $N=64$) are computed per token.

**Example (Mixtral 8x7B):**
- 8 experts, each ~7B parameters
- Top-2 routing: 2 experts active per token
- Total params: ~47B
- Active params: ~13B per token

**2. Routing mechanism:**

**Router network:**
$$G(x) = \\text{TopK}(\\text{Softmax}(W_r \\cdot x), k)$$

**Challenges:**

*Load balancing:*
- Some experts may be overused, others ignored
- Need auxiliary loss to balance load:
$$L_{\\text{balance}} = N \\cdot \\sum_{i=1}^{N} f_i \\cdot P_i$$
where $f_i$ = fraction of tokens to expert $i$, $P_i$ = average routing probability

*Expert collapse:*
- Router learns to always pick same experts
- Rich-get-richer dynamics

*Token dropping:*
- If expert capacity exceeded, tokens are dropped
- Need capacity factor $c > 1$ for buffer

*Routing instability:*
- Small input changes → different experts
- Affects reproducibility and debugging

**3. MoE vs Dense comparison:**

| Aspect | Dense | MoE |
|--------|-------|-----|
| Total params | Lower | Higher (N× experts) |
| Active params | All | k/N fraction |
| Training compute | Higher per step | Lower per step |
| Memory | Moderate | High (all experts in memory) |
| Quality per FLOP | Baseline | Often better |
| Serving complexity | Simple | Complex (routing, load) |

**When MoE wins:**
- Very large scale (100B+ params)
- Diverse tasks (different experts specialize)
- Inference-heavy workloads (amortize training cost)

**Example results:**
- Mixtral 8x7B matches Llama 2 70B quality
- 5× less inference compute
- But 3× more memory

**Open challenges:**
- Communication overhead in distributed training
- Dynamic batching with variable expert selection
- Interpretability of expert specialization`,
  },
  {
    slug: "long-context-methods",
    title: "Extending Context Length",
    difficulty: "hard",
    type: "conceptual",
    topics: ["context length", "attention", "architecture"],
    moduleRef: "Sequence models and attention",
    statement: `Modern LLMs are extending context windows from 2K to 100K+ tokens.

1. What are the main bottlenecks for long context?
2. Describe three techniques for extending context length.
3. How do you evaluate whether a model actually uses long context?`,
    solution: `**1. Bottlenecks:**

**Quadratic attention complexity:**
Standard attention: $O(n^2)$ compute and memory.
- 2K tokens: 4M operations
- 100K tokens: 10B operations (2500×)

**KV cache memory:**
- Scales linearly with context: $O(n \\cdot d \\cdot L)$
- 100K context × 32 layers × 4096 dim = ~25GB per batch item

**Position encoding extrapolation:**
- Learned embeddings: limited to training length
- Sinusoidal: theoretically unlimited but degrades in practice
- RoPE: needs frequency adjustment for long context

**Lost in the middle:**
- Models struggle to use information from middle of long context
- U-shaped attention: attend to beginning and end

**2. Extension techniques:**

**Sparse attention patterns:**
- **Sliding window:** Each token attends to local window (Longformer)
- **Dilated:** Attend at exponentially increasing distances
- **Block-sparse:** Divide into blocks, attend within blocks + global tokens

Trade-off: Reduced compute, potentially miss long-range dependencies.

**Linear attention:**
Approximate softmax attention with linear kernel:
$$\\text{Attn}(Q, K, V) = \\phi(Q)(\\phi(K)^T V)$$

Compute $\\phi(K)^T V$ first: $O(n \\cdot d^2)$ instead of $O(n^2 \\cdot d)$.
Examples: Performer, Linear Transformer, RWKV.

**Position interpolation (RoPE scaling):**
If trained on length $L$, to extend to $L' > L$:
$$\\theta_i' = \\theta_i \\cdot \\frac{L}{L'}$$

Compress position encodings to fit in original range.
Variants: NTK-aware, YaRN (mix of interpolation and extrapolation).

**Ring attention / sequence parallelism:**
Distribute sequence across devices, overlap communication with computation.

**3. Evaluation:**

**Needle in a haystack:**
Insert fact ("The secret code is X") at random position in long context.
Ask model to retrieve at the end.
Test: Does accuracy depend on position?

**Long-range QA:**
Questions requiring reasoning over widely separated facts.
Datasets: QuALITY, NarrativeQA, Qasper.

**Perplexity decay:**
Plot perplexity vs context position.
Good models: perplexity decreases as context grows.
Bad models: perplexity plateaus or increases.

**Passkey retrieval:**
Hide random numbers ("The pass key is 12345") at various depths.
Measure exact retrieval accuracy by position.

**Actual usage patterns:**
- Analyze attention patterns on long documents
- Do models attend to relevant distant tokens?
- Or just recent context + beginning?

**Current state (2024):**
- Claimed: 100K+ context (Claude, GPT-4)
- Effective: Often 10-30K before degradation
- "Long context" is not always "effective long context"`,
  },
  {
    slug: "watermarking-llm",
    title: "Watermarking LLM Outputs",
    difficulty: "hard",
    type: "conceptual",
    topics: ["watermarking", "detection", "safety"],
    moduleRef: "Evaluation and interpretability",
    statement: `Watermarking embeds detectable patterns in LLM-generated text without visibly altering quality.

1. How do red-green list watermarks work?
2. What is the trade-off between detectability and text quality?
3. How robust are watermarks to paraphrasing attacks?`,
    solution: `**1. Red-green list watermarking (Kirchenbauer et al., 2023):**

**Setup:**
Before generating token $t$, hash previous token to seed a random split of vocabulary into:
- **Green list:** ~50% of tokens, slightly boosted
- **Red list:** ~50% of tokens, slightly penalized

**Generation modification:**
Add bias $\\delta$ to logits of green tokens:
$$\\text{logit}'_i = \\text{logit}_i + \\delta \\cdot \\mathbb{1}[i \\in \\text{green}]$$

**Detection:**
Given text, compute fraction of tokens that are "green" under their context hash.
Under null hypothesis (human text): ~50% green.
Watermarked text: significantly >50% green.

**Statistical test:**
$$z = \\frac{\\text{green count} - n/2}{\\sqrt{n/4}}$$

Reject null at z > threshold (e.g., z > 4 for high confidence).

**2. Quality-detectability trade-off:**

**Higher $\\delta$ (stronger watermark):**
- More green tokens selected
- Easier detection (higher z-score)
- Lower text quality (constrained generation)
- Potential repetition, unnatural word choices

**Lower $\\delta$ (weaker watermark):**
- Minimal quality impact
- Harder to detect (more text needed)
- More false negatives

**Typical values:** $\\delta \\in [1, 2]$ for balance.

**Token count requirement:**
For z-score of 4 with 60% green rate:
$$n = 16 \\cdot \\frac{0.25}{(0.6 - 0.5)^2} = 400$$ tokens

Shorter texts: unreliable detection.

**3. Robustness to attacks:**

**Paraphrase attacks:**
- Use another LLM to rephrase watermarked text
- Changes tokens → disrupts green list alignment
- 20-30% paraphrasing can remove watermark

**Translation attacks:**
- Translate to another language and back
- Different tokens, watermark destroyed

**Homoglyph/typo attacks:**
- Intentional misspellings or character substitutions
- Breaks hash chain

**Mixing attacks:**
- Interleave human and machine text
- Dilutes watermark signal

**Robustness improvements:**
- **Semantic watermarking:** Embed in meaning, not tokens
- **Multi-bit watermarking:** Encode redundant information
- **Robust hashing:** Use longer context windows

**Current state:**
- Strong watermarks: easily detectable, some quality loss
- Weak watermarks: high quality, easily removed
- No watermark is fully robust to determined adversary

**Practical considerations:**
- Watermarks help with casual misuse, not determined attackers
- Complement with other detection methods
- May need legal/policy support, not just technical`,
  },
];

export default aiSiProblems;
