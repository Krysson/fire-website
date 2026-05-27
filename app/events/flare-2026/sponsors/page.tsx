import { getEventData, getSponsors } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SponsorGrid from '@/components/events/SponsorGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sponsors — FLARE 2026',
  description: 'Thank you to the sponsors and vendors who make FLARE 2026 possible.',
}

export default function FlareSponsorsPage() {
  const event = getEventData('flare-2026')
  const sponsors = getSponsors('flare-2026')

  if (!event) notFound()

  return (
    <div className='min-h-screen bg-gradient-to-b from-fire-charcoal to-fire-black text-white'>
      {/* Breadcrumb */}
      <div className='border-b border-fire-dark'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center gap-2 text-sm text-gray-400'>
            <Link href='/' className='hover:text-fire-orange transition-colors'>
              Home
            </Link>
            <span>/</span>
            <Link href='/events/flare-2026' className='hover:text-fire-orange transition-colors'>
              FLARE 2026
            </Link>
            <span>/</span>
            <span className='text-fire-orange'>Sponsors</span>
          </div>
        </div>
      </div>

      {/* Page header */}
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Sponsors &amp; Vendors
          </h1>
          <p className='text-gray-400 text-lg'>
            Thank you to everyone who makes {event.name} {event.year} possible.
          </p>
        </div>
      </div>

      {/* Sponsor grid */}
      <div className='container mx-auto px-4 pb-16'>
        <div className='max-w-4xl mx-auto'>
          <SponsorGrid sponsors={sponsors} />
        </div>
      </div>
    </div>
  )
}
