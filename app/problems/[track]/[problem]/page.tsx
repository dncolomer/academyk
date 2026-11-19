import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { ProblemContent } from "@/components/ProblemContent";
import { SolutionReveal } from "@/components/problems/SolutionReveal";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/components/tracks/page-meta";
import { getTrack, tracks } from "@/content/tracks";
import { getAllProblemSlugs, getProblem, getProblemsForTrack } from "@/content/problems";
import { difficultyLabels, typeLabels } from "@/content/problem-types";
import { site } from "@/content/site";

type ProblemPageProps = {
  params: Promise<{ track: string; problem: string }>;
};

export function generateStaticParams() {
  return getAllProblemSlugs().map(({ trackSlug, problemSlug }) => ({
    track: trackSlug,
    problem: problemSlug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProblemPageProps): Promise<Metadata> {
  const { track: trackSlug, problem: problemSlug } = await params;
  const track = getTrack(trackSlug);
  const problem = getProblem(trackSlug, problemSlug);

  if (!track || !problem) {
    return pageMetadata({
      title: "Problem",
      description: "Practice problem for Academy K.",
      canonical: "/problems",
    });
  }

  return pageMetadata({
    title: problem.title,
    description: `${difficultyLabels[problem.difficulty]} ${typeLabels[problem.type].toLowerCase()} problem. ${problem.topics.slice(0, 3).join(", ")}.`,
    canonical: `/problems/${trackSlug}/${problemSlug}`,
  });
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { track: trackSlug, problem: problemSlug } = await params;
  const track = getTrack(trackSlug);
  const problem = getProblem(trackSlug, problemSlug);

  if (!track || !problem) notFound();

  const allTrackProblems = getProblemsForTrack(trackSlug);
  const currentIndex = allTrackProblems.findIndex((p) => p.slug === problem.slug);
  const prevProblem = currentIndex > 0 ? allTrackProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < allTrackProblems.length - 1 ? allTrackProblems[currentIndex + 1] : null;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)]">
      <Container className="min-w-0 py-16 sm:py-20 lg:py-24">
        <article>
          <Reveal>
            <header>
              <div className="flex items-center gap-3">
                <Link
                  href={`/problems/${track.slug}`}
                  className="ak-label text-muted hover:text-ink"
                >
                  {track.short} Problems
                </Link>
                <span className="ak-label text-muted">/</span>
                <span className="ak-label text-ink">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
              </div>

              <h1 className="ak-serif mt-4 text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
                {problem.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span
                  className="ak-difficulty-tag"
                  data-difficulty={problem.difficulty}
                >
                  {difficultyLabels[problem.difficulty]}
                </span>
                <span className="ak-topic-tag">{typeLabels[problem.type]}</span>
                {problem.topics.map((topic) => (
                  <span key={topic} className="ak-topic-tag">
                    {topic}
                  </span>
                ))}
              </div>

              {problem.moduleRef && (
                <p className="mt-3 text-sm text-muted">
                  Related module: {problem.moduleRef}
                </p>
              )}
            </header>
          </Reveal>

          <Reveal>
            <section className="mt-10 border border-line p-6 sm:p-8">
              <h2 className="sr-only">Problem statement</h2>
              <ProblemContent content={problem.statement} className="text-ink" />
            </section>
          </Reveal>

          <Reveal>
            <SolutionReveal hints={problem.hints} solution={problem.solution} />
          </Reveal>

          <Reveal>
            <section className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="border border-line p-6">
                <p className="ak-label">Practise this problem</p>
                <p className="mt-3 text-sm text-muted">
                  Verify you understand it—not just that you read the answer.
                </p>
                <div className="mt-4">
                  <LinkButton href={site.platformUrl} solid>
                    Uncertain Systems
                  </LinkButton>
                </div>
              </div>
              <div className="border border-line p-6">
                <p className="ak-label">Learn the foundations</p>
                <p className="mt-3 text-sm text-muted">
                  The {track.title} track covers this topic and more in depth.
                </p>
                <div className="mt-4">
                  <LinkButton href={`/tracks/${track.slug}`}>
                    View {track.short} track
                  </LinkButton>
                </div>
              </div>
            </section>
          </Reveal>
        </article>

        <Reveal>
          <nav
            className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2"
            aria-label="Adjacent problems"
          >
            {prevProblem ? (
              <Link
                href={`/problems/${track.slug}/${prevProblem.slug}`}
                className="ak-link-row bg-bg p-5"
              >
                <span className="ak-label">← Previous</span>
                <span className="mt-2 block text-sm text-ink">{prevProblem.title}</span>
              </Link>
            ) : (
              <div className="bg-bg p-5">
                <span className="ak-label text-muted">Start of track</span>
              </div>
            )}
            {nextProblem ? (
              <Link
                href={`/problems/${track.slug}/${nextProblem.slug}`}
                className="ak-link-row bg-bg p-5 sm:text-right"
              >
                <span className="ak-label">Next →</span>
                <span className="mt-2 block text-sm text-ink">{nextProblem.title}</span>
              </Link>
            ) : (
              <div className="bg-bg p-5 sm:text-right">
                <span className="ak-label text-muted">End of track</span>
              </div>
            )}
          </nav>
        </Reveal>

        <div className="mt-6">
          <Link href={`/problems/${track.slug}`} className="ak-label text-ink hover:underline">
            ← All {track.short} problems
          </Link>
        </div>
      </Container>
    </div>
  );
}
