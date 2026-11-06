'use client'

import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useEffect, useRef } from 'react'
import { site } from '@/content/site'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(SplitText)

const storageKey = 'andrea-preloader-seen'

export function Preloader() {
    const reduced = useReducedMotion()
    const root = useRef<HTMLDivElement>(null)
    const count = useRef<HTMLSpanElement>(null)
    const name = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const element = root.current
        const countElement = count.current
        const nameElement = name.current
        if (!element || !countElement || !nameElement) return

        if (reduced || sessionStorage.getItem(storageKey)) {
            element.style.display = 'none'
            return
        }

        element.style.display = 'flex'
        const split = new SplitText(nameElement, { type: 'chars', aria: 'auto' })
        const value = { n: 0 }

        const timeline = gsap.timeline({
            onComplete: () => {
                sessionStorage.setItem(storageKey, '1')
                gsap.to(element, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        split.revert()
                        gsap.set(element, { clearProps: 'transform' })
                        element.style.display = 'none'
                    },
                })
            },
        })

        timeline
            .from(split.chars, { yPercent: 120, stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 0)
            .to(
                value,
                {
                    n: 100,
                    duration: 1.4,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                        countElement.textContent = String(Math.round(value.n)).padStart(3, '0')
                    },
                },
                0,
            )

        return () => {
            timeline.kill()
            split.revert()
        }
    }, [reduced])

    return (
        <div
            ref={root}
            style={{ display: 'none' }}
            className="fixed inset-0 z-[70] flex-col justify-between bg-background px-5 py-6 text-foreground md:px-8"
        >
            <p className="text-[11px] uppercase tracking-[0.18em]">Portfolio</p>
            <p ref={name} className="overflow-hidden text-4xl tracking-tight md:text-7xl">
                {site.name}
            </p>
            <span ref={count} className="font-serif text-2xl italic">
                000
            </span>
        </div>
    )
}
