import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { NotebookDemo } from "@/components/qec/NotebookDemo";

export const metadata: Metadata = {
  title: "Unit 1: Noise Models - QEC Course Demo",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NotebookDemoPage() {
  return (
    <div className="min-h-dvh pb-24">
      <Container className="pt-8">
        <Link
          href="/p/qec-a1ede1"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-cyan-400"
        >
          <span>←</span>
          <span>Back to Course Proposal</span>
        </Link>
      </Container>

      <Container className="mt-8">
        <NotebookDemo />
      </Container>
    </div>
  );
}
