import { getEventData } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';

export default function FirePage() {
  const event = getEventData('fire-2027');

  if (!event) {
    notFound();
  }

  const navigationCards = [
    {
      title: 'Schedule',
      description: 'View the full weekend schedule',
      href: '/events/fire-2027/schedule',
      icon: Calendar,
    },
    {
      title: 'Presenters',
      description: 'Meet our talented instructors',
      href: '/events/fire-2027/presenters',
      icon: Users,
    },
    {
      title: 'Classes',
      description: 'Browse all available classes',
      href: '/events/fire-2027/classes',
      icon: Calendar,
    },
    {
      title: 'Venue',
      description: 'Location and facility information',
      href: '/events/fire-2027/venue',
      icon: MapPin,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-fire-charcoal to-fire-black">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(230,57,70,0.15)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,rgba(244,162,97,0.07)_0%,transparent_50%)]" />

      {/* Breadcrumb */}
      <div className="relative z-10 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-fire-orange transition-colors">Home</Link>
            <span>/</span>
            <span className="text-fire-orange">FIRE 2027</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden bg-fire-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-fire-red/20 to-fire-orange/10" />
        <div className="container relative mx-auto px-4 py-16 sm:py-24">
          <div className="flex flex-col items-center text-center">
            {/* Event Logo */}
            <div className="mb-8 w-full max-w-md">
              <Image
                src={event.logo || '/logos/fire-logo.png'}
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
              className="inline-flex items-center gap-2 rounded-lg border border-[#e63946] px-8 py-4 text-lg font-semibold text-[#f4a261] transition-all duration-200 hover:border-[#f4a261] hover:text-white active:scale-95"
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
      <section className="relative z-10 border-y border-fire-dark/50 bg-fire-charcoal/50">
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
      <section className="relative z-10 py-16">
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
      <section className="relative z-10 border-t border-fire-dark/50 bg-gradient-to-b from-fire-charcoal/50 to-fire-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Experience Our Premier Event?
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Join us for our largest and most comprehensive rope bondage experience
          </p>
          <a
            href={event.tickets.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[#e63946] px-8 py-4 text-lg font-semibold text-[#f4a261] transition-all duration-200 hover:border-[#f4a261] hover:text-white active:scale-95"
          >
            <Ticket className="h-5 w-5" />
            Purchase Tickets
          </a>
        </div>
      </section>
    </div>
  );
}
