'use client'

import {
    createElement,
    useEffect,
    useRef,
    type CSSProperties,
    type ElementType,
    type HTMLAttributes,
    type ReactNode,
} from 'react'

type RevealProps = {
    children: ReactNode
    className?: string
    as?: ElementType
    delay?: number
    /** Skip vertical travel when the element already owns its transform. */
    fadeOnly?: boolean
    /** Animate on mount instead of waiting for scroll. */
    eager?: boolean
    style?: CSSProperties
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'style' | 'children'>

export function Reveal({
    children,
    className,
    as: Tag = 'div',
    delay = 0,
    fadeOnly = false,
    eager = false,
    style,
    ...rest
}: RevealProps) {
    const ref = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const show = () => element.classList.add('is-in')

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            show()
            return
        }

        if (eager) {
            show()
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return
                show()
                observer.disconnect()
            },
            { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
        )
        observer.observe(element)
        return () => observer.disconnect()
    }, [eager])

    const classes = ['reveal', fadeOnly ? 'reveal-fade' : null, className].filter(Boolean).join(' ')
    const mergedStyle = {
        ...style,
        '--reveal-delay': `${delay}ms`,
    } as CSSProperties

    return createElement(
        Tag,
        {
            ...rest,
            ref,
            className: classes,
            style: mergedStyle,
        },
        children,
    )
}
