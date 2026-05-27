# FLARE 2026 Features Design

**Date:** 2026-05-27
**Scope:** Three independent features targeting FLARE 2026 (and usable by all future events)

---

## Feature 1: Per-Event Sponsors Page

### Goal
Give each event its own sponsors page at `/events/[event]/sponsors/` displaying tiered sponsors with logos, names, and links. Replaces the all-placeholder global `/sponsors` page with real per-event data.

### Content Schema
Each event gets a `content/[event]/sponsors.json` file:

```json
{
  "sponsors": [
    {
      "tier": "gold",
      "name": "Twisted Fibers Co.",
      "logo": "/images/sponsors/twisted-fibers.png",
      "url": "https://example.com",
      "tagline": "Premium jute rope for the discerning rigger"
    },
    {
      "tier": "community",
      "name": "Local Rope Club",
      "logo": "/images/sponsors/local-rope-club.png",
      "url": "https://example.com"
    }
  ]
}
```

**Tiers:** `gold` | `silver` | `bronze` | `community`
- Gold, Silver, Bronze: `name` + `logo` + `url` + `tagline` (short, one-line)
- Community: `name` + `logo` + `url` only (no tagline)

Logos live in `public/images/sponsors/`. If a tier has no sponsors, it is omitted from the page.

### Page Layout (`/events/[event]/sponsors/`)
- Breadcrumb: Home / [Event] / Sponsors
- Page heading: "Sponsors & Vendors" + "Thank you to everyone who makes [Event] [Year] possible."
- Four tier sections, each with a decorative divider line and tier label
- Grid columns by tier (responsive, collapses to fewer columns on mobile):
  - **Gold** — 2 columns. Card: logo (large), name, tagline, "Visit →" link in gold
  - **Silver** — 3 columns. Card: logo (medium), name, tagline, "Visit →" link in silver
  - **Bronze** — 4 columns. Card: logo (small), name, tagline, "Visit →" link in bronze
  - **Community** — 5 columns. Card: logo (smallest), name, "Visit →" link in red. No tagline.
- Tier accent colors: Gold `#f9c74f`, Silver `#cccccc`, Bronze `#cd7f32`, Community `#e63946`
- If `sponsors.json` is absent or empty, page shows "Sponsors will be announced soon."

### Navigation Integration
- Add a "Sponsors" navigation card to the event landing page grid (alongside Schedule, Presenters, Classes, Venue). The card always appears — the page itself handles the empty state ("Sponsors will be announced soon.")
- Add "Sponsors" to the site header's event sub-navigation where applicable

### Global `/sponsors` Page
Unchanged. Remains a "become a sponsor" landing page. Can optionally link down to per-event pages in a future pass.

### New Files
- `content/[event]/sponsors.json` (one per event)
- `app/events/[event]/sponsors/page.tsx` (one per event, same pattern as other sub-pages)
- `components/events/SponsorGrid.tsx` (shared component used by all event sponsor pages)
- `lib/content.ts` — add `getSponsors(eventSlug)` loader

### Mobile Behavior
Grid columns collapse: Gold 1-col, Silver 2-col, Bronze 2-col, Community 3-col on small screens.

---

## Feature 2: Schedule Favorites (Local Storage)

### Goal
Let attendees star individual classes on the schedule to build a personal "My Schedule" view. No account, no install — works in any browser via `localStorage`.

### User Experience
- Each class row in the schedule grid shows a star icon (☆ / ★) on the left
- Tapping/clicking the star toggles it between filled (saved) and empty (unsaved)
- Starred state persists in `localStorage` under the key `fire-favorites-[eventSlug]` as an array of class slugs
- A "My Schedule" tab appears alongside the day tabs (Friday / Saturday / Sunday / **★ My Schedule [n]**)
  - The count badge shows total starred classes across all days
  - The My Schedule view shows all starred classes from all days, grouped by day label and sorted chronologically
  - If nothing is starred, the tab shows: a star icon + "Tap ☆ on any class to add it here."
- General schedule items (type: `"general"`, no slug) are not starrable — no star icon rendered

### Storage Key
`fire-favorites-flare-2026` (pattern: `fire-favorites-[eventSlug]`)
Each event's favorites are stored independently.

### Implementation Notes
- `ScheduleGrid` is already a `'use client'` component — no architectural change needed
- Extract a `useFavorites(eventSlug)` hook: reads/writes `localStorage`, returns `[favorites, toggle]`
- Guard `localStorage` access for SSR safety: `typeof window !== 'undefined'`
- Star icon: use `lucide-react` `Star`. Filled state: `fill-fire-orange text-fire-orange`. Unfilled state: `text-gray-600` (outline only, no fill)

### New Files / Changed Files
- `hooks/useFavorites.ts` — new hook
- `components/events/ScheduleGrid.tsx` — add star toggle per class row + My Schedule tab

---

## Feature 3: Feedback Link Visibility

### Goal
Make event feedback and class feedback links impossible to miss. Currently both are easy to overlook (small pill in class meta row, muted secondary button at bottom of event CTA).

### Event Page (`/events/[event]/page.tsx`)
Replace the muted secondary button at the bottom with a prominent banner placed **directly below the breadcrumb**, before the hero section. Only renders when `event.feedbackUrl` is set.

**Banner markup pattern:**
```
[📋 icon]  How was [Event Name] [Year]?
           Share your experience and help us improve future events.
                                              [Give Feedback →]  (orange button)
```
- Background: `bg-fire-orange/10`, bottom border `border-fire-orange`
- "Give Feedback →" button: solid orange (`bg-fire-orange text-black font-bold`)

### Class Page (`/events/[event]/classes/[slug]/page.tsx`)
Remove the small pill from the meta row. Add a feedback card **below the class description**, above any navigation links. Only renders when `classItem.feedbackUrl` is set.

**Card markup pattern:**
```
[📝 icon]  Enjoyed this class?
           Your feedback goes directly to the presenter and helps them improve.
                                                 [Leave Feedback →]  (orange button)
```
- Background: `bg-fire-orange/10`, border `border-fire-orange/40`

### Schedule Page (`/events/[event]/schedule/page.tsx`)
Add both feedback links to the "Schedule Notes" box at the bottom of the page:
- `📋 Class Feedback` — links to a Google Form or similar (sourced from `event.classFeedbackUrl`)
- `🎪 Event Feedback` — links to `event.feedbackUrl`
Both only render when the respective URL is set.

### Content Changes
`event.json` gains two optional fields (already has `feedbackUrl`):
```json
{
  "feedbackUrl": "https://...",
  "classFeedbackUrl": "https://..."
}
```
`classFeedbackUrl` is used on the schedule page as a general "feedback for any class" link (e.g. a single Google Form). Individual class markdown files keep their own `feedbackUrl` for class-specific forms.

---

## Applies To
All three features should be implemented for FLARE 2026 first, then BLAZE 2026 (retroactively for feedback) and future events follow the same patterns.

## Out of Scope
- No changes to the global `/sponsors` page content
- No cross-device favorites sync
- No PWA / service worker
- No feedback form hosting (links point to external URLs — Google Forms, Typeform, etc.)
