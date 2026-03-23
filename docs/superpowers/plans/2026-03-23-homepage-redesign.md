# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the FIRE Orlando homepage with a cinematic fire-themed hero featuring a live countdown to BLAZE 2026, featured event cards with direct ticket CTAs, and a closing "Ready to Ignite?" section — all mobile-first on a new `ui/frontend` branch.

**Architecture:** Four focused component rewrites — Hero, EventCards, page layout, and Header nav CTA. A new `Countdown.tsx` sub-component handles the live timer logic in isolation. No new dependencies required; all styling uses existing Tailwind fire colors and globals.css utilities.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Tailwind CSS (fire color palette), existing globals.css utilities (`gradient-fire-text`, `animate-pulse-slow`, `animate-bounce-slow`, `glass-effect`)

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create branch | — | `ui/frontend` isolated from main |
| Add CSS | `app/globals.css` | `@keyframes ember-rise` + `.animate-ember` for floating particles |
| Create | `components/home/Countdown.tsx` | Client component: live countdown timer to April 17 2026 |
| Rewrite | `components/home/Hero.tsx` | Cinematic full-viewport hero with logo, countdown, CTAs, embers |
| Rewrite | `components/home/EventCards.tsx` | Event cards with featured BLAZE (ticket CTA) + FLARE/FIRE (learn more) |
| Modify | `app/page.tsx` | Updated section order; remove Upcoming Highlight; add Footer CTA section |
| Modify | `components/layout/Header.tsx` | Add "Get Tickets" CTA button to desktop nav and mobile drawer |

---

## Chunk 1: Branch + CSS Foundation

### Task 1: Create the feature branch

- [ ] **Create and switch to `ui/frontend` branch**

```bash
cd C:/Users/MikeG/Desktop/repos/fire-website
git checkout -b ui/frontend
```

Expected: `Switched to a new branch 'ui/frontend'`

---

### Task 2: Add ember animation to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Add `@keyframes ember-rise` and `.animate-ember` inside the existing `@layer utilities` block, just before the closing `}`**

```css
  @keyframes ember-rise {
    0%   { transform: translateY(0)    scale(0.8); opacity: 0;   }
    10%  { opacity: 1; }
    90%  { opacity: 0.5; }
    100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
  }

  .animate-ember {
    animation: ember-rise linear infinite;
  }
```

- [ ] **Verify the dev server compiles without errors**

```bash
npm run dev
```

Open `http://localhost:3000` — page should load normally, no CSS errors in console.

- [ ] **Commit**

```bash
git add app/globals.css
git commit -m "feat: add ember-rise animation utility for hero particles"
```

---

## Chunk 2: Countdown Component

### Task 3: Create `components/home/Countdown.tsx`

**Files:**
- Create: `components/home/Countdown.tsx`

This is a client component. It computes time remaining until `April 17, 2026 00:00:00 local time` and ticks every second. When the target date is past, it renders a "Happening now!" message instead.

- [ ] **Create the file with this exact content:**

```tsx
'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const TARGET_DATE = new Date('2026-04-17T00:00:00')

function getTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft())
  const isPast = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (isPast) {
    return (
      <p className="text-2xl font-bold text-fire-orange">
        🔥 Happening now!
      </p>
    )
  }

  const units = [
    { label: 'Days',    value: timeLeft.days },
    { label: 'Hours',   value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="inline-flex overflow-hidden rounded-2xl border border-fire-orange/25 bg-white/[0.04] backdrop-blur-md">
      {units.map(({ label, value }, i) => (
        <div
          key={label}
          className={`flex flex-col items-center px-5 py-4 sm:px-7 sm:py-5 ${
            i < units.length - 1 ? 'border-r border-fire-orange/15' : ''
          }`}
        >
          <span className="bg-gradient-to-b from-fire-yellow to-fire-orange bg-clip-text text-3xl font-black leading-none text-transparent sm:text-4xl">
            {pad(value)}
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-widest text-white/40">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Verify it compiles — import it temporarily in any page to check for TS errors, then remove the temporary import**

```bash
npm run build 2>&1 | grep -i error | head -20
```

Expected: no TypeScript errors related to Countdown.tsx

- [ ] **Commit**

```bash
git add components/home/Countdown.tsx
git commit -m "feat: add live Countdown component targeting BLAZE 2026 (Apr 17)"
```

---

## Chunk 3: Hero Rewrite

### Task 4: Rewrite `components/home/Hero.tsx`

**Files:**
- Modify: `components/home/Hero.tsx`

Design specs from approved mockup:
- Full-viewport (`min-h-screen`) dark background
- Fire radial gradient layers (no solid fire orange background — dark with subtle glow)
- 15–20 floating ember particles (absolutely positioned, `.animate-ember`)
- FIRE logo (`/logos/FIRELOGO_NOYEAR.png`) centered, 160px mobile / 220px desktop, with orange glow ring
- Eyebrow: "Florida Intensive Rope Events" — 18px, uppercase, letter-spacing, white/75 opacity
- Title: "FIRE Orlando" — `clamp` large, white-to-fire gradient text
- Subtitle: one sentence, white/70
- Countdown label: "⚡ BLAZE 2026 begins in" — 32px bold, fire-yellow-to-orange gradient text, glow shadow
- `<Countdown />` component
- Two CTAs side-by-side (stack on mobile):
  - Primary: "🎟 Get Tickets — BLAZE 2026" → `https://forbiddentickets.com/events/blaze-2026` (external, `target="_blank"`)
  - Secondary: "Explore All Events" → `/#events` anchor
