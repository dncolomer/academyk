export const site = {
  name: "Academy K",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://academy-k.com",
  description: "Learn the frontier tech that climbs the Kardashev scale. Three tracks: quantum computing, AI / SI and thermodynamic computing.",
  contact: "daniel@uncertain.systems",
  observatoryUrl: "https://observatoryk.vercel.app",
  platformUrl: "https://uncertain.systems",
  github: "https://github.com/dncolomer/academyk",
};

/** Internal waitlist form. Pass a track slug to preselect it. */
export const waitlistHref = (trackSlug?: string) =>
  trackSlug ? `/waitlist?track=${encodeURIComponent(trackSlug)}` : "/waitlist";

export const mailtoHref = (subject = "Academy K waitlist") =>
  `mailto:${site.contact}?subject=${encodeURIComponent(subject)}`;
