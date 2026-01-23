import { notFound } from 'next/navigation';
import { getEventData } from '@/lib/content';
import VenueInfo from '@/components/events/VenueInfo';

export default function FlareVenuePage() {
  const event = getEventData('flare-2026');

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-fire-black">
      {/* Page Header */}
      <div className="bg-gradient-fire-horizontal py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Venue
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              {event.name} {event.year}
            </p>
          </div>
        </div>
      </div>

      {/* Venue Information */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <VenueInfo venue={event.venue} />
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Venue - FLARE 2026',
  description: 'Location and venue information for FLARE 2026 rope bondage convention in Orlando, FL.',
};
