'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { StripFrame } from './frames'
import { caseSlugFor } from './caseSlug'

type HomeFrameProps = {
    frame: StripFrame
    index: number
    replica?: number
    priority?: boolean
}

export function HomeFrame({ frame, index, replica = 0, priority = false }: HomeFrameProps) {
    const t = useTranslations('cases')
    const { media, imageIndex, hover, hoverPosition } = frame
    const slug = frame.slug ?? caseSlugFor(media)
    const alt = slug ? t(`${slug}.alt`) : 'Andrea Rodríguez'
    const transition = replica === 0 && slug && imageIndex === 0 ? `work-${slug}` : undefined
    const sizes = `(max-width: 767px) ${(frame.phone.w / 320) * 100}vw, ${(frame.desktop.w / 1024) * 100}vw`
    const [revealed, setRevealed] = useState(false)

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduced) {
            setRevealed(true)
            return
        }
        const frameId = window.requestAnimationFrame(() => setRevealed(true))
        return () => window.cancelAnimationFrame(frameId)
    }, [])

    const images = (
        <>
            <Image
                src={media.src}
                alt={slug ? '' : alt}
                fill
                sizes={sizes}
                quality={95}
                placeholder="blur"
                blurDataURL={media.blurDataURL}
                priority={priority}
                draggable={false}
                className="object-cover"
            />
            {hover ? (
                <Image
                    src={hover.src}
                    alt=""
                    fill
                    sizes={sizes}
                    quality={95}
                    placeholder="blur"
                    blurDataURL={hover.blurDataURL}
                    draggable={false}
                    aria-hidden
                    className="object-cover opacity-0 transition-opacity duration-200 ease-[ease-in-out] group-hover:opacity-100 max-md:hidden"
                    style={{ objectPosition: hoverPosition ?? 'center' }}
                />
            ) : null}
        </>
    )

    const className = `home-shot home-shot-${index} group absolute ${revealed ? 'opacity-100' : 'opacity-0'}`
    const style = {
        viewTransitionName: transition,
        transition: 'opacity 200ms cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: replica === 0 ? `${Math.min(index * 35, 140)}ms` : '0ms',
    } as React.CSSProperties
    const face = <div className="absolute inset-0 overflow-hidden">{images}</div>
    const attrs = { className, style, 'data-replica': replica, 'data-frame': index }

    if (!slug) {
        return <div {...attrs}>{face}</div>
    }

    return (
        <Link href={`/work/${slug}`} aria-label={alt} draggable={false} {...attrs}>
            {face}
        </Link>
    )
}
