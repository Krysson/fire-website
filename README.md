# FIRE Orlando — Website

This is the website for **FIRE (Florida Intensive Rope Events)**, a rope bondage education organization in Orlando, FL. It hosts information for three annual events: **BLAZE**, **FLARE**, and **FIRE**.

The site is built with Next.js and deployed automatically to [fireorlando.com](https://fireorlando.com) via Vercel whenever changes are pushed to the `main` branch on GitHub.

---

## For Content Editors (No Coding Required)

You do not need to run the site locally to make content updates. All content lives in plain text files inside the `content/` folder. You can edit them directly on GitHub or in any text editor.

After saving and committing your changes, the site will automatically rebuild and go live within a few minutes.

---

## Quick Reference — What Do You Want to Change?

Use this table to find the right file immediately. Everything below it explains each file in detail.

| I want to change... | Edit this file |
|---|---|
| Contact emails | `content/organization/config.json` |
| Social media links | `content/organization/config.json` |
| Homepage event cards (dates, focus badge, ticket button) | `content/organization/config.json` |
| Which event shows the "Next Event" banner | `content/organization/config.json` |
| Event landing page (dates, venue, tagline, countdown, ticket link) | `content/[event]/event.json` |
| Event schedule | `content/[event]/schedule.json` |
| A presenter's bio, photo, or social links | `content/[event]/presenters/[presenter-name].md` |
| A class description, level, or duration | `content/[event]/classes/[class-name].md` |
| The About page | `content/organization/about.md` |
| The FAQ page | `content/organization/faq.md` |

> **Note on dates:** Event dates appear in **two places** — once on the homepage card and once on the event landing page. They are stored separately, so if you update dates you need to update both files: `config.json` (homepage card) and `event.json` (landing page).

---

## How Content Is Organized

There are two layers of content on this site:

### Layer 1 — Site-Wide Settings (`content/organization/config.json`)

This file controls things that apply across the whole site and are not specific to one event:

- Contact email addresses
- Social media links
- The homepage event cards (the three tiles on the front page)
- Class level badge colors

**This is the only file you need to touch for those things.** No code changes required.

### Layer 2 — Per-Event Content (`content/[event]/`)

Each event (BLAZE, FLARE, FIRE) has its own folder with its own files:

| File | Controls |
|---|---|
| `event.json` | Event name, dates, tagline, venue, ticket link |
| `schedule.json` | The full schedule for that event |
| `presenters/` | One `.md` file per presenter |
| `classes/` | One `.md` file per class |

These files are completely independent from each other and from `config.json`. Editing BLAZE's files will not affect FLARE or FIRE.

---

## File Structure

```
content/
├── organization/
│   ├── config.json         ← Site-wide: emails, social links, homepage cards
│   ├── about.md            ← About page content
│   ├── faq.md              ← FAQ page content
│   └── policies.md         ← Policies content
├── blaze-2026/
│   ├── event.json          ← BLAZE landing page: dates, venue, tickets, tagline
│   ├── schedule.json       ← BLAZE schedule
│   ├── presenters/         ← One .md file per BLAZE presenter
│   └── classes/            ← One .md file per BLAZE class
├── flare-2026/
│   └── (same structure as blaze-2026)
└── fire-2027/
    └── (same structure as blaze-2026)

public/
└── images/
    └── presenters/         ← Presenter photos go here
```

---

## Updating Site-Wide Settings (`config.json`)

File: `content/organization/config.json`

### Contact Emails

```json
"contact": {
  "general": "eventinfo@fireorlando.com",
  "presenters": "Presenters@fireorlando.com",
  "volunteers": "Volunteers@fireorlando.com",
  "vendors": "Vendors@fireorlando.com"
}
```

Change the value to the right of the colon. The footer and contact page read directly from this file.

### Social Media Links

```json
"social": {
  "fetlife": "https://fetlife.com/F_I_R_E",
  "instagram": "https://www.instagram.com/woodshedorlando/",
  "facebook": "",
  "tiktok": ""
}
```

Leave a value blank (`""`) to hide that platform's icon/link on the site.

### Homepage Event Cards

```json
"homepage": {
  "featuredEventId": "blaze",
  "events": [
    {
      "id": "blaze",
      "name": "BLAZE",
      "year": 2026,
      "logo": "/logos/blaze-2026.png",
      "dates": "April 17–19, 2026",
      "focus": "Beginner to Intermediate",
      "focusVariant": "beginner",
      "internalLink": "/events/blaze-2026",
      "ticketEventSlug": "blaze-2026"
    }
  ]
}
```

Fields to update:
- `dates` — the date text shown on the homepage card
- `focus` — the level label shown on the badge
- `focusVariant` — controls badge color: `beginner` (green), `intermediate` (amber), or `all` (yellow)
- `featuredEventId` — set to the `id` of whichever event should show the "Next Event" banner
- `ticketEventSlug` — the slug used to build the ticket link; leave blank (`""`) if tickets aren't on sale yet

> Remember: these dates only update the **homepage card**. Also update `content/[event]/event.json` to update the event landing page.

---

## Updating an Event Landing Page (`event.json`)

File: `content/[event]/event.json` — for example `content/blaze-2026/event.json`

```json
{
  "name": "BLAZE",
  "year": 2026,
  "tagline": "Ignite Your Rope Journey",
  "description": "A short paragraph about the event...",
  "dates": {
    "display": "April 17–19, 2026",
    "start": "2026-04-17",
    "end": "2026-04-19"
  },
  "focus": "Beginner to Intermediate",
  "venue": {
    "name": "The Woodshed",
    "address": "6431 Milner Blvd Suite #4, Orlando, FL 32809"
  },
  "tickets": {
    "url": "https://forbiddentickets.com/events/blaze-2026",
    "onSaleDate": "February 14, 2026"
  }
}
```

Fields to update most often:

- `dates.display` — the human-readable date range shown on the event landing page
- `dates.start` / `dates.end` — ISO format dates (YYYY-MM-DD) used by the countdown timer
- `tickets.url` — the full Forbidden Tickets link for this event
- `tickets.onSaleDate` — shown on the site before tickets go on sale
- `tagline` — the short phrase shown in the event hero
- `venue` — update if the venue changes

> Remember: these dates only update the **event landing page**. Also update `content/organization/config.json` to update the homepage card.

---

## Managing Presenters

### Adding a New Presenter

1. Create a new file in `content/[event]/presenters/` named after the presenter's slug (URL-friendly name), e.g. `jane-doe.md`
2. Add a photo to `public/images/presenters/` — name it to match (e.g. `jane-doe.jpg`)
3. Fill out the file using the format below

### Presenter File Format

```markdown
---
name: Jane Doe
slug: jane-doe
pronouns: she/her
photo: /images/presenters/jane-doe.jpg
social:
  fetlife: https://fetlife.com/users/123456
  instagram: https://instagram.com/janedoeropes
social_labels:
  fetlife: JaneDoe
  instagram: "@janedoeropes"
featured: true
---

Jane's bio goes here. Write it in plain paragraphs.

She has been tying since 2018 and focuses on floor work and partner connection.
```

### Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Display name shown on the site |
| `slug` | Yes | URL identifier — lowercase, hyphens only, no spaces. Must be unique per event. |
| `pronouns` | No | Single string like `she/her` or a list (see below) |
| `photo` | No | Path to photo in `/public/images/presenters/` |
| `social` | No | Social media links (see below) |
| `social_labels` | No | Custom button text for each social link |
| `featured` | No | Set to `true` to highlight on the event landing page |

### Multiple Pronouns
```yaml
pronouns:
  - 'she/her'
  - 'they/them'
```

### Multiple Social Links (same platform)
If a presenter has two FetLife profiles:
```yaml
social:
  fetlife:
    - https://fetlife.com/users/111111
    - https://fetlife.com/users/222222
social_labels:
  fetlife:
    - Jane (personal)
    - Jane (performance)
```
Without `social_labels`, the buttons would read "FetLife 1" and "FetLife 2". With labels, they read whatever you put.

### Editing an Existing Presenter

Open their `.md` file and change any field. The `slug` is used in the URL — **do not change a slug after the event is live** or any existing links to that presenter will break.

### Removing a Presenter

Delete their `.md` file from the `presenters/` folder.

---

## Managing Classes

### Adding a New Class

Create a new `.md` file in `content/[event]/classes/`, e.g. `floor-work-basics.md`

### Class File Format

```markdown
---
title: Floor Work Basics
slug: floor-work-basics
presenter: jane-doe
level: Beginner
duration: 90 minutes
---

Class description goes here. Describe what students will learn, prerequisites, and what to bring.
```

### Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Full class title shown on the site |
| `slug` | Yes | URL identifier — lowercase, hyphens only |
| `presenter` | Yes | The presenter's `slug` value (must match exactly) |
| `level` | Yes | One of: `Beginner`, `Intermediate`, `Advanced`, `All Levels` |
| `duration` | No | e.g. `90 minutes`, `2 hours` |

### Classes with Multiple Presenters (co-taught)

```yaml
presenter:
  - jane-doe
  - john-smith
```

Both slugs must match existing presenter files for their profile links to work.

### Level Badge Colors

The class cards show a colored badge based on the `level` field:
- `Beginner` → green
- `Intermediate` → amber/orange
- `Advanced` → red
- `All Levels` (or anything else) → yellow

The matching is case-insensitive, so `beginner`, `Beginner`, and `BEGINNER` all work.

---

## Managing the Schedule

File: `content/[event]/schedule.json`

```json
{
  "days": [
    {
      "date": "2026-04-17",
      "label": "Friday",
      "slots": [
        {
          "time": "7:00 PM",
          "title": "Registration Opens",
          "type": "general"
        },
        {
          "time": "8:00 PM",
          "title": "Floor Work Basics",
          "presenter": "jane-doe",
          "room": "Main Room",
          "type": "class"
        }
      ]
    }
  ]
}
```

### Slot Types

Each slot has a `type` that controls how it looks on the schedule (border color and badge label):

| `type` value | Appearance | Badge |
|---|---|---|
| `"class"` | Orange border | Orange "Class" badge |
| `"social"` | Yellow border | Yellow "Social" badge |
| `"discussion"` | Blue border | Blue "Discussion" badge |
| `"break"` | Dark border | Gray "Break" badge |
| `"general"` | Dark border | No badge |

To add a new type (e.g. `"workshop"` with its own color and badge), a developer needs to edit the `getTypeStyles` and `getTypeBadge` functions in `components/events/ScheduleGrid.tsx`.

### Tips
- The `presenter` field in schedule slots is optional — only add it for class slots
- Times are display-only strings — they won't sort automatically, so list slots in order
- `room` is optional — shows where in the venue the class takes place

---

## Adding Presenter Photos

1. Prepare the photo: square crop works best, at least 400×400px, JPG or PNG
2. Save it to `public/images/presenters/` — name it to match the presenter's slug (e.g. `jane-doe.jpg`)
3. In the presenter's `.md` file, set: `photo: /images/presenters/jane-doe.jpg`

If no photo is set, the site shows a silhouette placeholder automatically.

---

## Navigating Between Events

The site has three events, each with their own section:

| Event | URL | Content folder |
|-------|-----|----------------|
| BLAZE 2026 | `/events/blaze-2026` | `content/blaze-2026/` |
| FLARE 2026 | `/events/flare-2026` | `content/flare-2026/` |
| FIRE 2027 | `/events/fire-2027` | `content/fire-2027/` |

Each event has the same sub-pages:
- `/events/[event]` — landing page
- `/events/[event]/presenters` — presenter grid
- `/events/[event]/presenters/[slug]` — individual presenter profile
- `/events/[event]/classes` — class listings
- `/events/[event]/classes/[slug]` — individual class detail
- `/events/[event]/schedule` — event schedule
- `/events/[event]/venue` — venue information

---

## Deployment

The site deploys automatically. When you push changes to the `main` branch on GitHub:
1. Vercel detects the push
2. Rebuilds the site (usually takes 1–2 minutes)
3. The live site at [fireorlando.com](https://fireorlando.com) updates

You can check the status of the latest deployment in the Vercel dashboard.

---

## For Developers

### Tech Stack
- **Framework**: Next.js 14+ (App Router, static export)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Language**: TypeScript
- **Content**: Markdown + JSON files (parsed with gray-matter)
- **Hosting**: Vercel

### Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Key Files

| File | Purpose |
|------|---------|
| `content/organization/config.json` | Site-wide settings (emails, social, homepage cards) |
| `lib/content.ts` | All content loading functions |
| `lib/types.ts` | TypeScript interfaces for all data |
| `components/events/PresenterCard.tsx` | Presenter listing card |
| `components/events/ClassCard.tsx` | Class listing card |
| `components/layout/Header.tsx` | Site navigation |
| `app/globals.css` | Brand colors, animations |
| `tailwind.config.ts` | Tailwind color extensions |

### Brand Colors

```
fire-black:    #0a0a0a
fire-charcoal: #1a1a1a
fire-dark:     #2a2a2a
fire-red:      #e63946
fire-orange:   #f4a261
fire-yellow:   #f9c74f
```
