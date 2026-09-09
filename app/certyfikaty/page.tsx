import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import {
  Certificates,
  type CertificateItem,
} from '@/components/sections/certificates'
import certificatesContent from '@/content/certificates.json'
import footerContent from '@/content/footer.json'

export const metadata: Metadata = {
  title: 'Certyfikaty — Inner Logos',
  description:
    'Certyfikaty i szkolenia Karoliny Kasperkiewicz z zakresu biofeedbacku i wsparcia inspirowanego logoterapią.',
}

export default function CertificatesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Certificates
          sectionTitle={certificatesContent.sectionTitle}
          emptyStateText={certificatesContent.emptyStateText}
          items={certificatesContent.items as CertificateItem[]}
        />
      </main>
      <SiteFooter {...footerContent} />
    </>
  )
}
