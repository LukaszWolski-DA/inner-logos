import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export interface PricingItem {
  name: string
  duration: string
  price: string
}

export interface PricingProps {
  items: PricingItem[]
}

export function Pricing({ items }: PricingProps) {
  return (
    <section id="cennik" className="border-b border-hairline bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Cennik
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Card key={index} className="justify-between transition-shadow hover:shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <span className="text-3xl font-semibold tracking-tight text-foreground">
                  {item.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.duration}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
