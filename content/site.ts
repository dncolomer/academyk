export const site = {
  name: "Academy K",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://academy-k.com",
  description:
    "Learn the frontier tech that climbs the Kardashev scale. Three four-week, self-paced tracks: quantum computing, AI / SI and thermodynamic computing.",
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

/** Commercial facts for the first cohort. Edit here and every page follows. */
export const offer = {
  weeks: 4,
  liveSessions: 8,
  seats: 25,
  foundingPrice: "$24.99",
  laterPrice: "$49.99",
  cohortStart: "December",
  cohortEnd: "the first week of January",
  /** Bundles: two tracks 10% off the combined price, three tracks 15% off. */
  twoTrackFounding: "$44.98",
  twoTrackLater: "$89.98",
  threeTrackFounding: "$63.72",
  threeTrackLater: "$127.47",
  holidayNote: "with a break over the holidays and the end of the year",
};

/** Short price line for facts and strips. Edit `offer` and this follows. */
export const priceLine = `${offer.foundingPrice} founding, ${offer.laterPrice} later`;

export const bundleNote = `Two tracks together are 10% off and three tracks are 15% off. In the first cohort that is ${offer.twoTrackFounding} for two and ${offer.threeTrackFounding} for three.`;

export const enrolHref = (trackSlug?: string) =>
  trackSlug ? `/enrol?track=${encodeURIComponent(trackSlug)}` : "/enrol";

/**
 * Browser-side waitlist endpoint (FormSubmit email forwarding, token form so the address is hidden).
 * Override with NEXT_PUBLIC_WAITLIST_ENDPOINT at build time.
 */
export const waitlistEndpoint =
  process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? "https://formsubmit.co/ajax/c73c4c6c8aab34ff12d0d5f8abd1f026";