- Scroll indicator (bouncing chevron) at bottom
- Bottom fade gradient (`from-fire-black`)
- Entrance animations: staggered `opacity-0 → opacity-100 translate-y-4 → translate-y-0` on mount

- [ ] **Replace the full contents of `components/home/Hero.tsx` with:**

```tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Countdown from './Countdown'

const TICKET_URL = 'https://forbiddentickets.com/events/blaze-2026'

// Deterministic ember positions — avoids hydration mismatch from Math.random()
const EMBERS = [
  { left: '5%',  delay: '0s',   dur: '9s',  size: 3, color: '#f9c74f' },
  { left: '12%', delay: '1.5s', dur: '11s', size: 4, color: '#f4a261' },
  { left: '20%', delay: '3s',   dur: '8s',  size: 2, color: '#e63946' },
  { left: '28%', delay: '0.5s', dur: '13s', size: 5, color: '#f9c74f' },
  { left: '35%', delay: '2s',   dur: '10s', size: 3, color: '#f4a261' },
  { left: '42%', delay: '4s',   dur: '7s',  size: 2, color: '#f9c74f' },
  { left: '50%', delay: '1s',   dur: '12s', size: 4, color: '#e63946' },
  { left: '58%', delay: '3.5s', dur: '9s',  size: 3, color: '#f4a261' },
  { left: '65%', delay: '0.8s', dur: '11s', size: 5, color: '#f9c74f' },
  { left: '72%', delay: '2.5s', dur: '8s',  size: 2, color: '#e63946' },
  { left: '80%', delay: '1.2s', dur: '14s', size: 4, color: '#f4a261' },
  { left: '88%', delay: '4.5s', dur: '10s', size: 3, color: '#f9c74f' },
  { left: '93%', delay: '0.3s', dur: '9s',  size: 2, color: '#e63946' },
  { left: '8%',  delay: '6s',   dur: '12s', size: 3, color: '#f4a261' },
  { left: '96%', delay: '5s',   dur: '8s',  size: 4, color: '#f9c74f' },
]

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Small delay so entrance animation is always visible
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  const fade = () =>
    `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-fire-black">

      {/* ── Gradient background layers ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(230,57,70,0.38)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,rgba(244,162,97,0.22)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(249,199,79,0.10)_0%,transparent_45%)]" />

      {/* ── Ember particles ── */}
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="animate-ember pointer-events-none absolute bottom-0 rounded-full opacity-0"
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            backgroundColor: e.color,
            animationDuration: e.dur,
            animationDelay: e.delay,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center md:py-32">

        {/* Logo */}
        <div
          className={`mb-10 ${fade()}`}
          style={{ transitionDelay: '0ms' }}
        >
          <div className="relative mx-auto h-40 w-40 md:h-56 md:w-56">
            <div className="absolute inset-0 rounded-full bg-fire-orange/25 blur-2xl animate-pulse-slow" />
            <Image
              src="/logos/FIRELOGO_NOYEAR.png"
              alt="FIRE — Florida Intensive Rope Events"
              fill
              priority
              className="relative z-10 object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Eyebrow */}
        <p
          className={`mb-4 text-base font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-lg ${fade()}`}
          style={{ transitionDelay: '100ms' }}
        >
          Florida Intensive Rope Events
        </p>

        {/* Title */}
        <h1
          className={`mb-6 bg-gradient-to-br from-white via-fire-yellow to-fire-red bg-clip-text text-6xl font-black leading-none tracking-tight text-transparent sm:text-7xl lg:text-8xl ${fade()}`}
          style={{ transitionDelay: '200ms' }}
        >
          FIRE Orlando
        </h1>

        {/* Subtitle */}
        <p
          className={`mb-12 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl ${fade()}`}
          style={{ transitionDelay: '300ms' }}
        >
          Three annual rope bondage education events — from{' '}
          <strong className="text-fire-orange font-semibold">beginner</strong> to{' '}
          <strong className="text-fire-orange font-semibold">advanced</strong> — held in
          Orlando, FL.
        </p>

        {/* Countdown */}
        <div
          className={`mb-10 ${fade()}`}
          style={{ transitionDelay: '400ms' }}
        >
          <p
            className="mb-4 text-3xl font-black tracking-tight md:text-4xl"
            style={{
              background: 'linear-gradient(135deg, #f9c74f, #f4a261)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(244,162,97,0.65))',
            }}
          >
            ⚡ BLAZE 2026 begins in
          </p>
          <Countdown />
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col gap-4 sm:flex-row sm:justify-center ${fade()}`}
          style={{ transitionDelay: '500ms' }}
        >
          <a
            href={TICKET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-fire-red to-fire-orange px-8 py-4 text-base font-bold text-white shadow-lg shadow-fire-red/40 transition-all duration-300 hover:scale-105 hover:shadow-fire-orange/50 active:scale-100 md:px-10 md:py-5 md:text-lg"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-fire-orange to-fire-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10">🎟 Get Tickets — BLAZE 2026 →</span>
          </a>

          <Link
            href="/#events"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 md:px-10 md:py-5 md:text-lg"
          >
            Explore All Events
          </Link>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${fade()}`}
        style={{ transitionDelay: '700ms' }}
      >
        <div className="flex animate-bounce-slow flex-col items-center gap-1">
          <span className="text-xs uppercase tracking-widest text-white/35">Scroll</span>
          <ChevronDown className="h-5 w-5 text-fire-orange/60" />
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-fire-black to-transparent" />
    </section>
  )
}
```

- [ ] **Run the dev server and open `http://localhost:3000`**

