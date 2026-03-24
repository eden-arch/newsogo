import { sanityClient } from '@/lib/sanity'

const FALLBACK_NAV = [
  { label: 'ראשי', href: '/' },
  { label: 'שירותים', href: '/services' },
  { label: 'פתרונות', href: '/solutions' },
  { label: 'אודות', href: '/about' },
  { label: 'צרו קשר', href: '/contact' },
]

const FALLBACK_CTA = { text: 'הצעת מחיר בקליק', href: '/quote' }

type NavLink = { _key?: string; label: string; href: string }
type SiteHeaderData = {
  navigationLinks?: NavLink[]
  ctaText?: string
  ctaLink?: string
}

export default async function Header() {
  const data: SiteHeaderData | null = await sanityClient.fetch(
    `*[_type == "siteHeader"][0]{ navigationLinks, ctaText, ctaLink }`
  )

  const navLinks = data?.navigationLinks?.length ? data.navigationLinks : FALLBACK_NAV
  const ctaText = data?.ctaText || FALLBACK_CTA.text
  const ctaLink = data?.ctaLink || FALLBACK_CTA.href

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <a href="/" className="text-lg font-bold tracking-tight text-gray-900 shrink-0">
          newsogo
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link._key ?? i}
              href={link.href}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={ctaLink}
          className="shrink-0 bg-black text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </header>
  )
}
