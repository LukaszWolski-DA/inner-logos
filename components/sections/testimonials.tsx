import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

export type TestimonialService = 'biofeedback' | 'logoterapia'

export interface TestimonialItem {
  author: string
  text: string
  service?: TestimonialService
}

export interface TestimonialsProps {
  items: TestimonialItem[]
}

const serviceAccent: Record<TestimonialService, string> = {
  biofeedback: 'text-accent-blue',
  logoterapia: 'text-accent-green',
}

const serviceLabel: Record<TestimonialService, string> = {
  biofeedback: 'Biofeedback',
  logoterapia: 'Logoterapia',
}

export function Testimonials({ items }: TestimonialsProps) {
  // Sekcja gotowa na przyszłość — bez opinii nie renderujemy niczego.
  if (items.length === 0) {
    return null
  }

  return (
    <section id="opinie" className="border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Opinie klientów
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col gap-4">
                <p className="text-pretty text-base leading-relaxed text-foreground">
                  {`„${item.text}”`}
                </p>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground">
                    {item.author}
                  </span>
                  {item.service ? (
                    <span
                      className={cn(
                        'text-xs font-medium',
                        serviceAccent[item.service],
                      )}
                    >
                      {serviceLabel[item.service]}
                    </span>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
