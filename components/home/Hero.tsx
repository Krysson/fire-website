import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-fire opacity-90" />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-fire-black/30" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 text-center">
        {/* FIRE Logo */}
        <div className="mb-8 md:mb-12 flex justify-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
            <Image
              src="/logos/FIRELOGO_NOYEAR.png"
              alt="FIRE - Florida Intensive Rope Events"
              fill
              priority
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Tagline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Florida Intensive Rope Events
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed drop-shadow-md">
          FIRE is a community-driven organization dedicated to rope bondage education
          and connection. We host three annual events in Orlando, FL, bringing together
          practitioners of all skill levels for intensive learning, artistic expression,
          and meaningful community building.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/events/blaze-2026"
            className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-semibold text-white bg-fire-red hover:bg-fire-orange transition-all duration-300 rounded-lg shadow-2xl hover:shadow-fire-orange/50 hover:scale-105 active:scale-100 border-2 border-white/20"
          >
            Explore Our Next Event
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* Decorative element - optional flame accent */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-fire-black/50 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
