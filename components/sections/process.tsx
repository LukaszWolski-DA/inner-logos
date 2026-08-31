export interface ProcessStep {
  order: number
  title: string
  description: string
}

export interface ProcessProps {
  steps: ProcessStep[]
}

export function Process({ steps }: ProcessProps) {
  return (
    <section id="pierwsza-wizyta" className="border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Jak wygląda pierwsze spotkanie
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Cztery proste kroki, od pierwszego kontaktu do regularnej pracy.
        </p>

        <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((step, index) => (
            <li key={step.order} className="relative">
              <div className="flex items-center gap-4 md:block">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-accent-blue text-base font-semibold text-accent-blue">
                  {step.order}
                </span>
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="hidden h-px flex-1 bg-hairline md:absolute md:left-11 md:right-0 md:top-[22px] md:block"
                  />
                ) : null}
              </div>
              <h3 className="mt-5 text-lg font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
