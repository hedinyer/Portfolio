'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { StripFrame } from './frames'
import { caseSlugFor } from './caseSlug'

type HomeFrameProps = {
    frame: StripFrame
    index: number
    priority?: boolean
}

export function HomeFrame({ frame, index, priority = false }: HomeFrameProps) {
    const t = useTranslations('cases')
    const { media, imageIndex } = frame
    const slug = caseSlugFor(media)
    const alt = slug ? t(`${slug}.alt`) : ''
    const transition = slug && imageIndex === 0 ? `work-${slug}` : undefined
    const sizes = `(max-width: 767px) ${(frame.phone.w / 320) * 100}vw, ${(frame.desktop.w / 1024) * 100}vw`

    const image = (
        <Image
            src={media.src}
            alt={slug ? '' : alt}
            fill
            sizes={sizes}
            placeholder="blur"
            blurDataURL={media.blurDataURL}
            priority={priority}
            draggable={false}
            className="object-cover"
        />
    )

    const className = `home-shot home-shot-${index} absolute -translate-y-1/2 overflow-hidden`

    if (!slug) {
        return (
            <div className={className} style={{ viewTransitionName: transition }}>
                {image}
            </div>
        )
    }

    return (
        <Link
            href={`/work/${slug}`}
            aria-label={alt}
            draggable={false}
            className={className}
            style={{ viewTransitionName: transition }}
        >
            {image}
        </Link>
    )
}
