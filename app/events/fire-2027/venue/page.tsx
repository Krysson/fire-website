import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEventData } from '@/lib/content'
import VenueInfo from '@/components/events/VenueInfo'

export default function FireVenuePage() {
  const event = getEventData('fire-2027')

  if (!event) {
    notFound()
  }

  return (
    <div className='min-h-screen bg-fire-black'>
      {/* Breadcrumb */}
      <div className='container mx-auto px-4 md:px-6 py-3'>
        <div className='flex items-center gap-2 text-sm text-gray-400'>
          <Link
            href='/'
            className='hover:text-fire-orange transition-colors'>
            Home
          </Link>
          <span>/</span>
          <Link
            href='/events/fire-2027'
            className='hover:text-fire-orange transition-colors'>
            FIRE
          </Link>
          <span>/</span>
          <span className='text-fire-orange'>Venue</span>
        </div>
      </div>

      {/* Page Header */}
      <div className='bg-gradient-fire-horizontal py-12 md:py-16'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'>Venue</h1>
            <p className='text-xl md:text-2xl text-white/90'>
              {event.name} {event.year}
            </p>
          </div>
        </div>
      </div>

      {/* Venue Information */}
      <div className='container mx-auto px-4 md:px-6 py-12 md:py-16'>
        <div className='max-w-4xl mx-auto'>
          <VenueInfo venue={event.venue} />
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Venue - FIRE',
  description: 'Location and venue information for FIRE rope bondage convention in Orlando, FL.'
}
