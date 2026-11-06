'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(SplitText, ScrollTrigger)

type Tag = 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div'

type RevealTextProps = {
    children: React.ReactNode
    as?: Tag
    className?: string
    immediate?: boolean
}

export function RevealText({ children, as = 'p', className, immediate = false }: RevealTextProps) {
    const ref = useRef<HTMLElement>(null)
    const reduced = useReducedMotion()
    const Tag = as

    useLayoutEffect(() => {
        const element = ref.current
        if (!element || reduced) return

        const split = new SplitText(element, {
            type: 'lines',
            mask: 'lines',
            aria: 'auto',
        })

        const tween = gsap.from(split.lines, {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.07,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: immediate
                ? undefined
                : {
                      trigger: element,
                      start: 'top 88%',
                  },
        })

        const release = (event: Event) => {
            const anchor = (event.target as HTMLElement | null)?.closest('a')
            if (!anchor) return
            const href = anchor.getAttribute('href')
            if (!href || href.startsWith('#') || href.startsWith('mailto:')) return
            tween.scrollTrigger?.kill()
            tween.kill()
            split.revert()
        }

        document.addEventListener('click', release, true)

        return () => {
            document.removeEventListener('click', release, true)
            tween.scrollTrigger?.kill()
            tween.kill()
            split.revert()
        }
    }, [children, immediate, reduced])

    return (
        <Tag ref={ref as never} className={className}>
            {children}
        </Tag>
    )
}
