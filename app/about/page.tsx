import { OrganizationMarkdown } from '@/components/markdown/OrganizationMarkdown';
import { getOrganizationContent } from '@/lib/content';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About FIRE',
  description: 'Learn about FIRE (Florida Intensive Rope Events) - our mission, values, team, and commitment to rope bondage education in Orlando, FL.',
};

export default async function AboutPage() {
  const content = getOrganizationContent('about.md');

  if (!content) {
    return (
      <div className="min-h-screen bg-fire-black py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">About FIRE</h1>
          <p className="text-gray-300">Content not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fire-black">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-fire-charcoal to-fire-black border-b border-fire-orange/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* FIRE Logo */}
            <div className="mb-8 flex justify-center">
              <Image
                src="/logos/fire-logo.png"
                alt="FIRE Logo"
                width={200}
                height={200}
                className="w-32 h-32 md:w-48 md:h-48"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About FIRE
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Florida Intensive Rope Events
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-fire-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <OrganizationMarkdown>{content.content}</OrganizationMarkdown>
          </div>
        </div>
      </section>

      {/* Visual Brand Section */}
      <section className="py-16 md:py-24 bg-fire-charcoal border-t border-fire-orange/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-12 items-center">
              <Image
                src="/logos/fire-logo.png"
                alt="FIRE Logo"
                width={120}
                height={120}
                className="w-24 h-24 md:w-32 md:h-32 opacity-80 hover:opacity-100 transition-opacity"
              />
              <Image
                src="/logos/flower-FLAT.png"
                alt="FIRE Flower Symbol"
                width={120}
                height={120}
                className="w-24 h-24 md:w-32 md:h-32 opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-fire-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Us?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Explore our upcoming events and become part of the FIRE community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#events"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-fire-red hover:bg-fire-orange transition-colors duration-200 rounded-lg shadow-lg"
              >
                View Events
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-fire-orange border-2 border-fire-orange hover:bg-fire-orange hover:text-fire-black transition-all duration-200 rounded-lg"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
