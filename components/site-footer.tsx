export interface SiteFooterProps {
  privacyPolicyText: string
  privacyPolicyHref: string
}

export function SiteFooter({ privacyPolicyText, privacyPolicyHref }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold tracking-tight text-foreground">
            Inner Logos
          </span>
          <span className="text-sm text-muted-foreground">
            {`© ${year} Inner Logos. Wszelkie prawa zastrzeżone.`}
          </span>
        </div>

        <nav aria-label="Nawigacja w stopce">
          <a
            href={privacyPolicyHref}
            className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            {privacyPolicyText}
          </a>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Informacje na tej stronie mają charakter ogólny i nie zastępują
          konsultacji ani diagnozy medycznej.
        </p>
      </div>
    </footer>
  )
}
