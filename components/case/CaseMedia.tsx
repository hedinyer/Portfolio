import Image from 'next/image'
import type { Media } from '@/content/projects'

function isVideo(src: string) {
    return /\.(mp4|webm|mov)(\?|$)/i.test(src)
}

export function CaseMedia({
    media,
    alt,
    sizes,
    priority = false,
}: {
    media: Media
    alt: string
    sizes: string
    priority?: boolean
}) {
    if (isVideo(media.src)) {
        return (
            <video
                src={media.src}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="metadata"
                aria-label={alt}
                className="h-full w-full object-cover"
            />
        )
    }

    return (
        <Image
            src={media.src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            blurDataURL={media.blurDataURL}
            draggable={false}
            className="object-cover"
        />
    )
}
