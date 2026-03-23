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
          <strong className="font-semibold text-fire-orange">beginner</strong> to{' '}
          <strong className="font-semibold text-fire-orange">advanced</strong> — held in
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
