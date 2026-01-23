import type { Metadata } from 'next';
import { Building2, ShoppingBag, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sponsors & Vendors',
  description: 'Learn about FIRE event sponsors and vendors. Interested in becoming a sponsor or vendor? Contact us to learn more.',
};

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-fire-black">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-fire-charcoal to-fire-black border-b border-fire-orange/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Sponsors & Vendors
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Supporting the rope bondage community through partnership and collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-16 md:py-24 bg-fire-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Thank You to Our Supporters
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12">
              FIRE events are made possible by the generous support of our sponsors and vendors who share our commitment to quality rope education and community building.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsor Grid - Placeholder */}
      <section className="py-16 md:py-24 bg-fire-charcoal border-y border-fire-orange/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-fire-orange mb-12 text-center">
              Our Sponsors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="aspect-square bg-fire-black/50 border-2 border-fire-orange/30 rounded-lg flex items-center justify-center hover:border-fire-orange/60 transition-colors"
                >
                  <div className="text-center p-4">
                    <Building2 className="w-12 h-12 text-fire-orange/40 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Sponsor Logo</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 italic">
              Sponsor logos will be displayed here as partnerships are confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* Vendor Information */}
      <section className="py-16 md:py-24 bg-fire-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Vendor Information
            </h2>
            <div className="bg-fire-charcoal border border-fire-orange/20 rounded-lg p-8 md:p-12 mb-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-fire-red/20 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-fire-orange" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Vending at FIRE Events</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    We work with a carefully selected group of vendors who offer high-quality rope, gear, and related products to our community. Vendor tables are available at select FIRE events.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Vendors at FIRE events benefit from direct access to an engaged audience of rope enthusiasts, dedicated vendor space with table and display area, and promotion through our event materials and social media.
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Vendors - Placeholder */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-fire-charcoal/50 border border-fire-orange/20 rounded-lg p-6 text-center">
                <div className="w-20 h-20 bg-fire-black/50 border border-fire-orange/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-fire-orange/40" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Vendor 1</h4>
                <p className="text-sm text-gray-400">Premium rope and supplies</p>
              </div>
              <div className="bg-fire-charcoal/50 border border-fire-orange/20 rounded-lg p-6 text-center">
                <div className="w-20 h-20 bg-fire-black/50 border border-fire-orange/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-fire-orange/40" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Vendor 2</h4>
                <p className="text-sm text-gray-400">Bondage gear and accessories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Sponsor/Vendor */}
      <section className="py-16 md:py-24 bg-fire-charcoal border-t border-fire-orange/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Become a Sponsor or Vendor
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Interested in supporting FIRE events through sponsorship or vending? We'd love to partner with you.
              </p>
            </div>

            <div className="bg-fire-black border border-fire-orange/20 rounded-lg p-8 md:p-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-fire-red/20 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-fire-orange" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Contact us to discuss sponsorship packages, vendor opportunities, and how we can work together to support the rope bondage education community.
                  </p>
                  <a
                    href="mailto:fireeventproducer@gmail.com?subject=Sponsorship%20and%20Vendor%20Inquiry"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-fire-red hover:bg-fire-orange transition-colors duration-200 rounded-lg shadow-lg"
                  >
                    Contact Us
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

              <div className="border-t border-fire-orange/20 pt-8">
                <h4 className="text-xl font-bold text-white mb-4">Sponsorship Benefits</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-fire-orange mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Logo placement on event materials and website
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-fire-orange mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Recognition in event announcements and social media
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-fire-orange mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Direct connection to a passionate and engaged community
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-fire-orange mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Support for education and the growth of the rope community
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
