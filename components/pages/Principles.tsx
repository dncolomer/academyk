const principles = [
  {
    index: "01",
    title: "Checked work",
    body: "A module is complete when the platform has checked the artefact.",
  },
  {
    index: "02",
    title: "Three tracks only",
    body: "Quantum computing, AI / SI and thermodynamic computing. We keep the list short so each course can be done properly.",
  },
  {
    index: "03",
    title: "Build the thing",
    body: "You learn by producing the work in a workspace: code, a derivation, a model, or a written analysis.",
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
