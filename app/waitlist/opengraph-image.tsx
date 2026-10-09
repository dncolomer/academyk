import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Join the Academy K waitlist";
export const size = ogSize;
export const contentType = ogContentType;

export default function WaitlistOpenGraphImage() {
  return ogImage({
    label: "ACADEMY K · 06 / WAITLIST",
    title: "Join the waitlist",
    subtitle: "Quantum computing, AI / SI and thermodynamic computing. Dates and pricing TBA.",
  });
}
