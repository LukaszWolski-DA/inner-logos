import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqProps {
  items: FaqItem[]
}

export function Faq({ items }: FaqProps) {
  return (
    <section id="faq" className="border-b border-hairline">
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Najczęstsze pytania
        </h2>

        <Accordion multiple={false} className="mt-10">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="py-5 text-base font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pr-6 text-base leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
