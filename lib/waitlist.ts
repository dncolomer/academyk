export const WAITLIST_TRACKS = [
  "Quantum Computing",
  "AI / SI",
  "Thermodynamic Computing",
  "Not sure yet",
] as const;

export type WaitlistTrack = (typeof WAITLIST_TRACKS)[number];

export const trackSlugToLabel: Record<string, WaitlistTrack> = {
  "quantum-computing": "Quantum Computing",
  "ai-si": "AI / SI",
  "thermodynamic-computing": "Thermodynamic Computing",
};

export const LIMITS = { name: 100, email: 254, message: 1000 } as const;

export const EMAIL_RE = /^[^\s@<>()[\],;:"\\]+@[^\s@<>()[\],;:"\\]+\.[^\s@<>()[\],;:"\\]{2,}$/;
