import { offer } from "@/content/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "How Academy K works";
export const size = ogSize;
export const contentType = ogContentType;

export default function MethodOpenGraphImage() {
  return ogImage({
    label: "ACADEMY K · 03 / METHOD",
    title: "How it works",
    chips: ["Proof of work", "Verified by the platform"],
    subtitle: `Self-paced work, checked by the platform. ${offer.liveSessions} optional live sessions.`,
  });
}
