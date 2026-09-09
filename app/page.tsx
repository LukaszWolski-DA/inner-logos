import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services, type ServiceItem } from '@/components/sections/services'
import { Audience } from '@/components/sections/audience'
import { Process } from '@/components/sections/process'
import { Pricing } from '@/components/sections/pricing'
import { Faq } from '@/components/sections/faq'
import { Testimonials, type TestimonialItem } from '@/components/sections/testimonials'
import { Contact } from '@/components/sections/contact'

import heroContent from '@/content/hero.json'
import aboutContent from '@/content/about.json'
import certificatesContent from '@/content/certificates.json'
import servicesContent from '@/content/services.json'
import audienceContent from '@/content/audience.json'
import processContent from '@/content/process.json'
import pricingContent from '@/content/pricing.json'
import faqContent from '@/content/faq.json'
import testimonialsContent from '@/content/testimonials.json'
import contactContent from '@/content/contact.json'
import footerContent from '@/content/footer.json'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero {...heroContent} />
        <About
          {...aboutContent}
          certificationLinkText={certificatesContent.certificationLinkText}
          certificatesHref="/certyfikaty"
        />
        <Services
          services={servicesContent.services as ServiceItem[]}
          disclaimer={servicesContent.disclaimer}
        />
        <Audience {...audienceContent} />
        <Process steps={processContent.steps} />
        <Pricing items={pricingContent.items} />
        <Faq items={faqContent.items} />
        <Testimonials items={testimonialsContent.items as TestimonialItem[]} />
        <Contact {...contactContent} />
      </main>
      <SiteFooter {...footerContent} />
    </>
  )
}
