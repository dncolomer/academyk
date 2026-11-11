/**
 * Founding price cutoff: 11 Nov 2026 23:59:59 Europe/Berlin (CET, UTC+1).
 * After this moment, the site shows only the later price.
 */
export const FOUNDING_PRICE_CUTOFF_MS = Date.UTC(2026, 10, 11, 22, 59, 59, 999);

export function isFoundingPriceActive(): boolean {
  return Date.now() <= FOUNDING_PRICE_CUTOFF_MS;
}

export function foundingPriceEndsLabel(): string {
  return "11 Nov 2026";
}
