const principles = [
  {
    index: "01",
    title: "Proof over passing",
    body: "A module is complete when the artefact is verified, not when a test is passed.",
  },
  {
    index: "02",
    title: "Frontier first",
    body: "The tracks are quantum computing, AI / SI and thermodynamic computing: the tech behind the climb up the Kardashev scale.",
  },
  {
    index: "03",
    title: "Build to understand",
    body: "You learn by producing the thing in a workspace: code, a derivation, a model, or a written analysis.",
  },
] as const;

export function Principles() {
  return (
    <ul className="grid gap-px border border-line bg-line sm:grid-cols-3">
      {principles.map((item) => (
        <li key={item.index} className="min-w-0 bg-bg p-5 sm:p-6">
          <p className="ak-label">{item.index}</p>
          <h3 className="ak-serif mt-4 text-2xl leading-tight text-balance text-ink">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
