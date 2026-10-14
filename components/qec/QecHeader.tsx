"use client";

export function QecHeader() {
  return (
    <header className="max-w-3xl">
      <p className="ak-label">Course Proposal</p>
      <h1 className="ak-serif mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
        Quantum Error Correction Engineering
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A 45–50 hour lab-style course that prepares learners to work with the
        tools, concepts, and workflows used in QEC research and engineering.
        From repetition codes to below-threshold surface code operation.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a href="#lab" className="ak-btn">
          Interactive Demo
        </a>
        <a href="#outline" className="ak-btn">
          Full Outline
        </a>
      </div>
    </header>
  );
}
