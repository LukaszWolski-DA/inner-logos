'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import Image from 'next/image'
import { FileText, ImageIcon, X, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export interface CertificateItem {
  id: string
  title: string
  issuer: string
  dateObtained: string
  thumbnailUrl: string
  fileUrl: string
  fileType: 'pdf' | 'image'
}

export interface CertificatesProps {
  sectionTitle: string
  emptyStateText: string
  items: CertificateItem[]
}

function formatMonthYear(value: string): string {
  const [year, month] = value.split('-').map(Number)
  if (!year || !month) return value
  return new Intl.DateTimeFormat('pl-PL', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, 1))
}

/** true dla „zwykłego" lewego kliknięcia — bez modyfikatorów otwierających nową kartę. */
function isPlainClick(event: ReactMouseEvent): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  )
}

export function Certificates({
  sectionTitle,
  emptyStateText,
  items,
}: CertificatesProps) {
  const [active, setActive] = useState<CertificateItem | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const openLightbox = useCallback(
    (item: CertificateItem, trigger: HTMLElement) => {
      triggerRef.current = trigger
      setActive(item)
    },
    [],
  )

  const closeLightbox = useCallback(() => {
    setActive(null)
    triggerRef.current?.focus()
    triggerRef.current = null
  }, [])

  useEffect(() => {
    if (!active) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeLightbox()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [active, closeLightbox])

  return (
    <section id="certyfikaty" className="border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {sectionTitle}
        </h1>

        {items.length === 0 ? (
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {emptyStateText}
          </p>
        ) : (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const TypeIcon = item.fileType === 'pdf' ? FileText : ImageIcon
              return (
                <li key={item.id}>
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-haspopup="dialog"
                    aria-label={`Powiększ certyfikat „${item.title}”`}
                    onClick={(event) => {
                      if (!isPlainClick(event)) return
                      event.preventDefault()
                      openLightbox(item, event.currentTarget)
                    }}
                    className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Card className="h-full gap-0 overflow-hidden py-0 transition hover:ring-foreground/20">
                      <div className="relative aspect-[3/4] w-full bg-muted">
                        <Image
                          src={item.thumbnailUrl}
                          alt={`Miniatura certyfikatu: ${item.title}`}
                          fill
                          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                          className="object-contain"
                        />
                      </div>
                      <CardContent className="flex flex-col gap-1 p-4">
                        <span className="flex items-start gap-2 text-base font-medium leading-snug text-foreground">
                          <TypeIcon
                            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <span>{item.title}</span>
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {item.issuer}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatMonthYear(item.dateObtained)}
                        </span>
                      </CardContent>
                    </Card>
                  </a>
                </li>
              )
            })}
          </ul>
        )}

        <p className="mt-14">
          <a
            href="/#hero"
            className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            ← Powrót na stronę główną
          </a>
        </p>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox()
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Certyfikat: ${active.title}`}
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-background shadow-xl ring-1 ring-foreground/10"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Zamknij powiększenie"
              className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-lg bg-background/80 text-foreground outline-none backdrop-blur transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-5" />
            </button>

            <div className="min-h-0 flex-1 overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  active.fileType === 'image'
                    ? active.fileUrl
                    : active.thumbnailUrl
                }
                alt={`Certyfikat: ${active.title}`}
                className="mx-auto block h-auto w-full bg-muted"
              />
            </div>

            <div className="flex flex-col gap-2 border-t border-hairline p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-base font-medium text-foreground">
                  {active.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {active.issuer} · {formatMonthYear(active.dateObtained)}
                </p>
              </div>
              <a
                href={active.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent-blue underline underline-offset-4 transition-colors hover:text-foreground"
              >
                {active.fileType === 'pdf' ? 'Otwórz oryginał (PDF)' : 'Otwórz plik'}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
