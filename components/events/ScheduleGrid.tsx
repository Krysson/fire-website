'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Schedule, ScheduleSlot } from '@/lib/types'

interface ScheduleGridProps {
  schedule: Schedule | null
  eventSlug: string
  presenterNames?: Record<string, string>
  classLevels?: Record<string, string>
}

export default function ScheduleGrid({
  schedule,
  eventSlug,
  presenterNames = {},
  classLevels = {},
}: ScheduleGridProps) {
  const [selectedDay, setSelectedDay] = useState(0)
  const [levelFilter, setLevelFilter] = useState('all')

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

  // Show level filter only if any slot across any day has known level data
  const hasLevelData = schedule.days.some(day =>
    day.slots.some(slot => slot.classSlug && classLevels[slot.classSlug])
  )

  const levelOptions = [
    { value: 'all', label: 'All' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ]

  const currentDay = schedule.days[selectedDay]

  const isSlotVisible = (slot: ScheduleSlot): boolean => {
    if (levelFilter === 'all') return true
    if (slot.type !== 'class') return true
    if (!slot.classSlug || !classLevels[slot.classSlug]) return true
    return classLevels[slot.classSlug].toLowerCase().includes(levelFilter)
  }

  // Group slots by time, preserving original order
  const orderedTimes = [...new Set(currentDay.slots.map(s => s.time))]
  const timeGroups: Record<string, ScheduleSlot[]> = {}
  currentDay.slots.forEach(slot => {
    if (!timeGroups[slot.time]) timeGroups[slot.time] = []
    timeGroups[slot.time].push(slot)
  })

  return (
    <div className='space-y-6'>
      {/* Day Selector */}
      <div className='flex gap-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] p-2'>
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
      </div>

      {/* Level Filter */}
      {hasLevelData && (
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

      {/* Schedule grouped by time */}
      <div className='space-y-8'>
        {orderedTimes.map(time => {
          const slots = timeGroups[time]
          const visibleSlots = slots.filter(isSlotVisible)
          if (visibleSlots.length === 0) return null

          const classSlots = visibleSlots.filter(s => s.type === 'class')
          const otherSlots = visibleSlots.filter(s => s.type !== 'class')

          return (
            <div key={time} className='space-y-3'>
              {/* Time header */}
              <div className='flex items-center gap-3'>
                <span className='text-[#f4a261] font-bold text-lg md:text-xl whitespace-nowrap'>
                  {time}
                </span>
                <div className='flex-1 h-px bg-[#2a2a2a]' />
              </div>

              {/* Non-class slots: full width */}
              {otherSlots.map((slot, i) => (
                <ScheduleSlotCard
                  key={i}
                  slot={slot}
                  eventSlug={eventSlug}
                  presenterNames={presenterNames}
                  classLevel={slot.classSlug ? classLevels[slot.classSlug] : undefined}
                />
              ))}

              {/* Class slots: 2-col on large, 1-col on small */}
              {classSlots.length > 0 && (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                  {classSlots.map((slot, i) => (
                    <ScheduleSlotCard
                      key={i}
                      slot={slot}
                      eventSlug={eventSlug}
                      presenterNames={presenterNames}
                      classLevel={slot.classSlug ? classLevels[slot.classSlug] : undefined}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface ScheduleSlotCardProps {
  slot: ScheduleSlot
  eventSlug: string
  presenterNames: Record<string, string>
  classLevel?: string
}

function ScheduleSlotCard({ slot, eventSlug, presenterNames, classLevel }: ScheduleSlotCardProps) {
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
    else if (l.includes('intermediate')) classes = 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    else if (l.includes('advanced')) classes = 'bg-red-500/20 text-red-400 border-red-500/30'
    else classes = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold border ${classes}`}>
        {level}
      </span>
    )
  }

  return (
    <div
      className={`rounded-lg border-2 ${getTypeStyles(slot.type)} p-4 md:p-5 transition-all duration-200 hover:border-fire-orange hover:shadow-lg hover:shadow-fire-orange/10`}>
      <div className='space-y-2'>
        {/* Title + badges */}
        <div className='flex flex-wrap items-start gap-2'>
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
                    {i < arr.length - 1 && <span className='text-gray-400'> & </span>}
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
