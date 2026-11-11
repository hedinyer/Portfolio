'use client'

import { useEffect, useRef } from 'react'

export function FadeIn({ className, children }: { className?: string; children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            element.classList.add('is-in')
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return
                element.classList.add('is-in')
                observer.disconnect()
            },
            { threshold: 0.2 },
        )
        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={ref} className={className ? `case-fade ${className}` : 'case-fade'}>
            {children}
        </div>
    )
}
