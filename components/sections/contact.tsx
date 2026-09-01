import { MapPin, Phone, Mail, Video } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export interface ContactProps {
  address: string
  parkingInfo: string
  onlineAvailable: boolean
  phone: string
  mailto: string
}

export function Contact({
  address,
  parkingInfo,
  onlineAvailable,
  phone,
  mailto,
}: ContactProps) {
  return (
    <section id="kontakt" className="border-b border-hairline bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Kontakt
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Napisz lub zadzwoń, aby umówić pierwszą wizytę. Odpowiadam osobiście.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <MapPin
                className="mt-1 size-5 shrink-0 text-accent-blue"
                aria-hidden="true"
              />
              <div>
                <p className="text-base font-medium text-foreground">Adres</p>
                <p className="mt-1 text-base text-muted-foreground">{address}</p>
                <p className="mt-2 text-sm text-muted-foreground">{parkingInfo}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone
                className="mt-1 size-5 shrink-0 text-accent-blue"
                aria-hidden="true"
              />
              <div>
                <p className="text-base font-medium text-foreground">Telefon</p>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="mt-1 inline-block text-base text-muted-foreground transition-colors hover:text-accent-blue"
                >
                  {phone}
                </a>
              </div>
            </div>

            {onlineAvailable ? (
              <div className="flex items-start gap-4">
                <Video
                  className="mt-1 size-5 shrink-0 text-accent-green"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-base font-medium text-foreground">
                    Spotkania online
                  </p>
                  <p className="mt-1 text-base text-muted-foreground">
                    Wybrane sesje mogą odbywać się zdalnie, po wcześniejszym
                    ustaleniu.
                  </p>
                </div>
              </div>
            ) : null}

            <div>
              <a
                href={`mailto:${mailto}`}
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'h-11 bg-accent-blue px-6 text-base font-medium text-accent-blue-foreground hover:bg-accent-blue/90',
                )}
              >
                <Mail className="size-4" aria-hidden="true" />
                Napisz wiadomość
              </a>
            </div>
          </div>

          {/* Bezkluczowy embed wyszukiwania Google Maps na realny adres gabinetu */}
          <div className="overflow-hidden rounded-xl border border-hairline">
            <iframe
              title="Mapa lokalizacji gabinetu Inner Logos — ul. Piłsudskiego 23-29, Oborniki Śląskie"
              src="https://www.google.com/maps?q=ul.%20Pi%C5%82sudskiego%2023-29%2C%20Oborniki%20%C5%9Al%C4%85skie&output=embed"
              className="h-72 w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
