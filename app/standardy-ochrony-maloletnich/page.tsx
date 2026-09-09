import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ChildProtectionStandards } from '@/components/sections/child-protection-standards'
import standardsContent from '@/content/child-protection-standards.json'
import footerContent from '@/content/footer.json'

export const metadata: Metadata = {
  title: 'Standardy ochrony małoletnich — Inner Logos',
  description:
    'Standardy ochrony małoletnich obowiązujące w gabinecie Inner Logos.',
}

export default function ChildProtectionStandardsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ChildProtectionStandards
          fullVersionUrl={standardsContent.fullVersionUrl}
          shortVersionUrl={standardsContent.shortVersionUrl}
          emptyStateText={standardsContent.emptyStateText}
        />
      </main>
      <SiteFooter {...footerContent} />
    </>
  )
}
