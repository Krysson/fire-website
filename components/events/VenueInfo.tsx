import { MapPin, Navigation, Hotel, Car } from 'lucide-react';
import type { Venue } from '@/lib/types';

interface VenueInfoProps {
  venue: Venue;
}

export default function VenueInfo({ venue }: VenueInfoProps) {
  const fullAddress = `${venue.address}, ${venue.city}, ${venue.state} ${venue.zip}`;
  const encodedAddress = encodeURIComponent(fullAddress);
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=15`;
  const directionsUrl = venue.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <div className="space-y-8">
      {/* Venue Name and Address */}
      <div className="bg-fire-charcoal rounded-lg border-2 border-fire-dark p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <MapPin className="w-6 h-6 text-fire-orange" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {venue.name}
            </h2>
            <address className="not-italic text-gray-300 text-lg leading-relaxed">
              {venue.address}<br />
              {venue.city}, {venue.state} {venue.zip}
            </address>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-fire-red hover:bg-fire-orange text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="bg-fire-charcoal rounded-lg border-2 border-fire-dark overflow-hidden">
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map showing ${venue.name} location`}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Parking Information */}
      <div className="bg-fire-charcoal rounded-lg border-2 border-fire-dark p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <Car className="w-6 h-6 text-fire-orange" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Parking
            </h3>
            <div className="text-gray-300 space-y-2">
              <p>
                Free parking is available on-site at the venue. The lot is accessible
                from Milner Boulevard.
              </p>
              <p>
                Please be respectful of neighboring businesses and park only in
                designated areas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Hotels */}
      <div className="bg-fire-charcoal rounded-lg border-2 border-fire-dark p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <Hotel className="w-6 h-6 text-fire-orange" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Nearby Hotels
            </h3>
            <div className="text-gray-300 space-y-4">
              <p>
                Several hotels are located within a short drive of the venue. We recommend
                booking early, especially during peak travel seasons.
              </p>
              <div className="bg-fire-dark/50 rounded-md p-4 border border-fire-dark">
                <p className="text-sm">
                  <span className="font-semibold text-fire-orange">Pro tip:</span> Search
                  for hotels near the Orlando International Airport area or along International
                  Drive for the best selection and rates. The venue is approximately 15-20
                  minutes from most major hotel clusters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
