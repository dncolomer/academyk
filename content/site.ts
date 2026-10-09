export const site = {
  name: "Academy K",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://academyk.com",
  description: "Learn the frontier tech that climbs the Kardashev scale. Three tracks: quantum computing, AI / SI and thermodynamic computing.",
  contact: "daniel@uncertain.systems",
  observatoryUrl: "https://observatoryk.vercel.app",
  platformUrl: "https://uncertain.systems",
  github: "https://github.com/dncolomer/academyk",
};

export const waitlistHref = (subject: string) =>
  `mailto:${site.contact}?subject=${encodeURIComponent(subject)}`;
