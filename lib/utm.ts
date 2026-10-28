const STORAGE_KEY = "ak-utm-data";

export interface UtmData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
}

const EMPTY_UTM: UtmData = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  referrer: "",
};

/**
 * Captures UTM parameters from the URL and document.referrer on first landing.
 * Persists to sessionStorage so values survive navigation within the session.
 * Call this once on app mount (e.g., in root layout client component).
 */
export function captureUtmOnce(): void {
  if (typeof window === "undefined") return;

  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const url = new URL(window.location.href);
    const data: UtmData = {
      utm_source: url.searchParams.get("utm_source") ?? "",
      utm_medium: url.searchParams.get("utm_medium") ?? "",
      utm_campaign: url.searchParams.get("utm_campaign") ?? "",
      referrer: document.referrer || "",
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage unavailable (private mode, etc.); silently skip.
  }
}

/**
 * Retrieves captured UTM data from sessionStorage.
 * Returns empty strings for all fields if nothing was captured.
 */
export function getUtmData(): UtmData {
  if (typeof window === "undefined") return EMPTY_UTM;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_UTM;
    return JSON.parse(raw) as UtmData;
  } catch {
    return EMPTY_UTM;
  }
}
