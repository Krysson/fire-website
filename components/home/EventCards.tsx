import Image from 'next/image';
import Link from 'next/link';

interface Event {
  id: string;
  name: string;
  logo: string;
  dates: string;
  focus: string;
  link: string;
}

const events: Event[] = [
  {
    id: 'blaze',
    name: 'BLAZE',
    logo: '/logos/blaze-2025.png',
    dates: 'April 17-19, 2026',
    focus: 'Beginner to Intermediate',
    link: '/events/blaze-2026',
  },
  {
    id: 'flare',
    name: 'FLARE',
    logo: '/logos/fire-logo.png', // Placeholder until FLARE logo available
    dates: 'August 2026',
    focus: 'Intermediate to Advanced',
    link: '/events/flare-2026',
  },
  {
    id: 'fire',
    name: 'FIRE',
    logo: '/logos/fire-logo.png', // Placeholder until FIRE logo available
    dates: 'February 2027',
    focus: 'All Levels',
    link: '/events/fire-2027',
  },
];

export default function EventCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {events.map((event, index) => (
        <div
          key={event.id}
          className="bg-fire-charcoal rounded-lg overflow-hidden border-2 border-fire-dark transition-all duration-300 hover:border-fire-orange hover:shadow-lg hover:shadow-fire-orange/20 hover:scale-105 hover:-translate-y-1"
          style={{
            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
          }}
        >
          <div className="relative w-full aspect-video bg-fire-dark flex items-center justify-center p-6">
            <Image
              src={event.logo}
              alt={`${event.name} logo`}
              width={300}
              height={300}
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold text-white">{event.name}</h3>

            <div className="space-y-2">
              <p className="text-fire-orange font-semibold">{event.dates}</p>
              <p className="text-gray-300 text-sm">{event.focus}</p>
            </div>

            <Link
              href={event.link}
              className="inline-block w-full text-center bg-fire-red hover:bg-fire-orange text-white font-semibold py-3 px-6 rounded-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
