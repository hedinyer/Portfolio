'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { desktopCycle, homeFrames, homeStripCss, phoneCycle } from './frames'
import { HomeFrame } from './HomeFrame'

const stripCss = homeStripCss()
const replicas = [0, 1] as const

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value))
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
        let wrapping = false
        const phoneQuery = window.matchMedia('(max-width: 767px)')

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
            const cyclePx = (phone ? phoneCycle : desktopCycle) * u
            const y = window.scrollY
            // Visual loop via modulo; optionally rewind scroll so the page never ends.
            const shift = cyclePx > 0 ? -(y % cyclePx) : 0
            if (!wrapping && cyclePx > 0 && y >= cyclePx) {
                wrapping = true
                const wrapped = y % cyclePx
                window.scrollTo(0, wrapped)
                wrapping = false
            }
            track.style.transform = `translate3d(${shift}px,0,0)`
            syncCopy()

            const shots = track.querySelectorAll<HTMLElement>('.home-shot')
            const viewW = Math.max(window.innerWidth, 1)
            const viewCenter = viewW * 0.5
            let bestIndex = 0
            let bestDist = Number.POSITIVE_INFINITY

            shots.forEach((shot) => {
                const centerX = shift + shot.offsetLeft + shot.offsetWidth * 0.5
                const offset = (centerX - viewCenter) / viewW
                const capped = clamp(offset, -1.25, 1.25)
                const abs = Math.abs(capped)
                const rotateY = capped * -72
                const depth = -abs * 160
                const scale = 1 - abs * 0.22
                const shade = 1 - Math.min(abs * 0.45, 0.45)
                // No translateY here — vertical position comes from CSS top only.
                shot.style.transform = `perspective(900px) translate3d(0,0,${depth.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`
                shot.style.filter = `brightness(${shade.toFixed(3)})`

                const dist = Math.abs(centerX - viewCenter)
                if (dist < bestDist) {
                    bestDist = dist
                    const raw = Number(shot.dataset.frame ?? 0)
                    bestIndex = ((raw % homeFrames.length) + homeFrames.length) % homeFrames.length
                }
            })

            setIndex((current) => (current === bestIndex ? current : bestIndex))
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
            <div
                className="pointer-events-none fixed inset-0 z-10"
                style={{ clipPath: 'inset(-24vh 0)' }}
            >
                <div
                    ref={trackRef}
                    className="absolute inset-y-0 left-0 w-0 will-change-transform"
                >
                    {replicas.flatMap((replica) =>
                        homeFrames.map((frame, frameIndex) => (
                            <HomeFrame
                                key={`${replica}-${frame.media.src}-${frameIndex}`}
                                frame={frame}
                                index={frameIndex}
                                replica={replica}
                                priority={replica === 0 && frameIndex < 4}
                            />
                        )),
                    )}
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
