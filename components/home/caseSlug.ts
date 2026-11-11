import { cases, type Media } from '@/content/projects'

export function caseSlugFor(media: Media): string | null {
    const match = cases.find(
        (item) => item.cover.src === media.src || item.gallery.some((image) => image.src === media.src),
    )

    return match?.slug ?? null
}
