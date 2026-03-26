import Link from 'next/link'
import { Mail, ExternalLink } from 'lucide-react'
import { getSiteConfig } from '@/lib/content'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const config = getSiteConfig()

  const quickLinks = [
    { label: 'About', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Sponsors', href: '/sponsors' },
    { label: 'Contact', href: '/contact' }
  ]

  const socialLinks = [
    {
      name: 'FetLife',
      href: config.social.fetlife || '#',
      icon: (
        <svg
          className='w-5 h-5'
          fill='currentColor'
          viewBox='0 0 24 24'>
          <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' />
          <circle
            cx='12'
            cy='12'
            r='3'
          />
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: config.social.instagram || '#',
      icon: (
        <svg
          className='w-5 h-5'
          fill='currentColor'
          viewBox='0 0 24 24'>
          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: config.social.facebook || '#',
      icon: (
        <svg
          className='w-5 h-5'
          fill='currentColor'
          viewBox='0 0 24 24'>
          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
        </svg>
      )
    },
    {
      name: 'TikTok',
      href: config.social.tiktok || '#',
      icon: (
        <svg
          className='w-5 h-5'
          fill='currentColor'
          viewBox='0 0 24 24'>
          <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z' />
        </svg>
      )
    }
  ]

  return (
    <footer className='bg-fire-charcoal border-t border-white/10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'>
          {/* About Column */}
          <div>
            <h3 className='text-fire-orange font-bold text-lg mb-4'>About FIRE</h3>
            <p className='text-gray-300 text-sm leading-relaxed mb-4'>
              FIRE (Florida Intensive Rope Events) is an educational organization dedicated to
              promoting rope bondage education through three annual conventions in Orlando, FL:
              BLAZE, FLARE, and FIRE.
            </p>
            <a
              href={`mailto:${config.contact.general}`}
              className='inline-flex items-center gap-2 text-fire-orange hover:text-fire-yellow transition-colors text-sm'>
              <Mail className='w-4 h-4' />
              {config.contact.general}
            </a>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className='text-fire-orange font-bold text-lg mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-gray-300 hover:text-fire-orange transition-colors text-sm'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className='text-fire-orange font-bold text-lg mb-4'>Connect With Us</h3>
            <p className='text-gray-300 text-sm mb-4'>
              Follow us on social media for updates, announcements, and community content.
            </p>
            <div className='flex gap-4'>
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-300 hover:text-fire-orange transition-colors'
                  aria-label={social.name}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-12 pt-8 border-t border-white/10'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-gray-400 text-sm'>
              &copy; {currentYear} Florida Intensive Rope Events. All rights reserved.
            </p>
            <div className='flex gap-6 text-sm'>
              <Link
                href='/faq'
                className='text-gray-400 hover:text-fire-orange transition-colors'>
                Policies
              </Link>
              <Link
                href='/contact'
                className='text-gray-400 hover:text-fire-orange transition-colors'>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
