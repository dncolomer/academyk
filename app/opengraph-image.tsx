import { site } from "@/content/site";
import { offerChips, ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Learn the tech that powers the climb.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogImage({
    label: "ACADEMY K · 01 / HOME",
    title: "Learn the tech that powers the climb.",
    subtitle: "Quantum computing, AI / SI and thermodynamic computing.",
    chips: offerChips,
  });
}
