export type LogoItem = {
  _key?: string
  imageUrl?: string
  alt?: string
  link?: string
}

type Props = {
  title?: string
  logos: LogoItem[]
}

export default function LogoGrid({ title, logos }: Props) {
  if (!logos.length) return null

  return (
    <section className="w-full py-16 px-6 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {title && (
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-gray-400 mb-10">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {logos.map((logo, i) => {
            const inner = (
              <div className="flex items-center justify-center p-5 h-24 rounded-xl border border-gray-100 bg-white hover:border-gray-300 transition-all duration-300 group">
                {logo.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo.imageUrl}
                    alt={logo.alt ?? ''}
                    className="max-h-10 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-16 h-8 bg-gray-100 rounded" />
                )}
              </div>
            )

            return logo.link ? (
              <a key={logo._key ?? i} href={logo.link} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <div key={logo._key ?? i}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
