"use client";

import { useEffect } from "react";
import { captureUtmOnce } from "@/lib/utm";

/**
 * Captures UTM parameters and referrer on first page load.
 * Include once in the root layout; renders nothing visible.
 */
export function UtmCapture() {
  useEffect(() => {
    captureUtmOnce();
  }, []);

  return null;
}
