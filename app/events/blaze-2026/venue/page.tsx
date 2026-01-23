import { notFound } from 'next/navigation';
import { getEventData } from '@/lib/content';
import VenueInfo from '@/components/events/VenueInfo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BLAZE 2026 Venue',
  description: 'Location and venue information for BLAZE 2026 at The Woodshed in Orlando, FL. Includes directions, parking, and facility details.',
  openGraph: {
    title: 'BLAZE 2026 Venue',
    description: 'Venue information for BLAZE 2026 at The Woodshed in Orlando, FL.',
    type: 'website',
  },
};

export default function BlazeVenuePage() {
  const event = getEventData('blaze-2026');

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