```bash
npm run dev
```

Verify:
- Hero fills full viewport height
- Logo visible with orange glow
- "Florida Intensive Rope Events" eyebrow above title
- "FIRE Orlando" title in fire gradient
- "⚡ BLAZE 2026 begins in" is large and prominently styled in orange/yellow gradient
- Countdown shows 4 units (days/hours/min/sec) ticking
- Two CTA buttons visible; "Get Tickets" has fire gradient background
- Floating ember particles rising from bottom
- Scroll indicator at bottom
- Entrance animation runs on page load

- [ ] **Commit**

```bash
git add components/home/Hero.tsx components/home/Countdown.tsx
git commit -m "feat: rewrite Hero with cinematic countdown, ember particles, and BLAZE ticket CTA"
```

---

## Chunk 4: Event Cards Rewrite

### Task 5: Rewrite `components/home/EventCards.tsx`

**Files:**
- Modify: `components/home/EventCards.tsx`

Design specs:
- BLAZE card: `featured` variant — fire-red border glow, "🔥 NEXT EVENT" banner pill at top, "Get Tickets →" button (external link to forbiddentickets.com)
- FLARE + FIRE cards: standard styling, "Learn More →" button (internal link)
- All cards: event logo image, date with calendar icon, skill-level badge (yellow=beginner, orange=intermediate, red=all)
- Hover: card lifts, border brightens, logo scales
- Staggered entrance animation on mount

- [ ] **Replace the full contents of `components/home/EventCards.tsx` with:**

