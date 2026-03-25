import Link from 'next/link';
import { getPresenters, getEventData } from '@/lib/content';
import PresenterCard from '@/components/events/PresenterCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BLAZE 2026 Presenters',
  description: 'Meet the talented rope bondage instructors teaching at BLAZE 2026. Learn from experienced educators in an intimate, supportive environment.',
  openGraph: {
    title: 'BLAZE 2026 Presenters',
    description: 'Meet our talented instructors for BLAZE 2026 in Orlando, FL.',
    type: 'website',
  },
};

export default function PresentersPage() {
  const eventSlug = 'blaze-2026';
  const presenters = getPresenters(eventSlug);
  const eventData = getEventData(eventSlug);

  return (
    <div className="relative min-h-screen overflow-hidden bg-fire-black">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(230,57,70,0.15)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,rgba(244,162,97,0.07)_0%,transparent_50%)]" />

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-fire-orange transition-colors">Home</Link>
          <span>/</span>
          <Link href="/events/blaze-2026" className="hover:text-fire-orange transition-colors">BLAZE 2026</Link>
          <span>/</span>
          <span className="text-fire-orange">Presenters</span>
        </div>

        {/* Page header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {eventData?.name || 'BLAZE'} Presenters
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Meet the talented instructors teaching at {eventData?.name || 'BLAZE'} {eventData?.year || '2026'}
          </p>
        </div>

        {/* Presenters grid or coming soon message */}
        {presenters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {presenters.map((presenter) => (
              <PresenterCard
                key={presenter.slug}
                presenter={presenter}
                eventSlug={eventSlug}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="bg-fire-charcoal rounded-lg border-2 border-fire-dark p-12">
              <svg
                className="w-20 h-20 text-fire-orange/50 mx-auto mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-white mb-4">
                Presenters Coming Soon
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We're finalizing our amazing lineup of presenters for {eventData?.name || 'BLAZE'} {eventData?.year || '2026'}.
                Check back soon to learn more about the talented instructors who will be sharing their knowledge and passion for rope bondage.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
