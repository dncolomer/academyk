import type { Track } from "./types";

const sharedFormat = () => [
  { label: "Self-paced", detail: "Four weeks. Work whenever suits you." },
  { label: "Eight optional live sessions", detail: "A kickoff session and seven more with a human expert in the field. You can come to all of them, some, or none." },
  { label: "Small cohort", detail: "Limited to 25 people per course." },
];

export const tracks: Track[] = [
  {
    slug: "quantum-computing",
    index: "01",
    title: "Quantum Computing",
    short: "Quantum",
    tagline: "Qubits, circuits, algorithms and error correction. You start with linear algebra and end with working programs.",
    hook:
      "A classical computer gets more powerful by adding switches, and every switch costs energy. A quantum computer adds qubits, and for some problems each one doubles the size of the state it can work with. That is a different relationship between energy spent and problems solved. The hard part is keeping qubits alive long enough to use them.",
    kardashevAngle: "A different cost curve for some problems.",
    audience: [
      "Software engineers who want to learn quantum programming properly, with the maths included.",
      "Physics, maths and computer science students who know the theory and want to implement it.",
      "Founders and researchers who need to check quantum claims for themselves.",
    ],
    prerequisites: [
      "Python, and basic command-line work.",
      "Linear algebra: vectors, matrices, eigenvalues. There is a refresher if yours is rusty.",
      "Basic probability. You do not need any quantum mechanics.",
    ],
    timeCommitment: { duration: "4 weeks", weekly: "Self-paced", note: "Starts in December and runs into the first week of January, with a break over the holidays." },
    format: sharedFormat(),
    modules: [
      { week: 1, title: "Linear algebra and single qubits", summary: "Hilbert spaces, unitary and Hermitian operators, tensor products, state vectors, the Born rule and measurement.", proof: "A small Python library that builds multi-qubit states and operators, plus a single-qubit simulator that reproduces the predicted measurement statistics over many shots." },
      { week: 1, title: "Gates and circuits", summary: "Universal gate sets, entanglement, Bell states and circuit identities.", proof: "A circuit simulator, verified against hand-derived outputs for a set of reference circuits." },
      { week: 2, title: "Early algorithms", summary: "Interference as a resource: Deutsch\u2013Jozsa, Bernstein\u2013Vazirani, Simon's problem.", proof: "Implementations of each algorithm with a written argument for why the query count improves." },
      { week: 2, title: "Fourier transform, phase estimation and factoring", summary: "The quantum Fourier transform, phase estimation, and the structure of period finding.", proof: "A working period-finding routine on small instances, with a resource estimate for larger ones." },
      { week: 3, title: "Search and amplitude amplification", summary: "Grover's algorithm, amplitude amplification, and the limits of quadratic speed-ups.", proof: "A search circuit with measured success probability against the analytic curve." },
      { week: 3, title: "Noise and quantum error correction", summary: "Decoherence, noise channels, repetition and stabiliser codes, thresholds.", proof: "A noisy simulator and a small error-correcting code showing logical error below physical error." },
      { week: 4, title: "Variational and hybrid methods", summary: "Parameterised circuits, cost functions, optimisation loops and their known pitfalls.", proof: "A variational solver for a small Hamiltonian, with a report on convergence and noise sensitivity." },
      { week: 4, title: "Capstone: a verified quantum workload", summary: "Choose a problem, formulate it, run it on a simulator, and defend the result.", proof: "A reproducible repository and written analysis, reviewed with the platform and, if you want, in a live session." },
    ],
    outcomes: [
      "Write quantum circuits and algorithms and explain why they work.",
      "A quantum simulator of your own, which you can use to test ideas.",
      "A clear account of what error correction costs and why scaling up is hard.",
      "The ability to read a quantum paper and tell a proven speed-up from a hopeful one.",
    ],
    faq: [
      { q: "Do I need quantum hardware?", a: "No. You write and run your own simulator. We talk about how real devices differ, but you do not need access to one." },
      { q: "Is this a physics course?", a: "No, it is a computing course. It uses only the physics needed to define the model." },
      { q: "Does it cover breaking encryption?", a: "It covers period finding and what factoring would need in qubits and gates. You can then judge the headlines yourself." },
      { q: "When does it start?", a: "The first cohort starts in December and runs into the first week of January, with a break over the holidays. It is limited to 25 people." },
    ],
  },
  {
    slug: "ai-si",
    index: "02",
    title: "AI / SI",
    short: "AI / SI",
    tagline: "How modern AI is built, trained, evaluated and constrained, from gradient descent to the superintelligence question.",
    hook:
      "Training a large model turns a very large amount of electricity into something that writes code and answers questions. That conversion is the clearest case of energy becoming computation that we have right now. The last part of the course takes superintelligence seriously as a technical question: what would have to be true for it to happen, and what would make it safe.",
    kardashevAngle: "What a joule buys once it is spent on training.",
    audience: [
      "Engineers who use AI tools every day and want to know what is underneath.",
      "Researchers and analysts who work on AI strategy or policy and need the technical basis.",
      "Builders who are done calling an API and want to train and evaluate models themselves.",
    ],
    prerequisites: [
      "Python you can write without looking things up.",
      "Calculus and linear algebra at first-year university level. There is a refresher.",
      "Basic probability and statistics.",
    ],
    timeCommitment: { duration: "4 weeks", weekly: "Self-paced", note: "Starts in December and runs into the first week of January, with a break over the holidays." },
    format: sharedFormat(),
    modules: [
      { week: 1, title: "Learning from data and backpropagation", summary: "Models, loss functions, gradient descent, generalisation, layers, activations and automatic differentiation.", proof: "A small autodiff engine and a network trained with it, checked against numerical gradients, with a held-out evaluation report." },
      { week: 1, title: "Sequence models and attention", summary: "Tokenisation, embeddings, attention and the transformer architecture.", proof: "A minimal transformer implemented and trained on a small text corpus." },
      { week: 2, title: "Training and scaling language models", summary: "Pre-training objectives, data pipelines, mixed precision, scaling relationships, compute-optimal training and energy per token.", proof: "A reproducible training run across a few model sizes, with a fitted scaling curve and a compute and energy estimate." },
      { week: 2, title: "Post-training and alignment methods", summary: "Fine-tuning, preference learning, reward modelling and where each breaks.", proof: "A fine-tuned model with a documented preference-learning loop and failure-case analysis." },
      { week: 3, title: "Evaluation and interpretability", summary: "Benchmarks and their flaws, probing, circuits-style analysis and red-teaming.", proof: "An evaluation harness plus an interpretability investigation of a behaviour in your own model." },
      { week: 3, title: "Agents and tool use", summary: "Planning, tool calling, memory, long-horizon tasks and measuring reliability.", proof: "A tool-using agent with a test suite of tasks and measured success and failure modes." },
      { week: 4, title: "Superintelligence and safety", summary: "Capability trajectories, specification and misalignment, oversight, governance and open problems.", proof: "A written threat model for a hypothetical advanced system, with proposed mitigations and their limits." },
      { week: 4, title: "Capstone: a verified AI system", summary: "Design, build and evaluate a system of your choice, and defend it.", proof: "A reproducible repository and evaluation report, reviewed with the platform and, if you want, in a live session." },
    ],
    outcomes: [
      "A transformer language model that you implemented and trained.",
      "A habit of estimating the compute and energy cost of a training or inference job.",
      "Evaluations that test what you say they test.",
      "A technical basis for talking about advanced AI and its risks.",
    ],
    faq: [
      { q: "Is this about using AI tools?", a: "No. It is about how the systems are built, trained, evaluated and constrained. Tool use gets one module." },
      { q: "Do I need a GPU?", a: "Not for most modules. Where a bigger run helps, we will point you to a small, cheap setup." },
      { q: "Does the track take a position on superintelligence?", a: "It lays out the main arguments and the open problems, and asks you to build your own view from them." },
      { q: "When does it start?", a: "The first cohort starts in December and runs into the first week of January, with a break over the holidays. It is limited to 25 people." },
    ],
  },
  {
    slug: "thermodynamic-computing",
    index: "03",
    title: "Thermodynamic Computing",
    short: "Thermodynamic",
    tagline: "Probabilistic hardware, energy-based models and what a bit costs in joules.",
    hook:
      "Erasing one bit has a minimum heat cost, set by Landauer's principle. Today's chips dissipate far more than that per operation. Thermodynamic computing starts from the other side: use noise instead of fighting it, and build hardware that draws samples from a probability distribution directly. Boltzmann machines are the standard example of a model built around sampling. The course asks what that hardware would save on an AI workload.",
    kardashevAngle: "More computation per joule.",
    audience: [
      "Hardware, physics and systems engineers who want to see computing without deterministic logic.",
      "Machine learning people who want to understand sampling and energy-based models properly.",
      "Researchers asking how far AI's energy costs could fall.",
    ],
    prerequisites: [
      "Python and some numerical computing.",
      "Probability and linear algebra at first-year university level.",
      "Introductory physics helps. Statistical mechanics is taught from the beginning.",
    ],
    timeCommitment: { duration: "4 weeks", weekly: "Self-paced", note: "Starts in December and runs into the first week of January, with a break over the holidays." },
    format: sharedFormat(),
    modules: [
      { week: 1, title: "Entropy, information and heat", summary: "Statistical mechanics essentials: microstates, entropy, free energy and the Boltzmann distribution.", proof: "A simulation of a small system that recovers its Boltzmann distribution and entropy numerically." },
      { week: 1, title: "Landauer's principle and the cost of computation", summary: "The minimum energy to erase a bit, reversible computing, and how far real hardware is from the bound.", proof: "A worked estimate of energy per operation for a chosen device, compared with the Landauer limit." },
      { week: 2, title: "Stochastic computing and sampling", summary: "Random bits as a primitive, p-bits, stochastic circuits, Metropolis\u2013Hastings, Gibbs sampling, mixing times and annealing.", proof: "A stochastic circuit simulation and samplers for a target distribution, with convergence diagnostics and error versus sample count." },
      { week: 2, title: "Energy-based models", summary: "Energy functions, partition functions, contrastive learning and score-based views.", proof: "An energy-based model trained on a small dataset, with generated samples and a training report." },
      { week: 3, title: "Ising models and Boltzmann machines", summary: "Spin systems, restricted Boltzmann machines and learning with sampling.", proof: "A Boltzmann machine trained from scratch, with weights checked against a known target distribution." },
      { week: 3, title: "Sampling hardware", summary: "Physical samplers, noise sources, analogue and probabilistic devices, and their limits.", proof: "A hardware-aware sampler model with noise and precision constraints and a sensitivity analysis." },
      { week: 4, title: "Connections to AI efficiency", summary: "Energy per inference, where sampling dominates cost, and what hardware could change.", proof: "A comparative model of energy cost for a sampling-heavy workload on conventional and probabilistic hardware." },
      { week: 4, title: "Capstone: a thermodynamic workload", summary: "Select a sampling or optimisation problem and study how it would run on probabilistic hardware.", proof: "A reproducible study with an energy analysis, reviewed with the platform and, if you want, in a live session." },
    ],
    outcomes: [
      "A sense of the physical limits on computation, and how far today's hardware is from them.",
      "Working samplers, and energy-based models and Boltzmann machines you trained yourself.",
      "A model of a probabilistic hardware design with realistic noise and precision limits.",
      "A way to put numbers on claims about energy-efficient AI.",
    ],
    faq: [
      { q: "Is thermodynamic computing a product?", a: "Here it is a field of study: the physics of computation, and hardware that uses randomness directly. The track is not tied to any vendor." },
      { q: "Do I need a physics degree?", a: "No. The first module teaches the statistical mechanics you need." },
      { q: "How does it relate to the AI / SI track?", a: "They share ideas about sampling and energy-based models. You can take either one alone." },
      { q: "When does it start?", a: "The first cohort starts in December and runs into the first week of January, with a break over the holidays. It is limited to 25 people." },
    ],
  },
];

export const getTrack = (slug: string) => tracks.find((t) => t.slug === slug);
