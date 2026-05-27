# FLARE 2026 Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add per-event sponsors pages, localStorage schedule favorites, and prominent feedback banners to BLAZE 2026 and FLARE 2026.

**Architecture:** Three independent features sharing a common foundation. Sponsors use a new `sponsors.json` content file per event + a shared `SponsorGrid` component + per-event page. Favorites live in a `useFavorites` hook wired into the existing `ScheduleGrid` client component. Feedback banners are inline JSX additions to three existing page types (event landing, class detail, schedule). All content-driven: features only render when their respective URLs/data are present in content files.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Tailwind CSS, lucide-react, localStorage API

---

## File Map

**New files:**
- `lib/types.ts` — add `Sponsor` interface, add `classFeedbackUrl` to `Event`
- `lib/content.ts` — add `getSponsors(eventSlug)` loader
- `components/events/SponsorGrid.tsx` — tiered sponsor display component
- `app/events/flare-2026/sponsors/page.tsx` — FLARE sponsors page
- `app/events/blaze-2026/sponsors/page.tsx` — BLAZE sponsors page
- `hooks/useFavorites.ts` — localStorage favorites hook
- `content/flare-2026/sponsors.json` — FLARE sponsor data (starts empty)
- `content/blaze-2026/sponsors.json` — BLAZE sponsor data (starts empty)

**Modified files:**
- `components/events/ScheduleGrid.tsx` — add star toggles + My Schedule tab
- `app/events/flare-2026/page.tsx` — add feedback banner + Sponsors nav card
- `app/events/blaze-2026/page.tsx` — add feedback banner + Sponsors nav card
- `app/events/flare-2026/classes/[slug]/page.tsx` — replace feedback pill with feedback card
- `app/events/blaze-2026/classes/[slug]/page.tsx` — replace feedback pill with feedback card
- `app/events/flare-2026/schedule/page.tsx` — add feedback links to Schedule Notes
- `app/events/blaze-2026/schedule/page.tsx` — add feedback links to Schedule Notes
- `content/flare-2026/event.json` — add `classFeedbackUrl` field (empty string)
- `content/blaze-2026/event.json` — add `classFeedbackUrl` field (empty string)

---

## Task 1: Types — Add `Sponsor` interface and `classFeedbackUrl` to `Event`

**Files:**
- Modify: `lib/types.ts`

- [ ] **Step 1: Add `Sponsor` interface and `classFeedbackUrl` to `lib/types.ts`**

Open `lib/types.ts`. After the `Class` interface (line ~143), add the `Sponsor` interface. Also add `classFeedbackUrl` to the `Event` interface (after `feedbackUrl?` on line ~102).

Add after the `Class` interface:
```typescript
/**
 * A sponsor or vendor for an event
 */
export interface Sponsor {
  /** Tier determines display size and position */
  tier: 'gold' | 'silver' | 'bronze' | 'community'
  /** Display name */
  name: string
  /** Path to logo image (relative to /public) */
  logo: string
  /** Link to sponsor website */
  url: string
  /** Short tagline — Gold/Silver/Bronze only, omit for Community */
  tagline?: string
}
```

Add `classFeedbackUrl` to the `Event` interface, after the existing `feedbackUrl` field:
```typescript
  /** URL for event feedback form */
  feedbackUrl?: string
  /** URL for a general class feedback form linked from the schedule page */
  classFeedbackUrl?: string
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/types.ts
git commit -m "feat: add Sponsor type and classFeedbackUrl to Event type"
```

---

## Task 2: Content loader — Add `getSponsors()`

**Files:**
- Modify: `lib/content.ts`

- [ ] **Step 1: Add `getSponsors` import in `lib/content.ts`**

The file already imports `Event, Schedule, Presenter, Class` from `./types`. Add `Sponsor` to that import:

```typescript
import type { Event, Schedule, Presenter, Class, Sponsor } from './types';
```

- [ ] **Step 2: Add `getSponsors` function at the end of `lib/content.ts`**