```tsx
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

const EVENTS: EventConfig[] = [
  {
    id: 'blaze',
    name: 'BLAZE',
    year: 2026,
    logo: '/logos/blaze-2026.png',
    dates: 'April 17–19, 2026',
    focus: 'Beginner to Intermediate',
    focusVariant: 'beginner',
    internalLink: '/events/blaze-2026',
    ticketUrl: 'https://forbiddentickets.com/events/blaze-2026',
    featured: true,
  },
  {
    id: 'flare',
    name: 'FLARE',
    year: 2026,
    logo: '/logos/flare-2026.png',
    dates: 'August 2026',
    focus: 'Intermediate to Advanced',
    focusVariant: 'intermediate',
    internalLink: '/events/flare-2026',
  },
  {
    id: 'fire',
    name: 'FIRE',
    year: 2027,
    logo: '/logos/FIRELOGO_NOYEAR.png',
    dates: 'February 2027',
    focus: 'All Levels',
    focusVariant: 'all',
    internalLink: '/events/fire-2027',
  },
]

const focusBadgeClasses: Record<EventConfig['focusVariant'], string> = {
  beginner:     'bg-fire-yellow/15 text-fire-yellow border-fire-yellow/30',
  intermediate: 'bg-fire-orange/15 text-fire-orange border-fire-orange/30',
  all:          'bg-fire-red/15    text-red-400     border-fire-red/30',
}

export default function EventCards() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {EVENTS.map((event, i) => (
        <div
          key={event.id}
          className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
            event.featured
              ? 'border-fire-red/40 shadow-lg shadow-fire-red/10 hover:border-fire-orange/60 hover:shadow-fire-orange/20'
              : 'border-white/8 hover:border-fire-orange/40 hover:shadow-fire-orange/10'
          } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: `${i * 120}ms` }}
        >
          {/* Featured banner */}
          {event.featured && (
            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-lg bg-gradient-to-r from-fire-red to-fire-orange px-4 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-md">
              🔥 Next Event
            </div>
          )}

          {/* Logo area */}
          <div
            className={`relative flex aspect-video w-full items-center justify-center overflow-hidden border-b border-white/[0.06] ${
              event.featured
                ? 'bg-gradient-to-br from-fire-red/10 to-fire-orange/8'
                : 'bg-fire-dark/60'
            }`}
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-fire-orange/10 blur-2xl" />
              <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-fire-red/10 blur-2xl" />
            </div>
            <div className={`relative z-10 transition-transform duration-500 group-hover:scale-110 ${event.featured ? 'mt-4' : ''}`}>
              <Image
                src={event.logo}
                alt={`${event.name} ${event.year} logo`}
                width={220}
                height={220}
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Card body */}
          <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
            <div>
              <h3 className="mb-2 text-2xl font-extrabold text-white transition-colors duration-300 group-hover:text-fire-orange md:text-3xl">
                {event.name} {event.year}
              </h3>
              <div className="mb-3 flex items-center gap-2 text-fire-orange">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-semibold">{event.dates}</span>
              </div>
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${focusBadgeClasses[event.focusVariant]}`}
              >
                {event.focus}
              </span>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-2">
              {event.ticketUrl ? (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-fire-red to-fire-orange py-3.5 text-sm font-bold text-white shadow-md shadow-fire-red/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-fire-orange/40 active:scale-100"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-fire-orange to-fire-yellow opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                  <span className="relative z-10">🎟 Get Tickets →</span>
                </a>
              ) : (
                <Link
                  href={event.internalLink}
                  className="group/btn relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-transparent py-3.5 text-sm font-bold text-white/80 transition-all duration-300 hover:border-fire-orange/40 hover:bg-fire-orange/5 hover:text-white active:scale-100"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
```

- [ ] **Open `http://localhost:3000` and scroll to the Events section**

Verify:
- BLAZE card has "🔥 Next Event" banner, fire-red border glow, "Get Tickets" gradient button
- FLARE and FIRE cards have "Learn More →" outline buttons
- Skill-level badges are correctly colored (yellow/orange/red)
- Cards animate in on page load with stagger
- Hover lifts the card and brightens border

- [ ] **Commit**

```bash
git add components/home/EventCards.tsx
git commit -m "feat: rewrite EventCards with featured BLAZE (ticket CTA) and standard FLARE/FIRE cards"
```

---

## Chunk 5: Page Layout Update

### Task 6: Update `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

Changes:
- Add `id="events"` to the Our Events section (so "Explore All Events" anchor in Hero works)
- Remove the entire "Upcoming Highlight" section (redundant now that Hero has the countdown)
- Add a closing "Ready to Ignite?" footer CTA section with a ticket button and "View Event Details" link

- [ ] **Replace the full contents of `app/page.tsx` with:**

```tsx
import Link from 'next/link'
import Hero from '@/components/home/Hero'
import EventCards from '@/components/home/EventCards'
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
    url: 'https://fireorlando.com',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-fire-black">

      {/* ── Hero ── */}
      <Hero />

      {/* ── Our Events ── */}
      <section id="events" className="relative overflow-hidden bg-fire-charcoal py-24 md:py-32">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-fire-orange/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-fire-red/5 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mb-16 text-center md:mb-20">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fire-orange/30 bg-fire-orange/10 px-4 py-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fire-orange" />
              <span className="text-xs font-bold uppercase tracking-widest text-fire-orange">
                Annual Events
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              <span className="gradient-fire-text">Our Events</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
              Three unique events each year, each designed to serve different experience levels
              and learning goals in the rope bondage community.
            </p>
          </div>
          <EventCards />
        </div>
      </section>

      {/* ── About FIRE ── */}
      <section className="relative overflow-hidden bg-fire-black py-24 md:py-32">
        {/* Dot grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '44px 44px',
          }}
        />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

              {/* Left — Feature blocks */}
              <div className="space-y-5">
                {[
                  {
                    icon: '📚',
                    gradient: 'from-fire-red/20 to-fire-orange/10',
                    border: 'border-fire-red/20',
                    title: 'Education First',
                    desc: 'Intensive workshops led by experienced practitioners — covering technique, safety, and artistry at every level.',
                  },
                  {
                    icon: '🤝',
                    gradient: 'from-fire-orange/20 to-fire-yellow/10',
                    border: 'border-fire-orange/20',
                    title: 'Community Driven',
                    desc: 'Meaningful connections with practitioners from across the country in a safe, inclusive environment.',
                  },
                  {
                    icon: '🎨',
                    gradient: 'from-fire-yellow/20 to-fire-orange/10',
                    border: 'border-fire-yellow/20',
                    title: 'Artistic Expression',
                    desc: 'Space to explore rope as an art form — from foundational floor work to advanced suspension and performance.',
                  },
                ].map(({ icon, gradient, border, title, desc }) => (
                  <div
                    key={title}
                    className={`flex gap-4 rounded-2xl border ${border} bg-gradient-to-br ${gradient} p-5 backdrop-blur-sm`}
                  >
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${border} bg-fire-black/40 text-2xl`}>
                      {icon}
                    </div>
                    <div>
                      <h4 className="mb-1 text-base font-bold text-white">{title}</h4>
                      <p className="text-sm leading-relaxed text-gray-400">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right — Content */}
              <div className="text-center lg:text-left">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fire-orange/30 bg-fire-orange/10 px-4 py-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fire-orange" />
                  <span className="text-xs font-bold uppercase tracking-widest text-fire-orange">
                    Who We Are
                  </span>
                </div>
                <h2 className="mb-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
                  About FIRE
                </h2>
                <div className="mb-8 space-y-5">
                  <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
                    FIRE (Florida Intensive Rope Events) is a community-driven organization
                    dedicated to advancing rope bondage education in a safe, inclusive, and
                    supportive environment.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
                    Based in Orlando, Florida, we host three annual events that cater to
                    different skill levels and learning objectives, ensuring that everyone from
                    curious beginners to seasoned experts can find their place in our community.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-xl border border-fire-orange/30 bg-fire-orange/10 px-8 py-4 text-base font-bold text-fire-orange transition-all duration-300 hover:bg-fire-orange/20 hover:shadow-lg hover:shadow-fire-orange/20"
                >
                  Learn More About FIRE
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="relative overflow-hidden bg-fire-charcoal py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fire-charcoal via-fire-dark to-fire-charcoal" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(230,57,70,0.18)_0%,transparent_60%)]" />
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-fire-orange/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fire-orange/30 bg-fire-orange/10 px-4 py-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fire-orange" />
            <span className="text-xs font-bold uppercase tracking-widest text-fire-orange">
              Join Us
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Ready to{' '}
            <span className="gradient-fire-text">Ignite</span>{' '}
            Your Journey?
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-gray-400">
            Tickets for BLAZE 2026 are on sale now. Beginner-friendly, community-focused,
            and unforgettable.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://forbiddentickets.com/events/blaze-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-fire-red to-fire-orange px-10 py-4 text-base font-bold text-white shadow-lg shadow-fire-red/30 transition-all duration-300 hover:scale-105 hover:shadow-fire-orange/40 active:scale-100 md:text-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-fire-orange to-fire-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10">🎟 Get Tickets</span>
            </a>
            <Link
              href="/events/blaze-2026"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent px-10 py-4 text-base font-semibold text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/5 md:text-lg"
            >
              View Event Details
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
```

- [ ] **Open `http://localhost:3000` and scroll the full page**

