'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Media } from '@/content/projects'
import { usePageVisible, useReducedMotion } from '@/components/motion'
import { caseSlugFor } from './caseSlug'

const HOLD_MS = 3200
const WIPE_SECONDS = 0.95
const STAGGER_MS = [0, 640, 1280]
const IMAGE_SIZES = '(max-width: 768px) 30vw, 28vw'

type HomeFrameProps = {
    media: Media[]
    frameIndex: number
}

export function HomeFrame({ media, frameIndex }: HomeFrameProps) {
    const t = useTranslations('cases')
    const reduced = useReducedMotion()
    const pageVisible = usePageVisible()
    const [index, setIndex] = useState(0)
    const [outgoing, setOutgoing] = useState<number | null>(null)
    const [hovered, setHovered] = useState(false)
    const [focused, setFocused] = useState(false)
    const indexRef = useRef(0)
    const elapsedRef = useRef(0)
    const primedRef = useRef(false)
    const clipRef = useRef<HTMLDivElement>(null)

    const shown = reduced || media.length === 0 ? 0 : index
    const current = media[shown] ?? media[0]
    const previousIndex = !reduced && outgoing !== null && outgoing !== shown ? outgoing : null
    const previous = previousIndex === null ? null : (media[previousIndex] ?? null)

    const paused = reduced || !pageVisible || hovered || focused

    useEffect(() => {
        if (paused || media.length < 2) return

        const count = media.length
        let timeoutId = 0
        let startedAt = 0

        const schedule = () => {
            const need = primedRef.current ? HOLD_MS : HOLD_MS + (STAGGER_MS[frameIndex] ?? frameIndex * 640)
            const wait = Math.max(0, need - elapsedRef.current)
            startedAt = performance.now()

            timeoutId = window.setTimeout(() => {
                elapsedRef.current = 0
                primedRef.current = true
                const currentIndex = indexRef.current
                const next = (currentIndex + 1) % count
                indexRef.current = next
                setOutgoing(currentIndex)
                setIndex(next)
                schedule()
            }, wait)
        }

        schedule()

        return () => {
            window.clearTimeout(timeoutId)
            elapsedRef.current += performance.now() - startedAt
        }
    }, [elapsedRef, frameIndex, indexRef, media.length, paused, primedRef])

    useLayoutEffect(() => {
        const node = clipRef.current
        if (!node) return

        if (reduced || previousIndex === null) {
            node.style.clipPath = ''
            return
        }

        let active = true
        const tween = gsap.fromTo(
            node,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: WIPE_SECONDS,
                ease: 'power3.inOut',
                onComplete: () => {
                    if (!active) return
                    setOutgoing(null)
                },
            },
        )

        return () => {
            active = false
            tween.kill()
        }
    }, [previousIndex, reduced, current?.src])

    if (!current) return null

    const slug = caseSlugFor(current)
    const title = t(`${slug}.title`)
    const alt = t(`${slug}.alt`)
    const revealTitle = hovered || focused

    return (
        <div
            className="relative mx-auto aspect-[3/4] w-full min-w-0 max-w-[calc((100dvh-var(--header-h)-18rem)*0.75)] md:w-[26vw] md:max-w-[calc((100dvh-var(--header-h)-13.5rem)*0.75)]"
            onPointerEnter={(event) => {
                if (event.pointerType === 'touch') return
                setHovered(true)
            }}
            onPointerLeave={(event) => {
                if (event.pointerType === 'touch') return
                setHovered(false)
            }}
            onPointerCancel={() => setHovered(false)}
        >
            <Link
                href={`/work/${slug}`}
                data-cursor="view"
                className="relative block h-full w-full"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            >
                <div className="absolute inset-0 overflow-hidden">
                    {previous ? (
                        <div className="absolute inset-0" aria-hidden>
                            <FrameImage media={previous} alt="" />
                        </div>
                    ) : null}
                    <div ref={clipRef} className="absolute inset-0">
                        <FrameImage
                            media={current}
                            alt={alt}
                            priority={shown === 0}
                            transitionName={`work-${slug}`}
                        />
                    </div>
                </div>
                <span
                    aria-hidden
                    className={`pointer-events-none absolute bottom-1.5 left-1.5 z-10 text-[11px] leading-none text-white mix-blend-difference transition-opacity duration-300 md:bottom-3 md:left-3 md:text-[12px] ${
                        revealTitle ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {title}
                </span>
            </Link>
        </div>
    )
}

function FrameImage({
    media,
    alt,
    priority = false,
    transitionName,
}: {
    media: Media
    alt: string
    priority?: boolean
    transitionName?: string
}) {
    return (
        <Image
            src={media.src}
            alt={alt}
            fill
            sizes={IMAGE_SIZES}
            placeholder="blur"
            blurDataURL={media.blurDataURL}
            priority={priority}
            className="object-cover"
            style={transitionName ? { viewTransitionName: transitionName } : undefined}
        />
    )
}