```typescript
/**
 * Get sponsors for an event from sponsors.json
 * @param eventSlug - Event identifier (e.g., 'flare-2026')
 * @returns Array of sponsors or empty array if file absent
 */
export function getSponsors(eventSlug: string): Sponsor[] {
  try {
    const sponsorsPath = path.join(CONTENT_DIR, eventSlug, 'sponsors.json')
    if (!fs.existsSync(sponsorsPath)) return []
    const fileContents = fs.readFileSync(sponsorsPath, 'utf8')
    const data = JSON.parse(fileContents) as { sponsors: Sponsor[] }
    return data.sponsors ?? []
  } catch (error) {
    console.error(`Error loading sponsors for ${eventSlug}:`, error)
    return []
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/content.ts
git commit -m "feat: add getSponsors content loader"
```

---

## Task 3: Create `SponsorGrid` component

**Files:**
- Create: `components/events/SponsorGrid.tsx`

- [ ] **Step 1: Create `components/events/SponsorGrid.tsx`**

```typescript
import Image from 'next/image'
import type { Sponsor } from '@/lib/types'

interface SponsorGridProps {
  sponsors: Sponsor[]
}

const TIER_ORDER = ['gold', 'silver', 'bronze', 'community'] as const
type Tier = (typeof TIER_ORDER)[number]

const TIER_CONFIG: Record<
  Tier,
  {
    label: string
    icon: string
    accentColor: string
    borderClass: string
    visitClass: string
    gridClass: string
    logoWidth: number
    logoHeight: number
  }
> = {
  gold: {
    label: 'Gold',
    icon: '✦',
    accentColor: '#f9c74f',
    borderClass: 'border-[#f9c74f]/20 hover:border-[#f9c74f]/50',
    visitClass: 'text-[#f9c74f]',
    gridClass: 'grid-cols-1 sm:grid-cols-2',
    logoWidth: 120,
    logoHeight: 80,
  },
  silver: {
    label: 'Silver',
    icon: '✦',
    accentColor: '#cccccc',
    borderClass: 'border-[#cccccc]/20 hover:border-[#cccccc]/50',
    visitClass: 'text-[#cccccc]',
    gridClass: 'grid-cols-2 sm:grid-cols-3',
    logoWidth: 88,
    logoHeight: 60,
  },
  bronze: {
    label: 'Bronze',
    icon: '✦',
    accentColor: '#cd7f32',
    borderClass: 'border-[#cd7f32]/20 hover:border-[#cd7f32]/50',
    visitClass: 'text-[#cd7f32]',
    gridClass: 'grid-cols-2 sm:grid-cols-4',
    logoWidth: 72,
    logoHeight: 48,
  },
  community: {
    label: 'Community',
    icon: '♥',
    accentColor: '#e63946',
    borderClass: 'border-[#e63946]/20 hover:border-[#e63946]/50',
    visitClass: 'text-[#e63946]',
    gridClass: 'grid-cols-3 sm:grid-cols-5',
    logoWidth: 56,
    logoHeight: 36,
  },
}

export default function SponsorGrid({ sponsors }: SponsorGridProps) {
  const grouped = TIER_ORDER.reduce<Record<Tier, Sponsor[]>>(
    (acc, tier) => {
      acc[tier] = sponsors.filter(s => s.tier === tier)
      return acc
    },
    { gold: [], silver: [], bronze: [], community: [] }
  )

  const activeTiers = TIER_ORDER.filter(t => grouped[t].length > 0)

  if (activeTiers.length === 0) {
    return (
      <p className='py-12 text-center text-gray-400 italic'>
        Sponsors will be announced soon.
      </p>
    )
  }

  return (
    <div className='space-y-12'>
      {activeTiers.map(tier => {
        const cfg = TIER_CONFIG[tier]
        const items = grouped[tier]
        return (
          <div key={tier}>
            {/* Tier divider */}
            <div className='mb-8 flex items-center gap-4'>
              <div
                className='h-px flex-1'
                style={{
                  background: `linear-gradient(to right, ${cfg.accentColor}, transparent)`,
                }}
              />
              <span
                className='text-xs font-bold uppercase tracking-widest'
                style={{ color: cfg.accentColor }}>
                {cfg.icon} {cfg.label}
              </span>
              <div
                className='h-px flex-1'
                style={{
                  background: `linear-gradient(to left, ${cfg.accentColor}, transparent)`,
                }}
              />
            </div>

            {/* Cards */}
            <div className={`grid ${cfg.gridClass} gap-4`}>
              {items.map(sponsor => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`flex flex-col items-center gap-3 rounded-lg border bg-fire-charcoal p-4 text-center transition-all duration-200 ${cfg.borderClass}`}>
                  <div
                    className='relative flex items-center justify-center'
                    style={{ width: cfg.logoWidth, height: cfg.logoHeight }}>
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className='object-contain'
                    />
                  </div>
                  <p className='text-sm font-bold text-white'>{sponsor.name}</p>
                  {sponsor.tagline && (
                    <p className='text-xs italic text-gray-400'>&ldquo;{sponsor.tagline}&rdquo;</p>
                  )}
                  <span className={`text-xs font-medium ${cfg.visitClass}`}>Visit →</span>
                </a>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/events/SponsorGrid.tsx
git commit -m "feat: add SponsorGrid component with tiered layout"
```

