import nodemailer from 'nodemailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  messageMin: 10,
  messageMax: 3000,
}

// Minimalny czas wypełniania formularza (ms) — szybsze zgłoszenia to zwykle boty.
const MIN_FILL_TIME_MS = 2000

// Prosty limit żądań na IP. Na serverless pamięć jest per instancja, więc to
// tylko dodatkowa warstwa obok honeypota, nie pełna ochrona.
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  // sprzątanie, żeby mapa nie rosła w nieskończoność
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key)
    }
  }
  return recent.length > RATE_MAX
}

/** Usuwa znaki sterujące (m.in. CR/LF — ochrona przed wstrzyknięciem nagłówków). */
function singleLine(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max)
}

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request) {
  // Żądanie musi pochodzić z tej samej domeny (jeśli przeglądarka podała Origin).
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (origin) {
    let originHost = ''
    try {
      originHost = new URL(origin).host
    } catch {
      /* niepoprawny Origin */
    }
    if (originHost !== host) return json({ ok: false, error: 'forbidden' }, 403)
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  if (isRateLimited(ip)) return json({ ok: false, error: 'rate_limited' }, 429)

  let body: Record<string, unknown>
  try {
    const parsed = await request.json()
    if (!parsed || typeof parsed !== 'object') throw new Error('bad body')
    body = parsed as Record<string, unknown>
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400)
  }

  // Honeypot wypełniony lub podejrzanie szybkie wysłanie: udajemy sukces, nic nie wysyłamy.
  const honeypot = typeof body.website === 'string' ? body.website.trim() : ''
  const startedAt = Number(body.startedAt)
  const tooFast = Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_TIME_MS
  if (honeypot || tooFast) return json({ ok: true })

  const name = singleLine(body.name, LIMITS.name)
  const email = singleLine(body.email, LIMITS.email)
  const phone = singleLine(body.phone, LIMITS.phone)
  const message =
    typeof body.message === 'string'
      ? // eslint-disable-next-line no-control-regex
        body.message.replace(/\r\n/g, '\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim()
      : ''

  const fields: Record<string, string> = {}
  if (!name) fields.name = 'required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = 'invalid'
  if (phone && !/^[0-9+()\-\s]+$/.test(phone)) fields.phone = 'invalid'
  if (message.length < LIMITS.messageMin) fields.message = 'too_short'
  if (message.length > LIMITS.messageMax) fields.message = 'too_long'
  if (Object.keys(fields).length > 0) {
    return json({ ok: false, error: 'validation', fields }, 400)
  }

  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!user || !pass) {
    console.error('[contact] brak konfiguracji SMTP (SMTP_USER / SMTP_PASS)')
    return json({ ok: false, error: 'not_configured' }, 503)
  }

  const port = Number(process.env.SMTP_PORT ?? 465)
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : port === 465
  const to = process.env.CONTACT_TO || user

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mail.ovh.net',
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  })

  const text = [
    'Nowa wiadomość z formularza na stronie inner-logos.pl',
    '',
    `Imię i nazwisko: ${name}`,
    `E-mail: ${email}`,
    `Telefon: ${phone || '—'}`,
    '',
    'Wiadomość:',
    message,
    '',
  ].join('\n')

  try {
    await transporter.sendMail({
      // Nadawcą technicznym musi być skrzynka domeny (SPF/DKIM). Imię pochodzi
      // z formularza, a odpowiedź trafia na adres osoby piszącej (Reply-To).
      from: { name, address: user },
      replyTo: { name, address: email },
      to,
      subject: `[Formularz] Wiadomość od ${name}`,
      text,
    })
  } catch (error) {
    // Bez treści wiadomości i danych logowania — tylko kod błędu.
    const code = (error as { code?: string })?.code ?? 'UNKNOWN'
    console.error('[contact] wysyłka nie powiodła się:', code)
    return json({ ok: false, error: 'send_failed' }, 502)
  }

  return json({ ok: true })
}
