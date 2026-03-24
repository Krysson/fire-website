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
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(getTimeLeft())
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const isPast = timeLeft !== null && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  if (timeLeft === null) {
    return (
      <div className="inline-flex overflow-hidden rounded-2xl border border-fire-orange/25 bg-white/[0.04] backdrop-blur-md">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i, arr) => (
          <div key={label} className={`flex flex-col items-center px-5 py-4 sm:px-7 sm:py-5 ${i < arr.length - 1 ? 'border-r border-fire-orange/15' : ''}`}>
            <span className="text-3xl font-black leading-none text-fire-orange sm:text-4xl">--</span>
            <span className="mt-1 text-[9px] uppercase tracking-widest text-white/40">{label}</span>
          </div>
        ))}
      </div>
    )
  }

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
          <span className="text-3xl font-black leading-none text-fire-orange sm:text-4xl">
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
