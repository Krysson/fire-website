# CLAUDE.md - Instructions for Claude Code

## Project Context

This is the FIRE convention website - a static Next.js site for a rope bondage educational organization hosting three annual events in Orlando, FL.

**Key constraint:** Keep it simple. This is a static marketing/information site with no auth, no database, no payments.

---

## Tech Stack

```
Framework:    Next.js 14+ (App Router)
Styling:      Tailwind CSS
Components:   shadcn/ui
Language:     TypeScript
Content:      Markdown + JSON files
Hosting:      Vercel
```

---

## Project Structure

```
fire-website/
├── app/
│   ├── layout.tsx              # Root layout with nav/footer
│   ├── page.tsx                # Homepage
│   ├── about/page.tsx          # About FIRE org
│   ├── faq/page.tsx            # FAQ & Policies
│   ├── contact/page.tsx        # Contact info
│   ├── sponsors/page.tsx       # Sponsors & vendors
│   ├── past-events/page.tsx    # Archive (placeholder)
│   └── events/
│       ├── blaze-2026/
│       │   ├── page.tsx        # BLAZE landing
│       │   ├── schedule/page.tsx
│       │   ├── presenters/page.tsx
│       │   ├── presenters/[slug]/page.tsx
│       │   ├── classes/page.tsx
│       │   └── venue/page.tsx
│       ├── flare-2026/
│       │   └── ...
│       └── fire-2027/
│           └── ...
├── components/
│   ├── ui/                     # shadcn components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   └── EventCards.tsx
│   └── events/
│       ├── ScheduleGrid.tsx
│       ├── PresenterCard.tsx
│       ├── ClassCard.tsx
│       └── VenueMap.tsx
├── content/
│   ├── blaze-2026/
│   │   ├── event.json
│   │   ├── schedule.json
│   │   ├── presenters/
│   │   └── classes/
│   ├── flare-2026/
│   ├── fire-2027/
│   └── organization/
│       ├── about.md
│       ├── faq.md
│       └── policies.md
├── lib/
│   ├── content.ts              # Content loading utilities
│   └── utils.ts                # Helper functions
├── public/
│   ├── logos/
│   │   ├── blaze-2025.png      # Update year to 2026 when received
│   │   ├── fire-logo.png
│   │   └── flower-flat.png
│   └── images/
│       └── presenters/
└── styles/
    └── globals.css
```

---

## Coding Standards

### General
- Use TypeScript strict mode
- Prefer server components; use 'use client' only when needed
- Keep components small and focused
- Use descriptive variable names

### Styling
- Tailwind CSS for all styling
- Use CSS variables for brand colors (defined in globals.css)
- Mobile-first responsive design
- Consistent spacing using Tailwind scale

### Content
- Load markdown with gray-matter for frontmatter
- Parse markdown with remark/rehype
- Type all JSON content with interfaces

---

## Brand Colors (Tailwind Config)

```javascript
// tailwind.config.ts
colors: {
  fire: {
    black: '#0a0a0a',
    charcoal: '#1a1a1a',
    dark: '#2a2a2a',
    red: '#e63946',
    orange: '#f4a261',
    yellow: '#f9c74f',
  }
}
```

---

## Content File Formats

### event.json
```json
{
  "name": "BLAZE",
  "year": 2026,
  "tagline": "Ignite Your Rope Journey",
  "dates": "April 17-19, 2026",
  "focus": "Beginner to Intermediate",
  "venue": {
    "name": "The Woodshed",
    "address": "6431 Milner Blvd Suite #4, Orlando, FL 32809"
  },
  "ticketUrl": "https://forbiddentickets.com/events/blaze-2026",
  "ticketsOnSale": "February 14, 2026"
}
```

### schedule.json
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
          "title": "Intro to Floor Work",
          "presenter": "desmond-ellise",
          "room": "Main Room",
          "type": "class"
        }
      ]
    }
  ]
}
```

### Presenter Markdown
```markdown
---
name: Desmond & Ellise
slug: desmond-ellise
pronouns: he/him & she/her
photo: /images/presenters/desmond-ellise.jpg
social:
  fetlife: https://fetlife.com/users/8036439
---

Des and Ellise have both been practicing rope since 2018...
```

### Class Markdown
```markdown
---
title: Introduction to Floor Work
slug: intro-floor-work
presenter: desmond-ellise
level: Beginner
duration: 90 minutes
---

This class covers the fundamentals of floor-based rope bondage...
```

---

## Key Components

### Navigation
- Sticky header with logo
- Desktop: horizontal nav with event dropdown
- Mobile: hamburger menu with slide-out drawer
- Highlight current event based on route

### Event Landing Pages
- Hero with event logo and key info
- Quick stats (dates, focus, venue)
- Prominent ticket CTA button
- Links to schedule, presenters, classes, venue

### Schedule Display
- Tab or button group for day selection
- Time-based list or grid
- Click to view class details
- Mobile-friendly layout

### Presenter Cards
- Photo with fallback placeholder
- Name and pronouns
- Brief excerpt of bio
- Link to full profile

---

## External Links

All ticket purchases redirect to forbiddentickets.com:
```typescript
const TICKET_URLS = {
  'blaze-2026': 'https://forbiddentickets.com/events/blaze-2026',
  'flare-2026': 'https://forbiddentickets.com/events/flare-2026',
  'fire-2027': 'https://forbiddentickets.com/events/fire-2027'
}
```

---

## Environment Variables

```env
# .env.local (if needed)
NEXT_PUBLIC_SITE_URL=https://fireorlando.com
NEXT_PUBLIC_CONTACT_EMAIL=fireeventproducer@gmail.com
```

---

## Deployment

1. Push to GitHub main branch
2. Vercel auto-deploys from GitHub
3. Custom domain: fireorlando.com configured in Vercel

---

## Content Updates

To add/update content:

1. **New presenter:** Add markdown file to `/content/[event]/presenters/`
2. **New class:** Add markdown file to `/content/[event]/classes/`
3. **Update schedule:** Edit `/content/[event]/schedule.json`
4. **New images:** Add to `/public/images/`
5. Commit and push - Vercel rebuilds automatically

---

## Common Tasks

### Add a new presenter
```bash
# Create file: content/blaze-2026/presenters/new-presenter.md
# Add photo: public/images/presenters/new-presenter.jpg
# Update schedule.json if they're teaching
```

### Change ticket URL
```bash
# Edit: content/[event]/event.json
# Update "ticketUrl" field
```

### Update contact email
```bash
# Edit: .env.local or directly in components/Footer.tsx
# Search for: fireeventproducer@gmail.com
```