'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const navigationLinks = [
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' }
]

const eventLinks = [
  { href: '/events/blaze-2026', label: 'BLAZE' },
  { href: '/events/flare-2026', label: 'FLARE' },
  { href: '/events/fire-2027', label: 'FIRE' }
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border bg-fire-black'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        {/* Logo */}
        <Link
          href='/'
          className='flex items-center gap-2'>
          <Image
            src='/logos/fire-logo.png'
            alt='FIRE Logo'
            width={40}
            height={40}
            className='h-10 w-10'
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden items-center gap-6 md:flex'>
          {navigationLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className='text-sm font-medium text-foreground transition-colors hover:text-primary'>
              {link.label}
            </Link>
          ))}

          {/* Events Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className='text-sm font-medium text-foreground transition-colors hover:text-primary focus:outline-none'>
              Events
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='bg-popover'>
              {eventLinks.map(event => (
                <DropdownMenuItem
                  key={event.href}
                  asChild>
                  <Link
                    href={event.href}
                    className='cursor-pointer'>
                    {event.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Button */}
        <Sheet
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
              aria-label='Toggle menu'>
              <Menu className='h-6 w-6' />
            </Button>
          </SheetTrigger>
          <SheetContent
            side='right'
            className='w-[300px] bg-fire-charcoal'>
            <div className='flex flex-col gap-6 pt-8'>
              {/* Mobile Navigation Links */}
              {navigationLinks.map(link => (
                <SheetClose
                  key={link.href}
                  asChild>
                  <Link
                    href={link.href}
                    className='text-lg font-medium text-foreground transition-colors hover:text-primary'>
                    {link.label}
                  </Link>
                </SheetClose>
              ))}

              {/* Mobile Events Section */}
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-semibold text-muted-foreground uppercase tracking-wider'>
                  Events
                </span>
                {eventLinks.map(event => (
                  <SheetClose
                    key={event.href}
                    asChild>
                    <Link
                      href={event.href}
                      className='text-lg font-medium text-foreground transition-colors hover:text-primary pl-4'>
                      {event.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
