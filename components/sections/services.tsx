import type { LucideIcon } from 'lucide-react'
import { Activity, Compass, Combine, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export type ServiceAccent = 'blue' | 'green' | 'both'

export interface ServiceItem {
  id: string
  title: string
  shortDesc: string
  icon: string
  accent: ServiceAccent
}

export interface ServicesProps {
  services: ServiceItem[]
}

const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  compass: Compass,
  combine: Combine,
  sparkles: Sparkles,
}

const accentBorder: Record<ServiceAccent, string> = {
  blue: 'border-t-accent-blue',
  green: 'border-t-accent-green',
  both: 'border-t-accent-blue',
}

const accentIconWrap: Record<ServiceAccent, string> = {
  blue: 'bg-accent-blue/10 text-accent-blue',
  green: 'bg-accent-green/15 text-accent-green',
  both: 'bg-accent-blue/10 text-accent-blue',
}

export function Services({ services }: ServicesProps) {
  return (
    <section id="uslugi" className="border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Czym się zajmujemy
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Dwie uzupełniające się metody — osobno lub w połączeniu, dopasowane do
          tego, czego potrzebujesz.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Sparkles
            return (
              <Card
                key={service.id}
                className={cn(
                  'border-t-2 transition-shadow hover:shadow-sm',
                  accentBorder[service.accent],
                )}
              >
                <CardHeader className="gap-4">
                  <span
                    className={cn(
                      'flex size-11 items-center justify-center rounded-lg',
                      accentIconWrap[service.accent],
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  {service.accent === 'both' ? (
                    <span
                      aria-hidden="true"
                      className="flex gap-1.5"
                    >
                      <span className="h-1 w-8 rounded-full bg-accent-blue" />
                      <span className="h-1 w-8 rounded-full bg-accent-green" />
                    </span>
                  ) : null}
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {service.shortDesc}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
