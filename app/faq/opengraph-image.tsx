import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Academy K questions";
export const size = ogSize;
export const contentType = ogContentType;

export default function FaqOpenGraphImage() {
  return ogImage({
    label: "ACADEMY K · 05 / FAQ",
    title: "Questions",
    subtitle: "Proof of work, cohorts, pricing and certificates. Where it is unset, the answer is TBA.",
  });
}
