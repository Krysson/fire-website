import { getClasses } from '@/lib/content';
import { getEventData } from '@/lib/content';
import ClassCard from '@/components/events/ClassCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BLAZE 2026 Classes',
  description: 'Browse all available rope bondage classes at BLAZE 2026. From foundational techniques to creative floor work, find the perfect classes for your skill level.',
  openGraph: {
    title: 'BLAZE 2026 Classes',
    description: 'Browse all rope bondage classes available at BLAZE 2026.',
    type: 'website',
  },
};

const EVENT_SLUG = 'blaze-2026';

export default function ClassesPage() {
  const classes = getClasses(EVENT_SLUG);
  const eventData = getEventData(EVENT_SLUG);

  return (
    <div className="min-h-screen bg-fire-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {eventData?.name} {eventData?.year} Classes
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our workshop offerings designed for {eventData?.focus.toLowerCase()} practitioners.
            Each class is carefully curated to provide hands-on learning and skill development.
          </p>
        </header>

        {/* Classes Grid or Empty State */}
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <ClassCard
                key={classItem.slug}
                class_={classItem}
                eventSlug={EVENT_SLUG}
              />
            ))}
          </div>
        ) : (
          // Coming Soon State
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="max-w-md text-center">
              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-fire-orange/10 border border-fire-orange/20">
                <svg
                  className="w-10 h-10 text-fire-orange"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              {/* Message */}
              <h2 className="text-2xl font-bold text-white mb-3">
                Classes Coming Soon
              </h2>
              <p className="text-gray-400 mb-6">
                Our class schedule is currently being finalized. Check back soon for detailed workshop descriptions and presenter information.
              </p>

              {/* Additional Info */}
              <div className="bg-fire-charcoal border border-white/10 rounded-lg p-4">
                <p className="text-sm text-gray-300">
                  Want to be notified when classes are announced? Follow us on social media or check back regularly for updates.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        {classes.length > 0 && eventData && (
          <div className="mt-12 text-center">
            <div className="bg-fire-charcoal border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-3">
                Ready to Learn?
              </h2>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Secure your spot at {eventData.name} {eventData.year} and get access to all these amazing workshops.
              </p>
              <a
                href={eventData.tickets.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-fire-black bg-fire-orange hover:bg-fire-yellow transition-colors rounded-lg"
              >
                Get Tickets
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
