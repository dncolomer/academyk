import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Reserve your place on the Academy K waitlist";
export const size = ogSize;
export const contentType = ogContentType;

export default function WaitlistOpenGraphImage() {
  return ogImage({
    label: "ACADEMY K · 07 / WAITLIST",
    title: "Reserve your place",
    subtitle: "Free to join. A payment link by email in November.",
  });
}
