import { FileText } from 'lucide-react'

export interface ChildProtectionStandardsProps {
  fullVersionUrl: string | null
  shortVersionUrl: string | null
  emptyStateText: string
}

export function ChildProtectionStandards({
  fullVersionUrl,
  shortVersionUrl,
  emptyStateText,
}: ChildProtectionStandardsProps) {
  const documents = (
    [
      { url: fullVersionUrl, label: 'Pełna wersja (PDF)' },
      { url: shortVersionUrl, label: 'Wersja skrócona (PDF)' },
    ] as const
  ).filter((doc): doc is { url: string; label: string } => doc.url !== null)

  return (
    <section
      id="standardy-ochrony-maloletnich"
      className="border-b border-hairline"
    >
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Standardy ochrony małoletnich
        </h1>

        {documents.length === 0 ? (
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            {emptyStateText}
          </p>
        ) : (
          <ul className="mt-8 flex flex-col gap-3">
            {documents.map((doc) => (
              <li key={doc.label}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-medium text-accent-blue underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  <FileText className="size-4 shrink-0" aria-hidden="true" />
                  {doc.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
