import { sanityClient } from '@/lib/sanity'

const FALLBACK_COLUMNS = [
  {
    title: 'שירותים',
    links: [
      { label: 'פיתוח אתרים', href: '/services' },
      { label: 'עיצוב UI/UX', href: '/services' },
      { label: 'קידום אתרים', href: '/services' },
    ],
  },
  {
    title: 'פתרונות',
    links: [
      { label: 'עסקים קטנים', href: '/solutions' },
      { label: 'סטארטאפים', href: '/solutions' },
      { label: 'ארגונים', href: '/solutions' },
    ],
  },
  {
    title: 'חברה',
    links: [
      { label: 'אודות', href: '/about' },
      { label: 'בלוג', href: '/blog' },
      { label: 'קריירה', href: '/careers' },
    ],
  },
  {
    title: 'תמיכה',
    links: [
      { label: 'צרו קשר', href: '/contact' },
      { label: 'שאלות נפוצות', href: '/faq' },
      { label: 'פרטיות', href: '/privacy' },
    ],
  },
]

const FALLBACK_SOCIAL = [
  { platform: 'LinkedIn', href: '#' },
  { platform: 'Twitter', href: '#' },
  { platform: 'Instagram', href: '#' },
]

type FooterLink = { _key?: string; label: string; href: string }
type FooterColumn = { _key?: string; title: string; links?: FooterLink[] }
type SocialLink = { _key?: string; platform: string; href: string }
type SiteFooterData = {
  columns?: FooterColumn[]
  socialLinks?: SocialLink[]
}

export default async function Footer() {
  const data: SiteFooterData | null = await sanityClient.fetch(
    `*[_type == "siteFooter"][0]{ columns, socialLinks }`
  )

  const columns = data?.columns?.length ? data.columns : FALLBACK_COLUMNS
  const socialLinks = data?.socialLinks?.length ? data.socialLinks : FALLBACK_SOCIAL

  return (
    <footer dir="rtl" className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {columns.map((col, i) => (
            <div key={col._key ?? i}>
              <h4 className="text-white text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links?.map((link, j) => (
                  <li key={link._key ?? j}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white font-bold text-lg">newsogo</span>

          <div className="flex items-center gap-5">
            {socialLinks.map((s, i) => (
              <a
                key={s._key ?? i}
                href={s.href}
                className="text-sm hover:text-white transition-colors"
              >
                {s.platform}
              </a>
            ))}
          </div>

          <p className="text-xs">
            © {new Date().getFullYear()} newsogo. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  )
}
