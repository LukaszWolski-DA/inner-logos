import type { ReactNode } from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'

export interface AboutProps {
  name: string
  role: string
  bio: string
  photoUrl?: string | null
  /** Słowo w tekście (z certificates.json), które ma stać się linkiem do strony certyfikatów. */
  certificationLinkText?: string
  /** Docelowy adres linku, domyślnie /certyfikaty. */
  certificatesHref?: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * Zamienia wskazane słowo w tekście na link. Jeśli słowa nie ma (albo nie podano
 * `linkText`), zwraca tekst bez zmian — działa więc niezależnie od tego, czy
 * "certyfikacji" pojawi się w `role`, w `bio`, czy w obu.
 */
function withCertificationLink(
  text: string,
  linkText: string | undefined,
  href: string,
): ReactNode {
  if (!linkText) return text
  const parts = text.split(linkText)
  if (parts.length === 1) return text

  return parts.map((part, index) => {
    if (index === 0) return part
    return (
      <span key={index}>
        <Link
          href={href}
          className="underline underline-offset-4 transition-colors hover:text-foreground"
        >
          {linkText}
        </Link>
        {part}
      </span>
    )
  })
}

export function About({
  name,
  role,
  bio,
  photoUrl,
  certificationLinkText,
  certificatesHref = '/certyfikaty',
}: AboutProps) {
  return (
    <section id="o-gabinecie" className="border-b border-hairline">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            O gabinecie
          </h2>
          <p className="mt-3 text-lg font-medium text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">
            {withCertificationLink(role, certificationLinkText, certificatesHref)}
          </p>
          <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground">
            {withCertificationLink(bio, certificationLinkText, certificatesHref)}
          </p>
        </div>

        <div className="order-1 flex justify-center md:order-2">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl || '/placeholder.svg'}
              alt={`${name} — ${role}`}
              className="size-56 rounded-full object-cover md:size-72"
            />
          ) : (
            <div
              role="img"
              aria-label={`Zdjęcie profilowe: ${name}`}
              className="flex size-56 items-center justify-center rounded-full border border-hairline bg-muted md:size-72"
            >
              {getInitials(name) ? (
                <span className="text-4xl font-medium text-muted-foreground md:text-5xl">
                  {getInitials(name)}
                </span>
              ) : (
                <User className="size-16 text-muted-foreground" />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
