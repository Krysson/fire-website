'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import type { Schedule, ScheduleDay, ScheduleSlot } from '@/lib/types'

interface ScheduleGridProps {
  schedule: Schedule | null
  eventSlug: string
  presenterNames?: Record<string, string>
  classLevels?: Record<string, string>
}

const MY_SCHEDULE_IDX = -1

export default function ScheduleGrid({
  schedule,
  eventSlug,
  presenterNames = {},
  classLevels = {},
}: ScheduleGridProps) {
  const [selectedDay, setSelectedDay] = useState(0)
  const [levelFilter, setLevelFilter] = useState('all')
  const [favorites, toggleFavorite] = useFavorites(eventSlug)

  if (!schedule || !schedule.days || schedule.days.length === 0) {
    return (
      <div className='bg-fire-charcoal border-2 border-fire-dark rounded-lg p-12 text-center'>
        <h3 className='text-2xl font-bold text-white mb-4'>Schedule Coming Soon</h3>
        <p className='text-gray-300'>
          The full event schedule will be published closer to the event date. Check back soon for
          class times, presenters, and room assignments.
        </p>
      </div>
    )
  }

  const hasLevelData = schedule.days.some(day =>
    day.slots.some(slot => slot.classSlug && classLevels[slot.classSlug])
  )

  const levelOptions = [
    { value: 'all', label: 'All' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ]

  const isSlotVisible = (slot: ScheduleSlot): boolean => {
    if (levelFilter === 'all') return true
    if (slot.type !== 'class') return true
    if (!slot.classSlug || !classLevels[slot.classSlug]) return true
    return classLevels[slot.classSlug].toLowerCase().includes(levelFilter)
  }

  const isMySched = selectedDay === MY_SCHEDULE_IDX
  const totalFavorites = favorites.size

  const myScheduleDays: Array<{ day: ScheduleDay; slots: ScheduleSlot[] }> = schedule.days
    .map(day => ({
      day,
      slots: day.slots.filter(s => s.classSlug && favorites.has(s.classSlug)),
    }))
    .filter(({ slots }) => slots.length > 0)

  return (
    <div className='space-y-6'>
      {/* Day Selector + My Schedule tab */}
      <div className='flex gap-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] p-2 flex-wrap'>
        {schedule.days.map((day, index) => {
          const isActive = selectedDay === index
          const dateLabel = new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })
          return (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`flex-1 rounded-lg px-4 py-3 text-center transition-all duration-200 ${
                isActive
                  ? 'bg-[#e63946] text-white shadow-lg shadow-[#e63946]/20'
                  : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
              }`}>
              <div className='font-bold text-sm md:text-base'>{day.label}</div>
              <div className={`text-xs mt-0.5 ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                {dateLabel}
              </div>
            </button>
          )
        })}

        {/* My Schedule tab */}
        <button
          onClick={() => setSelectedDay(MY_SCHEDULE_IDX)}
          className={`flex items-center gap-1.5 rounded-lg px-4 py-3 text-center transition-all duration-200 whitespace-nowrap ${
            isMySched
              ? 'bg-fire-orange text-black shadow-lg shadow-fire-orange/20'
              : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
          }`}>
          <Star
            className='h-3.5 w-3.5'
            fill={isMySched ? 'currentColor' : 'none'}
          />
          <span className='font-bold text-sm'>My Schedule</span>
          {totalFavorites > 0 && (
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs font-bold leading-none ${
                isMySched ? 'bg-black/20 text-black' : 'bg-fire-orange text-black'
              }`}>
              {totalFavorites}
            </span>
          )}
        </button>
      </div>

      {/* Level Filter (hidden in My Schedule view) */}
      {!isMySched && hasLevelData && (
        <div className='flex items-center gap-2 flex-wrap'>
          <span className='text-sm text-gray-400 mr-1'>Filter by level:</span>
          {levelOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setLevelFilter(option.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                levelFilter === option.value
                  ? 'bg-[#e63946] text-white'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
              }`}>
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* My Schedule view */}
      {isMySched && (
        <div className='space-y-8'>
          {myScheduleDays.length === 0 ? (
            <div className='bg-fire-charcoal border-2 border-fire-dark rounded-lg p-12 text-center'>
              <Star className='h-10 w-10 text-gray-600 mx-auto mb-4' />
              <h3 className='text-xl font-bold text-white mb-2'>No starred classes yet</h3>
              <p className='text-gray-400'>
                Tap ☆ on any class to add it here.
              </p>
            </div>
          ) : (
            myScheduleDays.map(({ day, slots }) => (
              <div key={day.date} className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <span className='text-fire-yellow font-bold text-lg'>{day.label}</span>
                  <div className='flex-1 h-px bg-[#2a2a2a]' />
                </div>
                {slots.map((slot, i) => (
                  <ScheduleSlotCard
                    key={i}
                    slot={slot}
                    eventSlug={eventSlug}
                    presenterNames={presenterNames}
                    classLevel={slot.classSlug ? classLevels[slot.classSlug] : undefined}
                    isFavorited={slot.classSlug ? favorites.has(slot.classSlug) : false}
                    onToggleFavorite={
                      slot.classSlug ? () => toggleFavorite(slot.classSlug!) : undefined
                    }
                  />
                ))}
              </div>
            ))
          )}
        </div>
      )}

      {/* Normal day schedule */}
      {!isMySched && (
        <div className='space-y-8'>
          {(() => {
            const currentDay = schedule.days[selectedDay]
            const orderedTimes = [...new Set(currentDay.slots.map(s => s.time))]
            const timeGroups: Record<string, ScheduleSlot[]> = {}
            currentDay.slots.forEach(slot => {
              if (!timeGroups[slot.time]) timeGroups[slot.time] = []
              timeGroups[slot.time].push(slot)
            })

            return orderedTimes.map(time => {
              const slots = timeGroups[time]
              const visibleSlots = slots.filter(isSlotVisible)
              if (visibleSlots.length === 0) return null

              const classSlots = visibleSlots.filter(s => s.type === 'class')
              const otherSlots = visibleSlots.filter(s => s.type !== 'class')

              return (
                <div key={time} className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <span className='text-[#f4a261] font-bold text-lg md:text-xl whitespace-nowrap'>
                      {time}
                    </span>
                    <div className='flex-1 h-px bg-[#2a2a2a]' />
                  </div>

                  {otherSlots.map((slot, i) => (
                    <ScheduleSlotCard
                      key={i}
                      slot={slot}
                      eventSlug={eventSlug}
                      presenterNames={presenterNames}
                      classLevel={slot.classSlug ? classLevels[slot.classSlug] : undefined}
                      isFavorited={slot.classSlug ? favorites.has(slot.classSlug) : false}
                      onToggleFavorite={
                        slot.classSlug ? () => toggleFavorite(slot.classSlug!) : undefined
                      }
                    />
                  ))}

                  {classSlots.length > 0 && (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                      {classSlots.map((slot, i) => (
                        <ScheduleSlotCard
                          key={i}
                          slot={slot}
                          eventSlug={eventSlug}
                          presenterNames={presenterNames}
                          classLevel={slot.classSlug ? classLevels[slot.classSlug] : undefined}
                          isFavorited={slot.classSlug ? favorites.has(slot.classSlug) : false}
                          onToggleFavorite={
                            slot.classSlug ? () => toggleFavorite(slot.classSlug!) : undefined
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })
          })()}
        </div>
      )}
    </div>
  )
}

interface ScheduleSlotCardProps {
  slot: ScheduleSlot
  eventSlug: string
  presenterNames: Record<string, string>
  classLevel?: string
  isFavorited: boolean
  onToggleFavorite?: () => void
}

function ScheduleSlotCard({
  slot,
  eventSlug,
  presenterNames,
  classLevel,
  isFavorited,
  onToggleFavorite,
}: ScheduleSlotCardProps) {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'class':
        return 'border-fire-orange bg-fire-charcoal'
      case 'social':
        return 'border-fire-yellow bg-fire-charcoal'
      case 'discussion':
        return 'border-[#60a5fa] bg-fire-charcoal'
      case 'break':
      case 'general':
      default:
        return 'border-fire-dark bg-fire-charcoal'
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'class':
        return (
          <span className='inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-[#f4a261]/20 text-[#f4a261] border border-[#f4a261]/30'>
            Class
          </span>
        )
      case 'social':
        return (
          <span className='inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-[#f9c74f]/20 text-[#f9c74f] border border-[#f9c74f]/30'>
            Social
          </span>
        )
      case 'discussion':
        return (
          <span className='inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-blue-400/20 text-blue-400 border border-blue-400/30'>
            Discussion
          </span>
        )
      case 'break':
        return (
          <span className='inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-gray-500/20 text-gray-400 border border-gray-500/30'>
            Break
          </span>
        )
      case 'general':
        return (
          <span className='inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-blue-400/20 text-blue-400 border border-blue-400/30'>
            General
          </span>
        )
      default:
        return null
    }
  }

  const getLevelBadge = (level?: string) => {
    if (!level) return null
    const l = level.toLowerCase()
    let classes = ''
    if (l.includes('beginner')) classes = 'bg-emerald-600/20 text-emerald-400 border-emerald-600/30'
    else if (l.includes('intermediate'))
      classes = 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    else if (l.includes('advanced')) classes = 'bg-red-500/20 text-red-400 border-red-500/30'
    else classes = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold border ${classes}`}>
        {level}
      </span>
    )
  }

  return (
    <div
      className={`rounded-lg border-2 ${getTypeStyles(slot.type)} p-4 md:p-5 transition-all duration-200 hover:border-fire-orange hover:shadow-lg hover:shadow-fire-orange/10`}>
      <div className='space-y-2'>
        {/* Title + badges + star */}
        <div className='flex flex-wrap items-start gap-2'>
          {onToggleFavorite && (
            <button
              onClick={e => {
                e.preventDefault()
                onToggleFavorite()
              }}
              aria-label={isFavorited ? 'Remove from My Schedule' : 'Add to My Schedule'}
              className='mt-0.5 flex-shrink-0 transition-transform duration-150 hover:scale-110 active:scale-95'>
              <Star
                className={`h-5 w-5 transition-colors duration-150 ${
                  isFavorited ? 'fill-fire-orange text-fire-orange' : 'text-gray-600'
                }`}
              />
            </button>
          )}
          <h3 className='text-base md:text-lg font-semibold flex-1 min-w-0'>
            {slot.classSlug ? (
              <Link
                href={`/events/${eventSlug}/classes/${slot.classSlug}`}
                className='text-white hover:text-fire-orange transition-colors duration-200 hover:underline'>
                {slot.title}
              </Link>
            ) : (
              <span className='text-white'>{slot.title}</span>
            )}
          </h3>
          <div className='flex gap-1.5 flex-wrap shrink-0'>
            {getTypeBadge(slot.type)}
            {getLevelBadge(classLevel)}
          </div>
        </div>

        {/* Presenter + room */}
        <div className='space-y-1'>
          {slot.presenter && (
            <p className='text-gray-300 text-sm'>
              <span className='text-gray-400'>
                {Array.isArray(slot.presenter) && slot.presenter.length > 1
                  ? 'Presenters:'
                  : 'Presenter:'}
              </span>{' '}
              {(Array.isArray(slot.presenter) ? slot.presenter : [slot.presenter]).map(
                (slug, i, arr) => (
                  <span key={slug}>
                    <Link
                      href={`/events/${eventSlug}/presenters/${slug}`}
                      className='text-fire-yellow hover:text-fire-orange transition-colors duration-200 hover:underline'>
                      {presenterNames[slug] ?? formatPresenterName(slug)}
                    </Link>
                    {i < arr.length - 1 && <span className='text-gray-400'> &amp; </span>}
                  </span>
                )
              )}
            </p>
          )}
          {slot.room && (
            <p className='text-gray-300 text-sm'>
              <span className='text-gray-400'>Room:</span> {slot.room}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function formatPresenterName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
