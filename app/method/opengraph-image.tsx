import { offer } from "@/content/site";
import { offerChips, ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "How Academy K works";
export const size = ogSize;
export const contentType = ogContentType;

export default function MethodOpenGraphImage() {
  return ogImage({
    label: "ACADEMY K · 03 / METHOD",
    title: "How it works",
    chips: offerChips,
    subtitle: "Self-paced, four weeks, with optional live sessions.",
  });
}
