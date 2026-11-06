'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const reduced = useReducedMotion()

    useEffect(() => {
        if (reduced) return

        const lenis = new Lenis({
            autoRaf: false,
            lerp: 0.085,
            wheelMultiplier: 0.9,
        })

        lenis.on('scroll', ScrollTrigger.update)

        const onTick = (time: number) => {
            lenis.raf(time * 1000)
        }

        const onVisibility = () => {
            if (document.hidden) lenis.stop()
            else lenis.start()
        }

        gsap.ticker.add(onTick)
        gsap.ticker.lagSmoothing(0)
        document.addEventListener('visibilitychange', onVisibility)

        return () => {
            document.removeEventListener('visibilitychange', onVisibility)
            gsap.ticker.remove(onTick)
            lenis.destroy()
        }
    }, [reduced])

    return children
}
