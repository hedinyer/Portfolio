'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { desktopTravel, homeFrames, homeStripCss, phoneTravel } from './frames'
import { HomeFrame } from './HomeFrame'

const stripCss = homeStripCss()

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value))
}

/** Quadratic ease-in-out: t<.5 ? 2t² : 1-(2-2t)²/2 */
function easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : 1 - ((2 - 2 * t) ** 2) / 2
}

export function useHomeCounterLabel(index: number, total: number, locale: string) {
    const current = Math.min(total, Math.max(1, index + 1))
    if (locale === 'es') return `${current} de ${total}`
    return `${current} of ${total}`
}

export function HomeCarousel() {
    const locale = useLocale()
    const trackRef = useRef<HTMLDivElement>(null)
    const unitRef = useRef<HTMLDivElement>(null)
    const [index, setIndex] = useState(0)
    const label = useHomeCounterLabel(index, homeFrames.length, locale)

    useLayoutEffect(() => {
        const track = trackRef.current
        const unit = unitRef.current
        if (!track || !unit) return

        let frame = 0
        let alive = true
        let copyBottom = ''
        const phoneQuery = window.matchMedia('(max-width: 767px)')
        const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

        const syncCopy = () => {
            if (!phoneQuery.matches) return
            const copy = document.querySelector<HTMLElement>('[data-home-copy]')
            if (!copy) return
            const next = `${Math.round(copy.getBoundingClientRect().bottom)}px`
            if (next === copyBottom) return
            copyBottom = next
            document.documentElement.style.setProperty('--home-copy-bottom', next)
        }

        const update = () => {
            frame = 0
            const u = unit.getBoundingClientRect().width || 1
            const phone = phoneQuery.matches
            const travel = (phone ? phoneTravel : desktopTravel) * u
            const t = travel > 0 ? clamp(window.scrollY / travel, 0, 1) : 0
            const eased = phone || reducedQuery.matches ? t : easeInOutQuad(t)
            track.style.transform = `translate3d(${-eased * travel}px,0,0)`
            syncCopy()

            const next = Math.min(homeFrames.length - 1, Math.round(t * (homeFrames.length - 1)))
            setIndex((current) => (current === next ? current : next))
        }

        const request = () => {
            if (!alive || frame) return
            frame = window.requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', request, { passive: true })
        window.addEventListener('resize', request)
        window.visualViewport?.addEventListener('resize', request)
        document.fonts?.ready.then(() => {
            if (alive) request()
        })

        return () => {
            alive = false
            window.cancelAnimationFrame(frame)
            window.removeEventListener('scroll', request)
            window.removeEventListener('resize', request)
            window.visualViewport?.removeEventListener('resize', request)
            document.documentElement.style.removeProperty('--home-copy-bottom')
        }
    }, [])

    return (
        <>
            <style>{stripCss}</style>
            <div
                ref={unitRef}
                aria-hidden
                className="pointer-events-none fixed top-0 left-0 -z-10 h-px w-[calc(1*var(--u))] opacity-0"
            />
            <div className="pointer-events-none fixed inset-0 z-10 overflow-clip">
                <div ref={trackRef} className="absolute inset-y-0 left-0 w-0 will-change-transform">
                    {homeFrames.map((frame, frameIndex) => (
                        <HomeFrame
                            key={`${frame.media.src}-${frameIndex}`}
                            frame={frame}
                            index={frameIndex}
                            priority={frameIndex < 4}
                        />
                    ))}
                </div>
            </div>
            <div
                aria-live="polite"
                className="home-counter pointer-events-none fixed right-[9px] bottom-[9px] z-30 flex h-[calc(45.13*var(--u))] w-[calc(89.44*var(--u))] items-center justify-center rounded-full bg-[#858585] font-serif text-[calc(16*var(--u))] leading-none font-normal whitespace-nowrap text-white italic md:hidden"
            >
                {label}
            </div>
        </>
    )
}
