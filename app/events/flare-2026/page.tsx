import { getEventData } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';

export default function FlarePage() {
  const event = getEventData('flare-2026');

  if (!event) {
    notFound();
  }

  const navigationCards = [
    {
      title: 'Schedule',
      description: 'View the full weekend schedule',
      href: '/events/flare-2026/schedule',
      icon: Calendar,
    },
    {
      title: 'Presenters',
      description: 'Meet our talented instructors',
      href: '/events/flare-2026/presenters',
      icon: Users,
    },
    {
      title: 'Classes',
      description: 'Browse all available classes',
      href: '/events/flare-2026/classes',
      icon: Calendar,
    },
    {
      title: 'Venue',
      description: 'Location and facility information',
      href: '/events/flare-2026/venue',
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-fire-charcoal to-fire-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-fire-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-fire-red/20 to-fire-orange/10" />
        <div className="container relative mx-auto px-4 py-16 sm:py-24">
          <div className="flex flex-col items-center text-center">
            {/* Event Logo */}
            <div className="mb-8 w-full max-w-md">
              <Image
                src={event.logo || '/logos/Blaze logo.png'}
                alt={`${event.name} ${event.year} Logo`}
                width={500}
                height={300}
                className="h-auto w-full drop-shadow-2xl"
                priority
              />
            </div>

            {/* Tagline */}
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {event.tagline}
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl">
              {event.description}
            </p>

            {/* Ticket CTA Button */}
            <a
              href={event.tickets.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-fire-red px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-fire-red/90 hover:shadow-xl hover:scale-105"
            >
              <Ticket className="h-5 w-5" />
              Get Tickets
            </a>

            {/* Tickets on Sale Date */}
            <p className="mt-4 text-sm text-gray-400">
              Tickets on sale: {event.tickets.onSaleDate}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="border-y border-fire-dark/50 bg-fire-charcoal/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Dates */}
            <div className="flex flex-col items-center text-center">
              <Calendar className="mb-3 h-8 w-8 text-fire-orange" />
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                Dates
              </h3>
              <p className="text-lg font-bold text-white">{event.dates.display}</p>
            </div>

            {/* Focus Level */}
            <div className="flex flex-col items-center text-center">
              <Users className="mb-3 h-8 w-8 text-fire-orange" />
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                Focus Level
              </h3>
              <p className="text-lg font-bold text-white">{event.focus}</p>
            </div>

            {/* Venue */}
            <div className="flex flex-col items-center text-center">
              <MapPin className="mb-3 h-8 w-8 text-fire-orange" />
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                Venue
              </h3>
              <p className="text-lg font-bold text-white">{event.venue.name}</p>
              <p className="text-sm text-gray-400">
                {event.venue.city}, {event.venue.state}
              </p>
            </div>

            {/* Event Size */}
            <div className="flex flex-col items-center text-center">
              <Ticket className="mb-3 h-8 w-8 text-fire-orange" />
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                Event Size
              </h3>
              <p className="text-lg font-bold text-white">{event.size}</p>
              {event.tickets.soldAsPairs && (
                <p className="mt-2 text-sm text-gray-400">{event.tickets.pairsNote}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Explore {event.name} {event.year}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {navigationCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative overflow-hidden rounded-xl border border-fire-dark bg-fire-charcoal p-6 transition-all hover:border-fire-orange hover:shadow-lg hover:shadow-fire-orange/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-fire-dark transition-colors group-hover:bg-fire-orange">
                  <card.icon className="h-6 w-6 text-fire-orange transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{card.title}</h3>
                <p className="text-sm text-gray-400">{card.description}</p>
                <div className="mt-4 flex items-center text-sm font-semibold text-fire-orange transition-transform group-hover:translate-x-2">
                  Learn more
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="border-t border-fire-dark/50 bg-gradient-to-b from-fire-charcoal/50 to-fire-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Elevate Your Skills?
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Join us for an unforgettable weekend of advanced learning and connection
          </p>
          <a
            href={event.tickets.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-fire-red px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-fire-red/90 hover:shadow-xl hover:scale-105"
          >
            <Ticket className="h-5 w-5" />
            Purchase Tickets
          </a>
        </div>
      </section>
    </div>
  );
}
