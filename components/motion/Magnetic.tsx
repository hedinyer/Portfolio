'use client'

import gsap from 'gsap'
import { useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const reduced = useReducedMotion()

    const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const element = ref.current
        if (!element || reduced) return
        const bounds = element.getBoundingClientRect()
        const x = event.clientX - (bounds.left + bounds.width / 2)
        const y = event.clientY - (bounds.top + bounds.height / 2)
        gsap.to(element, { x: x * 0.35, y: y * 0.35, duration: 0.45, ease: 'power3.out' })
    }

    const onLeave = () => {
        if (!ref.current) return
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' })
    }

    return (
        <div ref={ref} className={`inline-flex ${className ?? ''}`} onMouseMove={onMove} onMouseLeave={onLeave}>
            {children}
        </div>
    )
}
