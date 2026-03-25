import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getPresenterBySlug, getPresenters, getClasses } from '@/lib/content';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

interface PresenterPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all presenters at build time
 */
export async function generateStaticParams() {
  const presenters = getPresenters('flare-2026');

  return presenters.map((presenter) => ({
    slug: presenter.slug,
  }));
}

/**
 * Generate metadata for presenter page
 */
export async function generateMetadata({ params }: PresenterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const presenter = getPresenterBySlug('flare-2026', slug);

  if (!presenter) {
    return {
      title: 'Presenter Not Found',
    };
  }

  return {
    title: `${presenter.name} - FLARE 2026 Presenter`,
    description: presenter.content?.substring(0, 160) || `${presenter.name} is presenting at FLARE 2026`,
  };
}

/**
 * Individual presenter profile page
 */
export default async function PresenterPage({ params }: PresenterPageProps) {
  const { slug } = await params;
  const presenter = getPresenterBySlug('flare-2026', slug);

  if (!presenter) {
    notFound();
  }

  // Get classes taught by this presenter
  const allClasses = getClasses('flare-2026');
  const presenterClasses = allClasses.filter(
    (classItem) => classItem.presenter === presenter.slug
  );

  // Format pronouns - handle both string and array formats
  let pronounsDisplay: string | null = null;
  if (presenter.pronouns) {
    if (Array.isArray(presenter.pronouns)) {
      pronounsDisplay = presenter.pronouns.join(' & ');
    } else {
      pronounsDisplay = presenter.pronouns;
    }
  }

  // Format social links
  const socialLinks = presenter.social || {};
  const hasSocialLinks = Object.keys(socialLinks).length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-fire-charcoal to-fire-black text-white">
      {/* Header */}
      <div className="border-b border-fire-dark">
        <div className="container mx-auto px-4 py-6">
          <Link href="/events/flare-2026/presenters">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to Presenters
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Presenter Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0 rounded-lg overflow-hidden bg-fire-dark">
                {presenter.photo ? (
                  <Image
                    src={presenter.photo}
                    alt={presenter.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 256px, 320px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-fire-orange/30 text-6xl font-bold">
                    {presenter.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Name and Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-fire-orange">
                {presenter.name}
              </h1>
              {pronounsDisplay && (
                <p className="text-xl text-fire-yellow mb-6">{pronounsDisplay}</p>
              )}

              {/* Social Links */}
              {hasSocialLinks && (
                <div className="space-y-3">
                  <h2 className="text-sm font-semibold text-fire-yellow uppercase tracking-wider">
                    Connect
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(socialLinks).map(([platform, url]) => {
                      if (!url) return null;

                      // Handle both single URLs and arrays of URLs
                      const urls = Array.isArray(url) ? url : [url];

                      return urls.map((singleUrl, index) => {
                        const displayText =
                          platform === 'fetlife'
                            ? 'FetLife'
                            : platform === 'instagram'
                            ? 'Instagram'
                            : platform === 'twitter'
                            ? 'Twitter'
                            : platform === 'website'
                            ? 'Website'
                            : platform.charAt(0).toUpperCase() + platform.slice(1);

                        // Use custom label from social_labels if available
                        const rawLabel = presenter.social_labels?.[platform];
                        const customLabels = rawLabel
                          ? (Array.isArray(rawLabel) ? rawLabel : [rawLabel])
                          : [];
                        const linkText = customLabels[index] ?? (urls.length > 1 ? `${displayText} ${index + 1}` : displayText);

                        return (
                          <a
                            key={`${platform}-${index}`}
                            href={singleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-fire-dark hover:bg-fire-red/20 rounded-lg transition-colors border border-fire-red/30 hover:border-fire-red"
                          >
                            <span className="text-sm font-medium">{linkText}</span>
                            <ExternalLink className="size-3" />
                          </a>
                        );
                      });
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bio Section */}
          {presenter.content && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-fire-yellow border-b border-fire-dark pb-2">
                About
              </h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
                  {presenter.content}
                </div>
              </div>
            </div>
          )}

          {/* Classes Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-fire-yellow border-b border-fire-dark pb-2">
              Classes at FLARE 2026
            </h2>
            {presenterClasses.length > 0 ? (
              <div className="grid gap-4">
                {presenterClasses.map((classItem) => (
                  <div
                    key={classItem.slug}
                    className="bg-fire-dark rounded-lg p-6 border border-fire-red/20 hover:border-fire-red/40 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-fire-orange mb-2">
                      {classItem.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <span className="text-fire-yellow">Level:</span> {classItem.level}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-fire-yellow">Duration:</span> {classItem.duration}
                      </span>
                    </div>
                    {classItem.content && (
                      <p className="text-gray-300 line-clamp-3">{classItem.content}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-fire-dark rounded-lg p-8 border border-fire-red/20 text-center">
                <p className="text-gray-400 text-lg">
                  Class schedule coming soon! Check back later for details on {presenter.name}'s
                  classes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
