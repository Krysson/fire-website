import Link from 'next/link'
import Hero from '@/components/home/Hero'
import EventCards from '@/components/home/EventCards'
import { getEventData, getSiteConfig } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FIRE Orlando - Rope Bondage Education',
  description:
    'FIRE (Florida Intensive Rope Events) hosts three annual rope bondage conventions in Orlando, FL: BLAZE, FLARE, and FIRE. Educational workshops for all skill levels.',
  openGraph: {
    title: 'FIRE Orlando - Rope Bondage Education',
    description:
      'Three annual rope bondage education events in Orlando, FL. Join us for BLAZE, FLARE, and FIRE.',
    type: 'website',
    url: 'https://fireorlando.com'
  }
}

export default function Home() {
  const config = getSiteConfig()
  const featuredEntry = config.homepage.events.find(e => e.id === config.homepage.featuredEventId)
  const featuredTicketUrl = featuredEntry?.ticketEventSlug
    ? (getEventData(featuredEntry.ticketEventSlug)?.tickets?.url ?? '')
    : ''

  const events = config.homepage.events.map(e => ({
    ...e,
    ticketUrl: e.ticketEventSlug
      ? (getEventData(e.ticketEventSlug)?.tickets?.url ?? undefined)
      : undefined,
    featured: e.id === config.homepage.featuredEventId,
  }))

  return (
    <div className='min-h-screen bg-fire-black'>
      {/* ── Hero ── */}
      <Hero ticketUrl={featuredTicketUrl} />

      {/* ── Our Events ── */}
      <section
        id='events'
        className='relative overflow-hidden bg-fire-charcoal py-24 md:py-32'>
        <div className='pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-fire-orange/5 blur-3xl' />
        <div className='pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-fire-red/5 blur-3xl' />

        <div className='container relative z-10 mx-auto px-4'>
          <div className='mb-16 text-center md:mb-20'>
            <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-fire-orange/30 bg-fire-orange/10 px-4 py-2'>
              <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-fire-orange' />
              <span className='text-xs font-bold uppercase tracking-widest text-fire-orange'>
                Annual Events
              </span>
            </div>
            <h2 className='mb-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl'>
              <span className='gradient-fire-text'>Our Events</span>
            </h2>
            <p className='mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl'>
              Three unique events each year, each designed to serve different experience levels and
              learning goals in the rope bondage community.
            </p>
          </div>
          <EventCards events={events} />
        </div>
      </section>

      {/* ── About FIRE ── */}
      <section className='relative overflow-hidden bg-fire-black py-24 md:py-32'>
        {/* Dot grid background */}
        <div
          className='pointer-events-none absolute inset-0 opacity-[0.04]'
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '44px 44px'
          }}
        />

        <div className='container relative z-10 mx-auto px-4'>
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20'>
              {/* Left — Feature blocks */}
              <div className='space-y-5'>
                {[
                  {
                    icon: '📚',
                    gradient: 'from-fire-red/20 to-fire-orange/10',
                    border: 'border-fire-red/20',
                    title: 'Education First',
                    desc: 'Intensive workshops led by experienced practitioners — covering technique, safety, and artistry at every level.'
                  },
                  {
                    icon: '🤝',
                    gradient: 'from-fire-orange/20 to-fire-yellow/10',
                    border: 'border-fire-orange/20',
                    title: 'Community Driven',
                    desc: 'Meaningful connections with practitioners from across the country in a safe, inclusive environment.'
                  },
                  {
                    icon: '🎨',
                    gradient: 'from-fire-yellow/20 to-fire-orange/10',
                    border: 'border-fire-yellow/20',
                    title: 'Artistic Expression',
                    desc: 'Space to explore rope as an art form — from foundational floor work to advanced suspension and performance.'
                  }
                ].map(({ icon, gradient, border, title, desc }) => (
                  <div
                    key={title}
                    className={`flex gap-4 rounded-2xl border ${border} bg-gradient-to-br ${gradient} p-5 backdrop-blur-sm`}>
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${border} bg-fire-black/40 text-2xl`}>
                      {icon}
                    </div>
                    <div>
                      <h4 className='mb-1 text-base font-bold text-white'>{title}</h4>
                      <p className='text-sm leading-relaxed text-gray-400'>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right — Content */}
              <div className='text-center lg:text-left'>
                <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-fire-orange/30 bg-fire-orange/10 px-4 py-2'>
                  <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-fire-orange' />
                  <span className='text-xs font-bold uppercase tracking-widest text-fire-orange'>
                    Who We Are
                  </span>
                </div>
                <h2 className='mb-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl'>
                  About FIRE
                </h2>
                <div className='mb-8 space-y-5'>
                  <p className='text-lg leading-relaxed text-gray-300 md:text-xl'>
                    FIRE (Florida Intensive Rope Events) is a community-driven organization
                    dedicated to advancing rope bondage education in a safe, inclusive, and
                    supportive environment.
                  </p>
                  <p className='text-lg leading-relaxed text-gray-300 md:text-xl'>
                    Based in Orlando, Florida, we host three annual events that cater to different
                    skill levels and learning objectives, ensuring that everyone from curious
                    beginners to seasoned experts can find their place in our community.
                  </p>
                </div>
                <Link
                  href='/about'
                  className='group inline-flex items-center gap-2 rounded-xl border border-fire-orange/30 bg-fire-orange/10 px-8 py-4 text-base font-bold text-fire-orange transition-all duration-300 hover:bg-fire-orange/20 hover:shadow-lg hover:shadow-fire-orange/20'>
                  Learn More About FIRE
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2.5}>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className='relative overflow-hidden bg-fire-charcoal py-24'>
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-fire-charcoal via-fire-dark to-fire-charcoal' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(230,57,70,0.18)_0%,transparent_60%)]' />
        <div className='pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-fire-orange/30 to-transparent' />

        <div className='relative z-10 mx-auto max-w-2xl px-4 text-center'>
          <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-fire-orange/30 bg-fire-orange/10 px-4 py-2'>
            <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-fire-orange' />
            <span className='text-xs font-bold uppercase tracking-widest text-fire-orange'>
              Join Us
            </span>
          </div>
          <h2 className='mb-4 text-4xl font-extrabold text-white md:text-5xl'>
            Ready to <span className='gradient-fire-text'>Ignite</span> Your Journey?
          </h2>
          <p className='mb-10 text-lg leading-relaxed text-gray-400'>
            Tickets for {featuredEntry ? `${featuredEntry.name} ${featuredEntry.year}` : 'our next event'} are on sale now. Beginner-friendly, community-focused, and
            unforgettable.
          </p>
          <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
            <a
              href={featuredTicketUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center gap-2 rounded-xl border border-[#e63946] px-10 py-4 text-base font-semibold text-[#f4a261] transition-all duration-200 hover:border-[#f4a261] hover:text-white active:scale-95 md:text-lg'>
              🎟 Get Tickets
            </a>
            <Link
              href={featuredEntry?.internalLink ?? '/events'}
              className='inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent px-10 py-4 text-base font-semibold text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/5 md:text-lg'>
              View Event Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
