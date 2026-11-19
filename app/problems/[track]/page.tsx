import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TrackGlyph } from "@/components/TrackGlyph";
import { pageMetadata } from "@/components/tracks/page-meta";
import { getTrack, tracks } from "@/content/tracks";
import { getProblemsForTrack } from "@/content/problems";
import { difficultyLabels, typeLabels } from "@/content/problem-types";
import { site } from "@/content/site";

type TrackProblemsPageProps = {
  params: Promise<{ track: string }>;
};

export function generateStaticParams() {
  return tracks.map((track) => ({ track: track.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: TrackProblemsPageProps): Promise<Metadata> {
  const { track: trackSlug } = await params;
  const track = getTrack(trackSlug);
  if (!track) {
    return pageMetadata({
      title: "Problems",
      description: "Practice problems for Academy K tracks.",
      canonical: "/problems",
    });
  }

  const problems = getProblemsForTrack(trackSlug);
  return pageMetadata({
    title: `${track.title} Problems`,
    description: `${problems.length} practice problems for ${track.title}. Interview-level questions with worked solutions covering ${track.tagline.toLowerCase()}`,
    canonical: `/problems/${trackSlug}`,
  });
}

export default async function TrackProblemsPage({ params }: TrackProblemsPageProps) {
  const { track: trackSlug } = await params;
  const track = getTrack(trackSlug);
  if (!track) notFound();

  const problems = getProblemsForTrack(trackSlug);

  const byDifficulty = {
    "warm-up": problems.filter((p) => p.difficulty === "warm-up"),
    interview: problems.filter((p) => p.difficulty === "interview"),
    hard: problems.filter((p) => p.difficulty === "hard"),
  };

  const topics = [...new Set(problems.flatMap((p) => p.topics))].sort();

  return (
    <div className="grid grid-cols-[minmax(0,1fr)]">
      <Container className="min-w-0 py-16 sm:py-20 lg:py-24">
        <Reveal>
          <div className="flex items-start gap-6">
            <TrackGlyph
              slug={track.slug}
              size={80}
              className="hidden h-16 w-16 sm:block lg:h-20 lg:w-20"
            />
            <div className="min-w-0 flex-1">
              <SectionHeader
                as="h1"
                index={track.index}
                label={`${track.short} Problems`}
                title={`${track.title} Problems`}
                lede={`${problems.length} practice problems. ${track.tagline}`}
              />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={`/tracks/${track.slug}`}>View track syllabus</LinkButton>
            <LinkButton href="/problems">All tracks</LinkButton>
          </div>
        </Reveal>

        {(["warm-up", "interview", "hard"] as const).map((difficulty) => {
          const difficultyProblems = byDifficulty[difficulty];
          if (difficultyProblems.length === 0) return null;

          return (
            <Reveal key={difficulty}>
              <section className="mt-12">
                <div className="flex items-center gap-3">
                  <span
                    className="ak-difficulty-tag"
                    data-difficulty={difficulty}
                  >
                    {difficultyLabels[difficulty]}
                  </span>
                  <span className="text-sm text-muted">
                    {difficultyProblems.length} problems
                  </span>
                </div>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {difficultyProblems.map((problem, index) => (
                    <li key={problem.slug}>
                      <Link
                        href={`/problems/${track.slug}/${problem.slug}`}
                        className="ak-link-row flex items-start gap-4 py-4 px-2 sm:px-4"
                      >
                        <span className="ak-label mt-1 w-8 shrink-0 text-ink">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base text-ink">{problem.title}</h3>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <span className="ak-topic-tag">{typeLabels[problem.type]}</span>
                            {problem.topics.slice(0, 3).map((topic) => (
                              <span key={topic} className="ak-topic-tag">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="ak-label mt-1 shrink-0 text-muted">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          );
        })}

        <Reveal>
          <section className="mt-16 border border-line p-6 sm:p-8">
            <h2 className="ak-serif text-xl leading-tight text-ink">Topics covered</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <span key={topic} className="ak-topic-tag">
                  {topic}
                </span>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-8 border border-line p-6 sm:p-8">
            <h2 className="ak-serif text-xl leading-tight text-ink">
              Practise on Uncertain Systems
            </h2>
            <p className="mt-3 text-sm text-muted">
              These problems test whether you understand the material. Uncertain Systems verifies
              that understanding—so you know what you actually know, not just what you read.
            </p>
            <div className="mt-4">
              <LinkButton href={site.platformUrl} solid>
                Go to Uncertain Systems
              </LinkButton>
            </div>
          </section>
        </Reveal>

        <nav className="mt-8" aria-label="Track navigation">
          <Link href="/problems" className="ak-label text-ink hover:underline">
            ← All problem tracks
          </Link>
        </nav>
      </Container>
    </div>
  );
}
