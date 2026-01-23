import Link from 'next/link';
import Hero from '@/components/home/Hero';
import EventCards from '@/components/home/EventCards';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FIRE Orlando - Rope Bondage Education',
  description: 'FIRE (Florida Intensive Rope Events) hosts three annual rope bondage conventions in Orlando, FL: BLAZE, FLARE, and FIRE. Educational workshops for all skill levels.',
  openGraph: {
    title: 'FIRE Orlando - Rope Bondage Education',
    description: 'Three annual rope bondage education events in Orlando, FL. Join us for BLAZE, FLARE, and FIRE.',
    type: 'website',
    url: 'https://fireorlando.com',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-fire-black">
      {/* Hero Section */}
      <Hero />

      {/* Our Events Section */}
      <section className="py-16 md:py-24 bg-fire-charcoal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Events
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Three unique events each year, each designed to serve different experience levels
              and learning goals in the rope bondage community.
            </p>
          </div>
          <EventCards />
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 md:py-24 bg-fire-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              About FIRE
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              FIRE (Florida Intensive Rope Events) is a community-driven organization dedicated
              to advancing rope bondage education in a safe, inclusive, and supportive environment.
              Since our founding, we have brought together practitioners from across the country
              for intensive learning experiences, artistic exploration, and meaningful community connection.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10">
              Based in Orlando, Florida, we host three annual events that cater to different skill
              levels and learning objectives, ensuring that everyone from curious beginners to
              seasoned experts can find their place in our community.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-fire-black bg-fire-orange hover:bg-fire-yellow transition-colors duration-200 rounded-lg shadow-lg hover:shadow-xl"
            >
              Learn More About FIRE
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Highlight Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-fire-charcoal to-fire-dark border-t border-fire-orange/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-fire-red/20 border border-fire-red rounded-full mb-6">
              <span className="text-fire-orange font-semibold text-sm uppercase tracking-wide">
                Next Event
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              BLAZE 2026
            </h2>
            <p className="text-xl md:text-2xl text-fire-orange font-semibold mb-4">
              April 17-19, 2026
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Our beginner-to-intermediate focused event returns this spring. Join us for a
              weekend of foundational rope education, hands-on practice, and community connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events/blaze-2026"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-fire-red hover:bg-fire-orange transition-colors duration-200 rounded-lg shadow-lg"
              >
                View Event Details
              </Link>
              <a
                href="https://forbiddentickets.com/events/blaze-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-fire-orange border-2 border-fire-orange hover:bg-fire-orange hover:text-fire-black transition-all duration-200 rounded-lg"
              >
                Get Tickets
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
