import type { Metadata } from 'next'
import { Mail, Users } from 'lucide-react'
import { getSiteConfig } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the FIRE team. Contact us for questions, presenter opportunities, volunteering, and sponsorship inquiries.'
}

export default function ContactPage() {
  const config = getSiteConfig()

  return (
    <div className='min-h-screen bg-fire-black'>
      {/* Hero Section */}
      <section className='py-20 md:py-32 bg-gradient-to-b from-fire-charcoal to-fire-black border-b border-fire-orange/20'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
              Get in Touch
            </h1>
            <p className='text-xl md:text-2xl text-gray-300 leading-relaxed'>
              We&apos;d love to hear from you. Reach out with questions, ideas, or just to say
              hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className='py-16 md:py-24 bg-fire-black'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            {/* Email Contact */}
            <div className='bg-fire-charcoal border border-fire-orange/20 rounded-lg p-8 md:p-12 mb-8'>
              <div className='flex items-start gap-6'>
                <div className='flex-shrink-0'>
                  <div className='w-16 h-16 bg-fire-red/20 rounded-full flex items-center justify-center'>
                    <Mail className='w-8 h-8 text-fire-orange' />
                  </div>
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-3'>Email Us</h2>
                  <p className='text-gray-300 mb-4 leading-relaxed'>
                    For general inquiries, event questions, presenter opportunities, volunteering,
                    or sponsorship information, send us an email.
                  </p>
                  <a
                    href={`mailto:${config.contact.general}`}
                    className='inline-flex items-center text-lg font-semibold text-fire-orange hover:text-fire-yellow transition-colors'>
                    {config.contact.general}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='ml-2 h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14 5l7 7m0 0l-7 7m7-7H3'
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media - Placeholder */}
            <div className='bg-fire-charcoal border border-fire-orange/20 rounded-lg p-8 md:p-12'>
              <div className='flex items-start gap-6'>
                <div className='flex-shrink-0'>
                  <div className='w-16 h-16 bg-fire-red/20 rounded-full flex items-center justify-center'>
                    <Users className='w-8 h-8 text-fire-orange' />
                  </div>
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-3'>Connect With Us</h2>
                  <p className='text-gray-300 mb-6 leading-relaxed'>
                    Follow us on social media for updates, announcements, and community highlights.
                  </p>
                  <div className='space-y-3'>
                    <a
                      href='https://fetlife.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center text-gray-300 hover:text-fire-orange transition-colors'>
                      <span className='font-semibold'>FetLife</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='ml-2 h-4 w-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                        />
                      </svg>
                    </a>
                    <p className='text-sm text-gray-400 italic'>More social links coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Contact Us About */}
      <section className='py-16 md:py-24 bg-fire-charcoal border-t border-fire-orange/20'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-12 text-center'>
              What Can We Help You With?
            </h2>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='bg-fire-black/50 border border-fire-orange/20 rounded-lg p-6'>
                <h3 className='text-xl font-bold text-fire-orange mb-3'>
                  <a href={`mailto:${config.contact.general}`}>Event Questions</a>
                </h3>
                <p className='text-gray-300 leading-relaxed'>
                  Have questions about attending an event? Need clarification on policies,
                  schedules, or venue details? We&apos;re here to help.
                </p>
              </div>
              <div className='bg-fire-black/50 border border-fire-orange/20 rounded-lg p-6'>
                <h3 className='text-xl font-bold text-fire-orange mb-3'>
                  <a href={`mailto:${config.contact.presenters}`}>Become a Presenter</a>
                </h3>
                <p className='text-gray-300 leading-relaxed'>
                  Interested in teaching at a FIRE event? Share your teaching experience and
                  proposed class topics with us.
                </p>
              </div>
              <div className='bg-fire-black/50 border border-fire-orange/20 rounded-lg p-6'>
                <h3 className='text-xl font-bold text-fire-orange mb-3'>
                  <a href={`mailto:${config.contact.volunteers}`}>Volunteer Opportunities</a>
                </h3>
                <p className='text-gray-300 leading-relaxed'>
                  Want to support the community by volunteering at an event? Let us know you&apos;re
                  interested and we&apos;ll share available opportunities.
                </p>
              </div>
              <div className='bg-fire-black/50 border border-fire-orange/20 rounded-lg p-6'>
                <h3 className='text-xl font-bold text-fire-orange mb-3'>
                  <a href={`mailto:${config.contact.vendors}`}>Sponsorship & Vending</a>
                </h3>
                <p className='text-gray-300 leading-relaxed'>
                  Interested in sponsoring or vending at a FIRE event? Contact us to discuss
                  partnership opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Notice */}
      <section className='py-16 bg-fire-black'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center'>
            <p className='text-gray-400'>
              We typically respond to emails within 48 hours. During event weeks, response times may
              be longer. Thank you for your patience.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
