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
