import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export interface HeroProps {
  title: string
  subtitle: string
  tagline: string
  ctaLabel: string
  ctaAnchor: string
}

export function Hero({ title, subtitle, tagline, ctaLabel, ctaAnchor }: HeroProps) {
  return (
    <section id="hero" className="border-b border-hairline">
      <div className="mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
        <p className="mb-6 text-sm font-medium tracking-wide text-accent-blue">
          {tagline}
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
        <div className="mt-10">
          <a
            href={ctaAnchor}
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-11 bg-accent-blue px-6 text-base font-medium text-accent-blue-foreground hover:bg-accent-blue/90',
            )}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
