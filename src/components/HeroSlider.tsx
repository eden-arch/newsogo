'use client'

import { useEffect, useState } from 'react'

export type Slide = {
  _key?: string
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  imageUrl?: string
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((c) => {
        setPrev(c)
        return (c + 1) % slides.length
      })
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (!slides.length) return null

  return (
    <div className="relative w-full h-[580px] md:h-[680px] overflow-hidden bg-gray-900">
      {slides.map((slide, i) => {
        const isActive = i === current
        const isPrev = i === prev

        return (
          <div
            key={slide._key ?? i}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              transition: isActive ? 'opacity 1s ease-in-out' : 'opacity 0.8s ease-in-out',
            }}
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: slide.imageUrl
                  ? `url(${slide.imageUrl})`
                  : `linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)`,
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 8s ease-out',
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

            {/* Content */}
            <div
              dir="rtl"
              className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6"
            >
              <div
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
                }}
              >
                {slide.title && (
                  <h2 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight leading-tight max-w-3xl">
                    {slide.title}
                  </h2>
                )}
                {slide.subtitle && (
                  <p className="text-lg md:text-xl text-white/75 mb-10 max-w-xl mx-auto leading-relaxed">
                    {slide.subtitle}
                  </p>
                )}
                {slide.buttonText && (
                  <a
                    href={slide.buttonLink ?? '#'}
                    className="inline-block bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 active:scale-95 transition-all text-sm tracking-wide"
                  >
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {/* Navigation dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPrev(current); setCurrent(i) }}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-400 rounded-full"
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