---

## Task 4: Sponsors pages + content files + nav cards

**Files:**
- Create: `app/events/flare-2026/sponsors/page.tsx`
- Create: `app/events/blaze-2026/sponsors/page.tsx`
- Create: `content/flare-2026/sponsors.json`
- Create: `content/blaze-2026/sponsors.json`
- Modify: `app/events/flare-2026/page.tsx`
- Modify: `app/events/blaze-2026/page.tsx`

- [ ] **Step 1: Create `content/flare-2026/sponsors.json`**

```json
{
  "sponsors": []
}
```

- [ ] **Step 2: Create `content/blaze-2026/sponsors.json`**

```json
{
  "sponsors": []
}
```

- [ ] **Step 3: Create `app/events/flare-2026/sponsors/page.tsx`**

```typescript
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
```

- [ ] **Step 4: Create `app/events/blaze-2026/sponsors/page.tsx`**

Same as the FLARE sponsors page above but substitute every instance of `flare-2026` with `blaze-2026` and `FLARE 2026` with `BLAZE 2026`:

```typescript
import { getEventData, getSponsors } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SponsorGrid from '@/components/events/SponsorGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sponsors — BLAZE 2026',
  description: 'Thank you to the sponsors and vendors who make BLAZE 2026 possible.',
}

export default function BlazeSponsorsPage() {
  const event = getEventData('blaze-2026')
  const sponsors = getSponsors('blaze-2026')

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
            <Link href='/events/blaze-2026' className='hover:text-fire-orange transition-colors'>
              BLAZE 2026
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
```

- [ ] **Step 5: Add Sponsors nav card to `app/events/flare-2026/page.tsx`**

In `app/events/flare-2026/page.tsx`, find the `navigationCards` array (around line 14). Add a Sponsors entry and update the grid class.

Replace the `navigationCards` array:
```typescript
  const navigationCards = [
    {
      title: 'Schedule',
      description: 'View the full weekend schedule',
      href: '/events/flare-2026/schedule',
      icon: Calendar,
    },
    {
      title: 'Presenters',
      description: 'Meet our talented instructors',
      href: '/events/flare-2026/presenters',
      icon: Users,
    },
    {
      title: 'Classes',
      description: 'Browse all available classes',
      href: '/events/flare-2026/classes',
      icon: Calendar,
    },
    {
      title: 'Venue',
      description: 'Location and facility information',
      href: '/events/flare-2026/venue',
      icon: MapPin,
    },
    {
      title: 'Sponsors',
      description: 'Our sponsors and vendors',
      href: '/events/flare-2026/sponsors',
      icon: Ticket,
    },
  ]
```

Also add the `Heart` icon import from lucide-react (for the Sponsors card visual). Actually use the existing `Ticket` import as shown above, or add `Building2` if preferred. The existing icons already imported are `Calendar, MapPin, Users, Ticket, Hotel` — use `Building2` from lucide-react for a more fitting icon:

Add `Building2` to the lucide-react import at the top of the file:
```typescript
import { Calendar, MapPin, Users, Ticket, Hotel, Building2 } from 'lucide-react';
```

Then use `Building2` for the Sponsors card:
```typescript
    {
      title: 'Sponsors',
      description: 'Our sponsors and vendors',
      href: '/events/flare-2026/sponsors',
      icon: Building2,
    },
```

Update the nav cards grid class from `lg:grid-cols-4` to `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5`:
```tsx
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
```

- [ ] **Step 6: Add Sponsors nav card to `app/events/blaze-2026/page.tsx`**

Same changes as Step 5 but for BLAZE:

1. Add `Building2` to the lucide-react import.
2. Add Sponsors entry to `navigationCards`:
```typescript
    {
      title: 'Sponsors',
      description: 'Our sponsors and vendors',
      href: '/events/blaze-2026/sponsors',
      icon: Building2,
    },
```
3. Update the nav cards grid class to `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5`.

