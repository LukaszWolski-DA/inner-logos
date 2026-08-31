import { Check } from 'lucide-react'

export interface AudienceProps {
  title: string
  items: string[]
}

export function Audience({ title, items }: AudienceProps) {
  return (
    <section id="dla-kogo" className="border-b border-hairline bg-muted/40">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <ul className="mt-12 flex flex-col gap-6">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-green/15 text-accent-green"
              >
                <Check className="size-4" />
              </span>
              <span className="text-pretty text-lg leading-relaxed text-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
