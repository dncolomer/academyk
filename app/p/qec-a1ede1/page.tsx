import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CourseOutline } from "@/components/qec/CourseOutline";
import { QecHeader } from "@/components/qec/QecHeader";

export const metadata: Metadata = {
  title: "QEC Course Proposal",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

function DemoCard() {
  return (
    <section id="demo" className="scroll-mt-8">
      <div className="ak-card overflow-hidden">
        <div className="p-6 sm:p-8">
          <p className="ak-label">Interactive Demo</p>
          <h2 className="ak-serif mt-3 text-2xl text-ink sm:text-3xl">
            Unit 1: Noise Models
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Experience the Formal notebook interface. Explore bit-flip, phase-flip, 
            and depolarizing noise models. Run simulations, edit code, and see how 
            different parameters affect error rates.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link href="/p/qec-a1ede1/notebook" className="ak-btn">
              Open Notebook Demo
            </Link>
            <span className="text-sm text-muted">
              Colab-style interface with editable code cells
            </span>
          </div>
        </div>
        <div className="border-t border-line bg-ink/5 px-6 py-4 sm:px-8">
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-muted">Format:</span>{" "}
              <span className="text-ink">Formal notebook</span>
            </div>
            <div>
              <span className="text-muted">Cells:</span>{" "}
              <span className="text-ink">5 code + 5 markdown</span>
            </div>
            <div>
              <span className="text-muted">Topics:</span>{" "}
              <span className="text-ink">Bit-flip, Phase-flip, Depolarizing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function QecPitchPage() {
  return (
    <div className="min-h-dvh pb-24">
      <Container className="pt-16 lg:pt-24">
        <QecHeader />
      </Container>

      <Container className="mt-16">
        <DemoCard />
      </Container>

      <Container className="mt-24">
        <CourseOutline />
      </Container>
    </div>
  );
}
