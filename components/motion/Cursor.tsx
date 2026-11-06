'use client'

import gsap from 'gsap'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function Cursor() {
    const viewLabel = useTranslations('cursor')('view')
    const reduced = useReducedMotion()
    const dot = useRef<HTMLDivElement>(null)
    const [label, setLabel] = useState<string | null>(null)

    useEffect(() => {
        const element = dot.current
        if (!element) return

        const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        if (!fine || reduced) {
            element.hidden = true
            return
        }

        element.hidden = false
        document.body.classList.add('has-cursor')
        gsap.set(element, { xPercent: -50, yPercent: -50 })

        const xTo = gsap.quickTo(element, 'x', { duration: 0.35, ease: 'power3.out' })
        const yTo = gsap.quickTo(element, 'y', { duration: 0.35, ease: 'power3.out' })

        const onMove = (event: PointerEvent) => {
            xTo(event.clientX)
            yTo(event.clientY)
            const target = (event.target as HTMLElement | null)?.closest('[data-cursor]')
            const kind = target?.getAttribute('data-cursor')
            setLabel(kind === 'view' ? viewLabel : null)
        }

        window.addEventListener('pointermove', onMove)
        return () => {
            window.removeEventListener('pointermove', onMove)
            document.body.classList.remove('has-cursor')
        }
    }, [reduced, viewLabel])

    return (
        <div
            ref={dot}
            hidden
            className="pointer-events-none fixed top-0 left-0 z-[60] mix-blend-difference"
            aria-hidden
        >
            <div
                className={`flex items-center justify-center rounded-full bg-white text-black transition-[width,height] duration-300 ${
                    label ? 'h-16 w-16 text-[11px] uppercase tracking-[0.14em]' : 'h-3 w-3'
                }`}
            >
                {label}
            </div>
        </div>
    )
}
