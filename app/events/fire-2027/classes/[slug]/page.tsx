import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getClassBySlug, getClasses, getPresenterBySlug } from '@/lib/content';
import type { Metadata } from 'next';

interface ClassPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getLevelBadgeClasses(level?: string): string {
  const normalizedLevel = (level ?? '').toLowerCase();
  if (normalizedLevel.includes('beginner')) return 'bg-emerald-600/20 text-emerald-400 border-emerald-600/30';
  if (normalizedLevel.includes('intermediate')) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  if (normalizedLevel.includes('advanced')) return 'bg-red-500/20 text-red-400 border-red-500/30';
  return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
}

export async function generateStaticParams() {
  const classes = getClasses('fire-2027');
  return classes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: ClassPageProps): Promise<Metadata> {
  const { slug } = await params;
  const classItem = getClassBySlug('fire-2027', slug);

  if (!classItem) return { title: 'Class Not Found' };

  return {
    title: `${classItem.title} - FIRE`,
    description: classItem.content?.substring(0, 160) || `${classItem.title} at FIRE`,
  };
}

export default async function ClassPage({ params }: ClassPageProps) {
  const { slug } = await params;
  const classItem = getClassBySlug('fire-2027', slug);

  if (!classItem) notFound();

  const presenterSlugs = Array.isArray(classItem.presenter)
    ? classItem.presenter
    : classItem.presenter
    ? [classItem.presenter]
    : [];
  const presenters = presenterSlugs
    .map((s) => getPresenterBySlug('fire-2027', s))
    .filter(Boolean);

  const levelBadgeClasses = getLevelBadgeClasses(classItem.level);

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-fire-charcoal to-fire-black text-white">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(230,57,70,0.15)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,rgba(244,162,97,0.07)_0%,transparent_50%)]" />

      {/* Breadcrumb */}
      <div className="border-b border-fire-dark">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-fire-orange transition-colors">Home</Link>
            <span>/</span>
            <Link href="/events/fire-2027" className="hover:text-fire-orange transition-colors">FIRE</Link>
            <span>/</span>
            <Link href="/events/fire-2027/classes" className="hover:text-fire-orange transition-colors">Classes</Link>
            <span>/</span>
            <span className="text-fire-orange">{classItem.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
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
                      href={`/events/fire-2027/presenters/${p!.slug}`}
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
