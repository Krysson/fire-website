import type { Metadata } from 'next';
import { Archive, Clock, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Past Events',
  description: 'Explore the archive of past FIRE events. Photo galleries and highlights coming soon.',
};

export default function PastEventsPage() {
  return (
    <div className="min-h-screen bg-fire-black">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-fire-charcoal to-fire-black border-b border-fire-orange/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Archive className="w-20 h-20 md:w-24 md:h-24 text-fire-orange mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Past Events Archive
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              A growing collection of memories from previous FIRE events.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-16 md:py-24 bg-fire-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Main Message */}
            <div className="bg-fire-charcoal border border-fire-orange/20 rounded-lg p-8 md:p-12 text-center mb-12">
              <Clock className="w-16 h-16 text-fire-orange mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Coming Soon
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                We're building an archive of past FIRE events to celebrate our community's journey and showcase the incredible moments we've shared together.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                This section will feature photo galleries, event highlights, presenter spotlights, and stories from previous BLAZE, FLARE, and FIRE conventions.
              </p>
            </div>

            {/* What to Expect */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                What to Expect
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-fire-charcoal/50 border border-fire-orange/20 rounded-lg p-6">
                  <div className="w-12 h-12 bg-fire-red/20 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-fire-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Photo Galleries</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Browse photos from past events, showcasing the learning, practice, and community connection that defines FIRE.
                  </p>
                </div>

                <div className="bg-fire-charcoal/50 border border-fire-orange/20 rounded-lg p-6">
                  <div className="w-12 h-12 bg-fire-red/20 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-fire-orange" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Event Timelines</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Explore the evolution of FIRE events over the years, from our early beginnings to where we are today.
                  </p>
                </div>

                <div className="bg-fire-charcoal/50 border border-fire-orange/20 rounded-lg p-6">
                  <div className="w-12 h-12 bg-fire-red/20 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-fire-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Presenter Spotlights</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Learn about the talented educators who have shared their knowledge at FIRE events over the years.
                  </p>
                </div>

                <div className="bg-fire-charcoal/50 border border-fire-orange/20 rounded-lg p-6">
                  <div className="w-12 h-12 bg-fire-red/20 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-fire-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Community Stories</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Read testimonials and stories from attendees about their FIRE event experiences and what they've learned.
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Placeholder */}
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                Event Gallery Preview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="aspect-square bg-fire-charcoal border border-fire-orange/20 rounded-lg flex items-center justify-center hover:border-fire-orange/40 transition-colors"
                  >
                    <div className="text-center p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-fire-orange/30 mx-auto mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-xs text-gray-400">Photo placeholder</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-400 italic mt-6">
                Gallery grid ready for event photos and memories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-fire-charcoal border-t border-fire-orange/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Create New Memories
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              While we build our archive, join us at an upcoming event and be part of the next chapter in FIRE's story.
            </p>
            <a
              href="/#events"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-fire-red hover:bg-fire-orange transition-colors duration-200 rounded-lg shadow-lg"
            >
              View Upcoming Events
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
