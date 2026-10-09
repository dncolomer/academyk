import { offerChips, ogContentType, ogImage, ogSize } from "@/lib/og";
import { offer } from "@/content/site";

export const alt = "How Academy K enrolment works";
export const size = ogSize;
export const contentType = ogContentType;

export default function EnrolOpenGraphImage() {
  return ogImage({
    label: "ACADEMY K · 04 / ENROL",
    title: "How enrolment works",
    subtitle: "Join the waitlist, free. Payment link by email in November. Course starts in December.",
    chips: offerChips,
  });
}