- [ ] **Step 7: Build check**

```bash
npm run build
```
Expected: Build succeeds. Check that `/events/flare-2026/sponsors` and `/events/blaze-2026/sponsors` are in the output. Both pages should show "Sponsors will be announced soon." since the JSON files are empty.

- [ ] **Step 8: Commit**

```bash
git add app/events/flare-2026/sponsors/page.tsx app/events/blaze-2026/sponsors/page.tsx content/flare-2026/sponsors.json content/blaze-2026/sponsors.json app/events/flare-2026/page.tsx app/events/blaze-2026/page.tsx
git commit -m "feat: add per-event sponsors pages with tiered layout and nav cards"
```

---

## Task 5: Create `useFavorites` hook

**Files:**
- Create: `hooks/useFavorites.ts`

- [ ] **Step 1: Create `hooks/useFavorites.ts`**

```typescript
'use client'

import { useState, useEffect } from 'react'

export function useFavorites(eventSlug: string): [Set<string>, (slug: string) => void] {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`fire-favorites-${eventSlug}`)
      if (stored) setFavorites(new Set(JSON.parse(stored) as string[]))
    } catch {
      // ignore corrupt storage
    }
  }, [eventSlug])

  function toggle(slug: string) {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      try {
        localStorage.setItem(`fire-favorites-${eventSlug}`, JSON.stringify([...next]))
      } catch {
        // ignore storage write errors
      }
      return next
    })
  }

  return [favorites, toggle]
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add hooks/useFavorites.ts
git commit -m "feat: add useFavorites localStorage hook"
```

---

## Task 6: Update `ScheduleGrid` with favorites

**Files:**
- Modify: `components/events/ScheduleGrid.tsx`

This is the largest single change. Read the current file carefully before editing. The key changes are:
1. Import `useFavorites` and `Star` from lucide-react
2. Call the hook inside `ScheduleGrid`
3. Add a "★ My Schedule" tab after the day tabs
4. Render the My Schedule view when that tab is active
5. Pass `isFavorited` + `onToggleFavorite` props to `ScheduleSlotCard`
6. Render a star button in `ScheduleSlotCard` when the slot has a `classSlug`

- [ ] **Step 1: Replace the full content of `components/events/ScheduleGrid.tsx`**

```typescript
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

  // Collect all starred slots across all days (for My Schedule view)
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
```

- [ ] **Step 2: Build check**

