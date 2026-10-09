import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "How Academy K works";
export const size = ogSize;
export const contentType = ogContentType;

export default function MethodOpenGraphImage() {
  return ogImage({
    label: "ACADEMY K · 03 / METHOD",
    title: "How it works",
    subtitle: "An artefact in a workspace, checked against the module. A portfolio of verified proofs.",
  });
}
