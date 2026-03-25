import Link from 'next/link'
import { getEventData, getSchedule, getPresenters, getClasses } from '@/lib/content'
import ScheduleGrid from '@/components/events/ScheduleGrid'

export default function FireSchedulePage() {
  const eventData = getEventData('fire-2027')
  const schedule = getSchedule('fire-2027')
  const presenterNames = Object.fromEntries(getPresenters('fire-2027').map(p => [p.slug, p.name]))
  const classLevels = Object.fromEntries(
    getClasses('fire-2027')
      .filter(c => c.slug && c.level)
      .map(c => [c.slug, c.level])
  )

  if (!eventData) {
    return (
      <div className='min-h-screen bg-fire-black py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-white mb-4'>Event Not Found</h1>
            <p className='text-gray-300 mb-8'>
              Unable to load event information. Please try again later.
            </p>
            <Link
              href='/'
              className='inline-block bg-fire-red hover:bg-fire-orange text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200'>
              Return Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='relative min-h-screen overflow-hidden bg-fire-black py-12 px-4 sm:px-6 lg:px-8'>
      {/* Gradient background */}
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(230,57,70,0.15)_0%,transparent_60%)]' />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,rgba(244,162,97,0.07)_0%,transparent_50%)]' />

      <div className='relative z-10 max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8 md:mb-12'>
          <div className='flex items-center gap-2 text-sm text-gray-400 mb-4'>
            <Link
              href='/'
              className='hover:text-fire-orange transition-colors'>
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/events/fire-2027`}
              className='hover:text-fire-orange transition-colors'>
              {eventData.name} {eventData.year}
            </Link>
            <span>/</span>
            <span className='text-fire-orange'>Schedule</span>
          </div>

          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'>
            Event Schedule
          </h1>
          <p className='text-lg md:text-xl text-gray-300 max-w-3xl'>
            View the full schedule for {eventData.name} {eventData.year}. Classes, social events,
            and activities throughout {eventData.dates.display}.
          </p>

          {eventData.tickets.onSaleDate && (
            <div className='mt-6'>
              <p className='text-fire-yellow font-semibold mb-2'>
                Tickets on sale: {eventData.tickets.onSaleDate}
              </p>
              <a
                href={eventData.tickets.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block bg-fire-red hover:bg-fire-orange text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200'>
                Get Tickets
              </a>
            </div>
          )}
        </div>

        {/* Schedule Grid */}
        <div className='mb-12'>
          <ScheduleGrid
            schedule={schedule}
            eventSlug='fire-2027'
            presenterNames={presenterNames}
            classLevels={classLevels}
          />
        </div>

        {/* Additional Information */}
        <div className='bg-fire-charcoal border-2 border-fire-dark rounded-lg p-6 md:p-8 space-y-4'>
          <h2 className='text-2xl font-bold text-white mb-4'>Schedule Notes</h2>
          <div className='space-y-3 text-gray-300'>
            <p>
              <span className='text-fire-orange font-semibold'>Class Duration:</span> Most classes
              are 90 minutes unless otherwise noted.
            </p>
            <p>
              <span className='text-fire-orange font-semibold'>Room Assignments:</span> All room
              locations will be clearly marked at the venue.
            </p>
            <p>
              <span className='text-fire-orange font-semibold'>Changes:</span> Schedule is subject
              to change. Check back regularly for updates.
            </p>
            <p>
              <span className='text-fire-orange font-semibold'>Questions?</span> Contact us at{' '}
              <a
                href='mailto:EventInfo@FireOrlando.com'
                className='text-fire-yellow hover:text-fire-orange transition-colors underline'>
                EventInfo@FireOrlando.com
              </a>
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className='mt-12 flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href={`/events/fire-2027`}
            className='inline-block text-center bg-fire-charcoal hover:bg-fire-dark border-2 border-fire-dark hover:border-fire-orange text-white font-semibold py-3 px-6 rounded-md transition-all duration-200'>
            Back to Event
          </Link>
          <Link
            href={`/events/fire-2027/presenters`}
            className='inline-block text-center bg-fire-charcoal hover:bg-fire-dark border-2 border-fire-dark hover:border-fire-orange text-white font-semibold py-3 px-6 rounded-md transition-all duration-200'>
            View Presenters
          </Link>
          <Link
            href={`/events/fire-2027/classes`}
            className='inline-block text-center bg-fire-charcoal hover:bg-fire-dark border-2 border-fire-dark hover:border-fire-orange text-white font-semibold py-3 px-6 rounded-md transition-all duration-200'>
            View Classes
          </Link>
        </div>
      </div>
    </div>
  )
}
