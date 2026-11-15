'use client'

import { Reveal } from '@/components/motion/Reveal'

export function FadeIn({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <Reveal className={className} delay={40}>
            {children}
        </Reveal>
    )
}
