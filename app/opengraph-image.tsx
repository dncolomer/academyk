import { site } from "@/content/site";
import { offerChips, ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "4 week paths into quantum, ai and thermodynamic computing.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return ogImage({
    label: "ACADEMY K · 01 / HOME",
    title: "4 week paths into frontier tech.",
    subtitle: "Quantum computing, AI / SI and thermodynamic computing.",
    chips: offerChips,
  });
}
