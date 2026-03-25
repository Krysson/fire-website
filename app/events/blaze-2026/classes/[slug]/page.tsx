import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getClassBySlug, getClasses, getPresenterBySlug } from '@/lib/content';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

interface ClassPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getLevelBadgeClasses(level: string): string {
  const normalizedLevel = level.toLowerCase();
  if (normalizedLevel.includes('beginner')) return 'bg-emerald-600/20 text-emerald-400 border-emerald-600/30';
  if (normalizedLevel.includes('intermediate')) return 'bg-fire-orange/20 text-fire-orange border-fire-orange/30';
  if (normalizedLevel.includes('advanced')) return 'bg-fire-red/20 text-fire-red border-fire-red/30';
  return 'bg-fire-yellow/20 text-fire-yellow border-fire-yellow/30';
}

export async function generateStaticParams() {
  const classes = getClasses('blaze-2026');
  return classes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: ClassPageProps): Promise<Metadata> {
  const { slug } = await params;
  const classItem = getClassBySlug('blaze-2026', slug);

  if (!classItem) return { title: 'Class Not Found' };

  return {
    title: `${classItem.title} - BLAZE 2026`,
    description: classItem.content?.substring(0, 160) || `${classItem.title} at BLAZE 2026`,
  };
}

export default async function ClassPage({ params }: ClassPageProps) {
  const { slug } = await params;
  const classItem = getClassBySlug('blaze-2026', slug);

  if (!classItem) notFound();

  const presenterSlugs = Array.isArray(classItem.presenter)
    ? classItem.presenter
    : classItem.presenter
    ? [classItem.presenter]
    : [];
  const presenters = presenterSlugs
    .map((s) => getPresenterBySlug('blaze-2026', s))
    .filter(Boolean);

  const levelBadgeClasses = getLevelBadgeClasses(classItem.level);

  return (
    <div className="min-h-screen bg-gradient-to-b from-fire-charcoal to-fire-black text-white">
      {/* Header */}
      <div className="border-b border-fire-dark">
        <div className="container mx-auto px-4 py-6">
          <Link href="/events/blaze-2026/classes">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to Classes
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Class Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-fire-orange">
              {classItem.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full border font-medium text-sm ${levelBadgeClasses}`}>
                {classItem.level}
              </span>
              {classItem.duration && (
                <span className="text-gray-400 text-sm">{classItem.duration}</span>
              )}
            </div>

            {/* Presenter(s) */}
            {presenters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-400 text-sm">Taught by:</span>
                {presenters.map((p, i) => (
                  <span key={p!.slug} className="flex items-center gap-2">
                    <Link
                      href={`/events/blaze-2026/presenters/${p!.slug}`}
                      className="text-fire-yellow hover:text-fire-orange font-medium transition-colors duration-200"
                    >
                      {p!.name}
                    </Link>
                    {i < presenters.length - 1 && <span className="text-gray-400">&amp;</span>}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Class Description */}
          {classItem.content && (
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
                {classItem.content}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
