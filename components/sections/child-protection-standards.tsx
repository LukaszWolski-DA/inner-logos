import { FileText } from 'lucide-react'

export type StandardsBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quotes'; items: string[] }

export interface StandardsSection {
  heading: string
  blocks: StandardsBlock[]
}

export interface StandardsDocument {
  subtitle?: string
  introHeading?: string
  intro?: StandardsBlock[]
  sections: StandardsSection[]
}

export interface ChildProtectionStandardsProps {
  fullVersionUrl: string | null
  shortVersionUrl: string | null
  fullVersion: StandardsDocument | null
  shortVersion: StandardsDocument | null
  emptyStateText: string
}

function Blocks({ blocks }: { blocks: StandardsBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') {
          return (
            <p key={index} className="mt-3">
              {block.text}
            </p>
          )
        }
        if (block.type === 'quotes') {
          return (
            <ul key={index} className="mt-3 flex flex-col gap-2">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-accent-blue pl-4 font-medium text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          )
        }
        return (
          <ul key={index} className="mt-3 flex list-disc flex-col gap-1.5 pl-6">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )
      })}
    </>
  )
}

export function ChildProtectionStandards({
  fullVersionUrl,
  shortVersionUrl,
  fullVersion,
  shortVersion,
  emptyStateText,
}: ChildProtectionStandardsProps) {
  const versions = [
    {
      id: 'pelna-wersja',
      label: 'Pełna wersja',
      document: fullVersion,
      url: fullVersionUrl,
    },
    {
      id: 'wersja-skrocona',
      label: 'Wersja skrócona',
      document: shortVersion,
      url: shortVersionUrl,
    },
  ].filter((version) => version.document !== null || version.url !== null)

  // Etykiety wersji (i niższy poziom nagłówków sekcji) tylko gdy są obie wersje.
  const multiple = versions.length > 1
  const SectionHeading = multiple ? 'h3' : 'h2'

  return (
    <section
      id="standardy-ochrony-maloletnich"
      className="border-b border-hairline"
    >
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Standardy ochrony małoletnich
        </h1>

        {versions.length === 0 ? (
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            {emptyStateText}
          </p>
        ) : (
          <div className="mt-6 flex flex-col gap-16">
            {versions.map((version) => (
              <article
                key={version.id}
                aria-labelledby={multiple ? `${version.id}-title` : undefined}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {multiple ? (
                  <h2
                    id={`${version.id}-title`}
                    className="text-2xl font-semibold tracking-tight text-foreground"
                  >
                    {version.label}
                  </h2>
                ) : null}

                {version.document?.subtitle ? (
                  <p className="text-lg text-foreground">
                    {version.document.subtitle}
                  </p>
                ) : null}

                {version.url ? (
                  <p className="mt-4">
                    <a
                      href={version.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-base font-medium text-accent-blue underline underline-offset-4 transition-colors hover:text-foreground"
                    >
                      <FileText className="size-4 shrink-0" aria-hidden="true" />
                      {version.label} (PDF)
                    </a>
                  </p>
                ) : null}

                {version.document ? (
                  <div className="mt-8 flex flex-col gap-10">
                    {version.document.intro?.length ? (
                      <div>
                        {version.document.introHeading ? (
                          <SectionHeading className="text-xl font-semibold text-foreground">
                            {version.document.introHeading}
                          </SectionHeading>
                        ) : null}
                        <Blocks blocks={version.document.intro} />
                      </div>
                    ) : null}

                    {version.document.sections.map((section, index) => (
                      <div key={section.heading}>
                        <SectionHeading className="text-xl font-semibold text-foreground">
                          {index + 1}. {section.heading}
                        </SectionHeading>
                        <Blocks blocks={section.blocks} />
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
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
    </section>
  )
}
