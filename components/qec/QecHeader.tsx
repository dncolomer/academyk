"use client";

export function QecHeader() {
  return (
    <header className="max-w-3xl">
      <p className="ak-label">Course Proposal</p>
      <h1 className="ak-serif mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
        Quantum Error Correction: Diagnosis, Simulation, and Engineering
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Learners work with imperfect systems. They inject errors, look at what
        goes wrong, and try to fix it. Through a running project—the Decoder
        Co-Design and Benchmarking Lab—they build and refine a working QEC
        system from noise models to final performance claims.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a href="#outline" className="ak-btn">
          Full Outline
        </a>
      </div>
    </header>
  );
}
