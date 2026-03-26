'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'

interface EventConfig {
  id: string
  name: string
  year: number
  logo: string
  dates: string
  focus: string
  focusVariant: 'beginner' | 'intermediate' | 'all'
  internalLink: string
  ticketUrl?: string
  featured?: boolean
}

const focusBadgeClasses: Record<EventConfig['focusVariant'], string> = {
  beginner: 'bg-fire-yellow/15 text-fire-yellow border-fire-yellow/30',
  intermediate: 'bg-fire-orange/15 text-fire-orange border-fire-orange/30',
  all: 'bg-fire-red/15    text-red-400     border-fire-red/30'
}

export default function EventCards({ events }: { events: EventConfig[] }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {events.map((event, i) => (
        <div
          key={event.id}
          className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
            event.featured
              ? 'border-fire-red/40 shadow-lg shadow-fire-red/10 hover:border-fire-orange/60 hover:shadow-fire-orange/20'
              : 'border-white/8 hover:border-fire-orange/40 hover:shadow-fire-orange/10'
          } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: `${i * 120}ms` }}>
          {/* Featured banner */}
          {event.featured && (
            <div className='absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-lg bg-gradient-to-r from-fire-red to-fire-orange px-4 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-md'>
              🔥 Next Event
            </div>
          )}

          {/* Logo area */}
          <Link
            href={event.internalLink}
            className={`relative flex aspect-video w-full items-center justify-center overflow-hidden border-b border-white/[0.06] ${
              event.featured
                ? 'bg-gradient-to-br from-fire-red/10 to-fire-orange/8'
                : 'bg-fire-dark/60'
            }`}>
            <div className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
              <div className='absolute right-0 top-0 h-32 w-32 rounded-full bg-fire-orange/10 blur-2xl' />
              <div className='absolute bottom-0 left-0 h-32 w-32 rounded-full bg-fire-red/10 blur-2xl' />
            </div>
            <div
              className={`relative z-10 transition-transform duration-500 group-hover:scale-110 ${event.featured ? 'mt-4' : ''}`}>
              <Image
                src={event.logo}
                alt={`${event.name} ${event.year} logo`}
                width={220}
                height={220}
                className='object-contain drop-shadow-xl'
              />
            </div>
          </Link>

          {/* Card body */}
          <div className='flex flex-1 flex-col gap-4 p-6 md:p-8'>
            <div>
              <Link href={event.internalLink}>
                <h3 className='mb-2 text-2xl font-extrabold text-white transition-colors duration-300 hover:text-fire-orange md:text-3xl'>
                  {event.name} {event.year}
                </h3>
              </Link>
              <div className='mb-3 flex items-center gap-2 text-fire-orange'>
                <Calendar className='h-4 w-4 flex-shrink-0' />
                <span className='text-sm font-semibold'>{event.dates}</span>
              </div>
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${focusBadgeClasses[event.focusVariant]}`}>
                {event.focus}
              </span>
            </div>

            {/* CTA */}
            <div className='mt-auto pt-2'>
              {event.ticketUrl ? (
                <a
                  href={event.ticketUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e63946] py-3.5 text-sm font-semibold text-[#f4a261] transition-all duration-200 hover:border-[#f4a261] hover:text-white active:scale-[1.02]'>
                  🎟 Get Tickets →
                </a>
              ) : (
                <Link
                  href={event.internalLink}
                  className='group/btn relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-transparent py-3.5 text-sm font-bold text-white/80 transition-all duration-300 hover:border-fire-orange/40 hover:bg-fire-orange/5 hover:text-white active:scale-100'>
                  <span className='relative z-10 flex items-center gap-2'>
                    Learn More
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2.5}>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M13 7l5 5m0 0l-5 5m5-5H6'
                      />
                    </svg>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
