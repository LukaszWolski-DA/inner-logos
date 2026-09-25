'use client'

import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export interface ContactFormTexts {
  title: string
  intro: string
  healthNote: string
  consentText: string
  successText: string
  errorText: string
}

interface ContactFormProps extends ContactFormTexts {
  mailto: string
  privacyPolicyHref?: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-destructive'

export function ContactForm({
  title,
  intro,
  healthNote,
  consentText,
  successText,
  errorText,
  mailto,
  privacyPolicyHref = '/polityka-prywatnosci',
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const startedAt = useRef<number>(0)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setFieldErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          message: data.get('message'),
          website: data.get('website'),
          startedAt: startedAt.current,
        }),
      })
      const result = await response.json().catch(() => ({}))

      if (response.ok && result.ok) {
        form.reset()
        setStatus('success')
        return
      }
      if (result?.fields) setFieldErrors(result.fields)
      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-xl border border-hairline bg-background p-6"
      >
        <p className="text-lg font-medium text-foreground">{successText}</p>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form
      onSubmit={onSubmit}
      noValidate={false}
      aria-labelledby="contact-form-title"
      className="rounded-xl border border-hairline bg-background p-6 md:p-8"
    >
      <h3
        id="contact-form-title"
        className="text-xl font-semibold tracking-tight text-foreground"
      >
        {title}
      </h3>
      <p className="mt-2 text-base text-muted-foreground">{intro}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-foreground">
            Imię i nazwisko
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            aria-invalid={fieldErrors.name ? true : undefined}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-foreground">
            Adres e-mail
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            aria-invalid={fieldErrors.email ? true : undefined}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium text-foreground">
            Telefon <span className="font-normal text-muted-foreground">(opcjonalnie)</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            maxLength={30}
            autoComplete="tel"
            aria-invalid={fieldErrors.phone ? true : undefined}
            className={cn(inputClass, 'sm:max-w-xs')}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-foreground">
            Wiadomość
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows={6}
            aria-describedby="cf-health-note"
            aria-invalid={fieldErrors.message ? true : undefined}
            className={cn(inputClass, 'resize-y')}
          />
          <p id="cf-health-note" className="mt-1.5 text-sm text-muted-foreground">
            {healthNote}
          </p>
        </div>

        {/* Honeypot: ukryte pole, które wypełniają tylko boty. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="cf-website">Nie wypełniaj tego pola</label>
          <input
            id="cf-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        {consentText}{' '}
        <a
          href={privacyPolicyHref}
          className="underline underline-offset-4 hover:text-foreground"
        >
          Polityka prywatności
        </a>
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className={cn(
            buttonVariants({ size: 'lg' }),
            'h-11 bg-accent-blue px-6 text-base font-medium text-accent-blue-foreground hover:bg-accent-blue/90 disabled:opacity-70',
          )}
        >
          {sending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {sending ? 'Wysyłanie…' : 'Wyślij wiadomość'}
        </button>

        <p aria-live="polite" className="min-h-6 text-sm text-destructive">
          {status === 'error' ? (
            <>
              {errorText}{' '}
              <a
                href={`mailto:${mailto}`}
                className="underline underline-offset-4"
              >
                {mailto}
              </a>
            </>
          ) : null}
        </p>
      </div>
    </form>
  )
}
