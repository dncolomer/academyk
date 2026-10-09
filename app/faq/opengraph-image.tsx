import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Academy K questions";
export const size = ogSize;
export const contentType = ogContentType;

export default function FaqOpenGraphImage() {
  return ogImage({
    label: "ACADEMY K · 06 / FAQ",
    title: "Questions",
    subtitle: "Cohorts, price, proof of work and how enrolment works.",
  });
}