Verify:
- Hero → Events → About → Footer CTA sections flow correctly
- "Explore All Events" CTA in hero scrolls to the `#events` section
- "Upcoming Highlight" section is gone
- Footer CTA "Ready to Ignite?" section is visible at bottom with two buttons
- Dot-grid pattern visible in About background
- Feature blocks (Education/Community/Artistic) have correct icon + gradient styling

- [ ] **Commit**

```bash
git add app/page.tsx
git commit -m "feat: update homepage layout — remove Upcoming Highlight, add Footer CTA section"
```

---

## Chunk 6: Header Nav CTA

### Task 7: Update `components/layout/Header.tsx`

**Files:**
- Modify: `components/layout/Header.tsx`

Add a "Get Tickets" CTA button to the right side of the desktop nav and to the bottom of the mobile drawer. Links to `https://forbiddentickets.com/events/blaze-2026`. Uses fire-red background with hover to fire-orange.

- [ ] **In the desktop nav, add the CTA button after the `</nav>` closing tag and before the mobile `<Sheet>` component:**

Find this block:
```tsx
        </nav>

        {/* Mobile Menu Button */}
        <Sheet
```

Replace with:
```tsx
        </nav>

        {/* Desktop Ticket CTA */}
        <a
          href="https://forbiddentickets.com/events/blaze-2026"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-lg bg-fire-red px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:bg-fire-orange hover:shadow-md hover:shadow-fire-orange/30 active:scale-95"
        >
          🎟 Get Tickets
        </a>

        {/* Mobile Menu Button */}
        <Sheet
```

