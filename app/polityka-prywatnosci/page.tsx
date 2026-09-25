import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import footerContent from '@/content/footer.json'

export const metadata: Metadata = {
  title: 'Polityka prywatności — Inner Logos',
  description:
    'Informacja o przetwarzaniu danych osobowych w związku z korzystaniem ze strony gabinetu Inner Logos.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Polityka prywatności
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Ostatnia aktualizacja: 25 września 2026
          </p>

          <div className="mt-12 flex flex-col gap-10 text-base leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                1. Administrator danych
              </h2>
              <p className="mt-3">
                Administratorem Twoich danych osobowych jest Karolina
                Kasperkiewicz, prowadząca gabinet „Inner Logos" przy ul.
                Piłsudskiego 23-29 w Obornikach Śląskich. W sprawach dotyczących
                danych osobowych możesz skontaktować się pod adresem{' '}
                <a
                  href="mailto:kontakt@inner-logos.pl"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  kontakt@inner-logos.pl
                </a>{' '}
                lub telefonicznie pod numerem podanym w sekcji „Kontakt".
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                2. Zakres i cel przetwarzania danych
              </h2>
              <ul className="mt-3 flex flex-col gap-3">
                <li>
                  <span className="font-medium text-foreground">
                    Kontakt i umówienie wizyty.
                  </span>{' '}
                  Jeśli napiszesz wiadomość e-mail, wyślesz formularz kontaktowy
                  lub zadzwonisz, przetwarzamy dane, które sam(a) podasz — zwykle
                  imię i nazwisko, adres e-mail lub numer telefonu oraz treść
                  wiadomości. Robimy to, aby odpowiedzieć na zapytanie i ustalić
                  termin spotkania. Podstawą prawną jest art.
                  6 ust. 1 lit. b RODO (podjęcie działań przed zawarciem umowy)
                  oraz art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes
                  polegający na obsłudze korespondencji).
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Dane dotyczące zdrowia.
                  </span>{' '}
                  Strona nie służy do przekazywania informacji o stanie zdrowia.
                  Prosimy, aby nie umieszczać takich szczegółów w wiadomościach —
                  omawiamy je podczas wizyty.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Formularz kontaktowy.
                  </span>{' '}
                  Dane wpisane w formularzu (imię i nazwisko, adres e-mail,
                  opcjonalnie telefon oraz treść wiadomości) są przesyłane na
                  skrzynkę e-mail gabinetu i służą wyłącznie do odpowiedzi na
                  Twoje zapytanie. Nie zapisujemy ich w bazie danych ani nie
                  wysyłamy automatycznych odpowiedzi. Strona nie zawiera systemu
                  rezerwacji online.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                3. Dane zbierane automatycznie
              </h2>
              <ul className="mt-3 flex flex-col gap-3">
                <li>
                  <span className="font-medium text-foreground">
                    Logi serwera.
                  </span>{' '}
                  Dostawca hostingu (Vercel Inc.) zapisuje techniczne dane
                  połączenia, takie jak adres IP, typ i wersja przeglądarki oraz
                  data i godzina żądania. Służą one zapewnieniu działania i
                  bezpieczeństwa strony — art. 6 ust. 1 lit. f RODO.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Statystyka odwiedzin.
                  </span>{' '}
                  Korzystamy z narzędzia Vercel Analytics, które zbiera
                  zanonimizowane, zagregowane informacje o ruchu na stronie
                  (m.in. odwiedzane podstrony, przybliżoną lokalizację na poziomie
                  kraju, rodzaj urządzenia). Narzędzie nie używa plików cookie i
                  nie pozwala na identyfikację osób. Podstawą prawną jest art. 6
                  ust. 1 lit. f RODO (prowadzenie statystyki i doskonalenie
                  strony).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                4. Pliki cookie i osadzone treści
              </h2>
              <ul className="mt-3 flex flex-col gap-3">
                <li>
                  Strona nie wykorzystuje własnych plików cookie do celów
                  marketingowych ani do śledzenia. Narzędzie statystyczne działa
                  bez plików cookie.
                </li>
                <li>
                  W sekcji „Kontakt" osadzona jest mapa Google Maps. Jej
                  wyświetlenie powoduje połączenie z serwerami Google Ireland
                  Limited / Google LLC, które mogą zapisać własne pliki cookie i
                  przetwarzać Twój adres IP na zasadach opisanych w polityce
                  prywatności Google.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                5. Odbiorcy danych
              </h2>
              <p className="mt-3">
                Dane mogą być powierzane dostawcom usług informatycznych
                niezbędnych do prowadzenia strony:
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                <li>
                  Vercel Inc. — hosting strony i statystyka odwiedzin (przez
                  infrastrukturę hostingową przechodzą też dane wysyłane
                  formularzem),
                </li>
                <li>
                  OVH SAS (OVHcloud) — poczta e-mail gabinetu, na którą trafiają
                  wiadomości z formularza,
                </li>
                <li>
                  Google Ireland Limited / Google LLC — osadzona mapa lokalizacji.
                </li>
              </ul>
              <p className="mt-3">
                Podmioty te mogą przetwarzać dane poza Europejskim Obszarem
                Gospodarczym (m.in. w Stanach Zjednoczonych). Przekazywanie danych
                odbywa się na podstawie standardowych klauzul umownych
                zatwierdzonych przez Komisję Europejską lub uczestnictwa w
                programie Data Privacy Framework.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                6. Okres przechowywania
              </h2>
              <p className="mt-3">
                Korespondencję przechowujemy przez czas niezbędny do obsługi
                sprawy. Jeżeli dojdzie do rozpoczęcia współpracy, dane związane z
                kontaktem przechowujemy przez okres jej trwania oraz przez czas
                przedawnienia ewentualnych roszczeń, a następnie je usuwamy. Dane
                statystyczne przetwarzane są wyłącznie w formie zagregowanej.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                7. Zakres niniejszej polityki
              </h2>
              <p className="mt-3">
                Niniejsza polityka dotyczy przetwarzania danych w związku z
                korzystaniem ze strony internetowej. Zasady przetwarzania danych w
                ramach świadczonych usług, w tym prowadzenia ewentualnej
                dokumentacji, przekazywane są odrębnie, najpóźniej podczas
                pierwszej wizyty.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                8. Twoje prawa
              </h2>
              <p className="mt-3">
                Przysługuje Ci prawo dostępu do danych, ich sprostowania,
                usunięcia lub ograniczenia przetwarzania, prawo sprzeciwu wobec
                przetwarzania oraz prawo do przenoszenia danych. Masz również
                prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych
                Osobowych (ul. Stawki 2, 00-193 Warszawa).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                9. Dobrowolność podania danych
              </h2>
              <p className="mt-3">
                Podanie danych jest dobrowolne, lecz niezbędne do udzielenia
                odpowiedzi na zapytanie i umówienia wizyty.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                10. Zautomatyzowane podejmowanie decyzji
              </h2>
              <p className="mt-3">
                Twoje dane nie są wykorzystywane do zautomatyzowanego
                podejmowania decyzji, w tym profilowania.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                11. Zmiany polityki prywatności
              </h2>
              <p className="mt-3">
                W przypadku zmian aktualną wersję polityki publikujemy na tej
                stronie wraz z datą aktualizacji.
              </p>
            </section>
          </div>

          <p className="mt-14">
            <a
              href="/#hero"
              className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              ← Powrót na stronę główną
            </a>
          </p>
        </div>
      </main>
      <SiteFooter {...footerContent} />
    </>
  )
}