```bash
npm run build
```
Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add components/events/ScheduleGrid.tsx hooks/useFavorites.ts
git commit -m "feat: add localStorage schedule favorites with My Schedule tab"
```

---

## Task 7: Feedback banners on event landing pages

**Files:**
- Modify: `app/events/flare-2026/page.tsx`
- Modify: `app/events/blaze-2026/page.tsx`

- [ ] **Step 1: Add feedback banner to FLARE event page**

In `app/events/flare-2026/page.tsx`, find the breadcrumb section (around line 48). Insert the feedback banner immediately **after** the closing `</div>` of the breadcrumb section and **before** the Hero Section `<section>`.

Add after the breadcrumb `</div>`:
```tsx
      {/* Feedback Banner — only when feedbackUrl is set */}
      {event.feedbackUrl && (
        <div className='relative z-10 border-b-2 border-fire-orange bg-fire-orange/10'>
          <div className='mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8'>
            <span className='flex-shrink-0 text-xl'>📋</span>
            <div className='flex-1'>
              <p className='text-sm font-bold text-fire-orange'>
                How was {event.name} {event.year}?
              </p>
              <p className='text-xs text-gray-400'>
                Share your experience and help us improve future events.
              </p>
            </div>
            <a
              href={event.feedbackUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-shrink-0 whitespace-nowrap rounded-lg bg-fire-orange px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-fire-yellow'>
              Give Feedback →
            </a>
          </div>
        </div>
      )}
```

Also remove the old muted feedback button from the CTA section at the bottom. In the CTA section, remove these lines:
```tsx
            {event.feedbackUrl && (
              <a
                href={event.feedbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-6 py-3 text-base font-medium text-gray-300 transition-all duration-200 hover:border-gray-400 hover:text-white active:scale-95"
              >
                Event Feedback
              </a>
            )}
```

- [ ] **Step 2: Add feedback banner to BLAZE event page**

In `app/events/blaze-2026/page.tsx`, apply the same two changes:

1. Insert the same feedback banner after the breadcrumb `</div>`:
```tsx
      {/* Feedback Banner — only when feedbackUrl is set */}
      {event.feedbackUrl && (
        <div className='relative z-10 border-b-2 border-fire-orange bg-fire-orange/10'>
          <div className='mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8'>
            <span className='flex-shrink-0 text-xl'>📋</span>
            <div className='flex-1'>
              <p className='text-sm font-bold text-fire-orange'>
                How was {event.name} {event.year}?
              </p>
              <p className='text-xs text-gray-400'>
                Share your experience and help us improve future events.
              </p>
            </div>
            <a
              href={event.feedbackUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-shrink-0 whitespace-nowrap rounded-lg bg-fire-orange px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-fire-yellow'>
              Give Feedback →
            </a>
          </div>
        </div>
      )}
```

2. Remove the old muted feedback button from the BLAZE CTA section:
```tsx
          {event.feedbackUrl && (
            <a
              href={event.feedbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-600 px-6 py-3 text-base font-medium text-gray-300 transition-all duration-200 hover:border-gray-400 hover:text-white active:scale-95"
            >
              Event Feedback
            </a>
          )}
```

- [ ] **Step 3: Build check**

```bash
npm run build
```
Expected: Build succeeds. BLAZE 2026 page should now show the orange feedback banner (since `blaze-2026/event.json` has a `feedbackUrl`). FLARE page should not show the banner until a `feedbackUrl` is added to its `event.json`.

- [ ] **Step 4: Commit**

```bash
git add app/events/flare-2026/page.tsx app/events/blaze-2026/page.tsx
git commit -m "feat: replace buried feedback button with prominent banner on event pages"
```

---

## Task 8: Feedback cards on class pages

**Files:**
- Modify: `app/events/flare-2026/classes/[slug]/page.tsx`
- Modify: `app/events/blaze-2026/classes/[slug]/page.tsx`

- [ ] **Step 1: Update FLARE class page**

In `app/events/flare-2026/classes/[slug]/page.tsx`:

**Remove** the feedback pill from the meta row (lines 99–107):
```tsx
              {classItem.feedbackUrl && (
                <a
                  href={classItem.feedbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-fire-orange/40 bg-fire-orange/10 text-fire-orange text-sm font-medium hover:bg-fire-orange/20 transition-colors">
                  Class Feedback
                </a>
              )}
```

**Add** the feedback card after the class description block. Find the closing `</div>` of `max-w-3xl mx-auto` and add before it:
```tsx
          {/* Feedback card */}
          {classItem.feedbackUrl && (
            <div className='mt-10 flex items-center gap-4 rounded-lg border border-fire-orange/40 bg-fire-orange/10 p-5'>
              <span className='flex-shrink-0 text-2xl'>📝</span>
              <div className='flex-1'>
                <p className='font-bold text-fire-orange'>Enjoyed this class?</p>
                <p className='mt-1 text-sm text-gray-400'>
                  Your feedback goes directly to the presenter and helps them improve.
                </p>
              </div>
              <a
                href={classItem.feedbackUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex-shrink-0 whitespace-nowrap rounded-lg bg-fire-orange px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-fire-yellow'>
                Leave Feedback →
              </a>
            </div>
          )}
```

- [ ] **Step 2: Update BLAZE class page**

In `app/events/blaze-2026/classes/[slug]/page.tsx`, apply the exact same two changes:

**Remove** the feedback pill (lines 108–116 in the BLAZE file):
```tsx
              {classItem.feedbackUrl && (
                <a
                  href={classItem.feedbackUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-fire-orange/40 bg-fire-orange/10 text-fire-orange text-sm font-medium hover:bg-fire-orange/20 transition-colors'>
                  Class Feedback
                </a>
              )}
```

**Add** the same feedback card before the closing `</div>` of `max-w-3xl mx-auto`:
```tsx
          {/* Feedback card */}
          {classItem.feedbackUrl && (
            <div className='mt-10 flex items-center gap-4 rounded-lg border border-fire-orange/40 bg-fire-orange/10 p-5'>
              <span className='flex-shrink-0 text-2xl'>📝</span>
              <div className='flex-1'>
                <p className='font-bold text-fire-orange'>Enjoyed this class?</p>
                <p className='mt-1 text-sm text-gray-400'>
                  Your feedback goes directly to the presenter and helps them improve.
                </p>
              </div>
              <a
                href={classItem.feedbackUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex-shrink-0 whitespace-nowrap rounded-lg bg-fire-orange px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-fire-yellow'>
                Leave Feedback →
              </a>
            </div>
          )}
```

- [ ] **Step 3: Build check**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/events/flare-2026/classes/[slug]/page.tsx "app/events/blaze-2026/classes/[slug]/page.tsx"
git commit -m "feat: replace class feedback pill with prominent card below description"
```

---

## Task 9: Feedback links on schedule pages + event.json updates

**Files:**
- Modify: `app/events/flare-2026/schedule/page.tsx`
- Modify: `app/events/blaze-2026/schedule/page.tsx`
- Modify: `content/flare-2026/event.json`
- Modify: `content/blaze-2026/event.json`

- [ ] **Step 1: Add `classFeedbackUrl` to `content/flare-2026/event.json`**

Add after the existing `"logo"` field (or at the end before the closing `}`):
```json
  "feedbackUrl": "",
  "classFeedbackUrl": ""
```
(Leave both as empty strings for now — they'll be filled in before the event.)

- [ ] **Step 2: Add `classFeedbackUrl` to `content/blaze-2026/event.json`**

The BLAZE event.json already has `"feedbackUrl": "https://tally.so/r/RGJ0o9"`. Add `classFeedbackUrl` after it:
```json
  "feedbackUrl": "https://tally.so/r/RGJ0o9",
  "classFeedbackUrl": ""
```

- [ ] **Step 3: Update FLARE schedule page**

In `app/events/flare-2026/schedule/page.tsx`, find the Schedule Notes `<div>` (around line 95). Inside the `<div className='space-y-3 text-gray-300'>`, add the feedback links block **after** the last `<p>` (the Questions paragraph):

```tsx
          {(eventData.feedbackUrl || eventData.classFeedbackUrl) && (
            <div className='flex flex-wrap gap-3 pt-4 border-t border-fire-dark'>
              {eventData.classFeedbackUrl && (
                <a
                  href={eventData.classFeedbackUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 rounded-lg border border-fire-orange/40 bg-fire-orange/20 px-4 py-2 text-sm font-medium text-fire-orange transition-colors hover:bg-fire-orange/30'>
                  📋 Class Feedback
                </a>
              )}
              {eventData.feedbackUrl && (
                <a
                  href={eventData.feedbackUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 rounded-lg border border-fire-red/40 bg-fire-red/20 px-4 py-2 text-sm font-medium text-fire-red transition-colors hover:bg-fire-red/30'>
                  🎪 Event Feedback
                </a>
              )}
            </div>
          )}
```

- [ ] **Step 4: Update BLAZE schedule page**

In `app/events/blaze-2026/schedule/page.tsx`, apply the identical change to the Schedule Notes section — add the same feedback links block after the Questions paragraph.

- [ ] **Step 5: Final build check**

```bash
npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit everything**

```bash
git add content/flare-2026/event.json content/blaze-2026/event.json app/events/flare-2026/schedule/page.tsx app/events/blaze-2026/schedule/page.tsx
git commit -m "feat: add feedback links to schedule pages and classFeedbackUrl to event.json"
```

---

## Final verification checklist

After all tasks complete, verify the following in the running dev server (`npm run dev`):

- [ ] `/events/flare-2026/sponsors` — shows "Sponsors will be announced soon." (empty JSON)
- [ ] `/events/blaze-2026/sponsors` — shows "Sponsors will be announced soon." (empty JSON)
- [ ] Both event landing pages — Sponsors card appears in nav grid
- [ ] `/events/blaze-2026` — orange feedback banner visible below breadcrumb (BLAZE has a feedbackUrl)
- [ ] `/events/flare-2026` — no banner (feedbackUrl is empty string, which is falsy)
- [ ] `/events/blaze-2026/schedule` — star icons on class rows, My Schedule tab present, clicking star persists on page reload
- [ ] `/events/flare-2026/schedule` — same
- [ ] Any BLAZE class with `feedbackUrl` set — feedback card appears below description
- [ ] BLAZE/FLARE schedule pages — feedback links appear in Schedule Notes when URLs are set
