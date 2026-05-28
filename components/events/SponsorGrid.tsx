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
    logoWidth: 240,
    logoHeight: 160,
  },
  silver: {
    label: 'Silver',
    icon: '✦',
    accentColor: '#cccccc',
    borderClass: 'border-[#cccccc]/20 hover:border-[#cccccc]/50',
    visitClass: 'text-[#cccccc]',
    gridClass: 'grid-cols-2 sm:grid-cols-3',
    logoWidth: 176,
    logoHeight: 120,
  },
  bronze: {
    label: 'Bronze',
    icon: '✦',
    accentColor: '#cd7f32',
    borderClass: 'border-[#cd7f32]/20 hover:border-[#cd7f32]/50',
    visitClass: 'text-[#cd7f32]',
    gridClass: 'grid-cols-2 sm:grid-cols-4',
    logoWidth: 144,
    logoHeight: 96,
  },
  community: {
    label: 'Community',
    icon: '♥',
    accentColor: '#e63946',
    borderClass: 'border-[#e63946]/20 hover:border-[#e63946]/50',
    visitClass: 'text-[#e63946]',
    gridClass: 'grid-cols-3 sm:grid-cols-5',
    logoWidth: 112,
    logoHeight: 72,
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
