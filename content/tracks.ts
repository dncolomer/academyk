import type { Track } from "./types";

const STATUS = "Sample syllabus — draft";

const sharedFormat = (live: string) => [
  { label: "Self-paced", detail: "Readings, worked examples and a guided workspace you can open any time." },
  { label: "Live cohort sessions", detail: live },
  { label: "Verification", detail: "Each module ends with a proof-of-work deliverable, checked by the Uncertain Systems platform instead of a multiple-choice test." },
];

export const tracks: Track[] = [
  {
    slug: "quantum-computing",
    index: "01",
    title: "Quantum Computing",
    short: "Quantum",
    tagline: "Qubits, circuits, algorithms and error correction, built up from linear algebra to working programs.",
    hook:
      "Classical machines climb the Kardashev scale by spending more energy on more bits. Quantum computers change the trade: for some problems, the state space grows exponentially with every added qubit, so the cost of an answer is no longer set by the number of switches you can power. This track teaches the model of computation behind that shift, and what it takes to keep fragile quantum states alive long enough to be useful.",
    kardashevAngle: "A different curve between energy spent and problems solved.",
    audience: [
      "Software engineers who want a rigorous, hands-on entry into quantum programming.",
      "Physics, maths and computer-science students moving from theory to implementation.",
      "Technical founders and researchers who need to judge quantum claims for themselves.",
    ],
    prerequisites: [
      "Comfortable with Python and basic command-line work.",
      "Linear algebra: vectors, matrices, eigenvalues. A refresher module is provided.",
      "Basic probability. No prior quantum mechanics required.",
    ],
    timeCommitment: { duration: "10 weeks (draft)", weekly: "6–8 hours per week", note: "Time commitment is indicative and may change before the first cohort." },
    format: sharedFormat("Weekly live session to work through the hardest ideas, review submitted proofs and ask questions."),
    modules: [
      { title: "Linear algebra for quantum states", summary: "Hilbert spaces, inner products, unitary and Hermitian operators, tensor products.", proof: "A small Python library that builds multi-qubit states and operators and passes a set of identity checks." },
      { title: "Qubits, measurement and the Bloch sphere", summary: "State vectors, the Born rule, projective measurement and basis changes.", proof: "A single-qubit simulator that reproduces predicted measurement statistics over many shots." },
      { title: "Gates and circuits", summary: "Universal gate sets, entanglement, Bell states, and circuit identities.", proof: "A circuit simulator, verified against hand-derived outputs for a set of reference circuits." },
      { title: "Early algorithms", summary: "Interference as a resource: Deutsch–Jozsa, Bernstein–Vazirani, Simon's problem.", proof: "Implementations of each algorithm with a written argument for why the query count improves." },
      { title: "Fourier transform, phase estimation and factoring", summary: "The quantum Fourier transform, phase estimation, and the structure of period finding.", proof: "A working period-finding routine on small instances, with a resource estimate for larger ones." },
      { title: "Search and amplitude amplification", summary: "Grover's algorithm, amplitude amplification, and the limits of quadratic speed-ups.", proof: "A search circuit with measured success probability against the analytic curve." },
      { title: "Noise and quantum error correction", summary: "Decoherence, noise channels, repetition and stabiliser codes, thresholds.", proof: "A noisy simulator and a small error-correcting code showing logical error below physical error." },
      { title: "Variational and hybrid methods", summary: "Parameterised circuits, cost functions, optimisation loops and their known pitfalls.", proof: "A variational solver for a small Hamiltonian, with a report on convergence and noise sensitivity." },
      { title: "Capstone: a verified quantum workload", summary: "Choose a problem, formulate it, run it on a simulator, and defend the result.", proof: "A reproducible repository and written analysis, reviewed in a live cohort session." },
    ],
    outcomes: [
      "Write and reason about quantum circuits and algorithms from first principles.",
      "Build a working quantum simulator and use it to test your own ideas.",
      "Explain what error correction costs and why scale is hard.",
      "Read research papers in the field and separate a speed-up from a claim.",
    ],
    faq: [
      { q: "Do I need access to quantum hardware?", a: "No. The track is built around simulators you write and run yourself. Where relevant, we discuss how real devices differ." },
      { q: "Is this a physics course?", a: "It is a computing course. We use the physics needed to define the model, and no more." },
      { q: "Will quantum computers break everything?", a: "We cover what the known algorithms actually require, so you can judge such claims with numbers instead of headlines." },
      { q: "When does it start?", a: "Dates are not set yet. Join the waitlist and we will write to you." },
    ],
    status: STATUS,
  },
  {
    slug: "ai-si",
    index: "02",
    title: "AI / SI",
    short: "AI / SI",
    tagline: "From neural networks to superintelligence: how modern AI works, scales, fails and is kept safe.",
    hook:
      "Every step up the Kardashev scale is a step in how much energy can be turned into useful computation. Artificial intelligence is the clearest example of that conversion today, and the question of superintelligence is the question of what happens when the conversion becomes very efficient at improving itself. This track teaches how the systems work, how they scale, and how to reason about their risks without hype.",
    kardashevAngle: "Energy converted into intelligence, and what follows.",
    audience: [
      "Engineers who use AI tools and want to understand the machinery underneath.",
      "Researchers and analysts who need a technical basis for AI strategy and policy questions.",
      "Curious builders who want to move from calling an API to training and evaluating models.",
    ],
    prerequisites: [
      "Python proficiency.",
      "Calculus and linear algebra at undergraduate level; a refresher is provided.",
      "Basic probability and statistics.",
    ],
    timeCommitment: { duration: "12 weeks (draft)", weekly: "6–8 hours per week", note: "Time commitment is indicative and may change before the first cohort." },
    format: sharedFormat("Weekly live session for debugging training runs, reviewing proofs and discussing open questions."),
    modules: [
      { title: "Learning from data", summary: "Models, loss functions, gradient descent, generalisation, overfitting and evaluation.", proof: "A from-scratch regression and classifier with a held-out evaluation report." },
      { title: "Neural networks and backpropagation", summary: "Layers, activations, automatic differentiation and optimisers.", proof: "A small autodiff engine and a network trained with it, checked against numerical gradients." },
      { title: "Sequence models and attention", summary: "Tokenisation, embeddings, attention and the transformer architecture.", proof: "A minimal transformer implemented and trained on a small text corpus." },
      { title: "Training language models", summary: "Pre-training objectives, data pipelines, batching, mixed precision and distributed training basics.", proof: "A reproducible training run with logged loss curves and a written account of what you tuned." },
      { title: "Scaling and compute", summary: "Scaling relationships, compute-optimal training, inference costs and energy per token.", proof: "A scaling experiment across model sizes with a fitted curve and an energy and compute estimate." },
      { title: "Post-training and alignment methods", summary: "Fine-tuning, preference learning, reward modelling and where each breaks.", proof: "A fine-tuned model with a documented preference-learning loop and failure-case analysis." },
      { title: "Evaluation and interpretability", summary: "Benchmarks and their flaws, probing, circuits-style analysis and red-teaming.", proof: "An evaluation harness plus an interpretability investigation of a behaviour in your own model." },
      { title: "Agents and tool use", summary: "Planning, tool calling, memory, long-horizon tasks and measuring reliability.", proof: "A tool-using agent with a test suite of tasks and measured success and failure modes." },
      { title: "Superintelligence and safety", summary: "Capability trajectories, specification and misalignment, oversight, governance and open problems.", proof: "A written threat model for a hypothetical advanced system, with proposed mitigations and their limits." },
      { title: "Capstone: a verified AI system", summary: "Design, build and evaluate a system of your choice, and defend it.", proof: "A reproducible repository, evaluation report and live cohort review." },
    ],
    outcomes: [
      "Implement and train a transformer language model end to end.",
      "Estimate the compute and energy cost of a training or inference workload.",
      "Design evaluations that test what you claim they test.",
      "Reason clearly, and with technical grounding, about advanced AI and its risks.",
    ],
    faq: [
      { q: "Is this about using AI tools?", a: "No. It is about how the systems are built, trained, evaluated and constrained. Tool use is one module." },
      { q: "Do I need a GPU?", a: "Not for most modules. Where a larger run helps, we will provide guidance on small, affordable setups. Details are TBA." },
      { q: "Does the track take a position on superintelligence?", a: "It covers arguments and open problems on several sides, and asks you to build your own reasoned view." },
      { q: "When does it start?", a: "Dates are not set yet. Join the waitlist and we will write to you." },
    ],
    status: STATUS,
  },
  {
    slug: "thermodynamic-computing",
    index: "03",
    title: "Thermodynamic Computing",
    short: "Thermodynamic",
    tagline: "Computing with noise and physics: probabilistic hardware, energy-based models and the true cost of a bit.",
    hook:
      "Computation is a physical process, and every physical process answers to energy. Landauer's principle sets a floor on the heat released when information is erased, and today's chips sit far above it. Thermodynamic computing asks what happens when noise is treated as a resource rather than a nuisance: hardware that samples from probability distributions directly, and models that are natively energy-based. If the climb up the Kardashev scale is limited by energy, this is the track about doing more with each joule.",
    kardashevAngle: "More computation per joule, by working with physics.",
    audience: [
      "Hardware, physics and systems engineers curious about computing beyond deterministic logic.",
      "Machine-learning practitioners who want to understand sampling, energy-based models and efficiency.",
      "Researchers exploring where AI energy costs could fall in the long run.",
    ],
    prerequisites: [
      "Python and basic numerical computing.",
      "Probability and linear algebra at undergraduate level.",
      "Introductory physics helps; statistical mechanics is taught from the start.",
    ],
    timeCommitment: { duration: "9 weeks (draft)", weekly: "6–8 hours per week", note: "Time commitment is indicative and may change before the first cohort." },
    format: sharedFormat("Weekly live session for working through derivations, reviewing proofs and discussing hardware trade-offs."),
    modules: [
      { title: "Entropy, information and heat", summary: "Statistical mechanics essentials: microstates, entropy, free energy and the Boltzmann distribution.", proof: "A simulation of a small system that recovers its Boltzmann distribution and entropy numerically." },
      { title: "Landauer's principle and the cost of computation", summary: "The minimum energy to erase a bit, reversible computing, and how far real hardware is from the bound.", proof: "A worked estimate of energy per operation for a chosen device, compared with the Landauer limit." },
      { title: "Stochastic and probabilistic computing", summary: "Random bits as a primitive, p-bits, stochastic circuits and approximate computing.", proof: "A stochastic circuit simulation that solves a small inference problem with measured error versus sample count." },
      { title: "Sampling: Markov chains and Monte Carlo", summary: "Metropolis–Hastings, Gibbs sampling, mixing times and annealing.", proof: "Samplers implemented for a target distribution, with convergence diagnostics." },
      { title: "Energy-based models", summary: "Energy functions, partition functions, contrastive learning and score-based views.", proof: "An energy-based model trained on a small dataset, with generated samples and a training report." },
      { title: "Ising models and Boltzmann machines", summary: "Spin systems, restricted Boltzmann machines and learning with sampling.", proof: "A Boltzmann machine trained from scratch, with weights checked against a known target distribution." },
      { title: "Sampling hardware", summary: "Physical samplers, noise sources, analogue and probabilistic devices, and their limits.", proof: "A hardware-aware sampler model with noise and precision constraints and a sensitivity analysis." },
      { title: "Connections to AI efficiency", summary: "Energy per inference, where sampling dominates cost, and what hardware could change.", proof: "A comparative model of energy cost for a sampling-heavy workload on conventional and probabilistic hardware." },
      { title: "Capstone: a thermodynamic workload", summary: "Select a sampling or optimisation problem and study how it would run on probabilistic hardware.", proof: "A reproducible study with an energy analysis, reviewed in a live cohort session." },
    ],
    outcomes: [
      "Explain the physical limits on computation and where today's hardware stands against them.",
      "Implement samplers and train energy-based models and Boltzmann machines.",
      "Model a probabilistic hardware design with realistic noise and precision limits.",
      "Evaluate claims about energy-efficient AI with a quantitative framework.",
    ],
    faq: [
      { q: "Is thermodynamic computing a product category?", a: "Here it is a field of study: the physics of computation and hardware that uses randomness directly. We stay vendor-neutral." },
      { q: "Do I need a physics degree?", a: "No. Statistical mechanics is taught from first principles in the first module." },
      { q: "How does it relate to the AI / SI track?", a: "The two share ideas around sampling and energy-based models. You can take either alone." },
      { q: "When does it start?", a: "Dates are not set yet. Join the waitlist and we will write to you." },
    ],
    status: STATUS,
  },
];

export const getTrack = (slug: string) => tracks.find((t) => t.slug === slug);