- [ ] **In the mobile drawer, add the ticket CTA at the bottom of the `flex flex-col gap-6` div, after the Events section:**

Find the closing of the mobile events block:
```tsx
              </div>
            </div>
          </SheetContent>
```

Replace with:
```tsx
              </div>

              {/* Mobile Ticket CTA */}
              <a
                href="https://forbiddentickets.com/events/blaze-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fire-red to-fire-orange px-6 py-4 text-base font-bold text-white shadow-md shadow-fire-red/30 transition-all duration-200 hover:shadow-fire-orange/40 active:scale-95"
              >
                🎟 Get Tickets — BLAZE 2026
              </a>
            </div>
          </SheetContent>
```

- [ ] **Verify the header on desktop and mobile**

Resize browser to verify:
- Desktop (≥768px): "Get Tickets" button visible to the right of the nav links
- Mobile (<768px): Hamburger menu opens, scroll to bottom of drawer, "Get Tickets — BLAZE 2026" button is visible

- [ ] **Commit**

```bash
git add components/layout/Header.tsx
git commit -m "feat: add Get Tickets CTA to desktop nav and mobile drawer in Header"
```

---

## Chunk 7: Final Verification

### Task 8: Full page review and build check

- [ ] **Run a production build to catch any TypeScript or render errors**

```bash
npm run build
```

Expected: Build completes with no errors. Warnings about `img` vs `Image` are OK; errors are not.

- [ ] **Run through the full page checklist in the browser at `http://localhost:3000`:**

| Check | Expected |
|-------|----------|
| Hero fills viewport | ✓ |
| Logo glows + embers float | ✓ |
| "Florida Intensive Rope Events" eyebrow visible | ✓ |
| "BLAZE 2026 begins in" is large + fire gradient | ✓ |
| Countdown ticks every second | ✓ |
| "Get Tickets — BLAZE 2026" in hero links to forbiddentickets | ✓ |
| "Explore All Events" scrolls to #events | ✓ |
| BLAZE card has "🔥 Next Event" banner | ✓ |
| BLAZE card "Get Tickets" links to forbiddentickets | ✓ |
| FLARE + FIRE have "Learn More" → internal links | ✓ |
| About section has feature blocks + org story | ✓ |
| Footer "Ready to Ignite?" section present | ✓ |
| Nav "Get Tickets" button visible desktop | ✓ |
| Mobile drawer has "Get Tickets" button | ✓ |
| No purple anywhere on the page | ✓ |
| Mobile layout stacks correctly (test at 375px width) | ✓ |

- [ ] **Final commit if any minor fixes were needed**

```bash
git add -A
git commit -m "fix: final polish and verification of homepage redesign"
```

---

## Branch Summary

All changes are on `ui/frontend`. To merge when ready:

```bash
git checkout main
git merge ui/frontend
# or open a PR on GitHub
```
