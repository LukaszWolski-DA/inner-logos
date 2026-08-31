'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface NavLink {
  label: string
  anchor: string
}

const navLinks: NavLink[] = [
  { label: 'O gabinecie', anchor: '#o-gabinecie' },
  { label: 'Usługi', anchor: '#uslugi' },
  { label: 'Dla kogo', anchor: '#dla-kogo' },
  { label: 'Pierwsza wizyta', anchor: '#pierwsza-wizyta' },
  { label: 'Cennik', anchor: '#cennik' },
  { label: 'FAQ', anchor: '#faq' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-background/85 backdrop-blur">
      <nav
        aria-label="Nawigacja główna"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        {/* TODO: podmień placeholder na dostarczony plik logo */}
        <a
          href="#hero"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Inner Logos
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.anchor}>
              <a
                href={link.anchor}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#kontakt"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'hidden bg-accent-blue px-4 font-medium text-accent-blue-foreground hover:bg-accent-blue/90 md:inline-flex',
            )}
          >
            Skontaktuj się
          </a>
          <button
            type="button"
            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-hairline bg-background md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.anchor}>
                <a
                  href={link.anchor}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'w-full bg-accent-blue font-medium text-accent-blue-foreground hover:bg-accent-blue/90',
                )}
              >
                Skontaktuj się
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
