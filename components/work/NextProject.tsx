'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { usePageVisible, useReducedMotion } from '@/components/motion'
import { Link } from '@/i18n/navigation'

function Copies({ label }: { label: string }) {
    return (
        <span className="flex shrink-0">
            {Array.from({ length: 4 }, (_, index) => (
                <span
                    key={index}
                    className="pr-16 font-serif text-[clamp(2.75rem,7vw,6.25rem)] leading-none italic whitespace-nowrap"
                >
                    {label}
                </span>
            ))}
        </span>
    )
}

export function NextProject({ href, label }: { href: string; label: string }) {
    const reduced = useReducedMotion()
    const visible = usePageVisible()
    const trackRef = useRef<HTMLDivElement>(null)
    const tweenRef = useRef<gsap.core.Tween | null>(null)
    const hoveredRef = useRef(false)
    const visibleRef = useRef(visible)

    useEffect(() => {
        visibleRef.current = visible
        const tween = tweenRef.current
        if (!tween) return
        if (hoveredRef.current || !visible) tween.pause()
        else tween.play()
    }, [visible])

    useEffect(() => {
        const track = trackRef.current
        if (!track || reduced) return

        const tween = gsap.fromTo(
            track,
            { xPercent: 0 },
            {
                xPercent: -50,
                duration: 40,
                ease: 'none',
                repeat: -1,
            },
        )
        if (hoveredRef.current || !visibleRef.current) tween.pause()
        tweenRef.current = tween

        return () => {
            tween.kill()
            tweenRef.current = null
        }
    }, [label, reduced])

    const pause = () => {
        hoveredRef.current = true
        tweenRef.current?.pause()
    }

    const resume = () => {
        hoveredRef.current = false
        if (visibleRef.current) tweenRef.current?.play()
    }

    if (reduced) {
        return (
            <Link
                href={href}
                data-cursor="view"
                className="block px-5 py-14 font-serif text-[clamp(2.75rem,7vw,6.25rem)] leading-none italic md:px-8 md:py-20"
            >
                {label}
            </Link>
        )
    }

    return (
        <Link
            href={href}
            data-cursor="view"
            aria-label={label}
            className="block overflow-hidden py-14 md:py-20"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
        >
            <div ref={trackRef} className="flex w-max" aria-hidden>
                <Copies label={label} />
                <Copies label={label} />
            </div>
        </Link>
    )
}
